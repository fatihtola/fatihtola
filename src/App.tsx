import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewSection } from './components/OverviewSection';
import { GroupsSection } from './components/GroupsSection';
import { CurriculumSection } from './components/CurriculumSection';
import { LanguageModelsSection } from './components/LanguageModelsSection';
import { ToolsCatalogSection } from './components/ToolsCatalogSection';
import { ResourcesSection } from './components/ResourcesSection';
import { PromptGeneratorSection } from './components/PromptGeneratorSection';
import { TrainerModal } from './components/TrainerModal';
import { AddContentModal } from './components/AddContentModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { INITIAL_GROUPS, INITIAL_WEEKS, TRAINER_INFO, FEATURED_AI_TOOLS } from './data/portalData';
import { TeacherGroup, WeekSession } from './types';
import { 
  subscribeToGroups, 
  saveGroupToFirestore, 
  subscribeToCurriculum, 
  saveWeekToFirestore, 
  deleteWeekFromFirestore 
} from './services/portalFirestore';
import { 
  Sparkles, 
  Download, 
  Search, 
  ExternalLink,
  Users,
  Calendar,
  Wrench,
  Lock,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isTrainerModalOpen, setIsTrainerModalOpen] = useState<boolean>(false);
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState<boolean>(false);
  const [editingWeek, setEditingWeek] = useState<WeekSession | null>(null);

  // Cloud sync status
  const [cloudStatus, setCloudStatus] = useState<'connected' | 'syncing' | 'error'>('syncing');

  // Admin authentication state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('portal_is_admin') === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState<boolean>(false);
  const [adminActionReason, setAdminActionReason] = useState<string | null>(null);

  // Load groups from localStorage or default
  const [groups, setGroups] = useState<TeacherGroup[]>(() => {
    try {
      const saved = localStorage.getItem('portal_teacher_groups');
      return saved ? JSON.parse(saved) : INITIAL_GROUPS;
    } catch {
      return INITIAL_GROUPS;
    }
  });

  // Load weeks from localStorage or default
  const [weeks, setWeeks] = useState<WeekSession[]>(() => {
    try {
      const saved = localStorage.getItem('portal_weekly_curriculum');
      return saved ? JSON.parse(saved) : INITIAL_WEEKS;
    } catch {
      return INITIAL_WEEKS;
    }
  });

  // Real-time Firestore sync for Teacher Groups
  useEffect(() => {
    const unsub = subscribeToGroups((cloudGroups) => {
      setGroups(cloudGroups);
      setCloudStatus('connected');
      try {
        localStorage.setItem('portal_teacher_groups', JSON.stringify(cloudGroups));
      } catch {}
    }, groups);

    return () => unsub();
  }, []);

  // Real-time Firestore sync for Curriculum Weeks
  useEffect(() => {
    const unsub = subscribeToCurriculum((cloudWeeks) => {
      setWeeks(cloudWeeks);
      try {
        localStorage.setItem('portal_weekly_curriculum', JSON.stringify(cloudWeeks));
      } catch {}
    }, weeks);

    return () => unsub();
  }, []);

  // Save admin auth to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portal_is_admin', isAdmin ? 'true' : 'false');
    } catch (err) {
      console.error('Failed to save admin state:', err);
    }
  }, [isAdmin]);

  // If not admin and user attempts to open or is on groups tab, redirect to overview
  useEffect(() => {
    if (!isAdmin && activeTab === 'groups') {
      setActiveTab('overview');
    }
  }, [isAdmin, activeTab]);

  // Handlers
  const handleOpenAdminLogin = (reason?: unknown) => {
    if (typeof reason === 'string' && reason.trim().length > 0) {
      setAdminActionReason(reason);
    } else {
      setAdminActionReason(null);
    }
    setIsAdminLoginModalOpen(true);
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('portal_is_admin');
    } catch {}
  };

  const handleUpdateGroup = (updatedGroup: TeacherGroup) => {
    setGroups(prev => prev.map(g => g.id === updatedGroup.id ? updatedGroup : g));
    saveGroupToFirestore(updatedGroup).catch((err) => {
      console.error('Failed to sync group to Firestore:', err);
    });
  };

  const handleSaveWeek = (week: WeekSession) => {
    if (!isAdmin) {
      handleOpenAdminLogin('İçerik kaydetmek için lütfen yönetici girişi yapınız.');
      return;
    }
    setWeeks(prev => {
      const existingIdx = prev.findIndex(w => w.id === week.id);
      if (existingIdx !== -1) {
        const next = [...prev];
        next[existingIdx] = week;
        return next;
      }
      return [...prev, week].sort((a, b) => a.weekNumber - b.weekNumber);
    });
    saveWeekToFirestore(week).catch((err) => {
      console.error('Failed to save week to Firestore:', err);
    });
    setEditingWeek(null);
  };

  const handleEditWeek = (week: WeekSession) => {
    if (!isAdmin) {
      handleOpenAdminLogin('Oturum içeriğini düzenlemek için yönetici girişi yapınız.');
      return;
    }
    setEditingWeek(week);
    setIsAddContentModalOpen(true);
  };

  const handleDeleteWeek = (weekId: string) => {
    if (!isAdmin) {
      handleOpenAdminLogin('Oturum silmek için yönetici girişi yapınız.');
      return;
    }
    setWeeks(prev => prev.filter(w => w.id !== weekId));
    deleteWeekFromFirestore(weekId).catch((err) => {
      console.error('Failed to delete week from Firestore:', err);
    });
  };

  const handleOpenAddContent = () => {
    if (!isAdmin) {
      handleOpenAdminLogin('Yeni eğitim oturumu veya içerik eklemek için lütfen yönetici girişi yapınız.');
      return;
    }
    setEditingWeek(null);
    setIsAddContentModalOpen(true);
  };

  const handleExportData = () => {
    try {
      const data = {
        trainer: TRAINER_INFO,
        groups,
        weeks,
        exportDate: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `egitim-portali-verileri-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        try {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } catch {}
      }, 200);
    } catch (err) {
      console.error('Export data error:', err);
    }
  };

  // Global search filtering
  const matchingTools = searchQuery
    ? FEATURED_AI_TOOLS.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const matchingWeeks = searchQuery
    ? weeks.filter(w => 
        w.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        w.summary.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const matchingGroups = searchQuery
    ? groups.filter(g => 
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        g.participants.some(p => p.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenTrainerModal={() => setIsTrainerModalOpen(true)}
        onOpenAddContentModal={handleOpenAddContent}
        isAdmin={isAdmin}
        onOpenAdminLogin={handleOpenAdminLogin}
        cloudStatus={cloudStatus}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Global Search Results Overlay if user types in search */}
        {searchQuery.trim().length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold text-white">
                  Arama Sonuçları: <span className="text-blue-400">"{searchQuery}"</span>
                </h3>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800"
              >
                Aramayı Temizle
              </button>
            </div>

            {/* Results in Groups */}
            {matchingGroups.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  Eşleşen Gruplar ({matchingGroups.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchingGroups.map(grp => (
                    <div
                      key={grp.id}
                      onClick={() => {
                        setActiveTab('groups');
                        setSearchQuery('');
                      }}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-700 cursor-pointer"
                    >
                      <div className="text-xs font-bold text-white">{grp.name}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{grp.day} • {grp.timeSlot}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results in Weeks */}
            {matchingWeeks.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Eşleşen Haftalık Oturumlar ({matchingWeeks.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchingWeeks.map(w => (
                    <div
                      key={w.id}
                      onClick={() => {
                        setActiveTab('curriculum');
                        setSearchQuery('');
                      }}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-700 cursor-pointer"
                    >
                      <div className="text-xs font-bold text-white">{w.title}</div>
                      <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{w.summary}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results in Tools */}
            {matchingTools.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  Eşleşen Araçlar ({matchingTools.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {matchingTools.map(t => (
                    <div key={t.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{t.name}</span>
                        <a href={t.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{t.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {matchingGroups.length === 0 && matchingWeeks.length === 0 && matchingTools.length === 0 && (
              <div className="py-12 text-center text-slate-500 text-xs">
                "{searchQuery}" ile eşleşen bir içerik bulunamadı.
              </div>
            )}
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <OverviewSection
                groups={groups}
                setActiveTab={setActiveTab}
                onOpenTrainerModal={() => setIsTrainerModalOpen(true)}
                onOpenAddContentModal={handleOpenAddContent}
                isAdmin={isAdmin}
                onOpenAdminLogin={handleOpenAdminLogin}
              />
            )}

            {activeTab === 'groups' && (
              <GroupsSection
                groups={groups}
                onUpdateGroup={handleUpdateGroup}
                isAdmin={isAdmin}
                onOpenAdminLogin={handleOpenAdminLogin}
              />
            )}

            {activeTab === 'curriculum' && (
              <CurriculumSection
                weeks={weeks}
                onOpenAddContentModal={handleOpenAddContent}
                onEditWeek={handleEditWeek}
                onDeleteWeek={handleDeleteWeek}
                isAdmin={isAdmin}
                onOpenAdminLogin={handleOpenAdminLogin}
              />
            )}

            {activeTab === 'models' && (
              <LanguageModelsSection />
            )}

            {activeTab === 'tools' && (
              <ToolsCatalogSection />
            )}

            {activeTab === 'resources' && (
              <ResourcesSection />
            )}

            {activeTab === 'generator' && (
              <PromptGeneratorSection />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>
              Yapay Zekâ ve Eğitim Teknolojileri Portalı • <strong>Eğitmen: {TRAINER_INFO.name}</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            {isAdmin && (
              <>
                <button
                  onClick={() => setActiveTab('groups')}
                  className="hover:text-blue-400 transition-colors"
                >
                  10 Grup Programı
                </button>
                <span>•</span>
              </>
            )}
            <button
              onClick={() => setActiveTab('curriculum')}
              className="hover:text-blue-400 transition-colors"
            >
              Haftalık Müfredat
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('resources')}
              className="hover:text-blue-400 transition-colors"
            >
              Ek Kaynaklar
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TrainerModal
        isOpen={isTrainerModalOpen}
        onClose={() => setIsTrainerModalOpen(false)}
      />

      <AddContentModal
        isOpen={isAddContentModalOpen}
        onClose={() => {
          setIsAddContentModalOpen(false);
          setEditingWeek(null);
        }}
        onSaveWeek={handleSaveWeek}
        editingWeek={editingWeek}
        totalWeeksCount={weeks.length}
      />

      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => {
          setIsAdminLoginModalOpen(false);
          setAdminActionReason(null);
        }}
        isAdmin={isAdmin}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
        actionReason={adminActionReason}
      />
    </div>
  );
}
