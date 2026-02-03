/**
 * Translation utilities
 */

import type { TranslationsData, Language } from '@/types';

let translationsCache: TranslationsData | null = null;

export async function loadTranslations(): Promise<TranslationsData | null> {
  if (translationsCache) {
    return translationsCache;
  }

  try {
    const response = await fetch('/data/translations.json');
    translationsCache = await response.json();
    return translationsCache;
  } catch (error) {
    console.error('Error loading translations:', error);
    return null;
  }
}

export function getTranslation(
  translations: TranslationsData | null,
  key: string,
  lang: Language = 'en'
): string {
  if (!translations || !translations[lang]) return key;
  const keys = key.split('.');
  let value: any = translations[lang];
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  return typeof value === 'string' ? value : key;
}

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('language');
  return stored === 'de' ? 'de' : 'en';
}

export function setStoredLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('language', lang);
}
