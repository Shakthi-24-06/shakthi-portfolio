import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, ExternalLink, Mail, MapPin, Award, BookOpen, Briefcase, Code, CheckCircle } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  const handleDownload = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-slate-100 text-sm sm:text-base">
                Shakthi Sivakumar — Official Resume
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-10 overflow-y-auto bg-slate-900 text-slate-300 space-y-8 font-sans">
            <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  SHAKTHI SIVAKUMAR
                </h1>
                <p className="text-cyan-400 font-semibold text-base mt-1">
                  Full Stack Developer
                </p>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 italic">
                  "Turning ideas into meaningful digital experiences."
                </p>
              </div>

              <div className="text-xs space-y-1 sm:text-right text-slate-400">
                <div className="flex sm:justify-end items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <a href="mailto:ssshakthi1024@gmail.com" className="hover:text-cyan-300">
                    ssshakthi1024@gmail.com
                  </a>
                </div>
                <div className="flex sm:justify-end items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Tamil Nadu, India</span>
                </div>
                <div className="flex sm:justify-end items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <a
                    href="https://github.com/Shakthi-24-06"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cyan-300"
                  >
                    github.com/Shakthi-24-06
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Profile Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                BCA graduate passionate about web development and building practical digital solutions.
                Hands-on experience in full-stack architecture utilizing Python, Flask, JavaScript, MySQL,
                and TiDB Cloud. Skilled in developing responsive interfaces, database integration, CRUD
                pipelines, and computer vision image processing algorithms.
              </p>
            </div>

            {/* Clean Education */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" /> Education
              </h2>
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      BCA (Bachelor of Computer Applications)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Govindammal Aditanar College for Women
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/30">
                      CGPA: 8.19
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">2023–2026</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      HSC (Higher Secondary Certificate)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Elliott Tuxford Girls Higher Secondary School
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs border border-purple-500/30">
                      Percentage: 85.6%
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">2022–2023</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Internship Experience
              </h2>
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      Full Stack Developer Intern
                    </h3>
                    <p className="text-xs text-cyan-300 font-medium">
                      Tonyshive Private Limited, Erode
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    May 14 – June 14
                  </span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5 pl-1">
                  <li>Developed an Employee Management System with comprehensive end-to-end functionality.</li>
                  <li>Implemented full CRUD (Create, Read, Update, Delete) database workflows.</li>
                  <li>Managed sensitive employee personal, banking, and company asset records securely.</li>
                  <li>Programmed automated PDF and Excel reporting export functionality for administrative staff.</li>
                </ul>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['HTML', 'CSS', 'PHP', 'MySQL'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-slate-700/80 text-[10px] text-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Projects */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <Code className="w-4 h-4" /> Featured Projects
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white text-sm">
                        Water Beacon — Smart RO Water Availability and Monitoring System
                      </h3>
                      <p className="text-xs text-slate-400">
                        Web-based Platform
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300">
                    A web-based application that allows villagers to check the availability of drinking water at RO machines before visiting the station. Features RO machine availability monitoring (Available, Empty, Repair status), admin & public dashboards, last updated timestamp, and responsive interface.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['HTML', 'CSS', 'JavaScript', 'Python', 'Flask', 'TiDB Cloud'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-[10px] border border-cyan-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-2">
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      Leaf Disease Detection Using Canny Edge Algorithm
                    </h3>
                    <p className="text-xs text-slate-400">
                      Image Processing Application
                    </p>
                  </div>
                  <p className="text-xs text-slate-300">
                    An image-processing application that uses Canny Edge Detection to identify potentially damaged regions in crop leaf images and display results with remedies through a 4-stage pipeline: Gaussian Blur, Canny Edge Detection, Mask Overlay, and Prediction & Remedy.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Python', 'OpenCV', 'Image Processing', 'Canny Edge Detection'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] border border-emerald-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                  <span className="font-semibold text-white block mb-1">Programming:</span>
                  <span className="text-slate-400">Python, JavaScript, SQL</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                  <span className="font-semibold text-white block mb-1">Frontend:</span>
                  <span className="text-slate-400">HTML5, CSS3, Responsive Web Design</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                  <span className="font-semibold text-white block mb-1">Backend:</span>
                  <span className="text-slate-400">Python, Flask</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                  <span className="font-semibold text-white block mb-1">Databases:</span>
                  <span className="text-slate-400">MySQL, TiDB Cloud</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                  <span className="font-semibold text-white block mb-1">Developer Tools:</span>
                  <span className="text-slate-400">Git, GitHub, Visual Studio Code</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
                  <span className="font-semibold text-white block mb-1">Core Concepts:</span>
                  <span className="text-slate-400">CRUD Operations, Version Control, Database Management, Cloud Database Integration</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
