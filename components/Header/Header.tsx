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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
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
