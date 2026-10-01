import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen, 
  Cpu,
  Edit3,
  ShieldCheck, 
  BookmarkPlus,
  Sliders
} from 'lucide-react';
import { copyTextToClipboard } from '../utils/clipboard';
import { PromptTemplate } from '../types';

interface PromptGeneratorSectionProps {
  onAddPrompt?: (prompt: PromptTemplate) => void;
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
  onAddPrompt,
  isAdmin,
  onOpenAdminLogin
}) => {
  const [branch, setBranch] = useState<string>('Matematik');
  const [gradeLevel, setGradeLevel] = useState<string>('Ortaokul (5-8. Sınıf)');
  const [taskType, setTaskType] = useState<string>('plan');
  const [topic, setTopic] = useState<string>('Rasyonel Sayılar ve Dört İşlem');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isEditingPromptText, setIsEditingPromptText] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedToLibrarySuccess, setSavedToLibrarySuccess] = useState<boolean>(false);

  // Task types list (customizable by Admin)
  const [taskTypes, setTaskTypes] = useState<TaskTypeDefinition[]>(() => {
    try {
      const saved = localStorage.getItem('portal_custom_task_types');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_TASK_TYPES;
  });

  // Modal for editing task formula definition
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState<boolean>(false);
  const [editingTaskType, setEditingTaskType] = useState<TaskTypeDefinition | null>(null);
  const [taskTypeLabelInput, setTaskTypeLabelInput] = useState<string>('');
  const [taskTypeFormulaInput, setTaskTypeFormulaInput] = useState<string>('');

  const branches = [
    'Matematik',
    'Fen Bilimleri / Fizik / Kimya / Biyoloji',
    'Türkçe / Türk Dili ve Edebiyatı',
    'Sosyal Bilgiler / Tarih / Coğrafya',
    'İngilizce / Yabancı Dil',
    'Bilişim Teknolojileri & Yazılım',
    'Görsel Sanatlar & Müzik',
    'Rehberlik & Özel Eğitim',
    'Din Kültürü ve Ahlak Bilgisi'
  ];

  const gradeLevels = [
    'İlkokul (1-4. Sınıf)',
    'Ortaokul (5-8. Sınıf)',
    'Lise (9-12. Sınıf)',
    'Öğretmen Mesleki Gelişim'
  ];

  const handleGenerate = () => {
    if (!topic.trim()) {
      alert('Lütfen bir konu başlığı veya MEB kazanımı giriniz.');
      return;
    }

    const currentTaskDef = taskTypes.find((t) => t.id === taskType);

    if (currentTaskDef && currentTaskDef.customTemplate) {
      let templ = currentTaskDef.customTemplate;
      templ = templ.replace(/\{BRANS\}/g, branch);
      templ = templ.replace(/\{KADEME\}/g, gradeLevel);
      templ = templ.replace(/\{KONU\}/g, topic);
      setGeneratedPrompt(templ);
      setIsEditingPromptText(false);
      return;
    }

    let result = '';

    if (taskType === 'plan') {
      result = `Rol: Kıdemli ve yenilikçi bir ${branch} öğretmenisin.
Hedef Kitle: ${gradeLevel} seviyesindeki öğrenciler.
Konu / MEB Kazanımı: ${topic}
Görev: 40 dakikalık bir ders için MEB 5E Modeline (Giriş, Keşfetme, Açıklama, Derinleştirme, Değerlendirme) tam uyumlu, öğrenci merkezli bir ders planı hazırla.
Çıktı Formatı:
1. Giriş (Engage - 5 Dk): Dikkati çeken günlük yaşam problemi veya şaşırtıcı soru.
2. Keşfetme (Explore - 15 Dk): Öğrencilerin grupça yapacağı mini etkinlik veya sorgulama adımı.
3. Açıklama (Explain - 10 Dk): Kavramın öğretmen ve öğrenci diyaloguyla netleştirilmesi.
4. Derinleştirme (Elaborate - 7 Dk): Bilginin yeni bir alana transfer edilmesini sağlayan düşündürücü soru.
5. Değerlendirme (Evaluate - 3 Dk): Çıkış kartı (Exit ticket) olarak sorulacak 2 hızlı kontrol sorusu ve doğru cevapları.
Üslup: Açık, yapılandırılmış, uygulanabilir ve pedagojik ilkelere tam uygun.`;
    } else if (taskType === 'exam') {
      result = `Rol: Ölçme ve değerlendirme uzmanı bir ${branch} öğretmenisin.
Hedef Kitle: ${gradeLevel} seviyesi.
Kazanım / Konu: ${topic}
Görev: MEB Ortak Sınav yönetmeliğine uygun, Bloom Taksonomisi'nin farklı basamaklarını (Uygulama, Analiz, Değerlendirme) ölçen 3 adet senaryo tabanlı açık uçlu sınav sorusu hazırla.
Çıktı Formatı:
- Soru 1 (Uygulama düzeyi): Gerçek yaşam bağlantılı senaryo ve açık uçlu soru.
- Soru 2 (Analiz düzeyi): Tablo, veri veya olay örgüsü içeren derinlemesine soru.
- Soru 3 (Değerlendirme / Çıkarım düzeyi): Sebep-sonuç ilişkisini gerekçelendiren soru.
- Analitik Rubrik Tablosu: Her soru için 'Tam Başarılı (10 Puan)', 'Geliştirilmeli (5 Puan)' ve 'Yetersiz (0 Puan)' kriterlerini içeren detaylı puanlama anahtarı.`;
    } else if (taskType === 'socratic') {
      result = `Sistem Komutu: Sen ${gradeLevel} düzeyinde bir öğrenciye rehberlik eden sabırlı, samimi ve Sokratik sorgulama yöntemini kullanan bir ${branch} öğretmenisin.
Çalışılan Konu: ${topic}
Temel Çalışma Kuralın:
Öğrenci sana bu konuyla ilgili hangi soruyu veya ödevi sorarsa sorsun, ASLA ve KAT'A doğrudan doğru cevabı ya da nihai matematiksel/metinsel sonucu söylemeyeceksin!
İzleyeceğin Adımlar:
1. Öğrencinin sorusunu takdir et ("Güzel bir soru sordun", "Çok iyi bir noktaya değindin").
2. Ona önceki bildiklerini hatırlatacak 1 adet yönlendirici soru sor ve düşünmesi için ufak bir ipucu ver.
3. Öğrenci doğru yanıta yaklaştıkça onu cesaretlendirip sonraki adıma geçir.
Üslup: Samimi, pedagojik ve her zaman Türkçe dil kurallarına uygun.`;
    } else if (taskType === 'visual') {
      result = `Rol: Eğitim teknolojileri ve görsel tasarım uzmanısın.
Ders & Kademe: ${branch} - ${gradeLevel}
Konu: ${topic}
Görev: Bu konunun sınıfta veya okul koridorunda sergilenecek bir eğitim posteri/afişi için Midjourney, DALL-E 3 veya Canva Magic Media gibi görsel yapay zekâ araçlarında kullanılacak yüksek çözünürlüklü, fotogerçekçi ve pedagojik görsel istemi (prompt) oluştur.
Çıktı Detayları:
1. Türkçe Detaylı İstem: Sahne kompozisyonu, ışıklandırma, renk paleti ve pedagojik simgeler.
2. English Midjourney/DALL-E Prompt: 8k resolution, cinematic lighting, educational concept art, vibrant and clean, --ar 16:9 formatında hazır İngilizce prompt.
3. Afişte Yer Alacak 1 Cümlelik Vurucu Eğitim Sloganı: Konuyu özetleyen ilham verici Türkçe başlık.`;
    } else if (taskType === 'letter') {
      result = `Rol: Veli iletişiminde uzman bir ${branch} rehber öğretmenisin.
Kademe: ${gradeLevel}
Öğrenci Durumu: ${topic} konusunda sınıfta çaba gösteren ancak daha fazla pekiştirmeye ihtiyaç duyan bir öğrenci.
Görev: Öğrencinin velisine iletilmek üzere, öğrencinin dersteki olumlu yönlerini öne çıkaran, evde birlikte yapılabilecek 2 somut çalışma önerisi sunan nazik, yapıcı ve profesyonel bir bilgilendirme mektubu yaz.
Format:
- Saygılı ve samimi bir hitap.
- Dersteki gayret ve potansiyelin takdiri (1 paragraf).
- Evde desteklenebilecek pratik ve eğlenceli 2 etkinlik tavsiyesi (Madde imleriyle).
- İş birliği ve teşekkür kapanışı (En fazla 150 kelime).`;
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

    if (onAddPrompt) {
      onAddPrompt(newPromptTemplate);
    }
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

  return (
    <div className="space-y-8" id="prompt-generator-section">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Öğretmenler İçin İnteraktif Prompt (İstem) Üreticisi
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Canlı İstem Sihirbazı
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Ders planı, MEB sınavı, Sokratik koç ve görsel afiş için RGB/RTF standartlarında Türkçe pedagojik istemler oluşturun ve canlı düzenleyin.
          </p>
        </div>

        {/* Admin Status Badge */}
        {isAdmin && (
          <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Düzenleme Yetkisi Aktif</span>
            </div>
          </div>
        )}
      </div>

      {/* INTERACTIVE PROMPT GENERATOR GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Controls */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>İstem Parametreleri</span>
            </h4>
            <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-mono font-semibold">
              RGB / RTF
            </span>
          </div>

          {/* Branch Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Branş / Alan</label>
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
            <label className="text-xs font-semibold text-slate-300">Öğretim Kademesi</label>
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
            />
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
                    <span className="text-emerald-400 font-medium">Yönetici Canlı Düzenleme Aktif</span>
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
                <p className="text-xs">Sol panelden branş, kademe ve konuyu seçip "Pedagojik İstem (Prompt) Oluştur" butonuna basınız.</p>
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
    </div>
  );
};
