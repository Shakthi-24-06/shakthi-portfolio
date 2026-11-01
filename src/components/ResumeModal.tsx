import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, ZoomIn, ZoomOut } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [zoom, setZoom] = useState(1);

  if (!isOpen) return null;

  const handleDownload = () => {
    soundManager.playClick();
    const link = document.createElement('a');
    link.href = '/resume/resume_shakthi.pdf';
    link.download = 'Shakthi_Sivakumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => {
    soundManager.playClick();
    setZoom((prev) => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    soundManager.playClick();
    setZoom((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleResetZoom = () => {
    soundManager.playClick();
    setZoom(1);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#090d1a] border border-cyan-500/30 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-4 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-5 py-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="truncate">
                <h3 className="font-bold text-white text-sm sm:text-base truncate font-['Outfit']">
                  Shakthi Sivakumar — Resume
                </h3>
                <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                  Shakthi_Sivakumar_Resume.pdf
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Zoom Controls */}
              <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                <button
                  onClick={handleZoomOut}
                  disabled={zoom <= 0.75}
                  className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="px-2 text-[10px] font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  title="Reset Zoom"
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  onClick={handleZoomIn}
                  disabled={zoom >= 2}
                  className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Open PDF in New Tab */}
              <a
                href="/resume/resume_shakthi.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                title="Open PDF in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                <span>Open PDF</span>
              </a>

              {/* Prominent Download Button */}
              <button
                onClick={handleDownload}
                onMouseEnter={() => soundManager.playHover()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 text-xs font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
                title="Download Resume PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-1 cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body: Resume Image Display */}
          <div className="flex-1 overflow-auto p-4 sm:p-8 bg-[#040714] flex flex-col items-center">
            <div
              className="transition-transform duration-200 ease-out flex justify-center w-full"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
            >
              <img
                src="/resume/resume_preview.png"
                alt="Shakthi Sivakumar Resume"
                className="w-full max-w-2xl rounded-xl border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.9)] object-contain select-none bg-white"
                loading="eager"
              />
            </div>
          </div>

          {/* Modal Footer: Sticky Download Bar */}
          <div className="px-5 py-3 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Full Stack Developer • BCA Graduate</span>
            </div>

            <button
              onClick={handleDownload}
              onMouseEnter={() => soundManager.playHover()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
