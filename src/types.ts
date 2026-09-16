export type AgeGroupId = 
  | 'nha-tre-18-24' 
  | 'nha-tre-24-36' 
  | 'mau-giao-3-4' 
  | 'mau-giao-4-5' 
  | 'mau-giao-5-6';

export interface AgeGroupInfo {
  id: AgeGroupId;
  label: string;
  category: 'Nhà trẻ' | 'Mẫu giáo';
  ageRange: string;
  description: string;
  timeSlotMinutes: {
    study: number; // e.g. 15-20 min for nha tre, 30-35 min for 5-6
    outdoor: number;
    activityCorner: number;
  };
}

export type DomainCode = 'TC' | 'TX' | 'NN' | 'NT' | 'NgT';

export interface DomainInfo {
  code: DomainCode;
  name: string;
  shortName: string;
  color: string;
  bgLight: string;
  border: string;
}

export interface YCCDItem {
  code: string; // e.g. 'TC1.1', 'NN2.3'
  domain: DomainCode;
  domainName: string;
  content: string;
  milestone: '36 tháng' | '6 tuổi';
  applicableAges: AgeGroupId[];
  ageGuideline: Record<AgeGroupId, string>; // Mức độ cụ thể hóa theo độ tuổi
}

export interface LocalAndSchoolInfo {
  schoolYear: string;
  schoolName: string;
  province: string; // Tỉnh / Thành phố
  commune: string; // Xã / Phường / Thị trấn / Đặc khu (sau sáp nhập)
  historicalName?: string; // Tên cũ / lịch sử trước sáp nhập nếu có
  className: string;
  ageGroupId: AgeGroupId;
  childrenCount: number;
  teacherName: string;
  programDurationWeeks: number; // Thường 35 tuần
  schoolFeatures: string; // Đặc điểm trường lớp (CSVC, đồ chơi, công nghệ)
  localFeatures: string; // Làng nghề, di tích, danh lam thắng cảnh, nông sản, lễ hội đặc trưng
  hasSteamFacility: boolean;
  steamNotes?: string;
}

export interface YearPlanThemeRow {
  id: string;
  order: number;
  themeName: string;
  durationWeeks: number;
  startWeek: number;
  endWeek: number;
  subThemes: string[]; // Các nhánh chủ đề (mỗi tuần 1 nhánh)
  focusYccdCodes: string[]; // Mã YCCĐ trọng tâm
  educationalContent: string;
  expectedActivities: string;
}

export interface YearPlan {
  id: string;
  title: string;
  academicYear: string;
  ageGroupId: AgeGroupId;
  themes: YearPlanThemeRow[];
  generalObjectives: string;
  notes: string;
  updatedAt: string;
}

export interface ContentNetworkNode {
  title: string;
  subContents: string[];
}

export interface ActivityNetworkNode {
  activityType: string; // e.g. 'Khám phá / Nhận biết', 'Làm quen văn học', 'Tạo hình', 'Âm nhạc', 'Vận động'
  activities: {
    name: string;
    yccdCodes: string[];
  }[];
}

export interface ThemePlan {
  id: string;
  yearPlanId?: string;
  themeName: string;
  durationWeeks: number;
  ageGroupId: AgeGroupId;
  educationalGoal: string;
  selectedYccdCodes: string[];
  contentNetwork: ContentNetworkNode[];
  activityNetwork: ActivityNetworkNode[];
  subThemes: string[]; // Ứng với các tuần
  createdAt: string;
}

export type PlanLevel = 'year' | 'theme' | 'week' | 'day' | 'lesson';

export interface DailyScheduleSlot {
  timeSlotName: string; // Đón trẻ, Thể dục sáng, Hoạt động học, v.v.
  activityName: string;
  yccdCodes?: string[];
  notes?: string;
}

export type WeekScheduleSlot = DailyScheduleSlot;

export interface DayOfWeekPlan {
  dayOfWeek: 'Thứ Hai' | 'Thứ Ba' | 'Thứ Tư' | 'Thứ Năm' | 'Thứ Sáu';
  dateStr?: string;
  slots: DailyScheduleSlot[];
}

export interface WeekPlan {
  id: string;
  themeId?: string;
  themeName: string;
  subThemeName: string; // 01 nhánh chủ đề cho tuần này
  weekNumber: number;
  ageGroupId: AgeGroupId;
  days: DayOfWeekPlan[];
  focusYccdCodes: string[];
  weekEvaluation?: string;
}

export interface DayPlan {
  id: string;
  weekPlanId?: string;
  themeName: string;
  subThemeName: string;
  dayOfWeek: string;
  dateStr: string;
  ageGroupId: AgeGroupId;
  mainFocusActivity: {
    name: string;
    learningArea: string; // Lĩnh vực: Phát triển nhận thức / ngôn ngữ...
    yccdCodes: string[];
    objectives: string;
  };
  schedule: {
    period: string; // 1. Đón trẻ, 2. Thể dục sáng, ... 10. Trả trẻ
    activityName: string;
    content: string;
    yccdCodes?: string[];
  }[];
  teacherNotes?: string;
}

export interface LessonPlan {
  id: string;
  dayPlanId?: string;
  activityName: string;
  activityType: string; // Hoạt động học, Trải nghiệm, Tạo hình...
  themeName: string;
  subThemeName: string;
  ageGroupId: AgeGroupId;
  durationMinutes: number;
  isSteam: boolean;
  steamModel?: '5E' | 'EDP' | 'Tích hợp STEAM';
  objectives: {
    knowledge: string[];
    skills: string[];
    attitude: string[];
    yccdItems: { code: string; domain: string; content: string }[];
  };
  preparations: {
    teacher: string[];
    children: string[];
    environment: string[];
  };
  procedure: {
    stepName: string; // e.g. "1. Ổn định tổ chức & Gây hứng thú", "2. Phương pháp & Hình thức tổ chức", "3. Kết thúc"
    teacherAction: string[];
    childrenAction: string[];
    suggestedQuestions: string[];
  }[];
  evaluation: string;
}
