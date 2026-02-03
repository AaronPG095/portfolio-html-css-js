'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import SkillsCarousel from './SkillsCarousel';
import SkillProgress from './SkillProgress';
import styles from './Skills.module.css';
import type { Skill } from '@/types';

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

interface SkillCardProps {
  title: string;
  skills: Skill[];
}

function SkillCard({ title, skills }: SkillCardProps) {
  const { t } = useLanguage();
  
  return (
    <div className={styles.skillCard}>
      <h2 className={styles.subTitle}>{title}</h2>
      <div className={styles.articleContainer}>
        {skills.map((skill, index) => (
          <article key={index} className={styles.skillArticle}>
            <Image
              src="/assets/checkmark.png"
              alt=""
              className={styles.icon}
              width={24}
              height={24}
              aria-hidden="true"
            />
            <div className={styles.skillContent}>
              <h3>{skill.name}</h3>
              <SkillProgress level={skill.level} skillName={skill.name} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  const frontendCard = <SkillCard title={t('skills.frontend')} skills={frontendSkills} />;
  const backendCard = <SkillCard title={t('skills.backend')} skills={backendSkills} />;
  const toolsCard = <SkillCard title={t('skills.tools')} skills={toolsSkills} />;

  return (
    <section id="skills" className={styles.skills} aria-label="Skills section">
      <p className={styles.subtitle}>{t('skills.subtitle')}</p>
      <h1 className={styles.title}>{t('skills.title')}</h1>
      <div className={styles.detailsContainer}>
        <div className={styles.desktopView}>
          <SkillCard title={t('skills.frontend')} skills={frontendSkills} />
          <SkillCard title={t('skills.backend')} skills={backendSkills} />
          <SkillCard title={t('skills.tools')} skills={toolsSkills} />
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
  );
}
