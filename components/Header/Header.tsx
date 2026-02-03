'use client';

import { useState, useEffect } from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import Sidebar from './Sidebar';
import ScrollProgress from '@/components/ScrollProgress/ScrollProgress';
import { useActiveSection } from '@/hooks/useActiveSection';
import styles from './Header.module.css';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Header.tsx:16',message:'useEffect entry - scroll listener',data:{isScrolled:isScrolled},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
    // #endregion
    const handleScroll = () => {
      const newIsScrolled = window.scrollY > 50;
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Header.tsx:19',message:'handleScroll called',data:{scrollY:window.scrollY,newIsScrolled:newIsScrolled,currentIsScrolled:isScrolled},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
      // #endregion
      setIsScrolled(newIsScrolled);
    };

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Header.tsx:25',message:'BEFORE adding scroll listener',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
    // #endregion
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Header.tsx:28',message:'AFTER adding scroll listener and initial call',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
    // #endregion

    return () => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Header.tsx:31',message:'cleanup - removing scroll listener',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
      // #endregion
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeMenu = () => {
    setSidebarOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <ScrollProgress />
      <DesktopNav activeSection={activeSection} />
      <MobileNav onMenuToggle={toggleMenu} isOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={closeMenu} activeSection={activeSection} />
    </header>
  );
}
