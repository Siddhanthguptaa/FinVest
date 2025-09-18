// backend/__tests__/auth.test.ts
import request from 'supertest';
import { app } from '../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Auth Endpoints', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany({});
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
    // Test case 1: Successful user signup
    it('should allow a new user to sign up successfully', async () => {
        const newUser = {
            firstName: 'Test',
            lastName: 'User',
            email: `test-${Date.now()}@example.com`,
            password: 'Password123!',
        };

        const response = await request(app)
            .post('/api/auth/signup')
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.email).toBe(newUser.email);
        expect(response.body).not.toHaveProperty('passwordHash');
    });

    // Test case 2: Attempt to sign up with a duplicate email
    it('should prevent signup with a duplicate email', async () => {
        // First, create a user
        await request(app)
            .post('/api/auth/signup')
            .send({
                firstName: 'Duplicate',
                lastName: 'User',
                email: 'duplicate@example.com',
                password: 'Password123!',
            });

        // Attempt to create another user with the same email
        const response = await request(app)
            .post('/api/auth/signup')
            .send({
                firstName: 'Another',
                lastName: 'User',
                email: 'duplicate@example.com',
                password: 'Password456!',
            });
        
        expect(response.status).toBe(409);
        expect(response.body.message).toBe('User with this email already exists.');
    });

    // Test case 3: Successful user login
    it('should allow a registered user to log in', async () => {
        const userCredentials = {
            firstName: 'Login',
            lastName: 'User',
            email: 'login@example.com',
            password: 'Password123!',
        };
        await request(app).post('/api/auth/signup').send(userCredentials);

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: userCredentials.email,
                password: userCredentials.password,
            });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    // Test case 4: Failed login with wrong password
    it('should reject login with an incorrect password', async () => {
        const userCredentials = {
            firstName: 'Login',
            lastName: 'User',
            email: 'wrongpass@example.com',
            password: 'Password123!',
        };
        await request(app).post('/api/auth/signup').send(userCredentials);

        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: userCredentials.email,
                password: 'WRONG_PASSWORD',
            });
        
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid credentials.');
    });
});