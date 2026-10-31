import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export const LeafScanner: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 to 100%
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [threshold, setThreshold] = useState<'standard' | 'sensitive'>('standard');

  const triggerScan = () => {
    setIsScanning(false);
    soundManager.playLaserScan();
    setTimeout(() => setIsScanning(true), 100);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col items-center select-none">
      {/* 1. Control Bar */}
      <div className="w-full flex items-center justify-between gap-2 mb-4 px-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
          <Scan className="w-3.5 h-3.5 text-emerald-400" />
          <span>Interactive Canny Inspector</span>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
          {(['standard', 'sensitive'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setThreshold(mode);
                soundManager.playClick();
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium capitalize transition-all ${
                threshold === mode
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {mode} Hysteresis
            </button>
          ))}
        </div>

        <button
          onClick={triggerScan}
          className="p-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/40 transition-all flex items-center gap-1 text-xs"
          title="Run Edge Scan Beam"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        </button>
      </div>

      {/* 2. Main Interactive Leaf Display (Split View) */}
      <div className="relative w-full aspect-square max-w-[380px] sm:max-w-[420px] rounded-2xl overflow-hidden glass-panel border border-emerald-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Layer A: CANNY EDGE PROCESSED LEAF */}
        <div className="absolute inset-0 bg-[#040810] flex items-center justify-center p-6">
          <svg viewBox="0 0 340 340" className="w-full h-full overflow-visible" fill="none">
            <defs>
              <pattern id="matrixGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="340" height="340" fill="url(#matrixGrid)" />

            {/* Canny Leaf Outer Contour */}
            <path
              d="M170 30 C120 70, 50 140, 70 240 C85 290, 140 300, 170 320 C200 300, 255 290, 270 240 C290 140, 220 70, 170 30 Z"
              stroke="#00f0ff"
              strokeWidth="2.2"
              fill="#06121f"
              strokeDasharray={threshold === 'sensitive' ? 'none' : '4 1'}
            />

            {/* Main Central Vein */}
            <path d="M170 45 Q172 180, 170 315" stroke="#00f0ff" strokeWidth="2.2" strokeLinecap="round" />

            {/* Lateral Secondary Veins */}
            <path d="M170 90 Q120 120, 95 160" stroke="#38bdf8" strokeWidth="1.4" opacity="0.85" />
            <path d="M170 100 Q220 130, 245 170" stroke="#38bdf8" strokeWidth="1.4" opacity="0.85" />
            <path d="M170 140 Q110 180, 85 220" stroke="#38bdf8" strokeWidth="1.4" opacity="0.85" />
            <path d="M170 150 Q230 190, 255 230" stroke="#38bdf8" strokeWidth="1.4" opacity="0.85" />
            <path d="M170 200 Q130 230, 105 265" stroke="#38bdf8" strokeWidth="1.2" opacity="0.8" />
            <path d="M170 210 Q210 240, 235 275" stroke="#38bdf8" strokeWidth="1.2" opacity="0.8" />

            {/* DAMAGED REGION 1 */}
            <g id="canny-damaged-1">
              <path
                d="M115 130 C100 140, 105 165, 125 175 C145 185, 155 160, 145 140 C135 125, 125 120, 115 130 Z"
                stroke="#f43f5e"
                strokeWidth="2.5"
                fill="rgba(244, 63, 94, 0.18)"
              />
              <path d="M120 145 Q135 155, 130 168" stroke="#fb7185" strokeWidth="1.5" />
              <text x="130" y="195" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                DEFECT: 0.88 ΔG
              </text>
            </g>

            {/* DAMAGED REGION 2 */}
            <g id="canny-damaged-2">
              <path
                d="M205 200 C190 210, 195 230, 215 240 C235 250, 245 230, 235 210 Z"
                stroke="#f59e0b"
                strokeWidth="2.2"
                fill="rgba(245, 158, 11, 0.15)"
              />
              <text x="215" y="260" fill="#f59e0b" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                IRREGULAR: 0.74 ΔG
              </text>
            </g>

            {/* Coordinate Crosshairs */}
            <circle cx="125" cy="155" r="4" stroke="#f43f5e" strokeWidth="1" />
            <line x1="125" y1="148" x2="125" y2="162" stroke="#f43f5e" strokeWidth="1" />
            <line x1="118" y1="155" x2="132" y2="155" stroke="#f43f5e" strokeWidth="1" />

            <circle cx="215" cy="220" r="4" stroke="#f59e0b" strokeWidth="1" />
          </svg>

          <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
            CANNY EDGES [THRESH: {threshold === 'sensitive' ? '30, 90' : '50, 150'}]
          </div>
        </div>

        {/* Layer B: ORIGINAL RGB NATURAL CROP LEAF */}
        <div
          className="absolute inset-0 bg-[#071318] flex items-center justify-center p-6 border-r border-cyan-400 shadow-[5px_0_20px_rgba(0,240,255,0.4)]"
          style={{ width: `${sliderPos}%`, overflow: 'hidden' }}
        >
          <div className="w-[340px] h-[340px] flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 340 340" className="w-full h-full overflow-visible" fill="none">
              <defs>
                <radialGradient id="leafFleshGrad" cx="0.4" cy="0.4" r="0.7">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="45%" stopColor="#16a34a" />
                  <stop offset="85%" stopColor="#15803d" />
                  <stop offset="100%" stopColor="#14532d" />
                </radialGradient>

                <radialGradient id="lesionGrad1" cx="0.4" cy="0.4" r="0.6">
                  <stop offset="0%" stopColor="#78350f" />
                  <stop offset="40%" stopColor="#b45309" />
                  <stop offset="80%" stopColor="#ca8a04" />
                  <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
                </radialGradient>

                <radialGradient id="lesionGrad2" cx="0.5" cy="0.5" r="0.6">
                  <stop offset="0%" stopColor="#9a3412" />
                  <stop offset="60%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#65a30d" stopOpacity="0" />
                </radialGradient>
              </defs>

              <path
                d="M170 30 C120 70, 50 140, 70 240 C85 290, 140 300, 170 320 C200 300, 255 290, 270 240 C290 140, 220 70, 170 30 Z"
                fill="url(#leafFleshGrad)"
                stroke="#15803d"
                strokeWidth="2"
              />

              <path d="M170 45 Q172 180, 170 315" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />

              <path d="M170 90 Q120 120, 95 160" stroke="#86efac" strokeWidth="1.5" opacity="0.7" />
              <path d="M170 100 Q220 130, 245 170" stroke="#86efac" strokeWidth="1.5" opacity="0.7" />
              <path d="M170 140 Q110 180, 85 220" stroke="#86efac" strokeWidth="1.5" opacity="0.7" />
              <path d="M170 150 Q230 190, 255 230" stroke="#86efac" strokeWidth="1.5" opacity="0.7" />
              <path d="M170 200 Q130 230, 105 265" stroke="#86efac" strokeWidth="1.2" opacity="0.6" />
              <path d="M170 210 Q210 240, 235 275" stroke="#86efac" strokeWidth="1.2" opacity="0.6" />

              <ellipse cx="125" cy="155" rx="22" ry="18" fill="url(#lesionGrad1)" />
              <ellipse cx="215" cy="220" rx="18" ry="14" fill="url(#lesionGrad2)" />
            </svg>
          </div>

          <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300">
            ORIGINAL RGB INPUT
          </div>
        </div>

        {/* 3. Animated Laser Scanning Beam */}
        {isScanning && (
          <motion.div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none shadow-[0_0_15px_#00f0ff] z-20"
            animate={{
              top: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* 4. Draggable Split Handle Line */}
        <div
          className="absolute top-0 bottom-0 z-30 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-0.5 h-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
          <div className="w-7 h-7 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-lg text-[10px] font-bold">
            ↔
          </div>
        </div>

        <input
          type="range"
          min="5"
          max="95"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize z-40"
          aria-label="Drag before and after edge detection slider"
        />
      </div>

      <div className="mt-3 flex items-center justify-between w-full max-w-[380px] text-[11px] text-slate-400 px-1 font-mono">
        <span className="flex items-center gap-1 text-emerald-400">
          ◀ Original Leaf
        </span>
        <span className="text-slate-500">Drag Slider</span>
        <span className="flex items-center gap-1 text-cyan-400">
          Canny Edges ▶
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 w-full max-w-sm">
        <div className="glass-panel p-2 rounded-lg border border-white/5 text-[11px]">
          <div className="font-semibold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Step 1: Gaussian Filter
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">5x5 kernel noise suppression</div>
        </div>
        <div className="glass-panel p-2 rounded-lg border border-white/5 text-[11px]">
          <div className="font-semibold text-cyan-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Step 2: Sobel Operator
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Horizontal & vertical gradient vectors</div>
        </div>
        <div className="glass-panel p-2 rounded-lg border border-white/5 text-[11px]">
          <div className="font-semibold text-purple-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Step 3: Non-Max Suppression
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Thins contours to single-pixel ridges</div>
        </div>
        <div className="glass-panel p-2 rounded-lg border border-white/5 text-[11px]">
          <div className="font-semibold text-amber-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Step 4: Hysteresis Tracking
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Dual-threshold damaged edge connectivity</div>
        </div>
      </div>
    </div>
  );
};
