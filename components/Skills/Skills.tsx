'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/hooks/useLanguage';
import SkillsCarousel from './SkillsCarousel';
import SkillProgress from './SkillProgress';
import styles from './Skills.module.css';
import type { Skill } from '@/types';
import { IconType } from 'react-icons';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiSass,
  SiReact,
  SiTailwindcss,
  SiFramer,
  SiTypescript,
  SiNextdotjs,
  SiPhp,
  SiLaravel,
  SiMongodb,
  SiNodedotjs,
  SiExpress,
  SiGit,
  SiMysql,
  SiDocker,
} from 'react-icons/si';
import { FaCode, FaProjectDiagram } from 'react-icons/fa';

const frontendSkills: Skill[] = [
  { name: 'HTML', level: 'experienced' },
  { name: 'CSS', level: 'experienced' },
  { name: 'Javascript', level: 'experienced' },
  { name: 'SASS', level: 'intermediate' },
  { name: 'React.js', level: 'intermediate' },
  { name: 'Tailwind', level: 'basic' },
  { name: 'Framer', level: 'basic' },
  { name: 'Typescript', level: 'basic' },
  { name: 'Next.js', level: 'basic' },
  { name: 'PHP', level: 'basic' },
  { name: 'Laravel', level: 'basic' },
];

const backendSkills: Skill[] = [
  { name: 'MongoDB', level: 'intermediate' },
  { name: 'Node.js', level: 'intermediate' },
  { name: 'Express.js', level: 'intermediate' },
  { name: 'Git', level: 'intermediate' },
  { name: 'MySQL', level: 'basic' },
  { name: 'APIs', level: 'basic' },
];

const toolsSkills: Skill[] = [
  { name: 'Cursor', level: 'experienced' },
  { name: 'MCP', level: 'basic' },
  { name: 'Prompt Engineering', level: 'intermediate' },
  { name: 'SPRINT', level: 'experienced' },
  { name: 'Project Management', level: 'intermediate' },
  { name: 'Docker', level: 'intermediate' },
];

// Icon mapping for skills
const skillIconMap: Record<string, IconType> = {
  // Frontend
  'HTML': SiHtml5,
  'CSS': SiCss3,
  'Javascript': SiJavascript,
  'SASS': SiSass,
  'React.js': SiReact,
  'Tailwind': SiTailwindcss,
  'Framer': SiFramer,
  'Typescript': SiTypescript,
  'Next.js': SiNextdotjs,
  'PHP': SiPhp,
  'Laravel': SiLaravel,
  // Backend
  'MongoDB': SiMongodb,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'Git': SiGit,
  'MySQL': SiMysql,
  'APIs': FaCode,
  // Tools
  'Docker': SiDocker,
  'Cursor': FaCode,
  'MCP': FaCode,
  'Prompt Engineering': FaCode,
  'SPRINT': FaProjectDiagram,
  'Project Management': FaProjectDiagram,
};

// Helper function to get icon for a skill
function getSkillIcon(skillName: string): IconType {
  return skillIconMap[skillName] || FaCode;
}

interface SkillCardProps {
  title: string;
  skills: Skill[];
  onTooltipShow?: (text: string, x: number, y: number) => void;
  onTooltipHide?: () => void;
}

function SkillCard({ title, skills, onTooltipShow, onTooltipHide }: SkillCardProps) {
  const { t, translations, language } = useLanguage();
  const articleRefs = useRef<Map<number, HTMLElement>>(new Map());
  
  const handleMouseEnter = (index: number, tooltipText: string, event: React.MouseEvent<HTMLElement>) => {
    if (!tooltipText || !onTooltipShow) return;
    const element = articleRefs.current.get(index);
    if (element) {
      const rect = element.getBoundingClientRect();
      // For left column (even index 0, 2, 4...), align to left; for right column (odd index), center
      const isLeftColumn = index % 2 === 0;
      const tooltipX = isLeftColumn ? rect.left : rect.left + rect.width / 2;
      const tooltipY = rect.top;
      onTooltipShow(tooltipText, tooltipX, tooltipY);
    }
  };
  
  const handleMouseLeave = () => {
    if (onTooltipHide) onTooltipHide();
  };
  
  return (
    <div className={styles.skillCard}>
      <h2 className={styles.subTitle}>{title}</h2>
      <div className={styles.articleContainer}>
        {skills.map((skill, index) => {
          const IconComponent = getSkillIcon(skill.name);
          // Access descriptions directly to handle keys with dots (e.g., "React.js")
          const currentLangTranslations = translations?.[language];
          const descriptions = (currentLangTranslations as any)?.skills?.descriptions;
          const tooltipText = descriptions && typeof descriptions === 'object' && skill.name in descriptions
            ? (descriptions as Record<string, string>)[skill.name]
            : '';
          return (
            <article 
              key={index} 
              ref={(el) => {
                if (el) articleRefs.current.set(index, el);
                else articleRefs.current.delete(index);
              }}
              className={styles.skillArticle}
              onMouseEnter={(e) => handleMouseEnter(index, tooltipText, e)}
              onMouseLeave={handleMouseLeave}
            >
              <IconComponent
                className={styles.icon}
                aria-hidden="true"
              />
              <div className={styles.skillContent}>
                <h3>{skill.name}</h3>
                <SkillProgress level={skill.level} skillName={skill.name} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();
  const [hoveredTooltip, setHoveredTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTooltipShow = (text: string, x: number, y: number) => {
    setHoveredTooltip({ text, x, y });
  };

  const handleTooltipHide = () => {
    setHoveredTooltip(null);
  };

  const frontendCard = <SkillCard title={t('skills.frontend')} skills={frontendSkills} onTooltipShow={handleTooltipShow} onTooltipHide={handleTooltipHide} />;
  const backendCard = <SkillCard title={t('skills.backend')} skills={backendSkills} onTooltipShow={handleTooltipShow} onTooltipHide={handleTooltipHide} />;
  const toolsCard = <SkillCard title={t('skills.tools')} skills={toolsSkills} onTooltipShow={handleTooltipShow} onTooltipHide={handleTooltipHide} />;

  const tooltipElement = hoveredTooltip && mounted ? (
    <div
      className={styles.fixedTooltip}
      style={{
        left: `${hoveredTooltip.x}px`,
        top: `${hoveredTooltip.y - 8}px`,
        transform: hoveredTooltip.x < 300 ? 'translate(0, -100%)' : 'translate(-50%, -100%)',
      }}
    >
      {hoveredTooltip.text}
      <div 
        className={styles.fixedTooltipArrow}
        style={{
          left: hoveredTooltip.x < 300 ? '1rem' : '50%',
          transform: hoveredTooltip.x < 300 ? 'translateX(0)' : 'translateX(-50%)',
        }}
      />
    </div>
  ) : null;

  return (
    <>
      <section id="skills" className={styles.skills} aria-label="Skills section">
        <p className={styles.subtitle}>{t('skills.subtitle')}</p>
        <h1 className={styles.title}>{t('skills.title')}</h1>
        <div className={styles.detailsContainer}>
          <div className={styles.desktopView}>
            <SkillCard title={t('skills.frontend')} skills={frontendSkills} onTooltipShow={handleTooltipShow} onTooltipHide={handleTooltipHide} />
            <SkillCard title={t('skills.backend')} skills={backendSkills} onTooltipShow={handleTooltipShow} onTooltipHide={handleTooltipHide} />
            <SkillCard title={t('skills.tools')} skills={toolsSkills} onTooltipShow={handleTooltipShow} onTooltipHide={handleTooltipHide} />
          </div>
          <div className={styles.mobileView}>
            <SkillsCarousel dots={[0, 1, 2]}>
              {frontendCard}
              {backendCard}
              {toolsCard}
            </SkillsCarousel>
          </div>
        </div>
      </section>
      {mounted && tooltipElement && createPortal(tooltipElement, document.body)}
    </>
  );
}
