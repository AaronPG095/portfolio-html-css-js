'use client';

import { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import type { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // Scroll to top on page load/reload
  useEffect(() => {
    // Scroll to top immediately on mount (handles page reload and initial load)
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
