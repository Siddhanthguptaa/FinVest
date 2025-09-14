// backend/src/middleware/loggerMiddleware.ts
import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from './authMiddleware'; // We'll use our custom request type
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const loggerMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Let the request continue to its handler
    next();

    // After the response is sent, the 'finish' event will be triggered.
    res.on('finish', async () => {
        try {
            let userId: string | null = null;
            let userEmail: string | null = null;
            
            // We can try to decode the token to get user info without verifying it again
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            
            if (token) {
                const decoded = jwt.decode(token) as { userId: string, email: string };
                if (decoded) {
                    userId = decoded.userId;
                    userEmail = decoded.email;
                }
            }

            await prisma.transactionLog.create({
                data: {
                    userId: userId,
                    email: userEmail,
                    endpoint: req.originalUrl,
                    httpMethod: req.method as any, // Cast to any to match enum
                    statusCode: res.statusCode,
                    // We'll add error messages later when we build a proper error handler
                },
            });

        } catch (error) {
            console.error('Failed to log transaction:', error);
        }
    });
};