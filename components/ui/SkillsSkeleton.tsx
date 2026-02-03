'use client';

import Skeleton from './Skeleton';
import styles from './SkillsSkeleton.module.css';

export default function SkillsSkeleton() {
  return (
    <section className={styles.skillsSkeleton} aria-label="Loading skills section">
      <Skeleton width="200px" height="2rem" className={styles.subtitle} />
      <Skeleton width="150px" height="3rem" className={styles.title} />
      <div className={styles.cardsContainer}>
        {[1, 2, 3].map((index) => (
          <div key={index} className={styles.card}>
            <Skeleton width="120px" height="1.75rem" className={styles.cardTitle} />
            <div className={styles.skillsGrid}>
              {[1, 2, 3, 4, 5, 6].map((skillIndex) => (
                <div key={skillIndex} className={styles.skillItem}>
                  <Skeleton width="1.25rem" height="1.25rem" variant="circular" />
                  <div className={styles.skillContent}>
                    <Skeleton width="60px" height="0.93rem" />
                    <Skeleton width="74px" height="7px" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
