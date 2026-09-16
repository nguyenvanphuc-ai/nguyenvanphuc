import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  Copy, 
  FileText, 
  Printer, 
  ArrowRight, 
  Check, 
  Calendar,
  Save,
  HelpCircle,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import { LocalAndSchoolInfo, YearPlan, YearPlanThemeRow } from '../types';
import { copyToClipboard, exportToWord, generateYearPlanPrintHTML, printDocument } from '../utils/exportUtils';
import { buildYearPlan } from '../utils/generatorEngine';
import { STANDARD_YEAR_PRESETS } from '../data/presetCurriculum';
import { DOMAINS } from '../data/yccdData';
import { safeString } from '../utils/textUtils';

interface YearPlanViewProps {
  yearPlan: YearPlan;
  schoolInfo: LocalAndSchoolInfo;
  onUpdateYearPlan: (plan: YearPlan) => void;
  onSelectThemeForDeepPlan: (theme: YearPlanThemeRow) => void;
  onExportFullWord?: () => void;
}

export const YearPlanView: React.FC<YearPlanViewProps> = ({
  yearPlan,
  schoolInfo,
  onUpdateYearPlan,
  onSelectThemeForDeepPlan,
  onExportFullWord,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editingThemeId, setEditingThemeId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<YearPlanThemeRow | null>(null);

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      const newPlan = await buildYearPlan(schoolInfo);
      onUpdateYearPlan(newPlan);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    const text = `KẾ HOẠCH GIÁO DỤC NĂM HỌC ${schoolInfo.schoolYear}\nTrường: ${schoolInfo.schoolName}\nĐộ tuổi: ${schoolInfo.ageGroupId}\n\n` +
      yearPlan.themes.map((t, idx) => 
        `Chủ đề ${idx + 1}: ${t.themeName} (${t.durationWeeks} tuần: Tuần ${t.startWeek} - ${t.endWeek})\n` +
        `Nhánh chủ đề:\n${t.subThemes.map((st, i) => `  - Tuần ${i + 1}: ${st}`).join('\n')}\n` +
        `Mã YCCĐ trọng tâm: ${t.focusYccdCodes.join(', ')}\n` +
        `Nội dung: ${safeString(t.educationalContent)}\n` +
        `Hoạt động: ${safeString(t.expectedActivities)}\n`
      ).join('\n---\n');

    copyToClipboard(text, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleExportWord = () => {
    if (onExportFullWord) {
      onExportFullWord();
    } else {
      const html = generateYearPlanPrintHTML(yearPlan, schoolInfo);
      exportToWord(`Ke_Hoach_Nam_${schoolInfo.className || 'GDMN'}_QĐ388`, html);
    }
  };

  const handleStartEdit = (theme: YearPlanThemeRow) => {
    setEditingThemeId(theme.id);
    setEditFormData({ 
      ...theme,
      educationalContent: safeString(theme.educationalContent),
      expectedActivities: safeString(theme.expectedActivities),
    });
  };

  const handleSaveEdit = () => {
    if (!editFormData) return;
    const updatedThemes = yearPlan.themes.map(t => t.id === editFormData.id ? editFormData : t);
    onUpdateYearPlan({
      ...yearPlan,
      themes: updatedThemes,
      updatedAt: new Date().toLocaleDateString('vi-VN'),
    });
    setEditingThemeId(null);
    setEditFormData(null);
  };

  const handleDeleteTheme = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa chủ đề này khỏi kế hoạch năm?')) {
      const updatedThemes = yearPlan.themes.filter(t => t.id !== id);
      onUpdateYearPlan({ ...yearPlan, themes: updatedThemes });
    }
  };

  const totalWeeks = yearPlan.themes.reduce((sum, t) => sum + (Number(t.durationWeeks) || 0), 0);

  const handleResetToStandard35Weeks = () => {
    if (confirm('Khôi phục lại Kế hoạch năm chuẩn trọn vẹn 35 tuần thực học (bao gồm Chủ đề Quê hương - Đất Nước - Bác Hồ)?')) {
      const presets = STANDARD_YEAR_PRESETS[schoolInfo.ageGroupId] || STANDARD_YEAR_PRESETS['mau-giao-5-6'];
      onUpdateYearPlan({
        ...yearPlan,
        themes: presets,
        updatedAt: new Date().toLocaleDateString('vi-VN'),
      });
    }
  };

  const handleAddEmptyTheme = () => {
    const nextOrder = yearPlan.themes.length + 1;
    const lastTheme = yearPlan.themes[yearPlan.themes.length - 1];
    const startWeek = lastTheme ? lastTheme.endWeek + 1 : 1;
    const newTheme: YearPlanThemeRow = {
      id: `theme-custom-${Date.now()}`,
      order: nextOrder,
      themeName: `Chủ đề mới ${nextOrder}`,
      durationWeeks: 3,
      startWeek,
      endWeek: startWeek + 2,
      subThemes: ['Nhánh 1: Bé tìm hiểu', 'Nhánh 2: Bé khám phá', 'Nhánh 3: Bé trải nghiệm'],
      focusYccdCodes: ['TC1', 'TX1', 'NN1'],
      educationalContent: 'Giáo viên điều chỉnh nội dung theo thực tế trường lớp.',
      expectedActivities: 'Hoạt động trải nghiệm sáng tạo phù hợp lứa tuổi.',
    };
    onUpdateYearPlan({
      ...yearPlan,
      themes: [...yearPlan.themes, newTheme],
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions Bar */}
      <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-sky-100 text-sky-800 rounded-lg text-xs font-bold uppercase tracking-wider">
              1. Kế hoạch năm học
            </span>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
              totalWeeks === 35 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                : 'bg-amber-100 text-amber-800 border border-amber-200'
            }`}>
              <Check className="w-3.5 h-3.5" />
              {totalWeeks === 35 ? 'Trọn vẹn 35 tuần thực học' : `Tổng ${totalWeeks}/35 tuần`}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Cập nhật: {yearPlan.updatedAt}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
            KẾ HOẠCH GIÁO DỤC NĂM HỌC {schoolInfo.schoolYear}
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Lớp: <strong>{schoolInfo.className}</strong> • Trường: <strong>{schoolInfo.schoolName}</strong> • {schoolInfo.commune}, {schoolInfo.province}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-generate-year-ai"
            onClick={handleGenerateAI}
            disabled={isGenerating}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: isGenerating ? '1s' : '0s' }} />
            <span>{isGenerating ? 'AI đang phân tích & xây dựng...' : 'AI Xây dựng Kế hoạch năm'}</span>
          </button>

          <button
            onClick={handleAddEmptyTheme}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition flex items-center gap-1.5"
            title="Thêm chủ đề mới"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Thêm chủ đề</span>
          </button>

          <button
            onClick={handleResetToStandard35Weeks}
            className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-semibold text-xs sm:text-sm transition flex items-center gap-1.5"
            title="Khôi phục lại khung chuẩn 35 tuần trọn vẹn (có Chủ đề Quê hương - Đất Nước - Bác Hồ)"
          >
            <RotateCcw className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Khôi phục 35 tuần chuẩn</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1"
            title="Sao chép toàn bộ kế hoạch năm"
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
            title="In hoặc lưu file PDF"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">In / PDF</span>
          </button>
        </div>
      </div>

      {/* Guidance Note on Homeland theme */}
      <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-3.5 flex items-start gap-3">
        <div className="p-1 rounded-md bg-sky-600 text-white shrink-0 mt-0.5">
          <Calendar className="w-3.5 h-3.5" />
        </div>
        <div className="text-xs text-sky-900 leading-relaxed">
          <strong>Quy tắc QĐ 388:</strong> Trong Kế hoạch năm luôn có chủ đề trọng tâm <strong>&ldquo;QUÊ HƯƠNG – ĐẤT NƯỚC – BÁC HỒ KÍNH YÊU&rdquo;</strong> ở mọi độ tuổi và tự động tích hợp thông tin địa phương hiện hành sau sáp nhập ({schoolInfo.commune}, {schoolInfo.province}). Bấm <strong>&ldquo;Xem Kế hoạch chủ đề&rdquo;</strong> để phát triển chi tiết Mạng nội dung, Mạng hoạt động và Kế hoạch từng tuần.
        </div>
      </div>

      {/* Themes Table / Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-3 w-12 text-center">STT</th>
                <th className="py-3 px-4 w-48">Chủ đề</th>
                <th className="py-3 px-4 w-52">Nhánh chủ đề (Mỗi tuần 1 nhánh)</th>
                <th className="py-3 px-3 w-28 text-center">Thời gian</th>
                <th className="py-3 px-4 w-36">YCCĐ trọng tâm</th>
                <th className="py-3 px-4 min-w-[200px]">Nội dung giáo dục</th>
                <th className="py-3 px-4 w-36 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {yearPlan.themes.map((theme, index) => {
                const isEditing = editingThemeId === theme.id;
                const isHomeland = theme.themeName.includes('QUÊ HƯƠNG') || theme.themeName.includes('Quê hương');

                if (isEditing && editFormData) {
                  return (
                    <tr key={theme.id} className="bg-amber-50/50">
                      <td className="p-3 text-center font-bold text-slate-500">{index + 1}</td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={editFormData.themeName}
                          onChange={e => setEditFormData({ ...editFormData, themeName: e.target.value })}
                          className="w-full p-1.5 text-xs font-bold border border-amber-300 rounded bg-white"
                        />
                      </td>
                      <td className="p-2">
                        <textarea
                          value={editFormData.subThemes.join('\n')}
                          onChange={e => setEditFormData({ ...editFormData, subThemes: e.target.value.split('\n').filter(s => s.trim()) })}
                          rows={3}
                          placeholder="Mỗi dòng 1 nhánh"
                          className="w-full p-1.5 text-xs border border-amber-300 rounded bg-white"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="number"
                            value={editFormData.durationWeeks}
                            onChange={e => setEditFormData({ ...editFormData, durationWeeks: Number(e.target.value) })}
                            className="w-14 p-1 text-xs text-center border border-amber-300 rounded bg-white"
                          />
                          <span>tuần</span>
                        </div>
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={editFormData.focusYccdCodes.join(', ')}
                          onChange={e => setEditFormData({ ...editFormData, focusYccdCodes: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                          placeholder="TC1, TX1.1..."
                          className="w-full p-1.5 text-xs border border-amber-300 rounded bg-white"
                        />
                      </td>
                      <td className="p-2">
                        <textarea
                          value={editFormData.educationalContent}
                          onChange={e => setEditFormData({ ...editFormData, educationalContent: e.target.value })}
                          rows={3}
                          className="w-full p-1.5 text-xs border border-amber-300 rounded bg-white"
                        />
                      </td>
                      <td className="p-2 text-center space-x-1">
                        <button
                          onClick={handleSaveEdit}
                          className="p-1.5 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                          title="Lưu thay đổi"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingThemeId(null)}
                          className="p-1.5 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
                          title="Hủy"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr 
                    key={theme.id}
                    className={`hover:bg-sky-50/40 transition ${
                      isHomeland ? 'bg-amber-50/20' : ''
                    }`}
                  >
                    <td className="py-3 px-3 text-center font-bold text-slate-500">
                      {index + 1}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800 flex items-center gap-1.5">
                        {theme.themeName}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <ul className="space-y-1 text-[11px] text-slate-600">
                        {theme.subThemes.map((st, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="font-semibold text-sky-700 shrink-0">T{i + 1}:</span>
                            <span className="leading-tight">{st}</span>
                          </li>
                        ))}
                      </ul>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className="font-semibold text-slate-800">{theme.durationWeeks} tuần</span>
                      <div className="text-[11px] text-slate-500">
                        Tuần {theme.startWeek} - {theme.endWeek}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {theme.focusYccdCodes.map(code => (
                          <span 
                            key={code} 
                            className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-sky-100 text-sky-800 border border-sky-200"
                          >
                            {code}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-700 text-[11px] leading-relaxed whitespace-pre-line">
                      {safeString(theme.educationalContent)}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onSelectThemeForDeepPlan(theme)}
                          className="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] transition shadow-xs flex items-center gap-1"
                          title="Phát triển sang Kế hoạch chủ đề"
                        >
                          <span>K.H Chủ đề</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleStartEdit(theme)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition"
                          title="Sửa chủ đề này"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTheme(theme.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
                          title="Xóa chủ đề này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 border-t-2 border-slate-300 text-xs font-bold text-slate-800">
                <td colSpan={3} className="py-3 px-4 text-right uppercase tracking-wider text-slate-700">
                  Tổng thời lượng năm học:
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                    totalWeeks === 35 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {totalWeeks} tuần
                  </span>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                    (HK I: 18 tuần • HK II: 17 tuần)
                  </div>
                </td>
                <td colSpan={3} className="py-3 px-4 text-xs font-medium text-slate-600">
                  {totalWeeks === 35 ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Phân bổ trọn vẹn 35 tuần thực học theo Quyết định 388/QĐ-BGDĐT
                    </span>
                  ) : (
                    <span className="text-amber-700 font-medium">
                      Hiện tại đang có {totalWeeks} tuần. Bấm &quot;Khôi phục 35 tuần chuẩn&quot; để thiết lập đủ 35 tuần theo quy định.
                    </span>
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* AI Review & Disclaimer Box */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
        <div className="p-1.5 rounded-lg bg-amber-600 text-white shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="space-y-1 text-xs leading-relaxed">
          <h4 className="font-bold text-amber-950 uppercase tracking-wide">
            Lưu ý kiểm tra nội dung & Miễn trừ trách nhiệm pháp lý:
          </h4>
          <p className="text-amber-900">
            Kế hoạch và các nội dung do Trí tuệ nhân tạo (AI) hỗ trợ xây dựng mang tính chất tham khảo chuyên môn. Do AI có thể phát sinh sai sót, nhầm lẫn hoặc chưa hoàn toàn sát với thực tế địa phương, giáo viên và nhà trường bắt buộc phải kiểm tra kỹ lưỡng, đối chiếu với Chương trình GDMN và điều kiện thực tế của đơn vị trước khi áp dụng hoặc phê duyệt ban hành. Tác giả và ứng dụng miễn trừ toàn bộ trách nhiệm pháp lý liên quan đến các sai sót do AI tạo ra.
          </p>
        </div>
      </div>
    </div>
  );
};
