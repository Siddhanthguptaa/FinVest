// backend/src/routes/investment.routes.ts
import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;
    const { productId, amount } = req.body;

    if (!productId || !amount || amount <= 0) {
        return res.status(400).json({ message: 'Product ID and a positive amount are required.' });
    }
    try {
        const [user, product] = await Promise.all([
            prisma.user.findUnique({ where: { id: userId } }),
            prisma.investmentProduct.findUnique({ where: { id: productId } }),
        ]);
        if (!user || !product) return res.status(404).json({ message: 'User or Product not found.' });
        if (user.balance < amount) return res.status(400).json({ message: 'Insufficient balance.' });
        if (amount < product.minInvestment) return res.status(400).json({ message: `Investment amount must be at least ${product.minInvestment}.` });
        if (product.maxInvestment && amount > product.maxInvestment) return res.status(400).json({ message: `Investment amount cannot exceed ${product.maxInvestment}.` });

        const newInvestment = await prisma.$transaction(async (tx) => {
            await tx.user.update({ where: { id: userId }, data: { balance: { decrement: amount } } });
            const investedAt = new Date();
            const maturityDate = new Date(investedAt);
            maturityDate.setMonth(maturityDate.getMonth() + product.tenureMonths);
            const expectedReturn = (amount * (Number(product.annualYield) / 100) * (product.tenureMonths / 12));
            return tx.investment.create({
                data: { userId, productId, amount, investedAt, maturityDate, expectedReturn, status: 'active' },
            });
        });
        res.status(201).json(newInvestment);
    } catch (error) {
        console.error('Investment failed:', error);
        res.status(500).json({ message: 'An unexpected error occurred.' });
    }
});

router.get('/portfolio', authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;
    try {
        const investments = await prisma.investment.findMany({
            where: { userId: userId }, include: { product: true }, orderBy: { investedAt: 'desc' }
        });
        const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
        const totalExpectedReturn = investments.reduce((sum, inv) => sum + Number(inv.expectedReturn), 0);
        res.status(200).json({
            totalInvested, totalExpectedReturn, investmentsCount: investments.length, investments: investments,
        });
    } catch (error) {
        console.error('Failed to fetch portfolio:', error);
        res.status(500).json({ message: 'An unexpected error occurred while fetching the portfolio.' });
    }
});

export default router;