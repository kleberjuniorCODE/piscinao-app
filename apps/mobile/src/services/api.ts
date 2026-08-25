import axios from 'axios';
import { User, Product, Reward, Purchase } from '../types';

const API_BASE = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Mock Data
export const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao@example.com',
  phone: '18999999999',
  coupons: 27,
};

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Cloro Granulado 10kg',
    description: 'Cloro de alta qualidade para tratamento de piscinas.',
    price: 150.0,
    category: 'Químicos',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Filtro para Piscina',
    description: 'Filtro eficiente para manter a água limpa.',
    price: 300.0,
    category: 'Equipamentos',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Boia Inflável Gigante',
    description: 'Diversão garantida para toda a família.',
    price: 89.9,
    category: 'Lazer',
    imageUrl: 'https://via.placeholder.com/150',
  }
];

export const mockRewards: Reward[] = [
  { id: '1', title: 'Boia Infantil', description: 'Resgate por 10 cupons', cost: 10, isClaimed: true },
  { id: '2', title: 'Kit Limpeza Básico', description: 'Resgate por 25 cupons', cost: 25, isClaimed: true },
  { id: '3', title: 'Desconto de 50%', description: 'Em produtos químicos', cost: 50, isClaimed: false },
];

export const mockPurchases: Purchase[] = [
  { id: '1', date: '2023-10-01', amount: 200.0, couponsEarned: 2, items: ['Cloro'] },
  { id: '2', date: '2023-11-15', amount: 450.0, couponsEarned: 4, items: ['Filtro', 'Boia'] },
];

export const ApiService = {
  login: async (email: string, pass: string): Promise<User> => {
    return new Promise(resolve => setTimeout(() => resolve(mockUser), 1000));
  },
  getProducts: async (): Promise<Product[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockProducts), 500));
  },
  getRewards: async (): Promise<Reward[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockRewards), 500));
  },
  getPurchases: async (): Promise<Purchase[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockPurchases), 500));
  }
};

export default api;
