'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { loadTranslations, getStoredLanguage, setStoredLanguage, getTranslation } from '@/lib/translations';

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');
  const [translations, setTranslations] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedLang = getStoredLanguage();
    setLanguageState(storedLang);
    
    loadTranslations().then((translationsData) => {
      setTranslations(translationsData);
    });
  }, []);

  const setLanguage = (lang) => {
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

  const t = (key) => {
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

