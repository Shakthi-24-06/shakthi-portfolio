import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Lightbulb, Code2, Sparkles, Calendar, Award } from 'lucide-react';
import { AnimeCharacter } from './AnimeCharacter';
import { soundManager } from '../utils/soundEffects';

export const About: React.FC = () => {
  const educationItems = [
    {
      heading: 'College',
      institution: 'Govindammal Aditanar College for Women',
      qualification: 'Bachelor of Computer Applications (BCA)',
      year: '2023–2026',
      scoreLabel: 'CGPA',
      score: '8.19',
      scoreBadge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]',
    },
    {
      heading: 'School',
      institution: 'Elliott Tuxford Girls Higher Secondary School',
      qualification: 'HSC',
      year: '2022–2023',
      scoreLabel: 'Percentage',
      score: '85.6%',
      scoreBadge: 'bg-purple-500/15 text-purple-300 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]',
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-24 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-cyan-600/5 blur-[160px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Personal Introduction</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
            More Than Code.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">
              A Journey of Creativity.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            "I'm Shakthi Sivakumar, a BCA graduate passionate about web development and building practical digital solutions. I enjoy exploring new technologies, solving real-world problems, and transforming ideas into useful applications."
          </p>
        </div>

        {/* Content Layout: Character in About Pose + Compact Clean Education Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Character in Thoughtful Pose */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative">
              <AnimeCharacter pose="about" size="lg" interactive={true} />

              {/* Floating Philosophy Card */}
              <motion.div
                className="absolute -top-4 -left-4 glass-panel p-3 rounded-xl border border-cyan-500/30 shadow-xl max-w-[190px]"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-xs">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Real-World Focus</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Building software that solves tangible problems for real people.
                </p>
              </motion.div>

              {/* Floating Clean Code Card */}
              <motion.div
                className="absolute -bottom-4 -right-4 glass-panel p-3 rounded-xl border border-purple-500/30 shadow-xl max-w-[190px]"
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="flex items-center gap-1.5 text-purple-300 font-bold text-xs">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Clean Engineering</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Responsive, accessible, and structured codebases.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Clean Compact Education Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5 mb-2">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
                Education
              </h3>
            </div>

            {/* Clean Compact Cards */}
            <div className="space-y-4">
              {educationItems.map((edu, idx) => (
                <motion.div
                  key={edu.heading}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="glass-panel p-6 rounded-2xl border border-slate-700/60 hover:border-cyan-500/40 transition-all duration-300 shadow-lg group hover:shadow-[0_10px_30px_rgba(0,240,255,0.15)] flex flex-col justify-between"
                >
                  {/* Card Header Tag: Heading (College / School) & Year */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
                    <span className="text-xs font-mono tracking-wider font-bold text-cyan-400 uppercase">
                      {edu.heading}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{edu.year}</span>
                    </span>
                  </div>

                  {/* Institution Name & Course / Qualification beneath */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-8 space-y-1.5">
                      <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {edu.institution}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 font-medium">
                        {edu.qualification}
                      </p>
                    </div>

                    {/* Academic Score Pill */}
                    <div className="sm:col-span-4 flex sm:justify-end">
                      <div className={`px-4 py-2.5 rounded-xl border flex flex-col items-center sm:items-end justify-center ${edu.scoreBadge}`}>
                        <span className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1">
                          <Award className="w-3 h-3 text-cyan-400" />
                          <span>{edu.scoreLabel}</span>
                        </span>
                        <span className="text-base sm:text-lg font-extrabold font-mono text-white">
                          {edu.score}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
