import React, { useState, useEffect } from 'react';
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
  RefreshCw,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Check
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer when active tab changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  const navItems = [
    { 
      id: 'overview', 
      label: 'Genel Bakış', 
      description: 'Program hedefleri, kazanımlar ve özet istatistikler',
      icon: Compass 
    },
    ...(isAdmin ? [{ 
      id: 'groups', 
      label: '10 Eğitim Grubu', 
      description: 'Branş grupları, haftalık 40 dk takvimi ve yoklama takibi',
      icon: Users, 
      badge: '10 Grup' 
    }] : []),
    { 
      id: 'curriculum', 
      label: 'Haftalık Oturumlar', 
      description: 'Haftalık 40 dakikalık atölye modülleri ve hazır istemler',
      icon: Calendar, 
      badge: '40 Dk/Hf' 
    },
    { 
      id: 'models', 
      label: 'Dil Modelleri', 
      description: 'ChatGPT, Claude, Gemini ve DeepSeek karşılaştırması',
      icon: Cpu 
    },
    { 
      id: 'tools', 
      label: 'Öne Çıkan Araçlar', 
      description: 'Eğitimde kullanılan popüler yapay zekâ uygulamaları',
      icon: Wrench 
    },
    { 
      id: 'resources', 
      label: 'Ek Kaynaklar', 
      description: 'MEB mevzuatları, etik rehberler ve materyaller',
      icon: FileText 
    },
    { 
      id: 'generator', 
      label: 'Prompt Üretici', 
      description: 'Ders planı, sınav ve görsel istemi oluşturucu',
      icon: Sparkles 
    }
  ];

  const activeItem = navItems.find((item) => item.id === activeTab) || navItems[0];
  const ActiveIcon = activeItem ? activeItem.icon : Compass;

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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-2.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & Portal Info + Mobile Controls */}
          <div className="flex items-center justify-between gap-2">
            <div 
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group min-w-0"
              onClick={() => {
                setActiveTab('overview');
                setIsMobileMenuOpen(false);
              }}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight truncate">
                    Yapay Zekâ <span className="text-blue-400">Eğitim Portalı</span>
                  </h1>
                  <span className="hidden sm:inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    ÖĞRETMEN AKADEMİSİ
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 font-normal truncate">
                  Eğitim Teknolojileri & Proje Tabanlı Yapay Zekâ Kılavuzu
                </p>
              </div>
            </div>

            {/* Mobile Actions: Trainer Button */}
            <div className="flex items-center gap-1.5 md:hidden shrink-0">
              <button
                id="mobile-trainer-badge-btn"
                onClick={onOpenTrainerModal}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white"
                title="Eğitmen Bilgisi"
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden xs:inline">{TRAINER_INFO.name.split(' ')[0]}</span>
              </button>
            </div>
          </div>

          {/* Search, Cloud Status, Admin Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
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
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all active:scale-95 shrink-0 ${
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
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all active:scale-95 shrink-0"
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
      <div className="border-t border-slate-800/80 bg-slate-950/60 px-3 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Mobile View: Menü Button that replaces 'Tümü' and hides horizontal tabs */}
          <div className="md:hidden py-1.5">
            <button
              id="mobile-nav-menu-button"
              type="button"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all active:scale-[0.99] ${
                isMobileMenuOpen
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/15'
                  : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 text-slate-200'
              }`}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isMobileMenuOpen ? 'bg-blue-600 text-white shadow-sm' : 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                }`}>
                  {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </div>
                <div className="flex items-center gap-1.5 min-w-0 truncate">
                  <span className="text-slate-400 font-normal">Menü:</span>
                  <span className="font-bold text-white flex items-center gap-1 truncate">
                    <ActiveIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="truncate">{activeItem.label}</span>
                  </span>
                  {activeItem.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 shrink-0">
                      {activeItem.badge}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <span className="text-[11px] font-medium text-slate-400">
                  {isMobileMenuOpen ? 'Kapat' : 'Sayfalar'}
                </span>
                <ChevronDown className={`w-4 h-4 text-blue-400 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Açılır Menü (Dropdown Menu for Mobile) */}
            {isMobileMenuOpen && (
              <div 
                id="mobile-dropdown-menu"
                className="mt-2 p-2 rounded-2xl bg-slate-900/98 backdrop-blur-xl border border-slate-700/80 shadow-2xl space-y-1 animate-fadeIn max-h-[calc(100vh-160px)] overflow-y-auto"
              >
                <div className="px-2 py-1.5 flex items-center justify-between border-b border-slate-800/80 mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Sayfa Menüleri
                  </span>
                  <span className="text-[10px] text-blue-400 font-mono bg-blue-500/10 px-1.5 py-0.5 rounded">
                    {navItems.length} Sayfa
                  </span>
                </div>

                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`mobile-dropdown-item-${item.id}`}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all border ${
                        isActive
                          ? 'bg-blue-600/15 border-blue-500 text-white font-semibold shadow-sm'
                          : 'bg-slate-950/60 border-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-800 text-slate-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white truncate">{item.label}</span>
                            {item.badge && (
                              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                                isActive ? 'bg-blue-500/25 text-blue-300 border border-blue-500/30' : 'bg-slate-800 text-slate-400'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-[10px] text-slate-400 truncate mt-0.5 font-normal">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                      {isActive && (
                        <Check className="w-4 h-4 text-blue-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop View: Horizontal Menu Tabs */}
          <div className="hidden md:flex items-center space-x-1 sm:space-x-2 py-1.5 overflow-x-auto no-scrollbar scroll-smooth">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] sm:text-[10px] font-mono px-1.5 py-0.2 rounded ${
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
      </div>
    </header>
  );
};
