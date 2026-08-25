import { Request, Response, NextFunction } from 'express';
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
