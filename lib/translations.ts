/**
 * Translation utilities
 *
 * Note: Translations are statically imported so they're available
 * both on the server and the client without an extra network roundtrip.
 */

import type { TranslationsData, Language, Translations } from '@/types';
import rawTranslations from '@/data/translations.json';

const STATIC_TRANSLATIONS = rawTranslations as TranslationsData;

export function getAllTranslations(): TranslationsData {
  return STATIC_TRANSLATIONS;
}

export function getServerTranslations(lang: Language): Translations {
  return STATIC_TRANSLATIONS[lang];
}

export async function loadTranslations(): Promise<TranslationsData | null> {
  // Kept for backward compatibility with existing async callers,
  // but now simply returns the statically imported data.
  return STATIC_TRANSLATIONS;
}

export function getTranslation(
  translations: TranslationsData | null,
  key: string,
  lang: Language = 'en'
): string {
  if (!translations || !translations[lang]) return key;
  const keys = key.split('.');
  let value: unknown = translations[lang];
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
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
