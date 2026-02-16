import React, { useState } from 'react';
import { Task } from '../types';
import { DEFAULT_SCHEDULE } from '../constants';
import { PlusIcon, TrashIcon } from './Icons';

interface SetupScreenProps {
  onComplete: (startDate: string, totalDays: number, schedule: Task[]) => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onComplete }) => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [totalDays, setTotalDays] = useState(30);
  const [schedule, setSchedule] = useState<Task[]>(DEFAULT_SCHEDULE);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskStartTime, setNewTaskStartTime] = useState('');
  const [newTaskEndTime, setNewTaskEndTime] = useState('');

  const handleTaskChange = (index: number, field: keyof Task, value: string) => {
    const newSchedule = [...schedule];
    (newSchedule[index] as any)[field] = value;
    setSchedule(newSchedule);
  };

  const removeTask = (index: number) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  const addTask = () => {
    if (!newTaskTitle || !newTaskStartTime || !newTaskEndTime) return;
    const newTask: Task = {
      id: `setup_${Date.now()}`,
      title: newTaskTitle,
      startTime: newTaskStartTime,
      endTime: newTaskEndTime,
      completed: false,
      isCustom: true
    };
    const newSchedule = [...schedule, newTask].sort((a, b) => a.startTime.localeCompare(b.startTime));
    setSchedule(newSchedule);
    setNewTaskTitle('');
    setNewTaskStartTime('');
    setNewTaskEndTime('');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white flex flex-col max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-emerald-500 mb-2">Ramadan Planner</h1>
      <p className="text-gray-400 mb-8">Set up your daily schedule. This will be cloned for all 30 days.</p>

      <div className="space-y-6 flex-1">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Duration (Days)</label>
          <input
            type="number"
            value={totalDays}
            onChange={(e) => setTotalDays(parseInt(e.target.value))}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-emerald-400 mb-3">Daily Routine</h3>
          <div className="space-y-3">
            {schedule.map((task, idx) => (
              <div key={task.id} className="flex gap-2 items-center bg-gray-800 p-2 rounded-lg">
                <div className="flex flex-col gap-1">
                   <input
                    type="time"
                    value={task.startTime}
                    onChange={(e) => handleTaskChange(idx, 'startTime', e.target.value)}
                    className="bg-gray-900 border-gray-700 rounded p-1 text-xs w-20 text-center"
                    aria-label="Start time"
                  />
                  <input
                    type="time"
                    value={task.endTime}
                    onChange={(e) => handleTaskChange(idx, 'endTime', e.target.value)}
                    className="bg-gray-900 border-gray-700 rounded p-1 text-xs w-20 text-center text-gray-400"
                    aria-label="End time"
                  />
                </div>
                
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => handleTaskChange(idx, 'title', e.target.value)}
                  className="bg-transparent flex-1 focus:outline-none text-sm px-2"
                />
                <button onClick={() => removeTask(idx)} className="text-red-400 p-2">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 border border-dashed border-gray-700 rounded-lg">
             <div className="flex gap-2 items-start">
               <div className="flex flex-col gap-1">
                 <input
                   type="time"
                   value={newTaskStartTime}
                   onChange={e => setNewTaskStartTime(e.target.value)}
                   className="bg-gray-800 border border-gray-700 rounded p-2 text-xs w-24 text-white"
                 />
                 <input
                   type="time"
                   value={newTaskEndTime}
                   onChange={e => setNewTaskEndTime(e.target.value)}
                   className="bg-gray-800 border border-gray-700 rounded p-2 text-xs w-24 text-gray-400"
                 />
               </div>
               
               <input
                 type="text"
                 placeholder="New Activity"
                 value={newTaskTitle}
                 onChange={e => setNewTaskTitle(e.target.value)}
                 className="bg-gray-800 border border-gray-700 rounded p-2 text-sm flex-1 text-white h-full"
               />
             </div>
             <button
               onClick={addTask}
               className="mt-2 w-full py-2 bg-gray-800 text-emerald-400 text-sm font-medium rounded flex items-center justify-center gap-2 hover:bg-gray-750"
             >
               <PlusIcon className="w-4 h-4" /> Add Activity
             </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => onComplete(startDate, totalDays, schedule)}
        className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/50 transition-all transform active:scale-95"
      >
        Start Ramadan Journey
      </button>
    </div>
  );
};