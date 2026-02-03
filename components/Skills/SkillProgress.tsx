'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import styles from './Skills.module.css';
import type { SkillLevel } from '@/types';

interface SkillProgressProps {
  level: SkillLevel;
  skillName: string;
}

/**
 * Maps skill level to percentage for progress bar
 */
function getLevelPercentage(level: SkillLevel): number {
  switch (level) {
    case 'experienced':
      return 90;
    case 'intermediate':
      return 65;
    case 'basic':
      return 35;
    default:
      return 0;
  }
}

export default function SkillProgress({ level, skillName }: SkillProgressProps) {
  const [progressRef, , hasIntersected] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const percentage = getLevelPercentage(level);

  return (
    <div 
      ref={progressRef as React.RefObject<HTMLDivElement>}
      className={styles.progressContainer}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${skillName} skill level: ${percentage}%`}
    >
      <div 
        className={`${styles.progressBar} ${hasIntersected ? styles.progressBarAnimated : ''}`}
        style={{ width: hasIntersected ? `${percentage}%` : '0%' }}
      />
    </div>
  );
}
