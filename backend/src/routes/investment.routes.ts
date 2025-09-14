// backend/src/routes/investment.routes.ts
import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// POST /api/investments - Create a new investment
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
    // We know req.user is defined because authMiddleware ran successfully
    const userId = req.user!.userId;
    const { productId, amount } = req.body;
    
    // --- 1. Basic Validation ---
    if (!productId || !amount || amount <= 0) {
        return res.status(400).json({ message: 'Product ID and a positive amount are required.' });
    }

    try {
        // --- 2. Get User and Product details in one go ---
        const [user, product] = await Promise.all([
            prisma.user.findUnique({ where: { id: userId } }),
            prisma.investmentProduct.findUnique({ where: { id: productId } }),
        ]);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        if (!product) {
            return res.status(404).json({ message: 'Investment product not found.' });
        }

        // --- 3. Apply Business Rule Validations ---
        if (user.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance.' });
        }
        if (amount < product.minInvestment) {
            return res.status(400).json({ message: `Investment amount must be at least ${product.minInvestment}.` });
        }
        if (product.maxInvestment && amount > product.maxInvestment) {
            return res.status(400).json({ message: `Investment amount cannot exceed ${product.maxInvestment}.` });
        }

        // --- 4. Perform the transaction ---
        // prisma.$transaction ensures that both operations (updating user balance and creating investment)
        // either both succeed, or they both fail. This prevents data inconsistency.
        const newInvestment = await prisma.$transaction(async (tx) => {
            // a. Subtract amount from user's balance
            await tx.user.update({
                where: { id: userId },
                data: { balance: { decrement: amount } },
            });

            // b. Calculate maturity date and expected return
            const investedAt = new Date();
            const maturityDate = new Date(investedAt);
            maturityDate.setMonth(maturityDate.getMonth() + product.tenureMonths);

            const expectedReturn = (amount * (Number(product.annualYield) / 100) * (product.tenureMonths / 12));

            // c. Create the investment record
            const investment = await tx.investment.create({
                data: {
                    userId: userId,
                    productId: productId,
                    amount: amount,
                    investedAt: investedAt,
                    maturityDate: maturityDate,
                    expectedReturn: expectedReturn,
                    status: 'active',
                },
            });

            return investment;
        });

        // --- 5. Send success response ---
        res.status(201).json(newInvestment);

    } catch (error) {
        console.error('Investment failed:', error);
        res.status(500).json({ message: 'An unexpected error occurred during the investment process.' });
    }
});

// GET /api/investments/portfolio - Fetch the logged-in user's portfolio
router.get('/portfolio', authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;

    try {
        const investments = await prisma.investment.findMany({
            where: {
                userId: userId,
            },
            // Using `include` tells Prisma to also fetch the related product details for each investment.
            include: {
                product: true,
            },
            orderBy: {
                investedAt: 'desc',
            }
        });

        // We can also add some useful summary data
        const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
        const totalExpectedReturn = investments.reduce((sum, inv) => sum + Number(inv.expectedReturn), 0);

        res.status(200).json({
            totalInvested,
            totalExpectedReturn,
            investmentsCount: investments.length,
            investments: investments,
        });

    } catch (error) {
        console.error('Failed to fetch portfolio:', error);
        res.status(500).json({ message: 'An unexpected error occurred while fetching the portfolio.' });
    }
});

export default router;