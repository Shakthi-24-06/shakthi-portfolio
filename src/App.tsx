import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThreeBackground } from './components/ThreeBackground';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // ScrollSpy to track active section
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Cinematic Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* 2. Custom Cyber Cursor */}
      <CustomCursor />

      {/* 3. 3D WebGL Three.js Starry Universe */}
      <ThreeBackground />

      {/* 4. Floating Glassmorphism Navigation */}
      <Navbar activeSection={activeSection} />

      {/* 5. Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Section 1: Hero */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* Section 2: About */}
        <About />

        {/* Section 3: Skills */}
        <Skills />

        {/* Section 4: Projects (Water Beacon & Leaf Disease Detection ONLY) */}
        <Projects />

        {/* Section 5: Experience */}
        <Experience />

        {/* Section 6: Contact */}
        <Contact />
      </main>

      {/* 6. Footer */}
      <Footer />

      {/* 7. Resume Inspection & Download Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
};

export default App;
