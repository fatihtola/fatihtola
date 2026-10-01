import React, { useState, useEffect } from 'react';
import { X, Save, PlusCircle, Cpu } from 'lucide-react';
import { LanguageModelItem } from '../types';

interface EditModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (model: LanguageModelItem) => void;
  editingModel: LanguageModelItem | null;
}

export const EditModelModal: React.FC<EditModelModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingModel
}) => {
  const [name, setName] = useState('');
  const [developer, setDeveloper] = useState('');
  const [badge, setBadge] = useState('');
  const [contextWindow, setContextWindow] = useState('');
  const [bestFor, setBestFor] = useState('');
  const [freeTierStatus, setFreeTierStatus] = useState('');
  const [url, setUrl] = useState('');
  const [educationFit, setEducationFit] = useState('');
  const [strengthsText, setStrengthsText] = useState('');

  useEffect(() => {
    if (editingModel) {
      setName(editingModel.name);
      setDeveloper(editingModel.developer);
      setBadge(editingModel.badge || '');
      setContextWindow(editingModel.contextWindow);
      setBestFor(editingModel.bestFor);
      setFreeTierStatus(editingModel.freeTierStatus);
      setUrl(editingModel.url);
      setEducationFit(editingModel.educationFit);
      setStrengthsText(editingModel.strengths.join('\n'));
    } else {
      setName('');
      setDeveloper('');
      setBadge('');
      setContextWindow('128k Token');
      setBestFor('');
      setFreeTierStatus('Web sürümünde ücretsiz');
      setUrl('https://');
      setEducationFit('');
      setStrengthsText('');
    }
  }, [editingModel, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const strengthsArray = strengthsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const modelToSave: LanguageModelItem = {
      id: editingModel ? editingModel.id : `model-${Date.now()}`,
      name: name.trim(),
      developer: developer.trim() || 'Yapay Zekâ Geliştiricisi',
      badge: badge.trim() || undefined,
      contextWindow: contextWindow.trim() || '128k Token',
      bestFor: bestFor.trim() || 'Eğitim & Ders Materyali',
      freeTierStatus: freeTierStatus.trim() || 'Ücretsiz erişim mevcut',
      url: url.trim() || 'https://chatgpt.com',
      educationFit: educationFit.trim() || 'Sınıf içi ders ve materyal hazırlığında kullanılabilir.',
      strengths: strengthsArray.length > 0 ? strengthsArray : ['Hızlı yanıt süresi', 'Doğal Türkçe pedagojik üslup']
    };

    onSave(modelToSave);
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
            {editingModel ? <Save className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">
              {editingModel ? 'Dil Modelini Düzenle' : 'Yeni Dil Modeli Ekle'}
            </h4>
            <p className="text-xs text-slate-400">
              Yönetici Paneli: Model parametreleri, bağlam hafızası ve eğitimde kullanım detayları
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Model Adı</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Claude 3.7 Sonnet veya GPT-4o"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Geliştirici Kurum</label>
              <input
                type="text"
                value={developer}
                onChange={(e) => setDeveloper(e.target.value)}
                placeholder="Örn: OpenAI, Anthropic, Google DeepMind"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Rozet / Badge (İsteğe Bağlı)</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Örn: Sektör Standardı, Hibrit Akıl Yürütme"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Bağlam Hafızası (Context)</label>
              <input
                type="text"
                value={contextWindow}
                onChange={(e) => setContextWindow(e.target.value)}
                placeholder="Örn: 200.000 Token (~500 Sayfa)"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">En Uygun Olduğu Alan</label>
              <input
                type="text"
                value={bestFor}
                onChange={(e) => setBestFor(e.target.value)}
                placeholder="Örn: Uzun Metin & Pedagojik Üslup"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Ücretsiz Kullanım Durumu</label>
              <input
                type="text"
                value={freeTierStatus}
                onChange={(e) => setFreeTierStatus(e.target.value)}
                placeholder="Örn: Web'de ücretsiz kotalı / API ücretli"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Web / Portal URL Bağlantısı</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://claude.ai"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">
              Öne Çıkan Güçlü Yönleri (Her satıra bir özellik yazınız)
            </label>
            <textarea
              rows={3}
              value={strengthsText}
              onChange={(e) => setStrengthsText(e.target.value)}
              placeholder={"200k token devasa hafıza ile yüzlerce sayfalık kaynak analizi\nArtifacts arayüzü ile anında çalışan interaktif kod/oyun önizlemesi\nTürkçe dil ve pedagojik tonlama hakimiyeti"}
              className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">🎓 Öğretmen İçin En Uygun Kullanım Açıklaması</label>
            <textarea
              rows={2}
              value={educationFit}
              onChange={(e) => setEducationFit(e.target.value)}
              placeholder="MEB yıllık planları, 5E ders planları, farklılaştırılmış seviyeli çalışma kâğıtları ve idari raporlar hazırlamak için."
              className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
            />
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
              <span>{editingModel ? 'Değişiklikleri Kaydet' : 'Modeli Ekle'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
