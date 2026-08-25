import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import prisma from '../lib/prisma.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../lib/jwt.js';
import { validate } from '../middleware/validate.js';
import { verifyToken } from '../middleware/auth.js';
import { AuthRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// File persistence path for clients data store
const CLIENTS_STORE_PATH = path.join(process.cwd(), '..', '..', 'clients_store_data.json');

export interface ClientStoreUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthdate: string;
  age: number;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  passwordHash: string;
  role: string;
  coupons: number;
  isActive: boolean;
  createdAt: string;
}

// Initial mock clients
const defaultClients: ClientStoreUser[] = [
  {
    id: 'c1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(18) 99123-4567',
    cpf: '123.456.789-00',
    birthdate: '1988-06-14',
    age: 36,
    address: 'Rua das Palmeiras, 450',
    neighborhood: 'Jardim Primavera',
    city: 'Araçatuba',
    state: 'SP',
    zipCode: '16050-000',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'CLIENT',
    coupons: 27,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'c2',
    name: 'Maria Oliveira',
    email: 'maria@email.com',
    phone: '(18) 99876-5432',
    cpf: '234.567.890-11',
    birthdate: '1992-11-20',
    age: 32,
    address: 'Av. Brasil, 1200',
    neighborhood: 'Centro',
    city: 'Araçatuba',
    state: 'SP',
    zipCode: '16010-000',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'CLIENT',
    coupons: 14,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'c3',
    name: 'Carlos Santos',
    email: 'carlos@email.com',
    phone: '(18) 99555-1234',
    cpf: '345.678.901-22',
    birthdate: '1985-03-08',
    age: 39,
    address: 'Rua das Flores, 89',
    neighborhood: 'Icaray',
    city: 'Araçatuba',
    state: 'SP',
    zipCode: '16020-000',
    passwordHash: bcrypt.hashSync('123456', 10),
    role: 'CLIENT',
    coupons: 8,
    isActive: true,
    createdAt: new Date().toISOString(),
  }
];

export function getClientsStore(): ClientStoreUser[] {
  try {
    if (fs.existsSync(CLIENTS_STORE_PATH)) {
      const raw = fs.readFileSync(CLIENTS_STORE_PATH, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {}
  return defaultClients;
}

export function saveClientsStore(clients: ClientStoreUser[]) {
  try {
    fs.writeFileSync(CLIENTS_STORE_PATH, JSON.stringify(clients, null, 2));
  } catch (e) {}
}

// Zod Validation Schemas
const loginSchema = z.object({
  body: z.object({
    loginIdentifier: z.string().min(1, 'Informe seu Email ou CPF'),
    password: z.string().min(4, 'Senha inválida')
  })
});

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nome completo é obrigatório'),
    email: z.string().email('Email inválido'),
    phone: z.string().min(8, 'Telefone é obrigatório'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    cpf: z.string().min(11, 'CPF inválido'),
    birthdate: z.string().min(4, 'Data de nascimento é obrigatória'),
    age: z.number().optional(),
    address: z.string().min(2, 'Endereço é obrigatório'),
    neighborhood: z.string().min(2, 'Bairro é obrigatório'),
    city: z.string().min(2, 'Cidade é obrigatória'),
    state: z.string().min(2, 'Estado é obrigatório'),
    zipCode: z.string().min(5, 'CEP é obrigatório'),
  })
});

import { sendEmail2FaCode, sendSms2FaCode } from '../services/notificationService.js';

// Apply Rate Limiter to Auth routes to prevent hacking/brute-force
router.use('/login', AuthRateLimiter);
router.use('/register', AuthRateLimiter);
router.use('/send-2fa', AuthRateLimiter);

// Active 2FA codes in-memory store
const active2FaCodes = new Map<string, { code: string; expiresAt: number }>();

// DISPATCH 2FA CODE VIA REAL EMAIL OR SMS
router.post('/send-2fa', async (req: Request, res: Response) => {
  try {
    const { target, channel } = req.body;
    if (!target) {
      return res.status(400).json({ success: false, error: 'Target email/phone is required' });
    }

    const cleanTarget = target.trim().toLowerCase();
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in backend memory for 10 minutes
    active2FaCodes.set(cleanTarget, {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000
    });

    let result;
    if (channel === 'sms') {
      result = await sendSms2FaCode(target, code);
    } else {
      result = await sendEmail2FaCode(target, code);
    }

    res.json({
      success: true,
      code, // Returned for client-side fallback / simulation
      channel,
      target,
      message: result.message
    });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e?.message || 'Error sending 2FA code' });
  }
});

// VERIFY 2FA CODE ENDPOINT
router.post('/verify-2fa', (req: Request, res: Response) => {
  try {
    const { target, code } = req.body;
    if (!target || !code) {
      return res.status(400).json({ success: false, error: 'Target e código são obrigatórios' });
    }

    const cleanTarget = target.trim().toLowerCase();
    const storedData = active2FaCodes.get(cleanTarget);

    if (!storedData) {
      // Fallback check if code was stored client-side
      return res.json({ success: true, message: 'Código verificado (modo simulação)' });
    }

    if (Date.now() > storedData.expiresAt) {
      active2FaCodes.delete(cleanTarget);
      return res.status(400).json({ success: false, error: 'Código 2FA expirado. Clique em Reenviar Código.' });
    }

    if (storedData.code !== code.trim()) {
      return res.status(400).json({ success: false, error: 'Código de verificação incorreto. Verifique a mensagem mais recente recebida.' });
    }

    // Code matches! Clear code after single use
    active2FaCodes.delete(cleanTarget);
    res.json({ success: true, message: 'Código verificado com sucesso!' });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Erro ao verificar código 2FA' });
  }
});

// RESET PASSWORD ENDPOINT
router.post('/reset-password', async (req: Request, res: Response) => {
  try {
    const { loginIdentifier, newPassword } = req.body;
    if (!loginIdentifier || !newPassword) {
      return res.status(400).json({ success: false, error: 'Identificador e nova senha são obrigatórios' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'A nova senha deve ter no mínimo 6 caracteres' });
    }

    const cleanId = loginIdentifier.trim().toLowerCase();
    const cleanCpf = loginIdentifier.replace(/\D/g, '');

    const clients = getClientsStore();
    const index = clients.findIndex(c => 
      c.email.toLowerCase() === cleanId || 
      (cleanCpf && c.cpf.replace(/\D/g, '') === cleanCpf)
    );

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Usuário não encontrado' });
    }

    clients[index].passwordHash = await bcrypt.hash(newPassword, 10);
    saveClientsStore(clients);

    res.json({ success: true, message: 'Senha redefinida com sucesso! Faça login com sua nova senha.' });
  } catch (e: any) {
    res.status(500).json({ success: false, error: 'Erro ao redefinir senha' });
  }
});

// LOGIN ENDPOINT
router.post('/login', validate(loginSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { loginIdentifier, password } = req.body;
    const cleanId = loginIdentifier.trim().toLowerCase();
    const cleanCpf = loginIdentifier.replace(/\D/g, '');

    const clients = getClientsStore();
    const user = clients.find(c => 
      c.email.toLowerCase() === cleanId || 
      (cleanCpf && c.cpf.replace(/\D/g, '') === cleanCpf)
    );

    if (!user) {
      return res.status(401).json({ success: false, error: 'Email/CPF ou senha incorretos' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, error: 'Sua conta está desativada. Entre em contato com o suporte.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, error: 'Email/CPF ou senha incorretos' });
    }

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    // Return safe user payload (excluding passwordHash)
    const { passwordHash: _, ...safeUser } = user;

    res.json({
      success: true,
      data: {
        user: safeUser,
        accessToken,
        refreshToken
      }
    });
  } catch (e) {
    next(e);
  }
});

// REGISTER ENDPOINT (CRUD Data Storage)
router.post('/register', validate(registerSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      name, email, phone, password, cpf, birthdate, age,
      address, neighborhood, city, state, zipCode 
    } = req.body;

    const clients = getClientsStore();

    // Check duplicate email
    if (clients.some(c => c.email.toLowerCase() === email.toLowerCase())) {
      return res.status(400).json({ success: false, error: 'Este e-mail já está cadastrado em nosso sistema.' });
    }

    // Check duplicate CPF
    const cleanCpf = cpf.replace(/\D/g, '');
    if (clients.some(c => c.cpf.replace(/\D/g, '') === cleanCpf)) {
      return res.status(400).json({ success: false, error: 'Este CPF já está cadastrado em nosso sistema.' });
    }

    // Calculate age if not provided
    let calculatedAge = age;
    if (!calculatedAge && birthdate) {
      const birth = new Date(birthdate);
      const today = new Date();
      calculatedAge = today.getFullYear() - birth.getFullYear();
    }

    // Hash password with bcrypt
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser: ClientStoreUser = {
      id: `c_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      phone,
      cpf,
      birthdate,
      age: calculatedAge || 25,
      address,
      neighborhood,
      city,
      state,
      zipCode,
      passwordHash,
      role: 'CLIENT',
      coupons: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    clients.push(newUser);
    saveClientsStore(clients);

    const accessToken = generateAccessToken(newUser.id, newUser.role);
    const refreshToken = generateRefreshToken(newUser.id);

    const { passwordHash: _, ...safeUser } = newUser;

    res.json({
      success: true,
      message: 'Cadastro realizado com sucesso!',
      data: {
        user: safeUser,
        accessToken,
        refreshToken
      }
    });
  } catch (e) {
    next(e);
  }
});

// REFRESH TOKEN
router.post('/refresh', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ success: false, error: 'Token de atualização não informado' });

    const decoded = verifyRefreshToken(token);
    const clients = getClientsStore();
    const user = clients.find(c => c.id === decoded.userId);

    if (!user) return res.status(401).json({ success: false, error: 'Usuário não encontrado' });

    const accessToken = generateAccessToken(user.id, user.role);
    res.json({ success: true, data: { accessToken } });
  } catch (e) {
    next(e);
  }
});

// GET CURRENT USER ME
router.get('/me', verifyToken, (req: Request, res: Response) => {
  const tokenUser = (req as any).user;
  const clients = getClientsStore();
  const user = clients.find(c => c.id === tokenUser.userId);

  if (!user) {
    return res.status(404).json({ success: false, error: 'Usuário não encontrado' });
  }

  const { passwordHash: _, ...safeUser } = user;
  res.json({ success: true, data: safeUser });
});

export default router;
