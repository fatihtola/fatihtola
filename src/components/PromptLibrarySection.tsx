import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  Search,
  Sliders,
  ExternalLink,
  Lightbulb,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { PromptTemplate } from '../types';
import { EditPromptModal } from './EditPromptModal';
import { copyTextToClipboard } from '../utils/clipboard';

interface PromptLibrarySectionProps {
  prompts: PromptTemplate[];
  onUpdatePrompt: (prompt: PromptTemplate) => void;
  onAddPrompt: (prompt: PromptTemplate) => void;
  onDeletePrompt: (promptId: string) => void;
  isAdmin: boolean;
  onOpenAdminLogin: (reason?: string) => void;
  onNavigateToGenerator?: (prompt: PromptTemplate) => void;
}

export const PromptLibrarySection: React.FC<PromptLibrarySectionProps> = ({
  prompts,
  onUpdatePrompt,
  onAddPrompt,
  onDeletePrompt,
  isAdmin,
  onOpenAdminLogin,
  onNavigateToGenerator
}) => {
  const [selectedFormula, setSelectedFormula] = useState<'rgb' | 'rtf' | 'socratic' | 'fewshot'>('rgb');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<PromptTemplate | null>(null);

  // Dynamic branch list from existing prompts
  const branches = [
    'all',
    ...Array.from(new Set(prompts.map((p) => p.branch).filter(Boolean)))
  ];

  const handleCopyPrompt = async (promptText: string, id: string) => {
    const success = await copyTextToClipboard(promptText);
    if (success) {
      setCopiedPromptId(id);
      setTimeout(() => setCopiedPromptId(null), 2500);
    }
  };

  const handleOpenAddPrompt = () => {
    if (!isAdmin) {
      onOpenAdminLogin('Yeni prompt şablonu eklemek için lütfen yönetici girişi yapınız.');
      return;
    }
    setEditingPrompt(null);
    setIsPromptModalOpen(true);
  };

  const handleOpenEditPrompt = (prompt: PromptTemplate) => {
    if (!isAdmin) {
      onOpenAdminLogin('Şablonu düzenlemek için lütfen yönetici girişi yapınız.');
      return;
    }
    setEditingPrompt(prompt);
    setIsPromptModalOpen(true);
  };

  const filteredPrompts = prompts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.goal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.promptText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.recommendedModel && p.recommendedModel.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBranch = selectedBranch === 'all' || p.branch.toLowerCase() === selectedBranch.toLowerCase();
    return matchesSearch && matchesBranch;
  });

  return (
    <div className="space-y-10" id="prompt-library-section">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Öğretmenler İçin Prompt (İstem) Kütüphanesi & Rehberi
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {prompts.length} Hazır Şablon
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Ders planı, MEB açık uçlu sınavı, Sokratik koç ve görsel afiş istem formülleri ile tek tıkla kopyalanabilir hazır şablonlar
          </p>
        </div>

        {/* Admin Action Badges */}
        {isAdmin && (
          <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Düzenleme Yetkisi Aktif</span>
            </div>

            <button
              onClick={handleOpenAddPrompt}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yeni Şablon Ekle</span>
            </button>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 1. SECTION: PROMPT ENGINEERING FORMULAS                        */}
      {/* ============================================================== */}
      <section className="space-y-5">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-4 bg-indigo-500 rounded-full" />
              Öğretmenler İçin İstem (Prompt) Mühendisliği Formülleri
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Yapay zekâ modellerinden öğretmen ve MEB düzeyinde pedagojik verim almak için kullanılan altın standartlar
            </p>
          </div>
        </div>

        {/* Formula Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedFormula('rgb')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedFormula === 'rgb'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            RGB Formülü (Rol - Girdi - Beklenen Çıktı)
          </button>
          <button
            onClick={() => setSelectedFormula('rtf')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedFormula === 'rtf'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            RTF Formülü (Rol - Görev - Format)
          </button>
          <button
            onClick={() => setSelectedFormula('socratic')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedFormula === 'socratic'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            Sokratik Yöntem (Düşündüren Öğretmen)
          </button>
          <button
            onClick={() => setSelectedFormula('fewshot')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedFormula === 'fewshot'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            Few-Shot (Örnekle Kalıp Öğretme)
          </button>
        </div>

        {/* Selected Formula Display */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-4">
          {selectedFormula === 'rgb' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-base font-bold text-white">RGB Formülü: Rol + Girdi + Beklenen Çıktı</h5>
                  <p className="text-xs text-slate-400">Karmaşık sınav veya ders materyallerinde en tutarlı sonuç veren yöntemdir.</p>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  R - G - B
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">1. ROL (Role)</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Modele kim olduğunu ve uzmanlığını söyleyin. (Örn: "15 yıllık MEB Lise Matematik Öğretmenisin.")
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">2. GİRDİ (Input)</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Kazanım metni, öğrenci seviyesi veya kaynak dökümanı sunun. (Örn: "9. Sınıf Mantık ve Kümeler MEB kazanımı.")
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">3. BEKLENEN ÇIKTI (Output)</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Çıktının yapısı: Rubrik tablosu, soru adedi, cevap anahtarı. (Örn: "3 açık uçlu soru + analitik puanlama anahtarı.")
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedFormula === 'rtf' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-base font-bold text-white">RTF Formülü: Role + Task + Format</h5>
                  <p className="text-xs text-slate-400">Hızlı günlük görevler, veli bilgilendirme notları ve ders planı taslakları için idealdir.</p>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  R - T - F
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">ROLE (Rol)</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    "Pedagojik danışman ve sınıf rehber öğretmenisin."
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">TASK (Görev)</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    "Derse ilgisi azalan bir öğrencinin velisine motive edici gelişim mektubu hazırla."
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">FORMAT (Format)</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    "En fazla 150 kelimelik, nazik, yapıcı ve çözüm odaklı 3 paragraf."
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedFormula === 'socratic' && (
            <div className="space-y-3">
              <h5 className="text-base font-bold text-white">Sokratik Yöntem (Düşündüren Öğretmen İstem Mantığı)</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Öğrencilerin yapay zekâya ödevlerini doğrudan yaptırmasını engellemek için, yapay zekânın sistem komutuna:
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400">
                "Öğrenci ne sorarsa sorsun ASLA doğrudan hazır cevabı söyleme. Öğrenciye onun bildiği eski bir kavramı hatırlatacak 1 adet yönlendirici soru sorarak çözüme kendi mantığıyla ulaşmasını sağla."
              </div>
              <p className="text-xs text-slate-400">
                Böylece model bir 'ödev çözücü kopya makinesi' değil, öğrencinin hızına uyum sağlayan 'kişisel akıl koçu' haline gelir.
              </p>
            </div>
          )}

          {selectedFormula === 'fewshot' && (
            <div className="space-y-3">
              <h5 className="text-base font-bold text-white">Few-Shot İstemleme (Örnek Göstererek Kalıp Öğretme)</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Model sizin zümrenizin sınav şablonunu veya puanlama tarzını ezbere bilmez. İstemin içine:
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-blue-300">
                "Örnek Soru 1: [Geçen yıl sorduğunuz tam puanlık MEB açık uçlu soru, çözüm basamağı ve rubriği]<br />
                Şimdi tam bu pedagojik seviyede, bu tonlamayla ve bu formatta 3 adet yeni soru ve cevap anahtarı türet."
              </div>
              <p className="text-xs text-slate-400">
                eklediğinizde, model ilk örneğin tonunu, soru zorluk derecesini ve rubrik stilini kusursuz şekilde kopyalar.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. SECTION: READY-TO-USE TEACHER PROMPTS CATALOG               */}
      {/* ============================================================== */}
      <section className="space-y-5 pt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Öğretmenler İçin Hazır Şablonlar (Tek Tıkla Kopyala)
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Ders planı, MEB sınav rubriği, Sokratik koç ve farklılaştırılmış öğretim şablonları ({filteredPrompts.length} listeleniyor)
            </p>
          </div>

          {/* Search & Branch Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Şablon veya konu ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 text-xs text-slate-200 placeholder-slate-500 rounded-xl pl-9 pr-3 py-2 border border-slate-800 focus:outline-none focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-slate-900 text-xs text-slate-200 rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="all">Tüm Branşlar</option>
              {branches.filter(b => b !== 'all').map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPrompts.map((item) => (
            <div
              key={item.id}
              id={`sample-prompt-${item.id}`}
              className="bg-slate-900/60 border border-slate-800 hover:border-blue-800/60 rounded-2xl p-5 space-y-3.5 flex flex-col justify-between transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      {item.branch}
                    </span>
                    {item.gradeLevel && (
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {item.gradeLevel}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-500 font-mono">
                      {item.recommendedModel}
                    </span>
                  </div>

                  {/* Admin Only Action Buttons */}
                  {isAdmin && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditPrompt(item)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                        title="Şablonu Düzenle"
                      >
                        <Edit3 className="w-3 h-3 text-blue-400" />
                        <span>İçeriği Düzenle</span>
                      </button>

                      {deleteConfirmId === item.id ? (
                        <div className="flex items-center gap-1 bg-red-950/70 border border-red-800/60 p-1 rounded-lg text-xs">
                          <button
                            onClick={() => {
                              onDeletePrompt(item.id);
                              setDeleteConfirmId(null);
                            }}
                            className="px-2 py-0.5 rounded bg-red-600 text-white font-semibold text-[10px]"
                          >
                            Sil
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]"
                          >
                            İptal
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-900/40 transition-colors"
                          title="Şablonu Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <h5 className="text-sm sm:text-base font-bold text-white">{item.title}</h5>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed font-light">{item.goal}</p>

                {/* Prompt Preview Box */}
                <pre className="text-xs font-mono text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/80 mt-3 whitespace-pre-wrap max-h-44 overflow-y-auto leading-relaxed scrollbar-thin">
                  {item.promptText}
                </pre>
              </div>

              <div className="pt-2 flex items-center gap-2">
                {onNavigateToGenerator && (
                  <button
                    onClick={() => onNavigateToGenerator(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                    title="Bu şablonu Prompt Üretici'ye aktar"
                  >
                    <Sliders className="w-3.5 h-3.5 text-blue-400" />
                    <span>Üreticide Aç</span>
                  </button>
                )}

                <button
                  onClick={() => handleCopyPrompt(item.promptText, item.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-98 ${
                    onNavigateToGenerator ? 'flex-1' : 'w-full'
                  } bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20`}
                >
                  {copiedPromptId === item.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Panoya Kopyalandı!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Bu İstemi Kopyala</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="py-12 text-center text-slate-500 text-xs rounded-2xl bg-slate-900/40 border border-slate-800">
            Arama kriterlerinize uygun istem şablonu bulunamadı.
          </div>
        )}
      </section>

      {/* Edit / Add Prompt Modal */}
      <EditPromptModal
        isOpen={isPromptModalOpen}
        onClose={() => {
          setIsPromptModalOpen(false);
          setEditingPrompt(null);
        }}
        onSave={(savedPrompt) => {
          if (editingPrompt) {
            onUpdatePrompt(savedPrompt);
          } else {
            onAddPrompt(savedPrompt);
          }
        }}
        editingPrompt={editingPrompt}
      />
    </div>
  );
};
