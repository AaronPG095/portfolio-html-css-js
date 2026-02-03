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
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useActiveSection.ts:37',message:'useEffect entry',data:{hasTimeoutRef:timeoutRef.current!==null,timeoutRefType:typeof timeoutRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    // Debounced scroll handler
    const handleScroll = () => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useActiveSection.ts:40',message:'handleScroll called',data:{hasTimeoutRef:timeoutRef.current!==null,timeoutRefValue:timeoutRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      if (timeoutRef.current) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useActiveSection.ts:42',message:'BEFORE cancelAnimationFrame',data:{timeoutRefValue:timeoutRef.current,timeoutRefType:typeof timeoutRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        cancelAnimationFrame(timeoutRef.current);
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useActiveSection.ts:45',message:'AFTER cancelAnimationFrame',data:{timeoutRefValue:timeoutRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
      }
      const rafId = requestAnimationFrame(() => {
        updateActiveSection();
      });
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useActiveSection.ts:49',message:'AFTER requestAnimationFrame',data:{rafId:rafId,rafIdType:typeof rafId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      timeoutRef.current = rafId;
    };

    // Initial call with a small delay to ensure DOM is ready
    const initialTimeoutId = setTimeout(() => {
      updateActiveSection();
    }, 100);

    // Add scroll listener with debouncing
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useActiveSection.ts:60',message:'cleanup function entry',data:{hasTimeoutRef:timeoutRef.current!==null,timeoutRefValue:timeoutRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      clearTimeout(initialTimeoutId);
      if (timeoutRef.current) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useActiveSection.ts:63',message:'BEFORE cleanup cancelAnimationFrame',data:{timeoutRefValue:timeoutRef.current,timeoutRefType:typeof timeoutRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        cancelAnimationFrame(timeoutRef.current);
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useActiveSection.ts:66',message:'AFTER cleanup cancelAnimationFrame',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateActiveSection]);

  return activeSection;
}
