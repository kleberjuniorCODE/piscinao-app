import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/client', verifyToken, requireRole('CLIENT'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const progress = await prisma.clientProgress.findUnique({ where: { clientId: (req as any).user.id } });
        res.json({ success: true, data: { totalCoupons: progress?.totalCoupons || 0 } });
    } catch (e) { next(e); }
});

router.get('/admin/config', verifyToken, requireRole('ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const config = await prisma.couponsConfig.findFirst();
        res.json({ success: true, data: config });
    } catch (e) { next(e); }
});

export default router;
