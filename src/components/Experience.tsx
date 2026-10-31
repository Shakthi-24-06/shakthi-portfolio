import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, FileSpreadsheet, Database, Server, Layers, Sparkles } from 'lucide-react';
import { AnimeCharacter } from './AnimeCharacter';

export const Experience: React.FC = () => {
  const responsibilities = [
    {
      title: 'Employee Management System Architecture',
      description:
        'Engineered an end-to-end web application to manage workforce records across administrative departments.',
      icon: Server,
    },
    {
      title: 'Full CRUD Database Implementation',
      description:
        'Constructed complete Create, Read, Update, and Delete operations linking PHP backend scripts directly to MySQL relational schemas.',
      icon: Database,
    },
    {
      title: 'Personal, Bank & Asset Record Security',
      description:
        'Structured confidential tables ensuring secure handling of employee identity, sensitive banking details, and company asset allocations.',
      icon: Layers,
    },
    {
      title: 'Automated PDF & Excel Export Engine',
      description:
        'Programmed automated data export pipelines generating downloadable payroll and employee asset reports for company HR and management.',
      icon: FileSpreadsheet,
    },
  ];

  return (
    <section
      id="experience"
      className="relative min-h-screen w-full py-24 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/3 w-[650px] h-[550px] rounded-full bg-purple-600/10 blur-[170px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto z-10 space-y-16">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
            My Professional Journey
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Commercial software development experience delivering production-ready business management tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Character */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative">
              <AnimeCharacter pose="experience" size="lg" interactive={true} />

              <motion.div
                className="absolute -top-3 -right-3 glass-panel p-3.5 rounded-2xl border border-purple-500/40 shadow-xl flex items-center gap-2.5 max-w-[210px]"
                animate={{ y: [-4, 4, -4], rotate: [1, -1, 1] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 flex-shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                    Internship
                  </div>
                  <div className="text-xs font-bold text-white">
                    Tonyshive Pvt Ltd
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-3 -left-3 glass-panel p-3 rounded-xl border border-cyan-500/40 shadow-xl flex items-center gap-2"
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-cyan-300">
                  PDF & Excel Export Ready
                </span>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Experience Details */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-3xl border border-purple-500/30 p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(168,85,247,0.15)] relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800">
                <div>
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold">
                    FULL STACK DEVELOPER INTERN
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-['Outfit']">
                    Tonyshive Private Limited
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" />
                      <span>Erode, Tamil Nadu</span>
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-cyan-400 font-medium">Employee Management System</span>
                  </div>
                </div>

                <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-purple-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>May 2025 – June 2025</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Key Technical Responsibilities
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {responsibilities.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/30 transition-all flex flex-col justify-between"
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 mt-0.5">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="font-bold text-white text-xs sm:text-sm">
                              {item.title}
                            </h5>
                            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Technologies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['HTML', 'CSS','JavaScript', 'PHP', 'MySQL'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-purple-500/25 text-purple-300 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
