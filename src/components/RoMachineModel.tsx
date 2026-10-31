import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Languages } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export type MachineStatus = 'AVAILABLE' | 'EMPTY' | 'REPAIR';
export type Language = 'en' | 'ta';

interface RoMachineModelProps {
  onStatusChange?: (status: MachineStatus) => void;
}

export const RoMachineModel: React.FC<RoMachineModelProps> = ({ onStatusChange }) => {
  const [status, setStatus] = useState<MachineStatus>('AVAILABLE');
  const [lang, setLang] = useState<Language>('en');

  const handleStatusChange = (newStatus: MachineStatus) => {
    setStatus(newStatus);
    soundManager.playClick();
    if (newStatus === 'AVAILABLE') {
      soundManager.playWaterDispense();
    }
    onStatusChange?.(newStatus);
  };

  const toggleLanguage = () => {
    soundManager.playClick();
    setLang((prev) => (prev === 'en' ? 'ta' : 'en'));
  };

  const statusConfig = {
    AVAILABLE: {
      color: '#10b981',
      badgeBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400',
      labelEn: 'AVAILABLE',
      labelTa: 'கிடைக்கிறது',
      descEn: 'TDS: 42 PPM • Safe Drinking Water Ready',
      descTa: 'TDS: 42 PPM • தூய குடிநீர் தயார்',
      tankLevel: 94,
    },
    EMPTY: {
      color: '#f59e0b',
      badgeBg: 'bg-amber-500/15 border-amber-500/40 text-amber-400',
      labelEn: 'EMPTY',
      labelTa: 'காலியானது',
      descEn: 'Raw Tank Empty • Inflow Scheduled in 45m',
      descTa: 'நீர் இருப்பு இல்லை • 45 நிமிடங்களில் நிரம்பும்',
      tankLevel: 8,
    },
    REPAIR: {
      color: '#ef4444',
      badgeBg: 'bg-rose-500/15 border-rose-500/40 text-rose-400',
      labelEn: 'REPAIR',
      labelTa: 'பழுதுபார்ப்பு',
      descEn: 'Membrane Filter Service in Progress',
      descTa: 'வடிகட்டி பராமரிப்பு பணியில் உள்ளது',
      tankLevel: 0,
    },
  }[status];

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col items-center">
      {/* 1. Header controls: Status Switcher & Bilingual Toggle */}
      <div className="w-full flex items-center justify-between gap-2 mb-4 px-2">
        <div className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-xl bg-slate-900/90 border border-slate-700/60 shadow-lg">
          <button
            onClick={() => handleStatusChange('AVAILABLE')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              status === 'AVAILABLE'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {lang === 'en' ? 'Available' : 'கிடைக்கிறது'}
          </button>

          <button
            onClick={() => handleStatusChange('EMPTY')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              status === 'EMPTY'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            {lang === 'en' ? 'Empty' : 'காலியானது'}
          </button>

          <button
            onClick={() => handleStatusChange('REPAIR')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              status === 'REPAIR'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            {lang === 'en' ? 'Repair' : 'பழுது'}
          </button>
        </div>

        <button
          onClick={toggleLanguage}
          className="px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-950/40 transition-all flex items-center gap-1.5 text-xs font-medium"
          title="Toggle Language (English / தமிழ்)"
        >
          <Languages className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
        </button>
      </div>

      {/* 2. Realistic Community RO Dispenser SVG Unit */}
      <div className="relative w-full aspect-[4/5] max-w-[380px] sm:max-w-[420px] filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
        <svg
          viewBox="0 0 400 520"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="chassisGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="15%" stopColor="#475569" />
              <stop offset="35%" stopColor="#cbd5e1" />
              <stop offset="65%" stopColor="#94a3b8" />
              <stop offset="85%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            <linearGradient id="panelBlueGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>

            <linearGradient id="acrylicDarkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#090d16" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            <linearGradient id="waterFlowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.6" />
            </linearGradient>

            <filter id="roGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Machine Outer Frame */}
          <rect
            x="40"
            y="20"
            width="320"
            height="460"
            rx="16"
            fill="url(#chassisGrad)"
            stroke="#64748b"
            strokeWidth="2"
          />

          {/* Top Header Canopy */}
          <rect x="52" y="32" width="296" height="68" rx="8" fill="url(#panelBlueGrad)" />
          <line x1="56" y1="36" x2="344" y2="36" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />

          <text x="200" y="58" fill="#ffffff" fontSize="13" fontWeight="800" textAnchor="middle" letterSpacing="0.8">
            {lang === 'en' ? 'SMART RO WATER DISPENSER' : 'ஸ்மார்ட் குடிநீர் சுத்திகரிப்பு மையம்'}
          </text>
          <text x="200" y="76" fill="#38bdf8" fontSize="10" fontWeight="600" textAnchor="middle" letterSpacing="0.5">
            {lang === 'en' ? 'WATER BEACON • COMMUNITY AUTOMATION' : 'வாட்டர் பீக்கான் • கிராம சேவை'}
          </text>
          <circle cx="70" cy="65" r="4" fill="#00f0ff" filter="url(#roGlow)" />
          <circle cx="330" cy="65" r="4" fill="#00f0ff" filter="url(#roGlow)" />

          {/* Machine Status Beacon Indicator Light */}
          <g transform="translate(200, 115)">
            <rect x="-85" y="-12" width="170" height="24" rx="12" fill="#030712" stroke={statusConfig.color} strokeWidth="1.5" />
            <circle cx="-65" cy="0" r="5" fill={statusConfig.color} filter="url(#roGlow)" />
            <text x="0" y="4" fill={statusConfig.color} fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="1">
              ● {lang === 'en' ? statusConfig.labelEn : statusConfig.labelTa}
            </text>
          </g>

          {/* Digital Telemetry LCD Screen */}
          <rect x="65" y="138" width="270" height="74" rx="8" fill="url(#acrylicDarkGrad)" stroke="#1e293b" strokeWidth="1.5" />
          
          <g transform="translate(75, 150)">
            <text x="5" y="15" fill="#64748b" fontSize="8" fontWeight="600">
              {lang === 'en' ? 'WATER PURITY' : 'தூய்மை அளவு'}
            </text>
            <text x="5" y="34" fill="#00f0ff" fontSize="16" fontWeight="bold" fontFamily="monospace">
              {status === 'REPAIR' ? 'ERR' : '42 PPM'}
            </text>
            <text x="5" y="48" fill="#38bdf8" fontSize="8">
              {lang === 'en' ? 'WHO Standard: <300' : 'WHO தரம்: <300'}
            </text>

            <line x1="125" y1="5" x2="125" y2="52" stroke="#1e293b" strokeWidth="1" />

            <text x="140" y="15" fill="#64748b" fontSize="8" fontWeight="600">
              {lang === 'en' ? 'STORAGE TANK' : 'நீர் சேமிப்பு'}
            </text>
            <rect x="140" y="24" width="105" height="10" rx="3" fill="#1e293b" />
            <rect
              x="140"
              y="24"
              width={statusConfig.tankLevel}
              height="10"
              rx="3"
              fill={statusConfig.color}
              filter="url(#roGlow)"
              style={{ transition: 'width 0.6s ease' }}
            />
            <text x="140" y="48" fill="#94a3b8" fontSize="8" fontFamily="monospace">
              {lang === 'en' ? `Capacity: ${statusConfig.tankLevel}%` : `அளவு: ${statusConfig.tankLevel}%`}
            </text>
          </g>

          {/* Dispensing Niche / Alcove */}
          <rect x="80" y="225" width="240" height="200" rx="12" fill="#090d16" stroke="#334155" strokeWidth="1.5" />
          <rect x="90" y="235" width="220" height="180" rx="6" fill="#0b1120" />

          {/* Stainless Steel Water Dispensing Tap */}
          <g id="spigot" transform="translate(200, 240)">
            <rect x="-8" y="0" width="16" height="22" rx="2" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="0.8" />
            <path d="M-10 22 C -10 32, 10 32, 10 22 Z" fill="#cbd5e1" />
            <rect x="-5" y="26" width="10" height="12" rx="2" fill="#e2e8f0" stroke="#64748b" strokeWidth="0.5" />
            <circle cx="0" cy="38" r="4.5" fill="#00f0ff" opacity="0.85" filter="url(#roGlow)" />
          </g>

          {/* Water Dispensing Flow Stream */}
          {status === 'AVAILABLE' && (
            <g id="water-stream" transform="translate(200, 278)">
              <rect x="-3" y="0" width="6" height="110" rx="3" fill="url(#waterFlowGrad)" filter="url(#roGlow)" />
              <circle cx="-1" cy="30" r="2" fill="#ffffff" opacity="0.9" />
              <circle cx="1.5" cy="70" r="2.5" fill="#ffffff" opacity="0.9" />
              <circle cx="-0.5" cy="98" r="3" fill="#ffffff" opacity="0.9" />
              <ellipse cx="0" cy="112" rx="16" ry="5" fill="#38bdf8" opacity="0.5" className="animate-ping" />
              <ellipse cx="0" cy="112" rx="26" ry="7" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
            </g>
          )}

          {/* Empty / Repair Notice in Dispensing Bay */}
          {status !== 'AVAILABLE' && (
            <g transform="translate(200, 310)">
              <circle cx="0" cy="0" r="28" fill="#1e1b4b" stroke={statusConfig.color} strokeWidth="1.5" />
              {status === 'EMPTY' ? (
                <text x="0" y="7" fill="#f59e0b" fontSize="22" textAnchor="middle">⚠️</text>
              ) : (
                <text x="0" y="7" fill="#ef4444" fontSize="22" textAnchor="middle">🛠️</text>
              )}
              <text x="0" y="48" fill={statusConfig.color} fontSize="11" fontWeight="bold" textAnchor="middle">
                {lang === 'en' ? statusConfig.descEn : statusConfig.descTa}
              </text>
            </g>
          )}

          {/* Stainless Steel Drip Grate */}
          <g transform="translate(95, 395)">
            <rect x="0" y="0" width="210" height="20" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />
            {Array.from({ length: 14 }).map((_, i) => (
              <line
                key={i}
                x1={15 + i * 14}
                y1="4"
                x2={15 + i * 14}
                y2="16"
                stroke="#0f172a"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* Push Button to Dispense */}
          <g
            transform="translate(200, 448)"
            className="cursor-pointer"
            onClick={() => handleStatusChange(status === 'AVAILABLE' ? 'EMPTY' : 'AVAILABLE')}
          >
            <circle cx="0" cy="0" r="16" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="0" cy="0" r="12" fill="#0369a1" />
            <text x="0" y="4" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">💧</text>
          </g>
          <text x="200" y="475" fill="#94a3b8" fontSize="8.5" textAnchor="middle">
            {lang === 'en' ? 'Tap Sensor / Push Dispenser' : 'குடிநீர் பெற அழுத்தவும்'}
          </text>
        </svg>

        {/* 3. Floating Live Telemetry Badge */}
        <motion.div
          className="absolute -bottom-4 right-0 sm:-right-4 glass-panel px-3.5 py-2 rounded-xl border border-cyan-500/40 shadow-xl flex items-center gap-2.5"
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 block" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 absolute inset-0 animate-ping opacity-75" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
              TiDB Cloud Telemetry
            </div>
            <div className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
              <span>{lang === 'en' ? 'Live Station Sync: 2s ago' : 'நேரலை புதுப்பிப்பு: 2 வினாடி'}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4. Feature Summary Capsule */}
      <div className="mt-6 w-full max-w-sm glass-panel p-3 rounded-xl border border-white/10 text-center">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-200">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === 'en' ? 'Three State Monitoring System' : 'மூன்று நிலை கண்காணிப்பு முறை'}</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          {lang === 'en'
            ? 'Villagers check real-time water conditions online before walking to the community RO plant.'
            : 'கிராம மக்கள் சுத்திகரிப்பு மையத்திற்கு செல்லும் முன் நீர் இருப்பை இணையத்தில் அறிந்து கொள்ளலாம்.'}
        </p>
      </div>
    </div>
  );
};
