import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh_secret';

export const generateAccessToken = (userId: string, role: string) => jwt.sign({ userId, role }, ACCESS_SECRET, { expiresIn: '15m' });
export const generateRefreshToken = (userId: string) => jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' });
export const verifyAccessToken = (token: string) => jwt.verify(token, ACCESS_SECRET) as any;
export const verifyRefreshToken = (token: string) => jwt.verify(token, REFRESH_SECRET) as any;
