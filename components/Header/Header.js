'use client';

import { useState } from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import Sidebar from './Sidebar';
import styles from './Header.module.css';

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleMenu = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeMenu = () => {
    setSidebarOpen(false);
  };

  return (
    <header className={styles.header}>
      <DesktopNav />
      <MobileNav onMenuToggle={toggleMenu} isOpen={sidebarOpen} />
      <Sidebar isOpen={sidebarOpen} onClose={closeMenu} />
    </header>
  );
}

