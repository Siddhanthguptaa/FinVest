// backend/src/index.ts

import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authMiddleware, AuthRequest } from './middleware/authMiddleware';

// Initialize Express app and Prisma Client
const app = express();
const prisma = new PrismaClient();

// Middleware to parse JSON bodies
app.use(express.json());

const PORT = process.env.PORT || 8000;

// A simple test route to make sure the server is working
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the Grip Invest API!' });
});

/**
 * =================================================================
 * User Authentication Routes
 * =================================================================
 */

// POST /api/auth/signup
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. --- Basic Input Validation ---
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // 2. --- Find the user in the database ---
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // 3. --- Compare the provided password with the stored hash ---
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
    // Make sure JWT_SECRET is loaded
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables.");
    }

    // 4. --- Generate a JWT ---
    const token = jwt.sign(
      { userId: user.id, email: user.email }, // This is the data stored in the token (the "payload")
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // The token will expire in 1 hour
    );

    // 5. --- Send the token back to the client ---
    res.status(200).json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
});

// GET /api/profile - A Protected Route
app.get('/api/profile', authMiddleware, (req: AuthRequest, res: Response) => {
  // Because the authMiddleware ran successfully, we know `req.user` exists.
  // We can use it to fetch user-specific data.
  res.json({
    message: `Welcome user ${req.user?.email}! This is your protected profile information.`,
    user: req.user
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});