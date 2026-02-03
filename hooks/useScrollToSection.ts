'use client';

import { useCallback } from 'react';

/**
 * Custom hook for scrolling to sections with proper header offset
 * Handles dynamic header height calculation based on viewport size
 */
export function useScrollToSection() {
  const scrollToSection = useCallback((sectionId: string, delay: number = 0) => {
    const scroll = () => {
      // Remove # if present
      const id = sectionId.replace('#', '');
      const targetElement = document.getElementById(id);

      if (!targetElement) {
        console.warn(`Section with id "${id}" not found`);
        return;
      }

      // Calculate header height dynamically based on viewport
      const getHeaderHeight = (): number => {
        const header = document.querySelector('header');
        if (!header) return 0;

        // Get computed height
        const headerHeight = header.offsetHeight;
        
        // For responsive breakpoints, use specific values if needed
        // But prefer actual measured height
        return headerHeight;
      };

      const headerHeight = getHeaderHeight();
      const targetPosition = targetElement.offsetTop - headerHeight;

      // Smooth scroll to target position
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth',
      });
    };

    // Apply delay if specified (for sidebar close animation)
    if (delay > 0) {
      setTimeout(scroll, delay);
    } else {
      scroll();
    }
  }, []);

  return scrollToSection;
}
