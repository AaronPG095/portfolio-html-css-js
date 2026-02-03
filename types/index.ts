/**
 * TypeScript type definitions for the portfolio application
 */

// Language types
export type Language = 'en' | 'de';

// Theme types
export type Theme = 'light' | 'dark';

// Translation keys type (nested object structure)
export interface Translations {
  nav: {
    about: string;
    skills: string;
    projects: string;
    contact: string;
  };
  profile: {
    greeting: string;
    name: string;
    title: string;
    downloadCV: string;
    contactInfo: string;
  };
  about: {
    subtitle: string;
    title: string;
    experience: string;
    experienceYears: string;
    experienceMonths: string;
    education: string;
    education1: string;
    education2: string;
    description1: string;
    description2: string;
  };
  skills: {
    subtitle: string;
    title: string;
    frontend: string;
    backend: string;
    tools: string;
    levels: {
      experienced: string;
      intermediate: string;
      basic: string;
    };
  };
  projects: {
    subtitle: string;
    title: string;
    project1: {
      title: string;
      description: string;
    };
    project2: {
      title: string;
      description: string;
    };
    project3: {
      title: string;
      description: string;
    };
    project4: {
      title: string;
      description: string;
    };
    project5: {
      title: string;
      description: string;
    };
    github: string;
    liveDemo: string;
  };
  contact: {
    subtitle: string;
    title: string;
    linkedin: string;
  };
  footer: {
    copyright: string;
  };
  sidebar: {
    menu: string;
    language: string;
    theme: string;
  };
}

// Translations data structure
export interface TranslationsData {
  en: Translations;
  de: Translations;
}

// Skill level type
export type SkillLevel = 'experienced' | 'intermediate' | 'basic';

// Skill interface
export interface Skill {
  name: string;
  level: SkillLevel;
}

// Project interface
export interface Project {
  id: number;
  image: string;
  titleKey: string;
  descriptionKey: string;
  github: string;
  liveDemo: string;
}

// Carousel options
export interface CarouselOptions {
  duration?: number;
  snapDuration?: number;
  minSwipeDistance?: number;
}

// Carousel return type
export interface CarouselReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  currentIndex: number;
  scrollToIndex: (index: number, customDuration?: number) => void;
  scroll: (direction: 'left' | 'right') => void;
  snapToNearest: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent | MouseEvent) => void;
  handleMouseUp: () => void;
  handleMouseLeave: () => void;
  isAnimating: boolean;
  isDragging: boolean;
}
