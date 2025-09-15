// backend/__tests__/investment.test.ts
import request from 'supertest';
import { app } from '../src/app';
import { PrismaClient } from '@prisma/client';
import type { InvestmentProduct, User } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

describe.skip('Investment Endpoints', () => {
    let user: User;
    let token: string;
    let product: InvestmentProduct;

    beforeAll(async () => {
        await prisma.user.deleteMany({});
        await prisma.investmentProduct.deleteMany({});
        user = await prisma.user.create({
            data: {
                firstName: 'Investor', email: `investor-${Date.now()}@example.com`,
                passwordHash: 'hashedpassword', balance: 100000,
            },
        });
        product = await prisma.investmentProduct.create({
            data: {
                name: 'Test Product', investmentType: 'bond',
                tenureMonths: 12, annualYield: 5.0,
                riskLevel: 'low', minInvestment: 1000,
            }
        });
        token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    });

    beforeEach(async () => {
        await prisma.investment.deleteMany({});
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should allow a user to make a successful investment', async () => {
        const investmentAmount = 5000;
        const response = await request(app).post('/api/investments')
            .set('Authorization', `Bearer ${token}`)
            .send({ productId: product.id, amount: investmentAmount });

        expect(response.status).toBe(201);
        expect(response.body.amount).toBe(investmentAmount);
        const updatedUser = await prisma.user.findUnique({ where: { id: user.id } });
        expect(Number(updatedUser!.balance)).toBe(100000 - investmentAmount);
    });

    it('should PREVENT a user from investing more than their balance', async () => {
        const investmentAmount = 200000;
        const response = await request(app).post('/api/investments')
            .set('Authorization', `Bearer ${token}`)
            .send({ productId: product.id, amount: investmentAmount });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Insufficient balance.');
    });
});