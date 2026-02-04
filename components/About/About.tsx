'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';
import TimelineSVG from './TimelineSVG';
import styles from './About.module.css';

/**
 * Calculates the number of years between a start date and today, rounded to the nearest whole number.
 */
function calculateYears(startDate: Date): number {
  const today = new Date();
  const diffTime = today.getTime() - startDate.getTime();
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25); // Account for leap years
  return Math.round(diffYears);
}

/**
 * Extracts time unit and category from text like "3 Years Frontend" or "1 Year Backend"
 * Returns data formatted as "Category - Number Time"
 */
function parseExperienceText(text: string): { 
  timeUnit: string; 
  category: string;
} {
  // Match pattern: "3 Years Frontend" or "1 Year Backend"
  // Format: number + time unit + category
  const match = text.match(/^\d+(?:\.\d+)?\s+(Year|Years|Month|Months)\s+(.+)$/i);
  if (match) {
    return {
      timeUnit: match[1],
      category: match[2].trim(),
    };
  }
  
  // Fallback: try to extract time unit and category
  const timeUnitMatch = text.match(/(Year|Years|Month|Months)/i);
  if (timeUnitMatch) {
    const timeUnit = timeUnitMatch[1];
    const parts = text.split(timeUnit);
    const category = parts[1]?.trim() || 'Experience';
    return {
      timeUnit,
      category,
    };
  }
  
  // Fallback: no time unit found
  return { timeUnit: 'Years', category: text };
}

/**
 * Timeline data structures for Git-flow-style career timeline
 */
interface TimelineNode {
  id: string;
  yearLabel?: string;
  title: string;
  description?: string;
  isFuture?: boolean;
  isTransition?: boolean; // Node that connects to another branch
  connectsToBranch?: string; // Branch ID this transition connects to
  isCurrentPosition?: boolean; // "You are here" marker
  position?: number; // Position along the branch (0-100 for percentage)
}

interface TimelineBranch {
  id: string;
  label: string;
  nodes: TimelineNode[];
  isPast?: boolean; // Whether this branch is in the past (dashed line)
}

/**
 * Creates translated timeline branches
 */
function createTranslatedBranches(t: (key: string) => string): TimelineBranch[] {
  return [
    {
      id: 'chef-work',
      label: t('about.timeline.branches.chefWork'),
      isPast: true,
      nodes: [
        {
          id: 'restaurant-zest',
          title: t('about.timeline.nodes.restaurantZest'),
          position: 20,
        },
        {
          id: 'bootcamp-start',
          title: `N1: ${t('about.timeline.nodes.bootcampStart')}`,
          description: t('about.timeline.nodes.bootcampStartDescription'),
          isTransition: true,
          connectsToBranch: 'software-education',
          position: 60,
        },
      ],
    },
    {
      id: 'software-education',
      label: t('about.timeline.branches.developerEducation'),
      nodes: [
        {
          id: 'dci-bootcamp',
          title: t('about.timeline.nodes.dciBootcamp'),
          description: t('about.timeline.nodes.dciBootcampDescription'),
          position: 15,
        },
        {
          id: 'graduation',
          title: `N2: ${t('about.timeline.nodes.graduation')}`,
          isTransition: true,
          connectsToBranch: 'software-experience',
          position: 40,
        },
        {
          id: 'online-courses',
          title: `N3: ${t('about.timeline.nodes.onlineCourses')}`,
          description: t('about.timeline.nodes.onlineCoursesDescription'),
          position: 55,
        },
        {
          id: 'current-position',
          title: t('about.timeline.nodes.currentPosition'),
          isCurrentPosition: true,
          position: 70,
        },
      ],
    },
    {
      id: 'software-experience',
      label: t('about.timeline.branches.developerExperience'),
      nodes: [
        {
          id: 'internship',
          title: t('about.timeline.nodes.internship'),
          description: t('about.timeline.nodes.internshipDescription'),
          position: 20,
        },
        {
          id: 'personal-projects',
          title: `N4: ${t('about.timeline.nodes.personalProjects')}`,
          description: t('about.timeline.nodes.personalProjectsDescription'),
          position: 50,
        },
      ],
    },
  ];
}

export default function About() {
  const { t } = useLanguage();
  const timelineBranches = createTranslatedBranches(t);
  
  // Intersection observers for both cards
  const [experienceCardRef, , hasExperienceIntersected] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
  });

  const [educationCardRef, , hasEducationIntersected] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
  });

  // Parse experience text to extract time units and categories
  const experienceYearsText = t('about.experienceYears');
  const experienceMonthsText = t('about.experienceMonths');
  
  const yearsData = parseExperienceText(experienceYearsText);
  const monthsData = parseExperienceText(experienceMonthsText);

  // Calculate years dynamically from start dates
  // Using Date(year, monthIndex, day) to avoid timezone issues
  // monthIndex: 0 = January, so 0 = January 1st
  const frontendStartDate = new Date(2023, 0, 1); // January 1, 2023
  const backendStartDate = new Date(2025, 0, 1); // January 1, 2025
  
  const frontendYears = calculateYears(frontendStartDate);
  const backendYears = calculateYears(backendStartDate);

  // Counter animations for experience numbers
  const frontendCounter = useCounterAnimation(frontendYears, {
    duration: 2000,
    delay: 200,
    easing: 'easeOut',
    start: hasExperienceIntersected,
  });

  const backendCounter = useCounterAnimation(backendYears, {
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
              className={`${styles.icon} ${hasExperienceIntersected ? styles.iconAnimated : styles.iconInitial} ${styles.iconDelay1}`}
              width={32}
              height={32}
              quality={90}
              sizes="32px"
              aria-hidden="true"
            />
            <h3>{t('about.experience')}</h3>
            <p className={styles.counterText}>
              <span>{yearsData.category} </span>
              <span className={styles.counterNumber} aria-label={`${frontendYears} ${yearsData.timeUnit} ${yearsData.category}`}>
                {Math.round(frontendCounter.value)}
              </span>
              <span> {yearsData.timeUnit}</span>
            </p>
            <p className={styles.counterText}>
              <span>{monthsData.category} </span>
              <span className={styles.counterNumber} aria-label={`${backendYears} ${monthsData.timeUnit} ${monthsData.category}`}>
                {Math.round(backendCounter.value)}
              </span>
              <span> {monthsData.timeUnit}</span>
            </p>
          </div>
          <div 
            ref={educationCardRef as React.RefObject<HTMLDivElement>}
            className={styles.detailsCard}
          >
            <Image
              src="/assets/education.png"
              alt=""
              className={`${styles.icon} ${hasEducationIntersected ? styles.iconAnimated : styles.iconInitial} ${styles.iconDelay2}`}
              width={32}
              height={32}
              quality={90}
              sizes="32px"
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
      <div className={styles.timelineSection} role="list" aria-label={t('about.timeline.heading')}>
        <h2 className={styles.timelineHeading}>{t('about.timeline.heading')}</h2>
        <p className={styles.timelineSubtitle}>{t('about.timeline.subtitle')}</p>
        <div className={styles.timelineWrapper}>
          <TimelineSVG branches={timelineBranches} />
        </div>
      </div>
    </section>
  );
}
