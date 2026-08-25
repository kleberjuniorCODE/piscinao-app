import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'c1',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(18) 99123-4567',
    role: 'CLIENT',
    isActive: true,
    createdAt: '2026-01-15'
  },
  isAuthenticated: true,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
