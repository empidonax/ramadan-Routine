import { useLocalStorage } from './useLocalStorage';
import { Task, Day } from '../types';
import { useCallback } from 'react';

export const useRamadanPlanner = () => {
  const { data, setData } = useLocalStorage();

  const initializePlanner = useCallback((startDate: string, totalDays: number, fixedSchedule: Task[]) => {
    const days: Day[] = [];
    const start = new Date(startDate);

    for (let i = 0; i < totalDays; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      // Clone tasks deeply to avoid reference issues
      const tasks = fixedSchedule.map(t => ({ ...t, id: `${t.id}_${i}`, completed: false }));
      days.push({
        date: date.toISOString().split('T')[0],
        dayNumber: i + 1,
        tasks
      });
    }

    setData({
      settings: { startDate, totalDays, fixedSchedule },
      days
    });
  }, [setData]);

  const toggleTask = useCallback((dayIndex: number, taskIndex: number) => {
    setData(prev => {
      const newDays = [...prev.days];
      newDays[dayIndex].tasks[taskIndex].completed = !newDays[dayIndex].tasks[taskIndex].completed;
      return { ...prev, days: newDays };
    });
  }, [setData]);

  const addTask = useCallback((dayIndex: number, title: string, startTime: string, endTime: string) => {
    setData(prev => {
      const newDays = [...prev.days];
      const newTask: Task = {
        id: `custom_${Date.now()}`,
        title,
        startTime,
        endTime,
        completed: false,
        isCustom: true
      };
      
      const dayTasks = [...newDays[dayIndex].tasks, newTask];
      // Sort by startTime
      dayTasks.sort((a, b) => a.startTime.localeCompare(b.startTime));
      
      newDays[dayIndex].tasks = dayTasks;
      return { ...prev, days: newDays };
    });
  }, [setData]);

  const deleteTask = useCallback((dayIndex: number, taskIndex: number) => {
    setData(prev => {
      const newDays = [...prev.days];
      newDays[dayIndex].tasks.splice(taskIndex, 1);
      return { ...prev, days: newDays };
    });
  }, [setData]);

  const updateTask = useCallback((dayIndex: number, taskIndex: number, updates: Partial<Task>) => {
    setData(prev => {
      const newDays = [...prev.days];
      newDays[dayIndex].tasks[taskIndex] = { ...newDays[dayIndex].tasks[taskIndex], ...updates };
      // Sort again if startTime changed
      if (updates.startTime) {
        newDays[dayIndex].tasks.sort((a, b) => a.startTime.localeCompare(b.startTime));
      }
      return { ...prev, days: newDays };
    });
  }, [setData]);

  const resetData = useCallback(() => {
     if(confirm("Are you sure you want to reset all data? This cannot be undone.")) {
         setData({ settings: null, days: [] });
         window.location.reload();
     }
  }, [setData]);

  return {
    settings: data.settings,
    days: data.days,
    initializePlanner,
    toggleTask,
    addTask,
    deleteTask,
    updateTask,
    resetData
  };
};