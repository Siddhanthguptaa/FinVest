// backend/src/middleware/adminMiddleware.ts
import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware'; // We'll re-use the AuthRequest type

// Replace this with the actual user ID you copied from Prisma Studio
const ADMIN_USER_ID = '5c64b510-c068-4c49-9c4e-feaa1b9e450d';

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // This middleware must run *after* the authMiddleware,
  // so we know that req.user is defined.
  if (req.user?.userId !== ADMIN_USER_ID) {
    // If the user's ID does not match the admin ID, they are forbidden.
    return res.status(403).json({ message: 'Forbidden: Admin access required.' });
  }

  // If the check passes, proceed to the route handler.
  next();
};