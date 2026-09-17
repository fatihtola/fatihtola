import React from 'react';
import { 
  GraduationCap, 
  BarChart3, 
  Bot, 
  Palette, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  ExternalLink, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  BookOpen, 
  Sparkles,
  UserCheck
} from 'lucide-react';
import { COMPETENCIES, FEATURED_AI_TOOLS, TRAINER_INFO } from '../data/portalData';
import { TeacherGroup } from '../types';

interface OverviewSectionProps {
  groups: TeacherGroup[];
  setActiveTab: (tab: string) => void;
  onOpenTrainerModal: () => void;
  onOpenAddContentModal: () => void;
  isAdmin: boolean;
  onOpenAdminLogin: (reason?: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  BarChart3,
  Bot,
  Palette,
  ShieldCheck,
  Zap
};

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  groups,
  setActiveTab,
  onOpenTrainerModal,
  onOpenAddContentModal,
  isAdmin,
  onOpenAdminLogin
}) => {
  const handleAddContentClick = () => {
    if (!isAdmin) {
      onOpenAdminLogin('Yeni eğitim oturumu veya müfredat içeriği eklemek için yönetici girişi yapınız.');
      return;
    }
    onOpenAddContentModal();
  };

  return (
    <div className="space-y-12" id="overview-content">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl">
        {/* Background glow effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-5">
          {/* Tag Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Öğretmen Akademisi 2026
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              Haftalık 40 Dakikalık Atölyeler
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              10 Ayrı Branş Grubu
            </span>
          </div>

          {/* Main Hero Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Eğitim Teknolojileri ve <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Proje Tabanlı Yapay Zekâ
            </span> Uygulamaları Portalı
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl font-normal">
            Okulumuz öğretmenlerinin sınıf içi ders hazırlığını hızlandırmak, MEB müfredatına tam uyumlu
            yenilikçi materyaller üretmek ve yapay zekâyı etik-pedagojik temellerde bir kaldıraç olarak
            kullanmalarını sağlamak amacıyla tasarlanmış rehber portal.
          </p>

          {/* Hero Quick Stats & Trainer Highlight */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-xl sm:text-2xl font-bold text-white">10 Grup</div>
              <div className="text-xs text-slate-400 mt-0.5">Branş Temelli Gruplar</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-xl sm:text-2xl font-bold text-blue-400">40 Dk / Hf</div>
              <div className="text-xs text-slate-400 mt-0.5">Uygulamalı Atölye</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-xl sm:text-2xl font-bold text-indigo-400">8 Hafta</div>
              <div className="text-xs text-slate-400 mt-0.5">Kapsamlı Müfredat</div>
            </div>
            <div 
              onClick={onOpenTrainerModal}
              className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-800/40 hover:border-blue-500/60 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-1 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                <UserCheck className="w-3.5 h-3.5" />
                Eğitmen
              </div>
              <div className="text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors mt-0.5">
                {TRAINER_INFO.name}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="hero-go-groups-btn"
              onClick={() => setActiveTab('groups')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all active:scale-95"
            >
              <span>10 Grubu ve Programı İncele</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-go-curriculum-btn"
              onClick={() => setActiveTab('curriculum')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-all"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Haftalık Oturum İçerikleri</span>
            </button>
            {isAdmin && (
              <button
                id="hero-add-content-btn"
                onClick={handleAddContentClick}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-medium border border-slate-800 transition-all"
              >
                <span>+ Yeni İçerik Ekle</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 1: Katılımcılar Ne Kazanacak? (Exact request matching projeklavuz) */}
      <section className="space-y-4" id="katilimcilar-ne-kazanacak">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
              Katılımcılar Ne Kazanacak?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Eğitim programını başarıyla tamamlayan öğretmenlerimizin elde edeceği temel pedagojik ve teknik yetkinlikler
            </p>
          </div>
          <span className="text-xs text-blue-400 font-mono bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20 self-start sm:self-auto">
            6 Temel Pedagojik Yetkinlik
          </span>
        </div>

        {/* Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPETENCIES.map((comp) => {
            const Icon = iconMap[comp.icon] || GraduationCap;
            return (
              <div
                key={comp.id}
                id={`competency-card-${comp.id}`}
                className="group relative bg-slate-900/60 hover:bg-slate-900 border border-slate-800/90 hover:border-blue-800/70 rounded-xl p-5 transition-all duration-200 flex flex-col justify-between shadow-sm"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {comp.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-blue-300 transition-colors mb-2">
                    {comp.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {comp.description}
                  </p>
                </div>

                {/* Footer Impact Metric */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{comp.pedagogicalImpact}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: Eğitimde Öne Çıkan Yapay Zekâ Uygulamaları (Exact request matching projeklavuz) */}
      <section className="space-y-4" id="one-cikan-uygulamalar">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
              Eğitimde Öne Çıkan Yapay Zekâ Uygulamaları
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Öğretmenlerimizin ders hazırlığı, görsel üretimi, ölçme ve değerlendirmede doğrudan kullanabileceği pratik araçlar
            </p>
          </div>
          <button
            onClick={() => setActiveTab('tools')}
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold group self-start sm:self-auto"
          >
            <span>Tüm Araçlar Dizini</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Featured Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_AI_TOOLS.filter(t => t.featured).slice(0, 6).map((tool) => (
            <a
              key={tool.id}
              id={`featured-tool-${tool.id}`}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 hover:border-blue-700/60 rounded-xl p-4 sm:p-5 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {tool.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-blue-400 transition-colors">
                    <span>{tool.pricing}</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  {tool.name}
                </h4>

                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-light">
                  {tool.description}
                </p>
              </div>

              {/* Classroom Use Case */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  Sınıf İçi Kullanım Örneği:
                </div>
                <p className="text-[11px] text-slate-400 italic">
                  "{tool.educationUseCase}"
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 3: 10 Eğitim Grubu & Haftalık 40 Dakika Programı (Highlighted user requirement) */}
      <section className="space-y-4" id="egitim-gruplari-ozet">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
              10 Ayrı Öğretmen Grubu & Haftalık 40 Dakikalık Program
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Haftada 40 dakika sürecek 10 ayrı zümre ve branş grubu için zaman çizelgesi ve katılım takibi
            </p>
          </div>
          <button
            onClick={() => setActiveTab('groups')}
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold group self-start sm:self-auto"
          >
            <span>Tüm Grup Listelerini & Yoklamayı Yönet</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 10 Groups Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {groups.map((grp) => (
            <div
              key={grp.id}
              id={`overview-group-item-${grp.id}`}
              onClick={() => setActiveTab('groups')}
              className="p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-blue-700/60 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    Grup {grp.groupNumber}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {grp.participants.length} Öğretmen
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-200 group-hover:text-white line-clamp-1">
                  {grp.name.replace(/^\d+\.\s*Grup\s*\(/, '').replace(/\)$/, '')}
                </h5>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 text-[11px] space-y-1 text-slate-400">
                <div className="flex items-center gap-1 text-slate-300">
                  <Calendar className="w-3 h-3 text-blue-400" />
                  <span>{grp.day}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3 text-indigo-400" />
                  <span>{grp.timeSlot}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 line-clamp-1">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>{grp.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: Eğitmen & Okul Rehberi Mesajı */}
      <div className="rounded-xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-900/40 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-blue-500/20 shrink-0">
            FT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">EĞİTİM KOORDİNATÖRÜ</span>
              <span className="text-xs text-slate-400">• Okulumuz BT Zümresi</span>
            </div>
            <h4 className="text-lg font-bold text-white">{TRAINER_INFO.name}</h4>
            <p className="text-xs text-slate-300 italic mt-0.5">
              "{TRAINER_INFO.quote}"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={onOpenTrainerModal}
            className="w-full md:w-auto px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all text-center"
          >
            Eğitmen Profilini & Konuları Gör
          </button>
          <a
            href={`mailto:${TRAINER_INFO.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all text-center shadow-md shadow-blue-600/20"
          >
            İletişime Geç
          </a>
        </div>
      </div>
    </div>
  );
};
