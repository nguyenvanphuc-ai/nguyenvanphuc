import React, { useState } from 'react';
import { 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Copy, 
  FileText, 
  Printer, 
  Edit3, 
  Save, 
  X,
  Sun,
  Clock
} from 'lucide-react';
import { LocalAndSchoolInfo, WeekPlan, WeekScheduleSlot } from '../types';
import { copyToClipboard, exportToWord, generateWeekPlanPrintHTML, printDocument } from '../utils/exportUtils';
import { generateDefaultWeekPlan } from '../data/presetCurriculum';

interface WeekPlanViewProps {
  weekPlan: WeekPlan;
  schoolInfo: LocalAndSchoolInfo;
  onUpdateWeekPlan: (plan: WeekPlan) => void;
  onSelectDayForDailyPlan: (dayOfWeek: string) => void;
  onExportFullWord?: () => void;
}

export const WeekPlanView: React.FC<WeekPlanViewProps> = ({
  weekPlan,
  schoolInfo,
  onUpdateWeekPlan,
  onSelectDayForDailyPlan,
  onExportFullWord,
}) => {
  const [copied, setCopied] = useState(false);
  const [editingCell, setEditingCell] = useState<{ dayIndex: number; slotIndex: number } | null>(null);
  const [cellEditActivity, setCellEditActivity] = useState('');
  const [cellEditYccd, setCellEditYccd] = useState('');

  // 8 standard periods
  const TIME_SLOT_NAMES = [
    'Đón trẻ',
    'Thể dục sáng',
    'Hoạt động học',
    'Hoạt động ngoài trời',
    'Hoạt động góc',
    'Ăn – ngủ – vệ sinh',
    'Hoạt động chiều',
    'Trả trẻ',
  ];

  const handleCopy = () => {
    let text = `KẾ HOẠCH GIÁO DỤC TUẦN ${weekPlan.weekNumber}\nChủ đề: ${weekPlan.themeName}\nNhánh: ${weekPlan.subThemeName}\nĐộ tuổi: ${weekPlan.ageGroupId}\n\n`;
    weekPlan.days.forEach(day => {
      text += `=== ${day.dayOfWeek} ===\n`;
      day.slots.forEach(slot => {
        text += `• ${slot.timeSlotName}: ${slot.activityName} ${slot.yccdCodes?.length ? `[${slot.yccdCodes.join(', ')}]` : ''}\n`;
      });
      text += '\n';
    });

    copyToClipboard(text, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleExportWord = () => {
    if (onExportFullWord) {
      onExportFullWord();
    } else {
      const html = generateWeekPlanPrintHTML(weekPlan, schoolInfo);
      exportToWord(`Ke_Hoach_Tuan_${weekPlan.weekNumber}_${weekPlan.subThemeName}`, html);
    }
  };

  const handleStartEditCell = (dayIndex: number, slotIndex: number) => {
    const slot = weekPlan.days[dayIndex].slots[slotIndex];
    setEditingCell({ dayIndex, slotIndex });
    setCellEditActivity(slot ? slot.activityName : '');
    setCellEditYccd(slot && slot.yccdCodes ? slot.yccdCodes.join(', ') : '');
  };

  const handleSaveCell = () => {
    if (!editingCell) return;
    const { dayIndex, slotIndex } = editingCell;
    const updatedDays = [...weekPlan.days];
    const targetDay = { ...updatedDays[dayIndex] };
    const targetSlots = [...targetDay.slots];

    targetSlots[slotIndex] = {
      ...targetSlots[slotIndex],
      activityName: cellEditActivity,
      yccdCodes: cellEditYccd.split(',').map(s => s.trim()).filter(Boolean),
    };

    targetDay.slots = targetSlots;
    updatedDays[dayIndex] = targetDay;

    onUpdateWeekPlan({
      ...weekPlan,
      days: updatedDays,
    });
    setEditingCell(null);
  };

  const handleRegenerateStandardSchedule = () => {
    if (confirm('Bạn có muốn nạp lại lịch tuần chuẩn theo chủ đề và nhánh này không?')) {
      const regenerated = generateDefaultWeekPlan(
        weekPlan.themeName,
        weekPlan.subThemeName,
        weekPlan.ageGroupId,
        weekPlan.weekNumber
      );
      onUpdateWeekPlan(regenerated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold uppercase tracking-wider">
              3. Kế hoạch tuần {weekPlan.weekNumber}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Chủ đề lớn: {weekPlan.themeName}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
            NHÁNH CHỦ ĐỀ: {weekPlan.subThemeName.toUpperCase()}
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Lịch 8 thời điểm sinh hoạt trong ngày (Thứ 2 đến Thứ 6) có gắn mã YCCĐ cụ thể
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleRegenerateStandardSchedule}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition flex items-center gap-1.5"
            title="Tạo mới nội dung tuần"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Nạp lại mẫu tuần</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Đã chép' : 'Sao chép'}</span>
          </button>

          <button
            onClick={handleExportWord}
            className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold transition flex items-center gap-1 border border-sky-200"
            title="Tải toàn bộ Kế hoạch từ Năm, Chủ đề, Tuần, Ngày, Giáo án trong 1 file Word"
          >
            <FileText className="w-4 h-4 text-sky-600" />
            <span className="hidden sm:inline">Xuất Word (Trọn bộ)</span>
          </button>

          <button
            onClick={printDocument}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">In</span>
          </button>
        </div>
      </div>

      {/* Week Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs">
                <th className="py-3 px-3 w-36 font-bold text-slate-700 uppercase tracking-wider text-center bg-slate-100/60">
                  Thời điểm / Hoạt động
                </th>
                {weekPlan.days.map((day, dIdx) => (
                  <th key={dIdx} className="py-3 px-3 font-bold text-slate-800 text-center border-l border-slate-200">
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-sm font-extrabold text-sky-800">{day.dayOfWeek}</span>
                      <button
                        onClick={() => onSelectDayForDailyPlan(day.dayOfWeek)}
                        className="px-2 py-0.5 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-700 text-[10px] font-bold transition flex items-center gap-0.5"
                        title="Tạo Kế hoạch ngày cho ngày này"
                      >
                        <span>K.H Ngày</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {TIME_SLOT_NAMES.map((slotName, sIdx) => {
                const isStudySlot = slotName === 'Hoạt động học';
                return (
                  <tr key={sIdx} className={isStudySlot ? 'bg-sky-50/30' : 'hover:bg-slate-50/50'}>
                    <td className={`p-3 font-bold text-center border-r border-slate-200 ${
                      isStudySlot ? 'bg-sky-100/50 text-sky-900 font-extrabold' : 'bg-slate-50 text-slate-700'
                    }`}>
                      <div className="flex flex-col items-center gap-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{slotName}</span>
                      </div>
                    </td>

                    {weekPlan.days.map((day, dIdx) => {
                      const slot = day.slots[sIdx];
                      const isEditing = editingCell?.dayIndex === dIdx && editingCell?.slotIndex === sIdx;

                      if (isEditing) {
                        return (
                          <td key={dIdx} className="p-2 border-r border-slate-200 bg-amber-50">
                            <textarea
                              value={cellEditActivity}
                              onChange={e => setCellEditActivity(e.target.value)}
                              rows={2}
                              className="w-full p-1.5 text-xs border border-amber-300 rounded bg-white font-medium"
                              placeholder="Tên hoạt động..."
                            />
                            <div className="mt-1 flex items-center gap-1">
                              <input
                                type="text"
                                value={cellEditYccd}
                                onChange={e => setCellEditYccd(e.target.value)}
                                placeholder="Mã YCCĐ (TC1, NN...)"
                                className="w-full p-1 text-[11px] border border-amber-300 rounded bg-white"
                              />
                              <button
                                onClick={handleSaveCell}
                                className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                              >
                                <Save className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => setEditingCell(null)}
                                className="p-1 rounded bg-slate-200 text-slate-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        );
                      }

                      return (
                        <td 
                          key={dIdx} 
                          className={`p-3 border-r border-slate-200 align-top group relative ${
                            isStudySlot ? 'bg-sky-50/40 font-semibold' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start gap-1">
                            <span className="text-slate-800 leading-snug">
                              {slot?.activityName || '-'}
                            </span>
                            <button
                              onClick={() => handleStartEditCell(dIdx, sIdx)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-sky-600 transition"
                              title="Sửa ô này"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>

                          {slot?.yccdCodes && slot.yccdCodes.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {slot.yccdCodes.map(code => (
                                <span 
                                  key={code}
                                  className="px-1 py-0.2 text-[9px] font-bold rounded bg-sky-100 text-sky-800"
                                >
                                  {code}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
