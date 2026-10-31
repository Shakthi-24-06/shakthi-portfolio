import React, { useState } from 'react';
import { Sparkles, Eye, CheckCircle2, Layers } from 'lucide-react';
import { RoMachineModel } from './RoMachineModel';
import { LeafScanner } from './LeafScanner';
import { WaterBeaconSimulatorModal } from './WaterBeaconSimulatorModal';
import { LeafAlgorithmModal } from './LeafAlgorithmModal';
import { soundManager } from '../utils/soundEffects';
import { GithubIcon } from './Icons';

export const Projects: React.FC = () => {
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const [isLeafModalOpen, setIsLeafModalOpen] = useState(false);

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full py-24 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full bg-cyan-600/10 blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-emerald-600/10 blur-[180px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto z-10 space-y-16">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Featured Innovations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
            Turning Ideas Into Real Solutions
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Practical, impactful software engineering projects solving genuine challenges in community water infrastructure and agricultural diagnostics.
          </p>
        </div>

        <div className="space-y-20">
          {/* PROJECT 01 — WATER BEACON (PROMINENT MAIN PROJECT) */}
          <div className="relative glass-panel rounded-3xl border border-cyan-500/40 p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,102,255,0.2)] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 shadow-[0_0_15px_#00f0ff]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="w-full">
                  <RoMachineModel />
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
                      PROJECT 01 • FLAGSHIP
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Real-World Community IoT</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
                    WATER BEACON
                  </h3>
                  <p className="text-base sm:text-lg text-cyan-300 font-semibold mt-1">
                    Smart RO Water Availability and Monitoring System
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  A web-based platform that helps villagers check the availability of drinking water at RO machines before visiting the station. Prevents unnecessary walking trips, long queues, and wasted journeys by synchronizing real-time telemetry from remote water stations.
                </p>

                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                    System Features & Capabilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>RO machine status monitoring</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Available, Empty, Repair states</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>Public villager dashboard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>Admin maintenance manager</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <span>Real-time last updated info</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <span>English & Tamil language support</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                      <span>Fully responsive mobile & desktop interface</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['HTML', 'CSS', 'JavaScript', 'Python', 'Flask', 'TiDB Cloud'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setIsWaterModalOpen(true);
                    }}
                    onMouseEnter={() => soundManager.playHover()}
                    className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Launch Live Interactive Simulator</span>
                  </button>

                  <a
                    href="https://github.com/Shakthi-24-06"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundManager.playHover()}
                    className="px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 glass-panel border border-slate-700 hover:border-cyan-400 hover:text-cyan-300 transition-all flex items-center gap-2"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub Profile</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT 02 — LEAF DISEASE DETECTION */}
          <div className="relative glass-panel rounded-3xl border border-emerald-500/40 p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(16,185,129,0.15)] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 shadow-[0_0_15px_#10b981]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6 flex flex-col items-center">
                <div className="w-full">
                  <LeafScanner />
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                      PROJECT 02
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Computer Vision & Image Processing</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
                    LEAF DISEASE DETECTION
                  </h3>
                  <p className="text-base sm:text-lg text-emerald-300 font-semibold mt-1">
                    Leaf Disease Detection Using Canny Edge Algorithm
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  An image-processing application that highlights potentially damaged regions in crop leaf images. Uses multi-stage edge detection with Gaussian smoothing, Sobel gradients, non-maximum suppression, and hysteresis thresholding to accurately delineate damaged botanical boundaries without neural network overhead.
                </p>

                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                    Key Capabilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Crop leaf image processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Canny Edge Detection</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>Identification of potentially damaged regions</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <span>Noise-resilient gradient thresholding</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'OpenCV', 'Image Processing'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setIsLeafModalOpen(true);
                    }}
                    onMouseEnter={() => soundManager.playHover()}
                    className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-400 hover:from-emerald-200 hover:to-cyan-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Inspect Algorithm Pipeline</span>
                  </button>

                  <a
                    href="https://github.com/Shakthi-24-06"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundManager.playHover()}
                    className="px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 glass-panel border border-slate-700 hover:border-emerald-400 hover:text-emerald-300 transition-all flex items-center gap-2"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub Profile</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WaterBeaconSimulatorModal
        isOpen={isWaterModalOpen}
        onClose={() => setIsWaterModalOpen(false)}
      />

      <LeafAlgorithmModal
        isOpen={isLeafModalOpen}
        onClose={() => setIsLeafModalOpen(false)}
      />
    </section>
  );
};
