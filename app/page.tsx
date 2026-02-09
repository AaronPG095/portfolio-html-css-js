import dynamic from 'next/dynamic';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Profile from '@/components/Profile/Profile';
import About from '@/components/About/About';
import Contact from '@/components/Contact/Contact';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import SkillsSkeleton from '@/components/ui/SkillsSkeleton';
import ProjectsSkeleton from '@/components/ui/ProjectsSkeleton';

// Lazy load heavy components (below the fold) on the client
const Skills = dynamic(() => import('@/components/Skills/Skills'), {
  ssr: false,
  loading: () => <SkillsSkeleton />,
});

const Projects = dynamic(() => import('@/components/Projects/Projects'), {
  ssr: false,
  loading: () => <ProjectsSkeleton />,
});

const ScrollToTop = dynamic(
  () => import('@/components/ScrollToTop/ScrollToTop'),
  {
    ssr: false,
  },
);

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <ErrorBoundary>
          <Profile />
        </ErrorBoundary>
        <ErrorBoundary>
          <About />
        </ErrorBoundary>
        <ErrorBoundary>
          <Skills />
        </ErrorBoundary>
        <ErrorBoundary>
          <Projects />
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
