'use client';

import { useState } from 'react';
import OptimizedImage from '@/components/ui/OptimizedImage';
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

// Color mapping for technologies
const techColorMap: Record<string, string> = {
  'HTML': '#E34F26',
  'CSS': '#1572B6',
  'JavaScript': '#F7DF1E',
  'Javascript': '#F7DF1E',
  'SCSS': '#CC6699',
  'SASS': '#CC6699',
  'React.js': '#61DAFB',
  'React': '#61DAFB',
  'Tailwind': '#38BDF8',
  'TypeScript': '#3178C6',
  'Typescript': '#3178C6',
  'Next.js': '#000000',
  'NextJS': '#000000',
  'Node.js': '#339933',
  'NodeJS': '#339933',
  'Express.js': '#000000',
  'ExpressJS': '#000000',
  'MongoDB': '#47A248',
  'PostgreSQL': '#336791',
  'Postgres': '#336791',
};

// Helper function to get icon for a technology
function getTechIcon(techName: string): IconType {
  return techIconMap[techName] || FaCode;
}

// Helper function to get color for a technology icon
function getTechColor(techName: string): string {
  return techColorMap[techName] || 'var(--color-accent, #6366f1)';
}

const projects: Project[] = [
  {
    id: 5,
    image: '/assets/Screenshot 2025-11-12 203334.png',
    titleKey: 'projects.project5.title',
    descriptionKey: 'projects.project5.description',
    github: 'https://github.com/AaronPG095/kollektiv-spinnen-timetable',
    liveDemo: 'https://kollektiv-spinnen-festival.vercel.app/',
    technologies: ['HTML', 'TypeScript', 'JavaScript', 'Next.js', 'React.js', 'PostgreSQL'],
  },
  {
    id: 1,
    image: '/assets/Screenshot 2024-05-08 140820.png',
    titleKey: 'projects.project1.title',
    descriptionKey: 'projects.project1.description',
    github: 'https://github.com/AaronPG095/portfolio-html-css-js',
    liveDemo: 'https://aaronpaulgreyling.netlify.app/',
    technologies: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Next.js'],
  },
  {
    id: 4,
    image: '/assets/Screenshot 2024-05-23 211320.png',
    titleKey: 'projects.project4.title',
    descriptionKey: 'projects.project4.description',
    github: 'https://github.com/AaronPG095/brainwave',
    liveDemo: 'https://braynewave.netlify.app/',
    technologies: ['HTML', 'Tailwind', 'JavaScript', 'React.js'],
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
    technologies: ['HTML', 'SCSS', 'JavaScript', 'React.js'],
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
        <OptimizedImage
          src={project.image}
          alt={`${t(project.titleKey)} project screenshot`}
          className={styles.projectImg}
          width={500}
          height={400}
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
        />
      </div>
      <h2 className={styles.projectTitle}>{t(project.titleKey)}</h2>
      {project.technologies && project.technologies.length > 0 && (
        <div className={styles.techTags}>
          {project.technologies.map((tech, index) => {
            const TechIcon = getTechIcon(tech);
            return (
              <span key={index} className={styles.techTag}>
                <TechIcon
                  className={styles.techIcon}
                  style={{ color: getTechColor(tech) }}
                  aria-hidden="true"
                />
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
