import { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ADMINS_STORE_PATH = path.join(__dirname, '../../admins_store_data.json');

export interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  password?: string;
}

const defaultAdmins: AdminUserItem[] = [
  {
    id: 'adm_1',
    name: 'Administrador Principal',
    email: 'admin@piscinao.com.br',
    phone: '(18) 99999-9999',
    role: 'Administrador Geral',
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  {
    id: 'adm_2',
    name: 'Kleber Araújo',
    email: 'kleber.admin@piscinao.com.br',
    phone: '(18) 99122-5211',
    role: 'Gerente da Loja',
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  }
];

export function getAdminsStore(): AdminUserItem[] {
  try {
    if (!fs.existsSync(ADMINS_STORE_PATH)) {
      fs.writeFileSync(ADMINS_STORE_PATH, JSON.stringify(defaultAdmins, null, 2));
      return defaultAdmins;
    }
    const data = fs.readFileSync(ADMINS_STORE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return defaultAdmins;
  }
}

export function saveAdminsStore(admins: AdminUserItem[]) {
  try {
    fs.writeFileSync(ADMINS_STORE_PATH, JSON.stringify(admins, null, 2));
  } catch (e) {}
}

const router = Router();

// GET all admin users
router.get('/admins', (req: Request, res: Response) => {
  try {
    const admins = getAdminsStore();
    res.json({ success: true, data: admins });
  } catch (e: any) {
    res.status(500).json({ success: false, error: 'Erro ao buscar administradores' });
  }
});

// POST create new admin user
router.post('/admins', (req: Request, res: Response) => {
  try {
    const { name, email, phone, role, password, isActive } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Nome e email são obrigatórios' });
    }

    const admins = getAdminsStore();
    
    // Check if email exists
    if (admins.some(a => a.email.toLowerCase() === email.trim().toLowerCase())) {
      return res.status(400).json({ success: false, error: 'Já existe um administrador com este email.' });
    }

    const newAdmin: AdminUserItem = {
      id: `adm_${Date.now()}`,
      name,
      email: email.trim().toLowerCase(),
      phone: phone || '(18) 99999-9999',
      role: role || 'Administrador Geral',
      isActive: isActive !== false,
      createdAt: new Date().toISOString(),
      password: password || '123456'
    };

    admins.push(newAdmin);
    saveAdminsStore(admins);

    res.json({ success: true, data: newAdmin, message: 'Administrador criado com sucesso!' });
  } catch (e: any) {
    res.status(500).json({ success: false, error: 'Erro ao criar administrador' });
  }
});

// PUT update admin user
router.put('/admins/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role, isActive, password } = req.body;

    const admins = getAdminsStore();
    const index = admins.findIndex(a => a.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Administrador não encontrado' });
    }

    admins[index] = {
      ...admins[index],
      name: name !== undefined ? name : admins[index].name,
      email: email !== undefined ? email.trim().toLowerCase() : admins[index].email,
      phone: phone !== undefined ? phone : admins[index].phone,
      role: role !== undefined ? role : admins[index].role,
      isActive: isActive !== undefined ? isActive : admins[index].isActive,
      password: password ? password : admins[index].password
    };

    saveAdminsStore(admins);
    res.json({ success: true, data: admins[index], message: 'Administrador atualizado com sucesso!' });
  } catch (e: any) {
    res.status(500).json({ success: false, error: 'Erro ao atualizar administrador' });
  }
});

// DELETE admin user
router.delete('/admins/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let admins = getAdminsStore();

    if (admins.length <= 1) {
      return res.status(400).json({ success: false, error: 'Você não pode remover o único administrador do sistema.' });
    }

    admins = admins.filter(a => a.id !== id);
    saveAdminsStore(admins);

    res.json({ success: true, message: 'Administrador removido com sucesso!' });
  } catch (e: any) {
    res.status(500).json({ success: false, error: 'Erro ao remover administrador' });
  }
});

export default router;
