'use client';

import { useTheme } from '@/hooks/useTheme';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcuts';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Keyboard shortcut: 'T' to toggle theme
  useKeyboardShortcut('t', toggleTheme, mounted);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className={styles.container}>
      <span className={styles.labelDark} aria-label="Dark mode">
        <svg className={styles.iconMoon} xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px">
          <path d="M470.43-169.46q100.83-34.05 161.99-119.39 61.17-85.33 61.17-191.77 0-106.43-61.71-191.89-61.7-85.47-162.52-119.52 56.13 65 83.93 145.19 27.81 80.18 27.81 166.23 0 86.05-27.27 166.1t-83.4 145.05Zm-102.79 69.05q-15.91 0-30.97-1.62-15.07-1.61-30-4.18 107.43-49.36 165.81-151.97 58.37-102.62 58.37-222.36 0-119.74-58.37-222.36-58.38-102.61-165.81-151.97 14.92-3.39 29.87-4.46 14.95-1.08 30.28-1.08 78.31 0 147.19 29.92 68.87 29.92 119.76 81.42 50.89 51.49 80.48 120.6 29.59 69.11 29.59 147.68 0 78.48-29.37 147.85-29.38 69.37-80.25 120.89-50.87 51.53-119.63 81.58-68.76 30.06-146.95 30.06Zm213.46-380Z"/>
        </svg>
      </span>
      <button
        className={styles.toggle}
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        role="switch"
        aria-checked={theme === 'dark'}
      >
        <span className={styles.track}>
          <span className={styles.thumb}></span>
        </span>
      </button>
      <span className={styles.labelLight} aria-label="Light mode">
        <svg className={styles.iconSun} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
          <path d="M480-55.69 354.38-180H180v-174.38L55.69-480 180-605.62V-780h174.38L480-904.31 605.62-780H780v174.38L904.31-480 780-354.38V-180H605.62L480-55.69Zm0-239.7q76.61 0 130.61-54 54-54 54-130.61 0-76.61-54-130.61-54-54-130.61-54-76.61 0-130.61 54-54 54-54 130.61 0 76.61 54 130.61 54 54 130.61 54ZM480-480Zm0 340 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"/>
        </svg>
      </span>
    </div>
  );
}
