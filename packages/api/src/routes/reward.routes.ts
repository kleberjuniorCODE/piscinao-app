import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/client', verifyToken, requireRole('CLIENT'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rewards = await prisma.clientReward.findMany({ where: { clientId: (req as any).user.id }, include: { reward: true } });
        res.json({ success: true, data: rewards });
    } catch (e) { next(e); }
});

router.post('/admin', verifyToken, requireRole('ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reward = await prisma.reward.create({ data: req.body });
        res.json({ success: true, data: reward });
    } catch (e) { next(e); }
});

export default router;
