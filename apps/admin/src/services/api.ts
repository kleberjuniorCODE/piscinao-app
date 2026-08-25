import axios from 'axios';
import { User, Product, Category, Purchase, Reward, Promotion, RecommendationRule } from '../types';

const API_BASE = '/api';

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('piscinao_admin_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock data fallbacks for standalone admin testing
export const mockClients: User[] = [
  { id: 'c1', name: 'João Silva', email: 'joao@email.com', phone: '(18) 99123-4567', role: 'CLIENT', isActive: true, createdAt: '2026-01-15' },
  { id: 'c2', name: 'Maria Oliveira', email: 'maria@email.com', phone: '(18) 99876-5432', role: 'CLIENT', isActive: true, createdAt: '2026-02-10' },
  { id: 'c3', name: 'Carlos Santos', email: 'carlos@email.com', phone: '(18) 99555-1234', role: 'CLIENT', isActive: true, createdAt: '2026-03-01' },
];

export const mockCategories: Category[] = [
  { id: 'cat1', name: 'Produtos Químicos', description: 'Tratamento e purificação de água', sortOrder: 1, isActive: true },
  { id: 'cat2', name: 'Equipamentos', description: 'Filtros e motobombas', sortOrder: 2, isActive: true },
  { id: 'cat3', name: 'Acessórios', description: 'Peneiras, escovas e mangueiras', sortOrder: 3, isActive: true },
  { id: 'cat4', name: 'Lazer e Móveis', description: 'Boias e cadeiras de alumínio', sortOrder: 4, isActive: true },
];

export const mockProducts: Product[] = [
  { id: 'p1', categoryId: 'cat1', name: 'Cloro Granulado 10kg', description: 'Tratamento de choque e manutenção regular', price: 189.90, showPrice: true, isActive: true, sortOrder: 1 },
  { id: 'p2', categoryId: 'cat1', name: 'Algicida de Choque 1L', description: 'Elimina algas rapidamente', price: 45.00, showPrice: true, isActive: true, sortOrder: 2 },
  { id: 'p3', categoryId: 'cat1', name: 'Clarificante 1L', description: 'Decanta sujeiras em suspensão', price: 32.50, showPrice: true, isActive: true, sortOrder: 3 },
  { id: 'p4', categoryId: 'cat2', name: 'Motobomba 1/2 CV', description: 'Alta eficiência energética para piscinas até 40.000L', price: 890.00, showPrice: true, isActive: true, sortOrder: 4 },
  { id: 'p5', categoryId: 'cat3', name: 'Kit Limpeza Completo', description: 'Haste, peneira, escova e mangueira 7m', price: 210.00, showPrice: true, isActive: true, sortOrder: 5 },
];

export const mockPurchases: Purchase[] = [
  { id: 'pur1', clientId: 'c1', clientName: 'João Silva', totalAmount: 500.00, couponsEarned: 5, notes: 'Balcão loja', purchaseDate: '2026-05-10', items: [{ id: 'pi1', productId: 'p1', productName: 'Cloro Granulado 10kg', quantity: 2, unitPrice: 189.90, subtotal: 379.80 }] },
  { id: 'pur2', clientId: 'c2', clientName: 'Maria Oliveira', totalAmount: 250.00, couponsEarned: 2, notes: 'Entrega domiciliar', purchaseDate: '2026-05-12', items: [{ id: 'pi2', productId: 'p5', productName: 'Kit Limpeza Completo', quantity: 1, unitPrice: 210.00, subtotal: 210.00 }] },
];

export const mockRewards: Reward[] = [
  { id: 'r1', name: 'Kit Tratamento de Verão', description: '1 Cloro 2kg + 1 Algicida 1L + 1 Fita Teste', couponsRequired: 50, isFinalReward: true, status: 'ACTIVE' },
  { id: 'r2', name: 'Boia Inflável Gigante', description: 'Boia temática para área de lazer', couponsRequired: 25, isFinalReward: false, status: 'ACTIVE' },
];

export const mockPromotions: Promotion[] = [
  { id: 'promo1', title: 'Promoção Cloro 10kg', description: 'Desconto especial para clientes fidelidade', productId: 'p1', discountPercent: 15, isActive: true },
];

export const mockRecommendationRules: RecommendationRule[] = [
  { id: 'rule1', triggerType: 'DAYS_SINCE_PURCHASE', productId: 'p1', intervalDays: 90, messageTitle: '💧 Seu cloro está acabando!', messageBody: 'Já se passaram 90 dias da sua última compra de cloro. Aproveite nossa oferta especial para manter sua água cristalina!', recommendedProductId: 'p1', isActive: true },
];
