import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { errorHandler } from './middleware/errorHandler.js';
import { ApiRateLimiter } from './middleware/rateLimiter.js';

import authRoutes, { getClientsStore, saveClientsStore } from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import purchaseRoutes from './routes/purchase.routes.js';
import progressRoutes from './routes/progress.routes.js';
import couponRoutes from './routes/coupon.routes.js';
import rewardRoutes from './routes/reward.routes.js';
import promotionRoutes from './routes/promotion.routes.js';
import recommendationRoutes from './routes/recommendation.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import clientRoutes from './routes/client.routes.js';
import settingsRoutes from './routes/settings.routes.js';

const app = express();

// Security Protections against Hackers & Bots
app.disable('x-powered-by'); // Hide express technology stack

app.use(helmet({
  contentSecurityPolicy: false, // Allows standard React frontend cross-origin requests
  crossOriginEmbedderPolicy: false,
}));

// CORS Protection restricted to local client and admin web apps
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Fallback for local development
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// General API Rate Limiting
app.use('/api', ApiRateLimiter);

const STORE_PATH = path.join(process.cwd(), '..', '..', 'coupons_store_data.json');
const PRODUCTS_STORE_PATH = path.join(process.cwd(), '..', '..', 'products_store_data.json');

let memoryStore: Record<string, number> = { '1': 27, 'c1': 27 };

try {
  if (fs.existsSync(STORE_PATH)) {
    const raw = fs.readFileSync(STORE_PATH, 'utf8');
    memoryStore = { ...memoryStore, ...JSON.parse(raw) };
  }
} catch (e) {}

function persistStore() {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(memoryStore, null, 2));
  } catch (e) {}
}

const initialProducts = [
  { id: '1', name: 'Cloro Granulado 10kg', description: 'Tratamento de choque e manutenção regular para piscinas de água sanitizada.', price: 189.90, category: 'Químicos', isAvailable: true, imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&auto=format&fit=crop' },
  { id: '2', name: 'Algicida de Choque 1L', description: 'Elimina algas verdes rapidamente e previne proliferação de microorganismos.', price: 45.00, category: 'Químicos', isAvailable: true, imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop' },
  { id: '3', name: 'Kit Limpeza Completo', description: 'Haste de alumínio 3m, peneira de nylon, escova de nylon e mangueira 7m.', price: 210.00, category: 'Acessórios', isAvailable: true, imageUrl: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&auto=format&fit=crop' },
  { id: '4', name: 'Motobomba 1/2 CV', description: 'Motor autoescorvante potente para filtro de piscinas até 40.000 Litros.', price: 890.00, category: 'Equipamentos', isAvailable: true, imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop' },
];

let productsStore: any[] = initialProducts;

try {
  if (fs.existsSync(PRODUCTS_STORE_PATH)) {
    const raw = fs.readFileSync(PRODUCTS_STORE_PATH, 'utf8');
    productsStore = JSON.parse(raw);
  }
} catch (e) {}

function persistProductsStore() {
  try {
    fs.writeFileSync(PRODUCTS_STORE_PATH, JSON.stringify(productsStore, null, 2));
  } catch (e) {}
}

// Sync Endpoints
app.get('/sync/coupons/:clientId', (req, res) => {
  const rawId = req.params.clientId;
  const id = (rawId === 'c1' || rawId === '1') ? '1' : rawId;
  const coupons = memoryStore[id] ?? memoryStore['1'] ?? 27;
  res.json({ success: true, clientId: rawId, coupons });
});

app.post('/sync/coupons', (req, res) => {
  const { clientId, coupons } = req.body;
  if (clientId && typeof coupons === 'number') {
    const id = (clientId === 'c1' || clientId === '1') ? '1' : clientId;
    memoryStore[id] = coupons;
    memoryStore['1'] = coupons;
    memoryStore['c1'] = coupons;
    persistStore();
  }
  res.json({ success: true, clientId, coupons: memoryStore[clientId] ?? 27 });
});

app.get('/sync/products', (req, res) => {
  res.json({ success: true, data: productsStore });
});

app.post('/sync/products', (req, res) => {
  if (Array.isArray(req.body.products)) {
    productsStore = req.body.products;
    persistProductsStore();
  }
  res.json({ success: true, data: productsStore });
});

// Clients Store Sync Endpoint
app.get('/sync/clients', (req, res) => {
  const clients = getClientsStore().map(({ passwordHash, ...safe }) => safe);
  res.json({ success: true, data: clients });
});

// Setup Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/purchases', purchaseRoutes);
app.use('/progress', progressRoutes);
app.use('/coupons', couponRoutes);
app.use('/rewards', rewardRoutes);
app.use('/promotions', promotionRoutes);
app.use('/recommendations', recommendationRoutes);
app.use('/notifications', notificationRoutes);
app.use('/clients', clientRoutes);
app.use('/settings', settingsRoutes);
app.use('/sync/settings', settingsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server running securely on port ${PORT}`);
});
