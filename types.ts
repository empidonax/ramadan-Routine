export interface Task {
  id: string;
  title: string;
  startTime: string; // HH:MM format (24h)
  endTime: string;   // HH:MM format (24h)
  completed: boolean;
  isCustom?: boolean;
}

export interface Day {
  date: string; // ISO String YYYY-MM-DD
  dayNumber: number; // Ramadan Day 1, 2, etc.
  tasks: Task[];
}

export interface Settings {
  startDate: string; // ISO String YYYY-MM-DD
  totalDays: number;
  fixedSchedule: Task[];
}

export interface AppData {
  settings: Settings | null;
  days: Day[];
}

export enum AppView {
  SETUP = 'SETUP',
  DASHBOARD = 'DASHBOARD',
  ANALYTICS = 'ANALYTICS',
  SETTINGS = 'SETTINGS'
}