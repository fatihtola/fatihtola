import React from 'react';
import { 
  X, 
  Mail, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Sparkles,
  School
} from 'lucide-react';
import { TRAINER_INFO } from '../data/portalData';

interface TrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrainerModal: React.FC<TrainerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Profile */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-5 border-b border-slate-800">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-blue-500/20 ring-4 ring-blue-500/20 shrink-0">
            FT
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                EĞİTİM KOORDİNATÖRÜ
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <School className="w-3.5 h-3.5" />
                Okulumuz Öğretmen Akademisi
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              {TRAINER_INFO.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {TRAINER_INFO.title}
            </p>
          </div>
        </div>

        {/* Motto / Quote */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-slate-950 to-indigo-950/40 border border-blue-900/40 italic text-xs sm:text-sm text-blue-200">
          "{TRAINER_INFO.quote}"
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-400" />
            Eğitim Programı Hakkında
          </h4>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
            {TRAINER_INFO.bio}
          </p>
        </div>

        {/* Topics Covered */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            10 Grup Eğitimi Odak Alanları
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TRAINER_INFO.topics.map((t, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Footer */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Mail className="w-4 h-4 text-blue-400" />
            <span>E-Posta:</span>
            <a 
              href={`mailto:${TRAINER_INFO.email}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:underline font-mono"
            >
              {TRAINER_INFO.email}
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
