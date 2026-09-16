import React from 'react';
import { 
  Calendar, 
  BookOpen, 
  CalendarDays, 
  Sun, 
  FileText, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PlanLevel } from '../types';

interface NavigationTabsProps {
  activeTab: PlanLevel;
  onSelectTab: (tab: PlanLevel) => void;
  selectedThemeName?: string;
  selectedSubThemeName?: string;
  selectedDayName?: string;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onSelectTab,
  selectedThemeName,
  selectedSubThemeName,
  selectedDayName,
}) => {
  const tabs = [
    {
      id: 'year' as PlanLevel,
      step: '1',
      title: 'KẾ HOẠCH NĂM',
      desc: 'Thời lượng & Các chủ đề',
      icon: Calendar,
      color: 'sky',
    },
    {
      id: 'theme' as PlanLevel,
      step: '2',
      title: 'KẾ HOẠCH CHỦ ĐỀ',
      desc: selectedThemeName ? selectedThemeName : 'Mạng nội dung & Mạng hoạt động',
      icon: BookOpen,
      color: 'amber',
    },
    {
      id: 'week' as PlanLevel,
      step: '3',
      title: 'KẾ HOẠCH TUẦN',
      desc: selectedSubThemeName ? `Nhánh: ${selectedSubThemeName}` : 'Lịch sinh hoạt 8 thời điểm',
      icon: CalendarDays,
      color: 'emerald',
    },
    {
      id: 'day' as PlanLevel,
      step: '4',
      title: 'KẾ HOẠCH NGÀY',
      desc: selectedDayName ? `Ngày: ${selectedDayName}` : '10 thời điểm & HĐ trọng tâm',
      icon: Sun,
      color: 'orange',
    },
    {
      id: 'lesson' as PlanLevel,
      step: '5',
      title: 'GIÁO ÁN',
      desc: 'Mục tiêu, Chuẩn bị & Tiến trình',
      icon: FileText,
      color: 'purple',
    },
  ];

  return (
    <div className="space-y-3">
      {/* 5 Primary Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`p-3 sm:p-3.5 rounded-2xl border text-left transition relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'bg-white border-sky-500 shadow-md ring-2 ring-sky-400/20'
                  : 'bg-white/80 hover:bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {/* Active top line */}
              {isActive && (
                <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-600" />
              )}

              <div className="flex items-center justify-between w-full mb-1">
                <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                  isActive ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {tab.step}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
              </div>

              <div>
                <span className={`text-xs sm:text-sm font-extrabold block truncate ${
                  isActive ? 'text-slate-900' : 'text-slate-700'
                }`}>
                  {tab.title}
                </span>
                <span className="text-[11px] text-slate-500 block truncate">
                  {tab.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Pedagogical Step Flow Indicator */}
      <div className="bg-sky-50/80 rounded-xl p-2.5 border border-sky-200/70 overflow-x-auto flex items-center gap-2 text-[11px] text-sky-900 font-medium">
        <span className="font-bold text-sky-800 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Tiến trình chuẩn QĐ 388:
        </span>
        <span className="shrink-0 font-semibold">Độ tuổi</span>
        <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
        <span className="shrink-0 font-semibold">YCCĐ</span>
        <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
        <span className="shrink-0 font-semibold">Chủ đề</span>
        <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
        <span className="shrink-0 font-semibold">Mạng nội dung & hoạt động</span>
        <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
        <span className="shrink-0 font-semibold">Kế hoạch tuần</span>
        <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
        <span className="shrink-0 font-semibold">Kế hoạch ngày</span>
        <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
        <span className="shrink-0 font-bold text-indigo-700">Giáo án</span>
      </div>
    </div>
  );
};
