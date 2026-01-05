
import { User, AppSettings, Task, WithdrawalRequest, ReferralDetail } from '../types';
import { STORAGE_KEYS, INITIAL_SETTINGS } from '../constants';

export const getStoredData = <T,>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

export const setStoredData = <T,>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Initial state logic
export const initializeApp = (): { user: User; settings: AppSettings; tasks: Task[]; withdrawals: WithdrawalRequest[] } => {
  // Get URL referral code if exists
  const urlParams = new URLSearchParams(window.location.search);
  const refBy = urlParams.get('ref') || undefined;

  // Mock current user (In reality, use Telegram.WebApp.initData)
  const tgUser = (window as any).Telegram?.WebApp?.initDataUnsafe?.user;
  const currentUserId = tgUser?.id?.toString() || '123456789';
  const currentUsername = tgUser?.username || 'GuestUser';

  let allUsers = getStoredData<User[]>(STORAGE_KEYS.ALL_USERS, []);
  let user = allUsers.find(u => u.id === currentUserId);
  const settings = getStoredData<AppSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  const tasks = getStoredData<Task[]>(STORAGE_KEYS.TASKS, []);
  const withdrawals = getStoredData<WithdrawalRequest[]>(STORAGE_KEYS.WITHDRAWALS, []);

  if (!user) {
    // New User Registration
    const newUser: User = {
      id: currentUserId,
      username: currentUsername,
      referralCode: `REF_${currentUserId}`,
      referredBy: refBy,
      coins: settings.newMemberRewardCoins,
      dollars: 0,
      miningSpeed: settings.newMemberRewardSpeed,
      totalReferrals: 0,
      miningStartTime: null,
      withdrawalHistory: [],
      completedTasks: [],
      levelStats: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
    
    user = newUser;
    allUsers.push(newUser);

    // Process MLM if referred
    if (refBy) {
      processMLM(refBy, allUsers, settings);
    }
    
    setStoredData(STORAGE_KEYS.ALL_USERS, allUsers);
  }

  return { user, settings, tasks, withdrawals };
};

const processMLM = (refCode: string, allUsers: User[], settings: AppSettings) => {
  let currentReferrer = allUsers.find(u => u.referralCode === refCode);
  let level = 1;

  while (currentReferrer && level <= 5) {
    const reward = settings.mlmRewards[level];
    currentReferrer.dollars += reward.dollars;
    currentReferrer.miningSpeed += reward.speed;
    currentReferrer.totalReferrals += 1;
    currentReferrer.levelStats[level] = (currentReferrer.levelStats[level] || 0) + 1;

    // Next Level: find who referred the current referrer
    if (currentReferrer.referredBy) {
      currentReferrer = allUsers.find(u => u.referralCode === currentReferrer?.referredBy);
      level++;
    } else {
      break;
    }
  }
};
