'use client';

import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
}

export default function Skeleton({
  width,
  height,
  borderRadius,
  className = '',
  variant = 'rectangular',
}: SkeletonProps) {
  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || '1rem',
    borderRadius: borderRadius || (variant === 'circular' ? '50%' : variant === 'text' ? '4px' : '8px'),
  };

  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}
