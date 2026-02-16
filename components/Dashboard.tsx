import React, { useState, useMemo } from 'react';
import { Day } from '../types';
import { TaskItem } from './TaskItem';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from './Icons';

interface DashboardProps {
  days: Day[];
  toggleTask: (dayIndex: number, taskIndex: number) => void;
  addTask: (dayIndex: number, title: string, startTime: string, endTime: string) => void;
  deleteTask: (dayIndex: number, taskIndex: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ days, toggleTask, addTask, deleteTask }) => {
  // Find "Today" or default to day 1
  const todayStr = new Date().toISOString().split('T')[0];
  const initialDayIndex = Math.max(0, days.findIndex(d => d.date === todayStr));
  
  const [currentDayIndex, setCurrentDayIndex] = useState(initialDayIndex !== -1 ? initialDayIndex : 0);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskStartTime, setNewTaskStartTime] = useState('');
  const [newTaskEndTime, setNewTaskEndTime] = useState('');

  const currentDay = days[currentDayIndex];

  const progress = useMemo(() => {
    if (!currentDay || currentDay.tasks.length === 0) return 0;
    const completed = currentDay.tasks.filter(t => t.completed).length;
    return Math.round((completed / currentDay.tasks.length) * 100);
  }, [currentDay]);

  const handlePrev = () => setCurrentDayIndex(prev => Math.max(0, prev - 1));
  const handleNext = () => setCurrentDayIndex(prev => Math.min(days.length - 1, prev + 1));

  const handleAddTask = () => {
    if (newTaskTitle && newTaskStartTime && newTaskEndTime) {
      addTask(currentDayIndex, newTaskTitle, newTaskStartTime, newTaskEndTime);
      setNewTaskTitle('');
      setNewTaskStartTime('');
      setNewTaskEndTime('');
      setIsAdding(false);
    }
  };

  if (!currentDay) {
      return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-md pt-4 pb-4 px-4 shadow-xl border-b border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrev} disabled={currentDayIndex === 0} className="p-2 text-gray-400 disabled:opacity-30 hover:text-white">
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <h2 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Ramadan Day {currentDay.dayNumber}</h2>
            <div className="text-lg font-semibold text-white">
              {new Date(currentDay.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </div>
          </div>

          <button onClick={handleNext} disabled={currentDayIndex === days.length - 1} className="p-2 text-gray-400 disabled:opacity-30 hover:text-white">
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-500 h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
          <span>{progress}% Completed</span>
          <button onClick={() => setIsEditing(!isEditing)} className={`${isEditing ? 'text-red-400' : 'text-emerald-400'}`}>
             {isEditing ? 'Done' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-4 space-y-4 max-w-lg mx-auto">
        {currentDay.tasks.map((task, idx) => (
          <TaskItem
            key={`${currentDayIndex}-${task.id}-${idx}`}
            task={task}
            onToggle={() => toggleTask(currentDayIndex, idx)}
            onDelete={() => deleteTask(currentDayIndex, idx)}
            isEditing={isEditing}
          />
        ))}

        {isEditing && (
          <div className="mt-6 border-t border-gray-800 pt-4">
            {!isAdding ? (
              <button 
                onClick={() => setIsAdding(true)}
                className="w-full py-3 bg-gray-800 border border-gray-700 text-emerald-400 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-750"
              >
                <PlusIcon className="w-5 h-5" /> Add Custom Task
              </button>
            ) : (
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 space-y-3 animate-fade-in">
                 <h3 className="text-sm font-bold text-gray-400">New Task</h3>
                 <div className="flex gap-2 items-start">
                   <div className="flex flex-col gap-1">
                     <input
                       type="time"
                       value={newTaskStartTime}
                       onChange={e => setNewTaskStartTime(e.target.value)}
                       className="bg-gray-900 border border-gray-600 rounded p-2 text-white text-xs"
                     />
                     <input
                       type="time"
                       value={newTaskEndTime}
                       onChange={e => setNewTaskEndTime(e.target.value)}
                       className="bg-gray-900 border border-gray-600 rounded p-2 text-gray-400 text-xs"
                     />
                   </div>
                   <input
                     type="text"
                     placeholder="Title"
                     value={newTaskTitle}
                     onChange={e => setNewTaskTitle(e.target.value)}
                     className="bg-gray-900 border border-gray-600 rounded p-2 text-white text-sm flex-1 h-auto self-stretch"
                   />
                 </div>
                 <div className="flex gap-2">
                   <button onClick={() => setIsAdding(false)} className="flex-1 py-2 text-sm text-gray-400">Cancel</button>
                   <button onClick={handleAddTask} className="flex-1 py-2 bg-emerald-600 rounded text-sm font-bold">Save</button>
                 </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Empty State spacer for bottom nav */}
      <div className="h-20" />
    </div>
  );
};