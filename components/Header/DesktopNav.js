'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import styles from './Header.module.css';

export default function DesktopNav() {
  const { t } = useLanguage();

  return (
    <nav className={styles.desktopNav} role="navigation" aria-label="Main navigation">
      <Link href="#" className={styles.logo} aria-label="Go to top of page">
        Aaron Paul Greyling
      </Link>
      <div className={styles.navRight}>
        <ul className={styles.navLinks}>
          <li><Link href="#about">{t('nav.about')}</Link></li>
          <li><Link href="#skills">{t('nav.skills')}</Link></li>
          <li><Link href="#projects">{t('nav.projects')}</Link></li>
          <li><Link href="#contact">{t('nav.contact')}</Link></li>
        </ul>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </nav>
  );
}

