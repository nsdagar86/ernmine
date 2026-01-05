
export interface MiningSession {
  id: string;
  startTime: number;
  endTime: number;
  coinsEarned: number;
  status: 'completed' | 'active';
}

export interface User {
  id: string;
  username: string;
  referralCode: string;
  referredBy?: string;
  coins: number;
  dollars: number;
  miningSpeed: number;
  totalReferrals: number;
  miningStartTime: number | null;
  withdrawalHistory: WithdrawalRequest[];
  completedTasks: string[];
  sessionHistory: MiningSession[];
  levelStats: {
    [level: number]: number;
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
  mlmRewards: {
    [level: number]: {
      dollars: number;
      speed: number;
    }
  };
}
