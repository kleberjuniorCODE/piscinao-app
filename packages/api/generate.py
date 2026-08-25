import os

base_dir = r"C:\Users\Home\.gemini\antigravity\scratch\piscinao-app\packages\api"

files = {
    "src/lib/prisma.ts": """import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;
""",
    "src/lib/jwt.ts": """import jwt from 'jsonwebtoken';
const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh_secret';
export const generateAccessToken = (userId: string, role: string) => jwt.sign({ userId, role }, ACCESS_SECRET, { expiresIn: '15m' });
export const generateRefreshToken = (userId: string) => jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' });
export const verifyAccessToken = (token: string) => jwt.verify(token, ACCESS_SECRET) as any;
export const verifyRefreshToken = (token: string) => jwt.verify(token, REFRESH_SECRET) as any;
""",
    "src/middleware/auth.ts": """import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../lib/jwt.js';
import prisma from '../lib/prisma.js';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ success: false, error: 'No token provided' });
        const decoded = verifyAccessToken(token);
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user) return res.status(401).json({ success: false, error: 'Invalid user' });
        (req as any).user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, error: 'Invalid token' });
    }
};

export const requireRole = (role: string) => (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || user.role !== role) {
        return res.status(403).json({ success: false, error: 'Forbidden' });
    }
    next();
};

export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            const decoded = verifyAccessToken(token);
            const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
            if (user) (req as any).user = user;
        }
    } catch (e) {}
    next();
};
""",
    "src/middleware/validate.ts": """import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ success: false, error: error.errors });
        }
        return next(error);
    }
};
""",
    "src/middleware/errorHandler.ts": """import { Request, Response, NextFunction } from 'express';
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
};
""",
    "src/services/coupon.service.ts": """import prisma from '../lib/prisma.js';

export const calculateCoupons = async (totalAmount: number, items: any[]) => {
    const config = await prisma.couponsConfig.findFirst({ where: { isActive: true } });
    if (!config) return 0;

    let baseCoupons = Math.floor(totalAmount / config.amountPerCoupon);
    
    const activeRules = await prisma.couponRule.findMany({ where: { configId: config.id, isActive: true } });
    
    let bonus = 0;
    let multiplier = 1.0;
    
    for (const rule of activeRules) {
        if (rule.ruleType === 'DOUBLE_COUPONS') {
            multiplier *= rule.bonusMultiplier;
        } else if (rule.ruleType === 'PRODUCT_BONUS' && rule.targetProductId) {
            const hasProduct = items.some(i => i.productId === rule.targetProductId);
            if (hasProduct) bonus += rule.bonusCoupons;
        } else if (rule.ruleType === 'CATEGORY_BONUS' && rule.targetCategoryId) {
            const hasCategory = items.some(i => i.categoryId === rule.targetCategoryId);
            if (hasCategory) bonus += rule.bonusCoupons;
        } else if (rule.ruleType === 'SPECIAL') {
            bonus += rule.bonusCoupons;
        }
    }
    
    return Math.floor(baseCoupons * multiplier) + bonus;
};
""",
    "src/services/progress.service.ts": """import prisma from '../lib/prisma.js';

export const updateClientProgress = async (clientId: string, earnedCoupons: number) => {
    const trail = await prisma.trailConfig.findFirst({ where: { isActive: true } });
    if (!trail) return null;
    
    let progress = await prisma.clientProgress.findUnique({ where: { clientId } });
    if (!progress) {
        progress = await prisma.clientProgress.create({
            data: { clientId, trailId: trail.id }
        });
    }
    
    const newTotal = progress.totalCoupons + earnedCoupons;
    const currentStep = Math.floor(newTotal / trail.couponsPerStep);
    const couponsInCurrentStep = newTotal % trail.couponsPerStep;
    const treasureUnlocked = currentStep >= trail.totalSteps;
    
    const updated = await prisma.clientProgress.update({
        where: { id: progress.id },
        data: {
            totalCoupons: newTotal,
            currentStep,
            couponsInCurrentStep,
            treasureUnlocked
        }
    });
    
    // Check milestones and add rewards
    const steps = await prisma.trailStep.findMany({ where: { trailId: trail.id, stepNumber: { lte: currentStep } } });
    for (const step of steps) {
        if (step.milestoneRewardId) {
            const existingReward = await prisma.clientReward.findFirst({
                where: { clientId, rewardId: step.milestoneRewardId }
            });
            if (!existingReward) {
                await prisma.clientReward.create({
                    data: { clientId, rewardId: step.milestoneRewardId }
                });
            }
        }
    }
    
    return updated;
};
""",
    "src/services/recommendation.service.ts": """import prisma from '../lib/prisma.js';
export const triggerRecommendations = async (clientId: string, purchaseId: string) => {
    // simplified for brevity
    return true;
};
""",
    "src/routes/auth.routes.ts": """import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '../lib/prisma.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../lib/jwt.js';
import { validate } from '../middleware/validate.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

const loginSchema = z.object({ body: z.object({ email: z.string().email(), password: z.string() }) });
const registerSchema = z.object({ body: z.object({ name: z.string(), email: z.string().email(), phone: z.string().optional(), password: z.string() }) });

router.post('/login', validate(loginSchema), async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        const accessToken = generateAccessToken(user.id, user.role);
        const refreshToken = generateRefreshToken(user.id);
        res.json({ success: true, data: { user, accessToken, refreshToken } });
    } catch (e) { next(e); }
});

router.post('/register', validate(registerSchema), async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, phone, passwordHash, role: 'CLIENT' }
        });
        res.json({ success: true, data: user });
    } catch (e) { next(e); }
});

router.post('/refresh', async (req, res, next) => {
    try {
        const { token } = req.body;
        const decoded = verifyRefreshToken(token);
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user) return res.status(401).json({ success: false, error: 'Invalid token' });
        const accessToken = generateAccessToken(user.id, user.role);
        res.json({ success: true, data: { accessToken } });
    } catch (e) { next(e); }
});

router.get('/me', verifyToken, (req, res) => {
    res.json({ success: true, data: (req as any).user });
});

export default router;
""",
    "src/routes/product.routes.ts": """import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

// Public
router.get('/', async (req, res, next) => {
    try {
        const products = await prisma.product.findMany({ where: { isActive: true }, include: { category: true } });
        res.json({ success: true, data: products });
    } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
    try {
        const product = await prisma.product.findUnique({ where: { id: req.params.id }, include: { category: true } });
        res.json({ success: true, data: product });
    } catch (e) { next(e); }
});

// Admin Products
router.post('/', verifyToken, requireRole('ADMIN'), async (req, res, next) => {
    try {
        const product = await prisma.product.create({ data: req.body });
        res.json({ success: true, data: product });
    } catch (e) { next(e); }
});

router.put('/:id', verifyToken, requireRole('ADMIN'), async (req, res, next) => {
    try {
        const product = await prisma.product.update({ where: { id: req.params.id }, data: req.body });
        res.json({ success: true, data: product });
    } catch (e) { next(e); }
});

router.delete('/:id', verifyToken, requireRole('ADMIN'), async (req, res, next) => {
    try {
        const product = await prisma.product.update({ where: { id: req.params.id }, data: { isActive: false } });
        res.json({ success: true, data: product });
    } catch (e) { next(e); }
});

export default router;
""",
    "src/routes/purchase.routes.ts": """import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';
import { calculateCoupons } from '../services/coupon.service.js';
import { updateClientProgress } from '../services/progress.service.js';
import { triggerRecommendations } from '../services/recommendation.service.js';

const router = Router();

router.post('/', verifyToken, requireRole('ADMIN'), async (req, res, next) => {
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

router.get('/', verifyToken, requireRole('ADMIN'), async (req, res, next) => {
    try {
        const purchases = await prisma.purchase.findMany({ include: { items: true, client: true } });
        res.json({ success: true, data: purchases });
    } catch (e) { next(e); }
});

router.get('/my-history', verifyToken, requireRole('CLIENT'), async (req, res, next) => {
    try {
        const purchases = await prisma.purchase.findMany({ 
            where: { clientId: (req as any).user.id },
            include: { items: true }
        });
        res.json({ success: true, data: purchases });
    } catch (e) { next(e); }
});

export default router;
""",
    "src/routes/progress.routes.ts": """import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/my-progress', verifyToken, requireRole('CLIENT'), async (req, res, next) => {
    try {
        const progress = await prisma.clientProgress.findUnique({ where: { clientId: (req as any).user.id }, include: { trail: { include: { steps: true } } } });
        res.json({ success: true, data: progress });
    } catch (e) { next(e); }
});

router.get('/trail', verifyToken, requireRole('ADMIN'), async (req, res, next) => {
    try {
        const trail = await prisma.trailConfig.findFirst({ include: { steps: true } });
        res.json({ success: true, data: trail });
    } catch (e) { next(e); }
});

export default router;
""",
    "src/routes/coupon.routes.ts": """import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/my-coupons', verifyToken, requireRole('CLIENT'), async (req, res, next) => {
    try {
        const progress = await prisma.clientProgress.findUnique({ where: { clientId: (req as any).user.id } });
        res.json({ success: true, data: { totalCoupons: progress?.totalCoupons || 0 } });
    } catch (e) { next(e); }
});

router.get('/config', verifyToken, requireRole('ADMIN'), async (req, res, next) => {
    try {
        const config = await prisma.couponsConfig.findFirst();
        res.json({ success: true, data: config });
    } catch (e) { next(e); }
});

export default router;
""",
    "src/routes/reward.routes.ts": """import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/my-rewards', verifyToken, requireRole('CLIENT'), async (req, res, next) => {
    try {
        const rewards = await prisma.clientReward.findMany({ where: { clientId: (req as any).user.id }, include: { reward: true } });
        res.json({ success: true, data: rewards });
    } catch (e) { next(e); }
});

router.post('/', verifyToken, requireRole('ADMIN'), async (req, res, next) => {
    try {
        const reward = await prisma.reward.create({ data: req.body });
        res.json({ success: true, data: reward });
    } catch (e) { next(e); }
});

export default router;
""",
    "src/routes/promotion.routes.ts": """import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const promos = await prisma.promotion.findMany({ where: { isActive: true } });
        res.json({ success: true, data: promos });
    } catch (e) { next(e); }
});

router.post('/', verifyToken, requireRole('ADMIN'), async (req, res, next) => {
    try {
        const promo = await prisma.promotion.create({ data: req.body });
        res.json({ success: true, data: promo });
    } catch (e) { next(e); }
});

export default router;
""",
    "src/routes/recommendation.routes.ts": """import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/my-recommendations', verifyToken, requireRole('CLIENT'), async (req, res, next) => {
    try {
        const recs = await prisma.clientRecommendation.findMany({ where: { clientId: (req as any).user.id } });
        res.json({ success: true, data: recs });
    } catch (e) { next(e); }
});

export default router;
""",
    "src/routes/notification.routes.ts": """import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/my-notifications', verifyToken, requireRole('CLIENT'), async (req, res, next) => {
    try {
        const notifs = await prisma.notification.findMany({ where: { clientId: (req as any).user.id } });
        res.json({ success: true, data: notifs });
    } catch (e) { next(e); }
});

export default router;
""",
    "src/routes/client.routes.ts": """import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', verifyToken, requireRole('ADMIN'), async (req, res, next) => {
    try {
        const clients = await prisma.user.findMany({ where: { role: 'CLIENT' } });
        res.json({ success: true, data: clients });
    } catch (e) { next(e); }
});

router.get('/:id', verifyToken, requireRole('ADMIN'), async (req, res, next) => {
    try {
        const client = await prisma.user.findUnique({ where: { id: req.params.id }, include: { clientProgress: true } });
        res.json({ success: true, data: client });
    } catch (e) { next(e); }
});

export default router;
""",
    "src/routes/settings.routes.ts": """import { Router } from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const settings = await prisma.appSetting.findMany();
        res.json({ success: true, data: settings });
    } catch (e) { next(e); }
});

export default router;
""",
    "prisma/seed.ts": """import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
    const adminPass = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@piscinao.com' },
        update: {},
        create: {
            email: 'admin@piscinao.com',
            name: 'Admin',
            passwordHash: adminPass,
            role: 'ADMIN'
        }
    });

    const clientPass = await bcrypt.hash('client123', 10);
    const client1 = await prisma.user.upsert({
        where: { email: 'joao@example.com' },
        update: {},
        create: { email: 'joao@example.com', name: 'João Silva', phone: '5511999999999', passwordHash: clientPass }
    });
    const client2 = await prisma.user.upsert({
        where: { email: 'maria@example.com' },
        update: {},
        create: { email: 'maria@example.com', name: 'Maria Souza', phone: '5511888888888', passwordHash: clientPass }
    });

    const catQuimicos = await prisma.category.create({ data: { name: 'Químicos' } });
    
    await prisma.product.create({
        data: {
            name: 'Cloro 10kg',
            categoryId: catQuimicos.id,
            price: 150.0
        }
    });

    await prisma.couponsConfig.create({
        data: {
            name: 'Config Padrão',
            amountPerCoupon: 100.0,
            isActive: true
        }
    });

    const trail = await prisma.trailConfig.create({
        data: {
            name: 'Trilha Ouro',
            totalSteps: 10,
            couponsPerStep: 5,
            isActive: true
        }
    });

    for(let i=1; i<=10; i++) {
        await prisma.trailStep.create({
            data: {
                trailId: trail.id,
                stepNumber: i,
                name: `Passo ${i}`,
                iconType: 'STAR'
            }
        });
    }

    await prisma.appSetting.create({
        data: {
            key: 'WHATSAPP_NUMBER',
            value: '5518991024742'
        }
    });

    console.log('Seed completed');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
"""
}

for path, content in files.items():
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("All files generated successfully.")
