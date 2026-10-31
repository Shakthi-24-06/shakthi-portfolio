import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Droplets, RefreshCw, Languages, Shield, Database, Users, MapPin } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface WaterBeaconSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaterBeaconSimulatorModal: React.FC<WaterBeaconSimulatorModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'public' | 'admin'>('public');
  const [lang, setLang] = useState<'en' | 'ta'>('en');
  const [stations, setStations] = useState([
    {
      id: 1,
      nameEn: 'Alwarthirunagari Community Center',
      nameTa: 'ஆழ்வார்திருநகரி பொது மையம்',
      location: 'Ward 4, North Street',
      status: 'AVAILABLE' as 'AVAILABLE' | 'EMPTY' | 'REPAIR',
      tds: 42,
      capacity: 94,
      lastUpdated: 'Just now',
    },
    {
      id: 2,
      nameEn: 'Kurumbur Primary Health Center Unit',
      nameTa: 'குரும்பூர் ஆரம்ப சுகாதார நிலையம்',
      location: 'Hospital Road',
      status: 'EMPTY' as 'AVAILABLE' | 'EMPTY' | 'REPAIR',
      tds: 55,
      capacity: 6,
      lastUpdated: '12 mins ago',
    },
    {
      id: 3,
      nameEn: 'Nazareth Bus Stand Station',
      nameTa: 'நாசரேத் பேருந்து நிலைய மையம்',
      location: 'Main Terminal',
      status: 'AVAILABLE' as 'AVAILABLE' | 'EMPTY' | 'REPAIR',
      tds: 38,
      capacity: 88,
      lastUpdated: '3 mins ago',
    },
    {
      id: 4,
      nameEn: 'Sathankulam Rural Water Point',
      nameTa: 'சாத்தான்குளம் கிராம நீர் மையம்',
      location: 'West Bazaar',
      status: 'REPAIR' as 'AVAILABLE' | 'EMPTY' | 'REPAIR',
      tds: 0,
      capacity: 0,
      lastUpdated: '25 mins ago',
    },
  ]);

  if (!isOpen) return null;

  const toggleStatus = (id: number) => {
    soundManager.playClick();
    setStations((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const nextStatus =
          s.status === 'AVAILABLE' ? 'EMPTY' : s.status === 'EMPTY' ? 'REPAIR' : 'AVAILABLE';
        return {
          ...s,
          status: nextStatus,
          capacity: nextStatus === 'AVAILABLE' ? 95 : nextStatus === 'EMPTY' ? 5 : 0,
          lastUpdated: 'Just now',
        };
      })
    );
  };

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
          className="relative w-full max-w-4xl bg-[#070e1e] border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.25)] overflow-hidden z-10 my-6 max-h-[92vh] flex flex-col"
        >
          <div className="px-5 py-4 bg-slate-950/90 border-b border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Droplets className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span>Water Beacon Portal Simulator</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                    TiDB Cloud Connected
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Smart RO Water Availability and Monitoring System
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setLang((l) => (l === 'en' ? 'ta' : 'en'));
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-1.5 hover:bg-slate-800"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
              </button>
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
          </div>

          <div className="px-5 py-2.5 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('public');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === 'public'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Public Dashboard' : 'பொது மக்கள் பார்வை'}</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('admin');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeTab === 'admin'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Admin Station Manager' : 'நிர்வாக கட்டுப்பாட்டகம்'}</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Database className="w-3 h-3 text-cyan-400" />
              <span>TiDB Cluster: Serverless-ap-southeast-1</span>
            </div>
          </div>

          <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
            {activeTab === 'public' ? (
              <>
                <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-xl p-3.5 flex items-start gap-3">
                  <Droplets className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-white">
                      {lang === 'en' ? 'Villager Notice: ' : 'பொதுமக்கள் தகவல்: '}
                    </span>
                    {lang === 'en'
                      ? 'Live telemetry is updated directly from community RO machine pressure sensors. Check water status before travelling.'
                      : 'சமூக சுத்திகரிப்பு இயந்திரங்களின் நிலை தானியங்கி உணரிகள் மூலம் உடனுக்குடன் புதுப்பிக்கப்படுகிறது.'}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stations.map((station) => (
                    <div
                      key={station.id}
                      className="glass-panel p-4 rounded-xl border border-slate-700/60 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-white text-sm">
                              {lang === 'en' ? station.nameEn : station.nameTa}
                            </h4>
                            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-cyan-400" />
                              <span>{station.location}</span>
                            </p>
                          </div>

                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${
                              station.status === 'AVAILABLE'
                                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                                : station.status === 'EMPTY'
                                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                                : 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                station.status === 'AVAILABLE'
                                  ? 'bg-emerald-400 animate-ping'
                                  : station.status === 'EMPTY'
                                  ? 'bg-amber-400'
                                  : 'bg-rose-400'
                              }`}
                            />
                            {station.status === 'AVAILABLE'
                              ? lang === 'en'
                                ? 'AVAILABLE'
                                : 'கிடைக்கிறது'
                              : station.status === 'EMPTY'
                              ? lang === 'en'
                                ? 'EMPTY'
                                : 'காலியானது'
                              : lang === 'en'
                              ? 'REPAIR'
                              : 'பழுது'}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-mono">
                              {lang === 'en' ? 'Purity (TDS)' : 'தூய்மை (TDS)'}
                            </span>
                            <span className="text-cyan-300 font-bold font-mono">
                              {station.status === 'REPAIR' ? 'N/A' : `${station.tds} PPM`}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px] uppercase font-mono">
                              {lang === 'en' ? 'Tank Reservoir' : 'சேமிப்பு'}
                            </span>
                            <span className="text-slate-200 font-bold font-mono">
                              {station.capacity}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <RefreshCw className="w-3 h-3 text-cyan-400" />
                          <span>
                            {lang === 'en' ? `Updated: ${station.lastUpdated}` : `நிலை: ${station.lastUpdated}`}
                          </span>
                        </span>
                        <span className="text-cyan-400 font-medium">
                          {station.status === 'AVAILABLE'
                            ? lang === 'en'
                              ? 'Safe to Collect Water'
                              : 'குடிநீர் பெறலாம்'
                            : lang === 'en'
                            ? 'Station Offline'
                            : 'தற்போது இயங்கவில்லை'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-3.5 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-white">
                      {lang === 'en' ? 'Admin Station Controls: ' : 'நிர்வாக கட்டுப்பாட்டகம்: '}
                    </span>
                    {lang === 'en'
                      ? 'Click the toggle button on any station to simulate changing sensor telemetry (Available -> Empty -> Repair) and see TiDB sync state update.'
                      : 'சென்சார் நிலை மாற்றத்தை உருவகப்படுத்த பொத்தானை அழுத்தவும்.'}
                  </div>
                </div>

                <div className="space-y-2">
                  {stations.map((s) => (
                    <div
                      key={s.id}
                      className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="font-bold text-white text-xs sm:text-sm">
                          {s.nameEn}
                        </div>
                        <div className="text-xs text-slate-400">
                          Current Condition: <span className="text-cyan-300 font-semibold">{s.status}</span> • Capacity: {s.capacity}%
                        </div>
                      </div>

                      <button
                        onClick={() => toggleStatus(s.id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Cycle Status</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
