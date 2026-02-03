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
              priority
            />
          </div>

          <div className={styles.contentSection}>
            <h2 id="modal-title" className={styles.modalTitle}>
              {t(project.titleKey)}
            </h2>

            <p className={styles.modalDescription}>
              {t(project.descriptionKey)}
            </p>

            {project.technologies && project.technologies.length > 0 && (
              <div className={styles.techSection}>
                <h3 className={styles.techSectionTitle}>Technologies</h3>
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
              </div>
            )}

            <div className={styles.linksSection}>
              <button
                className={styles.linkButton}
                onClick={() => openLink(project.github)}
                aria-label={`View ${t(project.titleKey)} project on GitHub`}
              >
                <FaGithub aria-hidden="true" />
                <span>{t('projects.github')}</span>
              </button>
              <button
                className={styles.linkButton}
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
