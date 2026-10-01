import React, { useState, useEffect } from 'react';
import { X, Save, PlusCircle, Wrench } from 'lucide-react';
import { AIToolItem } from '../types';

interface EditToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tool: AIToolItem) => void;
  editingTool: AIToolItem | null;
}

export const EditToolModal: React.FC<EditToolModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTool
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<AIToolItem['category']>('Asistan & Sohbet');
  const [pricing, setPricing] = useState<AIToolItem['pricing']>('Ücretsiz');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [educationUseCase, setEducationUseCase] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    if (editingTool) {
      setName(editingTool.name);
      setCategory(editingTool.category);
      setPricing(editingTool.pricing);
      setUrl(editingTool.url);
      setDescription(editingTool.description);
      setEducationUseCase(editingTool.educationUseCase);
      setTagsText(editingTool.tags.join(', '));
      setFeatured(Boolean(editingTool.featured));
    } else {
      setName('');
      setCategory('Asistan & Sohbet');
      setPricing('Ücretsiz');
      setUrl('https://');
      setDescription('');
      setEducationUseCase('');
      setTagsText('Eğitim, Öğretmen, AI');
      setFeatured(false);
    }
  }, [editingTool, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const tagsArray = tagsText
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const toolToSave: AIToolItem = {
      id: editingTool ? editingTool.id : `tool-${Date.now()}`,
      name: name.trim(),
      category,
      pricing,
      url: url.trim() || 'https://',
      description: description.trim() || 'Eğitimde yapay zekâ uygulaması.',
      educationUseCase: educationUseCase.trim() || 'Sınıf içi ders ve materyal hazırlığı.',
      featured,
      tags: tagsArray.length > 0 ? tagsArray : ['Eğitim', 'Yapay Zekâ']
    };

    onSave(toolToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
            {editingTool ? <Save className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">
              {editingTool ? 'Yapay Zekâ Aracını Düzenle' : 'Yeni Yapay Zekâ Aracı Ekle'}
            </h4>
            <p className="text-xs text-slate-400">
              Yönetici Paneli: Eğitimde öne çıkan yapay zekâ uygulaması bilgilerini düzenleyin
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-300">Araç Adı</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Curipod, Brisk Teaching, NotebookLM"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Fiyatlandırma</label>
              <select
                value={pricing}
                onChange={(e) => setPricing(e.target.value as any)}
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="Ücretsiz">Ücretsiz</option>
                <option value="Freemium">Freemium</option>
                <option value="MEB / Kurumsal">MEB / Kurumsal</option>
                <option value="Ücretli">Ücretli</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="Asistan & Sohbet">Asistan & Sohbet</option>
                <option value="Ders & Sunum">Ders & Sunum</option>
                <option value="Soru & Değerlendirme">Soru & Değerlendirme</option>
                <option value="Görsel & Tasarım">Görsel & Tasarım</option>
                <option value="Ses & Video">Ses & Video</option>
                <option value="Üretken Kod & Web">Üretken Kod & Web</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Web URL Bağlantısı</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://curipod.com"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Genel Açıklama</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Öğretmenler için tek komutla etkileşimli sunum, anket ve çizim etkinlikleri üreten yapay zekâ sunum aracı."
              className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">🏫 Sınıf İçi ve Öğretmen Kullanım Senaryosu</label>
            <textarea
              rows={2}
              value={educationUseCase}
              onChange={(e) => setEducationUseCase(e.target.value)}
              placeholder="Öğrencilerin cep telefonundan veya akıllı tahtadan katıldığı canlı anket ve tartışma dersleri."
              className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-300">Etiketler (Virgülle ayırınız)</label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="İnteraktif, Akıllı Tahta, Sunum, Anket"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <input
                type="checkbox"
                id="toolFeaturedCheckbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700"
              />
              <label htmlFor="toolFeaturedCheckbox" className="text-xs font-semibold text-blue-300 cursor-pointer">
                Öne Çıkarılsın
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>{editingTool ? 'Değişiklikleri Kaydet' : 'Aracı Ekle'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
