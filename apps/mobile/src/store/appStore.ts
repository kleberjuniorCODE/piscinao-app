import { create } from 'zustand';
import { Product, Reward, Purchase } from '../types';
import { ApiService } from '../services/api';

interface AppState {
  products: Product[];
  rewards: Reward[];
  purchases: Purchase[];
  isLoading: boolean;
  fetchData: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  products: [],
  rewards: [],
  purchases: [],
  isLoading: false,
  fetchData: async () => {
    set({ isLoading: true });
    try {
      const [products, rewards, purchases] = await Promise.all([
        ApiService.getProducts(),
        ApiService.getRewards(),
        ApiService.getPurchases()
      ]);
      set({ products, rewards, purchases, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Error fetching data', error);
    }
  },
}));
