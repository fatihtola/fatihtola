import React, { useState } from 'react';
import { 
  Cpu, 
  ExternalLink, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  Edit3,
  Trash2,
  PlusCircle,
  ShieldCheck
} from 'lucide-react';
import { LanguageModelItem } from '../types';
import { EditModelModal } from './EditModelModal';

interface LanguageModelsSectionProps {
  models: LanguageModelItem[];
  onUpdateModel: (model: LanguageModelItem) => void;
  onAddModel: (model: LanguageModelItem) => void;
  onDeleteModel: (modelId: string) => void;
  isAdmin: boolean;
  onOpenAdminLogin: (reason?: string) => void;
}

export const LanguageModelsSection: React.FC<LanguageModelsSectionProps> = ({
  models,
  onUpdateModel,
  onAddModel,
  onDeleteModel,
  isAdmin,
  onOpenAdminLogin
}) => {
  // Modals state
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [editingModel, setEditingModel] = useState<LanguageModelItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleOpenAddModel = () => {
    if (!isAdmin) {
      onOpenAdminLogin('Yeni dil modeli eklemek için lütfen yönetici girişi yapınız.');
      return;
    }
    setEditingModel(null);
    setIsModelModalOpen(true);
  };

  const handleOpenEditModel = (model: LanguageModelItem) => {
    if (!isAdmin) {
      onOpenAdminLogin('Model içeriğini düzenlemek için lütfen yönetici girişi yapınız.');
      return;
    }
    setEditingModel(model);
    setIsModelModalOpen(true);
  };

  return (
    <div className="space-y-10" id="language-models-section">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Dil Modelleri (LLM) ve Öğretmenler İçin İstem Rehberi
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {models.length} Model Listeleniyor
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Eğitimde en güçlü üretken yapay zekâ modellerinin karşılaştırması, bağlam pencereleri ve hatasız istem yazma formülleri.
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
              onClick={handleOpenAddModel}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Yeni Model Ekle</span>
            </button>
          </div>
        )}
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
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-4 bg-blue-500 rounded-full" />
            Öne Çıkan Modeller ve Eğitim Özellikleri
          </h4>
          <span className="text-xs text-slate-500">{models.length} Model Mevcut</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {models.map((model) => (
            <div
              key={model.id}
              id={`model-card-${model.id}`}
              className="bg-slate-900/70 border border-slate-800 hover:border-blue-800/70 rounded-2xl p-5 sm:p-6 space-y-5 transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h5 className="text-lg font-bold text-white">{model.name}</h5>
                      {model.badge && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                          {model.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400">Geliştirici: {model.developer}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => handleOpenEditModel(model)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
                          title="Modeli Düzenle"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                          <span>İçeriği Düzenle</span>
                        </button>

                        {deleteConfirmId === model.id ? (
                          <div className="flex items-center gap-1 bg-red-950/70 border border-red-800/60 p-1 rounded-lg text-xs">
                            <button
                              onClick={() => {
                                onDeleteModel(model.id);
                                setDeleteConfirmId(null);
                              }}
                              className="px-2 py-0.5 rounded bg-red-600 text-white font-semibold text-[11px]"
                            >
                              Sil
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]"
                            >
                              İptal
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(model.id)}
                            className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-900/40 transition-colors"
                            title="Modeli Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </>
                    )}

                    <a
                      href={model.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-xs font-medium text-blue-300 hover:text-white transition-colors"
                    >
                      <span>Kullan</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Context Window & Best For */}
                <div className="grid grid-cols-2 gap-2 my-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">Hafıza / Bağlam</span>
                    <span className="font-mono font-bold text-cyan-400">{model.contextWindow}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">Ücretsiz Durumu</span>
                    <span className="font-medium text-emerald-400 line-clamp-1">{model.freeTierStatus}</span>
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

      {/* Edit Model Modal */}
      <EditModelModal
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
        onSave={(savedModel) => {
          if (editingModel) {
            onUpdateModel(savedModel);
          } else {
            onAddModel(savedModel);
          }
        }}
        editingModel={editingModel}
      />
    </div>
  );
};
