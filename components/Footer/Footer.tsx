'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const copyrightText = t('footer.copyright').replace('2026', currentYear.toString());

  return (
    <footer className={styles.footer} role="contentinfo">
      <nav aria-label="Footer navigation">
        <div className={styles.navLinksContainer}>
          <ul className={styles.navLinks}>
            <li><Link href="#about">{t('nav.about')}</Link></li>
            <li><Link href="#skills">{t('nav.skills')}</Link></li>
            <li><Link href="#projects">{t('nav.projects')}</Link></li>
            <li><Link href="#contact">{t('nav.contact')}</Link></li>
          </ul>
        </div>
      </nav>
      <p>{copyrightText}</p>
    </footer>
  );
}
