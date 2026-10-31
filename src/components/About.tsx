import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Lightbulb, Code2, Sparkles, Calendar } from 'lucide-react';
import { AnimeCharacter } from './AnimeCharacter';
import { soundManager } from '../utils/soundEffects';

export const About: React.FC = () => {
  const educationMilestones = [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Govindammal Aditanar College for Women',
      duration: '2023 – 2026',
      score: 'CGPA: 8.19',
      scoreBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      description:
        'Focused on database architecture, web programming, algorithms, and practical software engineering. Developed major projects addressing real community needs.',
      skillsLearned: ['Python', 'SQL & Relational DBs', 'Web Architecture', 'Software Engineering'],
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Elliott Tuxford Girls Higher Secondary School',
      duration: '2022 – 2023',
      score: '85.6%',
      scoreBadge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      description:
        'Completed higher secondary education with strong analytical foundations in Computer Science and Mathematics, laying the groundwork for software development.',
      skillsLearned: ['Computer Science Fundamentals', 'Problem Solving', 'Mathematics'],
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

        {/* Content Layout: Character in About Pose + Info Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Character in Thoughtful / Creative Pose */}
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

          {/* Right Column: Interactive Education Visual Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold text-white font-['Outfit']">
                Education & Academic Foundations
              </h3>
            </div>

            {/* Visual Timeline Container */}
            <div className="relative border-l-2 border-cyan-500/30 pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-8">
              {educationMilestones.map((edu, idx) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="relative glass-panel p-5 sm:p-6 rounded-2xl border border-slate-700/60 hover:border-cyan-500/40 transition-all group"
                >
                  {/* Glowing Milestone Marker Node on the line */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full bg-[#030712] border-2 border-cyan-400 shadow-[0_0_12px_#00f0ff] group-hover:scale-125 transition-transform" />

                  {/* Header Row: Degree, Score & Duration */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-xs sm:text-sm text-cyan-400/90 font-medium">
                        {edu.institution}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${edu.scoreBadge}`}>
                        {edu.score}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {edu.duration}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    {edu.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2">
                    {edu.skillsLearned.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
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
