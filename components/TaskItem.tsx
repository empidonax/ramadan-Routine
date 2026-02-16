import React from 'react';
import { Task } from '../types';
import { CheckIcon, TrashIcon } from './Icons';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  isEditing: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, isEditing }) => {
  return (
    <div className={`relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${task.completed ? 'bg-emerald-900/20 border border-emerald-900/50' : 'bg-gray-800/50 border border-gray-700'}`}>
      <div className="flex flex-col items-center justify-center w-14 text-center">
        <span className={`text-sm font-bold leading-none ${task.completed ? 'text-emerald-500' : 'text-gray-300'}`}>
          {task.startTime}
        </span>
        <div className="h-3 w-[1px] bg-gray-700 my-0.5"></div>
        <span className={`text-[10px] leading-none ${task.completed ? 'text-emerald-500/70' : 'text-gray-500'}`}>
          {task.endTime}
        </span>
      </div>

      <div className="flex-1">
        <h3 className={`font-medium ${task.completed ? 'text-emerald-400 line-through decoration-emerald-600/50' : 'text-white'}`}>
          {task.title}
        </h3>
      </div>

      {isEditing ? (
        <button 
            onClick={onDelete}
            className="p-2 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500/20"
        >
            <TrashIcon className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={onToggle}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
              : 'border-gray-600 text-transparent hover:border-emerald-500/50'
          }`}
        >
          <CheckIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};