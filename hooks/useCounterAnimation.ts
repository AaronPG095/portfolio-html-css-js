'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface CounterAnimationOptions {
  /** Duration of the animation in milliseconds. Default: 2000 */
  duration?: number;
  /** Delay before starting the animation in milliseconds. Default: 0 */
  delay?: number;
  /** Easing function. Default: 'easeOut' */
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  /** Whether to start the animation. Default: false */
  start?: boolean;
  /** Number of decimal places to display. Default: 0 */
  decimals?: number;
}

export interface CounterAnimationReturn {
  /** The current animated value */
  value: number;
  /** Whether the animation is complete */
  isComplete: boolean;
  /** Whether the animation is currently running */
  isAnimating: boolean;
  /** Function to manually restart the animation */
  restart: () => void;
}

/**
 * Custom hook for animating a number from 0 to a target value.
 * 
 * @param target - The target number to animate to
 * @param options - Configuration options for the animation
 * @returns Object containing current value, completion state, and control functions
 * 
 * @example
 * ```tsx
 * const { value, isComplete } = useCounterAnimation(100, {
 *   duration: 2000,
 *   start: isVisible
 * });
 * ```
 */
export function useCounterAnimation(
  target: number,
  options: CounterAnimationOptions = {}
): CounterAnimationReturn {
  const {
    duration = 2000,
    delay = 0,
    easing = 'easeOut',
    start = false,
    decimals = 0,
  } = options;

  const [value, setValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const targetRef = useRef(target);

  // Update target ref when target changes
  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  // Easing functions
  const easingFunctions = {
    linear: (t: number) => t,
    easeIn: (t: number) => t * t,
    easeOut: (t: number) => t * (2 - t),
    easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  };

  const animate = useCallback(() => {
    if (!startTimeRef.current) {
      startTimeRef.current = performance.now();
    }

    const animateFrame = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFunctions[easing](progress);
      
      const currentValue = easedProgress * targetRef.current;
      const roundedValue = Number(currentValue.toFixed(decimals));
      
      setValue(roundedValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateFrame);
      } else {
        // Animation complete
        setValue(targetRef.current);
        setIsAnimating(false);
        setIsComplete(true);
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateFrame);
  }, [duration, easing, decimals]);

  const startAnimation = useCallback(() => {
    // Clear any existing animations
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Reset state
    setValue(0);
    setIsComplete(false);
    setIsAnimating(false);
    startTimeRef.current = null;

    // Start animation after delay
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(true);
        animate();
      }, delay);
    } else {
      setIsAnimating(true);
      animate();
    }
  }, [delay, animate]);

  // Track previous start value to detect changes
  const prevStartRef = useRef(start);

  // Start animation when start becomes true
  useEffect(() => {
    const startChanged = start && !prevStartRef.current;
    prevStartRef.current = start;

    if (start && (startChanged || (!isAnimating && !isComplete))) {
      startAnimation();
    }
  }, [start, isAnimating, isComplete, startAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const restart = useCallback(() => {
    startAnimation();
  }, [startAnimation]);

  return {
    value,
    isComplete,
    isAnimating,
    restart,
  };
}
