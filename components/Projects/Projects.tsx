'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import ProjectsCarousel from './ProjectsCarousel';
import ProjectModal from '../ProjectModal/ProjectModal';
import styles from './Projects.module.css';
import type { Project } from '@/types';
import { IconType } from 'react-icons';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiSass,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
} from 'react-icons/si';
import { FaCode } from 'react-icons/fa';

// Icon mapping for technologies
const techIconMap: Record<string, IconType> = {
  'HTML': SiHtml5,
  'CSS': SiCss3,
  'JavaScript': SiJavascript,
  'Javascript': SiJavascript,
  'SCSS': SiSass,
  'SASS': SiSass,
  'React.js': SiReact,
  'React': SiReact,
  'Tailwind': SiTailwindcss,
  'TypeScript': SiTypescript,
  'Typescript': SiTypescript,
  'Next.js': SiNextdotjs,
  'NextJS': SiNextdotjs,
  'Node.js': SiNodedotjs,
  'NodeJS': SiNodedotjs,
  'Express.js': SiExpress,
  'ExpressJS': SiExpress,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'Postgres': SiPostgresql,
};

// Helper function to get icon for a technology
function getTechIcon(techName: string): IconType {
  return techIconMap[techName] || FaCode;
}

const projects: Project[] = [
  {
    id: 1,
    image: '/assets/Screenshot 2024-05-08 140820.png',
    titleKey: 'projects.project1.title',
    descriptionKey: 'projects.project1.description',
    github: 'https://github.com/AaronPG095/portfolio-html-css-js',
    liveDemo: 'https://github.com/AaronPG095/portfolio-html-css-js',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Next.js'],
  },
  {
    id: 2,
    image: '/assets/project-2.png',
    titleKey: 'projects.project2.title',
    descriptionKey: 'projects.project2.description',
    github: 'https://github.com/AaronPG095/BohemianKidsFrontEnd',
    liveDemo: 'https://github.com/AaronPG095/BohemianKidsFrontEnd',
    technologies: ['SCSS', 'React.js', 'Node.js', 'MongoDB', 'Express.js'],
  },
  {
    id: 3,
    image: '/assets/Screenshot 2024-05-08 152922.png',
    titleKey: 'projects.project3.title',
    descriptionKey: 'projects.project3.description',
    github: 'https://github.com/AaronPG095/React-Ecommerce-Project?tab=readme-ov-file',
    liveDemo: 'https://sunnyeyles.github.io/React-Ecommerce-Project/',
    technologies: ['SCSS', 'React.js'],
  },
  {
    id: 4,
    image: '/assets/Screenshot 2024-05-23 211320.png',
    titleKey: 'projects.project4.title',
    descriptionKey: 'projects.project4.description',
    github: 'https://github.com/AaronPG095/brainwave',
    liveDemo: 'https://braynewave.netlify.app/',
    technologies: ['Tailwind', 'React.js'],
  },
  {
    id: 5,
    image: '/assets/Screenshot 2025-11-12 203334.png',
    titleKey: 'projects.project5.title',
    descriptionKey: 'projects.project5.description',
    github: 'https://github.com/AaronPG095/kollektiv-spinnen-timetable',
    liveDemo: 'https://kollektiv-spinnen-timetable.lovable.app/',
    technologies: ['TypeScript', 'Next.js', 'React.js', 'PostgreSQL'],
  },
];

export default function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProjectLink = (url: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Small delay to allow animation to complete before clearing project
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };

  const projectCards = projects.map((project) => (
    <div 
      key={project.id} 
      className={styles.projectCard}
      onClick={() => handleProjectClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleProjectClick(project);
        }
      }}
      aria-label={`View details for ${t(project.titleKey)} project`}
    >
      <div className={styles.articleContainer}>
        <Image
          src={project.image}
          alt={`${t(project.titleKey)} project screenshot`}
          className={styles.projectImg}
          width={500}
          height={400}
          loading="lazy"
        />
      </div>
      <h2 className={styles.projectTitle}>{t(project.titleKey)}</h2>
      {project.technologies && project.technologies.length > 0 && (
        <div className={styles.techTags}>
          {project.technologies.map((tech, index) => {
            const TechIcon = getTechIcon(tech);
            return (
              <span key={index} className={styles.techTag}>
                <TechIcon className={styles.techIcon} aria-hidden="true" />
                {tech}
              </span>
            );
          })}
        </div>
      )}
      <div className={styles.btnContainer}>
        <button
          className={`${styles.btn} ${styles.projectBtn}`}
          onClick={(e) => openProjectLink(project.github, e)}
          aria-label={`View ${t(project.titleKey)} project on GitHub`}
        >
          {t('projects.github')}
        </button>
        <button
          className={`${styles.btn} ${styles.projectBtn}`}
          onClick={(e) => openProjectLink(project.liveDemo, e)}
          aria-label={`View ${t(project.titleKey)} project live demo`}
        >
          {t('projects.liveDemo')}
        </button>
      </div>
    </div>
  ));

  return (
    <>
      <section id="projects" className={styles.projects} aria-label="Projects section">
        <p className={styles.subtitle}>{t('projects.subtitle')}</p>
        <h1 className={styles.title}>{t('projects.title')}</h1>
        <div className={styles.detailsContainer}>
          <ProjectsCarousel>{projectCards}</ProjectsCarousel>
        </div>
      </section>
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
