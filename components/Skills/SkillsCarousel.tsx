'use client';

import React, { useRef, useEffect } from 'react';
import { useCarousel } from '@/hooks/useCarousel';
import styles from './Skills.module.css';

interface SkillsCarouselProps {
  children: React.ReactNode;
  dots?: number[];
}

export default function SkillsCarousel({ children, dots }: SkillsCarouselProps) {
  // React.Children.toArray handles both single child and multiple children
  const items = React.Children.toArray(children);
  const {
    containerRef,
    currentIndex,
    scrollToIndex,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  } = useCarousel(items, { duration: 600, snapDuration: 300 });

  useEffect(() => {
    const handleMouseMoveGlobal = (e: Event) => {
      handleMouseMove(e as MouseEvent);
    };
    const handleMouseUpGlobal = () => handleMouseUp();

    if (containerRef.current) {
      document.addEventListener('mousemove', handleMouseMoveGlobal);
      document.addEventListener('mouseup', handleMouseUpGlobal);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [handleMouseMove, handleMouseUp]);

  const getDotLabel = (index: number): string => {
    if (index === 0) return 'Frontend';
    if (index === 1) return 'Backend';
    return 'Tools';
  };

  return (
    <>
      <div className={styles.carouselWrapper}>
        <div
          ref={containerRef}
          className={styles.carouselContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.containers}>
            {items.map((item, index) => (
              <div key={index} className={`${styles.detailsCard} carousel-item`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      {dots && dots.length > 0 && (
        <div className={styles.dots} aria-label="Skills carousel navigation">
          {dots.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Show ${getDotLabel(index)} Development`}
              data-index={index}
            />
          ))}
        </div>
      )}
    </>
  );
}
