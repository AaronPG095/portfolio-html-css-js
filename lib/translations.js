/**
 * Translation utilities
 */

let translationsCache = null;

export async function loadTranslations() {
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

export function getTranslation(translations, key, lang = 'en') {
  if (!translations || !translations[lang]) return key;
  const keys = key.split('.');
  let value = translations[lang];
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  return typeof value === 'string' ? value : key;
}

export function getStoredLanguage() {
  if (typeof window === 'undefined') return 'en';
  return localStorage.getItem('language') || 'en';
}

export function setStoredLanguage(lang) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('language', lang);
}

