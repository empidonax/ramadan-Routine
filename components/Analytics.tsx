import React, { useMemo } from 'react';
import { Day } from '../types';

interface AnalyticsProps {
  days: Day[];
  onReset: () => void;
}

export const Analytics: React.FC<AnalyticsProps> = ({ days, onReset }) => {
  const stats = useMemo(() => {
    let totalTasks = 0;
    let completedTasks = 0;
    let currentStreak = 0;
    let tempStreak = 0;

    const dailyCompletion = days.map(d => {
      const dayTotal = d.tasks.length;
      const dayCompleted = d.tasks.filter(t => t.completed).length;
      totalTasks += dayTotal;
      completedTasks += dayCompleted;

      // Streak logic: A day counts if at least 1 task is done. 
      // This is a gentle streak logic suitable for spiritual apps.
      if (dayCompleted > 0) {
        tempStreak++;
      } else {
        // Only reset streak if the day has passed (simple logic: looking at whole array)
        // For a more robust one we would check dates, but let's keep it simple for now.
        tempStreak = 0;
      }
      currentStreak = Math.max(currentStreak, tempStreak);

      return {
        day: d.dayNumber,
        rate: dayTotal > 0 ? (dayCompleted / dayTotal) : 0
      };
    });

    const overallRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return { totalTasks, completedTasks, overallRate, currentStreak, dailyCompletion };
  }, [days]);

  return (
    <div className="p-6 max-w-lg mx-auto pb-24">
      <h2 className="text-2xl font-bold text-white mb-6">Your Progress</h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
          <div className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Completion</div>
          <div className="text-3xl font-bold text-emerald-400">{stats.overallRate}%</div>
          <div className="text-xs text-gray-500 mt-1">{stats.completedTasks} / {stats.totalTasks} tasks</div>
        </div>
        <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
          <div className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">Streak</div>
          <div className="text-3xl font-bold text-orange-400">{stats.currentStreak} <span className="text-sm font-normal text-gray-500">days</span></div>
          <div className="text-xs text-gray-500 mt-1">Keep it up!</div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 mb-8">
        <h3 className="text-sm font-bold text-gray-300 mb-4">Daily Consistency</h3>
        <div className="flex items-end justify-between h-32 gap-1">
          {stats.dailyCompletion.slice(0, 30).map((d, i) => (
             <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                <div 
                  className="w-full bg-emerald-900/50 rounded-t relative overflow-hidden" 
                  style={{ height: '100%' }}
                >
                    <div 
                        className="absolute bottom-0 w-full bg-emerald-500 transition-all duration-500" 
                        style={{ height: `${d.rate * 100}%` }} 
                    />
                </div>
                {i % 5 === 0 && <span className="text-[10px] text-gray-600">{d.day}</span>}
             </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <button 
            onClick={onReset}
            className="text-red-900 bg-red-500/10 px-4 py-2 rounded text-sm hover:bg-red-500/20"
        >
            Reset All Data
        </button>
        <p className="text-xs text-gray-600 mt-2">v1.0.0 • Offline Capable</p>
      </div>
    </div>
  );
};