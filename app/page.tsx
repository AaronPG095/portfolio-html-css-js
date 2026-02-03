'use client';

import { lazy, Suspense } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Profile from '@/components/Profile/Profile';
import About from '@/components/About/About';
import Contact from '@/components/Contact/Contact';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import SkillsSkeleton from '@/components/ui/SkillsSkeleton';
import ProjectsSkeleton from '@/components/ui/ProjectsSkeleton';

// Lazy load heavy components (below the fold)
const Skills = lazy(() => import('@/components/Skills/Skills'));
const Projects = lazy(() => import('@/components/Projects/Projects'));

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
          <Suspense fallback={<SkillsSkeleton />}>
            <Skills />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <Suspense fallback={<ProjectsSkeleton />}>
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
