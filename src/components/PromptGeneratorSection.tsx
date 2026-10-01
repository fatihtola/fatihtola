import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen, 
  Cpu,
  Edit3,
  PlusCircle,
  Trash2,
  Lock,
  ShieldCheck,
  Search,
  BookmarkPlus,
  Save,
  RotateCcw,
  Sliders,
  Library
} from 'lucide-react';
import { copyTextToClipboard } from '../utils/clipboard';
import { PromptTemplate } from '../types';
import { EditPromptModal } from './EditPromptModal';

interface PromptGeneratorSectionProps {
  prompts: PromptTemplate[];
  onUpdatePrompt: (prompt: PromptTemplate) => void;
  onAddPrompt: (prompt: PromptTemplate) => void;
  onDeletePrompt: (promptId: string) => void;
  isAdmin: boolean;
  onOpenAdminLogin: (reason?: string) => void;
}

interface TaskTypeDefinition {
  id: string;
  label: string;
  customTemplate?: string;
}

const DEFAULT_TASK_TYPES: TaskTypeDefinition[] = [
  { id: 'plan', label: 'MEB 5E Modeli Ders Planı' },
  { id: 'exam', label: 'Açık Uçlu Sınav ve Analitik Rubrik' },
  { id: 'socratic', label: 'Sokratik Öğrenci Koçu (İpucu Veren Bot)' },
  { id: 'visual', label: 'Pano Afişi & Görsel Üretim İstemi' },
  { id: 'letter', label: 'Veli Bilgilendirme ve Gelişim Mektubu' }
];

export const PromptGeneratorSection: React.FC<PromptGeneratorSectionProps> = ({
  prompts,
  onUpdatePrompt,
  onAddPrompt,
  onDeletePrompt,
  isAdmin,
  onOpenAdminLogin
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'generator' | 'catalog'>('generator');
  const [branch, setBranch] = useState<string>('Matematik');
  const [gradeLevel, setGradeLevel] = useState<string>('Ortaokul (5-8. Sınıf)');
  const [taskType, setTaskType] = useState<string>('plan');
  const [topic, setTopic] = useState<string>('Rasyonel Sayılar ve Dört İşlem');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isEditingPromptText, setIsEditingPromptText] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedToLibrarySuccess, setSavedToLibrarySuccess] = useState<boolean>(false);

  // Search & filter in catalog view
  const [catalogSearch, setCatalogSearch] = useState<string>('');
  const [catalogBranchFilter, setCatalogBranchFilter] = useState<string>('all');

  // Task types list (customizable by Admin)
  const [taskTypes, setTaskTypes] = useState<TaskTypeDefinition[]>(() => {
    try {
      const saved = localStorage.getItem('portal_custom_task_types');
      return saved ? JSON.parse(saved) : DEFAULT_TASK_TYPES;
    } catch {
      return DEFAULT_TASK_TYPES;
    }
  });

  // Task type edit modal state
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState<boolean>(false);
  const [editingTaskType, setEditingTaskType] = useState<TaskTypeDefinition | null>(null);
  const [taskTypeLabelInput, setTaskTypeLabelInput] = useState<string>('');
  const [taskTypeFormulaInput, setTaskTypeFormulaInput] = useState<string>('');

  // Prompt edit modal state
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [editingPrompt, setEditingPrompt] = useState<PromptTemplate | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const branches = [
    'Matematik',
    'Fen Bilimleri / Fizik / Kimya / Biyoloji',
    'Türkçe / Türk Dili ve Edebiyatı',
    'İngilizce / Yabancı Diller',
    'Sosyal Bilgiler / Tarih / Coğrafya',
    'Sınıf Öğretmenliği (İlkokul)',
    'Rehberlik & Psikolojik Danışmanlık',
    'Bilişim Teknolojileri ve Yazılım',
    'Görsel Sanatlar & Müzik',
    'Din Kültürü ve Ahlak Bilgisi'
  ];

  const gradeLevels = [
    'İlkokul (1-4. Sınıf)',
    'Ortaokul (5-8. Sınıf)',
    'Lise (9-12. Sınıf)',
    'Tüm Kademeler'
  ];

  const handleGenerate = () => {
    // Check if task type has a custom formula template
    const currentTask = taskTypes.find((t) => t.id === taskType);
    if (currentTask && currentTask.customTemplate) {
      let templ = currentTask.customTemplate;
      templ = templ.replace(/\{BRANS\}/g, branch);
      templ = templ.replace(/\{KADEME\}/g, gradeLevel);
      templ = templ.replace(/\{KONU\}/g, topic);
      setGeneratedPrompt(templ);
      setIsEditingPromptText(false);
      return;
    }

    let result = '';

    if (taskType === 'plan') {
      result = `Rol: 15 yıllık MEB müfredatına hakim, pedagojik formasyona sahip kıdemli bir ${branch} öğretmenisin.
Hedef Kitle: ${gradeLevel} seviyesindeki öğrenciler.
Konu/Kazanım: ${topic}
Görev: Bu konu için 40 dakikalık bir 5E (Engage, Explore, Explain, Elaborate, Evaluate) ders planı hazırla.
İçerik Gereksinimleri:
1. Giriş (5 dk): Öğrencilerin merakını uyandıracak günlük hayattan 1 soru veya mini problem senaryosu.
2. Keşfetme (15 dk): Sınıfta gruplar halinde yapılabilecek aktif bir etkinlik.
3. Açıklama (10 dk): Temel kavramların ve kuralların öğretmen rehberliğinde netleştirilmesi.
4. Derinleştirme (7 dk): Bilgiyi yeni bir duruma aktaran 1 transfer sorusu.
5. Değerlendirme (3 dk): 2 soruluk hızlı çıkış kartı (exit ticket).
Format: Markdown başlıkları, anlaşılır zaman çizelgesi ve maddeli yönergelerle sun.`;
    } else if (taskType === 'exam') {
      result = `Rol: Millî Eğitim Bakanlığı Ölçme ve Değerlendirme Uzmanısın.
Hedef Seviye: ${gradeLevel}
Ders ve Konu: ${branch} - ${topic}
Görev: MEB yeni ortak sınav formatına tam uyumlu 4 adet açık uçlu senaryo sorusu hazırla.
Soru Düzeyleri:
- Soru 1: Kavrama düzeyi (Kavramı açıklama)
- Soru 2: Problem çözme / Uygulama düzeyi
- Soru 3: Analiz / Tablo veya olay yorumlama düzeyi
- Soru 4: Yaratıcı düşünme / Karar verme düzeyi
Ek Olarak:
Her soru için MEB standartlarında puanlama anahtarı (0, 5, 10 puanlık kriterler ve beklenen anahtar sözcükler) içeren net bir "Analitik Rubrik Tablosu" oluştur.`;
    } else if (taskType === 'socratic') {
      result = `Sen ${gradeLevel} öğrencilerine hitap eden bilge, sabırlı ve nazik bir Sokratik ${branch} öğretmen asistanısın.
Ders Konusu: ${topic}
Temel Çalışma Kuralın:
Öğrenci sana bu konuyla ilgili hangi soruyu veya ödevi sorarsa sorsun, ASLA ve KAT'A doğrudan doğru cevabı ya da nihai matematiksel/metinsel sonucu söylemeyeceksin!
İzleyeceğin Adımlar:
1. Öğrencinin sorusunu takdir et ("Güzel bir soru sordun, birlikte adım adım keşfedelim" gibi).
2. Öğrencinin önceki bildiklerini hatırlatacak 1 adet yönlendirici soru sor ve düşünmesi için ufak bir ipucu ver.
3. Öğrenci doğru yanıta yaklaştıkça onu cesaretlendirip sonraki adıma geçir.
Üslup: Samimi, pedagojik ve her zaman Türkçe dil kurallarına uygun.`;
    } else if (taskType === 'visual') {
      result = `A high-resolution, vibrant educational vector infographic poster illustrating "${topic}" for ${gradeLevel} students in ${branch}.
Visual Style: Modern clean flat design, bright soft background colors, clear pedagogical labeling, aesthetic classroom wall poster aesthetic, engaging educational diagrams, warm natural studio lighting, ultra-detailed, 4k, --ar 16:9`;
    } else if (taskType === 'letter') {
      result = `Rol: Anlayışlı ve yapıcı bir ${gradeLevel} ${branch} öğretmenisin.
Öğrenci Durumu: ${topic} konusunda sınıfta çaba gösteren ancak daha fazla pekiştirmeye ihtiyaç duyan bir öğrenci.
Görev: Öğrencinin velisine iletilmek üzere, öğrencinin dersteki olumlu yönlerini öne çıkaran, evde birlikte yapılabilecek 2 somut çalışma önerisi içeren 120 kelimelik nazik ve motive edici bir gelişim bülteni notu yaz.
Format: Saygılı ve veliyi iş birliğine davet eden samimi bir hitap.`;
    } else {
      result = `Rol: Kıdemli bir ${branch} öğretmenisin.
Hedef Kitle: ${gradeLevel}
Konu: ${topic}
Görev: Bu konuyla ilgili sınıf içi etkinlik ve zenginleştirilmiş ders içeriği hazırla.`;
    }

    setGeneratedPrompt(result);
    setIsEditingPromptText(false);
  };

  const handleCopy = async () => {
    if (!generatedPrompt) return;
    const success = await copyTextToClipboard(generatedPrompt);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleToggleEditPromptText = () => {
    if (!isAdmin) {
      onOpenAdminLogin('Üretilen istem içeriğini serbestçe düzenlemek için lütfen yönetici girişi yapınız.');
      return;
    }
    setIsEditingPromptText(!isEditingPromptText);
  };

  const handleSaveToCatalog = () => {
    if (!isAdmin) {
      onOpenAdminLogin('Üretilen istemi prompt kütüphanesine kaydetmek için lütfen yönetici girişi yapınız.');
      return;
    }
    if (!generatedPrompt.trim()) return;

    const currentTask = taskTypes.find((t) => t.id === taskType);
    const newPromptTemplate: PromptTemplate = {
      id: `pr-${Date.now()}`,
      title: `${topic} - ${currentTask ? currentTask.label : 'Özel İstem'}`,
      branch,
      gradeLevel,
      goal: `${topic} konusu için pedagojik istem.`,
      recommendedModel: 'ChatGPT veya Claude',
      promptText: generatedPrompt.trim()
    };

    onAddPrompt(newPromptTemplate);
    setSavedToLibrarySuccess(true);
    setTimeout(() => setSavedToLibrarySuccess(false), 2500);
  };

  // Task formula modal handlers
  const handleOpenEditTaskType = (t: TaskTypeDefinition) => {
    if (!isAdmin) {
      onOpenAdminLogin('Görev şablonunu ve prompt formülünü düzenlemek için yönetici girişi yapınız.');
      return;
    }
    setEditingTaskType(t);
    setTaskTypeLabelInput(t.label);
    setTaskTypeFormulaInput(
      t.customTemplate || 
      `Rol: Kıdemli bir {BRANS} öğretmenisin.\nHedef Kitle: {KADEME}\nKonu: {KONU}\nGörev: ...`
    );
    setIsEditTaskModalOpen(true);
  };

  const handleSaveTaskType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTaskType || !taskTypeLabelInput.trim()) return;

    const updated = taskTypes.map((t) =>
      t.id === editingTaskType.id
        ? { ...t, label: taskTypeLabelInput.trim(), customTemplate: taskTypeFormulaInput.trim() }
        : t
    );
    setTaskTypes(updated);
    try {
      localStorage.setItem('portal_custom_task_types', JSON.stringify(updated));
    } catch {}
    setIsEditTaskModalOpen(false);
    setEditingTaskType(null);
  };

  const handleOpenAddNewTaskType = () => {
    if (!isAdmin) {
      onOpenAdminLogin('Yeni görev şablonu eklemek için lütfen yönetici girişi yapınız.');
      return;
    }
    const newId = `custom-task-${Date.now()}`;
    const newTask: TaskTypeDefinition = {
      id: newId,
      label: 'Yeni Özel Görev Şablonu',
      customTemplate: `Rol: Kıdemli bir {BRANS} öğretmenisin.\nHedef Kitle: {KADEME}\nKonu/Kazanım: {KONU}\nGörev: Bu ders için yaratıcı bir etkinlik ve değerlendirme formu tasarla.`
    };
    setEditingTaskType(newTask);
    setTaskTypeLabelInput(newTask.label);
    setTaskTypeFormulaInput(newTask.customTemplate);
    setIsEditTaskModalOpen(true);
  };

  // Prompt catalog modal handlers
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
      onOpenAdminLogin('Prompt şablonunu düzenlemek için lütfen yönetici girişi yapınız.');
      return;
    }
    setEditingPrompt(prompt);
    setIsPromptModalOpen(true);
  };

  const handleUsePromptInGenerator = (prompt: PromptTemplate) => {
    setGeneratedPrompt(prompt.promptText);
    setTopic(prompt.title);
    if (branches.includes(prompt.branch)) setBranch(prompt.branch);
    setActiveSubTab('generator');
    setIsEditingPromptText(false);
  };

  // Filtered prompt catalog
  const filteredPrompts = prompts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      p.goal.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      p.promptText.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      p.branch.toLowerCase().includes(catalogSearch.toLowerCase());
    const matchesBranch =
      catalogBranchFilter === 'all' || p.branch.toLowerCase().includes(catalogBranchFilter.toLowerCase());
    return matchesSearch && matchesBranch;
  });

  return (
    <div className="space-y-8" id="prompt-generator-section">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Öğretmenler İçin Prompt (İstem) Üreticisi & Kütüphanesi
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {prompts.length} Hazır Şablon
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Ders planı, MEB sınavı, Sokratik koç ve görsel afiş için RGB/RTF standartlarında Türkçe pedagojik istemler oluşturun ve yönetin.
          </p>
        </div>

        {/* Action & Admin Status Badges */}
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

      {/* Sub-Tabs: Generator vs Library */}
      <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
        <button
          onClick={() => setActiveSubTab('generator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === 'generator'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>İnteraktif Prompt Oluşturucu</span>
        </button>

        <button
          onClick={() => setActiveSubTab('catalog')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === 'catalog'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Library className="w-4 h-4" />
          <span>Prompt Şablon Kütüphanesi ({prompts.length})</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* 1. INTERACTIVE PROMPT GENERATOR VIEW                           */}
      {/* ============================================================== */}
      {activeSubTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Controls */}
          <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                Parametreleri Seçin
              </h4>
              {isAdmin && (
                <button
                  type="button"
                  onClick={handleOpenAddNewTaskType}
                  className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
                  title="Yeni Görev Şablonu Ekle"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>+ Özel Görev</span>
                </button>
              )}
            </div>

            {/* Branch Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Öğretmen Branşı</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              >
                {branches.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Grade Level Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Sınıf Kademesi</label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              >
                {gradeLevels.map((gl) => (
                  <option key={gl} value={gl}>{gl}</option>
                ))}
              </select>
            </div>

            {/* Task Type with Edit Capability for Admin */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Hazırlanacak Görev / Çıktı Türü</label>
                {isAdmin && (
                  <span className="text-[10px] text-emerald-400 font-mono">Şablon Düzenleme Açık</span>
                )}
              </div>
              <div className="space-y-1.5">
                {taskTypes.map((t) => (
                  <div
                    key={t.id}
                    className={`flex items-center justify-between rounded-lg border transition-all ${
                      taskType === t.id
                        ? 'bg-blue-600/20 text-blue-300 border-blue-500/50'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-850'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setTaskType(t.id)}
                      className="flex-1 text-left px-3 py-2 text-xs font-medium"
                    >
                      {t.label}
                    </button>
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => handleOpenEditTaskType(t)}
                        className="px-2.5 py-2 text-slate-400 hover:text-blue-400 transition-colors"
                        title="Bu Görev Formülünü / Başlığını Düzenle"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Topic Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">MEB Kazanımı veya Konu Başlığı</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Örn: Hücre Bölünmesi ve Mitoz"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              >
              </input>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all active:scale-95 mt-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Pedagojik İstem (Prompt) Oluştur</span>
            </button>
          </div>

          {/* Output Preview & Live Content Editor */}
          <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Output Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-slate-300">
                    {isEditingPromptText ? 'İstem İçeriğini Düzenle' : 'Üretilen Pedagojik İstem'}
                  </span>
                  {generatedPrompt && (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {isEditingPromptText ? 'Düzenleme Modu' : 'Kullanıma Hazır'}
                    </span>
                  )}
                </div>

                {/* Edit & Library Save Action Buttons */}
                <div className="flex items-center gap-2">
                  {generatedPrompt && isAdmin && (
                    <>
                      <button
                        onClick={handleToggleEditPromptText}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          isEditingPromptText
                            ? 'bg-blue-600 text-white border-blue-500'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                        }`}
                        title="İstem metnini serbestçe düzenleyin"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                        <span>{isEditingPromptText ? 'Düzenlemeyi Bitir' : 'İçeriği Düzenle'}</span>
                      </button>

                      <button
                        onClick={handleSaveToCatalog}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-medium transition-colors"
                        title="Bu istemi şablon kütüphanesine kaydet"
                      >
                        {savedToLibrarySuccess ? <Check className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
                        <span>{savedToLibrarySuccess ? 'Kütüphaneye Kaydedildi!' : 'Kütüphaneye Kaydet'}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Output Body: Editable textarea or formatted code block */}
              {generatedPrompt ? (
                isEditingPromptText ? (
                  <div className="space-y-2">
                    <textarea
                      value={generatedPrompt}
                      onChange={(e) => setGeneratedPrompt(e.target.value)}
                      rows={14}
                      className="w-full bg-slate-950 font-mono text-xs text-slate-200 p-4 rounded-xl border border-blue-500/60 focus:outline-none focus:border-blue-400 leading-relaxed shadow-inner"
                      placeholder="İstem metnini burada doğrudan düzenleyebilirsiniz..."
                    />
                    <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                      <span>Karakter: {generatedPrompt.length} | Kelime: {generatedPrompt.split(/\s+/).filter(Boolean).length}</span>
                      <span className="text-emerald-400">Yönetici Canlı Düzenleme Aktif</span>
                    </div>
                  </div>
                ) : (
                  <pre className="text-xs font-mono text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800/90 whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto">
                    {generatedPrompt}
                  </pre>
                )
              ) : (
                <div className="py-16 text-center text-slate-500 space-y-2">
                  <Sparkles className="w-8 h-8 mx-auto text-slate-600" />
                  <p className="text-xs">Sol panelden branş, kademe ve konuyu seçip "İstem Oluştur" butonuna basınız.</p>
                </div>
              )}
            </div>

            {/* Output Footer */}
            {generatedPrompt && (
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400">
                  Bu metni kopyalayıp <strong>ChatGPT, Google Gemini veya Claude</strong>'a doğrudan yapıştırabilirsiniz.
                </span>
                <button
                  onClick={handleCopy}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all active:scale-95 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Panoya Kopyalandı!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>İstemi Kopyala</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. PROMPT TEMPLATES LIBRARY & MANAGEMENT VIEW                  */}
      {/* ============================================================== */}
      {activeSubTab === 'catalog' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Şablon başlığı, konu veya istem metni ara..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="w-full bg-slate-950 text-xs text-slate-200 placeholder-slate-500 rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={catalogBranchFilter}
                onChange={(e) => setCatalogBranchFilter(e.target.value)}
                className="bg-slate-950 text-xs text-slate-200 rounded-xl px-3 py-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="all">Tüm Branşlar</option>
                {branches.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>

              {isAdmin && (
                <button
                  onClick={handleOpenAddPrompt}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shrink-0 shadow-md shadow-blue-600/30"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Yeni Şablon Ekle</span>
                </button>
              )}
            </div>
          </div>

          {/* Prompt Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredPrompts.map((prompt) => (
              <div
                key={prompt.id}
                id={`prompt-card-${prompt.id}`}
                className="bg-slate-900/70 border border-slate-800 hover:border-blue-700/60 rounded-2xl p-5 sm:p-6 space-y-4 flex flex-col justify-between transition-all shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                          {prompt.branch}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {prompt.gradeLevel}
                        </span>
                      </div>
                      <h5 className="text-base font-bold text-white">{prompt.title}</h5>
                    </div>

                    {/* Admin Action Buttons */}
                    {isAdmin && (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleOpenEditPrompt(prompt)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
                          title="Şablonu Düzenle"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                          <span>İçeriği Düzenle</span>
                        </button>

                        {deleteConfirmId === prompt.id ? (
                          <div className="flex items-center gap-1 bg-red-950/70 border border-red-800/60 p-1 rounded-lg text-xs">
                            <button
                              onClick={() => {
                                onDeletePrompt(prompt.id);
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
                            onClick={() => setDeleteConfirmId(prompt.id)}
                            className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-900/40 transition-colors"
                            title="Şablonu Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {prompt.goal}
                  </p>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 max-h-48 overflow-y-auto font-mono text-[11px] text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {prompt.promptText}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-500">
                    Önerilen Model: <strong>{prompt.recommendedModel}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUsePromptInGenerator(prompt)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                    >
                      Üreticide Kullan
                    </button>
                    <button
                      onClick={async () => {
                        await copyTextToClipboard(prompt.promptText);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-sm"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Kopyala</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPrompts.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-xs">
              Arama kriterlerine uygun prompt şablonu bulunamadı.
            </div>
          )}
        </div>
      )}

      {/* Task Formula / Custom Task Edit Modal */}
      {isEditTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-400" />
                Görev Şablonu ve Formülünü Düzenle
              </h4>
              <button
                onClick={() => setIsEditTaskModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTaskType} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Görev Başlığı</label>
                <input
                  type="text"
                  value={taskTypeLabelInput}
                  onChange={(e) => setTaskTypeLabelInput(e.target.value)}
                  className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">İstem Formülü / Şablon Metni</label>
                  <span className="text-[10px] text-slate-400 font-mono">Değişkenler: &#123;BRANS&#125;, &#123;KADEME&#125;, &#123;KONU&#125;</span>
                </div>
                <textarea
                  rows={8}
                  value={taskTypeFormulaInput}
                  onChange={(e) => setTaskTypeFormulaInput(e.target.value)}
                  className="w-full bg-slate-950 font-mono text-xs text-slate-200 rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-blue-500 leading-relaxed"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditTaskModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 bg-slate-800"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Prompt Template Edit Modal */}
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
