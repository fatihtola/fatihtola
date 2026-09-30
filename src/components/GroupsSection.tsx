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
  ShieldCheck,
  LogIn,
  FileSpreadsheet,
  ListPlus,
  X,
  AlertCircle,
  ArrowRightLeft,
  ArrowRight
} from 'lucide-react';
import { TeacherGroup, Participant } from '../types';
import { ExportSheetsModal } from './ExportSheetsModal';

export function formatTeacherName(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return parts[0];
  const firstName = parts.slice(0, -1).join(' ');
  const lastName = parts[parts.length - 1];
  // If already formatted like "Y." or "Y"
  if (/^[A-Za-zÇĞİÖŞÜçğıöşü]\.?$/.test(lastName)) {
    return `${firstName} ${lastName.replace('.', '')}.`;
  }
  return `${firstName} ${lastName[0].toUpperCase()}.`;
}

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
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState('');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [editingWeekDateIdx, setEditingWeekDateIdx] = useState<number | null>(null);
  const [editingDateValue, setEditingDateValue] = useState('');
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkInputText, setBulkInputText] = useState('');
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [editingTargetGroup, setEditingTargetGroup] = useState<TeacherGroup | null>(null);
  const [scheduleDay, setScheduleDay] = useState('Pazartesi');
  const [scheduleTimeSlot, setScheduleTimeSlot] = useState('');
  const [scheduleLocation, setScheduleLocation] = useState('');
  const [scheduleName, setScheduleName] = useState('');
  const [editingParticipantId, setEditingParticipantId] = useState<string | null>(null);
  const [editingParticipantName, setEditingParticipantName] = useState<string>('');
  const [transferringParticipant, setTransferringParticipant] = useState<Participant | null>(null);
  const [transferTargetGroupId, setTransferTargetGroupId] = useState<string>('');
  const [preserveAttendanceOnTransfer, setPreserveAttendanceOnTransfer] = useState(true);
  const [transferNotice, setTransferNotice] = useState<string | null>(null);

  const currentGroup = groups.find(g => g.id === selectedGroupId) || groups[0];

  const handleStartEditParticipant = (p: Participant) => {
    if (!isAdmin) {
      onOpenAdminLogin('Öğretmen ismini düzenlemek için lütfen yönetici girişi yapınız.');
      return;
    }
    setEditingParticipantId(p.id);
    setEditingParticipantName(p.fullName);
  };

  const handleSaveParticipantName = (pId: string) => {
    if (!isAdmin || !currentGroup) return;
    const cleanName = editingParticipantName.trim();
    if (!cleanName) return;

    const updatedParticipants = currentGroup.participants.map(p => {
      if (p.id === pId) {
        return { ...p, fullName: cleanName };
      }
      return p;
    });

    onUpdateGroup({
      ...currentGroup,
      participants: updatedParticipants
    });
    setEditingParticipantId(null);
    setEditingParticipantName('');
  };

  const handleOpenTransferModal = (p: Participant) => {
    if (!isAdmin) {
      onOpenAdminLogin('Öğretmeni farklı bir gruba aktarmak için lütfen yönetici girişi yapınız.');
      return;
    }
    const otherGroups = groups.filter(g => g.id !== currentGroup?.id);
    setTransferTargetGroupId(otherGroups[0]?.id || '');
    setPreserveAttendanceOnTransfer(true);
    setTransferringParticipant(p);
  };

  const handleExecuteTransfer = (switchGroupAfterTransfer: boolean = false) => {
    if (!isAdmin) {
      onOpenAdminLogin('Öğretmeni farklı bir gruba aktarmak için lütfen yönetici girişi yapınız.');
      return;
    }
    if (!transferringParticipant || !currentGroup || !transferTargetGroupId) return;
    if (transferTargetGroupId === currentGroup.id) return;

    const targetGroup = groups.find(g => g.id === transferTargetGroupId);
    if (!targetGroup) return;

    // 1. Remove participant from current group
    const updatedCurrentGroup: TeacherGroup = {
      ...currentGroup,
      participants: currentGroup.participants.filter(p => p.id !== transferringParticipant.id)
    };

    // 2. Prepare participant attendance for target group
    let newAttendance: boolean[];
    if (preserveAttendanceOnTransfer) {
      newAttendance = [...transferringParticipant.attendance];
      while (newAttendance.length < targetGroup.totalWeeks) {
        newAttendance.push(false);
      }
      if (newAttendance.length > targetGroup.totalWeeks) {
        newAttendance = newAttendance.slice(0, targetGroup.totalWeeks);
      }
    } else {
      newAttendance = Array(targetGroup.totalWeeks).fill(false);
    }

    const transferredParticipant: Participant = {
      ...transferringParticipant,
      attendance: newAttendance
    };

    // 3. Add to target group (prevent duplicate)
    const alreadyExists = targetGroup.participants.some(
      p => p.fullName.trim().toLowerCase() === transferringParticipant.fullName.trim().toLowerCase()
    );

    const updatedTargetGroup: TeacherGroup = {
      ...targetGroup,
      participants: alreadyExists
        ? targetGroup.participants
        : [...targetGroup.participants, transferredParticipant]
    };

    // 4. Update both groups
    onUpdateGroup(updatedCurrentGroup);
    onUpdateGroup(updatedTargetGroup);

    const teacherName = formatTeacherName(transferringParticipant.fullName);
    const targetGroupName = targetGroup.name;

    setTransferringParticipant(null);
    setTransferNotice(`✓ ${teacherName} başarıyla ${targetGroupName} (${targetGroup.day} ${targetGroup.timeSlot}) grubuna aktarıldı.`);

    if (switchGroupAfterTransfer) {
      setSelectedGroupId(targetGroup.id);
    }

    setTimeout(() => {
      setTransferNotice(null);
    }, 4500);
  };

  const handleOpenScheduleEdit = (groupToEdit: TeacherGroup = currentGroup) => {
    if (!isAdmin) {
      onOpenAdminLogin('Grup gün ve saatini değiştirmek için lütfen yönetici girişi yapınız.');
      return;
    }
    setEditingTargetGroup(groupToEdit);
    setScheduleDay(groupToEdit.day || 'Pazartesi');
    setScheduleTimeSlot(groupToEdit.timeSlot || '15:30 - 16:10');
    setScheduleLocation(groupToEdit.location || 'Maker Atölyesi');
    setScheduleName(groupToEdit.name || `${groupToEdit.groupNumber}. Grup`);
    setIsEditingSchedule(true);
  };

  const handleSaveSchedule = () => {
    if (!isAdmin || !editingTargetGroup) return;
    const updated: TeacherGroup = {
      ...editingTargetGroup,
      name: scheduleName.trim() || editingTargetGroup.name,
      day: scheduleDay.trim() || editingTargetGroup.day,
      timeSlot: scheduleTimeSlot.trim() || editingTargetGroup.timeSlot,
      location: scheduleLocation.trim() || editingTargetGroup.location,
    };
    onUpdateGroup(updated);
    setIsEditingSchedule(false);
    setEditingTargetGroup(null);
  };

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

    const fullEnteredName = newTeacherName.trim();

    const newParticipant: Participant = {
      id: `p-${Date.now()}`,
      fullName: fullEnteredName,
      branch: '',
      attendance: Array(currentGroup.totalWeeks).fill(false)
    };

    onUpdateGroup({
      ...currentGroup,
      participants: [...currentGroup.participants, newParticipant]
    });

    setNewTeacherName('');
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

  const handleClearAllParticipants = () => {
    if (!isAdmin) {
      onOpenAdminLogin();
      return;
    }
    if (!currentGroup) return;
    if (confirm(`${currentGroup.name} içerisindeki tüm öğretmen isimlerini silmek istediğinize emin misiniz?`)) {
      onUpdateGroup({
        ...currentGroup,
        participants: []
      });
    }
  };

  const handleSaveBulkParticipants = () => {
    if (!isAdmin || !currentGroup) return;
    const lines = bulkInputText
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0);

    if (lines.length === 0) return;

    const newItems: Participant[] = lines.map((line, idx) => ({
      id: `p-${Date.now()}-${idx}`,
      fullName: line.trim(),
      branch: '',
      attendance: Array(currentGroup.totalWeeks).fill(false)
    }));

    onUpdateGroup({
      ...currentGroup,
      participants: [...currentGroup.participants, ...newItems]
    });

    setBulkInputText('');
    setIsBulkModalOpen(false);
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

  // Parsed preview for bulk add modal
  const bulkPreviewNames = bulkInputText
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(formatTeacherName);

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
            Haftalık 40 dakika sürecek 10 ayrı eğitim grubunun takvimi, çalışma planı ve katılım yönetimi
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
                  <span>{grp.name}</span>
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

                {/* Day, Time and Room Badges & Edit Button */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenScheduleEdit(currentGroup)}
                    title={isAdmin ? "Günü değiştirmek için tıklayın" : "Gün ve saati değiştirmek için yönetici girişi yapınız"}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 text-xs text-slate-200 transition-all cursor-pointer group"
                  >
                    <CalendarDays className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">{currentGroup.day}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenScheduleEdit(currentGroup)}
                    title={isAdmin ? "Saati değiştirmek için tıklayın" : "Gün ve saati değiştirmek için yönetici girişi yapınız"}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-xs text-slate-200 transition-all cursor-pointer group"
                  >
                    <Clock className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">{currentGroup.timeSlot}</span>
                    <span className="text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded font-mono font-semibold">40 Dk</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenScheduleEdit(currentGroup)}
                    title={isAdmin ? "Atölye/konum değiştirmek için tıklayın" : "Konumu değiştirmek için yönetici girişi yapınız"}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-xs text-slate-200 transition-all cursor-pointer group"
                  >
                    <MapPin className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span>{currentGroup.location}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenScheduleEdit(currentGroup)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/15 hover:bg-blue-600 border border-blue-500/30 hover:border-blue-500 text-blue-300 hover:text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
                    title="Grup gününü, saatini ve adını dilediğiniz gibi değiştirin"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                    <span>Günü ve Saati Değiştir</span>
                  </button>
                </div>
              </div>

              {/* Group Notes / Goals */}
              <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Grup Notları & Çalışma Hedefleri
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
                      onClick={() => onOpenAdminLogin('Grup notlarını düzenlemek için yönetici girişi yapınız.')}
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
                    {currentGroup.notes || "Henüz özel bir grup notu girilmedi. Yönetici girişiyle uygulama hedeflerini ekleyebilirsiniz."}
                  </p>
                ) : (
                  <div className="space-y-2">
                    <textarea
                      value={notesDraft}
                      onChange={(e) => setNotesDraft(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-900 text-xs sm:text-sm text-slate-200 rounded-lg p-2.5 border border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Bu grup için hedeflenen uygulamalar ve materyal hedefleri..."
                    />
                  </div>
                )}
              </div>

              {/* Participants & Attendance Section */}
              <div className="space-y-4 pt-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h5 className="text-base font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      Katılımcı Öğretmen Listesi & Haftalık Katılım Takibi
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isAdmin 
                        ? "Öğretmenlerin soyadlarının ilk harfi ve nokta formatı (Ad S.) kullanılır. Haftalık katılımı tıklayarak işaretleyebilirsiniz."
                        : "Öğretmen kişisel verileri ve katılım çizelgesi gizlilik nedeniyle yönetici paneline bağlıdır."}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                    {/* Toplu İsim Ekle (Yönetici) */}
                    {isAdmin && (
                      <button
                        onClick={() => setIsBulkModalOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/40 hover:border-indigo-500 text-indigo-300 hover:text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
                        title="Toplu isim listesi yapıştırarak hızlıca ekleyin"
                      >
                        <ListPlus className="w-3.5 h-3.5" />
                        <span>Toplu İsim Yapıştır</span>
                      </button>
                    )}

                    {/* Gruptaki İsimleri Temizle (Yönetici) */}
                    {isAdmin && currentGroup.participants.length > 0 && (
                      <button
                        onClick={handleClearAllParticipants}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 border border-rose-500/40 hover:border-rose-500 text-rose-300 hover:text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
                        title="Bu gruptaki tüm öğretmen isimlerini sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>İsimleri Sil</span>
                      </button>
                    )}

                    {/* E-Tablolara Aktar */}
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

                    {/* Hafta Eksilt (-) ve Hafta Ekle (+) Butonları */}
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
                        Öğretmen isimleri ve katılım takip çizelgesi yalnızca eğitim koordinatörü ve yöneticilere açıktır.
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
                    {transferNotice && (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs animate-fadeIn">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{transferNotice}</span>
                        </div>
                        <button 
                          onClick={() => setTransferNotice(null)} 
                          className="text-slate-400 hover:text-white p-1 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/40">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800">
                          <tr>
                            <th className="py-3 px-4 min-w-[220px]">
                              <div className="flex items-center gap-2">
                                <span>Öğretmen Adı Soyadı</span>
                                <span className="text-[10px] font-normal text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                                  Ad S. (Kısa)
                                </span>
                              </div>
                            </th>
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
                              <td colSpan={currentGroup.totalWeeks + (isAdmin ? 3 : 2)} className="py-8 text-center text-slate-500 text-xs space-y-2">
                                <p className="font-medium text-slate-400">Bu grupta kayıtlı öğretmen bulunmuyor.</p>
                                <p className="text-[11px] text-slate-500">
                                  Aşağıdaki alandan tek tek öğretmen ekleyebilir veya "Toplu İsim Yapıştır" butonu ile çizelgedeki isimleri topluca aktarabilirsiniz.
                                </p>
                              </td>
                            </tr>
                          ) : (
                            currentGroup.participants.map((p) => (
                              <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                                <td className="py-3 px-4 font-semibold text-slate-200 whitespace-nowrap">
                                  {editingParticipantId === p.id ? (
                                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                                      <input
                                        type="text"
                                        value={editingParticipantName}
                                        onChange={(e) => setEditingParticipantName(e.target.value)}
                                        placeholder="Tam İsim ve Soyisim..."
                                        autoFocus
                                        className="w-48 px-2 py-1 bg-slate-950 border border-blue-500 rounded text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') handleSaveParticipantName(p.id);
                                          else if (e.key === 'Escape') setEditingParticipantId(null);
                                        }}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleSaveParticipantName(p.id)}
                                        className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold"
                                        title="Kaydet"
                                      >
                                        ✓
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setEditingParticipantId(null)}
                                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px]"
                                        title="İptal"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2 group/teacher">
                                      <div>
                                        <span className="font-semibold text-slate-200" title={`Kayıtlı İsim: ${p.fullName}`}>
                                          {formatTeacherName(p.fullName)}
                                        </span>
                                      </div>
                                      {isAdmin && (
                                        <button
                                          type="button"
                                          onClick={() => handleStartEditParticipant(p)}
                                          className="opacity-0 group-hover/teacher:opacity-100 p-1 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded transition-all"
                                          title="Öğretmenin tam ad ve soyadını düzenle"
                                        >
                                          <FileEdit className="w-3 h-3" />
                                        </button>
                                      )}
                                    </div>
                                  )}
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
                                  <div className="flex items-center justify-end gap-1">
                                    {isAdmin && (
                                      <button
                                        type="button"
                                        onClick={() => handleOpenTransferModal(p)}
                                        title={`${formatTeacherName(p.fullName)} öğretmenini farklı bir gruba aktar`}
                                        className="text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 p-1.5 rounded-lg transition-colors cursor-pointer"
                                      >
                                        <ArrowRightLeft className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveParticipant(p.id)}
                                      title="Öğretmeni Gruptan Çıkar"
                                      className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg transition-colors cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Add Participant Inline Form (Admin only) */}
                    <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-300">Yeni Öğretmen Ekle (Tam İsim ve Soyisim)</span>
                        <span className="text-[11px] text-slate-500">
                          Tam isim saklanır ve <strong>tüm çıktılarda tam soyisim görünür</strong>.
                        </span>
                      </div>
                      <form onSubmit={handleAddParticipant} className="flex flex-col sm:flex-row items-center gap-2">
                        <div className="relative flex-1 w-full">
                          <input
                            type="text"
                            placeholder="Öğretmen Tam Adı ve Soyadı (Örn: Ayşe Yılmaz)..."
                            value={newTeacherName}
                            onChange={(e) => setNewTeacherName(e.target.value)}
                            className="w-full bg-slate-900 text-xs text-slate-200 placeholder-slate-500 rounded-lg px-3 py-2 border border-slate-800 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        {newTeacherName.trim().split(/\s+/).length > 1 && (
                          <div className="text-[11px] text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20 whitespace-nowrap">
                            Çıktılarda: <strong>{newTeacherName.trim()}</strong> • Tabloda: <strong>{formatTeacherName(newTeacherName)}</strong>
                          </div>
                        )}
                        <button
                          type="submit"
                          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Öğretmen Ekle</span>
                        </button>
                      </form>
                    </div>
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
                          className="p-3 rounded-lg bg-slate-950 border border-slate-800/90 hover:border-blue-700/60 transition-all group"
                        >
                          <div
                            onClick={() => {
                              setSelectedGroupId(grp.id);
                              setViewMode('details');
                            }}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="font-bold text-blue-400">{grp.name}</span>
                              <span className="text-slate-400">{grp.timeSlot}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-2 flex items-center justify-between">
                              <span>{grp.location}</span>
                              <span className="text-slate-300 font-mono">40 Dk • {grp.participants.length} Katılımcı</span>
                            </div>
                          </div>

                          <div className="mt-2.5 pt-2 border-t border-slate-900 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenScheduleEdit(grp);
                              }}
                              className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium transition-colors"
                              title="Bu grubun gün ve saatini değiştir"
                            >
                              <FileEdit className="w-3 h-3" />
                              <span>Günü/Saati Değiştir</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedGroupId(grp.id);
                                setViewMode('details');
                              }}
                              className="text-[11px] text-slate-400 hover:text-white transition-colors"
                            >
                              Detay →
                            </button>
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

      {/* Edit Group Schedule (Day & Time) Modal */}
      {isEditingSchedule && editingTargetGroup && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-blue-400" />
                <h4 className="text-base font-bold text-white">
                  Grup Gün ve Saatini Değiştir
                </h4>
              </div>
              <button 
                onClick={() => setIsEditingSchedule(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Group Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Grup Adı
                </label>
                <input
                  type="text"
                  value={scheduleName}
                  onChange={(e) => setScheduleName(e.target.value)}
                  placeholder="Örn: 1. Grup"
                  className="w-full bg-slate-950 text-xs sm:text-sm text-slate-200 rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Day Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Eğitim Günü</span>
                  <span className="text-[11px] text-blue-400 font-normal">Seçili: {scheduleDay}</span>
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {daysOfWeek.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setScheduleDay(d)}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all border ${
                        scheduleDay.toLowerCase() === d.toLowerCase()
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={scheduleDay}
                  onChange={(e) => setScheduleDay(e.target.value)}
                  placeholder="Veya özel bir gün yazın (Örn: Pazartesi)..."
                  className="w-full bg-slate-950 text-xs text-slate-300 rounded-lg px-3 py-1.5 border border-slate-800/80 focus:outline-none focus:border-blue-500 mt-1"
                />
              </div>

              {/* Time Slot Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>Saat Aralığı / Ders Saati</span>
                  <span className="text-[11px] text-indigo-400 font-normal">Seçili: {scheduleTimeSlot}</span>
                </label>
                <input
                  type="text"
                  value={scheduleTimeSlot}
                  onChange={(e) => setScheduleTimeSlot(e.target.value)}
                  placeholder="Örn: 15:30 - 16:10 veya 3. Ders"
                  className="w-full bg-slate-950 text-xs sm:text-sm text-slate-200 rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-blue-500"
                />
                
                {/* Quick Presets */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] text-slate-500 block">Hızlı Saat Seçenekleri:</span>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                    {[
                      '15:30 - 16:10',
                      '16:20 - 17:00',
                      '14:30 - 15:10',
                      '15:20 - 16:00',
                      '09:00 - 09:40',
                      '10:00 - 10:40',
                      '11:00 - 11:40',
                      '13:30 - 14:10',
                      '1. Ders (08:30 - 09:10)',
                      '2. Ders (09:20 - 10:00)',
                      '3. Ders (10:15 - 10:55)',
                      '4. Ders (11:05 - 11:45)',
                      '5. Ders (11:55 - 12:35)',
                      '6. Ders (13:10 - 13:50)',
                      '7. Ders (14:00 - 14:40)',
                      '8. Ders (14:50 - 15:30)'
                    ].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setScheduleTimeSlot(slot)}
                        className={`text-[10px] px-2 py-1 rounded transition-colors ${
                          scheduleTimeSlot === slot
                            ? 'bg-indigo-600 text-white font-semibold'
                            : 'bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Atölye / Konum
                </label>
                <input
                  type="text"
                  value={scheduleLocation}
                  onChange={(e) => setScheduleLocation(e.target.value)}
                  placeholder="Örn: Maker Atölyesi"
                  className="w-full bg-slate-950 text-xs sm:text-sm text-slate-200 rounded-xl px-3 py-2 border border-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsEditingSchedule(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleSaveSchedule}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-600/30 active:scale-95"
              >
                Gün ve Saati Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Add / Paste Modal */}
      {isBulkModalOpen && currentGroup && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ListPlus className="w-5 h-5 text-blue-400" />
                <h4 className="text-base font-bold text-white">
                  Toplu İsim Yapıştır ({currentGroup.name})
                </h4>
              </div>
              <button 
                onClick={() => setIsBulkModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                Resimdeki veya belgenizdeki öğretmen isimlerini her satıra bir isim gelecek şekilde aşağıya yapıştırın. Soyadlar otomatik olarak ilk harfi ve sonuna nokta konarak (Örn: <strong>Ahmet Y.</strong>) dönüştürülecektir.
              </p>

              <textarea
                value={bulkInputText}
                onChange={(e) => setBulkInputText(e.target.value)}
                rows={6}
                placeholder="Örnek:&#10;Ahmet Yılmaz&#10;Zeynep Kaya&#10;Mehmet Demir&#10;Fatma Çelik"
                className="w-full bg-slate-950 text-xs sm:text-sm font-mono text-slate-200 rounded-xl p-3 border border-slate-800 focus:outline-none focus:border-blue-500 resize-none"
              />

              {bulkPreviewNames.length > 0 && (
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 max-h-36 overflow-y-auto space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-400 block">
                    Dönüştürülecek İsimler ({bulkPreviewNames.length} Kişi):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {bulkPreviewNames.map((name, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsBulkModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                İptal
              </button>
              <button
                type="button"
                disabled={bulkPreviewNames.length === 0}
                onClick={handleSaveBulkParticipants}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white transition-all shadow-md shadow-blue-600/30"
              >
                Gruba Ekle ({bulkPreviewNames.length} Öğretmen)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Participant to Another Group Modal */}
      {transferringParticipant && currentGroup && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Öğretmeni Farklı Bir Gruba Aktar
                  </h4>
                  <p className="text-xs text-slate-400">
                    Öğretmenin grup değişikliğini seçip anında diğer gruba aktarın.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setTransferringParticipant(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Participant & Current Group Info */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Aktarılacak Öğretmen
                </span>
                <span className="text-[11px] text-blue-400 font-mono">
                  Mevcut: {currentGroup.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">
                    {formatTeacherName(transferringParticipant.fullName)}
                  </div>
                  {transferringParticipant.fullName !== formatTeacherName(transferringParticipant.fullName) && (
                    <div className="text-[11px] text-slate-400">
                      Kayıtlı Tam İsim: {transferringParticipant.fullName}
                    </div>
                  )}
                </div>
                <div className="text-right text-xs text-slate-400">
                  <span className="block font-medium text-slate-300">{currentGroup.day} {currentGroup.timeSlot}</span>
                  <span className="text-[10px] text-slate-500">{currentGroup.location}</span>
                </div>
              </div>
            </div>

            {/* Target Group Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Hedef Grubu Seçin:</span>
                <span className="text-[11px] text-blue-400 font-normal">
                  {groups.filter(g => g.id !== currentGroup.id).length} Diğer Grup
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {groups
                  .filter(g => g.id !== currentGroup.id)
                  .map(targetGrp => {
                    const isSelected = targetGrp.id === transferTargetGroupId;
                    return (
                      <div
                        key={targetGrp.id}
                        onClick={() => setTransferTargetGroupId(targetGrp.id)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-500/10'
                            : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-300'
                          }`}>
                            Grup {targetGrp.groupNumber}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {targetGrp.participants.length} Öğretmen
                          </span>
                        </div>
                        <div className="text-xs font-bold text-white mb-0.5">
                          {targetGrp.name}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <span>{targetGrp.day}</span>
                          <span>•</span>
                          <span>{targetGrp.timeSlot}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Attendance Preservation Option */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-3">
              <input
                type="checkbox"
                id="preserve-attendance-checkbox"
                checked={preserveAttendanceOnTransfer}
                onChange={(e) => setPreserveAttendanceOnTransfer(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="preserve-attendance-checkbox" className="text-xs text-slate-300 cursor-pointer select-none">
                Mevcut haftalık yoklama (katılım) kayıtlarını koru ve yeni gruba taşı
              </label>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setTransferringParticipant(null)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                İptal
              </button>
              <button
                type="button"
                disabled={!transferTargetGroupId}
                onClick={() => handleExecuteTransfer(false)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all disabled:opacity-50"
              >
                Aktar ve Bu Grupta Kal
              </button>
              <button
                type="button"
                disabled={!transferTargetGroupId}
                onClick={() => handleExecuteTransfer(true)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-600/30 disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <span>Aktar ve Yeni Gruba Git</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
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
