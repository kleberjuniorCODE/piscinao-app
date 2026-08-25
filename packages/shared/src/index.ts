// ======================================
// Piscinão Araçatuba - Shared Types
// ======================================

// ---- Enums ----

export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

export enum TrailIconType {
  HOUSE = 'HOUSE',
  PALM = 'PALM',
  DIAMOND = 'DIAMOND',
  STAR = 'STAR',
  POOL = 'POOL',
  CHEST = 'CHEST',
  WATER = 'WATER',
  FLOAT = 'FLOAT',
}

export enum CouponRuleType {
  PRODUCT_BONUS = 'PRODUCT_BONUS',
  CATEGORY_BONUS = 'CATEGORY_BONUS',
  DOUBLE_COUPONS = 'DOUBLE_COUPONS',
  SPECIAL = 'SPECIAL',
}

export enum RewardStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
}

export enum ClientRewardStatus {
  AVAILABLE = 'AVAILABLE',
  CLAIMED = 'CLAIMED',
  EXPIRED = 'EXPIRED',
}

export enum RecommendationTrigger {
  DAYS_SINCE_PURCHASE = 'DAYS_SINCE_PURCHASE',
  PURCHASE_FREQUENCY = 'PURCHASE_FREQUENCY',
  DATE = 'DATE',
  CAMPAIGN = 'CAMPAIGN',
}

export enum NotificationType {
  COUPON = 'COUPON',
  REWARD = 'REWARD',
  PROMOTION = 'PROMOTION',
  RECOMMENDATION = 'RECOMMENDATION',
  SYSTEM = 'SYSTEM',
}

// ---- Interfaces ----

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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
  category?: Category;
  name: string;
  description: string;
  price: number;
  showPrice: boolean;
  imageUrl?: string;
  whatsappMessage?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface Purchase {
  id: string;
  clientId: string;
  client?: User;
  registeredById: string;
  registeredBy?: User;
  totalAmount: number;
  couponsEarned: number;
  notes?: string;
  purchaseDate: string;
  createdAt: string;
  items?: PurchaseItem[];
}

export interface PurchaseItem {
  id: string;
  purchaseId: string;
  productId: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface CouponsConfig {
  id: string;
  name: string;
  amountPerCoupon: number;
  isActive: boolean;
  validFrom?: string;
  validUntil?: string;
}

export interface CouponRule {
  id: string;
  configId: string;
  ruleType: CouponRuleType;
  targetProductId?: string;
  targetCategoryId?: string;
  bonusCoupons: number;
  bonusMultiplier: number;
  description: string;
  isActive: boolean;
  validFrom?: string;
  validUntil?: string;
}

export interface TrailConfig {
  id: string;
  name: string;
  totalSteps: number;
  couponsPerStep: number;
  isActive: boolean;
  steps?: TrailStep[];
  createdAt: string;
}

export interface TrailStep {
  id: string;
  trailId: string;
  stepNumber: number;
  name: string;
  iconType: TrailIconType;
  customIconUrl?: string;
  description?: string;
  milestoneRewardId?: string;
  milestoneReward?: Reward;
}

export interface ClientProgress {
  id: string;
  clientId: string;
  trailId: string;
  trail?: TrailConfig;
  totalCoupons: number;
  currentStep: number;
  couponsInCurrentStep: number;
  treasureUnlocked: boolean;
  treasureClaimedAt?: string;
  updatedAt: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  couponsRequired: number;
  isFinalReward: boolean;
  status: RewardStatus;
  validUntil?: string;
  createdAt: string;
}

export interface ClientReward {
  id: string;
  clientId: string;
  rewardId: string;
  reward?: Reward;
  status: ClientRewardStatus;
  unlockedAt: string;
  claimedAt?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  productId?: string;
  product?: Product;
  discountPercent: number;
  whatsappMessage?: string;
  isActive: boolean;
  validFrom: string;
  validUntil: string;
}

export interface RecommendationRule {
  id: string;
  triggerType: RecommendationTrigger;
  productId?: string;
  product?: Product;
  categoryId?: string;
  category?: Category;
  intervalDays: number;
  messageTitle: string;
  messageBody: string;
  recommendedProductId?: string;
  recommendedProduct?: Product;
  promotionId?: string;
  promotion?: Promotion;
  isActive: boolean;
}

export interface ClientRecommendation {
  id: string;
  clientId: string;
  ruleId: string;
  rule?: RecommendationRule;
  purchaseId?: string;
  title: string;
  body: string;
  isRead: boolean;
  isDismissed: boolean;
  triggeredAt: string;
  expiresAt?: string;
}

export interface Notification {
  id: string;
  clientId: string;
  title: string;
  body: string;
  type: NotificationType;
  data?: Record<string, unknown>;
  isRead: boolean;
  sentAt: string;
}

export interface AppSetting {
  id: string;
  key: string;
  value: unknown;
  description?: string;
  updatedAt: string;
}

// ---- API Response Types ----

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface DashboardStats {
  totalClients: number;
  totalCouponsIssued: number;
  purchasesThisMonth: number;
  revenueThisMonth: number;
  recentPurchases: Purchase[];
  purchasesByDay: { date: string; count: number; amount: number }[];
}

// ---- Constants ----

export const WHATSAPP_DEFAULT_NUMBER = '5518991024742';
export const DEFAULT_COUPONS_PER_AMOUNT = 100; // R$100 = 1 coupon
export const DEFAULT_TRAIL_STEPS = 10;
export const DEFAULT_COUPONS_PER_STEP = 5;
