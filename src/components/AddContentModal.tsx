import React, { useState, useEffect } from 'react';
import { 
  X, 
  PlusCircle, 
  Save, 
  Sparkles
} from 'lucide-react';
import { WeekSession } from '../types';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveWeek: (week: WeekSession) => void;
  editingWeek: WeekSession | null;
  totalWeeksCount: number;
}

export const AddContentModal: React.FC<AddContentModalProps> = ({
  isOpen,
  onClose,
  onSaveWeek,
  editingWeek,
  totalWeeksCount
}) => {
  const [title, setTitle] = useState('');
  const [weekNumber, setWeekNumber] = useState(totalWeeksCount + 1);
  const [duration, setDuration] = useState('40 Dakika (1 Ders Saati)');
  const [category, setCategory] = useState<'temel' | 'icerik' | 'multimodal' | 'degerlendirme' | 'asistan' | 'proje'>('icerik');
  const [summary, setSummary] = useState('');
  const [learningOutcomes, setLearningOutcomes] = useState('');
  const [practicalExercise, setPracticalExercise] = useState('');
  const [samplePrompt, setSamplePrompt] = useState('');
  const [keyToolsText, setKeyToolsText] = useState('');

  useEffect(() => {
    if (editingWeek) {
      setTitle(editingWeek.title);
      setWeekNumber(editingWeek.weekNumber);
      setDuration(editingWeek.duration);
      setCategory(editingWeek.category);
      setSummary(editingWeek.summary);
      setLearningOutcomes(editingWeek.learningOutcomes.join('\n'));
      setPracticalExercise(editingWeek.practicalExercise);
      setSamplePrompt(editingWeek.samplePrompt);
      setKeyToolsText(editingWeek.keyTools.map(t => `${t.name} | ${t.url} | ${t.purpose}`).join('\n'));
    } else {
      setTitle('');
      setWeekNumber(totalWeeksCount + 1);
      setDuration('40 Dakika (1 Ders Saati)');
      setCategory('icerik');
      setSummary('');
      setLearningOutcomes('');
      setPracticalExercise('');
      setSamplePrompt('');
      setKeyToolsText('');
    }
  }, [editingWeek, totalWeeksCount, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const outcomesArray = learningOutcomes
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const toolsArray = keyToolsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
      .map(line => {
        const parts = line.split('|').map(p => p.trim());
        return {
          name: parts[0] || 'AI Aracı',
          url: parts[1] || 'https://chatgpt.com',
          purpose: parts[2] || 'Eğitimde pratik uygulama'
        };
      });

    const newWeek: WeekSession = {
      id: editingWeek ? editingWeek.id : `hafta-${Date.now()}`,
      weekNumber: Number(weekNumber) || 1,
      title: title.trim(),
      duration: duration.trim() || '40 Dakika (1 Ders Saati)',
      category,
      summary: summary.trim() || 'Bu oturumda katılımcı öğretmenler ile uygulamalı çalışma yapılacaktır.',
      learningOutcomes: outcomesArray.length > 0 ? outcomesArray : ['Konuyla ilgili temel yapay zekâ becerilerini edinir.'],
      sessionFlow: editingWeek?.sessionFlow || [
        { minuteRange: "00-10 dk", activity: "Giriş ve Kavramsal Çerçeve", description: "Konunun MEB ve ders müfredatındaki pedagojik önemi." },
        { minuteRange: "10-22 dk", activity: "Uygulamalı Canlı Gösterim", description: "Öğretmenlerle araçların canlı ekranda denenmesi." },
        { minuteRange: "22-34 dk", activity: "Bireysel / Grup Uygulaması", description: "Her öğretmenin kendi branşına uyarlaması." },
        { minuteRange: "34-40 dk", activity: "Değerlendirme & Kapanış", description: "Soru-cevap ve haftalık görevin paylaşımı." }
      ],
      keyTools: toolsArray.length > 0 ? toolsArray : [{ name: 'ChatGPT', url: 'https://chatgpt.com', purpose: 'Ders hazırlığı' }],
      practicalExercise: practicalExercise.trim() || 'Bu hafta öğrendiğiniz yöntemle kendi dersiniz için 1 adet materyal tasarlayın.',
      samplePrompt: samplePrompt.trim() || 'Rol: Deneyimli bir öğretmenisin.\nGörev: [Konu] için MEB müfredatına uygun ders materyali hazırla.',
      materials: editingWeek?.materials || [{ title: 'Ders Şablonu', type: 'sablon' }],
      customAdded: true
    };

    onSaveWeek(newWeek);
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
            {editingWeek ? <Save className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">
              {editingWeek ? 'Oturum İçeriğini Düzenle' : 'Yeni Eğitim Oturumu / İçerik Ekle'}
            </h4>
            <p className="text-xs text-slate-400">
              Eğitmen Fatih TOLA için haftalık 40 dakikalık atölye içeriği ekleme ve güncelleme paneli
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Week & Duration & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Hafta No</label>
              <input
                type="number"
                min="1"
                max="20"
                value={weekNumber}
                onChange={(e) => setWeekNumber(Number(e.target.value))}
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Süre</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="40 Dakika (1 Ders Saati)"
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="temel">Temel & İstem</option>
                <option value="icerik">Ders & İçerik</option>
                <option value="degerlendirme">Sınav & Rubrik</option>
                <option value="multimodal">Görsel & Tasarım</option>
                <option value="asistan">Özel Asistan</option>
                <option value="proje">Proje & Sunum</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Oturum Başlığı</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: 9. Hafta: Eğitimde Podcast ve Sesli İçerik Üretimi"
              className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Summary */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Kısa Özet & Açıklama</label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Bu oturumda katılımcıların yapacağı çalışmaların genel özeti..."
              className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Learning Outcomes */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">
              Kazanımlar (Her satıra bir kazanım yazınız)
            </label>
            <textarea
              rows={3}
              value={learningOutcomes}
              onChange={(e) => setLearningOutcomes(e.target.value)}
              placeholder={"Yapay zekâ ses araçlarını tanır.\nPedagojik sesli diyalog senaryoları üretir."}
              className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Key Tools */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">
              Kullanılacak Araçlar (Format: İsim | Link | Amaç - Her satıra bir araç)
            </label>
            <textarea
              rows={2}
              value={keyToolsText}
              onChange={(e) => setKeyToolsText(e.target.value)}
              placeholder={"ElevenLabs | https://elevenlabs.io | Türkçe seslendirme\nNotebookLM | https://notebooklm.google.com | Sesli podcast çıkarma"}
              className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          {/* Practical Exercise */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Öğretmen Uygulama Görevi</label>
            <input
              type="text"
              value={practicalExercise}
              onChange={(e) => setPracticalExercise(e.target.value)}
              placeholder="Örn: Dersinizin bir konusu için 2 dakikalık yapay zekâ ses kaydı oluşturun."
              className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Sample Prompt */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Örnek Öğretmen Promptu</label>
            <textarea
              rows={3}
              value={samplePrompt}
              onChange={(e) => setSamplePrompt(e.target.value)}
              placeholder={"Rol: [Branş] öğretmenisin...\nGörev: ...\nFormat: ..."}
              className="w-full bg-slate-950 text-xs text-slate-200 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{editingWeek ? 'Değişiklikleri Kaydet' : 'Oturumu Ekle'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
