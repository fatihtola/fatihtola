import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  ExternalLink, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  FileText,
  Lock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { WeekSession } from '../types';
import { copyTextToClipboard } from '../utils/clipboard';

interface CurriculumSectionProps {
  weeks: WeekSession[];
  onOpenAddContentModal: () => void;
  onEditWeek: (week: WeekSession) => void;
  onDeleteWeek: (weekId: string) => void;
  isAdmin: boolean;
  onOpenAdminLogin: (reason?: string) => void;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({
  weeks,
  onOpenAddContentModal,
  onEditWeek,
  onDeleteWeek,
  isAdmin,
  onOpenAdminLogin
}) => {
  const [expandedWeekId, setExpandedWeekId] = useState<string | null>(weeks[0]?.id || null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const toggleWeek = (id: string) => {
    setExpandedWeekId(prev => prev === id ? null : id);
  };

  const handleAddContentClick = () => {
    if (!isAdmin) {
      onOpenAdminLogin('Yeni eğitim oturumu veya müfredat içeriği eklemek için lütfen yönetici girişi yapınız.');
      return;
    }
    onOpenAddContentModal();
  };

  const handleEditWeekClick = (week: WeekSession) => {
    if (!isAdmin) {
      onOpenAdminLogin('Oturum içeriğini düzenlemek için lütfen yönetici girişi yapınız.');
      return;
    }
    onEditWeek(week);
  };

  const copyPrompt = async (promptText: string, id: string) => {
    const success = await copyTextToClipboard(promptText);
    if (success) {
      setCopiedPromptId(id);
      setTimeout(() => setCopiedPromptId(null), 2500);
    }
  };

  const categories = [
    { id: 'all', label: 'Tüm Oturumlar' },
    { id: 'temel', label: 'Temel & İstem' },
    { id: 'degerlendirme', label: 'Ölçme & Sınav' },
    { id: 'multimodal', label: 'Görsel & Tasarım' },
    { id: 'icerik', label: 'Sunum & İçerik' },
    { id: 'asistan', label: 'Özel Botlar' },
    { id: 'proje', label: 'Proje & Sunum' }
  ];

  const filteredWeeks = filterCategory === 'all' 
    ? weeks 
    : weeks.filter(w => w.category === filterCategory);

  return (
    <div className="space-y-8" id="curriculum-modules-section">
      {/* Header Banner */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Haftalık Eğitim Oturumları & Müfredat
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Haftalık 40 dakikalık uygulamalı atölye içerikleri, adım adım oturum akışı ve hazır istemler.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
          {isAdmin && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Düzenleme Yetkisi Aktif</span>
            </div>
          )}

          {isAdmin && (
            <button
              id="add-new-week-btn"
              onClick={handleAddContentClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yeni Oturum / İçerik Ekle</span>
            </button>
          )}
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
              filterCategory === cat.id
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/40 shadow-sm'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Weeks Accordion / List */}
      <div className="space-y-4">
        {filteredWeeks.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <Calendar className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-400 font-medium">Bu kategoride henüz oturum bulunamadı.</p>
            {isAdmin && (
              <button
                onClick={handleAddContentClick}
                className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 text-xs font-medium text-white shadow-md hover:bg-blue-500 transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>İlk İçeriği Ekle</span>
              </button>
            )}
          </div>
        ) : (
          filteredWeeks.map((week) => {
            const isExpanded = expandedWeekId === week.id;

            return (
              <div
                key={week.id}
                id={`week-session-card-${week.id}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'bg-slate-900/90 border-blue-700/60 shadow-xl'
                    : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Accordion Header */}
                <div
                  onClick={() => toggleWeek(week.id)}
                  className="p-4 sm:p-5 cursor-pointer flex items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    {/* Week Number Badge */}
                    <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 flex flex-col items-center justify-center text-blue-400 shrink-0">
                      <span className="text-[10px] font-mono leading-none">HF</span>
                      <span className="text-sm font-extrabold leading-tight">{week.weekNumber}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-white hover:text-blue-300 transition-colors">
                          {week.title}
                        </h4>
                        {week.customAdded && (
                          <span className="text-[10px] font-mono font-medium px-2 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            Özel Eklenen
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-blue-400" />
                          {week.duration}
                        </span>
                        <span>•</span>
                        <span className="line-clamp-1 max-w-md text-slate-400 font-light">
                          {week.summary}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-blue-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content Details */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-6">
                    {/* Action Bar for Trainer / Admin */}
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditWeekClick(week);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                      >
                        {isAdmin ? <Edit3 className="w-3.5 h-3.5 text-blue-400" /> : <Lock className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{isAdmin ? 'İçeriği Düzenle' : 'Düzenle (Yönetici)'}</span>
                      </button>
                      {week.customAdded && isAdmin && (
                        deleteConfirmId === week.id ? (
                          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-red-950/60 border border-red-800/60 text-xs">
                            <span className="text-[11px] text-red-300 px-1.5 font-medium">Silinsin mi?</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirmId(null);
                                onDeleteWeek(week.id);
                              }}
                              className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white font-semibold text-[11px] transition-colors"
                            >
                              Evet
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirmId(null);
                              }}
                              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
                            >
                              Vazgeç
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirmId(week.id);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/40 text-red-300 text-xs font-medium border border-red-800/40 transition-colors"
                            title="Oturumu Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Sil</span>
                          </button>
                        )
                      )}
                    </div>

                    {/* Kazanımlar (Learning Outcomes) */}
                    <div>
                      <h5 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Bu 40 Dakikalık Oturumun Kazanımları
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {week.learningOutcomes.map((outcome, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 40 Dakika Oturum Akışı */}
                    <div>
                      <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" />
                        40 Dakikalık Atölye Zaman Akışı (1 Ders Saati)
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {week.sessionFlow.map((flow, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 relative"
                          >
                            <span className="text-[11px] font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                              {flow.minuteRange}
                            </span>
                            <div className="text-xs font-bold text-slate-200 mt-2">
                              {flow.activity}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                              {flow.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Tools & Practical Exercise */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Tools to Use */}
                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                        <h6 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                          Oturumda Kullanılacak Araçlar
                        </h6>
                        <div className="space-y-2">
                          {week.keyTools.map((t, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                              <span className="font-semibold text-white">{t.name}</span>
                              <span className="text-slate-400 text-[11px] hidden sm:inline">{t.purpose}</span>
                              <a
                                href={t.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-[11px] font-medium"
                              >
                                <span>Aç</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Practical Homework / Exercise */}
                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                        <h6 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          Öğretmen Uygulama Görevi
                        </h6>
                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800/80">
                          {week.practicalExercise}
                        </p>
                      </div>
                    </div>

                    {/* Sample Prompt with Copy Button */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-blue-900/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          Oturum İçin Örnek Pedagojik Prompt (Hemen Kopyala & Test Et)
                        </span>
                        <button
                          onClick={() => copyPrompt(week.samplePrompt, week.id)}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-all active:scale-95"
                        >
                          {copiedPromptId === week.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>Kopyalandı!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>İstemi Kopyala</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-3.5 rounded-lg border border-slate-800 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        {week.samplePrompt}
                      </pre>
                    </div>

                    {/* Materials & Downloadable Links */}
                    {week.materials && week.materials.length > 0 && (
                      <div className="pt-2">
                        <h6 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          Ek Belgeler & Şablonlar
                        </h6>
                        <div className="flex flex-wrap gap-2">
                          {week.materials.map((m, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                            >
                              <FileText className="w-3.5 h-3.5 text-blue-400" />
                              <span>{m.title}</span>
                              <span className="text-[10px] font-mono uppercase text-slate-500 bg-slate-900 px-1.5 py-0.2 rounded">
                                {m.type}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
