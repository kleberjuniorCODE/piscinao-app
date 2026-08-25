import { User } from '../types';

export const authStore = {
  getUser: (): User | null => {
    const user = localStorage.getItem('auth_user');
    return user ? JSON.parse(user) : null;
  },
  login: () => {
    const mockUser: User = { id: 'admin1', name: 'Admin', email: 'admin@piscinao.com.br', role: 'ADMIN', isActive: true, createdAt: '2026-01-01' };
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
  },
  logout: () => {
    localStorage.removeItem('auth_user');
  },
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_user');
  }
};
