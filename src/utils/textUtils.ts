import { DayPlan, LessonPlan, ThemePlan, WeekPlan, YearPlan, YearPlanThemeRow } from '../types';

export function formatDomainKey(key: string): string {
  const map: Record<string, string> = {
    theChat: 'Thể chất',
    tinhCamXanHoi: 'Tình cảm – Xã hội',
    tinhCamXaHoi: 'Tình cảm – Xã hội',
    tinhCam: 'Tình cảm – Xã hội',
    ngonNgu: 'Ngôn ngữ',
    nhanThuc: 'Nhận thức',
    ngheThuat: 'Nghệ thuật',
    TC: 'Thể chất',
    TX: 'Tình cảm – Xã hội',
    NN: 'Ngôn ngữ',
    NT: 'Nhận thức',
    NgT: 'Nghệ thuật',
    knowledge: 'Kiến thức',
    skills: 'Kỹ năng',
    attitude: 'Thái độ',
  };
  return map[key] || key;
}

export function safeString(val: any, fallback = '', joiner = '; '): string {
  if (val === null || val === undefined) return fallback;
  if (typeof val === 'string') return val;
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);
  if (Array.isArray(val)) {
    return val.map(item => safeString(item)).filter(Boolean).join(joiner);
  }
  if (typeof val === 'object') {
    const entries = Object.entries(val);
    if (entries.length === 0) return fallback;
    return entries
      .map(([k, v]) => `${formatDomainKey(k)}: ${safeString(v, '', ', ')}`)
      .join('\n');
  }
  return String(val);
}

export function safeStringArray(val: any, fallback: string[] = []): string[] {
  if (val === null || val === undefined) return fallback;
  if (Array.isArray(val)) {
    return val.map(item => safeString(item)).filter(Boolean);
  }
  if (typeof val === 'string') {
    return val.split('\n').map(s => s.trim()).filter(Boolean);
  }
  if (typeof val === 'object') {
    return Object.entries(val).map(([k, v]) => `${formatDomainKey(k)}: ${safeString(v)}`);
  }
  return [String(val)];
}

export function sanitizeYearPlan(plan: any): YearPlan {
  if (!plan || typeof plan !== 'object') {
    return plan;
  }
  const themes = Array.isArray(plan.themes)
    ? plan.themes.map((t: any, idx: number): YearPlanThemeRow => ({
        id: safeString(t?.id, `theme-${idx + 1}`),
        order: Number(t?.order) || idx + 1,
        themeName: safeString(t?.themeName, `Chủ đề ${idx + 1}`),
        durationWeeks: Number(t?.durationWeeks) || 3,
        startWeek: Number(t?.startWeek) || 1,
        endWeek: Number(t?.endWeek) || 3,
        subThemes: safeStringArray(t?.subThemes),
        focusYccdCodes: safeStringArray(t?.focusYccdCodes),
        educationalContent: safeString(t?.educationalContent, 'Nội dung giáo dục cốt lõi.'),
        expectedActivities: safeString(t?.expectedActivities, 'Hoạt động trải nghiệm thực tế.'),
      }))
    : [];

  return {
    ...plan,
    id: safeString(plan.id, 'year-plan-init'),
    title: safeString(plan.title, 'Kế hoạch Giáo dục Năm học'),
    academicYear: safeString(plan.academicYear, '2025 - 2026'),
    ageGroupId: plan.ageGroupId || 'mau-giao-5-6',
    themes,
    generalObjectives: safeString(plan.generalObjectives, ''),
    notes: safeString(plan.notes, ''),
    updatedAt: safeString(plan.updatedAt, new Date().toLocaleDateString('vi-VN')),
  };
}

export function sanitizeThemePlan(plan: any): ThemePlan {
  if (!plan || typeof plan !== 'object') return plan;

  const contentNetwork = Array.isArray(plan.contentNetwork)
    ? plan.contentNetwork.map((node: any, idx: number) => ({
        title: safeString(node?.title, `Nhánh ${idx + 1}`),
        subContents: safeStringArray(node?.subContents),
      }))
    : [];

  const activityNetwork = Array.isArray(plan.activityNetwork)
    ? plan.activityNetwork.map((group: any) => ({
        activityType: safeString(group?.activityType, 'Hoạt động giáo dục'),
        activities: Array.isArray(group?.activities)
          ? group.activities.map((act: any) => ({
              name: safeString(act?.name, 'Hoạt động trải nghiệm'),
              yccdCodes: safeStringArray(act?.yccdCodes),
            }))
          : [],
      }))
    : [];

  return {
    ...plan,
    id: safeString(plan.id, 'theme-plan-init'),
    themeName: safeString(plan.themeName, 'Chủ đề'),
    durationWeeks: Number(plan.durationWeeks) || 3,
    ageGroupId: plan.ageGroupId || 'mau-giao-5-6',
    educationalGoal: safeString(plan.educationalGoal, ''),
    selectedYccdCodes: safeStringArray(plan.selectedYccdCodes),
    subThemes: safeStringArray(plan.subThemes),
    contentNetwork,
    activityNetwork,
    createdAt: safeString(plan.createdAt, new Date().toLocaleDateString('vi-VN')),
  };
}

export function sanitizeWeekPlan(plan: any): WeekPlan {
  if (!plan || typeof plan !== 'object') return plan;
  const days = Array.isArray(plan.days)
    ? plan.days.map((d: any) => ({
        dayOfWeek: d.dayOfWeek,
        dateStr: safeString(d.dateStr, ''),
        slots: Array.isArray(d.slots)
          ? d.slots.map((s: any) => ({
              timeSlotName: safeString(s?.timeSlotName, ''),
              activityName: safeString(s?.activityName, ''),
              yccdCodes: safeStringArray(s?.yccdCodes),
              notes: safeString(s?.notes, ''),
            }))
          : [],
      }))
    : [];

  return {
    ...plan,
    id: safeString(plan.id, 'week-plan-init'),
    weekNumber: Number(plan.weekNumber) || 1,
    themeName: safeString(plan.themeName, ''),
    subThemeName: safeString(plan.subThemeName, ''),
    ageGroupId: plan.ageGroupId || 'mau-giao-5-6',
    days,
  };
}

export function sanitizeDayPlan(plan: any): DayPlan {
  if (!plan || typeof plan !== 'object') return plan;
  return {
    ...plan,
    id: safeString(plan.id, 'day-plan-init'),
    weekPlanId: safeString(plan.weekPlanId, ''),
    themeName: safeString(plan.themeName, ''),
    subThemeName: safeString(plan.subThemeName, ''),
    dayOfWeek: plan.dayOfWeek || 'Thứ Hai',
    dateStr: safeString(plan.dateStr, new Date().toLocaleDateString('vi-VN')),
    ageGroupId: plan.ageGroupId || 'mau-giao-5-6',
    mainFocusActivity: {
      name: safeString(plan.mainFocusActivity?.name, 'Hoạt động học trọng tâm'),
      learningArea: safeString(plan.mainFocusActivity?.learningArea, 'Giáo dục toàn diện'),
      yccdCodes: safeStringArray(plan.mainFocusActivity?.yccdCodes),
      objectives: safeString(plan.mainFocusActivity?.objectives, ''),
    },
    schedule: Array.isArray(plan.schedule)
      ? plan.schedule.map((s: any) => ({
          period: safeString(s?.period, ''),
          activityName: safeString(s?.activityName, ''),
          content: safeString(s?.content, ''),
          yccdCodes: safeStringArray(s?.yccdCodes),
        }))
      : [],
    teacherNotes: safeString(plan.teacherNotes, ''),
  };
}

export function sanitizeLessonPlan(plan: any): LessonPlan | null {
  if (!plan || typeof plan !== 'object') return null;
  return {
    ...plan,
    id: safeString(plan.id, 'lesson-plan-init'),
    dayPlanId: safeString(plan.dayPlanId, ''),
    activityName: safeString(plan.activityName, ''),
    activityType: safeString(plan.activityType, 'Hoạt động học'),
    themeName: safeString(plan.themeName, ''),
    subThemeName: safeString(plan.subThemeName, ''),
    ageGroupId: plan.ageGroupId || 'mau-giao-5-6',
    durationMinutes: Number(plan.durationMinutes) || 30,
    isSteam: Boolean(plan.isSteam),
    steamModel: plan.steamModel ? safeString(plan.steamModel) : undefined,
    objectives: {
      knowledge: safeStringArray(plan.objectives?.knowledge),
      skills: safeStringArray(plan.objectives?.skills),
      attitude: safeStringArray(plan.objectives?.attitude),
      yccdItems: Array.isArray(plan.objectives?.yccdItems)
        ? plan.objectives.yccdItems.map((y: any) => ({
            code: safeString(y?.code, ''),
            domain: safeString(y?.domain, ''),
            content: safeString(y?.content, ''),
          }))
        : [],
    },
    preparations: {
      teacher: safeStringArray(plan.preparations?.teacher),
      children: safeStringArray(plan.preparations?.children),
      environment: safeStringArray(plan.preparations?.environment),
    },
    procedure: Array.isArray(plan.procedure)
      ? plan.procedure.map((p: any) => ({
          stepName: safeString(p?.stepName, ''),
          teacherAction: safeStringArray(p?.teacherAction),
          childrenAction: safeStringArray(p?.childrenAction),
          suggestedQuestions: safeStringArray(p?.suggestedQuestions),
        }))
      : [],
    evaluation: safeString(plan.evaluation, ''),
  };
}
