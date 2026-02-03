'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
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

  const handleLinkClick = () => {
    onClose();
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
              onClick={handleLinkClick}
              className={activeSection === 'about' ? 'active' : ''}
            >
              {t('nav.about')}
            </a>
          </li>
          <li role="menuitem">
            <a
              href="#skills"
              onClick={handleLinkClick}
              className={activeSection === 'skills' ? 'active' : ''}
            >
              {t('nav.skills')}
            </a>
          </li>
          <li role="menuitem">
            <a
              href="#projects"
              onClick={handleLinkClick}
              className={activeSection === 'projects' ? 'active' : ''}
            >
              {t('nav.projects')}
            </a>
          </li>
          <li role="menuitem">
            <a
              href="#contact"
              onClick={handleLinkClick}
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
