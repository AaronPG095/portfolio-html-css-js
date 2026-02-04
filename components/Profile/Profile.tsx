'use client';

import { useEffect, useState } from 'react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import styles from './Profile.module.css';

export default function Profile() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  // Get the text values
  const nameText = t('profile.name');
  const titleText = t('profile.title');

  // State to control when title animation should start
  const [shouldStartTitle, setShouldStartTitle] = useState(false);

  // Typing animation for name (starts immediately)
  const nameAnimation = useTypingAnimation(nameText, {
    speed: 120,
    delay: 300,
    showCursor: true,
    restartOnChange: true,
  });

  // Reset title start state when name text changes (language change)
  useEffect(() => {
    setShouldStartTitle(false);
  }, [nameText]);

  // Start title animation when name completes
  useEffect(() => {
    if (nameAnimation.isComplete && !shouldStartTitle) {
      // Small pause after name completes before starting title
      const timer = setTimeout(() => {
        setShouldStartTitle(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [nameAnimation.isComplete, shouldStartTitle]);

  // Typing animation for title (starts when shouldStartTitle is true)
  const titleAnimation = useTypingAnimation(titleText, {
    speed: 80,
    delay: 0,
    showCursor: true,
    restartOnChange: true,
    enabled: shouldStartTitle,
  });

  const handleDownloadCV = () => {
    const cvFile = language === 'de' ? '/assets/CV-German.pdf' : '/assets/CV-English.pdf';
    window.open(cvFile);
  };

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const targetPosition = contactSection.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="profile" className={styles.profile} aria-label="Profile section">
      <div className={styles.picContainer}>
        <OptimizedImage
          src="/assets/profile-pic-1.jpg"
          alt="Aaron Paul Greyling - Fullstack Developer"
          className={styles.profilePic}
          width={400}
          height={533}
          quality={90}
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </div>
      <div className={styles.text}>
        <p className={styles.textP1}>{t('profile.greeting')}</p>
        <h1 className={styles.title} aria-label={nameText}>
          {nameAnimation.displayedText}
          {nameAnimation.isTyping && <span className={styles.cursor} aria-hidden="true">|</span>}
        </h1>
        <p className={styles.textP2} aria-label={titleText}>
          {titleAnimation.displayedText}
          {titleAnimation.isTyping && <span className={styles.cursor} aria-hidden="true">|</span>}
        </p>
        <div className={styles.btnContainer}>
          <button
            className={`${styles.btn} ${styles.btnColor2}`}
            onClick={handleDownloadCV}
            aria-label={language === 'de' ? 'Lebenslauf auf Deutsch herunterladen' : 'Download CV in English'}
          >
            {t('profile.downloadCV')}
          </button>
          <button
            className={`${styles.btn} ${styles.btnColor1}`}
            onClick={handleContactClick}
            aria-label="Go to contact section"
          >
            {t('profile.contactInfo')}
          </button>
        </div>
        <div id="socials-container" className={styles.socialsContainer}>
          <a
            href="https://linkedin.com/in/aaron-paul-greyling-54a8a954"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn profile"
            className={styles.socialLink}
            data-tooltip="LinkedIn"
          >
            <OptimizedImage
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
            <OptimizedImage
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
      </div>
    </section>
  );
}
