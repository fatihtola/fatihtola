import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  BookOpen, 
  Cpu
} from 'lucide-react';
import { copyTextToClipboard } from '../utils/clipboard';

export const PromptGeneratorSection: React.FC = () => {
  const [branch, setBranch] = useState<string>('Matematik');
  const [gradeLevel, setGradeLevel] = useState<string>('Ortaokul (5-8. Sınıf)');
  const [taskType, setTaskType] = useState<string>('plan');
  const [topic, setTopic] = useState<string>('Rasyonel Sayılar ve Dört İşlem');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const branches = [
    'Matematik',
    'Fen Bilimleri / Fizik / Kimya / Biyoloji',
    'Türkçe / Türk Dili ve Edebiyatı',
    'İngilizce / Yabancı Diller',
    'Sosyal Bilgiler / Tarih / Coğrafya',
    'Sınıf Öğretmenliği (İlkokul)',
    'Rehberlik & Psikolojik Danışmanlık',
    'Bilişim Teknolojileri ve Yazılım',
    'Görsel Sanatlar & Müzik'
  ];

  const gradeLevels = [
    'İlkokul (1-4. Sınıf)',
    'Ortaokul (5-8. Sınıf)',
    'Lise (9-12. Sınıf)'
  ];

  const taskTypes = [
    { id: 'plan', label: 'MEB 5E Modeli Ders Planı' },
    { id: 'exam', label: 'Açık Uçlu Sınav ve Analitik Rubrik' },
    { id: 'socratic', label: 'Sokratik Öğrenci Koçu (İpucu Veren Bot)' },
    { id: 'visual', label: 'Pano Afişi & Görsel Üretim İstemi' },
    { id: 'letter', label: 'Veli Bilgilendirme ve Gelişim Mektubu' }
  ];

  const handleGenerate = () => {
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
1. Öğrencinin sorusunu takdir et ("Güzel bir soru sordun Ahmet, birlikte adım adım bulalım" gibi).
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
    }

    setGeneratedPrompt(result);
  };

  const handleCopy = async () => {
    if (!generatedPrompt) return;
    const success = await copyTextToClipboard(generatedPrompt);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8" id="prompt-generator-section">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            İnteraktif Öğretmen Prompt Üreticisi
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Branşınızı, sınıf seviyenizi ve konunuzu seçin; RGB/RTF formüllerine tam uyumlu hazır öğretmen istemi oluşturun.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Controls */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            Parametreleri Seçin
          </h4>

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

          {/* Task Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Hazırlanacak Görev / Çıktı Türü</label>
            <div className="space-y-1.5">
              {taskTypes.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setTaskType(t.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                    taskType === t.id
                      ? 'bg-blue-600/20 text-blue-300 border-blue-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {t.label}
                </button>
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
            <span>Kusursuz İstem (Prompt) Oluştur</span>
          </button>
        </div>

        {/* Output Preview */}
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                Üretilen Pedagojik İstem
              </span>
              {generatedPrompt && (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Kullanıma Hazır
                </span>
              )}
            </div>

            {generatedPrompt ? (
              <pre className="text-xs font-mono text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800/90 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                {generatedPrompt}
              </pre>
            ) : (
              <div className="py-16 text-center text-slate-500 space-y-2">
                <Sparkles className="w-8 h-8 mx-auto text-slate-600" />
                <p className="text-xs">Sol panelden kriterleri belirleyip "İstem Oluştur" butonuna basınız.</p>
              </div>
            )}
          </div>

          {generatedPrompt && (
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400">
                Bu metni kopyalayıp doğrudan <strong>ChatGPT, Google Gemini veya Claude</strong>'a yapıştırabilirsiniz.
              </span>
              <button
                onClick={handleCopy}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all active:scale-95"
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
    </div>
  );
};
