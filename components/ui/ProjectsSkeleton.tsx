'use client';

import Skeleton from './Skeleton';
import styles from './ProjectsSkeleton.module.css';

export default function ProjectsSkeleton() {
  return (
    <section className={styles.projectsSkeleton} aria-label="Loading projects section">
      <Skeleton width="200px" height="1.5rem" className={styles.subtitle} />
      <Skeleton width="150px" height="3rem" className={styles.title} />
      <div className={styles.carouselContainer}>
        {[1, 2, 3].map((index) => (
          <div key={index} className={styles.card}>
            <Skeleton width="100%" height="200px" className={styles.image} />
            <Skeleton width="180px" height="1.75rem" className={styles.cardTitle} />
            <div className={styles.tagsContainer}>
              {[1, 2, 3, 4].map((tagIndex) => (
                <Skeleton key={tagIndex} width="80px" height="28px" className={styles.tag} />
              ))}
            </div>
            <div className={styles.buttonsContainer}>
              <Skeleton width="8rem" height="3rem" className={styles.button} />
              <Skeleton width="8rem" height="3rem" className={styles.button} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
