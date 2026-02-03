'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadTranslations, getStoredLanguage, setStoredLanguage, getTranslation } from '@/lib/translations';
import type { Language, TranslationsData } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  translations: TranslationsData | null;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<TranslationsData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedLang = getStoredLanguage();
    setLanguageState(storedLang);
    
    loadTranslations().then((translationsData) => {
      setTranslations(translationsData);
    });
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setStoredLanguage(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', lang);
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'de' : 'en';
    setLanguage(newLang);
  };

  const t = (key: string) => {
    if (!translations) return key;
    return getTranslation(translations, key, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, translations, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
