// backend/src/middleware/loggerMiddleware.ts
import { Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "./authMiddleware"; 
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const loggerMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  
  next();

  // After the response is sent
  res.on("finish", async () => {
    try {
      // Skip logging in test environment
      if (process.env.NODE_ENV === "test") return;

      let userId: string | null = null;
      let userEmail: string | null = null;

      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (token) {
        const decoded = jwt.decode(token) as { userId?: string; email?: string } | null;
        if (decoded?.userId) {
          userId = decoded.userId;
          userEmail = decoded.email ?? null;
        }
      }

      // Only attempt logging if we have a valid userId
      if (userId) {
        await prisma.transactionLog.create({
          data: {
            userId,
            email: userEmail,
            endpoint: req.originalUrl,
            httpMethod: req.method as any, // enum cast
            statusCode: res.statusCode,
          },
        });
      }
    } catch (error) {
      console.error("Failed to log transaction:", error);
    }
  });
};
