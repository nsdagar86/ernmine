
import React, { useState, useEffect } from 'react';
import { User, AppSettings } from '../types';
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
        // Mining finished
        const sessionCoins = settings.miningDurationHours * user.miningSpeed;
        const updatedUser = { 
          ...user, 
          coins: user.coins + sessionCoins, 
          miningStartTime: null 
        };
        updateUser(updatedUser);
        setIsMining(false);
        setCurrentMined(0);
      } else {
        setIsMining(true);
        setCurrentMined(diffHrs * user.miningSpeed);
        
        // Countdown
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Welcome, {user.username}!</h1>
          <p className="text-gray-400 text-sm">ID: {user.id}</p>
        </div>
        <div className="bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
          <span className="text-yellow-400 font-bold">💎 {user.coins.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700 flex flex-col items-center">
          <span className="text-gray-400 text-xs mb-1">Dollar Balance</span>
          <span className="text-green-400 text-xl font-bold">${user.dollars.toFixed(2)}</span>
        </div>
        <div className="bg-gray-800 p-4 rounded-2xl border border-gray-700 flex flex-col items-center">
          <span className="text-gray-400 text-xs mb-1">Mining Speed</span>
          <span className="text-blue-400 text-xl font-bold">{user.miningSpeed} C/hr</span>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700 flex flex-col items-center relative overflow-hidden">
        {isMining && (
          <div className="absolute top-0 right-0 m-4">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
          </div>
        )}
        
        <div className={`w-32 h-32 rounded-full border-4 ${isMining ? 'border-yellow-500 animate-pulse' : 'border-gray-600'} flex items-center justify-center mb-6`}>
           <i className={`fa-solid fa-pickaxe text-5xl ${isMining ? 'text-yellow-500' : 'text-gray-600'}`}></i>
        </div>

        <h2 className="text-2xl font-bold mb-1">
          {isMining ? 'Mining Active' : 'Mining Idle'}
        </h2>
        
        {isMining ? (
          <div className="text-center">
            <p className="text-yellow-500 text-4xl font-mono mb-2">{timeLeft}</p>
            <p className="text-gray-400 text-sm">Earning: +{currentMined.toFixed(4)} Coins</p>
          </div>
        ) : (
          <button
            onClick={handleStartMining}
            className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 rounded-2xl transition-all shadow-lg shadow-yellow-500/20"
          >
            START MINING
          </button>
        )}
      </div>

      <div className="bg-blue-900/20 border border-blue-800/50 p-4 rounded-xl">
        <h3 className="text-blue-400 font-semibold mb-2"><i className="fa-solid fa-circle-info mr-2"></i>Session Info</h3>
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-gray-800/50">
              <td className="py-2 text-gray-400">Duration</td>
              <td className="py-2 text-right">{settings.miningDurationHours} Hours</td>
            </tr>
            <tr className="border-b border-gray-800/50">
              <td className="py-2 text-gray-400">Est. Reward</td>
              <td className="py-2 text-right">{(settings.miningDurationHours * user.miningSpeed).toFixed(2)} Coins</td>
            </tr>
            <tr>
              <td className="py-2 text-gray-400">Speed Boost</td>
              <td className="py-2 text-right">Active</td>
            </tr>
          </tbody>
        </table>
      </div>

      {showAd && <AdOverlay adLink={settings.adLink} onComplete={onAdComplete} />}
    </div>
  );
};

export default Home;
