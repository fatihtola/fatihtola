import React, { useState } from 'react';
import { 
  Cpu, 
  ExternalLink, 
  Copy, 
  Check, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { LANGUAGE_MODELS, SAMPLE_PROMPT_CATALOG } from '../data/portalData';
import { copyTextToClipboard } from '../utils/clipboard';

export const LanguageModelsSection: React.FC = () => {
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [selectedFormula, setSelectedFormula] = useState<'rgb' | 'rtf' | 'socratic' | 'fewshot'>('rgb');

  const copyText = async (text: string, id: string) => {
    const success = await copyTextToClipboard(text);
    if (success) {
      setCopiedPromptId(id);
      setTimeout(() => setCopiedPromptId(null), 2500);
    }
  };

  return (
    <div className="space-y-10" id="language-models-section">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Dil Modelleri (LLM) ve Öğretmenler İçin İstem Rehberi
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Eğitimde en güçlü üretken yapay zekâ modellerinin karşılaştırması, bağlam pencereleri ve hatasız istem yazma formülleri.
        </p>
      </div>

      {/* LLM Pedagogical Overview Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-950/30 via-slate-900 to-indigo-950/30 border border-blue-900/40 p-5 sm:p-7 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">
              Büyük Dil Modeli (LLM) Nedir ve Eğitimde Nasıl Konumlandırılmalıdır?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              LLM'ler devasa miktarda metin verisiyle eğitilmiş, bir sonraki kelimenin olasılığını hesaplayarak yanıt üreten istatistiksel zekâ motorlarıdır. İnsan gibi 'anlamaz' veya 'hissetmez', ancak kavramlar arasındaki örüntüleri kusursuz şekilde bilir. Bir öğretmenin sınıftaki <strong>en hızlı araştırma asistanı</strong> ve <strong>içerik taslak makinesidir</strong>.
            </p>
          </div>
        </div>

        {/* 3 Core Rules for Teachers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Halüsinasyon Riski
            </div>
            <p className="text-xs text-slate-400">
              Model bilmediği bir MEB yönetmeliği veya tarihi tarihi uydurabilir. Çıktılar mutlaka öğretmen süzgecinden geçirilmelidir.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
              <Zap className="w-3.5 h-3.5" />
              Bağlam Gücü
            </div>
            <p className="text-xs text-slate-400">
              Modele ne kadar net rol, hedef kitle ve örnek verirseniz, aldığınız pedagojik verim o kadar yüksek olur.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mb-1">
              <Lightbulb className="w-3.5 h-3.5" />
              Sokratik Yaklaşım
            </div>
            <p className="text-xs text-slate-400">
              Öğrenciye cevabı vermeyip adım adım düşündüren yönlendirici bir öğrenme koçu olarak kurgulanabilir.
            </p>
          </div>
        </div>
      </div>

      {/* Language Models Comparison Cards */}
      <div className="space-y-4">
        <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
          <span className="w-1.5 h-4 bg-blue-500 rounded-full" />
          Öne Çıkan Modeller ve Eğitim Özellikleri
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {LANGUAGE_MODELS.map((model) => (
            <div
              key={model.id}
              id={`model-card-${model.id}`}
              className="bg-slate-900/70 border border-slate-800 hover:border-blue-800/70 rounded-2xl p-5 sm:p-6 space-y-5 transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-lg font-bold text-white">{model.name}</h5>
                      {model.badge && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                          {model.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400">Geliştirici: {model.developer}</span>
                  </div>

                  <a
                    href={model.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-blue-400 transition-colors"
                  >
                    <span>Kullan</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Context Window & Best For */}
                <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">Hafıza / Bağlam</span>
                    <span className="font-mono font-bold text-cyan-400">{model.contextWindow}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">Ücretsiz Durumu</span>
                    <span className="font-medium text-emerald-400">{model.freeTierStatus.split(',')[0]}</span>
                  </div>
                </div>

                {/* Strengths List */}
                <div className="space-y-1.5 my-3">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Öne Çıkan Güçlü Yönleri</span>
                  {model.strengths.map((s, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Fit Footer */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 text-xs">
                <span className="font-bold text-slate-200 block mb-1">
                  🎓 Öğretmen İçin En Uygun Kullanım:
                </span>
                <p className="text-slate-400 italic">
                  {model.educationFit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TEACHER PROMPT ENGINEERING FORMULAS */}
      <div className="space-y-5 pt-4">
        <div className="border-b border-slate-800 pb-3">
          <h4 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 bg-blue-500 rounded-full" />
            Öğretmenler İçin İstem (Prompt) Mühendisliği Formülleri
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Modelden öğretmen düzeyinde sonuç almak için kullanılan altın kurallar
          </p>
        </div>

        {/* Formula Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedFormula('rgb')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedFormula === 'rgb'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
            }`}
          >
            RGB Formülü (Rol - Girdi - Beklenen Çıktı)
          </button>
          <button
            onClick={() => setSelectedFormula('rtf')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedFormula === 'rtf'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
            }`}
          >
            RTF Formülü (Rol - Görev - Format)
          </button>
          <button
            onClick={() => setSelectedFormula('socratic')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedFormula === 'socratic'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
            }`}
          >
            Sokratik Yöntem (Düşündüren Öğretmen)
          </button>
          <button
            onClick={() => setSelectedFormula('fewshot')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedFormula === 'fewshot'
                ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
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
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">1. ROL (Role)</span>
                  <p className="text-xs text-slate-300">Modele kim olduğunu ve uzmanlığını söyleyin. (Örn: "15 yıllık MEB Matematik Öğretmenisin.")</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">2. GİRDİ (Input)</span>
                  <p className="text-xs text-slate-300">Kazanım metni, öğrenci seviyesi veya kaynak dökümanı sunun. (Örn: "7. Sınıf Rasyonel Sayılar MEB kazanımı.")</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">3. BEKLENEN ÇIKTI (Output)</span>
                  <p className="text-xs text-slate-300">Çıktının yapısı: Rubrik tablosu, soru adedi, cevap anahtarı. (Örn: "3 açık uçlu soru + analitik rubrik.")</p>
                </div>
              </div>
            </div>
          )}

          {selectedFormula === 'rtf' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-base font-bold text-white">RTF Formülü: Role + Task + Format</h5>
                  <p className="text-xs text-slate-400">Hızlı günlük görevler, veli mektupları ve ders planları için idealdir.</p>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  R - T - F
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">ROLE (Rol)</span>
                  <p className="text-xs text-slate-300">"Pedagojik danışman ve sınıf rehber öğretmenisin."</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">TASK (Görev)</span>
                  <p className="text-xs text-slate-300">"Derse ilgisi azalan bir öğrencinin velisine motive edici gelişim mektubu hazırla."</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">FORMAT (Format)</span>
                  <p className="text-xs text-slate-300">"En fazla 150 kelimelik, nazik ve çözüm odaklı 3 paragraf."</p>
                </div>
              </div>
            </div>
          )}

          {selectedFormula === 'socratic' && (
            <div className="space-y-3">
              <h5 className="text-base font-bold text-white">Sokratik Yöntem (Düşündüren Öğretmen İstem Mantığı)</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Öğrencilerin yapay zekâya ödevlerini doğrudan yaptırmasını engellemek için, yapay zekânın sistem komutuna:
                <br />
                <code className="text-xs font-mono text-emerald-400 bg-slate-950 p-2 rounded block my-2 border border-slate-800">
                  "Öğrenci ne sorarsa sorsun doğrudan cevabı verme. Öğrenciye onun bildiği eski bir konuyu hatırlatan bir soru sorarak çözüme kendi ulaşmasını sağla."
                </code>
                talimatı eklenir. Böylece model bir 'ödev çözücü' değil, 'kişisel akıl hocası' olur.
              </p>
            </div>
          )}

          {selectedFormula === 'fewshot' && (
            <div className="space-y-3">
              <h5 className="text-base font-bold text-white">Few-Shot İstemleme (Örnek Göstererek Eğitme)</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Model sizin okulunuzun sınav şablonunu veya puanlama tarzını ezbere bilmez. İstemin içine:
                <br />
                <code className="text-xs font-mono text-blue-300 bg-slate-950 p-2 rounded block my-2 border border-slate-800">
                  "Örnek Soru 1: [Geçen yıl sorduğunuz tam puanlık soru ve cevap]<br />
                  Şimdi tam bu pedagojik seviyede ve bu formatta 3 yeni soru türet."
                </code>
                eklediğinizde, model ilk örneğin tonunu, zorluk derecesini ve rubrik stilini taklit eder.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* READY-TO-USE TEACHER PROMPTS CATALOG */}
      <div className="space-y-4 pt-4">
        <h4 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <span className="w-1.5 h-4 bg-blue-500 rounded-full" />
          Öğretmenler İçin Hazır Şablonlar (Tek Tıkla Kopyala)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_PROMPT_CATALOG.map((item) => (
            <div
              key={item.id}
              id={`sample-prompt-${item.id}`}
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    {item.branch}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {item.recommendedModel}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-white">{item.title}</h5>
                <p className="text-xs text-slate-400 mt-0.5">{item.goal}</p>

                {/* Prompt Preview Box */}
                <pre className="text-xs font-mono text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800/80 mt-3 whitespace-pre-wrap max-h-40 overflow-y-auto leading-relaxed">
                  {item.promptText}
                </pre>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => copyText(item.promptText, item.id)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-98"
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
      </div>
    </div>
  );
};
