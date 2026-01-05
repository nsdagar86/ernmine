
import { AppSettings } from './types';

export const INITIAL_SETTINGS: AppSettings = {
  adLink: 'https://www.google.com',
  minWithdrawal: 5,
  maxWithdrawalPerMonth: 100,
  miningDurationHours: 6,
  newMemberRewardCoins: 100,
  newMemberRewardSpeed: 10,
  mlmRewards: {
    1: { dollars: 0.5, speed: 2 },
    2: { dollars: 0.3, speed: 1.5 },
    3: { dollars: 0.2, speed: 1 },
    4: { dollars: 0.1, speed: 0.5 },
    5: { dollars: 0.05, speed: 0.2 },
  }
};

export const STORAGE_KEYS = {
  USER: 'mining_app_user',
  ALL_USERS: 'mining_app_all_users',
  SETTINGS: 'mining_app_settings',
  TASKS: 'mining_app_tasks',
  WITHDRAWALS: 'mining_app_withdrawals'
};
