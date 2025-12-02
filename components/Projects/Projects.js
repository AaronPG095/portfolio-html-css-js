'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import ProjectsCarousel from './ProjectsCarousel';
import styles from './Projects.module.css';

const projects = [
  {
    id: 1,
    image: '/assets/Screenshot 2024-05-08 140820.png',
    titleKey: 'projects.project1.title',
    descriptionKey: 'projects.project1.description',
    github: 'https://github.com/AaronPG095/portfolio-html-css-js',
    liveDemo: 'https://github.com/AaronPG095/portfolio-html-css-js',
  },
  {
    id: 2,
    image: '/assets/project-2.png',
    titleKey: 'projects.project2.title',
    descriptionKey: 'projects.project2.description',
    github: 'https://github.com/AaronPG095/BohemianKidsFrontEnd',
    liveDemo: 'https://github.com/AaronPG095/BohemianKidsFrontEnd',
  },
  {
    id: 3,
    image: '/assets/Screenshot 2024-05-08 152922.png',
    titleKey: 'projects.project3.title',
    descriptionKey: 'projects.project3.description',
    github: 'https://github.com/AaronPG095/React-Ecommerce-Project?tab=readme-ov-file',
    liveDemo: 'https://sunnyeyles.github.io/React-Ecommerce-Project/',
  },
  {
    id: 4,
    image: '/assets/Screenshot 2024-05-23 211320.png',
    titleKey: 'projects.project4.title',
    descriptionKey: 'projects.project4.description',
    github: 'https://github.com/AaronPG095/brainwave',
    liveDemo: 'https://braynewave.netlify.app/',
  },
  {
    id: 5,
    image: '/assets/Screenshot 2025-11-12 203334.png',
    titleKey: 'projects.project5.title',
    descriptionKey: 'projects.project5.description',
    github: 'https://github.com/AaronPG095/kollektiv-spinnen-timetable',
    liveDemo: 'https://kollektiv-spinnen-timetable.lovable.app/',
  },
];

export default function Projects() {
  const { t } = useLanguage();

  const openProjectLink = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const projectCards = projects.map((project) => (
    <div key={project.id} className={styles.projectCard}>
      <div className={styles.articleContainer}>
        <Image
          src={project.image}
          alt={`${t(project.titleKey)} project screenshot`}
          className={styles.projectImg}
          width={400}
          height={200}
          loading="lazy"
        />
      </div>
      <h2 className={styles.projectTitle}>{t(project.titleKey)}</h2>
      <p className={styles.description}>{t(project.descriptionKey)}</p>
      <div className={styles.btnContainer}>
        <button
          className={`${styles.btn} ${styles.projectBtn}`}
          onClick={() => openProjectLink(project.github)}
          aria-label={`View ${t(project.titleKey)} project on GitHub`}
        >
          {t('projects.github')}
        </button>
        <button
          className={`${styles.btn} ${styles.projectBtn}`}
          onClick={() => openProjectLink(project.liveDemo)}
          aria-label={`View ${t(project.titleKey)} project live demo`}
        >
          {t('projects.liveDemo')}
        </button>
      </div>
    </div>
  ));

  return (
    <section id="projects" className={styles.projects} aria-label="Projects section">
      <p className={styles.subtitle}>{t('projects.subtitle')}</p>
      <h1 className={styles.title}>{t('projects.title')}</h1>
      <div className={styles.detailsContainer}>
        <ProjectsCarousel>{projectCards}</ProjectsCarousel>
      </div>
    </section>
  );
}

