'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';
import styles from './About.module.css';

/**
 * Extracts number, time unit, and category from text like "3 Years Frontend" or "1 Year Backend"
 * Returns data formatted as "Category - Number Time"
 */
function parseExperienceText(text: string): { 
  number: number; 
  timeUnit: string; 
  category: string;
} {
  // Match pattern: "3 Years Frontend" or "1 Year Backend"
  // Format: number + time unit + category
  const match = text.match(/^(\d+(?:\.\d+)?)\s+(Year|Years|Month|Months)\s+(.+)$/i);
  if (match) {
    return {
      number: parseFloat(match[1]),
      timeUnit: match[2],
      category: match[3].trim(),
    };
  }
  
  // Fallback: try to find number and extract parts
  const numberMatch = text.match(/(\d+(?:\.\d+)?)/);
  if (numberMatch) {
    const number = parseFloat(numberMatch[1]);
    const parts = text.split(numberMatch[1]);
    const beforeNumber = parts[0]?.trim() || '';
    const afterNumber = parts[1]?.trim() || '';
    
    // Try to extract time unit and category
    const timeUnitMatch = afterNumber.match(/^(Year|Years|Month|Months)/i);
    if (timeUnitMatch) {
      const timeUnit = timeUnitMatch[1];
      const category = afterNumber.substring(timeUnit.length).trim();
      return {
        number,
        timeUnit,
        category: category || 'Experience',
      };
    }
    
    // If no time unit found, assume the last word is category
    const words = afterNumber.split(/\s+/);
    const category = words[words.length - 1] || 'Experience';
    const timeUnit = words.slice(0, -1).join(' ') || 'Years';
    
    return {
      number,
      timeUnit,
      category,
    };
  }
  
  // Fallback: no number found
  return { number: 0, timeUnit: 'Years', category: text };
}

export default function About() {
  const { t } = useLanguage();
  
  // Intersection observer for the experience card
  const [experienceCardRef, , hasExperienceIntersected] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
  });

  // Parse experience text to extract numbers, time units, and categories
  const experienceYearsText = t('about.experienceYears');
  const experienceMonthsText = t('about.experienceMonths');
  
  const yearsData = parseExperienceText(experienceYearsText);
  const monthsData = parseExperienceText(experienceMonthsText);

  // Counter animations for experience numbers
  const yearsCounter = useCounterAnimation(yearsData.number, {
    duration: 2000,
    delay: 200,
    easing: 'easeOut',
    start: hasExperienceIntersected,
  });

  const monthsCounter = useCounterAnimation(monthsData.number, {
    duration: 2000,
    delay: 400,
    easing: 'easeOut',
    start: hasExperienceIntersected,
  });

  return (
    <section id="about" className={styles.about} aria-label="About section">
      <div className={styles.titleContainer}>
        <div className={styles.titleText}>
          <p className={styles.subtitle}>{t('about.subtitle')}</p>
          <h1 className={styles.title}>{t('about.title')}</h1>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.containers}>
          <div 
            ref={experienceCardRef as React.RefObject<HTMLDivElement>}
            className={styles.detailsCard}
          >
            <Image
              src="/assets/experience.png"
              alt=""
              className={styles.icon}
              width={32}
              height={32}
              aria-hidden="true"
            />
            <h3>{t('about.experience')}</h3>
            <p className={styles.counterText}>
              <span>{yearsData.category}</span>
              <span className={styles.counterSeparator}> - </span>
              <span className={styles.counterNumber} aria-label={`${yearsData.number} ${yearsData.timeUnit} ${yearsData.category}`}>
                {Math.round(yearsCounter.value)}
              </span>
              <span> {yearsData.timeUnit}</span>
            </p>
            <p className={styles.counterText}>
              <span>{monthsData.category}</span>
              <span className={styles.counterSeparator}> - </span>
              <span className={styles.counterNumber} aria-label={`${monthsData.number} ${monthsData.timeUnit} ${monthsData.category}`}>
                {Math.round(monthsCounter.value)}
              </span>
              <span> {monthsData.timeUnit}</span>
            </p>
          </div>
          <div className={styles.detailsCard}>
            <Image
              src="/assets/education.png"
              alt=""
              className={styles.icon}
              width={32}
              height={32}
              aria-hidden="true"
            />
            <h3>{t('about.education')}</h3>
            <p>
              <a
                href="https://start.digitalcareerinstitute.org/web-developer-weiterbildung/?utm_feeditemid=&utm_device=c&utm_campaign_id=23197762765&utm_adgroup_id=190164558840&utm_ad_id=781039568826&utm_asset_set_id=190164558840&utm_asset_id=781039568826&utm_term=dci%20web%20development&utm_source=google&utm_medium=ppc&utm_campaign=DE_SEM_Generic_overall&utm_content=190164558840&hsa_cam=23197762765&hsa_mt=p&hsa_src=g&hsa_acc=9628643656&hsa_net=adwords&hsa_kw=dci%20web%20development&hsa_tgt=kwd-1027333770361&hsa_ver=3&hsa_grp=190164558840&hsa_ad=781039568826&gad_source=1&gad_campaignid=23197762765&gbraid=0AAAAAC_FL9G14YQARMG2h8iF7jTnyug0E&gclid=CjwKCAiA55rJBhByEiwAFkY1QC-TDKIiANMVNKhvTQa1x1OXbHk8mSrMpjli4Y2NlxEHloOqbRD3OxoCljkQAvD_BwE"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit DCI Bootcamp website"
              >
                {t('about.education1')}
              </a>
              <br />
              {t('about.education2')}
            </p>
          </div>
        </div>
        <div className={styles.textContainer}>
          <div className={styles.textContent}>
            <p>{t('about.description1')}</p>
            <p>{t('about.description2')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
