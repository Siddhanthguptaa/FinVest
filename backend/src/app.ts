// backend/src/app.ts
import express from 'express';
import { loggerMiddleware } from './middleware/loggerMiddleware';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import investmentRoutes from './routes/investment.routes';

export const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/investments', investmentRoutes);