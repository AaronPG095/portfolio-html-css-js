'use client';

import { lazy, Suspense } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Profile from '@/components/Profile/Profile';
import About from '@/components/About/About';
import Contact from '@/components/Contact/Contact';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

// Lazy load heavy components (below the fold)
const Skills = lazy(() => import('@/components/Skills/Skills'));
const Projects = lazy(() => import('@/components/Projects/Projects'));

// Loading fallback component
function SectionLoader() {
  return (
    <div style={{ 
      minHeight: '400px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div>Loading...</div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ErrorBoundary>
          <Profile />
        </ErrorBoundary>
        <ErrorBoundary>
          <About />
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Skills />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
