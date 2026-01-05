
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isAdmin: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, isAdmin }) => {
  const tabs = [
    { id: 'home', icon: 'fa-house', label: 'Home' },
    { id: 'tasks', icon: 'fa-list-check', label: 'Tasks' },
    { id: 'referrals', icon: 'fa-users', label: 'Refer' },
    { id: 'profile', icon: 'fa-user', label: 'Profile' },
  ];

  if (isAdmin) {
    tabs.push({ id: 'admin', icon: 'fa-user-shield', label: 'Admin' });
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <main className="flex-1 p-4 max-w-lg mx-auto w-full">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 flex justify-around items-center h-16 z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center w-full transition-colors ${
              activeTab === tab.id ? 'text-yellow-400' : 'text-gray-400'
            }`}
          >
            <i className={`fa-solid ${tab.icon} text-xl`}></i>
            <span className="text-[10px] mt-1">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
