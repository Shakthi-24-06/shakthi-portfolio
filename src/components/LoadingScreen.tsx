import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Cybernetic Universe...');

  useEffect(() => {
    const statusMessages = [
      { at: 15, text: 'Calibrating 3D Anime Shaders...' },
      { at: 40, text: 'Spinning Up Celestial Starfield...' },
      { at: 70, text: 'Synchronizing Water Beacon Telemetry...' },
      { at: 90, text: 'Entering Shakthi Sivakumar’s World...' },
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onLoaded, 500);
          return 100;
        }

        const msg = statusMessages.slice().reverse().find((m) => next >= m.at);
        if (msg) setStatusText(msg.text);

        return next;
      });
    }, 70);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-white select-none overflow-hidden"
    >
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

      <div className="relative w-44 h-44 flex items-center justify-center mb-8">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400/40 border-dashed"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="absolute inset-3 rounded-full border-2 border-purple-400/50 border-t-transparent border-b-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500/30 via-slate-900 to-purple-600/30 border border-cyan-400/60 shadow-[0_0_30px_rgba(0,240,255,0.4)] flex flex-col items-center justify-center"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-extrabold text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-purple-300 font-['Outfit']">
            SS
          </span>
          <span className="text-[10px] font-mono text-cyan-400 mt-0.5">DEV</span>
        </motion.div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl sm:text-2xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-200 uppercase font-['Outfit'] text-center px-4"
      >
        SHAKTHI SIVAKUMAR
      </motion.h1>
      <p className="text-xs text-cyan-400 font-medium tracking-widest uppercase mt-1">
        Full Stack Developer
      </p>

      <div className="w-64 sm:w-80 mt-6 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="truncate pr-2">{statusText}</span>
          <span className="text-cyan-300 font-bold">{progress}%</span>
        </div>

        <div className="h-1.5 w-full bg-slate-900/80 rounded-full overflow-hidden border border-slate-800 p-0.5">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 rounded-full shadow-[0_0_12px_#00f0ff]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};
