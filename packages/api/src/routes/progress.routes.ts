import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/client', verifyToken, requireRole('CLIENT'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const progress = await prisma.clientProgress.findUnique({ where: { clientId: (req as any).user.id }, include: { trail: { include: { steps: true } } } });
        res.json({ success: true, data: progress });
    } catch (e) { next(e); }
});

router.get('/admin/trail', verifyToken, requireRole('ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const trail = await prisma.trailConfig.findFirst({ include: { steps: true } });
        res.json({ success: true, data: trail });
    } catch (e) { next(e); }
});

export default router;
