/**
 * Theme utilities
 */

export function getTimeBasedTheme() {
  if (typeof window === 'undefined') return 'light';
  const hour = new Date().getHours();
  // Dark mode from 6 PM (18:00) to 6 AM (06:00)
  return hour >= 18 || hour < 6 ? 'dark' : 'light';
}

export function getStoredTheme() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('theme');
}

export function setStoredTheme(theme) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('theme', theme);
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
}

