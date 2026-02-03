'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState<string>('');
  const timeoutRef = useRef<number | null>(null);

  const updateActiveSection = useCallback(() => {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return; // Sections not loaded yet
    
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    const scrollPosition = window.scrollY + headerHeight + 100; // Offset to trigger earlier

    let currentSection = '';
    
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      // Check if scroll position is within this section
      if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });

    // If we're at the top of the page, don't highlight anything
    if (window.scrollY < 100) {
      setActiveSection('');
    } else {
      setActiveSection(currentSection);
    }
  }, []);

  useEffect(() => {
    // Debounced scroll handler
    const handleScroll = () => {
      if (timeoutRef.current) {
        cancelAnimationFrame(timeoutRef.current);
      }
      timeoutRef.current = requestAnimationFrame(() => {
        updateActiveSection();
      });
    };

    // Initial call with a small delay to ensure DOM is ready
    const initialTimeoutId = setTimeout(() => {
      updateActiveSection();
    }, 100);

    // Add scroll listener with debouncing
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(initialTimeoutId);
      if (timeoutRef.current) {
        cancelAnimationFrame(timeoutRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateActiveSection]);

  return activeSection;
}
