import React, { useState } from 'react';
import { 
  Wrench, 
  ExternalLink, 
  Search, 
  CheckCircle2,
  Edit3,
  Trash2,
  PlusCircle,
  Lock,
  ShieldCheck,
  Star
} from 'lucide-react';
import { AIToolItem } from '../types';
import { EditToolModal } from './EditToolModal';

interface ToolsCatalogSectionProps {
  tools: AIToolItem[];
  onUpdateTool: (tool: AIToolItem) => void;
  onAddTool: (tool: AIToolItem) => void;
  onDeleteTool: (toolId: string) => void;
  isAdmin: boolean;
  onOpenAdminLogin: (reason?: string) => void;
}

export const ToolsCatalogSection: React.FC<ToolsCatalogSectionProps> = ({
  tools,
  onUpdateTool,
  onAddTool,
  onDeleteTool,
  isAdmin,
  onOpenAdminLogin
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isToolModalOpen, setIsToolModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<AIToolItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Tüm Araçlar' },
    { id: 'Asistan & Sohbet', label: 'Asistan & Sohbet' },
    { id: 'Ders & Sunum', label: 'Ders & Sunum' },
    { id: 'Soru & Değerlendirme', label: 'Soru & Değerlendirme' },
    { id: 'Görsel & Tasarım', label: 'Görsel & Tasarım' },
    { id: 'Ses & Video', label: 'Ses & Video' },
    { id: 'Üretken Kod & Web', label: 'Kod & Web Geliştirme' }
  ];

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.educationUseCase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenAddTool = () => {
    if (!isAdmin) {
      onOpenAdminLogin('Yeni yapay zekâ aracı eklemek için lütfen yönetici girişi yapınız.');
      return;
    }
    setEditingTool(null);
    setIsToolModalOpen(true);
  };

  const handleOpenEditTool = (tool: AIToolItem) => {
    if (!isAdmin) {
      onOpenAdminLogin('Araç bilgilerini düzenlemek için lütfen yönetici girişi yapınız.');
      return;
    }
    setEditingTool(tool);
    setIsToolModalOpen(true);
  };

  return (
    <div className="space-y-8" id="tools-catalog-section">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Eğitimde Öne Çıkan Yapay Zekâ Uygulamaları
            </h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {tools.length} Araç Kayıtlı
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Öğretmenlerin ders hazırlığı, sınav türetme, görsel tasarım ve sınıf içi etkileşimde kullandığı en popüler araçlar
          </p>
        </div>

        {/* Action Buttons & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Araç adı veya özellik ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 text-xs text-slate-200 placeholder-slate-500 rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          {isAdmin && (
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="flex items-center gap-1.5 px-2.5 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-300 shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Düzenleme Aktif</span>
              </div>

              <button
                onClick={handleOpenAddTool}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 bg-blue-600 hover:bg-blue-500 text-white shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Yeni Araç Ekle</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category Pills */}
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

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-slate-900/30 border border-slate-800 rounded-2xl">
            <Wrench className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-400 font-medium">Aramanızla eşleşen bir yapay zekâ aracı bulunamadı.</p>
          </div>
        ) : (
          filteredTools.map((tool) => (
            <div
              key={tool.id}
              id={`tool-card-${tool.id}`}
              className="group flex flex-col justify-between bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-blue-700/60 rounded-2xl p-5 transition-all shadow-sm"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {tool.category}
                    </span>
                    {tool.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        Öne Çıkan
                      </span>
                    )}
                  </div>

                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                    tool.pricing === 'Ücretsiz' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : tool.pricing === 'MEB / Kurumsal'
                      ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {tool.pricing}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  {tool.name}
                </h4>

                {/* Description */}
                <p className="text-xs text-slate-400 mt-2 leading-relaxed font-light">
                  {tool.description}
                </p>

                {/* Education Use Case */}
                <div className="my-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Sınıf İçi Kullanım Alanı:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {tool.educationUseCase}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 my-2">
                  {tool.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 mt-2">
                {isAdmin ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditTool(tool)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
                      title="Aracı Düzenle"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                      <span>İçeriği Düzenle</span>
                    </button>

                    {deleteConfirmId === tool.id ? (
                      <div className="flex items-center gap-1 bg-red-950/70 border border-red-800/60 p-1 rounded-lg text-xs">
                        <button
                          onClick={() => {
                            onDeleteTool(tool.id);
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
                        onClick={() => setDeleteConfirmId(tool.id)}
                        className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-900/40 transition-colors"
                        title="Aracı Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div />
                )}

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-xs font-semibold text-blue-300 hover:text-white transition-colors"
                >
                  <span>Aracı Aç</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Tool Modal */}
      <EditToolModal
        isOpen={isToolModalOpen}
        onClose={() => setIsToolModalOpen(false)}
        onSave={(savedTool) => {
          if (editingTool) {
            onUpdateTool(savedTool);
          } else {
            onAddTool(savedTool);
          }
        }}
        editingTool={editingTool}
      />
    </div>
  );
};
