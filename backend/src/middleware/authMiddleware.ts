import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define a new interface for our request object that includes the user payload
export interface AuthRequest extends Request {
  user?: { userId: string; email: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // 1. Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format is "Bearer TOKEN"

  if (token == null) {
    // If there's no token, the user is not authorized
    return res.sendStatus(401); // Unauthorized
  }

  // 2. Verify the token
  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) {
      // If the token is invalid (e.g., expired or tampered with)
      return res.sendStatus(403); // Forbidden
    }

    // 3. If the token is valid, attach the user payload to the request object
    req.user = user;
    
    // 4. Call next() to pass control to the next middleware or route handler
    next();
  });
};