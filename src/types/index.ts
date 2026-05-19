export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

export interface UserProfile {
  telegramId: string;
  username: string;
  firstName: string;
  lastName?: string;
  referralCode: string;
  referredBy?: string;
  createdAt: string;
  isPremiumUser: boolean;
  role: 'user' | 'admin';
}

export interface WalletState {
  id: string;
  userId: string;
  balanceNgn: number;
  balancePoints: number;
  totalWithdrawn: number;
  updatedAt: string;
}

export type TaskCategory = 'social' | 'daily' | 'partner' | 'premium';
export type TaskStatus = 'available' | 'verifying' | 'completed' | 'failed';

export interface Task {
  id: string;
  title: string;
  description: string;
  rewardPoints: number;
  rewardNgn: number;
  category: TaskCategory;
  url?: string;
  verificationMethod: 'instant' | 'manual' | 'api';
  coolDownHours?: number;
}

export interface UserTaskProgress {
  taskId: string;
  status: TaskStatus;
  lastCompletedAt?: string;
  verificationSubmittedAt?: string;
}

export interface ReferralNode {
  telegramId: string;
  username: string;
  joinedAt: string;
  rewardEarnedPoints: number;
  rewardEarnedNgn: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'payout';
  isRead: boolean;
  createdAt: string;
}

export interface PayoutRequest {
  id: string;
  userId: string;
  username: string;
  amountNgn: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  processedAt?: string;
}
