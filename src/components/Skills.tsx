import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Info } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface SkillItem {
  name: string;
  category: 'Programming' | 'Frontend' | 'Backend' | 'Databases' | 'Developer Tools' | 'Core Concepts';
  icon: string;
  tagline: string;
  practicalUse: string;
  badgeColor: string;
}

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  const categories = [
    'All',
    'Programming',
    'Frontend',
    'Backend',
    'Databases',
    'Developer Tools',
    'Core Concepts',
  ];

  const skillData: SkillItem[] = [
    // Programming
    {
      name: 'Python',
      category: 'Programming',
      icon: '🐍',
      tagline: 'Versatile Core Language',
      practicalUse:
        'Engineered backend REST endpoints in Flask for the Water Beacon project and implemented OpenCV algorithms for Canny edge crop leaf diagnostics.',
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
    },
    {
      name: 'JavaScript',
      category: 'Programming',
      icon: '⚡',
      tagline: 'Dynamic Client Logic',
      practicalUse:
        'Built dynamic client-side interactions, asynchronous DOM updates, telemetry timers, and interactive UI logic for full-stack applications.',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
    },
    {
      name: 'SQL',
      category: 'Programming',
      icon: '📊',
      tagline: 'Relational Query Language',
      practicalUse:
        'Authored relational schemas, filtered multi-table queries, and maintained data integrity across MySQL and TiDB Cloud distributed nodes.',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
    },

    // Frontend
    {
      name: 'HTML5',
      category: 'Frontend',
      icon: '🌐',
      tagline: 'Semantic Web Structure',
      practicalUse:
        'Constructed clean, semantic, accessible document outlines ensuring SEO-friendly and screen-reader accessible web solutions.',
      badgeColor: 'border-orange-500/40 text-orange-300 bg-orange-500/10',
    },
    {
      name: 'CSS3',
      category: 'Frontend',
      icon: '🎨',
      tagline: 'Modern Styling & Layouts',
      practicalUse:
        'Created custom flexbox and grid layouts, glassmorphism aesthetics, fluid transitions, and media-query responsive designs.',
      badgeColor: 'border-sky-500/40 text-sky-300 bg-sky-500/10',
    },
    {
      name: 'Responsive Web Design',
      category: 'Frontend',
      icon: '📱',
      tagline: 'Cross-Device Adaptability',
      practicalUse:
        'Optimized interfaces across mobile phones, tablets, laptops, and wide screens with touch-friendly touch targets and fluid breakpoints.',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
    },

    // Backend
    {
      name: 'Flask',
      category: 'Backend',
      icon: '🧪',
      tagline: 'Lightweight Python Microframework',
      practicalUse:
        'Developed routing, request handlers, session authentication, and API endpoints connecting frontend interfaces to cloud databases.',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
    },

    // Databases
    {
      name: 'MySQL',
      category: 'Databases',
      icon: '🐬',
      tagline: 'Relational Database Engine',
      practicalUse:
        'Employed during internship at Tonyshive Company to manage structured employee personal, banking, and company asset tables.',
      badgeColor: 'border-blue-400/40 text-blue-300 bg-blue-500/10',
    },
    {
      name: 'TiDB Cloud',
      category: 'Databases',
      icon: '☁️',
      tagline: 'Distributed Cloud Database',
      practicalUse:
        'Integrated with Python Flask to power high-availability, serverless SQL storage for community water machine condition metrics in Water Beacon.',
      badgeColor: 'border-cyan-400/40 text-cyan-300 bg-cyan-500/10',
    },

    // Developer Tools
    {
      name: 'Git',
      category: 'Developer Tools',
      icon: '🌿',
      tagline: 'Distributed Version Control',
      practicalUse:
        'Tracked iterative project changes, created clean commit histories, and managed project features branch-by-branch.',
      badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
    },
    {
      name: 'GitHub',
      category: 'Developer Tools',
      icon: '🐙',
      tagline: 'Repository & Code Collaboration',
      practicalUse:
        'Published open source codebases, project documentation, issue tracking, and collaborative release management.',
      badgeColor: 'border-slate-400/40 text-slate-300 bg-slate-500/10',
    },
    {
      name: 'Visual Studio Code',
      category: 'Developer Tools',
      icon: '💻',
      tagline: 'Primary Development Environment',
      practicalUse:
        'Configured debugging workflows, linting, Python virtual environments, and workspace productivity extensions.',
      badgeColor: 'border-sky-400/40 text-sky-300 bg-sky-500/10',
    },

    // Core Concepts
    {
      name: 'CRUD Operations',
      category: 'Core Concepts',
      icon: '🔄',
      tagline: 'Create, Read, Update, Delete',
      practicalUse:
        'Implemented full lifecycle data persistence for employee records, water station telemetry, and user management systems.',
      badgeColor: 'border-emerald-400/40 text-emerald-300 bg-emerald-500/10',
    },
    {
      name: 'Version Control',
      category: 'Core Concepts',
      icon: '🔀',
      tagline: 'Change History Management',
      practicalUse:
        'Maintained structured project rollback safety, clean commit etiquette, and modular feature development practices.',
      badgeColor: 'border-indigo-400/40 text-indigo-300 bg-indigo-500/10',
    },
    {
      name: 'Database Management',
      category: 'Core Concepts',
      icon: '🗄️',
      tagline: 'Schema & Index Integrity',
      practicalUse:
        'Normalized tables, configured foreign key constraints, and ensured safe ACID-compliant transactions across user workflows.',
      badgeColor: 'border-purple-400/40 text-purple-300 bg-purple-500/10',
    },
    {
      name: 'Cloud Database Integration',
      category: 'Core Concepts',
      icon: '🌐',
      tagline: 'Serverless Cloud Connectivity',
      practicalUse:
        'Connected web services to remote cloud database clusters using encrypted SSL certificates and connection pooling.',
      badgeColor: 'border-cyan-400/40 text-cyan-300 bg-cyan-500/10',
    },
  ];

  const filteredSkills =
    selectedCategory === 'All'
      ? skillData
      : skillData.filter((s) => s.category === selectedCategory);

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full py-24 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[500px] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto z-10 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Technology Universe</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
            Tools I Work With
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Practical technologies and architectural concepts applied directly across real-world community platforms and systems.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500/25 to-purple-500/25 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                    : 'bg-slate-900/70 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  soundManager.playClick();
                  setActiveSkill(activeSkill?.name === skill.name ? null : skill);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="glass-panel p-5 rounded-2xl border border-slate-700/60 hover:border-cyan-400/50 cursor-pointer transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,240,255,0.15)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-3xl p-2 rounded-xl bg-slate-800/80 border border-slate-700/50 group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${skill.badgeColor}`}>
                      {skill.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mt-3">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-cyan-400/80 font-medium mt-0.5">
                    {skill.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {skill.practicalUse}
                  </p>
                  <div className="mt-2 flex items-center justify-end text-[10px] text-cyan-400 font-mono gap-1">
                    <Info className="w-3 h-3" />
                    <span>Real-world application</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 max-w-2xl mx-auto text-center text-xs text-slate-400">
          <span className="text-cyan-400 font-semibold">Honest & Authentic Technical Profile: </span>
          All listed competencies represent genuine practical experience from college coursework, internship responsibilities, and deployed projects.
        </div>
      </div>
    </section>
  );
};
