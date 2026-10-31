import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, ChevronRight, Terminal } from 'lucide-react';
import { AnimeCharacter } from './AnimeCharacter';
import { soundManager } from '../utils/soundEffects';

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const handleScrollToProjects = () => {
    soundManager.playClick();
    const el = document.querySelector('#projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadClick = () => {
    soundManager.playClick();
    if (onOpenResume) {
      // Optional callback support
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden"
    >
      {/* Background radial spotlights & dreamy clouds */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />

      {/* Floating Dreamy Cloud 1 */}
      <motion.div
        className="absolute top-32 -left-20 w-80 h-32 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none"
        animate={{ x: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Floating Dreamy Cloud 2 */}
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-40 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none"
        animate={{ x: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Left Side: Typography & Information */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start space-y-6 text-left"
        >
          {/* Greeting Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Hi, I'm</span>
          </div>

          {/* Name Typography with Animated Gradient Shimmer */}
          <div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-['Outfit'] uppercase leading-[1.08]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-200">
                SHAKTHI
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]">
                SIVAKUMAR
              </span>
            </h1>

            {/* Role / Subtitle */}
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 font-['Space_Grotesk']">
                Full Stack Developer
              </span>
              <span className="hidden sm:inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
          </div>

          {/* Core Quote */}
          <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed border-l-2 border-cyan-400/60 pl-4 py-1 italic">
            "Turning ideas into meaningful digital experiences."
          </p>

          {/* Action CTA Buttons (Clean & spacious after removing information badges) */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={handleScrollToProjects}
              onMouseEnter={() => soundManager.playHover()}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-[0_0_25px_rgba(0,240,255,0.45)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <span>Explore My Work</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Original Resume Download Button */}
            <a
              href="/resume/Shakthi_Sivakumar_Resume.pdf"
              download="Shakthi_Sivakumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDownloadClick}
              onMouseEnter={() => soundManager.playHover()}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm text-cyan-300 glass-panel border border-cyan-500/40 hover:bg-cyan-950/40 hover:border-cyan-400 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 shadow-lg"
              aria-label="Download Shakthi Sivakumar Original Resume PDF"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </div>
        </motion.div>

        {/* Right Side: Animated Girl Character & 3D Tech Universe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          {/* Animated 3D-styled Anime Character */}
          <AnimeCharacter pose="hero" size="xl" interactive={true} />

          {/* Floating Glass Code Widget */}
          <motion.div
            className="hidden sm:flex absolute -bottom-6 -left-6 glass-panel p-3.5 rounded-2xl border border-cyan-500/30 shadow-2xl flex-col gap-1 max-w-[210px]"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
              <Terminal className="w-3 h-3 text-cyan-400" />
              <span>shakthi_dev.py</span>
            </div>
            <div className="font-mono text-[11px] text-cyan-300">
              $ system.build_future()
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Deployed: 100% Quality
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={handleScrollToProjects}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
          Scroll to Explore
        </span>
        <div className="w-5 h-8 rounded-full border border-cyan-400/50 flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2 rounded-full bg-cyan-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};
