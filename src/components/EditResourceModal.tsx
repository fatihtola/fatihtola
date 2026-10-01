import React, { useState, useEffect } from 'react';
import { X, Save, PlusCircle, FileText } from 'lucide-react';
import { ResourceItem } from '../types';

interface EditResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (resource: ResourceItem) => void;
  editingResource: ResourceItem | null;
}

export const EditResourceModal: React.FC<EditResourceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingResource
}) => {
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [category, setCategory] = useState<ResourceItem['category']>('Resmi Mevzuat');
  const [fileType, setFileType] = useState('PDF / Doküman');
  const [linkText, setLinkText] = useState('Dokümanı İncele');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingResource) {
      setTitle(editingResource.title);
      setOrganization(editingResource.organization);
      setCategory(editingResource.category);
      setFileType(editingResource.fileType);
      setLinkText(editingResource.linkText);
      setUrl(editingResource.url);
      setDescription(editingResource.description);
    } else {
      setTitle('');
      setOrganization('Millî Eğitim Bakanlığı');
      setCategory('Resmi Mevzuat');
      setFileType('PDF / Mevzuat');
      setLinkText('Dokümanı İncele');
      setUrl('https://meb.gov.tr');
      setDescription('');
    }
  }, [editingResource, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const resourceToSave: ResourceItem = {
      id: editingResource ? editingResource.id : `res-${Date.now()}`,
      title: title.trim(),
      organization: organization.trim() || 'Millî Eğitim Bakanlığı',
      category,
      fileType: fileType.trim() || 'PDF / Doküman',
      linkText: linkText.trim() || 'Dokümanı İncele',
      url: url.trim() || 'https://meb.gov.tr',
      description: description.trim() || 'Eğitim teknolojileri ve yapay zekâ kaynak belgesi.'
    };

    onSave(resourceToSave);
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
            {editingResource ? <Save className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">
              {editingResource ? 'Kaynağı / Şablonu Düzenle' : 'Yeni Ek Kaynak / Şablon Ekle'}
            </h4>
            <p className="text-xs text-slate-400">
              Yönetici Paneli: Mevzuat, etik ilkeler, resmi kılavuzlar veya indirilebilir ders şablonları
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Kaynak / Şablon Başlığı</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: MEB Eğitimde Yapay Zekâ Politika Belgesi ve Etik İlkeler Kılavuzu"
              className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Kurum / Organizasyon</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Örn: Millî Eğitim Bakanlığı, UNESCO, vb."
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="Resmi Mevzuat">Resmi Mevzuat</option>
                <option value="Etik & Güvenlik">Etik & Güvenlik</option>
                <option value="Prompt Kütüphanesi">Prompt Kütüphanesi</option>
                <option value="Ders Şablonu">Ders Şablonu</option>
                <option value="Teknik Rehber">Teknik Rehber</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Dosya Türü / Biçim</label>
              <input
                type="text"
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                placeholder="Örn: PDF / Mevzuat, Word / Markdown"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Buton / Bağlantı Metni</label>
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Örn: MEB Dokümanını İncele, Şablonu Kopyala"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Bağlantı URL'si</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://meb.gov.tr veya #5e-template"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Açıklama</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="MEB tarafından yayımlanan, okullarda yapay zekâ kullanımında öğrenci veri gizliliği, telif hakları ve etik sorumlulukları düzenleyen resmi temel referans metni."
              className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              required
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
              <span>{editingResource ? 'Değişiklikleri Kaydet' : 'Kaynağı Ekle'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
