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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
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
        role="dialog"
        aria-modal="true"
        aria-label={t('sidebar.menu')}
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
          <li>
            <a
              href="#about"
              onClick={(e) => handleLinkClick(e, '#about')}
              className={activeSection === 'about' ? 'active' : ''}
              aria-current={activeSection === 'about' ? 'page' : undefined}
            >
              {t('nav.about')}
            </a>
          </li>
          <li>
            <a
              href="#skills"
              onClick={(e) => handleLinkClick(e, '#skills')}
              className={activeSection === 'skills' ? 'active' : ''}
              aria-current={activeSection === 'skills' ? 'page' : undefined}
            >
              {t('nav.skills')}
            </a>
          </li>
          <li>
            <a
              href="#projects"
              onClick={(e) => handleLinkClick(e, '#projects')}
              className={activeSection === 'projects' ? 'active' : ''}
              aria-current={activeSection === 'projects' ? 'page' : undefined}
            >
              {t('nav.projects')}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className={activeSection === 'contact' ? 'active' : ''}
              aria-current={activeSection === 'contact' ? 'page' : undefined}
            >
              {t('nav.contact')}
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
}
