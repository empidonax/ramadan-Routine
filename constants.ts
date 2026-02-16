import { Task } from './types';

export const DEFAULT_SCHEDULE: Task[] = [
  { id: 'suhoor', title: 'Suhoor', startTime: '04:00', endTime: '04:30', completed: false, isCustom: false },
  { id: 'fajr', title: 'Fajr Prayer', startTime: '05:00', endTime: '05:30', completed: false, isCustom: false },
  { id: 'work_start', title: 'Work/Study', startTime: '09:00', endTime: '17:00', completed: false, isCustom: false },
  { id: 'dhuhr', title: 'Dhuhr Prayer', startTime: '13:00', endTime: '13:30', completed: false, isCustom: false },
  { id: 'asr', title: 'Asr Prayer', startTime: '16:30', endTime: '17:00', completed: false, isCustom: false },
  { id: 'quran', title: 'Quran Reading', startTime: '17:30', endTime: '18:00', completed: false, isCustom: false },
  { id: 'maghrib', title: 'Iftar & Maghrib', startTime: '19:00', endTime: '19:30', completed: false, isCustom: false },
  { id: 'isha', title: 'Isha Prayer', startTime: '20:30', endTime: '21:00', completed: false, isCustom: false },
  { id: 'taraweeh', title: 'Taraweeh', startTime: '21:00', endTime: '22:30', completed: false, isCustom: false },
  { id: 'sleep', title: 'Sleep', startTime: '23:00', endTime: '04:00', completed: false, isCustom: false },
];

export const STORAGE_KEY = 'ramadan_planner_v1';