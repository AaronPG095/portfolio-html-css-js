'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection?: string;
}

export default function Sidebar({ isOpen, onClose, activeSection = '' }: SidebarProps) {
  const { t } = useLanguage();
  const scrollToSection = useScrollToSection();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Sidebar.tsx:25',message:'useEffect entry - body overflow',data:{isOpen:isOpen,currentOverflow:document.body.style.overflow},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    if (isOpen) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Sidebar.tsx:28',message:'BEFORE setting overflow hidden',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      document.body.style.overflow = 'hidden';
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Sidebar.tsx:30',message:'AFTER setting overflow hidden',data:{overflow:document.body.style.overflow},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
    } else {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Sidebar.tsx:33',message:'BEFORE clearing overflow',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      document.body.style.overflow = '';
    }
    return () => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Sidebar.tsx:37',message:'cleanup - resetting overflow',data:{isOpen:isOpen},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    // Wait for sidebar close animation to complete (~300ms) before scrolling
    scrollToSection(href, 300);
  };

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
        role="menu"
        aria-label="Mobile menu"
      >
        <div className={styles.header}>
          <span className={styles.title}>{t('sidebar.menu')}</span>
        </div>
        <div className={styles.toggles}>
          <div className={styles.toggleItem}>
            <span className={styles.toggleLabel}>{t('sidebar.language')}</span>
            <LanguageToggle isMobile={true} />
          </div>
          <div className={styles.toggleItem}>
            <span className={styles.toggleLabel}>{t('sidebar.theme')}</span>
            <ThemeToggle />
          </div>
        </div>
        <ul className={styles.links}>
          <li role="menuitem">
            <a
              href="#about"
              onClick={(e) => handleLinkClick(e, '#about')}
              className={activeSection === 'about' ? 'active' : ''}
            >
              {t('nav.about')}
            </a>
          </li>
          <li role="menuitem">
            <a
              href="#skills"
              onClick={(e) => handleLinkClick(e, '#skills')}
              className={activeSection === 'skills' ? 'active' : ''}
            >
              {t('nav.skills')}
            </a>
          </li>
          <li role="menuitem">
            <a
              href="#projects"
              onClick={(e) => handleLinkClick(e, '#projects')}
              className={activeSection === 'projects' ? 'active' : ''}
            >
              {t('nav.projects')}
            </a>
          </li>
          <li role="menuitem">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className={activeSection === 'contact' ? 'active' : ''}
            >
              {t('nav.contact')}
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
}
