// backend/src/middleware/adminMiddleware.ts
import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

// Read the Admin User ID from environment variables
// For production, you would set this in your .env file or server configuration
const ADMIN_USER_ID = process.env.ADMIN_USER_ID;

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!ADMIN_USER_ID) {
    // If the admin ID is not configured, deny access for safety.
    console.error("ADMIN_USER_ID is not configured in environment variables.");
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  if (req.user?.userId !== ADMIN_USER_ID) {
    return res.status(403).json({ message: 'Forbidden: Admin access required.' });
  }

  next();
};