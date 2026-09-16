import React, { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Copy, 
  Check, 
  X
} from 'lucide-react';
import { ADDITIONAL_RESOURCES } from '../data/portalData';
import { ResourceItem } from '../types';
import { copyTextToClipboard } from '../utils/clipboard';

export const ResourcesSection: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<{ title: string; content: string } | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const sample5ETemplate = `# MEB 5E Modeli Yapay Zekâ Destekli Ders Planı Şablonu

## 1. Genel Bilgiler
- **Ders:** [Ders Adı]
- **Sınıf Seviyesi:** [Örn: 7. Sınıf]
- **Ünite / Konu:** [Konu Başlığı]
- **Süre:** 40 Dakika (1 Ders Saati)
- **MEB Kazanımı:** [Örn: M.7.1.1.1 - Rasyonel sayıları tanır ve sayı doğrusunda gösterir.]

## 2. 5E Basamakları ve Yapay Zekâ Yönergeleri
### 1. Giriş (Engage - 5 Dk)
- *Amaç:* Ön bilgileri yoklama ve merak uyandırma.
- *Yapay Zekâ İstemi:* "[Konu] ile ilgili 7. sınıf öğrencisinin günlük hayatta karşılaşabileceği 2 dakikalık esprili ve merak uyandırıcı bir problem hikayesi yaz."

### 2. Keşfetme (Explore - 15 Dk)
- *Amaç:* Öğrencilerin grupça deney/keşif yapması.
- *Yapay Zekâ İstemi:* "3'er kişilik öğrenci gruplarının sınıfta uygulayabileceği, malzeme gerektirmeyen veya basit malzemelerle yapılan 15 dakikalık işbirlikli keşif etkinliği tasarla."

### 3. Açıklama (Explain - 10 Dk)
- *Amaç:* Kavramların netleşmesi ve formül/tanımların verilmesi.
- *Öğretmen ve Yapay Zekâ Rolü:* Sokratik soru-cevap ile öğrenciden tanımı çıkarma.

### 4. Derinleştirme (Elaborate - 7 Dk)
- *Amaç:* Bilginin yeni bir alana transfer edilmesi.
- *Yapay Zekâ İstemi:* "Bu kavramın teknoloji veya doğadaki şaşırtıcı bir yansımasını örnekleyen 1 transfer sorusu üret."

### 5. Değerlendirme (Evaluate - 3 Dk)
- *Amaç:* Hızlı anlama kontrolü (Exit Ticket).
- *Yapay Zekâ İstemi:* "Ders sonunda öğrencilerin tahtaya veya küçük kağıda yazacağı 2 adet hızlı çıkış sorusu ve doğru cevapları."
`;

  const sampleRubricTemplate = `# MEB Açık Uçlu Sınav Analitik Rubrik Şablonu

| Soru No | Kazanım ve Bilişsel Düzey | Yetersiz (0 Puan) | Geliştirilmeli (5 Puan) | Tam Başarılı (10 Puan) |
| :--- | :--- | :--- | :--- | :--- |
| **Soru 1** | Formülü doğru seçme ve uygulama (Uygulama) | Hiçbir işlem yapmamış veya tamamen ilgisiz formül kullanmış. | Doğru formülü seçmiş fakat işlem basamağında işlem hatası yapmış. | Doğru formülü kurmuş, adımları eksiksiz yazmış ve doğru sonuca ulaşmış. |
| **Soru 2** | Olay ve sebep-sonuç ilişkisini açıklama (Analiz) | Sebep belirtmemiş, sadece olay sonucunu yazmış. | Sebebi yazmış fakat kanıt veya örnekle destekleyememiş. | Neden-sonuç bağlamını 2 somut MEB kazanım örneğiyle eksiksiz açıklamış. |
| **Soru 3** | Grafik okuma ve çıkarım yapma (Değerlendirme) | Grafikteki eksenleri yanlış okumuş. | Verileri doğru okumuş ancak geleceğe yönelik tutarlı çıkarım yapamamış. | Verileri doğru okumuş, eğilimi açıklamış ve mantıksal çıkarımını gerekçelendirmiş. |
`;

  const handleOpenTemplate = (type: string) => {
    if (type === '5e') {
      setSelectedTemplate({
        title: 'MEB 5E Modeli Ders Planı Şablonu',
        content: sample5ETemplate
      });
    } else {
      setSelectedTemplate({
        title: 'MEB Açık Uçlu Sınav Analitik Rubrik Şablonu',
        content: sampleRubricTemplate
      });
    }
  };

  const copyTemplateContent = async () => {
    if (!selectedTemplate) return;
    const success = await copyTextToClipboard(selectedTemplate.content);
    if (success) {
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2000);
    }
  };

  return (
    <div className="space-y-8" id="additional-resources-section">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Ek Kaynaklar, Mevzuat & İndirilebilir Şablonlar
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Eğitimde yapay zekânın yasal, etik ve pedagojik kurallarına ilişkin resmi kılavuzlar ve hazır ders planı şablonları
        </p>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ADDITIONAL_RESOURCES.map((resource: ResourceItem) => (
          <div
            key={resource.id}
            id={`resource-card-${resource.id}`}
            className="group flex flex-col justify-between bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-blue-700/60 rounded-2xl p-5 transition-all shadow-sm"
          >
            <div>
              {/* Category & Org */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {resource.category}
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {resource.fileType}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                {resource.title}
              </h4>

              <span className="text-xs text-slate-500 font-medium block mt-1">
                {resource.organization}
              </span>

              {/* Description */}
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed font-light">
                {resource.description}
              </p>
            </div>

            {/* Action Link / Trigger */}
            <div className="mt-5 pt-3.5 border-t border-slate-800/80">
              {resource.id === 'res-ders-plani-sablonu' ? (
                <button
                  onClick={() => handleOpenTemplate('5e')}
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-semibold border border-blue-500/30 transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>5E Şablonunu Aç & Kopyala</span>
                </button>
              ) : resource.id === 'res-prompt-bankasi' ? (
                <button
                  onClick={() => handleOpenTemplate('rubrik')}
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-semibold border border-blue-500/30 transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Rubrik Tablosunu Aç & Kopyala</span>
                </button>
              ) : (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                >
                  <span>{resource.linkText}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Google AI Studio Guide Card */}
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-cyan-950/40 border border-blue-900/50 rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              ÖĞRETMENLER İÇİN ÜCRETSİZ ARAÇ
            </span>
            <h4 className="text-lg font-bold text-white mt-1.5">
              Google AI Studio ile Kendi Okul Asistanınızı Ücretsiz Çalıştırma
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Google AI Studio, öğretmenlere sıfır kodlama ile System Instructions (Sistem Talimatı) vererek
              Gemini 2.0 Flash modelleri üzerinden çalışan branşa özel asistan geliştirme imkanı sunar.
            </p>
          </div>
          <a
            href="https://aistudio.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all self-start sm:self-auto"
          >
            <span>AI Studio'ya Git</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-xs font-bold text-blue-400 block mb-1">1. Adım: Giriş</span>
            <p className="text-xs text-slate-400">Google hesabınızla aistudio.google.com adresine bağlanın.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-xs font-bold text-indigo-400 block mb-1">2. Adım: Sistem Talimatı</span>
            <p className="text-xs text-slate-400">"System Instructions" alanına Sokratik öğretmen kuralınızı yapıştırın.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-xs font-bold text-cyan-400 block mb-1">3. Adım: Test & Paylaş</span>
            <p className="text-xs text-slate-400">Ders kitabı PDF'inizi ekleyin ve branşınıza özel asistanınızı sınıf tahtasında test edin.</p>
          </div>
        </div>
      </div>

      {/* Template Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                {selectedTemplate.title}
              </h4>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <pre className="text-xs font-mono text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 whitespace-pre-wrap leading-relaxed">
                {selectedTemplate.content}
              </pre>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedTemplate(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700"
              >
                Kapat
              </button>
              <button
                onClick={copyTemplateContent}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all"
              >
                {copiedTemplate ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Tüm Metni Kopyala</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
