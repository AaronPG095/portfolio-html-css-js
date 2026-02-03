'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface TypingAnimationOptions {
  /** Speed of typing in milliseconds per character. Default: 100 */
  speed?: number;
  /** Delay before starting the animation in milliseconds. Default: 0 */
  delay?: number;
  /** Whether to show a cursor. Default: true */
  showCursor?: boolean;
  /** Whether to restart animation when text changes. Default: true */
  restartOnChange?: boolean;
  /** Whether the animation is enabled. When false, animation won't start. Default: true */
  enabled?: boolean;
}

export interface TypingAnimationReturn {
  /** The currently displayed text */
  displayedText: string;
  /** Whether the typing animation is complete */
  isComplete: boolean;
  /** Whether the animation is currently running */
  isTyping: boolean;
  /** Function to manually restart the animation */
  restart: () => void;
}

/**
 * Custom hook for creating a typing animation effect.
 * 
 * @param text - The full text to type out
 * @param options - Configuration options for the animation
 * @returns Object containing displayed text, completion state, and control functions
 * 
 * @example
 * ```tsx
 * const { displayedText, isComplete } = useTypingAnimation('Hello World', {
 *   speed: 100,
 *   delay: 500
 * });
 * ```
 */
export function useTypingAnimation(
  text: string,
  options: TypingAnimationOptions = {}
): TypingAnimationReturn {
  const {
    speed = 100,
    delay = 0,
    showCursor = true,
    restartOnChange = true,
    enabled = true,
  } = options;

  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const currentIndexRef = useRef(0);
  const textRef = useRef(text);
  const previousTextRef = useRef(text);

  // Update text ref when text changes
  useEffect(() => {
    textRef.current = text;
  }, [text]);

  const startAnimation = useCallback(() => {
    // Clear any existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Reset state
    setDisplayedText('');
    setIsComplete(false);
    setIsTyping(false);
    currentIndexRef.current = 0;
    startTimeRef.current = null;

    // Start animation after delay
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsTyping(true);
        startTimeRef.current = performance.now();
        typeNextCharacter();
      }, delay);
    } else {
      setIsTyping(true);
      startTimeRef.current = performance.now();
      typeNextCharacter();
    }
  }, [speed, delay]);

  const typeNextCharacter = useCallback(() => {
    const currentText = textRef.current;
    const currentIndex = currentIndexRef.current;

    if (currentIndex < currentText.length) {
      // Normal progression - type next character
      currentIndexRef.current = currentIndex + 1;
      setDisplayedText(currentText.slice(0, currentIndexRef.current));

      // Schedule next character
      timeoutRef.current = setTimeout(() => {
        typeNextCharacter();
      }, speed);
    } else {
      // Animation complete
      setIsTyping(false);
      setIsComplete(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [speed]);

  // Initialize animation on mount (if enabled)
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTypingAnimation.ts:129',message:'useEffect entry - initialize animation',data:{enabled:enabled,textLength:text.length,hasTimeout:timeoutRef.current!==null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
    // #endregion
    if (enabled && text.length > 0) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTypingAnimation.ts:132',message:'BEFORE startAnimation',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
      // #endregion
      startAnimation();
    } else {
      // If disabled, show empty text
      setDisplayedText('');
      setIsComplete(false);
      setIsTyping(false);
      // Clear any pending timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTypingAnimation.ts:152',message:'cleanup - clearing timeouts',data:{hasTimeout:timeoutRef.current!==null,hasAnimationFrame:animationFrameRef.current!==null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
      // #endregion
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, startAnimation, text.length]); // Run when enabled or text changes

  // Restart animation when text changes (if enabled and restartOnChange is true)
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTypingAnimation.ts:156',message:'useEffect entry - restart on text change',data:{enabled:enabled,text:text,previousText:previousTextRef.current,restartOnChange:restartOnChange},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
    // #endregion
    if (!enabled) {
      setDisplayedText('');
      setIsComplete(false);
      setIsTyping(false);
      return;
    }

    if (restartOnChange && text !== previousTextRef.current && text.length > 0) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/73b67db3-c5d1-4f81-8065-642fb9e31171',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTypingAnimation.ts:166',message:'BEFORE restarting animation',data:{text:text,previousText:previousTextRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
      // #endregion
      previousTextRef.current = text;
      startAnimation();
    } else if (text === previousTextRef.current && text.length === 0) {
      // Handle empty text case
      setDisplayedText('');
      setIsComplete(false);
      setIsTyping(false);
    }
  }, [text, restartOnChange, enabled, startAnimation]);

  const restart = useCallback(() => {
    startAnimation();
  }, [startAnimation]);

  return {
    displayedText,
    isComplete,
    isTyping,
    restart,
  };
}
