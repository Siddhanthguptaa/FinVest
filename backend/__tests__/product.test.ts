// backend/__tests__/product.test.ts
import request from 'supertest';
import jwt from 'jsonwebtoken';

const TEST_ADMIN_ID = 'a-fake-admin-id-for-testing';
process.env.ADMIN_USER_ID = TEST_ADMIN_ID;

import { app } from '../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Product Endpoints', () => {
    let adminToken: string;
    let userToken: string;

    beforeAll(async () => {
        await prisma.user.deleteMany({});

        const adminUser = await prisma.user.create({
            data: {
                id: TEST_ADMIN_ID, 
                firstName: 'Admin',
                email: `admin-${Date.now()}@example.com`,
                passwordHash: 'hashedpassword',
            },
        });
        
        const regularUser = await prisma.user.create({
            data: {
                firstName: 'Regular',
                email: `user-${Date.now()}@example.com`,
                passwordHash: 'hashedpassword',
            },
        });

        adminToken = jwt.sign({ userId: adminUser.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        userToken = jwt.sign({ userId: regularUser.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    });

    beforeEach(async () => {
        await prisma.investmentProduct.deleteMany({});
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should allow any authenticated user to get a list of products', async () => {
        const response = await request(app)
            .get('/api/products')
            .set('Authorization', `Bearer ${userToken}`);
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should allow an admin to create a new product', async () => {
        const newProduct = {
            name: 'Admin Created Fund',
            investmentType: 'mf',
            tenureMonths: 24,
            annualYield: 10.5,
            riskLevel: 'moderate',
        };

        const response = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(newProduct);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(newProduct.name);
    });

    it('should PREVENT a regular user from creating a new product', async () => {
        const newProduct = {
            name: 'User Created Fund',
            investmentType: 'etf',
            tenureMonths: 12,
            annualYield: 15,
            riskLevel: 'high',
        };

        const response = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${userToken}`)
            .send(newProduct);

        expect(response.status).toBe(403);
    });
    it('should allow an admin to update a product', async () => {
        const productResponse = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                name: 'Product to Update',
                investmentType: 'bond',
                tenureMonths: 12,
                annualYield: 5.0,
                riskLevel: 'low',
            });
        
        const productId = productResponse.body.id;

        const updatedData = {
            name: 'Updated Product Name',
            annualYield: 8.8,
        };

        const response = await request(app)
            .put(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${adminToken}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedData.name);
        expect(Number(response.body.annualYield)).toBe(updatedData.annualYield);
    });

    it('should allow an admin to delete a product', async () => {
        const productResponse = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                name: 'Product to Delete',
                investmentType: 'fd',
                tenureMonths: 6,
                annualYield: 6.0,
                riskLevel: 'low',
            });
        
        const productId = productResponse.body.id;

        const deleteResponse = await request(app)
            .delete(`/api/products/${productId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body.message).toBe('Product deleted successfully.');

        const fetchResponse = await request(app)
            .get(`/api/products`)
            .set('Authorization', `Bearer ${userToken}`);
        
        expect(fetchResponse.body.find((p: any) => p.id === productId)).toBeUndefined();
    });
});