import React from 'react';
import { ArrowUp, Mail, Heart, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full border-t border-slate-800/80 bg-[#030614]/90 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-12 z-20">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-between gap-8">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] tracking-tight flex items-center justify-center md:justify-start gap-2">
              <span>Thanks for Visiting!</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </h3>
            <p className="text-xs sm:text-sm text-cyan-300 font-medium">
              "Let's build something meaningful together."
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Shakthi-24-06"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href="https://linkedin.com/in/shakthi-sivakumar"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundManager.playHover()}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href="mailto:ssshakthi1024@gmail.com"
              onMouseEnter={() => soundManager.playHover()}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-purple-300 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              onMouseEnter={() => soundManager.playHover()}
              className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-3">
          <div>
            © 2026 Shakthi Sivakumar. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Designed & Built with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>for the Digital Universe</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
