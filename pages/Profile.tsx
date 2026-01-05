
import React, { useState } from 'react';
import { User, AppSettings, WithdrawalRequest } from '../types';

interface ProfileProps {
  user: User;
  settings: AppSettings;
  updateUser: (user: User) => void;
  onSubmitWithdrawal: (amount: number) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, settings, onSubmitWithdrawal }) => {
  const [amount, setAmount] = useState<string>('');

  const handleWithdraw = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val < settings.minWithdrawal || val > settings.maxWithdrawalPerMonth) {
      alert(`Min withdrawal is $${settings.minWithdrawal} and max $${settings.maxWithdrawalPerMonth} per month.`);
      return;
    }
    if (val > user.dollars) {
      alert("Insufficient balance.");
      return;
    }
    
    onSubmitWithdrawal(val);
    setAmount('');
    alert("Withdrawal request submitted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 text-center">
        <div className="w-20 h-20 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-900 text-3xl font-bold">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-xl font-bold">{user.username}</h2>
        <p className="text-gray-400 text-sm">Telegram ID: {user.id}</p>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-900 p-3 rounded-2xl border border-gray-700">
            <span className="text-xs text-gray-500 block">Total Referrals</span>
            <span className="font-bold text-yellow-500">{user.totalReferrals}</span>
          </div>
          <div className="bg-gray-900 p-3 rounded-2xl border border-gray-700">
            <span className="text-xs text-gray-500 block">Mining Speed</span>
            <span className="font-bold text-blue-400">{user.miningSpeed} C/h</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <i className="fa-solid fa-wallet text-green-500"></i> Withdraw Funds
        </h3>
        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1">Enter Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500"
          />
          <p className="text-[10px] text-gray-500 mt-1">Available balance: ${user.dollars.toFixed(2)}</p>
        </div>
        <button 
          onClick={handleWithdraw}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all"
        >
          WITHDRAW NOW
        </button>
        <p className="text-center text-[10px] text-gray-500 mt-3">
          Limits: ${settings.minWithdrawal} - ${settings.maxWithdrawalPerMonth} monthly
        </p>
      </div>

      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
        <h3 className="font-bold text-lg mb-4">Transaction History</h3>
        {user.withdrawalHistory.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-4">No transactions found.</p>
        ) : (
          <div className="space-y-3">
            {user.withdrawalHistory.map(w => (
              <div key={w.id} className="p-3 bg-gray-900 rounded-xl border border-gray-700 flex justify-between items-center">
                <div>
                  <span className="block font-bold">${w.amount.toFixed(2)}</span>
                  <span className="text-[10px] text-gray-500">{new Date(w.date).toLocaleDateString()}</span>
                  {w.remark && <p className="text-[10px] text-yellow-500/80 italic mt-1">"{w.remark}"</p>}
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  w.status === 'pending' ? 'bg-yellow-900 text-yellow-400' :
                  w.status === 'approved' ? 'bg-green-900 text-green-400' :
                  'bg-red-900 text-red-400'
                }`}>
                  {w.status}
                </div>
              </div>
            )).reverse()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
