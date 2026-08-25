import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const promos = await prisma.promotion.findMany({ where: { isActive: true } });
        res.json({ success: true, data: promos });
    } catch (e) { next(e); }
});

router.post('/admin', verifyToken, requireRole('ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const promo = await prisma.promotion.create({ data: req.body });
        res.json({ success: true, data: promo });
    } catch (e) { next(e); }
});

export default router;
