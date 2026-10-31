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
                  <span>Leaf Disease Detection Pipeline</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                    OpenCV • Python
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Four-Stage Image Processing Workflow
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
                <span className="font-bold text-white">Algorithm Overview: </span>
                An image-processing application that uses Canny Edge Detection to identify potentially damaged regions in crop leaf images and display results with remedies.
              </div>
            </div>

            {/* The Exact 4 Stages */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                The Four-Stage Image Processing Workflow
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* STEP 01 */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-mono">01</span>
                    STEP 01 — GAUSSIAN BLUR
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    <strong>Description:</strong> Apply Gaussian Blur to the input leaf image to reduce noise and smooth the image before edge detection.
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    <strong>Visual:</strong> Shows the original leaf image and its Gaussian-blurred result.
                  </p>
                </div>

                {/* STEP 02 */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-[10px] font-mono">02</span>
                    STEP 02 — CANNY EDGE DETECTION
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    <strong>Description:</strong> Apply Canny Edge Detection to identify edges and boundaries in the processed leaf image.
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    <strong>Visual:</strong> Displays the black-and-white edge detection output.
                  </p>
                </div>

                {/* STEP 03 */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-purple-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px] font-mono">03</span>
                    STEP 03 — MASK OVERLAY
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    <strong>Description:</strong> Apply the detected edge or damage-region mask as an overlay on the original leaf image to highlight the detected regions.
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    <strong>Visual:</strong> Shows the original leaf image with the processed mask overlay.
                  </p>
                </div>

                {/* STEP 04 */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px] font-mono">04</span>
                    STEP 04 — PREDICTION AND REMEDY
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    <strong>Description:</strong> Display the application's actual detection result and the corresponding suggested remedy.
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    <strong>Visual:</strong> Shows the final result and remedy information in a result panel.
                  </p>
                </div>
              </div>
            </div>

            {/* Python OpenCV Implementation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Terminal className="w-3.5 h-3.5" /> leaf_disease_canny_pipeline.py
                </span>
                <span>OpenCV 4.x / NumPy</span>
              </div>
              <div className="p-4 rounded-xl bg-black/80 border border-slate-800 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed">
                <pre>{`import cv2
import numpy as np

def run_leaf_disease_pipeline(image_path: str):
    # Step 1: Read input and apply Gaussian Blur for noise reduction
    image_rgb = cv2.imread(image_path)
    gray = cv2.cvtColor(image_rgb, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 1.5)

    # Step 2: Apply Canny Edge Detection to identify boundaries
    edges = cv2.Canny(blurred, threshold1=50, threshold2=150)

    # Step 3: Create damage-region mask and overlay on original image
    kernel = np.ones((3, 3), np.uint8)
    dilated_edges = cv2.dilate(edges, kernel, iterations=1)
    mask_overlay = image_rgb.copy()
    mask_overlay[dilated_edges > 0] = [0, 0, 255] # Highlight detected regions

    # Step 4: Determine detection outcome and return suggested remedy
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    damage_area = sum(cv2.contourArea(c) for c in contours if cv2.contourArea(c) > 20)

    result = {
        "status": "Damaged Regions Detected" if damage_area > 50 else "Healthy Leaf",
        "damage_area": damage_area,
        "remedy": (
            "Prune infected foliage, apply recommended copper-based organic spray, "
            "and maintain proper soil drainage."
            if damage_area > 50 else "No treatment required. Maintain standard crop care."
        )
    }
    return blurred, edges, mask_overlay, result`}</pre>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
