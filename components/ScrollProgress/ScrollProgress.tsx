'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';
import styles from './ScrollProgress.module.css';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div 
      className={styles.scrollProgress}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div 
        className={styles.progressBar}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
