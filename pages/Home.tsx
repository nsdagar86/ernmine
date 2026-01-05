
import React, { useState, useEffect } from 'react';
import { User, AppSettings, MiningSession } from '../types';
import AdOverlay from '../components/AdOverlay';

interface HomeProps {
  user: User;
  settings: AppSettings;
  updateUser: (user: User) => void;
}

const Home: React.FC<HomeProps> = ({ user, settings, updateUser }) => {
  const [isMining, setIsMining] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('00:00:00');
  const [showAd, setShowAd] = useState(false);
  const [currentMined, setCurrentMined] = useState(0);

  useEffect(() => {
    const calculateMining = () => {
      if (!user.miningStartTime) {
        setIsMining(false);
        setCurrentMined(0);
        return;
      }

      const now = Date.now();
      const diffMs = now - user.miningStartTime;
      const diffHrs = diffMs / (1000 * 60 * 60);

      if (diffHrs >= settings.miningDurationHours) {
        const sessionCoins = settings.miningDurationHours * user.miningSpeed;
        const newSession: MiningSession = {
          id: Date.now().toString(),
          startTime: user.miningStartTime,
          endTime: user.miningStartTime + (settings.miningDurationHours * 3600000),
          coinsEarned: sessionCoins,
          status: 'completed'
        };
        const updatedUser = { 
          ...user, 
          coins: user.coins + sessionCoins, 
          miningStartTime: null,
          sessionHistory: [newSession, ...user.sessionHistory].slice(0, 5)
        };
        updateUser(updatedUser);
        setIsMining(false);
        setCurrentMined(0);
      } else {
        setIsMining(true);
        setCurrentMined(diffHrs * user.miningSpeed);
        const remainingMs = (settings.miningDurationHours * 3600000) - diffMs;
        const h = Math.floor(remainingMs / 3600000);
        const m = Math.floor((remainingMs % 3600000) / 60000);
        const s = Math.floor((remainingMs % 60000) / 1000);
        setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      }
    };

    calculateMining();
    const interval = setInterval(calculateMining, 1000);
    return () => clearInterval(interval);
  }, [user, settings, updateUser]);

  const handleStartMining = () => {
    setShowAd(true);
  };

  const onAdComplete = () => {
    setShowAd(false);
    const updatedUser = { ...user, miningStartTime: Date.now() };
    updateUser(updatedUser);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Welcome, {user.username}!</h1>
          <p className="text-gray-400 text-sm">ID: {user.id}</p>
        </div>
        <div className="bg-gray-800/80 px-4 py-2 rounded-full border border-gray-700 backdrop-blur-sm shadow-xl">
          <span className="text-yellow-400 font-bold flex items-center gap-2">
            <i className="fa-solid fa-gem"></i> {user.coins.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700 flex flex-col items-center backdrop-blur-sm">
          <span className="text-gray-400 text-xs mb-1 uppercase tracking-wider font-semibold">USD Balance</span>
          <span className="text-green-400 text-2xl font-black">${user.dollars.toFixed(2)}</span>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700 flex flex-col items-center backdrop-blur-sm">
          <span className="text-gray-400 text-xs mb-1 uppercase tracking-wider font-semibold">Hash Rate</span>
          <span className="text-blue-400 text-2xl font-black">{user.miningSpeed} C/h</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl border border-gray-700 flex flex-col items-center relative overflow-hidden shadow-2xl">
        {isMining && (
          <div className="absolute top-4 right-4">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
          </div>
        )}
        
        <div className={`w-36 h-36 rounded-full border-4 ${isMining ? 'border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.3)] animate-pulse' : 'border-gray-700'} flex items-center justify-center mb-6 bg-gray-900/50 transition-all duration-500`}>
           <i className={`fa-solid fa-pickaxe text-6xl ${isMining ? 'text-yellow-500' : 'text-gray-700'} transition-colors duration-500`}></i>
        </div>

        <h2 className="text-2xl font-black mb-1 uppercase tracking-tighter">
          {isMining ? 'Mining Engine Active' : 'System Idle'}
        </h2>
        
        {isMining ? (
          <div className="text-center">
            <p className="text-yellow-500 text-5xl font-mono font-bold mb-2 tabular-nums">{timeLeft}</p>
            <p className="text-gray-400 text-sm font-medium">Session Progress: +{currentMined.toFixed(4)}💎</p>
          </div>
        ) : (
          <button
            onClick={handleStartMining}
            className="w-full mt-4 bg-yellow-500 hover:bg-yellow-400 active:scale-95 text-gray-900 font-black py-5 rounded-2xl transition-all shadow-lg shadow-yellow-500/20 uppercase tracking-widest text-lg"
          >
            START SESSION
          </button>
        )}
      </div>

      <div className="bg-gray-800/40 border border-gray-700 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="p-4 border-b border-gray-700 bg-gray-800/60 flex justify-between items-center">
          <h3 className="font-bold uppercase text-xs tracking-widest text-gray-400">Mining History</h3>
          <i className="fa-solid fa-clock-rotate-left text-gray-500"></i>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-900/50 text-gray-500">
              <tr>
                <th className="px-4 py-2 font-semibold">Time</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 font-semibold text-right">Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {isMining && (
                <tr className="bg-yellow-500/5">
                  <td className="px-4 py-3">Now</td>
                  <td className="px-4 py-3"><span className="text-yellow-500 font-bold">ACTIVE</span></td>
                  <td className="px-4 py-3 text-right font-mono">+{currentMined.toFixed(2)}</td>
                </tr>
              )}
              {user.sessionHistory.length === 0 && !isMining && (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-gray-500">No sessions recorded yet.</td>
                </tr>
              )}
              {user.sessionHistory.map(session => (
                <tr key={session.id}>
                  <td className="px-4 py-3 text-gray-400">{new Date(session.startTime).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-green-500 font-semibold uppercase">Done</td>
                  <td className="px-4 py-3 text-right font-mono text-yellow-500/80">+{session.coinsEarned.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-800/40 border border-gray-700 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="p-4 border-b border-gray-700 bg-gray-800/60 flex justify-between items-center">
          <h3 className="font-bold uppercase text-xs tracking-widest text-gray-400">Network Statistics</h3>
          <i className="fa-solid fa-diagram-project text-gray-500"></i>
        </div>
        <div className="p-4 grid grid-cols-5 gap-2 text-center">
          {[1, 2, 3, 4, 5].map(lvl => (
            <div key={lvl} className="flex flex-col">
              <span className="text-[10px] text-gray-500 font-bold">LVL {lvl}</span>
              <span className="text-lg font-black text-yellow-500">{user.levelStats[lvl] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      {showAd && <AdOverlay adLink={settings.adLink} onComplete={onAdComplete} />}
    </div>
  );
};

export default Home;
