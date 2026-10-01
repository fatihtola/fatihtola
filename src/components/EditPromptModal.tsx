import React, { useState, useEffect } from 'react';
import { X, Save, PlusCircle, Sparkles } from 'lucide-react';
import { PromptTemplate } from '../types';

interface EditPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prompt: PromptTemplate) => void;
  editingPrompt: PromptTemplate | null;
}

export const EditPromptModal: React.FC<EditPromptModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingPrompt
}) => {
  const [title, setTitle] = useState('');
  const [branch, setBranch] = useState('Tüm Branşlar');
  const [gradeLevel, setGradeLevel] = useState('Ortaokul / Lise');
  const [goal, setGoal] = useState('');
  const [recommendedModel, setRecommendedModel] = useState('ChatGPT veya Claude');
  const [promptText, setPromptText] = useState('');

  useEffect(() => {
    if (editingPrompt) {
      setTitle(editingPrompt.title);
      setBranch(editingPrompt.branch);
      setGradeLevel(editingPrompt.gradeLevel);
      setGoal(editingPrompt.goal);
      setRecommendedModel(editingPrompt.recommendedModel);
      setPromptText(editingPrompt.promptText);
    } else {
      setTitle('');
      setBranch('Tüm Branşlar');
      setGradeLevel('Tüm Seviyeler');
      setGoal('');
      setRecommendedModel('ChatGPT veya Claude');
      setPromptText(`Rol: Kıdemli bir [Branşınız] öğretmenisin.
Hedef Kitle: [Sınıf Seviyesi]
Konu: [Ders Konusu]
Görev: ...`);
    }
  }, [editingPrompt, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !promptText.trim()) return;

    const promptToSave: PromptTemplate = {
      id: editingPrompt ? editingPrompt.id : `pr-${Date.now()}`,
      title: title.trim(),
      branch: branch.trim() || 'Tüm Branşlar',
      gradeLevel: gradeLevel.trim() || 'Tüm Seviyeler',
      goal: goal.trim() || 'Ders materyali ve öğrenme sürecini zenginleştirmek.',
      recommendedModel: recommendedModel.trim() || 'ChatGPT veya Claude',
      promptText: promptText.trim()
    };

    onSave(promptToSave);
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
            {editingPrompt ? <Save className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">
              {editingPrompt ? 'Örnek Prompt Şablonunu Düzenle' : 'Yeni Prompt Şablonu Ekle'}
            </h4>
            <p className="text-xs text-slate-400">
              Yönetici Paneli: Öğretmenler için tek tıkla kopyalanabilen pedagojik istem şablonu
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Şablon Başlığı</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Kazanım Odaklı 40 Dakikalık 5E Ders Planı"
              className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Uygun Branş</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Örn: Matematik / Fen / Tüm Branşlar"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Sınıf Kademesi</label>
              <input
                type="text"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                placeholder="Örn: İlkokul / Ortaokul / Lise"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Önerilen Model</label>
              <input
                type="text"
                value={recommendedModel}
                onChange={(e) => setRecommendedModel(e.target.value)}
                placeholder="Örn: Claude 3.7 veya GPT-4o"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Hedef ve Kazanım Açıklaması</label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Örn: Ders planı hazırlama süresini kısaltmak ve MEB kazanımına %100 uyum sağlamak."
              className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Prompt / İstem Metni</label>
            <textarea
              rows={8}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Rol: 15 yıllık kıdemli bir [Branşınız] öğretmenisin..."
              className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-blue-500 font-mono leading-relaxed"
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
              <span>{editingPrompt ? 'Değişiklikleri Kaydet' : 'Şablonu Ekle'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
