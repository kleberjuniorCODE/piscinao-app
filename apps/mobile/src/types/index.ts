export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  coupons: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  imageUrl?: string;
  isClaimed?: boolean;
}

export interface Purchase {
  id: string;
  date: string;
  amount: number;
  couponsEarned: number;
  items: string[];
}
