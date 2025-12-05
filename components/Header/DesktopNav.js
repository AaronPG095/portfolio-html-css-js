'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import styles from './Header.module.css';

export default function DesktopNav({ activeSection = '' }) {
  const { t } = useLanguage();

  const navItems = [
    { href: '#about', key: 'about', label: t('nav.about') },
    { href: '#skills', key: 'skills', label: t('nav.skills') },
    { href: '#projects', key: 'projects', label: t('nav.projects') },
    { href: '#contact', key: 'contact', label: t('nav.contact') },
  ];

  return (
    <nav className={styles.desktopNav} role="navigation" aria-label="Main navigation">
      <Link href="#" className={styles.logo} aria-label="Go to top of page">
        Aaron Paul Greyling
      </Link>
      <div className={styles.navRight}>
        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                className={activeSection === item.key ? 'active' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </nav>
  );
}

