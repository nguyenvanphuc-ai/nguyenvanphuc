import React, { useState } from 'react';
import { 
  Sparkles, 
  Network, 
  Layers, 
  Calendar, 
  ArrowRight, 
  Check, 
  Copy, 
  FileText, 
  Printer, 
  Tag, 
  BookOpen,
  Edit2,
  Save
} from 'lucide-react';
import { LocalAndSchoolInfo, ThemePlan, WeekPlan } from '../types';
import { copyToClipboard, exportToWord, printDocument, generateThemePlanPrintHTML } from '../utils/exportUtils';
import { buildThemePlan } from '../utils/generatorEngine';
import { findYCCDByCode } from '../data/yccdData';
import { safeString } from '../utils/textUtils';

interface ThemePlanViewProps {
  themePlan: ThemePlan;
  schoolInfo: LocalAndSchoolInfo;
  onUpdateThemePlan: (plan: ThemePlan) => void;
  onSelectSubThemeForWeek: (subThemeName: string, weekIndex: number) => void;
  onExportFullWord?: () => void;
}

export const ThemePlanView: React.FC<ThemePlanViewProps> = ({
  themePlan,
  schoolInfo,
  onUpdateThemePlan,
  onSelectSubThemeForWeek,
  onExportFullWord,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalText, setGoalText] = useState(safeString(themePlan.educationalGoal));

  React.useEffect(() => {
    setGoalText(safeString(themePlan.educationalGoal));
  }, [themePlan.educationalGoal]);

  const handleRegenerateAI = async () => {
    setIsGenerating(true);
    try {
      const regenerated = await buildThemePlan(
        themePlan.themeName,
        themePlan.subThemes,
        themePlan.durationWeeks,
        schoolInfo,
        themePlan.selectedYccdCodes
      );
      onUpdateThemePlan(regenerated);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    const text = `KẾ HOẠCH CHỦ ĐỀ: ${themePlan.themeName.toUpperCase()}\nThời lượng: ${themePlan.durationWeeks} tuần\n` +
      `Mục tiêu: ${themePlan.educationalGoal}\n\n` +
      `MÃ YCCĐ TRỌNG TÂM: ${themePlan.selectedYccdCodes.join(', ')}\n\n` +
      `=== MẠNG NỘI DUNG ===\n` +
      themePlan.contentNetwork.map(n => `[${n.title}]\n${n.subContents.map(c => `  • ${c}`).join('\n')}`).join('\n\n') +
      `\n\n=== MẠNG HOẠT ĐỘNG ===\n` +
      themePlan.activityNetwork.map(a => `[${a.activityType}]\n${a.activities.map(act => `  • ${act.name} (${act.yccdCodes.join(', ')})`).join('\n')}`).join('\n\n');

    copyToClipboard(text, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleExportWord = () => {
    if (onExportFullWord) {
      onExportFullWord();
    } else {
      const contentHTML = generateThemePlanPrintHTML(themePlan, schoolInfo);
      exportToWord(`Ke_Hoach_Chu_De_${themePlan.themeName}`, contentHTML);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold uppercase tracking-wider">
              2. Kế hoạch chủ đề
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Thời lượng: {themePlan.durationWeeks} tuần ({themePlan.subThemes.length} nhánh)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            CHỦ ĐỀ: {themePlan.themeName.toUpperCase()}
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Mỗi tuần tương ứng 01 nhánh chủ đề theo Chương trình GDMN mới (QĐ 388/QĐ-BGDĐT)
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleRegenerateAI}
            disabled={isGenerating}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>{isGenerating ? 'AI đang tái tạo mạng...' : 'AI Tái tạo Chủ đề'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1"
            title="Sao chép toàn bộ"
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

      {/* Goal & Selected YCCD Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Educational Goal */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-600" /> Mục tiêu giáo dục của chủ đề
            </h3>
            <button
              onClick={() => {
                if (isEditingGoal) {
                  onUpdateThemePlan({ ...themePlan, educationalGoal: goalText });
                  setIsEditingGoal(false);
                } else {
                  setIsEditingGoal(true);
                }
              }}
              className="text-xs text-sky-600 hover:text-sky-800 font-semibold flex items-center gap-1"
            >
              {isEditingGoal ? <><Save className="w-3.5 h-3.5" /> Lưu</> : <><Edit2 className="w-3.5 h-3.5" /> Sửa mục tiêu</>}
            </button>
          </div>

          {isEditingGoal ? (
            <textarea
              value={goalText}
              onChange={e => setGoalText(e.target.value)}
              rows={3}
              className="w-full p-2.5 text-xs sm:text-sm border border-sky-300 rounded-xl focus:ring-2 focus:ring-sky-500"
            />
          ) : (
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium bg-sky-50/50 p-3 rounded-xl border border-sky-100 whitespace-pre-line">
              {safeString(themePlan.educationalGoal)}
            </p>
          )}

          <div className="pt-2">
            <span className="text-xs font-bold text-slate-600 block mb-1.5">
              Hệ thống YCCĐ trọng tâm được phân bổ:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {themePlan.selectedYccdCodes.map(code => {
                const item = findYCCDByCode(code);
                return (
                  <div
                    key={code}
                    className="group relative inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold cursor-default"
                  >
                    <span>{code}</span>
                    {item && (
                      <span className="text-[10px] font-normal text-emerald-600">
                        ({item.domain})
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Subthemes list (1 week = 1 subtheme) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-600" /> Các nhánh chủ đề (Mỗi tuần 1 nhánh)
          </h3>
          <p className="text-[11px] text-slate-500">
            Bấm chọn 01 nhánh để xem và chỉnh sửa Kế hoạch tuần tương ứng:
          </p>

          <div className="space-y-2">
            {themePlan.subThemes.map((subTheme, idx) => (
              <button
                key={idx}
                onClick={() => onSelectSubThemeForWeek(subTheme, idx + 1)}
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-sky-400 hover:bg-sky-50/60 transition group flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">
                    Tuần {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-sky-900">
                    {subTheme}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Network 1: Mạng Nội Dung (Content Network) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                I. MẠNG NỘI DUNG (Content Network)
              </h3>
              <p className="text-xs text-slate-500">
                Trả lời câu hỏi: <em>&ldquo;Trẻ sẽ tìm hiểu những nội dung gì trong chủ đề này?&rdquo;</em>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themePlan.contentNetwork.map((node, i) => (
            <div 
              key={i} 
              className="p-4 rounded-xl border border-sky-100 bg-gradient-to-b from-sky-50/40 to-white shadow-xs space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <h4 className="text-xs font-bold text-sky-900 line-clamp-1">
                  {safeString(node.title)}
                </h4>
              </div>
              <ul className="space-y-1.5 pl-2 text-xs text-slate-700">
                {node.subContents.map((content, ci) => (
                  <li key={ci} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-sky-500 font-bold">•</span>
                    <span>{safeString(content)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Network 2: Mạng Hoạt Động (Activity Network) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              II. MẠNG HOẠT ĐỘNG (Activity Network)
            </h3>
            <p className="text-xs text-slate-500">
              Trả lời câu hỏi: <em>&ldquo;Trẻ được học, chơi, trải nghiệm bằng những hoạt động nào?&rdquo;</em>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themePlan.activityNetwork.map((group, gi) => (
            <div
              key={gi}
              className="p-4 rounded-xl border border-purple-100 bg-gradient-to-b from-purple-50/30 to-white shadow-xs space-y-3"
            >
              <h4 className="text-xs font-bold text-purple-900 flex items-center gap-2 border-b border-purple-100 pb-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                {safeString(group.activityType)}
              </h4>

              <div className="space-y-2">
                {group.activities.map((act, ai) => (
                  <div key={ai} className="flex items-start justify-between gap-2 text-xs">
                    <span className="text-slate-800 leading-relaxed font-medium">
                      • {safeString(act.name)}
                    </span>
                    <div className="flex gap-1 shrink-0">
                      {act.yccdCodes.map(c => (
                        <span key={c} className="px-1.5 py-0.5 text-[10px] rounded bg-purple-100 text-purple-800 font-bold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
