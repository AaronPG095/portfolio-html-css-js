'use client';

import Link from 'next/link';
import Image from 'next/image';
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
      <div className={styles.socialsContainer}>
        <a
          href="https://linkedin.com/in/aaron-paul-greyling-54a8a954"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit LinkedIn profile"
          className={styles.socialLink}
          data-tooltip="LinkedIn"
        >
          <Image
            src="/assets/linkedin.png"
            alt="LinkedIn icon"
            className={styles.icon}
            width={32}
            height={32}
            quality={90}
            sizes="32px"
          />
        </a>
        <a
          href="https://github.com/AaronPG095"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit GitHub profile"
          className={styles.socialLink}
          data-tooltip="GitHub"
        >
          <Image
            src="/assets/github.png"
            alt="GitHub icon"
            className={styles.icon}
            width={32}
            height={32}
            quality={90}
            sizes="32px"
          />
        </a>
      </div>
      <p>{copyrightText}</p>
    </footer>
  );
}
