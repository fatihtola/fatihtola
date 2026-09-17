import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  MapPin, 
  Check, 
  Plus, 
  Minus,
  Trash2, 
  FileEdit, 
  Save, 
  CalendarDays,
  Calendar,
  UserPlus,
  Lock,
  ShieldAlert,
  ShieldCheck,
  LogIn,
  FileSpreadsheet
} from 'lucide-react';
import { TeacherGroup, Participant } from '../types';
import { ExportSheetsModal } from './ExportSheetsModal';

interface GroupsSectionProps {
  groups: TeacherGroup[];
  onUpdateGroup: (updatedGroup: TeacherGroup) => void;
  isAdmin: boolean;
  onOpenAdminLogin: (reason?: string) => void;
}

export const GroupsSection: React.FC<GroupsSectionProps> = ({
  groups,
  onUpdateGroup,
  isAdmin,
  onOpenAdminLogin
}) => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>(groups[0]?.id || 'grup-1');
  const [viewMode, setViewMode] = useState<'details' | 'schedule'>('details');
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherBranch, setNewTeacherBranch] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState('');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [editingWeekDateIdx, setEditingWeekDateIdx] = useState<number | null>(null);
  const [editingDateValue, setEditingDateValue] = useState('');

  const currentGroup = groups.find(g => g.id === selectedGroupId) || groups[0];

  const handleSaveWeekDate = (wIdx: number, val: string) => {
    if (!isAdmin || !currentGroup) return;
    const cleanVal = val.trim();
    const currentDates = [...(currentGroup.weekDates || [])];
    while (currentDates.length <= wIdx) {
      currentDates.push('');
    }
    currentDates[wIdx] = cleanVal;
    onUpdateGroup({
      ...currentGroup,
      weekDates: currentDates
    });
    setEditingWeekDateIdx(null);
    setEditingDateValue('');
  };

  const handleSetTodayDate = (wIdx: number) => {
    const todayStr = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
    handleSaveWeekDate(wIdx, todayStr);
  };

  const handleAddWeekColumn = () => {
    if (!isAdmin || !currentGroup) return;
    const newTotal = currentGroup.totalWeeks + 1;
    const updatedParticipants = currentGroup.participants.map(p => {
      const newAtt = [...p.attendance];
      while (newAtt.length < newTotal) {
        newAtt.push(false);
      }
      return {
        ...p,
        attendance: newAtt
      };
    });

    onUpdateGroup({
      ...currentGroup,
      totalWeeks: newTotal,
      participants: updatedParticipants
    });
  };

  const handleRemoveWeekColumn = () => {
    if (!isAdmin || !currentGroup) return;
    if (currentGroup.totalWeeks <= 1) return;
    const newTotal = currentGroup.totalWeeks - 1;
    const updatedParticipants = currentGroup.participants.map(p => ({
      ...p,
      attendance: p.attendance.slice(0, newTotal)
    }));

    const updatedDates = currentGroup.weekDates
      ? currentGroup.weekDates.slice(0, newTotal)
      : undefined;

    onUpdateGroup({
      ...currentGroup,
      totalWeeks: newTotal,
      weekDates: updatedDates,
      participants: updatedParticipants
    });
  };

  const handleToggleAttendance = (participantId: string, weekIndex: number) => {
    if (!isAdmin) {
      onOpenAdminLogin();
      return;
    }
    if (!currentGroup) return;
    const updatedParticipants = currentGroup.participants.map(p => {
      if (p.id === participantId) {
        const newAttendance = [...p.attendance];
        newAttendance[weekIndex] = !newAttendance[weekIndex];
        return { ...p, attendance: newAttendance };
      }
      return p;
    });

    onUpdateGroup({
      ...currentGroup,
      participants: updatedParticipants
    });
  };

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      onOpenAdminLogin();
      return;
    }
    if (!newTeacherName.trim() || !currentGroup) return;

    const newParticipant: Participant = {
      id: `p-${Date.now()}`,
      fullName: newTeacherName.trim(),
      branch: newTeacherBranch.trim() || 'Öğretmen',
      attendance: Array(currentGroup.totalWeeks).fill(false)
    };

    onUpdateGroup({
      ...currentGroup,
      participants: [...currentGroup.participants, newParticipant]
    });

    setNewTeacherName('');
    setNewTeacherBranch('');
  };

  const handleRemoveParticipant = (pId: string) => {
    if (!isAdmin) {
      onOpenAdminLogin();
      return;
    }
    if (!currentGroup) return;
    onUpdateGroup({
      ...currentGroup,
      participants: currentGroup.participants.filter(p => p.id !== pId)
    });
  };

  const handleSaveNotes = () => {
    if (!isAdmin) {
      onOpenAdminLogin();
      return;
    }
    if (!currentGroup) return;
    onUpdateGroup({
      ...currentGroup,
      notes: notesDraft
    });
    setIsEditingNotes(false);
  };

  const startEditNotes = () => {
    if (!isAdmin) {
      onOpenAdminLogin();
      return;
    }
    setNotesDraft(currentGroup.notes || '');
    setIsEditingNotes(true);
  };

  const daysOfWeek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

  return (
    <div className="space-y-8" id="groups-management-section">
      {/* Header Banner */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              10 Eğitim Grubu & Haftalık 40 Dakika Yönetimi
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Haftalık 40 dakika sürecek 10 ayrı öğretmen grubunun takvimi, zümre hedefleri ve katılım yönetimi
          </p>
        </div>

        {/* View Switcher and Admin Indicator */}
        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          {isAdmin ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-[11px] font-semibold text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Yönetici Modu Aktif</span>
            </div>
          ) : (
            <button
              onClick={() => onOpenAdminLogin('Grup ve öğretmen yönetimi için lütfen yönetici girişi yapınız.')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-blue-300 rounded-lg text-xs font-semibold transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Yönetici Girişi Yap</span>
            </button>
          )}

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('details')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'details'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Grup Detayı & Yoklama</span>
            </button>
            <button
              onClick={() => setViewMode('schedule')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'schedule'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Haftalık Çizelge</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'details' ? (
        <div className="space-y-6">
          {/* 10 Group Selectors (Pills) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {groups.map((grp) => {
              const isSelected = grp.id === selectedGroupId;
              return (
                <button
                  key={grp.id}
                  id={`select-group-btn-${grp.id}`}
                  onClick={() => {
                    setSelectedGroupId(grp.id);
                    setIsEditingNotes(false);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold ${
                    isSelected ? 'bg-white text-blue-700' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {grp.groupNumber}
                  </span>
                  <span>Grup {grp.groupNumber}</span>
                  <span className="text-[10px] opacity-75 hidden sm:inline">
                    ({grp.day.slice(0, 3)})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Group Card */}
          {currentGroup && (
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-6 shadow-xl">
              {/* Group Meta Info */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                      GRUP {currentGroup.groupNumber}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {currentGroup.totalWeeks} Haftalık Program
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-white">
                    {currentGroup.name}
                  </h4>
                </div>

                {/* Day, Time and Room Badges */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200">
                    <CalendarDays className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold">{currentGroup.day}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <span className="font-semibold">{currentGroup.timeSlot}</span>
                    <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded font-mono font-semibold">40 Dk</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>{currentGroup.location}</span>
                  </div>
                </div>
              </div>

              {/* Group Notes / Goals */}
              <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Zümre Odak Noktaları & Grup Notları
                  </span>
                  {isAdmin ? (
                    !isEditingNotes ? (
                      <button
                        onClick={startEditNotes}
                        className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                      >
                        <FileEdit className="w-3 h-3" />
                        <span>Düzenle</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveNotes}
                        className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
                      >
                        <Save className="w-3 h-3" />
                        <span>Kaydet</span>
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => onOpenAdminLogin('Zümre notlarını düzenlemek için yönetici girişi yapınız.')}
                      title="Notları düzenlemek için yönetici girişi yapınız"
                      className="text-[11px] text-slate-500 hover:text-slate-400 flex items-center gap-1"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Düzenleme (Yönetici)</span>
                    </button>
                  )}
                </div>
                {!isEditingNotes ? (
                  <p className="text-xs sm:text-sm text-slate-400 italic">
                    {currentGroup.notes || "Henüz özel bir zümre notu girilmedi. Yönetici girişiyle gruba özel uygulama hedeflerini ekleyebilirsiniz."}
                  </p>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      value={notesDraft}
                      onChange={(e) => setNotesDraft(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-900 text-xs sm:text-sm text-slate-200 rounded-lg p-2.5 border border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Bu grup için hedeflenen branş uygulamaları, sınıf içi materyal hedefleri..."
                    />
                  </div>
                )}
              </div>

              {/* Participants & Attendance Section - GATED FOR ADMIN */}
              <div className="space-y-4 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h5 className="text-base font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      Katılımcı Öğretmen Listesi & Haftalık Katılım Takibi
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isAdmin 
                        ? "Öğretmenlerin haftalık 40 dakikalık atölye katılım durumunu ilgili haftaya tıklayarak işaretleyebilirsiniz."
                        : "Öğretmen kişisel verileri ve katılım çizelgesi gizlilik nedeniyle yönetici paneline bağlıdır."}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                    {/* E-Tablolara Aktar (Yalnızca Yönetici Aktifken Görünür) */}
                    {isAdmin && (
                      <button
                        id="export-to-sheets-btn"
                        onClick={() => setIsExportModalOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 hover:border-emerald-500 text-emerald-300 hover:text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
                        title="Katılımcı ve yoklama çizelgesini Google E-Tablolar ve Excel için aktar / aç"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>E-Tablolara Aktar</span>
                      </button>
                    )}

                    {/* Hafta Eksilt (-) ve Hafta Ekle (+) Butonları (Yalnızca Yönetici Aktifken Görünür) */}
                    {isAdmin && (
                      <div className="flex items-center gap-1.5">
                        <button
                          id="remove-week-top-btn"
                          onClick={handleRemoveWeekColumn}
                          disabled={currentGroup.totalWeeks <= 1}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold shadow-sm transition-all active:scale-95 ${
                            currentGroup.totalWeeks <= 1
                              ? 'bg-slate-800/40 border-slate-800 text-slate-600 cursor-not-allowed opacity-60'
                              : 'bg-rose-600/20 hover:bg-rose-600 border-rose-500/40 hover:border-rose-500 text-rose-300 hover:text-white'
                          }`}
                          title={currentGroup.totalWeeks <= 1 ? 'En az 1 hafta kalmalıdır' : `Son hafta sütununu çıkar (-H${currentGroup.totalWeeks})`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                          <span>Hafta Çıkar (-H{currentGroup.totalWeeks})</span>
                        </button>

                        <button
                          id="add-week-top-btn"
                          onClick={handleAddWeekColumn}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 border border-blue-500/40 hover:border-blue-500 text-blue-300 hover:text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
                          title="Programa yeni hafta sütunu ekle (+1 Hafta)"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Hafta Ekle (+H{currentGroup.totalWeeks + 1})</span>
                        </button>
                      </div>
                    )}

                    <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                      Kayıtlı: <strong className="text-white">{currentGroup.participants.length}</strong> Öğretmen
                    </span>
                  </div>
                </div>

                {!isAdmin ? (
                  /* GATED ACCESS CARD FOR NON-ADMIN */
                  <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-950/80 to-slate-900/60 p-6 text-center space-y-4 shadow-inner">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 mx-auto">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div className="max-w-md mx-auto space-y-1.5">
                      <h6 className="text-sm font-bold text-white">
                        Katılımcı Listesi ve Yoklama Çizelgesi Korumalıdır
                      </h6>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Öğretmen isimleri, branş bilgileri ve 2026-2027 eğitim dönemi devam-devamsızlık takip çizelgesi yalnızca eğitim koordinatörü ve yöneticilere açıktır.
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        id="locked-section-admin-login-btn"
                        onClick={() => onOpenAdminLogin('Katılımcı listesi ve yoklama çizelgesini görüntülemek ve düzenlemek için lütfen yönetici girişi yapınız.')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/25 transition-all active:scale-95"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Yönetici Girişi Yap (Görüntüle & Düzenle)</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* FULL TABLE & CONTROLS FOR ADMIN */
                  <div className="space-y-4">
                    <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/40">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800">
                          <tr>
                            <th className="py-3 px-4">Öğretmen Adı Soyadı</th>
                            <th className="py-3 px-4">Branş</th>
                            {Array.from({ length: currentGroup.totalWeeks }).map((_, wIdx) => {
                              const dateStr = currentGroup.weekDates?.[wIdx];
                              const isEditing = editingWeekDateIdx === wIdx;

                              return (
                                <th key={wIdx} className="py-2.5 px-2 text-center select-none min-w-[76px] align-top">
                                  <div className="flex flex-col items-center justify-center gap-1">
                                    <div className="flex items-center gap-1 font-bold text-slate-200">
                                      <span>H{wIdx + 1}</span>
                                      {isAdmin && (
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (isEditing) {
                                              setEditingWeekDateIdx(null);
                                            } else {
                                              setEditingWeekDateIdx(wIdx);
                                              setEditingDateValue(dateStr || '');
                                            }
                                          }}
                                          title={`${wIdx + 1}. Hafta Tarihini Düzenle`}
                                          className="text-slate-400 hover:text-blue-400 p-0.5 rounded transition-colors"
                                        >
                                          <Calendar className="w-3 h-3" />
                                        </button>
                                      )}
                                    </div>

                                    {/* Date display or inline edit */}
                                    {isAdmin && isEditing ? (
                                      <div 
                                        className="flex flex-col items-center gap-1 mt-0.5" 
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <input
                                          type="text"
                                          value={editingDateValue}
                                          onChange={(e) => setEditingDateValue(e.target.value)}
                                          placeholder="Örn: 16 Eki"
                                          autoFocus
                                          className="w-20 px-1.5 py-0.5 bg-slate-950 border border-blue-500 rounded text-[10px] text-white text-center focus:outline-none focus:ring-1 focus:ring-blue-400"
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                              handleSaveWeekDate(wIdx, editingDateValue);
                                            } else if (e.key === 'Escape') {
                                              setEditingWeekDateIdx(null);
                                            }
                                          }}
                                        />
                                        <div className="flex items-center gap-1">
                                          <button
                                            type="button"
                                            onClick={() => handleSetTodayDate(wIdx)}
                                            title="Bugünün tarihini ekle"
                                            className="px-1 py-0.5 bg-blue-600/30 hover:bg-blue-600 text-[9px] text-blue-200 rounded font-normal transition-colors"
                                          >
                                            Bugün
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handleSaveWeekDate(wIdx, editingDateValue)}
                                            title="Kaydet"
                                            className="px-1 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-[9px] text-white rounded font-bold transition-colors"
                                          >
                                            ✓
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <button
                                        type="button"
                                        disabled={!isAdmin}
                                        onClick={() => {
                                          if (isAdmin) {
                                            setEditingWeekDateIdx(wIdx);
                                            setEditingDateValue(dateStr || '');
                                          }
                                        }}
                                        title={isAdmin ? `${wIdx + 1}. Hafta Tarihini Belirlemek / Değiştirmek İçin Tıklayın` : undefined}
                                        className={`text-[10px] px-1.5 py-0.5 rounded transition-all leading-tight max-w-[80px] truncate ${
                                          dateStr
                                            ? 'text-blue-300 font-medium bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30'
                                            : isAdmin
                                            ? 'text-slate-500 hover:text-slate-200 border border-dashed border-slate-700 hover:border-slate-500'
                                            : 'text-slate-600'
                                        }`}
                                      >
                                        {dateStr || (isAdmin ? '+ Tarih' : '-')}
                                      </button>
                                    )}
                                  </div>
                                </th>
                              );
                            })}

                            {/* - / + Week column buttons in header (Admin only) */}
                            {isAdmin && (
                              <th className="py-2.5 px-2 text-center align-middle">
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    type="button"
                                    id="table-header-remove-week-btn"
                                    onClick={handleRemoveWeekColumn}
                                    disabled={currentGroup.totalWeeks <= 1}
                                    title={currentGroup.totalWeeks <= 1 ? 'En az 1 hafta kalmalıdır' : `Son Hafta Sütununu Çıkar (-H${currentGroup.totalWeeks})`}
                                    className={`inline-flex items-center justify-center w-6 h-6 rounded-md border text-xs font-bold transition-all shadow-sm active:scale-95 ${
                                      currentGroup.totalWeeks <= 1
                                        ? 'bg-slate-800/40 border-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                                        : 'bg-rose-600/20 hover:bg-rose-600 border-rose-500/40 hover:border-rose-500 text-rose-300 hover:text-white'
                                    }`}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <button
                                    type="button"
                                    id="table-header-add-week-btn"
                                    onClick={handleAddWeekColumn}
                                    title="Yeni Hafta Sütunu Ekle (+1 Hafta)"
                                    className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-600/20 hover:bg-blue-600 border border-blue-500/40 hover:border-blue-500 text-blue-300 hover:text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </th>
                            )}

                            <th className="py-3 px-3 text-right">İşlem</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {currentGroup.participants.length === 0 ? (
                            <tr>
                              <td colSpan={currentGroup.totalWeeks + (isAdmin ? 4 : 3)} className="py-6 text-center text-slate-500 text-xs">
                                Bu grupta henüz kayıtlı öğretmen bulunmuyor. Aşağıdaki formdan ekleyebilirsiniz.
                              </td>
                            </tr>
                          ) : (
                            currentGroup.participants.map((p) => (
                              <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                                <td className="py-3 px-4 font-semibold text-slate-200 whitespace-nowrap">
                                  {p.fullName}
                                </td>
                                <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                                    {p.branch}
                                  </span>
                                </td>
                                {Array.from({ length: currentGroup.totalWeeks }).map((_, wIdx) => {
                                  const isAttended = p.attendance[wIdx];
                                  return (
                                    <td key={wIdx} className="py-3 px-2 text-center">
                                      <button
                                        onClick={() => handleToggleAttendance(p.id, wIdx)}
                                        title={`${p.fullName} - ${wIdx + 1}. Hafta Katılımını Değiştir`}
                                        className={`w-6 h-6 rounded-md inline-flex items-center justify-center transition-all ${
                                          isAttended
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                                            : 'bg-slate-900 text-slate-600 border border-slate-800 hover:border-slate-700'
                                        }`}
                                      >
                                        {isAttended ? (
                                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                                        ) : (
                                          <span className="text-[10px] text-slate-600">•</span>
                                        )}
                                      </button>
                                    </td>
                                  );
                                })}

                                {/* Empty cell to align with + week column in header */}
                                {isAdmin && (
                                  <td className="py-3 px-2 text-center text-slate-700 text-xs font-mono">
                                    ·
                                  </td>
                                )}

                                <td className="py-3 px-3 text-right">
                                  <button
                                    onClick={() => handleRemoveParticipant(p.id)}
                                    title="Öğretmeni Gruptan Çıkar"
                                    className="text-slate-600 hover:text-red-400 p-1 rounded transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Add Participant Inline Form (Admin only) */}
                    <form onSubmit={handleAddParticipant} className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                      <div className="relative flex-1 w-full sm:w-auto">
                        <input
                          type="text"
                          placeholder="Yeni Öğretmen Adı Soyadı..."
                          value={newTeacherName}
                          onChange={(e) => setNewTeacherName(e.target.value)}
                          className="w-full bg-slate-950 text-xs text-slate-200 placeholder-slate-500 rounded-lg px-3 py-2 border border-slate-800 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="relative w-full sm:w-48">
                        <input
                          type="text"
                          placeholder="Branşı (Örn: Matematik)"
                          value={newTeacherBranch}
                          onChange={(e) => setNewTeacherBranch(e.target.value)}
                          className="w-full bg-slate-950 text-xs text-slate-200 placeholder-slate-500 rounded-lg px-3 py-2 border border-slate-800 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Öğretmen Ekle</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Schedule Matrix View (All 10 Groups across Monday - Friday) */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {daysOfWeek.map((day) => {
              const dayGroups = groups.filter(g => g.day.toLowerCase() === day.toLowerCase());
              return (
                <div key={day} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h5 className="text-sm font-bold text-white">{day}</h5>
                    <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                      {dayGroups.length} Grup
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {dayGroups.length === 0 ? (
                      <p className="text-xs text-slate-500 italic py-2">Oturum planlanmadı</p>
                    ) : (
                      dayGroups.map((grp) => (
                        <div
                          key={grp.id}
                          onClick={() => {
                            setSelectedGroupId(grp.id);
                            setViewMode('details');
                          }}
                          className="p-3 rounded-lg bg-slate-950 border border-slate-800/90 hover:border-blue-700/60 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="font-bold text-blue-400">Grup {grp.groupNumber}</span>
                            <span className="text-slate-400">{grp.timeSlot}</span>
                          </div>
                          <div className="text-xs font-semibold text-slate-200 group-hover:text-white line-clamp-1">
                            {grp.name.replace(/^\d+\.\s*Grup\s*\(/, '').replace(/\)$/, '')}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                            <span>{grp.location}</span>
                            <span className="text-slate-300 font-mono">40 Dk • {grp.participants.length} Katılımcı</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Export to Sheets Modal (Google E-Tablolar & Excel) */}
      <ExportSheetsModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        groups={groups}
        selectedGroupId={selectedGroupId}
      />
    </div>
  );
};
