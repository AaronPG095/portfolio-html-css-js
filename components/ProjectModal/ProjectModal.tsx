'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
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
import { FaCode, FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './ProjectModal.module.css';
import projectStyles from '../Projects/Projects.module.css';

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

// Color mapping for technologies (kept in sync with Projects.tsx)
const techColorMap: Record<string, string> = {
  HTML: '#E34F26',
  CSS: '#1572B6',
  JavaScript: '#F7DF1E',
  Javascript: '#F7DF1E',
  SCSS: '#CC6699',
  SASS: '#CC6699',
  'React.js': '#61DAFB',
  React: '#61DAFB',
  Tailwind: '#38BDF8',
  TypeScript: '#3178C6',
  Typescript: '#3178C6',
  'Next.js': '#000000',
  NextJS: '#000000',
  'Node.js': '#339933',
  NodeJS: '#339933',
  'Express.js': '#000000',
  ExpressJS: '#000000',
  MongoDB: '#47A248',
  PostgreSQL: '#336791',
  Postgres: '#336791',
};

// Helper functions to get icon and color for a technology
function getTechIcon(techName: string): IconType {
  return techIconMap[techName] || FaCode;
}

function getTechColor(techName: string): string {
  return techColorMap[techName] || 'var(--color-accent, #6366f1)';
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside modal to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen || !project) {
    return null;
  }

  const openLink = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={handleOverlayClick}
      aria-modal="true"
      aria-labelledby="modal-title"
      role="dialog"
    >
      <div ref={modalRef} className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes aria-hidden="true" />
        </button>

        <div className={styles.modalContent}>
          <div className={styles.imageSection}>
            <Image
              src={project.image}
              alt={`${t(project.titleKey)} project screenshot`}
              className={styles.modalImage}
              width={800}
              height={600}
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
              priority
            />
          </div>

          <div className={styles.contentSection}>
            <h2 id="modal-title" className={styles.modalTitle}>
              {t(project.titleKey)}
            </h2>

            {project.technologies && project.technologies.length > 0 && (
              <div className={styles.techSection}>
                <h3 className={styles.techSectionTitle}>Technologies</h3>
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
              </div>
            )}

            <div className={styles.linksSection}>
              <button
                className={`${projectStyles.btn} ${projectStyles.projectBtn} ${styles.linkButton}`}
                onClick={() => openLink(project.github)}
                aria-label={`View ${t(project.titleKey)} project on GitHub`}
              >
                <FaGithub aria-hidden="true" />
                <span>{t('projects.github')}</span>
              </button>
              <button
                className={`${projectStyles.btn} ${projectStyles.projectBtn} ${styles.linkButton}`}
                onClick={() => openLink(project.liveDemo)}
                aria-label={`View ${t(project.titleKey)} project live demo`}
              >
                <FaExternalLinkAlt aria-hidden="true" />
                <span>{t('projects.liveDemo')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
