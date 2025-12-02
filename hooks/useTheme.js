'use client';

import { useState, useEffect } from 'react';
import { getTimeBasedTheme, getStoredTheme, setStoredTheme, applyTheme } from '@/lib/theme';

export function useTheme() {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = getStoredTheme();
    const initialTheme = storedTheme || getTimeBasedTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setStoredTheme(newTheme);
    applyTheme(newTheme);
  };

  const setThemeValue = (newTheme) => {
    setTheme(newTheme);
    setStoredTheme(newTheme);
    applyTheme(newTheme);
  };

  return { theme, toggleTheme, setTheme: setThemeValue, mounted };
}

