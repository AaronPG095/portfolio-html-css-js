'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/hooks/useLanguage';
import SkillsCarousel from './SkillsCarousel';
import SkillProgress from './SkillProgress';
import SkillIcon from './SkillIcon';
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
  SiDotnet,
} from 'react-icons/si';
import { FaCode, FaProjectDiagram } from 'react-icons/fa';

const frontendSkills: Skill[] = [
  { name: 'HTML', level: 'experienced' },
  { name: 'CSS', level: 'experienced' },
  { name: 'JavaScript', level: 'experienced' },
  { name: 'SASS', level: 'intermediate' },
  { name: 'React.js', level: 'intermediate' },
  { name: 'Tailwind', level: 'basic' },
  { name: 'Framer', level: 'basic' },
  { name: 'TypeScript', level: 'basic' },
  { name: 'Next.js', level: 'basic' },
];

const backendSkills: Skill[] = [
  { name: 'MongoDB', level: 'intermediate' },
  { name: 'Node.js', level: 'intermediate' },
  { name: 'Express.js', level: 'intermediate' },
  { name: 'PHP', level: 'basic' },
  { name: 'Laravel', level: 'basic' },
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
  { name: 'Git', level: 'intermediate' },
  { name: 'Visual Studio', level: 'basic' },
  { name: 'WinUI 3', level: 'basic' },
  { name: '.NET 8', level: 'basic' },
];

// Icon mapping for skills - react-icons components
const skillIconMap: Record<string, IconType> = {
  // Frontend
  'HTML': SiHtml5,
  'CSS': SiCss3,
  'JavaScript': SiJavascript,
  'SASS': SiSass,
  'React.js': SiReact,
  'Tailwind': SiTailwindcss,
  'Framer': SiFramer,
  'TypeScript': SiTypescript,
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
  'MCP': FaCode,
  'Prompt Engineering': FaCode,
  'SPRINT': FaProjectDiagram,
  'Project Management': FaProjectDiagram,
  '.NET 8': SiDotnet,
};

// Custom inline SVG icon keys for skills without react-icons
const skillCustomIconMap: Record<string, string> = {
  'Cursor': 'cursor',
  'Visual Studio': 'microsoft',
  'WinUI 3': 'microsoft',
};

// Dark mode colors for custom SVG icons
const skillDarkColorMap: Record<string, string> = {
  'Cursor': '#FFFFFF',
};

// Color mapping for skill icons
const skillColorMap: Record<string, string> = {
  // Frontend
  'HTML': '#E34F26',
  'CSS': '#1572B6',
  'Javascript': '#F7DF1E',
  'JavaScript': '#F7DF1E',
  'SASS': '#CC6699',
  'React.js': '#61DAFB',
  'Tailwind': '#38BDF8',
  'Framer': '#E11D48',
  'Typescript': '#3178C6',
  'TypeScript': '#3178C6',
  'Next.js': '#000000',
  'PHP': '#777BB4',
  'Laravel': '#FF2D20',
  // Backend
  'MongoDB': '#47A248',
  'Node.js': '#339933',
  'Express.js': '#000000',
  'Git': '#F05032',
  'MySQL': '#00758F',
  'APIs': '#6366F1',
  // Tools / Other
  'Docker': '#0DB7ED',
  'Cursor': '#000000',
  'MCP': '#22C55E',
  'Prompt Engineering': '#A855F7',
  'SPRINT': '#EC4899',
  'Project Management': '#F97316',
  'Visual Studio': '#5C2D91',
  'WinUI 3': '#0078D4',
  '.NET 8': '#512BD4',
};

// Helper to get icon component for a skill (or undefined if using custom SVG)
function getSkillIconComponent(skillName: string): IconType | undefined {
  if (skillName in skillIconMap) return skillIconMap[skillName];
  if (skillName in skillCustomIconMap) return undefined;
  return FaCode;
}

// Helper to get custom icon key for a skill
function getSkillCustomIcon(skillName: string): string | undefined {
  return skillCustomIconMap[skillName];
}

// Helper function to get color for a skill icon
function getSkillColor(skillName: string): string {
  return skillColorMap[skillName] || 'var(--color-accent, #6366f1)';
}

// Helper function to get dark mode color for CDN icons
function getSkillDarkColor(skillName: string): string | undefined {
  return skillDarkColorMap[skillName];
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

  const handleShowTooltip = (index: number, tooltipText: string) => {
    if (!tooltipText || !onTooltipShow) return;
    const element = articleRefs.current.get(index);
    if (element) {
      const rect = element.getBoundingClientRect();
      // Position the tooltip above the skill, slightly offset so it doesn't cover the label.
      // For the left column, shift it 50% to the right within the card; otherwise, center it.
      const isLeftColumn = index % 2 === 0;
      const tooltipX = isLeftColumn ? rect.left + rect.width * 0.5 : rect.left + rect.width / 2;
      const tooltipY = rect.top - 16; // offset upwards so it clears the h3 text
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
          const iconComponent = getSkillIconComponent(skill.name);
          const customIcon = getSkillCustomIcon(skill.name);
          const fallbackComponent = !iconComponent && !customIcon ? FaCode : undefined;
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
              tabIndex={0}
              onMouseEnter={() => handleShowTooltip(index, tooltipText)}
              onMouseLeave={handleMouseLeave}
              onFocus={() => handleShowTooltip(index, tooltipText)}
              onBlur={handleMouseLeave}
            >
              <SkillIcon
                skillName={skill.name}
                iconComponent={iconComponent ?? fallbackComponent}
                customIcon={customIcon}
                color={getSkillColor(skill.name)}
                darkColor={getSkillDarkColor(skill.name)}
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
        top: `${hoveredTooltip.y}px`,
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
