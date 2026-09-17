import React from 'react';
import { 
  Sparkles, 
  Users, 
  Calendar, 
  Cpu, 
  Wrench, 
  FileText, 
  Compass, 
  PlusCircle, 
  Search,
  UserCheck,
  Lock,
  ShieldCheck,
  Cloud,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { TRAINER_INFO } from '../data/portalData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenTrainerModal: () => void;
  onOpenAddContentModal: () => void;
  isAdmin: boolean;
  onOpenAdminLogin: (reason?: string) => void;
  cloudStatus?: 'connected' | 'syncing' | 'error';
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenTrainerModal,
  onOpenAddContentModal,
  isAdmin,
  onOpenAdminLogin,
  cloudStatus = 'connected'
}) => {
  const navItems = [
    { id: 'overview', label: 'Genel Bakış', icon: Compass },
    ...(isAdmin ? [{ id: 'groups', label: '10 Eğitim Grubu', icon: Users, badge: '10 Grup' }] : []),
    { id: 'curriculum', label: 'Haftalık Oturumlar', icon: Calendar, badge: '40 Dk/Hf' },
    { id: 'models', label: 'Dil Modelleri', icon: Cpu },
    { id: 'tools', label: 'Öne Çıkan Araçlar', icon: Wrench },
    { id: 'resources', label: 'Ek Kaynaklar', icon: FileText },
    { id: 'generator', label: 'Prompt Üretici', icon: Sparkles }
  ];

  const handleAddContentClick = () => {
    if (!isAdmin) {
      onOpenAdminLogin('Yeni eğitim oturumu ve içerik eklemek için lütfen yönetici girişi yapınız.');
      return;
    }
    onOpenAddContentModal();
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-2xl" id="portal-header">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3.5 pb-2.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & Portal Info */}
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setActiveTab('overview')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                    Yapay Zekâ <span className="text-blue-400">Eğitim Portalı</span>
                  </h1>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    ÖĞRETMEN AKADEMİSİ
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-normal">
                  Eğitim Teknolojileri & Proje Tabanlı Yapay Zekâ Kılavuzu
                </p>
              </div>
            </div>

            {/* Mobile Trainer Button */}
            <button
              id="mobile-trainer-badge-btn"
              onClick={onOpenTrainerModal}
              className="md:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>{TRAINER_INFO.name}</span>
            </button>
          </div>

          {/* Search and Trainer Card */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="portal-global-search"
                type="text"
                placeholder="Araç, oturum, prompt ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 text-xs sm:text-sm text-slate-200 placeholder-slate-500 rounded-lg pl-9 pr-3 py-2 border border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Trainer Highlight Badge */}
            <button
              id="trainer-profile-button"
              onClick={onOpenTrainerModal}
              className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-700/60 transition-all text-left shadow-sm group"
              title="Eğitmen Profilini ve İletişim Bilgilerini Gör"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-blue-500/20 group-hover:ring-blue-500/50 transition-all">
                FT
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">EĞİTMEN</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {TRAINER_INFO.name}
                </span>
              </div>
            </button>

            {/* Cloud Real-Time Sync Indicator (Visible only when Admin is active) */}
            {isAdmin && (
              <div 
                id="cloud-sync-status-indicator"
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 shadow-sm"
                title="Bulut Veritabanı Aktif: Tüm değişiklikler canlı olarak internete kaydedilir ve farklı cihazlardan anında eşitlenir."
              >
                {cloudStatus === 'syncing' ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                    <span className="text-amber-300 font-medium">Bulut Eşitleniyor</span>
                  </>
                ) : cloudStatus === 'error' ? (
                  <>
                    <Cloud className="w-3.5 h-3.5 text-rose-400" />
                    <span className="text-rose-300 font-medium">Çevrimdışı</span>
                  </>
                ) : (
                  <>
                    <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 font-medium">Bulut Senkronize</span>
                  </>
                )}
              </div>
            )}

            {/* Admin Login / Status Trigger */}
            <button
              id="admin-auth-toggle-btn"
              onClick={() => onOpenAdminLogin()}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all active:scale-95 ${
                isAdmin
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
              }`}
              title={isAdmin ? "Yönetici Oturumu Açık (Ayarlar / Çıkış)" : "Yönetici Girişi Yap"}
            >
              {isAdmin ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-blue-400" />}
              <span className="hidden sm:inline">{isAdmin ? 'Yönetici Aktif' : 'Yönetici Girişi'}</span>
            </button>

            {/* Add Content Button (Visible only to Admin) */}
            {isAdmin && (
              <button
                id="add-content-quick-button"
                onClick={handleAddContentClick}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all active:scale-95"
                title="Yeni Oturum veya Eğitim İçeriği Ekle"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">İçerik Ekle</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className="border-t border-slate-800/80 bg-slate-950/60 px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 sm:space-x-2 py-1.5 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
