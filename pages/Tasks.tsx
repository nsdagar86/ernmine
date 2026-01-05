
import React from 'react';
import { User, Task } from '../types';

interface TasksProps {
  user: User;
  tasks: Task[];
  updateUser: (user: User) => void;
}

const Tasks: React.FC<TasksProps> = ({ user, tasks, updateUser }) => {
  
  const handleDoTask = (task: Task) => {
    if (user.completedTasks.includes(task.id)) return;

    if (task.link) {
      window.open(task.link, '_blank');
    }

    // Simulate task verification delay
    setTimeout(() => {
      const updatedUser = {
        ...user,
        coins: user.coins + task.rewardCoins,
        dollars: user.dollars + task.rewardDollars,
        miningSpeed: user.miningSpeed + task.rewardSpeed,
        completedTasks: [...user.completedTasks, task.id]
      };
      updateUser(updatedUser);
      alert(`Success! You earned 💎${task.rewardCoins} and $${task.rewardDollars}`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Earn Rewards</h1>
        <p className="text-gray-400">Complete simple tasks to boost your earnings.</p>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <i className="fa-solid fa-hourglass-start text-4xl mb-4"></i>
            <p>No tasks available right now.</p>
          </div>
        ) : (
          tasks.map(task => {
            const isCompleted = user.completedTasks.includes(task.id);
            return (
              <div 
                key={task.id} 
                className={`p-4 rounded-2xl border ${isCompleted ? 'bg-gray-800/50 border-gray-700/50 grayscale' : 'bg-gray-800 border-gray-700'} flex items-center justify-between gap-4`}
              >
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{task.title}</h3>
                  <p className="text-sm text-gray-400">{task.description}</p>
                  <div className="flex gap-2 mt-2">
                    {task.rewardCoins > 0 && <span className="text-[10px] bg-yellow-900/50 text-yellow-400 px-2 py-0.5 rounded border border-yellow-700/30">💎 {task.rewardCoins}</span>}
                    {task.rewardDollars > 0 && <span className="text-[10px] bg-green-900/50 text-green-400 px-2 py-0.5 rounded border border-green-700/30">${task.rewardDollars}</span>}
                    {task.rewardSpeed > 0 && <span className="text-[10px] bg-blue-900/50 text-blue-400 px-2 py-0.5 rounded border border-blue-700/30">+{task.rewardSpeed} C/h</span>}
                  </div>
                </div>
                <button
                  disabled={isCompleted}
                  onClick={() => handleDoTask(task)}
                  className={`px-4 py-2 rounded-xl font-bold text-sm ${
                    isCompleted 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                      : 'bg-yellow-500 text-gray-900 hover:bg-yellow-600'
                  }`}
                >
                  {isCompleted ? 'Claimed' : 'Do Task'}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Tasks;
