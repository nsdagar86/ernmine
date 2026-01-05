
import React, { useState } from 'react';
import { AppSettings, Task, WithdrawalRequest, User } from '../types';

interface AdminProps {
  settings: AppSettings;
  tasks: Task[];
  withdrawals: WithdrawalRequest[];
  updateSettings: (s: AppSettings) => void;
  updateTasks: (t: Task[]) => void;
  updateWithdrawalStatus: (id: string, status: 'approved' | 'rejected', remark: string) => void;
}

const Admin: React.FC<AdminProps> = ({ 
  settings, 
  tasks, 
  withdrawals, 
  updateSettings, 
  updateTasks, 
  updateWithdrawalStatus 
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'tasks' | 'withdrawals'>('settings');
  const [tempSettings, setTempSettings] = useState(settings);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '', description: '', rewardCoins: 0, rewardDollars: 0, rewardSpeed: 0, link: ''
  });
  const [remarks, setRemarks] = useState<{[key: string]: string}>({});

  const handleSaveSettings = () => {
    updateSettings(tempSettings);
    alert("Settings saved!");
  };

  const handleAddTask = () => {
    if (!newTask.title) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title || '',
      description: newTask.description || '',
      rewardCoins: Number(newTask.rewardCoins) || 0,
      rewardDollars: Number(newTask.rewardDollars) || 0,
      rewardSpeed: Number(newTask.rewardSpeed) || 0,
      link: newTask.link
    };
    updateTasks([...tasks, task]);
    setNewTask({ title: '', description: '', rewardCoins: 0, rewardDollars: 0, rewardSpeed: 0, link: '' });
  };

  const handleDeleteTask = (id: string) => {
    updateTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 p-1 bg-gray-800 rounded-xl border border-gray-700">
        {['settings', 'tasks', 'withdrawals'].map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t as any)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg uppercase transition-all ${
              activeTab === t ? 'bg-yellow-500 text-gray-900' : 'text-gray-400'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'settings' && (
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <h3 className="font-bold mb-4 border-b border-gray-700 pb-2 text-yellow-500">Global Rewards</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 block">Ad Link URL</label>
                <input 
                  type="text" 
                  value={tempSettings.adLink}
                  onChange={e => setTempSettings({...tempSettings, adLink: e.target.value})}
                  className="w-full bg-gray-900 p-2 rounded border border-gray-700 mt-1" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 block">Welcome Coins</label>
                  <input 
                    type="number" 
                    value={tempSettings.newMemberRewardCoins}
                    onChange={e => setTempSettings({...tempSettings, newMemberRewardCoins: Number(e.target.value)})}
                    className="w-full bg-gray-900 p-2 rounded border border-gray-700 mt-1" 
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block">Welcome Speed</label>
                  <input 
                    type="number" 
                    value={tempSettings.newMemberRewardSpeed}
                    onChange={e => setTempSettings({...tempSettings, newMemberRewardSpeed: Number(e.target.value)})}
                    className="w-full bg-gray-900 p-2 rounded border border-gray-700 mt-1" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <h3 className="font-bold mb-4 border-b border-gray-700 pb-2 text-blue-500">MLM Multiplier (Upline Rewards)</h3>
            {[1, 2, 3, 4, 5].map(lvl => (
              <div key={lvl} className="grid grid-cols-3 gap-2 mb-3 items-end">
                <span className="text-xs font-bold">Lvl {lvl}:</span>
                <div>
                  <label className="text-[10px] text-gray-500">Dollars</label>
                  <input 
                    type="number" 
                    value={tempSettings.mlmRewards[lvl].dollars}
                    onChange={e => {
                      const newMlm = {...tempSettings.mlmRewards};
                      newMlm[lvl].dollars = Number(e.target.value);
                      setTempSettings({...tempSettings, mlmRewards: newMlm});
                    }}
                    className="w-full bg-gray-900 p-1 rounded border border-gray-700 text-xs" 
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500">Speed</label>
                  <input 
                    type="number" 
                    value={tempSettings.mlmRewards[lvl].speed}
                    onChange={e => {
                      const newMlm = {...tempSettings.mlmRewards};
                      newMlm[lvl].speed = Number(e.target.value);
                      setTempSettings({...tempSettings, mlmRewards: newMlm});
                    }}
                    className="w-full bg-gray-900 p-1 rounded border border-gray-700 text-xs" 
                  />
                </div>
              </div>
            ))}
          </div>

          <button onClick={handleSaveSettings} className="w-full bg-yellow-500 text-gray-900 py-3 rounded-xl font-bold">
            SAVE CONFIGURATION
          </button>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <h3 className="font-bold mb-4 text-yellow-500">Create New Task</h3>
            <div className="space-y-3">
              <input 
                placeholder="Title"
                value={newTask.title}
                onChange={e => setNewTask({...newTask, title: e.target.value})}
                className="w-full bg-gray-900 p-2 rounded border border-gray-700" 
              />
              <textarea 
                placeholder="Description"
                value={newTask.description}
                onChange={e => setNewTask({...newTask, description: e.target.value})}
                className="w-full bg-gray-900 p-2 rounded border border-gray-700 h-20" 
              />
              <div className="grid grid-cols-3 gap-2">
                <input type="number" placeholder="Coins" value={newTask.rewardCoins || ''} onChange={e => setNewTask({...newTask, rewardCoins: Number(e.target.value)})} className="bg-gray-900 p-2 rounded border border-gray-700 text-xs" />
                <input type="number" placeholder="Dollars" value={newTask.rewardDollars || ''} onChange={e => setNewTask({...newTask, rewardDollars: Number(e.target.value)})} className="bg-gray-900 p-2 rounded border border-gray-700 text-xs" />
                <input type="number" placeholder="Speed" value={newTask.rewardSpeed || ''} onChange={e => setNewTask({...newTask, rewardSpeed: Number(e.target.value)})} className="bg-gray-900 p-2 rounded border border-gray-700 text-xs" />
              </div>
              <input placeholder="Task Link (optional)" value={newTask.link} onChange={e => setNewTask({...newTask, link: e.target.value})} className="w-full bg-gray-900 p-2 rounded border border-gray-700" />
              <button onClick={handleAddTask} className="w-full bg-blue-600 py-2 rounded-xl font-bold">ADD TASK</button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-gray-400 px-2">Manage Tasks</h3>
            {tasks.map(t => (
              <div key={t.id} className="bg-gray-800 p-3 rounded-xl border border-gray-700 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">{t.title}</h4>
                  <p className="text-[10px] text-gray-500">D:${t.rewardDollars} | C:{t.rewardCoins} | S:+{t.rewardSpeed}</p>
                </div>
                <button onClick={() => handleDeleteTask(t.id)} className="text-red-500 hover:text-red-400">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'withdrawals' && (
        <div className="space-y-4">
          <h3 className="font-bold text-yellow-500 px-2">Pending Requests</h3>
          {withdrawals.filter(w => w.status === 'pending').length === 0 ? (
            <p className="text-center text-gray-500 text-sm py-10">All clear!</p>
          ) : (
            withdrawals.filter(w => w.status === 'pending').map(w => (
              <div key={w.id} className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="font-bold text-lg text-green-400">${w.amount}</span>
                    <p className="text-xs text-gray-400">By: {w.username} ({w.userId})</p>
                  </div>
                  <span className="text-[10px] text-gray-500">{new Date(w.date).toLocaleString()}</span>
                </div>
                
                <input 
                  placeholder="Admin Remarks (optional)" 
                  value={remarks[w.id] || ''}
                  onChange={e => setRemarks({...remarks, [w.id]: e.target.value})}
                  className="w-full bg-gray-900 p-2 rounded border border-gray-700 text-sm mb-3"
                />

                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => updateWithdrawalStatus(w.id, 'approved', remarks[w.id] || 'Success')}
                    className="bg-green-600 text-white py-2 rounded-lg font-bold text-sm"
                  >
                    APPROVE
                  </button>
                  <button 
                    onClick={() => updateWithdrawalStatus(w.id, 'rejected', remarks[w.id] || 'Invalid request')}
                    className="bg-red-600 text-white py-2 rounded-lg font-bold text-sm"
                  >
                    REJECT
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
