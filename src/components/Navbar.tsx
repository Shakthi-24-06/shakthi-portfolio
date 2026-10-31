import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Sparkles, Send } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newMuted = soundManager.toggleMute();
    setIsMuted(newMuted);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    soundManager.playClick();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 sm:px-6 py-4 pointer-events-none">
      <nav
        className={`w-full max-w-6xl pointer-events-auto transition-all duration-300 rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between ${
          isScrolled
            ? 'glass-panel shadow-[0_10px_35px_rgba(0,0,0,0.7)] border-cyan-500/20'
            : 'bg-slate-950/40 backdrop-blur-md border border-white/5'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          onMouseEnter={() => soundManager.playHover()}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#070b1e] rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-['Outfit'] text-sm tracking-tighter">
                SS
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-cyan-400 absolute -top-0.5 -right-0.5 ring-2 ring-slate-950 animate-ping" />
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-white group-hover:text-cyan-300 transition-colors font-['Outfit']">
              SHAKTHI SIVAKUMAR
            </span>
            <span className="text-[10px] text-cyan-400 font-mono tracking-wider -mt-0.5">
              FULL STACK DEV
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-white/5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.name.toLowerCase();
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-sky-500/15 to-purple-500/20 border border-cyan-400/40 rounded-lg -z-10"
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  />
                )}
                <span>{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Background Music Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundManager.playHover()}
            className={`px-3 py-2 rounded-xl border text-xs flex items-center gap-2 transition-all ${
              !isMuted
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
            title={isMuted ? 'Play Dreamy Background Music' : 'Pause Background Music'}
            aria-label="Background music toggle"
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="hidden sm:inline text-[11px] font-mono font-medium text-cyan-300">Music ON</span>
                <span className="hidden sm:flex gap-0.5 items-end h-3">
                  <span className="w-0.5 h-2 bg-cyan-400 animate-pulse" />
                  <span className="w-0.5 h-3 bg-cyan-400 animate-pulse" style={{ animationDelay: '150ms' }} />
                  <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse" style={{ animationDelay: '300ms' }} />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px] font-mono font-medium">Music OFF</span>
              </>
            )}
          </button>

          {/* Get in Touch CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </a>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 p-5 rounded-2xl glass-panel border border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] md:hidden flex flex-col gap-2 z-50 pointer-events-auto"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.name.toLowerCase();
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <Sparkles className="w-4 h-4 text-cyan-400" />}
                </a>
              );
            })}

            <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className="w-full text-center py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-purple-600 shadow-lg"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
