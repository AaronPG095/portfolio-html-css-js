'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { CarouselOptions, CarouselReturn } from '@/types';

export function useCarousel(
  items: React.ReactNode[],
  options: CarouselOptions = {}
): CarouselReturn {
  const {
    duration = 600,
    snapDuration = 300,
    minSwipeDistance = 50,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  const getCurrentIndex = useCallback(() => {
    if (!containerRef.current || items.length === 0) return 0;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    
    let currentIdx = 0;
    let minDistance = Infinity;
    
    const children = Array.from(containerRef.current.querySelectorAll('.carousel-item'));
    children.forEach((child, index) => {
      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const distance = Math.abs(childCenter - containerCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        currentIdx = index;
      }
    });
    
    return currentIdx;
  }, [items]);

  const scrollToIndex = useCallback((targetIndex: number, customDuration: number = duration) => {
    if (!containerRef.current || isAnimating || targetIndex < 0 || targetIndex >= items.length) return;
    
    const children = Array.from(containerRef.current.querySelectorAll('.carousel-item'));
    const targetItem = children[targetIndex] as HTMLElement;
    if (!targetItem) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const itemRect = targetItem.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const itemCenter = itemRect.left + itemRect.width / 2;
    const delta = itemCenter - containerCenter;
    
    const scrollWidth = containerRef.current.scrollWidth;
    const clientWidth = containerRef.current.clientWidth;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);
    
    let targetScroll = containerRef.current.scrollLeft + delta;
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
    
    const startScroll = containerRef.current.scrollLeft;
    const distance = targetScroll - startScroll;
    const startTime = performance.now();
    
    setIsAnimating(true);
    const originalScrollBehavior = containerRef.current.style.scrollBehavior;
    containerRef.current.style.scrollBehavior = 'auto';
    
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / customDuration, 1);
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      const newScroll = startScroll + (distance * ease);
      const clampedScroll = Math.max(0, Math.min(newScroll, maxScroll));
      if (containerRef.current) {
        containerRef.current.scrollLeft = clampedScroll;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        if (containerRef.current) {
          containerRef.current.scrollLeft = targetScroll;
          containerRef.current.style.scrollBehavior = originalScrollBehavior;
        }
        setIsAnimating(false);
        setCurrentIndex(targetIndex);
      }
    };
    
    requestAnimationFrame(animateScroll);
  }, [items, duration, isAnimating]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const currentIdx = getCurrentIndex();
    let targetIdx = direction === 'left' ? currentIdx - 1 : currentIdx + 1;
    targetIdx = Math.max(0, Math.min(items.length - 1, targetIdx));
    
    if (targetIdx !== currentIdx) {
      scrollToIndex(targetIdx);
    }
  }, [items, getCurrentIndex, scrollToIndex]);

  const snapToNearest = useCallback(() => {
    if (!containerRef.current || isAnimating) return;
    const nearestIdx = getCurrentIndex();
    scrollToIndex(nearestIdx, snapDuration);
  }, [getCurrentIndex, scrollToIndex, snapDuration, isAnimating]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchEndX.current === null) {
      snapToNearest();
      touchStartX.current = null;
      touchEndX.current = null;
      return;
    }
    
    const distance = touchStartX.current - touchEndX.current;
    
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        scroll('right');
      } else {
        scroll('left');
      }
    } else {
      snapToNearest();
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  }, [scroll, snapToNearest, minSwipeDistance]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) return;
    
    setIsDragging(true);
    dragStartX.current = e.clientX;
    scrollStartX.current = containerRef.current?.scrollLeft || 0;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
      containerRef.current.style.userSelect = 'none';
    }
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const clientX = e.clientX;
    const deltaX = clientX - dragStartX.current;
    containerRef.current.scrollLeft = scrollStartX.current - (deltaX * 1.5);
    if (e instanceof MouseEvent || 'preventDefault' in e) {
      e.preventDefault();
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.userSelect = '';
    }
    snapToNearest();
  }, [isDragging, snapToNearest]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
        containerRef.current.style.userSelect = '';
      }
    }
  }, [isDragging]);

  // Update current index on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const updateIndex = () => {
      if (!isAnimating && !isDragging) {
        const idx = getCurrentIndex();
        setCurrentIndex(idx);
      }
    };
    
    container.addEventListener('scroll', updateIndex);
    return () => container.removeEventListener('scroll', updateIndex);
  }, [getCurrentIndex, isAnimating, isDragging]);

  // Set initial cursor
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  }, []);

  return {
    containerRef,
    currentIndex,
    scrollToIndex,
    scroll,
    snapToNearest,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    isAnimating,
    isDragging,
  };
}
