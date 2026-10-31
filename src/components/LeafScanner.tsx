import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, Sparkle } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export type PipelineStage = 1 | 2 | 3 | 4;

export const LeafScanner: React.FC = () => {
  const [activeStage, setActiveStage] = useState<PipelineStage>(3);
  const [isScanning, setIsScanning] = useState<boolean>(true);

  const triggerScan = () => {
    setIsScanning(false);
    soundManager.playLaserScan();
    setTimeout(() => setIsScanning(true), 100);
  };

  const handleSelectStage = (stage: PipelineStage) => {
    setActiveStage(stage);
    soundManager.playClick();
  };

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col items-center select-none">
      {/* 1. Control Bar with 4 Stage Buttons */}
      <div className="w-full flex items-center justify-between gap-1.5 mb-3 px-1">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] w-full overflow-x-auto">
          {[
            { id: 1 as PipelineStage, name: '1. Blur' },
            { id: 2 as PipelineStage, name: '2. Canny' },
            { id: 3 as PipelineStage, name: '3. Overlay' },
            { id: 4 as PipelineStage, name: '4. Remedy' },
          ].map((stage) => (
            <button
              key={stage.id}
              onClick={() => handleSelectStage(stage.id)}
              className={`flex-1 py-1 px-2 rounded-lg font-medium transition-all text-center whitespace-nowrap ${
                activeStage === stage.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {stage.name}
            </button>
          ))}
        </div>

        <button
          onClick={triggerScan}
          className="p-2 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/40 transition-all flex items-center justify-center text-xs flex-shrink-0"
          title="Run Edge Scan Beam"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        </button>
      </div>

      {/* 2. Main Visual Display Frame */}
      <div className="relative w-full aspect-square max-w-[380px] sm:max-w-[420px] rounded-2xl overflow-hidden glass-panel border border-emerald-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* STAGE 1: GAUSSIAN BLUR (Original vs Blurred Split) */}
        {activeStage === 1 && (
          <div className="absolute inset-0 bg-[#071318] flex items-center justify-center p-6">
            {/* Background: Blurred Image */}
            <div className="w-[340px] h-[340px] flex items-center justify-center filter blur-[3px]">
              <svg viewBox="0 0 340 340" className="w-full h-full overflow-visible" fill="none">
                <path
                  d="M170 30 C120 70, 50 140, 70 240 C85 290, 140 300, 170 320 C200 300, 255 290, 270 240 C290 140, 220 70, 170 30 Z"
                  fill="#15803d"
                  stroke="#16a34a"
                  strokeWidth="2"
                />
                <ellipse cx="125" cy="155" rx="22" ry="18" fill="#b45309" />
                <ellipse cx="215" cy="220" rx="18" ry="14" fill="#d97706" />
              </svg>
            </div>

            <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
              GAUSSIAN BLUR: NOISE REDUCTION
            </div>
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300">
              SMOOTHED MATRIX
            </div>
          </div>
        )}

        {/* STAGE 2: CANNY EDGE DETECTION (Black & White Edge Detection Output) */}
        {activeStage === 2 && (
          <div className="absolute inset-0 bg-black flex items-center justify-center p-6">
            <svg viewBox="0 0 340 340" className="w-full h-full overflow-visible" fill="none">
              {/* Outer boundary */}
              <path
                d="M170 30 C120 70, 50 140, 70 240 C85 290, 140 300, 170 320 C200 300, 255 290, 270 240 C290 140, 220 70, 170 30 Z"
                stroke="#ffffff"
                strokeWidth="2"
                fill="none"
              />
              {/* Main veins */}
              <path d="M170 45 Q172 180, 170 315" stroke="#ffffff" strokeWidth="2" />
              <path d="M170 90 Q120 120, 95 160" stroke="#ffffff" strokeWidth="1.2" />
              <path d="M170 100 Q220 130, 245 170" stroke="#ffffff" strokeWidth="1.2" />
              <path d="M170 140 Q110 180, 85 220" stroke="#ffffff" strokeWidth="1.2" />
              <path d="M170 150 Q230 190, 255 230" stroke="#ffffff" strokeWidth="1.2" />

              {/* Edge Contours of Damaged Regions */}
              <path
                d="M115 130 C100 140, 105 165, 125 175 C145 185, 155 160, 145 140 C135 125, 125 120, 115 130 Z"
                stroke="#ffffff"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M205 200 C190 210, 195 230, 215 240 C235 250, 245 230, 235 210 Z"
                stroke="#ffffff"
                strokeWidth="2.2"
                fill="none"
              />
            </svg>

            <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/90 border border-white/40 text-[10px] font-mono text-white">
              CANNY BINARY EDGE MAP
            </div>
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/90 border border-white/40 text-[10px] font-mono text-white">
              DETECTED BOUNDARIES
            </div>
          </div>
        )}

        {/* STAGE 3: MASK OVERLAY (Original Leaf with Processed Mask Overlay) */}
        {activeStage === 3 && (
          <div className="absolute inset-0 bg-[#071318] flex items-center justify-center p-6">
            <svg viewBox="0 0 340 340" className="w-full h-full overflow-visible" fill="none">
              <defs>
                <radialGradient id="leafFleshGrad3" cx="0.4" cy="0.4" r="0.7">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="45%" stopColor="#16a34a" />
                  <stop offset="85%" stopColor="#15803d" />
                  <stop offset="100%" stopColor="#14532d" />
                </radialGradient>
              </defs>

              {/* Leaf Body */}
              <path
                d="M170 30 C120 70, 50 140, 70 240 C85 290, 140 300, 170 320 C200 300, 255 290, 270 240 C290 140, 220 70, 170 30 Z"
                fill="url(#leafFleshGrad3)"
                stroke="#15803d"
                strokeWidth="2"
              />
              <path d="M170 45 Q172 180, 170 315" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M170 90 Q120 120, 95 160" stroke="#86efac" strokeWidth="1.5" opacity="0.7" />
              <path d="M170 100 Q220 130, 245 170" stroke="#86efac" strokeWidth="1.5" opacity="0.7" />
              <path d="M170 140 Q110 180, 85 220" stroke="#86efac" strokeWidth="1.5" opacity="0.7" />
              <path d="M170 150 Q230 190, 255 230" stroke="#86efac" strokeWidth="1.5" opacity="0.7" />

              {/* Damaged Spots with Mask Overlay Contours */}
              <g id="mask-region-1">
                <ellipse cx="125" cy="155" rx="22" ry="18" fill="#b45309" />
                <path
                  d="M115 130 C100 140, 105 165, 125 175 C145 185, 155 160, 145 140 C135 125, 125 120, 115 130 Z"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                  fill="rgba(244, 63, 94, 0.35)"
                />
                <circle cx="125" cy="155" r="4" stroke="#f43f5e" strokeWidth="1" />
              </g>

              <g id="mask-region-2">
                <ellipse cx="215" cy="220" rx="18" ry="14" fill="#d97706" />
                <path
                  d="M205 200 C190 210, 195 230, 215 240 C235 250, 245 230, 235 210 Z"
                  stroke="#00f0ff"
                  strokeWidth="2.2"
                  fill="rgba(0, 240, 255, 0.35)"
                />
                <circle cx="215" cy="220" r="4" stroke="#00f0ff" strokeWidth="1" />
              </g>
            </svg>

            <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300">
              ORIGINAL LEAF
            </div>
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 border border-rose-500/40 text-[10px] font-mono text-rose-300">
              PROCESSED MASK OVERLAY
            </div>
          </div>
        )}

        {/* STAGE 4: PREDICTION AND REMEDY (Result & Suggested Remedy Panel) */}
        {activeStage === 4 && (
          <div className="absolute inset-0 bg-[#061219] flex flex-col justify-between p-5 sm:p-6 overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-[11px] font-mono font-bold text-rose-400 uppercase tracking-wider">
                  Detection Result
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                Bacterial Leaf Spot / Necrotic Lesion
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                High edge-gradient contours detected in 2 isolated leaf sectors.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-2 mt-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <Sparkle className="w-3.5 h-3.5" />
                <span>Suggested Remedy</span>
              </div>
              <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                <li>Prune and safely destroy heavily affected lower leaves.</li>
                <li>Apply organic copper-based bactericide/fungicide spray.</li>
                <li>Avoid overhead sprinkler irrigation to reduce foliage moisture.</li>
              </ul>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
              <span>Status: Remedy Ready</span>
              <span className="text-emerald-400 font-bold">Actionable Output</span>
            </div>
          </div>
        )}

        {/* Animated Laser Scanning Beam */}
        {isScanning && (
          <motion.div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none shadow-[0_0_15px_#00f0ff] z-20"
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>

      {/* 3. The 4-Stage Workflow Cards (Exact user requirement) */}
      <div className="mt-4 grid grid-cols-2 gap-2 w-full max-w-sm">
        <button
          onClick={() => handleSelectStage(1)}
          className={`p-2.5 rounded-xl border text-left transition-all ${
            activeStage === 1
              ? 'bg-emerald-500/20 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
              : 'glass-panel border-white/5 hover:border-emerald-500/30'
          }`}
        >
          <div className="font-semibold text-emerald-400 text-xs flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Step 01
          </div>
          <div className="text-[11px] font-bold text-white mt-0.5">Gaussian Blur</div>
          <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">Reduce noise & smooth image</div>
        </button>

        <button
          onClick={() => handleSelectStage(2)}
          className={`p-2.5 rounded-xl border text-left transition-all ${
            activeStage === 2
              ? 'bg-emerald-500/20 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
              : 'glass-panel border-white/5 hover:border-emerald-500/30'
          }`}
        >
          <div className="font-semibold text-cyan-400 text-xs flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Step 02
          </div>
          <div className="text-[11px] font-bold text-white mt-0.5">Canny Edge Detection</div>
          <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">Identify edges & boundaries</div>
        </button>

        <button
          onClick={() => handleSelectStage(3)}
          className={`p-2.5 rounded-xl border text-left transition-all ${
            activeStage === 3
              ? 'bg-emerald-500/20 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
              : 'glass-panel border-white/5 hover:border-emerald-500/30'
          }`}
        >
          <div className="font-semibold text-purple-400 text-xs flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Step 03
          </div>
          <div className="text-[11px] font-bold text-white mt-0.5">Mask Overlay</div>
          <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">Highlight damaged regions</div>
        </button>

        <button
          onClick={() => handleSelectStage(4)}
          className={`p-2.5 rounded-xl border text-left transition-all ${
            activeStage === 4
              ? 'bg-emerald-500/20 border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
              : 'glass-panel border-white/5 hover:border-emerald-500/30'
          }`}
        >
          <div className="font-semibold text-amber-400 text-xs flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Step 04
          </div>
          <div className="text-[11px] font-bold text-white mt-0.5">Prediction & Remedy</div>
          <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">Detection result & remedy info</div>
        </button>
      </div>
    </div>
  );
};
