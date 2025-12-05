'use client';

import { useEffect, useState } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const updateActiveSection = () => {
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
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = sectionId;
        }
      });

      // If we're at the top of the page, don't highlight anything
      if (window.scrollY < 100) {
        setActiveSection('');
      } else {
        setActiveSection(currentSection);
      }
    };

    // Initial call with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      updateActiveSection();
    }, 100);

    // Add scroll listener
    window.addEventListener('scroll', updateActiveSection, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, []);

  return activeSection;
}

