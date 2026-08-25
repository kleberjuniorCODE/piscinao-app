import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

// Public
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await prisma.product.findMany({ where: { isActive: true }, include: { category: true } });
        res.json({ success: true, data: products });
    } catch (e) { next(e); }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.findUnique({ where: { id: req.params.id }, include: { category: true } });
        res.json({ success: true, data: product });
    } catch (e) { next(e); }
});

// Admin Products
router.post('/admin', verifyToken, requireRole('ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.create({ data: req.body });
        res.json({ success: true, data: product });
    } catch (e) { next(e); }
});

router.put('/admin/:id', verifyToken, requireRole('ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.update({ where: { id: req.params.id }, data: req.body });
        res.json({ success: true, data: product });
    } catch (e) { next(e); }
});

router.delete('/admin/:id', verifyToken, requireRole('ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.update({ where: { id: req.params.id }, data: { isActive: false } });
        res.json({ success: true, data: product });
    } catch (e) { next(e); }
});

export default router;
