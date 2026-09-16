import React, { useState } from 'react';
import { 
  Sun, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Check, 
  Copy, 
  FileText, 
  Printer, 
  Clock, 
  Edit3, 
  Save,
  Award
} from 'lucide-react';
import { DayPlan, LocalAndSchoolInfo } from '../types';
import { copyToClipboard, exportToWord, printDocument, generateDayPlanPrintHTML } from '../utils/exportUtils';

interface DayPlanViewProps {
  dayPlan: DayPlan;
  schoolInfo: LocalAndSchoolInfo;
  onUpdateDayPlan: (plan: DayPlan) => void;
  onCreateLessonPlan: (activityName: string) => void;
  onExportFullWord?: () => void;
}

export const DayPlanView: React.FC<DayPlanViewProps> = ({
  dayPlan,
  schoolInfo,
  onUpdateDayPlan,
  onCreateLessonPlan,
  onExportFullWord,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesText, setNotesText] = useState(dayPlan.teacherNotes);

  const handleCopy = () => {
    let text = `KẾ HOẠCH NGÀY: ${dayPlan.dayOfWeek.toUpperCase()} (${dayPlan.dateStr})\n` +
      `Chủ đề: ${dayPlan.themeName} - Nhánh: ${dayPlan.subThemeName}\n` +
      `Độ tuổi: ${dayPlan.ageGroupId}\n\n` +
      `HOẠT ĐỘNG TRỌNG TÂM: ${dayPlan.mainFocusActivity.name}\n` +
      `Mã YCCĐ: ${dayPlan.mainFocusActivity.yccdCodes.join(', ')}\n` +
      `Mục tiêu: ${dayPlan.mainFocusActivity.objectives}\n\n` +
      `=== 10 THỜI ĐIỂM SINH HOẠT TRONG NGÀY ===\n` +
      dayPlan.schedule.map(s => `${s.period}: ${s.activityName}`).join('\n') +
      `\n\nNhận xét / Lưu ý của cô: ${dayPlan.teacherNotes}`;

    copyToClipboard(text, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleExportWord = () => {
    if (onExportFullWord) {
      onExportFullWord();
    } else {
      const html = generateDayPlanPrintHTML(dayPlan, schoolInfo);
      exportToWord(`Ke_Hoach_Ngay_${dayPlan.dayOfWeek}`, html);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-sky-100 text-sky-800 rounded-lg text-xs font-bold uppercase tracking-wider">
              4. Kế hoạch ngày
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Chủ đề: {dayPlan.themeName} &bull; Nhánh: {dayPlan.subThemeName}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 flex items-center gap-2">
            <Sun className="w-6 h-6 text-amber-500" />
            <span>KẾ HOẠCH NGÀY: {dayPlan.dayOfWeek.toUpperCase()}</span>
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Quy trình 10 thời điểm sinh hoạt và chuẩn bị phát triển giáo án chi tiết
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
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

      {/* Main Focus Activity Highlight Card */}
      <div className="bg-gradient-to-br from-sky-600 via-sky-700 to-indigo-700 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-amber-300 text-xs font-bold border border-white/20">
              <Award className="w-3.5 h-3.5" />
              <span>HOẠT ĐỘNG HỌC / HOẠT ĐỘNG TRỌNG TÂM TRONG NGÀY</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {dayPlan.mainFocusActivity.name}
            </h3>
            <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
              <strong>Mục tiêu cốt lõi:</strong> {dayPlan.mainFocusActivity.objectives}
            </p>
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="text-xs text-sky-200 font-semibold">Mã YCCĐ:</span>
              {dayPlan.mainFocusActivity.yccdCodes.map(code => (
                <span key={code} className="px-2 py-0.5 rounded-md bg-white/20 text-white text-xs font-extrabold">
                  {code}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 pt-2 md:pt-0">
            <button
              id="btn-create-lesson-from-day"
              onClick={() => onCreateLessonPlan(dayPlan.mainFocusActivity.name)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl transition transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>TẠO GIÁO ÁN CHI TIẾT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 10 Standard Time Slots Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-3 p-5">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
          <Clock className="w-4 h-4 text-sky-600" />
          Tiến trình chế độ sinh hoạt trong ngày (10 thời điểm)
        </h3>

        <div className="divide-y divide-slate-100">
          {dayPlan.schedule.map((slot, idx) => {
            const isLearningSlot = slot.period.includes('Hoạt động học') || slot.period.includes('3.');
            return (
              <div 
                key={idx}
                className={`py-3 px-3 rounded-xl transition flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  isLearningSlot ? 'bg-sky-50/70 border border-sky-200' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {slot.period}
                    </span>
                    <span className="text-xs text-slate-700 font-medium">
                      {slot.activityName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center pl-9 sm:pl-0">
                  {slot.yccdCodes.map(code => (
                    <span key={code} className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-700">
                      {code}
                    </span>
                  ))}
                  {isLearningSlot && (
                    <button
                      onClick={() => onCreateLessonPlan(slot.activityName)}
                      className="text-[11px] font-bold text-sky-700 hover:text-sky-900 underline ml-2 shrink-0"
                    >
                      Soạn giáo án &rarr;
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Teacher's Notes */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Ghi chú / Đánh giá trẻ trong ngày của giáo viên
          </h4>
          <button
            onClick={() => {
              if (isEditingNotes) {
                onUpdateDayPlan({ ...dayPlan, teacherNotes: notesText });
                setIsEditingNotes(false);
              } else {
                setIsEditingNotes(true);
              }
            }}
            className="text-xs text-sky-600 font-semibold hover:text-sky-800 flex items-center gap-1"
          >
            {isEditingNotes ? <><Save className="w-3.5 h-3.5" /> Lưu</> : <><Edit3 className="w-3.5 h-3.5" /> Chỉnh sửa</>}
          </button>
        </div>

        {isEditingNotes ? (
          <textarea
            value={notesText}
            onChange={e => setNotesText(e.target.value)}
            rows={2}
            className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500"
          />
        ) : (
          <p className="text-xs sm:text-sm text-slate-800 italic bg-slate-50 p-3 rounded-xl border border-slate-200">
            {dayPlan.teacherNotes || 'Trẻ vui tươi, tham gia đầy đủ các hoạt động.'}
          </p>
        )}
      </div>
    </div>
  );
};
