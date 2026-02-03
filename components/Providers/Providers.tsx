'use client';

import { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import type { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // Scroll to top on page load/reload (backup to head script)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Disable browser scroll restoration if not already disabled
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      // Ensure we're at the top
      window.scrollTo(0, 0);
      
      // Also handle any delayed scroll restoration
      const handleLoad = () => {
        window.scrollTo(0, 0);
      };
      
      if (document.readyState === 'complete') {
        window.scrollTo(0, 0);
      } else {
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
      }
    }
  }, []);

  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
