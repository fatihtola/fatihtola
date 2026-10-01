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
  Target,
  Wrench,
  BookOpen,
  Info,
  Table as TableIcon,
  LayoutGrid,
  ArrowRight,
  Layers
} from 'lucide-react';
import { WeekSession } from '../types';
import { CURRICULUM_UNITS, HAZIRLIK_OTURUMU } from '../data/curriculumData';
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
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showPrepSession, setShowPrepSession] = useState<boolean>(false);

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

  // Filter weeks by unit
  const filteredWeeks = selectedUnit === 'all'
    ? weeks
    : weeks.filter(w => {
        const unit = CURRICULUM_UNITS.find(u => u.id === selectedUnit);
        return unit ? unit.weekIds.includes(w.id) : true;
      });

  return (
    <div className="space-y-8" id="curriculum-modules-section">
      {/* Header Banner */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Haftalık Eğitim Oturumları & Müfredat
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              6 Ünite · 15 Hafta · 40 dk / Hafta
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            15 Haftalık Eğitim Teknolojileri Programı · 2026–2027 (İçindekiler & Hafta Hafta Uygulamalar)
          </p>
        </div>

        {/* Action Buttons & View Mode Toggle */}
        <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'cards'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Atölye Kartları</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>PDF İçindekiler Tablosu</span>
            </button>
          </div>

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
              <span>Yeni Oturum Ekle</span>
            </button>
          )}
        </div>
      </div>

      {/* Hazırlık Oturumu (0. Hafta — İsteğe Bağlı) Banner */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-blue-950/40 p-4 sm:p-5 transition-all">
        <div 
          onClick={() => setShowPrepSession(!showPrepSession)}
          className="flex items-start sm:items-center justify-between gap-3 cursor-pointer select-none"
        >
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex flex-col items-center justify-center text-indigo-300 shrink-0">
              <span className="text-[10px] font-mono leading-none">HF</span>
              <span className="text-sm font-extrabold leading-tight">0</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  İsteğe Bağlı Hazırlık Oturumu
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  {HAZIRLIK_OTURUMU.duration}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                {HAZIRLIK_OTURUMU.title}
              </h4>
              <div className="flex items-center gap-2 flex-wrap mt-1 text-xs">
                <span className="text-slate-400 font-medium">Konu: {HAZIRLIK_OTURUMU.topic}</span>
                <span className="text-slate-600">•</span>
                <span className="text-indigo-300 font-mono bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-900/40">
                  {HAZIRLIK_OTURUMU.appChain}
                </span>
              </div>
            </div>
          </div>
          <button className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 hover:bg-slate-700">
            {showPrepSession ? <ChevronUp className="w-4 h-4 text-indigo-400" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showPrepSession && (
          <div className="mt-4 pt-4 border-t border-indigo-500/20 space-y-3">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {HAZIRLIK_OTURUMU.summary}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {HAZIRLIK_OTURUMU.highlights.map((h, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950/70 border border-indigo-900/30 text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Unit Selector Tabs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            Ünite Filtresi
          </span>
          <span className="text-xs text-slate-500">
            {filteredWeeks.length} Oturum Gösteriliyor
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar">
          <button
            onClick={() => setSelectedUnit('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedUnit === 'all'
                ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            Tüm Üniteler (1-15)
          </button>
          {CURRICULUM_UNITS.map((unit) => (
            <button
              key={unit.id}
              onClick={() => setSelectedUnit(unit.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedUnit === unit.id
                  ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                  : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {unit.unitNumber}. Ünite · {unit.title.split('—')[1]?.trim() || unit.title}
            </button>
          ))}
        </div>
      </div>

      {/* PDF Table View (İçindekiler - Hafta Hafta Uygulamalar) */}
      {viewMode === 'table' ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
          <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between gap-3">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <TableIcon className="w-4 h-4 text-blue-400" />
                İçindekiler — Hafta Hafta Uygulamalar Tablosu
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Eğitim programının hafta, konu, uygulama araçları zinciri ve hedeflenen somut çıktılarının tam matriksi
              </p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 hidden sm:inline">
              15 Hafta Tam Liste
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-16">Hafta</th>
                  <th className="py-3.5 px-4 min-w-[200px]">Ders Planındaki Başlık</th>
                  <th className="py-3.5 px-4 min-w-[160px]">Konu</th>
                  <th className="py-3.5 px-4 min-w-[240px]">→ Kullanılacak Uygulamalar</th>
                  <th className="py-3.5 px-4 min-w-[160px]">Ünite</th>
                  <th className="py-3.5 px-4 min-w-[200px]">Hedef Çıktı</th>
                  <th className="py-3.5 px-4 w-24 text-center">Tür</th>
                  <th className="py-3.5 px-4 w-16 text-center">İncele</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {/* Hazırlık Oturumu (0. Hafta) Row */}
                {(selectedUnit === 'all' || selectedUnit === 'unit-1') && (
                  <tr 
                    className="bg-indigo-950/20 hover:bg-indigo-950/40 transition-colors cursor-pointer"
                    onClick={() => setShowPrepSession(true)}
                  >
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-indigo-400 font-mono bg-indigo-500/15 px-2 py-1 rounded border border-indigo-500/30">
                        H.0
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      {HAZIRLIK_OTURUMU.title}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-indigo-300 bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-900/40">
                        {HAZIRLIK_OTURUMU.topic}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950/60 px-2 py-1 rounded border border-indigo-900/40 inline-block">
                        {HAZIRLIK_OTURUMU.appChain}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      Hazırlık (İsteğe Bağlı)
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 text-[11px]">
                      RGBF formülü + Hızlı sesli istem (Win+H)
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Hazırlık
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPrepSession(prev => !prev);
                        }}
                        className="p-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-colors"
                        title="Hazırlık Oturumunu İncele"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                )}

                {filteredWeeks.map((week) => (
                  <tr 
                    key={week.id} 
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                    onClick={() => {
                      setViewMode('cards');
                      setExpandedWeekId(week.id);
                    }}
                  >
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-blue-400 font-mono bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                        H.{week.weekNumber}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white group-hover:text-blue-300 transition-colors">
                        {week.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-light">
                        {week.summary}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {week.topic || '—'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950/40 px-2 py-1 rounded border border-indigo-900/40 inline-block">
                        {week.appChain || '—'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-medium text-slate-300">
                        {week.unitName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] text-emerald-300 bg-emerald-950/30 px-2 py-1 rounded border border-emerald-900/30 inline-block">
                        {week.targetOutput || 'Materyal çıktısı'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {week.isWorkshop ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                          U - Atölye
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400">
                          Atölye
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewMode('cards');
                          setExpandedWeekId(week.id);
                        }}
                        className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white transition-colors"
                        title="Detaylı Kartı Aç"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Accordion List of Weeks */
        <div className="space-y-4" id="curriculum-weeks-accordion-list">
          {filteredWeeks.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
              <p className="text-sm text-slate-400 font-medium">Bu ünitede henüz oturum bulunamadı.</p>
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
                      ? 'bg-slate-900/90 border-blue-600/60 shadow-xl'
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
                      <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/30 flex flex-col items-center justify-center text-blue-400 shrink-0">
                        <span className="text-[10px] font-mono leading-none">HF</span>
                        <span className="text-base font-black leading-tight">{week.weekNumber}</span>
                      </div>

                      <div className="space-y-1.5">
                        {/* Unit Name, Topic and Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          {week.unitName && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-blue-300 border border-slate-700">
                              {week.unitName}
                            </span>
                          )}
                          {week.isWorkshop && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                              U - Atölye
                            </span>
                          )}
                          {week.topic && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                              Konu: {week.topic}
                            </span>
                          )}
                          {week.customAdded && (
                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              Özel Eklenen
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-white hover:text-blue-300 transition-colors">
                          {week.title}
                        </h4>

                        {/* App Chain & Target output pill */}
                        {week.appChain && (
                          <div className="flex items-center gap-2 flex-wrap text-xs">
                            <span className="text-slate-400 text-[11px] font-semibold">Uygulamalar:</span>
                            <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-900/40">
                              {week.appChain}
                            </span>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-0.5">
                          <span className="flex items-center gap-1 text-slate-300 font-medium">
                            <Clock className="w-3.5 h-3.5 text-blue-400" />
                            {week.duration}
                          </span>
                          <span>•</span>
                          <span className="line-clamp-1 max-w-lg text-slate-400 font-light">
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
                      <div className="flex items-center justify-between gap-2 pt-2 flex-wrap">
                        {week.targetOutput && (
                          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl">
                            <Target className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Hedef Çıktı: <span className="font-normal text-slate-200">{week.targetOutput}</span></span>
                          </div>
                        )}

                        {isAdmin && (
                          <div className="flex items-center gap-2 ml-auto">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditWeekClick(week);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                              title="Oturumu Düzenle"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                              <span>İçeriği Düzenle</span>
                            </button>
                            {week.customAdded && (
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
                        )}
                      </div>

                      {/* Haftanın Yeni Aracı Banner */}
                      {week.newToolOfTheWeek && (
                        <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-900/60 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-start sm:items-center gap-2.5">
                            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-bold font-mono uppercase tracking-wider shrink-0 mt-0.5 sm:mt-0">
                              Haftanın Yeni Aracı
                            </span>
                            <div>
                              <span className="text-xs sm:text-sm font-bold text-white mr-2">
                                {week.newToolOfTheWeek.name}
                              </span>
                              <span className="text-xs text-slate-300">
                                — {week.newToolOfTheWeek.tagline}
                              </span>
                            </div>
                          </div>
                          <a
                            href={week.newToolOfTheWeek.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 self-start sm:self-auto px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0 transition-colors"
                          >
                            <span>Aracı Aç</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}

                      {/* Kazanımlar (Learning Outcomes) */}
                      <div>
                        <h5 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Bu 40 Dakikalık Oturumun Pedagojik Kazanımları
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {week.learningOutcomes.map((outcome, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                              <span className="leading-relaxed">{outcome}</span>
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
                          {week.notes && (
                            <div className="flex items-start gap-1.5 text-[11px] text-amber-300/90 pt-1">
                              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                              <span>{week.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Sample Prompt with Copy Button */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-blue-900/40 space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
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
                                <span className="text-[10px] font-mono uppercase text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">
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
      )}
    </div>
  );
};
