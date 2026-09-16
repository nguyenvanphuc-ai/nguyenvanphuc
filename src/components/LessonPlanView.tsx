import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Copy, 
  FileText, 
  Printer, 
  BookOpen, 
  Clock, 
  Tag, 
  Layers, 
  Award,
  Flame,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { DayPlan, LessonPlan, LocalAndSchoolInfo } from '../types';
import { copyToClipboard, exportToWord, generateLessonPlanPrintHTML, printDocument } from '../utils/exportUtils';
import { buildLessonPlan } from '../utils/generatorEngine';

interface LessonPlanViewProps {
  lessonPlan: LessonPlan | null;
  dayPlan: DayPlan;
  schoolInfo: LocalAndSchoolInfo;
  onUpdateLessonPlan: (plan: LessonPlan) => void;
  onExportFullWord?: () => void;
}

export const LessonPlanView: React.FC<LessonPlanViewProps> = ({
  lessonPlan,
  dayPlan,
  schoolInfo,
  onUpdateLessonPlan,
  onExportFullWord,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [useSteam, setUseSteam] = useState(lessonPlan?.isSteam || schoolInfo.hasSteamFacility);

  const handleGenerate = async (steamMode: boolean) => {
    setIsGenerating(true);
    try {
      const newPlan = await buildLessonPlan(
        dayPlan, 
        { ...schoolInfo, hasSteamFacility: steamMode },
        lessonPlan?.activityName || dayPlan.mainFocusActivity.name
      );
      onUpdateLessonPlan(newPlan);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!lessonPlan) return;
    let text = `GIÁO ÁN: ${lessonPlan.activityName.toUpperCase()}\n` +
      `Chủ đề: ${lessonPlan.themeName} - Nhánh: ${lessonPlan.subThemeName}\n` +
      `Độ tuổi: ${lessonPlan.ageGroupId} - Thời lượng: ${lessonPlan.durationMinutes} phút\n\n` +
      `I. MỤC TIÊU & YCCĐ:\n` +
      `- Kiến thức: ${lessonPlan.objectives.knowledge.join('; ')}\n` +
      `- Kỹ năng: ${lessonPlan.objectives.skills.join('; ')}\n` +
      `- Thái độ: ${lessonPlan.objectives.attitude.join('; ')}\n` +
      `- Mã YCCĐ: ${lessonPlan.objectives.yccdItems.map(y => `${y.code} (${y.domain}): ${y.content}`).join('; ')}\n\n` +
      `II. CHUẨN BỊ:\n` +
      `- Đồ dùng của cô: ${lessonPlan.preparations.teacher.join('; ')}\n` +
      `- Đồ dùng của trẻ: ${lessonPlan.preparations.children.join('; ')}\n` +
      `- Môi trường: ${lessonPlan.preparations.environment.join('; ')}\n\n` +
      `III. TIẾN TRÌNH HOẠT ĐỘNG:\n` +
      lessonPlan.procedure.map(step => 
        `[${step.stepName}]\n` +
        `* Cô: ${step.teacherAction.join('\n* ')}\n` +
        `* Trẻ: ${step.childrenAction.join('\n* ')}\n` +
        (step.suggestedQuestions.length ? `* Câu hỏi gợi mở: ${step.suggestedQuestions.join('; ')}\n` : '')
      ).join('\n') +
      `\n\nIV. ĐÁNH GIÁ: ${lessonPlan.evaluation}`;

    copyToClipboard(text, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleExportWord = () => {
    if (onExportFullWord) {
      onExportFullWord();
    } else if (lessonPlan) {
      const html = generateLessonPlanPrintHTML(lessonPlan, schoolInfo);
      exportToWord(`Giao_An_${lessonPlan.activityName.replace(/\s+/g, '_')}`, html);
    }
  };

  if (!lessonPlan) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-slate-200 shadow-sm text-center space-y-4 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto">
          <BookOpen className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">
          Chưa có Giáo án chi tiết
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Bạn đang chọn hoạt động trọng tâm: <strong className="text-sky-800">&ldquo;{dayPlan.mainFocusActivity.name}&rdquo;</strong> của ngày <strong>{dayPlan.dayOfWeek}</strong>. Bấm nút dưới đây để AI tự động thiết kế giáo án đầy đủ mục tiêu, chuẩn bị và tiến trình cô - trẻ theo QĐ 388.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => handleGenerate(false)}
            disabled={isGenerating}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{isGenerating ? 'AI đang soạn giáo án...' : 'Soạn Giáo án Tiêu chuẩn'}</span>
          </button>

          <button
            onClick={() => handleGenerate(true)}
            disabled={isGenerating}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Soạn theo mô hình STEAM (5E/EDP)</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-bold uppercase tracking-wider">
              5. Giáo án hoạt động giáo dục
            </span>
            {lessonPlan.isSteam && (
              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 rounded-full text-xs font-bold flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-600" />
                <span>Mô hình: {lessonPlan.steamModel || 'STEAM'}</span>
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {lessonPlan.activityName.toUpperCase()}
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Lớp: {schoolInfo.className} • Thời lượng: {lessonPlan.durationMinutes} phút • Chủ đề: {lessonPlan.themeName}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleGenerate(!lessonPlan.isSteam)}
            disabled={isGenerating}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
            title="Đổi phong cách giáo án"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lessonPlan.isSteam ? 'Chuyển sang mẫu chuẩn' : 'Chuyển sang STEAM (5E)'}</span>
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
            <span className="hidden sm:inline">In / PDF</span>
          </button>
        </div>
      </div>

      {/* Objectives & YCCD Requirements */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
          <Award className="w-4 h-4 text-sky-600" />
          1. Mục tiêu và Yêu cầu cần đạt (Chuẩn QĐ 388)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100 space-y-1.5">
            <h4 className="text-xs font-bold text-sky-900 flex items-center gap-1">
              <span>a. Kiến thức</span>
            </h4>
            <ul className="space-y-1 text-xs text-slate-700">
              {lessonPlan.objectives.knowledge.map((k, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-sky-600 font-bold">•</span>
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1.5">
            <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1">
              <span>b. Kỹ năng</span>
            </h4>
            <ul className="space-y-1 text-xs text-slate-700">
              {lessonPlan.objectives.skills.map((s, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100 space-y-1.5">
            <h4 className="text-xs font-bold text-purple-900 flex items-center gap-1">
              <span>c. Thái độ</span>
            </h4>
            <ul className="space-y-1 text-xs text-slate-700">
              {lessonPlan.objectives.attitude.map((a, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trích xuất mã YCCĐ */}
        <div className="pt-2">
          <span className="text-xs font-bold text-slate-700 block mb-2">
            Mã YCCĐ được tích hợp cụ thể trong bài dạy:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {lessonPlan.objectives.yccdItems.map((yccd, idx) => (
              <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-sky-600 text-white font-extrabold text-[11px] shrink-0">
                  {yccd.code}
                </span>
                <div className="text-xs">
                  <span className="font-bold text-slate-800 block">{yccd.domain}:</span>
                  <span className="text-slate-600 leading-snug">{yccd.content}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preparations */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
          <Layers className="w-4 h-4 text-sky-600" />
          2. Chuẩn bị đồ dùng và môi trường
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
          <div className="space-y-1">
            <strong className="text-slate-900 block">Đồ dùng của cô:</strong>
            <ul className="space-y-1 pl-1">
              {lessonPlan.preparations.teacher.map((t, i) => (
                <li key={i}>• {t}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-1">
            <strong className="text-slate-900 block">Đồ dùng của trẻ:</strong>
            <ul className="space-y-1 pl-1">
              {lessonPlan.preparations.children.map((c, i) => (
                <li key={i}>• {c}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-1">
            <strong className="text-slate-900 block">Môi trường hoạt động:</strong>
            <ul className="space-y-1 pl-1">
              {lessonPlan.preparations.environment.map((e, i) => (
                <li key={i}>• {e}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Procedure Steps Table */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
          <Clock className="w-4 h-4 text-sky-600" />
          3. Tiến trình tổ chức hoạt động giáo dục
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold">
                <th className="p-3 w-1/4 border border-slate-200">Các bước thực hiện</th>
                <th className="p-3 w-5/12 border border-slate-200">Hoạt động của cô (kèm câu hỏi gợi mở)</th>
                <th className="p-3 w-4/12 border border-slate-200">Hoạt động của trẻ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {lessonPlan.procedure.map((step, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="p-3 border border-slate-200 align-top font-bold text-sky-900 bg-sky-50/30">
                    {step.stepName}
                  </td>
                  <td className="p-3 border border-slate-200 align-top space-y-2 text-slate-800">
                    <ul className="space-y-1">
                      {step.teacherAction.map((act, ai) => (
                        <li key={ai} className="leading-relaxed">• {act}</li>
                      ))}
                    </ul>
                    {step.suggestedQuestions && step.suggestedQuestions.length > 0 && (
                      <div className="p-2 rounded bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900">
                        <strong>* Câu hỏi gợi mở:</strong>
                        <ul className="list-disc pl-3.5 space-y-0.5 mt-0.5">
                          {step.suggestedQuestions.map((q, qi) => (
                            <li key={qi}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </td>
                  <td className="p-3 border border-slate-200 align-top text-slate-800">
                    <ul className="space-y-1">
                      {step.childrenAction.map((act, ai) => (
                        <li key={ai} className="leading-relaxed">• {act}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reflection / Evaluation */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          4. Đánh giá sau hoạt động
        </h4>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
          {lessonPlan.evaluation || 'Trẻ hứng thú, tích cực trải nghiệm và đạt yêu cầu cần đạt đề ra.'}
        </p>
      </div>
    </div>
  );
};
