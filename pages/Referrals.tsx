
import React from 'react';
import { User, AppSettings } from '../types';

interface ReferralsProps {
  user: User;
  settings: AppSettings;
}

const Referrals: React.FC<ReferralsProps> = ({ user, settings }) => {
  const referralLink = `${window.location.origin}${window.location.pathname}?ref=${user.referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Referral Program</h1>
        <p className="text-gray-400">Earn up to 5 levels deep in our network.</p>
      </div>

      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 text-center">
        <p className="text-sm text-gray-400 mb-4 text-left font-semibold">Your Referral Link</p>
        <div className="flex bg-black/30 p-3 rounded-xl border border-gray-700 mb-4 items-center gap-2 overflow-hidden">
          <span className="text-xs text-gray-400 truncate flex-1 text-left">{referralLink}</span>
          <button onClick={handleCopyLink} className="text-yellow-500 hover:text-yellow-400 p-1">
            <i className="fa-solid fa-copy"></i>
          </button>
        </div>
        <button 
          onClick={handleCopyLink}
          className="w-full bg-yellow-500 text-gray-900 py-3 rounded-xl font-bold shadow-lg shadow-yellow-500/20"
        >
          SHARE LINK
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {[1, 2, 3, 4, 5].map(lvl => (
          <div key={lvl} className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center font-bold text-lg">
                L{lvl}
              </div>
              <div>
                <h4 className="font-bold">Level {lvl}</h4>
                <p className="text-[10px] text-gray-400">
                  Reward: <span className="text-green-400">${settings.mlmRewards[lvl].dollars}</span> & 
                  <span className="text-blue-400"> +{settings.mlmRewards[lvl].speed} C/h</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-yellow-500">{user.levelStats[lvl] || 0}</span>
              <p className="text-[10px] text-gray-400 uppercase">Referrals</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 overflow-hidden">
        <h3 className="font-bold mb-4">Referral Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-700 text-left">
                <th className="pb-2 font-normal">Level</th>
                <th className="pb-2 font-normal">Count</th>
                <th className="pb-2 font-normal text-right">Income ($)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {[1, 2, 3, 4, 5].map(lvl => (
                <tr key={lvl}>
                  <td className="py-3">Level {lvl}</td>
                  <td className="py-3 font-bold">{user.levelStats[lvl] || 0}</td>
                  <td className="py-3 text-right text-green-400">${((user.levelStats[lvl] || 0) * settings.mlmRewards[lvl].dollars).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-700/20">
                <td className="py-3 pl-2">Total</td>
                <td className="py-3">{user.totalReferrals}</td>
                <td className="py-3 pr-2 text-right text-green-400">
                  ${[1, 2, 3, 4, 5].reduce((acc, lvl) => acc + ((user.levelStats[lvl] || 0) * settings.mlmRewards[lvl].dollars), 0).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
