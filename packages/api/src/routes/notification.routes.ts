import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/client', verifyToken, requireRole('CLIENT'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifs = await prisma.notification.findMany({ where: { clientId: (req as any).user.id } });
        res.json({ success: true, data: notifs });
    } catch (e) { next(e); }
});

export default router;
