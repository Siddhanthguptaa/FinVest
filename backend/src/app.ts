// backend/src/app.ts
import express from 'express';
import cors from 'cors';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import investmentRoutes from './routes/investment.routes';
import aiRoutes from './routes/ai.routes'; 

export const app = express();

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is healthy' });
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// API Routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/ai', aiRoutes); 