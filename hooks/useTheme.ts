'use client';

import { useState, useEffect } from 'react';
import { getTimeBasedTheme, getStoredTheme, setStoredTheme, applyTheme } from '@/lib/theme';
import type { Theme } from '@/types';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTheme.ts:11',message:'useEffect entry - initializing theme',data:{currentTheme:theme,mounted:mounted},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    setMounted(true);
    const storedTheme = getStoredTheme();
    const initialTheme = storedTheme || getTimeBasedTheme();
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTheme.ts:15',message:'BEFORE setTheme and applyTheme',data:{storedTheme:storedTheme,initialTheme:initialTheme},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    setTheme(initialTheme);
    applyTheme(initialTheme);
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTheme.ts:17',message:'AFTER setTheme and applyTheme',data:{initialTheme:initialTheme},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setStoredTheme(newTheme);
    applyTheme(newTheme);
  };

  const setThemeValue = (newTheme: Theme) => {
    setTheme(newTheme);
    setStoredTheme(newTheme);
    applyTheme(newTheme);
  };

  return { theme, toggleTheme, setTheme: setThemeValue, mounted };
}
