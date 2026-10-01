import React, { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Copy, 
  Check, 
  X,
  Edit3,
  Trash2,
  PlusCircle,
  Lock,
  ShieldCheck,
  DownloadCloud,
  FileCheck
} from 'lucide-react';
import { ResourceItem } from '../types';
import { copyTextToClipboard } from '../utils/clipboard';
import { EditResourceModal } from './EditResourceModal';

interface ResourcesSectionProps {
  resources: ResourceItem[];
  onUpdateResource: (resource: ResourceItem) => void;
  onAddResource: (resource: ResourceItem) => void;
  onDeleteResource: (resourceId: string) => void;
  isAdmin: boolean;
  onOpenAdminLogin: (reason?: string) => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  resources,
  onUpdateResource,
  onAddResource,
  onDeleteResource,
  isAdmin,
  onOpenAdminLogin
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<{ title: string; content: string } | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

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

  const categories = [
    { id: 'all', label: 'Tüm Kaynaklar' },
    { id: 'Resmi Mevzuat', label: 'Resmi Mevzuat' },
    { id: 'Etik & Güvenlik', label: 'Etik & Güvenlik' },
    { id: 'Ders Şablonu', label: 'Ders Şablonu' },
    { id: 'Prompt Kütüphanesi', label: 'Prompt Kütüphanesi' },
    { id: 'Teknik Rehber', label: 'Teknik Rehber' }
  ];

  const filteredResources = resources.filter((res) => {
    return selectedCategory === 'all' || res.category === selectedCategory;
  });

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

  const handleOpenAddResource = () => {
    if (!isAdmin) {
      onOpenAdminLogin('Yeni kaynak veya şablon eklemek için lütfen yönetici girişi yapınız.');
      return;
    }
    setEditingResource(null);
    setIsResourceModalOpen(true);
  };

  const handleOpenEditResource = (resource: ResourceItem) => {
    if (!isAdmin) {
      onOpenAdminLogin('Kaynak bilgilerini düzenlemek için lütfen yönetici girişi yapınız.');
      return;
    }
    setEditingResource(resource);
    setIsResourceModalOpen(true);
  };

  return (
    <div className="space-y-8" id="additional-resources-section">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Ek Kaynaklar, Mevzuat & İndirilebilir Şablonlar
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {resources.length} Kaynak
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Eğitimde yapay zekânın yasal, etik ve pedagojik kurallarına ilişkin resmi kılavuzlar ve hazır ders planı şablonları
          </p>
        </div>

        {/* Action Buttons */}
        {isAdmin && (
          <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Düzenleme Yetkisi Aktif</span>
            </div>

            <button
              onClick={handleOpenAddResource}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yeni Kaynak Ekle</span>
            </button>
          </div>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((resource: ResourceItem) => (
          <div
            key={resource.id}
            id={`resource-card-${resource.id}`}
            className="group flex flex-col justify-between bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-blue-700/60 rounded-2xl p-5 transition-all shadow-sm"
          >
            <div>
              {/* Header Row */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {resource.category}
                </span>
                <span className="text-[11px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {resource.fileType}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                {resource.title}
              </h4>
              <span className="text-[11px] text-slate-400 font-medium block mt-1">
                Yayımlayan: {resource.organization}
              </span>

              {/* Description */}
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed font-light">
                {resource.description}
              </p>
            </div>

            {/* Action Buttons Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 mt-4">
              {isAdmin ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditResource(resource)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
                    title="Kaynağı Düzenle"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                    <span>İçeriği Düzenle</span>
                  </button>

                  {deleteConfirmId === resource.id ? (
                    <div className="flex items-center gap-1 bg-red-950/70 border border-red-800/60 p-1 rounded-lg text-xs">
                      <button
                        onClick={() => {
                          onDeleteResource(resource.id);
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
                      onClick={() => setDeleteConfirmId(resource.id)}
                      className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-900/40 transition-colors"
                      title="Kaynağı Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ) : (
                <div />
              )}

              {resource.url.startsWith('#') ? (
                <button
                  onClick={() => handleOpenTemplate(resource.url.includes('5e') ? '5e' : 'rubric')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-xs font-semibold text-blue-300 hover:text-white transition-colors"
                >
                  <span>Şablonu Aç</span>
                  <FileText className="w-3.5 h-3.5" />
                </button>
              ) : (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-xs font-semibold text-blue-300 hover:text-white transition-colors"
                >
                  <span>{resource.linkText}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* In-App Interactive Template Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <h4 className="text-base font-bold text-white">{selectedTemplate.title}</h4>
              </div>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <pre className="flex-1 overflow-y-auto text-xs font-mono text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed whitespace-pre-wrap">
              {selectedTemplate.content}
            </pre>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedTemplate(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Kapat
              </button>
              <button
                onClick={copyTemplateContent}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md active:scale-95"
              >
                {copiedTemplate ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Şablon Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Şablonu Panoya Kopyala</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Resource Modal */}
      <EditResourceModal
        isOpen={isResourceModalOpen}
        onClose={() => setIsResourceModalOpen(false)}
        onSave={(savedResource) => {
          if (editingResource) {
            onUpdateResource(savedResource);
          } else {
            onAddResource(savedResource);
          }
        }}
        editingResource={editingResource}
      />
    </div>
  );
};
