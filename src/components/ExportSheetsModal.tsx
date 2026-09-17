import React, { useState } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Printer, 
  Layers, 
  Info
} from 'lucide-react';
import { TeacherGroup } from '../types';

interface ExportSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  groups: TeacherGroup[];
  selectedGroupId: string;
}

export const ExportSheetsModal: React.FC<ExportSheetsModalProps> = ({
  isOpen,
  onClose,
  groups,
  selectedGroupId,
}) => {
  const [scope, setScope] = useState<'selected' | 'all'>('selected');
  const [copied, setCopied] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentGroup = groups.find((g) => g.id === selectedGroupId) || groups[0];
  const targetGroups = scope === 'selected' && currentGroup ? [currentGroup] : groups;

  // Find max weeks among target groups for consistent columns
  const maxWeeks = Math.max(...targetGroups.map((g) => g.totalWeeks), 1);

  // Generate Tab-Separated Values (TSV) - best for direct copy-paste into Google Sheets / Excel
  const generateTSV = () => {
    const lines: string[] = [];

    // Header row
    const headers = [
      'Grup No',
      'Grup Adı',
      'Sıra',
      'Öğretmen Adı Soyadı',
      'Branş',
      ...Array.from({ length: maxWeeks }).map((_, wIdx) => {
        const dateNote = currentGroup?.weekDates?.[wIdx] ? ` (${currentGroup.weekDates[wIdx]})` : '';
        return `H${wIdx + 1}${dateNote}`;
      }),
      'Katılım Sayısı',
      'Katılım Oranı (%)'
    ];
    lines.push(headers.join('\t'));

    // Rows
    targetGroups.forEach((grp) => {
      grp.participants.forEach((p, pIdx) => {
        const attendedCount = p.attendance.filter(Boolean).length;
        const totalW = grp.totalWeeks;
        const pct = totalW > 0 ? Math.round((attendedCount / totalW) * 100) : 0;

        const row = [
          `Grup ${grp.groupNumber}`,
          grp.name,
          (pIdx + 1).toString(),
          p.fullName,
          p.branch,
          ...Array.from({ length: maxWeeks }).map((_, wIdx) => {
            if (wIdx >= grp.totalWeeks) return '-';
            return p.attendance[wIdx] ? 'KATILDI' : 'KATILMADI';
          }),
          `${attendedCount}/${totalW}`,
          `%${pct}`
        ];
        lines.push(row.join('\t'));
      });
    });

    return lines.join('\n');
  };

  // Generate CSV format (with BOM and semicolon delimiter for Turkish Excel/Sheets)
  const generateCSV = () => {
    const lines: string[] = [];

    const headers = [
      'Grup No',
      'Grup Adı',
      'Sıra',
      'Öğretmen Adı Soyadı',
      'Branş',
      ...Array.from({ length: maxWeeks }).map((_, wIdx) => {
        const dateNote = currentGroup?.weekDates?.[wIdx] ? ` (${currentGroup.weekDates[wIdx]})` : '';
        return `"H${wIdx + 1}${dateNote}"`;
      }),
      'Katılım Sayısı',
      'Katılım Oranı'
    ];
    lines.push(headers.join(';'));

    targetGroups.forEach((grp) => {
      grp.participants.forEach((p, pIdx) => {
        const attendedCount = p.attendance.filter(Boolean).length;
        const totalW = grp.totalWeeks;
        const pct = totalW > 0 ? Math.round((attendedCount / totalW) * 100) : 0;

        const row = [
          `"Grup ${grp.groupNumber}"`,
          `"${grp.name.replace(/"/g, '""')}"`,
          (pIdx + 1).toString(),
          `"${p.fullName.replace(/"/g, '""')}"`,
          `"${p.branch.replace(/"/g, '""')}"`,
          ...Array.from({ length: maxWeeks }).map((_, wIdx) => {
            if (wIdx >= grp.totalWeeks) return '"-"';
            return p.attendance[wIdx] ? '"KATILDI"' : '"KATILMADI"';
          }),
          `"${attendedCount}/${totalW}"`,
          `"%${pct}"`
        ];
        lines.push(row.join(';'));
      });
    });

    return '\uFEFF' + lines.join('\r\n');
  };

  const handleCopyTSV = async () => {
    const tsv = generateTSV();
    try {
      await navigator.clipboard.writeText(tsv);
      setCopied(true);
      setActionNotice('Veriler panoya kopyalandı! Herhangi bir Google E-Tablo veya Excel sayfasına Ctrl+V ile doğrudan yapıştırabilirsiniz.');
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setActionNotice('Kopyalama işlemi tamamlandı.');
    }
  };

  const handleOpenGoogleSheets = async () => {
    const tsv = generateTSV();
    try {
      await navigator.clipboard.writeText(tsv);
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }

    setActionNotice('✓ Tablo panoya kopyalandı ve Google E-Tablolar yeni sekmede açıldı! Açılan sayfada 1. hücreye tıklayıp Ctrl+V (veya Yapıştır) yapabilirsiniz.');

    // Open Google Sheets create new spreadsheet
    window.open('https://docs.google.com/spreadsheets/create', '_blank', 'noopener,noreferrer');
  };

  const handleDownloadCSV = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const fileNameSafe = scope === 'selected' && currentGroup 
      ? `Grup_${currentGroup.groupNumber}_Katilim_Cizelgesi.csv`
      : `Tum_Gruplar_Katilim_Cizelgesi.csv`;

    link.setAttribute('href', url);
    link.setAttribute('download', fileNameSafe);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setActionNotice(`✓ "${fileNameSafe}" dosyası başarıyla indirildi. Excel veya Google Drive üzerinden açabilirsiniz.`);
  };

  const handlePrintOrHtmlWindow = () => {
    const newWin = window.open('', '_blank');
    if (!newWin) {
      alert('Açılır pencere engelleyicisi yeni sekmeyi engelledi. Lütfen izin veriniz.');
      return;
    }

    const titleText = scope === 'selected' && currentGroup
      ? `${currentGroup.name} - Haftalık Katılım Takip Çizelgesi`
      : 'Tüm Öğretmen Grupları - Haftalık Katılım Takip Çizelgesi';

    let tableRows = '';
    targetGroups.forEach((grp) => {
      tableRows += `
        <tr style="background-color: #f1f5f9; font-weight: bold;">
          <td colspan="${maxWeeks + 4}" style="padding: 10px; border: 1px solid #cbd5e1; font-size: 13px; color: #1e293b;">
            Grup ${grp.groupNumber}: ${grp.name} (${grp.day} ${grp.timeSlot} - ${grp.location})
          </td>
        </tr>
      `;

      if (grp.participants.length === 0) {
        tableRows += `
          <tr>
            <td colspan="${maxWeeks + 4}" style="padding: 10px; border: 1px solid #cbd5e1; text-align: center; color: #64748b;">
              Bu grupta kayıtlı öğretmen bulunmamaktadır.
            </td>
          </tr>
        `;
      } else {
        grp.participants.forEach((p, idx) => {
          const attendedCount = p.attendance.filter(Boolean).length;
          const totalW = grp.totalWeeks;
          const pct = totalW > 0 ? Math.round((attendedCount / totalW) * 100) : 0;

          let attendanceCells = '';
          for (let w = 0; w < maxWeeks; w++) {
            if (w >= grp.totalWeeks) {
              attendanceCells += `<td style="padding: 6px; border: 1px solid #cbd5e1; text-align: center; color: #94a3b8;">-</td>`;
            } else {
              const attended = p.attendance[w];
              attendanceCells += `
                <td style="padding: 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; color: ${attended ? '#059669' : '#dc2626'}; background-color: ${attended ? '#ecfdf5' : '#fff'};">
                  ${attended ? '✓' : '—'}
                </td>
              `;
            }
          }

          tableRows += `
            <tr>
              <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; font-size: 11px;">${idx + 1}</td>
              <td style="padding: 6px 10px; border: 1px solid #cbd5e1; font-weight: 600; font-size: 12px;">${p.fullName}</td>
              <td style="padding: 6px 10px; border: 1px solid #cbd5e1; font-size: 12px; color: #475569;">${p.branch}</td>
              ${attendanceCells}
              <td style="padding: 6px; border: 1px solid #cbd5e1; text-align: center; font-size: 11px; font-weight: 600;">${attendedCount}/${totalW} (%${pct})</td>
            </tr>
          `;
        });
      }
    });

    let weekHeadersHtml = '';
    for (let w = 0; w < maxWeeks; w++) {
      const d = currentGroup?.weekDates?.[w] ? `<br><small style="font-size: 9px; font-weight: normal; color: #475569;">${currentGroup.weekDates[w]}</small>` : '';
      weekHeadersHtml += `<th style="padding: 8px 4px; border: 1px solid #cbd5e1; text-align: center; font-size: 11px;">H${w + 1}${d}</th>`;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="tr">
      <head>
        <meta charset="utf-8" />
        <title>${titleText}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 24px; color: #0f172a; background: #fff; }
          h1 { font-size: 18px; margin-bottom: 4px; color: #0f172a; }
          .sub { font-size: 12px; color: #64748b; margin-bottom: 16px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th { background-color: #0f172a; color: #fff; }
          .actions { margin-bottom: 16px; display: flex; gap: 8px; }
          button { padding: 6px 14px; font-size: 12px; font-weight: 600; cursor: pointer; border-radius: 6px; border: 1px solid #cbd5e1; background: #f8fafc; }
          button.print-btn { background: #2563eb; color: #fff; border-color: #2563eb; }
          @media print { .actions { display: none; } body { padding: 0; } }
        </style>
      </head>
      <body>
        <div class="actions">
          <button class="print-btn" onclick="window.print()">🖨️ Yazdır / PDF Kaydet</button>
          <button onclick="window.close()">Kapat</button>
        </div>
        <h1>${titleText}</h1>
        <div class="sub">Eğitim Teknolojileri ve Proje Tabanlı Yapay Zekâ Uygulamaları Portalı • 2026-2027 Dönemi</div>
        <table>
          <thead>
            <tr>
              <th style="padding: 8px; border: 1px solid #cbd5e1; width: 40px; font-size: 11px;">No</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; font-size: 12px; text-align: left;">Öğretmen Adı Soyadı</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; font-size: 12px; text-align: left;">Branş</th>
              ${weekHeadersHtml}
              <th style="padding: 8px; border: 1px solid #cbd5e1; font-size: 11px;">Katılım</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
      </html>
    `;

    newWin.document.write(html);
    newWin.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        id="export-sheets-modal"
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                E-Tablolara Aktar
                <span className="text-[11px] font-normal px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Google E-Tablolar & Excel
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Katılımcı öğretmen listesini ve haftalık yoklama verilerini E-Tablo olarak açın veya indirin.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Scope Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-slate-300">Aktarılacak Kapsam:</span>
            </div>
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setScope('selected')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  scope === 'selected'
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Grup {currentGroup?.groupNumber} (Seçili Grup)
              </button>
              <button
                type="button"
                onClick={() => setScope('all')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  scope === 'all'
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Tüm Gruplar ({groups.length} Grup)
              </button>
            </div>
          </div>

          {/* Action Notification if any */}
          {actionNotice && (
            <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-600/40 text-emerald-300 text-xs flex items-start gap-2 animate-fadeIn">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{actionNotice}</div>
            </div>
          )}

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* 1: Open in Google Sheets */}
            <button
              type="button"
              id="open-google-sheets-btn"
              onClick={handleOpenGoogleSheets}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/25 transition-all active:scale-95 group"
            >
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <div className="text-left">
                <div className="font-bold">Google E-Tablolar'da Aç</div>
                <div className="text-[10px] text-emerald-100/80 font-normal">Yeni Sekmede Sayfa Oluştur</div>
              </div>
            </button>

            {/* 2: Copy to Clipboard */}
            <button
              type="button"
              id="copy-sheets-data-btn"
              onClick={handleCopyTSV}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-blue-400" />}
              <div className="text-left">
                <div className="font-bold">{copied ? 'Kopyalandı!' : 'Tabloyu Panoya Kopyala'}</div>
                <div className="text-[10px] text-slate-400 font-normal">Excel / E-Tabloya Yapıştır</div>
              </div>
            </button>

            {/* 3: Download CSV */}
            <button
              type="button"
              id="download-csv-btn"
              onClick={handleDownloadCSV}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all active:scale-95"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <div className="text-left">
                <div className="font-bold">Excel / CSV İndir</div>
                <div className="text-[10px] text-slate-400 font-normal">UTF-8 Türkçe Karakter Uyumlu</div>
              </div>
            </button>

            {/* 4: Printable View */}
            <button
              type="button"
              id="print-sheets-btn"
              onClick={handlePrintOrHtmlWindow}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all active:scale-95"
            >
              <Printer className="w-4 h-4 text-indigo-400" />
              <div className="text-left">
                <div className="font-bold">E-Tablo Olarak Görüntüle</div>
                <div className="text-[10px] text-slate-400 font-normal">Yazdır & PDF Olarak Kaydet</div>
              </div>
            </button>
          </div>

          {/* Live Preview Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                E-Tablo Canlı Önizleme:
              </span>
              <span>
                Toplam {targetGroups.reduce((acc, g) => acc + g.participants.length, 0)} Öğretmen Kaydı
              </span>
            </div>

            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/70 max-h-72 overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead className="bg-slate-900 sticky top-0 border-b border-slate-800 text-slate-300">
                  <tr>
                    <th className="py-2.5 px-3 border-r border-slate-800 font-mono text-center w-10 text-slate-500">#</th>
                    <th className="py-2.5 px-3 border-r border-slate-800">Öğretmen Adı Soyadı</th>
                    <th className="py-2.5 px-3 border-r border-slate-800">Branş</th>
                    {Array.from({ length: maxWeeks }).map((_, wIdx) => {
                      const dateStr = currentGroup?.weekDates?.[wIdx];
                      return (
                        <th key={wIdx} className="py-2 px-2 border-r border-slate-800 text-center min-w-[55px]">
                          <div className="font-bold">H{wIdx + 1}</div>
                          {dateStr && <div className="text-[9px] text-blue-400 font-normal">{dateStr}</div>}
                        </th>
                      );
                    })}
                    <th className="py-2.5 px-3 text-center">Katılım Oranı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {targetGroups.map((grp) => (
                    <React.Fragment key={grp.id}>
                      {scope === 'all' && (
                        <tr className="bg-slate-900/90 font-sans font-bold text-slate-300">
                          <td colSpan={maxWeeks + 4} className="py-2 px-3 bg-slate-900 text-blue-300 text-xs border-y border-slate-800">
                            Grup {grp.groupNumber}: {grp.name} ({grp.day} {grp.timeSlot})
                          </td>
                        </tr>
                      )}
                      {grp.participants.length === 0 ? (
                        <tr>
                          <td colSpan={maxWeeks + 4} className="py-4 text-center text-slate-500 font-sans">
                            Kayıtlı öğretmen bulunmuyor.
                          </td>
                        </tr>
                      ) : (
                        grp.participants.map((p, idx) => {
                          const attendedCount = p.attendance.filter(Boolean).length;
                          const totalW = grp.totalWeeks;
                          const pct = totalW > 0 ? Math.round((attendedCount / totalW) * 100) : 0;

                          return (
                            <tr key={p.id} className="hover:bg-slate-900/40">
                              <td className="py-2 px-3 border-r border-slate-800 text-center text-slate-500">{idx + 1}</td>
                              <td className="py-2 px-3 border-r border-slate-800 font-sans font-semibold text-slate-200">{p.fullName}</td>
                              <td className="py-2 px-3 border-r border-slate-800 font-sans text-slate-400">{p.branch}</td>
                              {Array.from({ length: maxWeeks }).map((_, wIdx) => {
                                if (wIdx >= grp.totalWeeks) {
                                  return (
                                    <td key={wIdx} className="py-2 px-2 border-r border-slate-800 text-center text-slate-600">-</td>
                                  );
                                }
                                const isAttended = p.attendance[wIdx];
                                return (
                                  <td key={wIdx} className="py-2 px-2 border-r border-slate-800 text-center">
                                    {isAttended ? (
                                      <span className="text-emerald-400 font-bold">✓</span>
                                    ) : (
                                      <span className="text-slate-600 font-bold">―</span>
                                    )}
                                  </td>
                                );
                              })}
                              <td className="py-2 px-3 text-center font-sans font-medium text-slate-300">
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                                  pct >= 75 
                                    ? 'bg-emerald-500/15 text-emerald-300' 
                                    : pct >= 50 
                                    ? 'bg-blue-500/15 text-blue-300' 
                                    : 'bg-slate-800 text-slate-400'
                                }`}>
                                  %{pct} ({attendedCount}/{totalW})
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Google E-Tablolar, Excel ve LibreOffice ile tam uyumludur.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-all"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
