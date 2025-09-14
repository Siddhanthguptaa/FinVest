// backend/src/index.ts
import express from 'express';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// API Routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});