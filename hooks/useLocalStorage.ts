import { useState, useEffect } from 'react';
import { STORAGE_KEY } from '../constants';
import { AppData } from '../types';

export const useLocalStorage = () => {
  const [data, setData] = useState<AppData>(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : { settings: null, days: [] };
    } catch (error) {
      console.error(error);
      return { settings: null, days: [] };
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }, [data]);

  return { data, setData };
};