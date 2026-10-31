import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scan, Cpu, ShieldCheck, Terminal } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface LeafAlgorithmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeafAlgorithmModal: React.FC<LeafAlgorithmModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#05111b] border border-emerald-500/40 rounded-2xl shadow-[0_0_60px_rgba(16,185,129,0.25)] overflow-hidden z-10 my-6 max-h-[92vh] flex flex-col"
        >
          <div className="px-5 py-4 bg-slate-950/90 border-b border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <Scan className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span>Canny Edge Algorithm Architecture</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                    OpenCV • Python
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Leaf Disease Detection Using Canny Edge Algorithm
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <span className="font-bold text-white">Algorithm Methodology: </span>
                This system operates purely on classical deterministic Computer Vision principles. By isolating high gradient transitions between healthy chlorophyll tissue and necrotic lesion boundaries, it highlights damaged crop regions with high fidelity and zero training bias.
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                The 4-Stage Image Processing Pipeline
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-mono">1</span>
                    Gaussian Smoothing Filter
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Convolves the raw RGB leaf input with a 5×5 Gaussian kernel (sigma=1.4) to suppress camera noise, specular sun glints, and dust particles that would otherwise trigger false edge responses.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="font-bold text-cyan-400 flex items-center gap-1.5 mb-1">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-[10px] font-mono">2</span>
                    Sobel Gradient Computation
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Applies orthogonal Sobel kernels (Kx and Ky) across the smoothed grayscale matrix to calculate edge magnitude G = sqrt(Gx² + Gy²) and gradient direction theta = arctan(Gy / Gx).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="font-bold text-purple-400 flex items-center gap-1.5 mb-1">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px] font-mono">3</span>
                    Non-Maximum Suppression (NMS)
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Scans along the gradient direction vector and suppresses all non-peak pixel values, effectively thinning broad fuzzy lesion edges down to razor-sharp 1-pixel wide ridges.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px] font-mono">4</span>
                    Hysteresis Dual Thresholding
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Applies high (T2=150) and low (T1=50) thresholds. Pixels exceeding T2 are definite edges; pixels below T1 are discarded. Pixels in between are retained only if connected to high-threshold edges.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Terminal className="w-3.5 h-3.5" /> canny_leaf_defect_detection.py
                </span>
                <span>OpenCV 4.x / NumPy</span>
              </div>
              <div className="p-4 rounded-xl bg-black/80 border border-slate-800 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed">
                <pre>{`import cv2
import numpy as np

def analyze_crop_leaf(image_path: str, low_thresh: int = 50, high_thresh: int = 150):
    """
    Identifies potentially damaged regions on crop leaves
    using Canny edge gradient analysis.
    """
    # 1. Read input image and convert to grayscale
    img_rgb = cv2.imread(image_path)
    gray = cv2.cvtColor(img_rgb, cv2.COLOR_BGR2GRAY)

    # 2. Reduce ambient sensor noise
    blurred = cv2.GaussianBlur(gray, (5, 5), sigmaX=1.4)

    # 3. Apply Canny Edge Detection with dual thresholds
    edges = cv2.Canny(blurred, threshold1=low_thresh, threshold2=high_thresh)

    # 4. Extract closed contour boundaries of defective zones
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    damaged_regions = [c for c in contours if cv2.contourArea(c) > 25]
    return edges, damaged_regions`}</pre>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
