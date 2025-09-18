// backend/src/routes/auth.routes.ts

import { Router, Request, Response } from 'express'; 
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// POST /api/auth/signup
router.post('/signup', async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        if (!email || !password || !firstName) {
            return res.status(400).json({ message: 'Email, password, and first name are required.' });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                passwordHash: hashedPassword,
            },
        });

        const userForClient = {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            createdAt: newUser.createdAt,
        };

        res.status(201).json(userForClient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occurred.' });
    }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occurred.' });
    }
});

// GET /api/auth/profile
router.get('/profile', authMiddleware, (req: AuthRequest, res: Response) => {
    res.json({
        message: `Welcome user ${req.user?.email}! This is your protected profile information.`,
        user: req.user
    });
});

export default router;