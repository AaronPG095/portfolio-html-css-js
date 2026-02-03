'use client';

import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  handler: () => void;
  description?: string;
  preventDefault?: boolean;
}

/**
 * Hook for managing keyboard shortcuts
 * 
 * @param shortcuts Array of keyboard shortcut configurations
 * @param enabled Whether shortcuts are enabled (default: true)
 * 
 * @example
 * useKeyboardShortcuts([
 *   { key: 't', handler: toggleTheme, description: 'Toggle theme' },
 *   { key: 'l', handler: toggleLanguage, description: 'Toggle language' }
 * ]);
 */
export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[],
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when user is typing in inputs, textareas, or contenteditable elements
      const target = event.target as HTMLElement;
      const isInputElement =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.closest('input, textarea, [contenteditable="true"]');

      if (isInputElement) {
        return;
      }

      // Check for modifier keys (Ctrl, Alt, Meta) - shortcuts should work without modifiers
      // But allow Ctrl/Cmd + key combinations if needed
      const hasModifier = event.ctrlKey || event.altKey || event.metaKey;

      // Find matching shortcut (case-insensitive)
      const shortcut = shortcuts.find(
        (s) => s.key.toLowerCase() === event.key.toLowerCase()
      );

      if (shortcut && !hasModifier) {
        if (shortcut.preventDefault !== false) {
          event.preventDefault();
        }
        shortcut.handler();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts, enabled]);
}

/**
 * Hook for a single keyboard shortcut
 * 
 * @param key The key to listen for
 * @param handler The function to call when the key is pressed
 * @param enabled Whether the shortcut is enabled
 */
export function useKeyboardShortcut(
  key: string,
  handler: () => void,
  enabled: boolean = true
) {
  useKeyboardShortcuts([{ key, handler }], enabled);
}
