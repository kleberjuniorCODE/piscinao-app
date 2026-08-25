export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'CLIENT' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  showPrice: boolean;
  imageUrl?: string;
  whatsappMessage?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface PurchaseItem {
  id: string;
  productId: string;
  productName?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Purchase {
  id: string;
  clientId: string;
  clientName?: string;
  totalAmount: number;
  couponsEarned: number;
  notes?: string;
  purchaseDate: string;
  items?: PurchaseItem[];
}

export interface ClientProgress {
  clientId: string;
  totalCoupons: number;
  currentStep: number;
  couponsInCurrentStep: number;
  treasureUnlocked: boolean;
}

export interface Reward {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  couponsRequired: number;
  isFinalReward: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
}

export interface Promotion {
  id: string;
  title: string;
  description?: string;
  productId?: string;
  discountPercent?: number;
  whatsappMessage?: string;
  isActive: boolean;
  validFrom?: string;
  validUntil?: string;
}

export interface RecommendationRule {
  id: string;
  triggerType: string;
  productId?: string;
  intervalDays?: number;
  messageTitle: string;
  messageBody: string;
  recommendedProductId?: string;
  promotionId?: string;
  isActive: boolean;
}

export interface AppSetting {
  id: string;
  key: string;
  value: string;
  description?: string;
}
