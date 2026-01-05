
import React, { useState, useEffect } from 'react';

interface AdOverlayProps {
  adLink: string;
  onComplete: () => void;
}

const AdOverlay: React.FC<AdOverlayProps> = ({ adLink, onComplete }) => {
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Small delay after countdown for better UX
      setTimeout(onComplete, 500);
    }
  }, [secondsLeft, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black bg-opacity-95 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-yellow-500">Watching Ad...</h2>
        <p className="text-gray-400 mb-6">Mining will start shortly. Please wait.</p>
        
        <div className="relative w-24 h-24 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-gray-700"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 * (secondsLeft / 5)}
              className="text-yellow-500 transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl">
            {secondsLeft}
          </div>
        </div>

        <a 
          href={adLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full bg-blue-600 py-3 rounded-xl font-semibold mb-2"
        >
          Visit Sponsor
        </a>
        <p className="text-xs text-gray-500 italic">This helps keep the service free!</p>
      </div>
    </div>
  );
};

export default AdOverlay;
