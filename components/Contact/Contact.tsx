'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import styles from './Contact.module.css';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className={styles.contact} aria-label="Contact section">
      <p className={styles.subtitle}>{t('contact.subtitle')}</p>
      <h1 className={styles.title}>{t('contact.title')}</h1>
      <div className={styles.infoContainer}>
        <div className={styles.infoCard}>
          <Image
            src="/assets/email.png"
            alt=""
            className={`${styles.icon} ${styles.emailIcon}`}
            width={40}
            height={40}
            quality={90}
            sizes="40px"
            aria-hidden="true"
          />
          <p>
            <a href="mailto:aaron.p.greyling@gmail.com" aria-label="Send email to aaron.p.greyling@gmail.com">
              aaron.p.greyling@gmail.com
            </a>
          </p>
        </div>
        <div className={styles.infoCard}>
          <Image
            src="/assets/linkedin.png"
            alt=""
            className={styles.icon}
            width={32}
            height={32}
            quality={90}
            sizes="32px"
            aria-hidden="true"
          />
          <p>
            <a
              href="https://www.linkedin.com/in/aaron-paul-greyling-54a8a954/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
            >
              {t('contact.linkedin')}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
