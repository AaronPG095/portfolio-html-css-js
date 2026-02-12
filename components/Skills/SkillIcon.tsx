'use client';

import { IconType } from 'react-icons';
import styles from './Skills.module.css';

/**
 * Custom inline SVG icons for brands not available in react-icons.
 * Each returns an <svg> element styled to match react-icons output.
 */

// Cursor IDE icon (from Simple Icons, slug: cursor, CC0 license)
function CursorIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
    </svg>
  );
}

// Microsoft four-square logo (well-known public shape)
function MicrosoftIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022" />
      <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00" />
      <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
      <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
    </svg>
  );
}

interface SkillIconProps {
  skillName: string;
  /** React-icons component for skills that have one */
  iconComponent?: IconType;
  /** Key into custom SVG icon map */
  customIcon?: string;
  color: string;
  /** Color used in dark mode for custom SVGs */
  darkColor?: string;
}

// Map of custom icon keys to their components
const customIconMap: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  'cursor': CursorIcon,
  'microsoft': MicrosoftIcon,
};

export default function SkillIcon({
  skillName,
  iconComponent: IconComponent,
  customIcon,
  color,
  darkColor,
}: SkillIconProps) {
  // React-icons component (most skills)
  if (IconComponent) {
    return (
      <IconComponent
        className={styles.icon}
        style={{ color }}
        aria-hidden="true"
      />
    );
  }

  // Custom inline SVG icon
  if (customIcon && customIcon in customIconMap) {
    const CustomSvg = customIconMap[customIcon];
    // Microsoft uses multi-color, no need for color prop
    if (customIcon === 'microsoft') {
      return <CustomSvg className={styles.icon} />;
    }
    // For single-color custom icons (e.g. Cursor), use theme-aware color
    return (
      <>
        <CustomSvg className={`${styles.icon} ${styles.iconLight}`} style={{ color }} />
        <CustomSvg className={`${styles.icon} ${styles.iconDark}`} style={{ color: darkColor || color }} />
      </>
    );
  }

  return null;
}
