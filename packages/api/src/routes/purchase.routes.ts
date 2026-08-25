import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';
import { calculateCoupons } from '../services/coupon.service.js';
import { updateClientProgress } from '../services/progress.service.js';
import { triggerRecommendations } from '../services/recommendation.service.js';

const router = Router();

router.post('/admin', verifyToken, requireRole('ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { clientId, items, totalAmount, notes } = req.body;
        const adminId = (req as any).user.id;
        
        const couponsEarned = await calculateCoupons(totalAmount, items);
        
        const purchase = await prisma.purchase.create({
            data: {
                clientId,
                registeredById: adminId,
                totalAmount,
                couponsEarned,
                notes,
                items: {
                    create: items.map((i: any) => ({
                        productId: i.productId,
                        quantity: i.quantity,
                        unitPrice: i.unitPrice,
                        subtotal: i.subtotal
                    }))
                }
            }
        });
        
        const newProgress = await updateClientProgress(clientId, couponsEarned);
        await triggerRecommendations(clientId, purchase.id);
        
        await prisma.notification.create({
            data: {
                clientId,
                title: 'Nova Compra',
                body: `Você ganhou ${couponsEarned} cupons!`,
                type: 'COUPON'
            }
        });
        
        res.json({ success: true, data: { purchase, newProgress } });
    } catch (e) { next(e); }
});

router.get('/admin', verifyToken, requireRole('ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const purchases = await prisma.purchase.findMany({ include: { items: true, client: true } });
        res.json({ success: true, data: purchases });
    } catch (e) { next(e); }
});

router.get('/client', verifyToken, requireRole('CLIENT'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const purchases = await prisma.purchase.findMany({ 
            where: { clientId: (req as any).user.id },
            include: { items: true }
        });
        res.json({ success: true, data: purchases });
    } catch (e) { next(e); }
});

export default router;
