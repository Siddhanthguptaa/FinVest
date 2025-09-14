// backend/src/routes/product.routes.ts

import { Router, Response } from 'express'; // Added Response here
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { adminMiddleware } from '../middleware/adminMiddleware';

const router = Router();
const prisma = new PrismaClient();

// GET /api/products - Fetch all investment products
// The path is '/' because '/api/products' is already defined in index.ts
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const products = await prisma.investmentProduct.findMany();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occurred while fetching products.' });
    }
});

// POST /api/products - Create a new product (Admin Only)
router.post('/', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const productData = req.body;
        const newProduct = await prisma.investmentProduct.create({
            data: productData,
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occurred while creating the product.' });
    }
});

// PUT /api/products/:id - Update an existing product (Admin Only)
router.put('/:id', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const productData = req.body;
        const updatedProduct = await prisma.investmentProduct.update({
            where: { id: id },
            data: productData,
        });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occurred while updating the product.' });
    }
});

// DELETE /api/products/:id - Delete a product (Admin Only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.investmentProduct.delete({
            where: { id: id },
        });
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An unexpected error occurred while deleting the product.' });
    }
});

export default router;