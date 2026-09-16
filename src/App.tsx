/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LocalAndSchoolInfo, 
  PlanLevel, 
  YearPlan, 
  ThemePlan, 
  WeekPlan, 
  DayPlan, 
  LessonPlan, 
  YCCDItem,
  YearPlanThemeRow
} from './types';
import { INITIAL_YCCD_DATABASE } from './data/yccdData';
import { STANDARD_YEAR_PRESETS, generateDefaultWeekPlan } from './data/presetCurriculum';
import { 
  buildYearPlan, 
  buildThemePlan, 
  buildDayPlanFromWeek, 
  buildLessonPlan,
  buildDefaultLessonPlan 
} from './utils/generatorEngine';
import { exportFullPlanToWord } from './utils/exportUtils';
import { 
  sanitizeYearPlan, 
  sanitizeThemePlan, 
  sanitizeWeekPlan, 
  sanitizeDayPlan, 
  sanitizeLessonPlan 
} from './utils/textUtils';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NavigationTabs } from './components/NavigationTabs';
import { YearPlanView } from './components/YearPlanView';
import { ThemePlanView } from './components/ThemePlanView';
import { WeekPlanView } from './components/WeekPlanView';
import { DayPlanView } from './components/DayPlanView';
import { LessonPlanView } from './components/LessonPlanView';
import { LocalInfoModal } from './components/LocalInfoModal';
import { YCCDBankModal } from './components/YCCDBankModal';
import { MapPin, School, Edit, Sparkles } from 'lucide-react';

const STORAGE_KEY_PREFIX = 'gdmn_app_v1_';

export default function App() {
  // 1. School & Local Information State
  const [schoolInfo, setSchoolInfo] = useState<LocalAndSchoolInfo>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}school_info`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      schoolYear: '2025 - 2026',
      schoolName: 'Trường Mầm non Hoa Sen',
      className: 'Lớp Mẫu giáo Lớn A1 (5-6 tuổi)',
      ageGroupId: 'mau-giao-5-6',
      childrenCount: 30,
      teacherName: 'Nguyễn Văn Phúc',
      province: 'Tỉnh Nghệ An',
      commune: 'Xã Nam Hoa (đơn vị mới sau sáp nhập)',
      historicalName: 'Xã Nam Cường và Xã Nam Trung cũ',
      localFeatures: 'Làng nghề làm gốm và đan lát truyền thống; Di tích lịch sử văn hóa cấp quốc gia; Cảnh sắc non nước hữu tình; Hội làng tháng Giêng.',
      schoolFeatures: 'Khuôn viên xanh, vườn hoa trải nghiệm của bé, phòng giáo dục thể chất và góc trải nghiệm mở.',
      programDurationWeeks: 35,
      hasSteamFacility: true,
    };
  });

  // 2. YCCD Bank State
  const [yccdList, setYccdList] = useState<YCCDItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}yccd_bank`);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_YCCD_DATABASE;
  });

  // 3. Navigation State
  const [activeTab, setActiveTab] = useState<PlanLevel>('year');

  // 4. Curriculum Hierarchy States
  const [yearPlan, setYearPlan] = useState<YearPlan>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}year_plan`);
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        const sanitized = sanitizeYearPlan(parsed);
        const totalW = sanitized.themes.reduce((sum, t) => sum + (Number(t.durationWeeks) || 0), 0);
        const hasHomeland = sanitized.themes.some(t => 
          (t.themeName || '').toUpperCase().includes('QUÊ HƯƠNG') || (t.themeName || '').toUpperCase().includes('BÁC HỒ')
        );
        // If saved data is already fully 35 weeks with Homeland theme, preserve it
        if (totalW === 35 && hasHomeland) {
          return sanitized;
        }
      } catch (e) {}
    }
    const presets = STANDARD_YEAR_PRESETS['mau-giao-5-6'];
    return sanitizeYearPlan({
      id: 'year-plan-init',
      title: 'Kế hoạch Giáo dục Năm học 2025 - 2026',
      academicYear: '2025 - 2026',
      ageGroupId: 'mau-giao-5-6',
      themes: presets,
      generalObjectives: 'Thực hiện chương trình GDMN mới theo Quyết định 388/QĐ-BGDĐT lấy trẻ làm trung tâm, trọn vẹn 35 tuần thực học trong năm.',
      notes: 'Linh hoạt điều chỉnh theo điều kiện nhà trường và địa phương sau sáp nhập.',
      updatedAt: new Date().toLocaleDateString('vi-VN'),
    });
  });

  const [themePlan, setThemePlan] = useState<ThemePlan>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}theme_plan`);
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        return sanitizeThemePlan(parsed);
      } catch (e) {}
    }
    const firstTheme = STANDARD_YEAR_PRESETS['mau-giao-5-6'][0];
    return sanitizeThemePlan({
      id: 'theme-plan-init',
      themeName: firstTheme.themeName,
      durationWeeks: firstTheme.durationWeeks,
      ageGroupId: 'mau-giao-5-6',
      educationalGoal: 'Trẻ vui vẻ thích thú đến trường, biết tên cô giáo, bạn bè, quy định của lớp học mầm non và giữ gìn đồ chơi.',
      selectedYccdCodes: firstTheme.focusYccdCodes,
      contentNetwork: firstTheme.subThemes.map((st, i) => ({
        title: `Nhánh ${i + 1}: ${st}`,
        subContents: [
          `Khám phá đặc điểm nổi bật của ${st}`,
          'Luyện tập các thói quen nề nếp, vệ sinh và tự phục vụ',
          'Giao tiếp lễ phép, hòa đồng với bạn bè và cô giáo',
        ],
      })),
      activityNetwork: [
        {
          activityType: 'Khám phá Khoa học & Xã hội',
          activities: [
            { name: 'Tham quan các phòng ban trong trường mầm non', yccdCodes: ['NT1', 'TX1'] },
            { name: 'Trò chuyện về đồ chơi trong lớp học của bé', yccdCodes: ['NT1.2'] },
          ],
        },
        {
          activityType: 'Làm quen Văn học & Ngôn ngữ',
          activities: [
            { name: 'Thơ: "Bé đến trường"', yccdCodes: ['NN1', 'NN1.1'] },
            { name: 'Kể chuyện: "Món quà của cô giáo"', yccdCodes: ['NN1.2'] },
          ],
        },
        {
          activityType: 'Giáo dục Thể chất',
          activities: [
            { name: 'Bật liên tục qua các ô - TCDG: Kéo co', yccdCodes: ['TC1', 'TC1.1'] },
          ],
        },
        {
          activityType: 'Giáo dục Nghệ thuật & STEAM',
          activities: [
            { name: 'Hát và vận động: "Cháu đi mẫu giáo"', yccdCodes: ['NgT1'] },
            { name: 'Tạo hình / STEAM: Thiết kế hộp đựng bút từ vật liệu tái chế', yccdCodes: ['NgT1.1', 'TC1.2'] },
          ],
        },
      ],
      subThemes: firstTheme.subThemes,
      createdAt: new Date().toLocaleDateString('vi-VN'),
    });
  });

  const [weekPlan, setWeekPlan] = useState<WeekPlan>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}week_plan`);
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        return sanitizeWeekPlan(parsed);
      } catch (e) {}
    }
    return sanitizeWeekPlan(generateDefaultWeekPlan(
      themePlan.themeName,
      themePlan.subThemes[0] || 'Lớp học thân yêu của bé',
      'mau-giao-5-6',
      1
    ));
  });

  const [dayPlan, setDayPlan] = useState<DayPlan>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}day_plan`);
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        return sanitizeDayPlan(parsed);
      } catch (e) {}
    }
    return sanitizeDayPlan(buildDayPlanFromWeek(weekPlan, 'Thứ Hai', schoolInfo));
  });

  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}lesson_plan`);
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        return sanitizeLessonPlan(parsed);
      } catch (e) {}
    }
    return null;
  });

  // 5. Modal states
  const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);
  const [isYccdModalOpen, setIsYccdModalOpen] = useState(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}school_info`, JSON.stringify(schoolInfo));
  }, [schoolInfo]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}year_plan`, JSON.stringify(yearPlan));
  }, [yearPlan]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}theme_plan`, JSON.stringify(themePlan));
  }, [themePlan]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}week_plan`, JSON.stringify(weekPlan));
  }, [weekPlan]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}day_plan`, JSON.stringify(dayPlan));
  }, [dayPlan]);

  useEffect(() => {
    if (lessonPlan) {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}lesson_plan`, JSON.stringify(lessonPlan));
    }
  }, [lessonPlan]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}yccd_bank`, JSON.stringify(yccdList));
  }, [yccdList]);

  // When age group changes, adapt curriculum defaults
  const handleUpdateSchoolInfo = (newInfo: LocalAndSchoolInfo) => {
    const ageChanged = newInfo.ageGroupId !== schoolInfo.ageGroupId;
    setSchoolInfo(newInfo);

    if (ageChanged) {
      const presets = STANDARD_YEAR_PRESETS[newInfo.ageGroupId] || STANDARD_YEAR_PRESETS['mau-giao-5-6'];
      const newYearPlan: YearPlan = {
        ...yearPlan,
        ageGroupId: newInfo.ageGroupId,
        themes: presets,
        updatedAt: new Date().toLocaleDateString('vi-VN'),
      };
      setYearPlan(newYearPlan);

      const firstTheme = presets[0];
      const newWeekPlan = generateDefaultWeekPlan(
        firstTheme.themeName,
        firstTheme.subThemes[0] || 'Khám phá ban đầu',
        newInfo.ageGroupId,
        1
      );
      setWeekPlan(newWeekPlan);

      const newDayPlan = buildDayPlanFromWeek(newWeekPlan, 'Thứ Hai', newInfo);
      setDayPlan(newDayPlan);
      setLessonPlan(null);
    }
  };

  // Workflow Handlers
  const handleSelectThemeForDeepPlan = async (theme: YearPlanThemeRow) => {
    const generatedTheme = await buildThemePlan(
      theme.themeName,
      theme.subThemes,
      theme.durationWeeks,
      schoolInfo,
      theme.focusYccdCodes
    );
    setThemePlan(generatedTheme);

    const firstSubTheme = theme.subThemes[0] || 'Nhánh 1';
    const newWeek = generateDefaultWeekPlan(
      theme.themeName,
      firstSubTheme,
      schoolInfo.ageGroupId,
      theme.startWeek
    );
    setWeekPlan(newWeek);

    const newDay = buildDayPlanFromWeek(newWeek, 'Thứ Hai', schoolInfo);
    setDayPlan(newDay);
    setLessonPlan(null);

    setActiveTab('theme');
  };

  const handleSelectSubThemeForWeek = (subThemeName: string, weekIndex: number) => {
    const newWeek = generateDefaultWeekPlan(
      themePlan.themeName,
      subThemeName,
      schoolInfo.ageGroupId,
      weekIndex
    );
    setWeekPlan(newWeek);

    const newDay = buildDayPlanFromWeek(newWeek, 'Thứ Hai', schoolInfo);
    setDayPlan(newDay);
    setLessonPlan(null);

    setActiveTab('week');
  };

  const handleSelectDayForDailyPlan = (dayOfWeek: string) => {
    const newDay = buildDayPlanFromWeek(weekPlan, dayOfWeek, schoolInfo);
    setDayPlan(newDay);
    setLessonPlan(null);
    setActiveTab('day');
  };

  const handleCreateLessonPlan = async (activityName: string) => {
    setActiveTab('lesson');
    const newLesson = await buildLessonPlan(dayPlan, schoolInfo, activityName);
    setLessonPlan(newLesson);
  };

  const handleAddYccd = (item: YCCDItem) => {
    setYccdList([item, ...yccdList]);
  };

  const handleExportFullWord = () => {
    const currentLessonPlan = lessonPlan || buildDefaultLessonPlan(dayPlan, schoolInfo);
    exportFullPlanToWord({
      yearPlan,
      themePlan,
      weekPlan,
      dayPlan,
      lessonPlan: currentLessonPlan,
      schoolInfo,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 font-sans text-slate-800 antialiased selection:bg-sky-500 selection:text-white">
      {/* Header */}
      <Header
        schoolInfo={schoolInfo}
        onUpdateSchoolInfo={handleUpdateSchoolInfo}
        onOpenLocalModal={() => setIsLocalModalOpen(true)}
        onOpenYccdModal={() => setIsYccdModalOpen(true)}
        onExportFullWord={handleExportFullWord}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation Tabs (5 Primary Tabs + Pipeline) */}
        <NavigationTabs
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          selectedThemeName={themePlan.themeName}
          selectedSubThemeName={weekPlan.subThemeName}
          selectedDayName={dayPlan.dayOfWeek}
        />

        {/* THÔNG TIN ĐỊA PHƯƠNG Card (Mandatory Section VII Requirement) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-sky-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-sky-100/80 text-sky-700 shrink-0 mt-0.5">
              <MapPin className="w-5 h-5 text-amber-500" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
                  THÔNG TIN ĐỊA PHƯƠNG & TRƯỜNG LỚP
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Đã cập nhật sau sáp nhập
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                {schoolInfo.schoolName} ({schoolInfo.className}) &bull; {schoolInfo.commune}, {schoolInfo.province}
              </p>
              <p className="text-xs text-slate-500 line-clamp-1 max-w-3xl">
                Đặc trưng văn hóa & di tích: {schoolInfo.localFeatures}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLocalModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold transition flex items-center gap-1.5 shrink-0 self-end sm:self-center"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Cập nhật địa phương</span>
          </button>
        </div>

        {/* Active Tab View */}
        {activeTab === 'year' && (
          <YearPlanView
            yearPlan={yearPlan}
            schoolInfo={schoolInfo}
            onUpdateYearPlan={setYearPlan}
            onSelectThemeForDeepPlan={handleSelectThemeForDeepPlan}
            onExportFullWord={handleExportFullWord}
          />
        )}

        {activeTab === 'theme' && (
          <ThemePlanView
            themePlan={themePlan}
            schoolInfo={schoolInfo}
            onUpdateThemePlan={setThemePlan}
            onSelectSubThemeForWeek={handleSelectSubThemeForWeek}
            onExportFullWord={handleExportFullWord}
          />
        )}

        {activeTab === 'week' && (
          <WeekPlanView
            weekPlan={weekPlan}
            schoolInfo={schoolInfo}
            onUpdateWeekPlan={setWeekPlan}
            onSelectDayForDailyPlan={handleSelectDayForDailyPlan}
            onExportFullWord={handleExportFullWord}
          />
        )}

        {activeTab === 'day' && (
          <DayPlanView
            dayPlan={dayPlan}
            schoolInfo={schoolInfo}
            onUpdateDayPlan={setDayPlan}
            onCreateLessonPlan={handleCreateLessonPlan}
            onExportFullWord={handleExportFullWord}
          />
        )}

        {activeTab === 'lesson' && (
          <LessonPlanView
            lessonPlan={lessonPlan}
            dayPlan={dayPlan}
            schoolInfo={schoolInfo}
            onUpdateLessonPlan={setLessonPlan}
            onExportFullWord={handleExportFullWord}
          />
        )}
      </main>

      {/* Footer with Copyright and Zalo: 0949.379.531 */}
      <Footer />

      {/* Modals */}
      <LocalInfoModal
        isOpen={isLocalModalOpen}
        onClose={() => setIsLocalModalOpen(false)}
        info={schoolInfo}
        onSave={setSchoolInfo}
      />

      <YCCDBankModal
        isOpen={isYccdModalOpen}
        onClose={() => setIsYccdModalOpen(false)}
        yccdList={yccdList}
        onAddYccd={handleAddYccd}
      />
    </div>
  );
}
