import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  MapPin, 
  School, 
  PhoneCall, 
  Database, 
  ChevronDown,
  FileDown
} from 'lucide-react';
import { AgeGroupId, LocalAndSchoolInfo } from '../types';
import { AGE_GROUPS_LIST } from '../data/yccdData';

interface HeaderProps {
  schoolInfo: LocalAndSchoolInfo;
  onUpdateSchoolInfo: (info: LocalAndSchoolInfo) => void;
  onOpenLocalModal: () => void;
  onOpenYccdModal: () => void;
  onExportFullWord?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  schoolInfo,
  onUpdateSchoolInfo,
  onOpenLocalModal,
  onOpenYccdModal,
  onExportFullWord,
}) => {
  const currentAge = AGE_GROUPS_LIST.find(a => a.id === schoolInfo.ageGroupId) || AGE_GROUPS_LIST[4];

  const handleAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateSchoolInfo({
      ...schoolInfo,
      ageGroupId: e.target.value as AgeGroupId,
    });
  };

  return (
    <header className="bg-gradient-to-r from-sky-600 via-sky-700 to-indigo-700 text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {/* Brand & App Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur border border-white/25 flex items-center justify-center shadow-inner shrink-0">
              <BookOpen className="w-6 h-6 text-sky-100" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  KẾ HOẠCH GIÁO DỤC MẦM NON MỚI
                </h1>
                <span className="text-xs bg-sky-500/40 text-sky-100 border border-sky-300/40 px-2 py-0.5 rounded-full font-medium">
                  QĐ 388/QĐ-BGDĐT
                </span>
              </div>
              <p className="text-xs text-sky-100/90 flex items-center gap-2">
                <span>Tác giả: <strong>Nguyễn Văn Phúc</strong></span>
                <span>•</span>
                <a 
                  href="https://zalo.me/0949379531" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:underline text-amber-200 font-semibold"
                >
                  <PhoneCall className="w-3 h-3" /> Zalo: 0949.379.531
                </a>
              </p>
            </div>
          </div>

          {/* Controls: Age group selector + School/Local Badge + Bank */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Age Group Selector */}
            <div className="relative flex-1 sm:flex-initial">
              <label htmlFor="age-selector" className="sr-only">Chọn độ tuổi</label>
              <div className="flex items-center bg-white text-slate-800 rounded-lg border border-sky-200 shadow-sm px-3 py-1.5 text-xs font-semibold">
                <span className="text-sky-700 font-bold mr-1.5">👶 Độ tuổi:</span>
                <select
                  id="age-selector"
                  value={schoolInfo.ageGroupId}
                  onChange={handleAgeChange}
                  className="bg-transparent text-xs font-bold text-sky-900 focus:outline-none cursor-pointer pr-4"
                >
                  {AGE_GROUPS_LIST.map(age => (
                    <option key={age.id} value={age.id} className="text-slate-800 font-medium">
                      {age.label} ({age.category})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 -ml-3 pointer-events-none" />
              </div>
            </div>

            {/* School & Post-merger location button */}
            <button
              id="btn-open-school-info"
              onClick={onOpenLocalModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-medium transition text-white"
              title="Cập nhật thông tin trường và địa phương sau sáp nhập"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span className="truncate max-w-[150px] sm:max-w-[200px]">
                {schoolInfo.commune ? `${schoolInfo.commune} (${schoolInfo.province})` : 'Thông tin địa phương'}
              </span>
            </button>

            {/* YCCD Database bank button */}
            <button
              id="btn-open-yccd-bank"
              onClick={onOpenYccdModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/30 hover:bg-emerald-500/40 border border-emerald-300/40 text-xs font-semibold text-emerald-100 transition shadow-sm"
              title="Tra cứu ngân hàng Yêu cầu cần đạt 5 lĩnh vực chuẩn QĐ 388"
            >
              <Database className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline">Ngân hàng YCCĐ</span>
            </button>

            {/* Export All Plans to 1 Word file */}
            {onExportFullWord && (
              <button
                id="btn-export-full-word"
                onClick={onExportFullWord}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs shadow-md transition transform active:scale-95"
                title="Tải toàn bộ Kế hoạch năm, chủ đề, tuần, ngày và giáo án vào 1 file Word duy nhất"
              >
                <FileDown className="w-3.5 h-3.5 text-slate-900" />
                <span>TẢI TOÀN BỘ (WORD)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
