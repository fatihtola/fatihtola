import React, { useState } from 'react';
import { 
  Wrench, 
  ExternalLink, 
  Search, 
  CheckCircle2
} from 'lucide-react';
import { FEATURED_AI_TOOLS } from '../data/portalData';

export const ToolsCatalogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Tüm Araçlar' },
    { id: 'Asistan & Sohbet', label: 'Asistan & Sohbet' },
    { id: 'Ders & Sunum', label: 'Ders & Sunum' },
    { id: 'Soru & Değerlendirme', label: 'Soru & Değerlendirme' },
    { id: 'Görsel & Tasarım', label: 'Görsel & Tasarım' },
    { id: 'Ses & Video', label: 'Ses & Video' },
    { id: 'Üretken Kod & Web', label: 'Kod & Web Geliştirme' }
  ];

  const filteredTools = FEATURED_AI_TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.educationUseCase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8" id="tools-catalog-section">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Eğitimde Öne Çıkan Yapay Zekâ Uygulamaları
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Öğretmenlerin ders hazırlığı, sınav türetme, görsel tasarım ve sınıf içi etkileşimde kullandığı en popüler araçlar
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Araç adı veya özellik ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 text-xs text-slate-200 placeholder-slate-500 rounded-xl pl-9 pr-3 py-2.5 border border-slate-800 focus:outline-none focus:border-blue-500"
          />
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
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {tool.category}
                  </span>
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

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {tool.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sınıf İçi Kullanım & CTA Link */}
              <div className="mt-5 pt-3.5 border-t border-slate-800/80 space-y-3">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300">
                  <strong className="text-blue-400 block mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    Sınıf İçi Pratik Senaryosu:
                  </strong>
                  <span className="italic text-slate-400">"{tool.educationUseCase}"</span>
                </div>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold transition-all shadow-sm group-hover:border-blue-600"
                >
                  <span>Uygulamaya Git</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
