
import React, { useState, useEffect, useCallback } from 'react';
import { User, AppSettings, Task, WithdrawalRequest } from './types.ts';
import { initializeApp, setStoredData, getStoredData } from './store/mockStore.ts';
import { STORAGE_KEYS } from './constants.ts';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import Tasks from './pages/Tasks.tsx';
import Referrals from './pages/Referrals.tsx';
import Profile from './pages/Profile.tsx';
import Admin from './pages/Admin.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);

  const isAdmin = user?.id === '123456789' || user?.username === 'Admin';

  useEffect(() => {
    const data = initializeApp();
    setUser(data.user);
    setSettings(data.settings);
    setTasks(data.tasks);
    setWithdrawals(data.withdrawals);
  }, []);

  const handleUpdateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    const allUsers = getStoredData<User[]>(STORAGE_KEYS.ALL_USERS, []);
    const index = allUsers.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      allUsers[index] = updatedUser;
      setStoredData(STORAGE_KEYS.ALL_USERS, allUsers);
    }
  }, []);

  const handleUpdateSettings = useCallback((newSettings: AppSettings) => {
    setSettings(newSettings);
    setStoredData(STORAGE_KEYS.SETTINGS, newSettings);
  }, []);

  const handleUpdateTasks = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
    setStoredData(STORAGE_KEYS.TASKS, newTasks);
  }, []);

  const handleSubmitWithdrawal = useCallback((amount: number) => {
    if (!user) return;
    
    const newRequest: WithdrawalRequest = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      amount: amount,
      status: 'pending',
      date: Date.now()
    };

    const updatedWithdrawals = [...withdrawals, newRequest];
    setWithdrawals(updatedWithdrawals);
    setStoredData(STORAGE_KEYS.WITHDRAWALS, updatedWithdrawals);

    const updatedUser = { 
      ...user, 
      dollars: user.dollars - amount,
      withdrawalHistory: [...user.withdrawalHistory, newRequest]
    };
    handleUpdateUser(updatedUser);
  }, [user, withdrawals, handleUpdateUser]);

  const handleUpdateWithdrawalStatus = useCallback((id: string, status: 'approved' | 'rejected', remark: string) => {
    const updatedWithdrawals = withdrawals.map(w => {
      if (w.id === id) return { ...w, status, remark };
      return w;
    });
    setWithdrawals(updatedWithdrawals);
    setStoredData(STORAGE_KEYS.WITHDRAWALS, updatedWithdrawals);

    const allUsers = getStoredData<User[]>(STORAGE_KEYS.ALL_USERS, []);
    const request = withdrawals.find(w => w.id === id);
    
    if (request) {
      const userIndex = allUsers.findIndex(u => u.id === request.userId);
      if (userIndex !== -1) {
        const u = allUsers[userIndex];
        u.withdrawalHistory = u.withdrawalHistory.map(w => w.id === id ? { ...w, status, remark } : w);
        
        if (status === 'rejected') {
          u.dollars += request.amount;
        }
        
        allUsers[userIndex] = u;
        setStoredData(STORAGE_KEYS.ALL_USERS, allUsers);
        
        if (user && user.id === u.id) {
          setUser({ ...u });
        }
      }
    }
  }, [user, withdrawals]);

  if (!user || !settings) return <div className="p-8 text-center bg-gray-900 min-h-screen text-white">Loading Mining Empire...</div>;

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab} isAdmin={isAdmin}>
      {activeTab === 'home' && <Home user={user} settings={settings} updateUser={handleUpdateUser} />}
      {activeTab === 'tasks' && <Tasks user={user} tasks={tasks} updateUser={handleUpdateUser} />}
      {activeTab === 'referrals' && <Referrals user={user} settings={settings} />}
      {activeTab === 'profile' && (
        <Profile 
          user={user} 
          settings={settings} 
          updateUser={handleUpdateUser} 
          onSubmitWithdrawal={handleSubmitWithdrawal} 
        />
      )}
      {activeTab === 'admin' && isAdmin && (
        <Admin 
          settings={settings} 
          tasks={tasks} 
          withdrawals={withdrawals}
          updateSettings={handleUpdateSettings}
          updateTasks={handleUpdateTasks}
          updateWithdrawalStatus={handleUpdateWithdrawalStatus}
        />
      )}
    </Layout>
  );
};

export default App;
