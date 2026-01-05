
export interface User {
  id: string; // Telegram ID
  username: string;
  referralCode: string;
  referredBy?: string;
  coins: number;
  dollars: number;
  miningSpeed: number; // coins per hour
  totalReferrals: number;
  miningStartTime: number | null; // Timestamp
  withdrawalHistory: WithdrawalRequest[];
  completedTasks: string[]; // Task IDs
  levelStats: {
    [level: number]: number; // level: count
  };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  rewardCoins: number;
  rewardDollars: number;
  rewardSpeed: number;
  link?: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  username: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  date: number;
  remark?: string;
}

export interface AppSettings {
  adLink: string;
  minWithdrawal: number;
  maxWithdrawalPerMonth: number;
  miningDurationHours: number;
  newMemberRewardCoins: number;
  newMemberRewardSpeed: number;
  // MLM Rewards per level
  mlmRewards: {
    [level: number]: {
      dollars: number;
      speed: number;
    }
  };
}

export interface ReferralDetail {
  username: string;
  level: number;
  date: number;
}
