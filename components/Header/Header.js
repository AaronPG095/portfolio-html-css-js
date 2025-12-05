'use client';

import { useState } from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import Sidebar from './Sidebar';
import { useActiveSection } from '@/hooks/useActiveSection';
import styles from './Header.module.css';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeSection = useActiveSection();

  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeMenu = () => {
    setSidebarOpen(false);
  };

  return (
    <header className={styles.header}>
      <DesktopNav activeSection={activeSection} />
      <MobileNav onMenuToggle={toggleMenu} isOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={closeMenu} activeSection={activeSection} />
    </header>
  );
}

