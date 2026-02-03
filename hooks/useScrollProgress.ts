'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to track scroll progress as a percentage (0-100)
 * @returns The current scroll progress percentage
 */
export function useScrollProgress(): number {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      // Calculate total scrollable height
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = documentHeight - windowHeight;

      // Calculate current scroll position
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Calculate progress percentage
      const progress = scrollableHeight > 0 
        ? Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100))
        : 0;

      setScrollProgress(progress);
    };

    // Initial calculation
    updateScrollProgress();

    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  return scrollProgress;
}
