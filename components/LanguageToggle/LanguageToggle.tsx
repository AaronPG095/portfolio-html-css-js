'use client';

import { useLanguage } from '@/hooks/useLanguage';
import styles from './LanguageToggle.module.css';
import type { Language } from '@/types';

interface LanguageToggleProps {
  isMobile?: boolean;
}

export default function LanguageToggle({ isMobile = false }: LanguageToggleProps) {
  const { language, setLanguage, mounted } = useLanguage();

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  const handleLanguageClick = (e: React.MouseEvent<HTMLSpanElement>, lang: Language) => {
    e.preventDefault();
    e.stopPropagation();
    if (lang !== language) {
      setLanguage(lang);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.toggle}
        id={isMobile ? 'language-toggle-mobile' : 'language-toggle'}
        aria-label="Toggle language"
        type="button"
        onClick={(e) => {
          // If clicking the button itself (not a span), toggle language
          if (e.target === e.currentTarget) {
            const newLang: Language = language === 'en' ? 'de' : 'en';
            setLanguage(newLang);
          }
        }}
      >
        <span
          className={`${styles.option} ${language === 'en' ? styles.active : ''}`}
          data-lang="en"
          onClick={(e) => handleLanguageClick(e, 'en')}
        >
          EN
        </span>
        <span className={styles.separator}>/</span>
        <span
          className={`${styles.option} ${language === 'de' ? styles.active : ''}`}
          data-lang="de"
          onClick={(e) => handleLanguageClick(e, 'de')}
        >
          DE
        </span>
      </button>
    </div>
  );
}
