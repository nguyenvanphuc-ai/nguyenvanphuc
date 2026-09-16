import { 
  AgeGroupId, 
  DayPlan, 
  LessonPlan, 
  LocalAndSchoolInfo, 
  ThemePlan, 
  WeekPlan, 
  YearPlan, 
  YearPlanThemeRow 
} from '../types';
import { INITIAL_YCCD_DATABASE, findYCCDByCode } from '../data/yccdData';
import { STANDARD_YEAR_PRESETS, generateDefaultWeekPlan, isBacHoContent } from '../data/presetCurriculum';
import { 
  safeString, 
  safeStringArray, 
  sanitizeYearPlan, 
  sanitizeThemePlan, 
  sanitizeDayPlan, 
  sanitizeLessonPlan 
} from './textUtils';

// Helper to call backend API
export async function callBackendAI(prompt: string, systemInstruction?: string): Promise<string | null> {
  try {
    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, systemInstruction }),
    });

    if (!res.ok) {
      console.warn('Backend AI returned non-OK status:', res.status);
      return null;
    }

    const data = await res.json();
    if (data.success && data.text) {
      if (data.modelUsed) {
        console.info(`[AI Client] Content generated successfully using ${data.modelUsed}`);
      }
      return data.text;
    }
    if (data.isHighDemand) {
      console.info('[AI Client] Google AI servers are under high demand. Smoothly activating built-in preschool curriculum engine.');
    }
    return null;
  } catch (err) {
    console.warn('Call backend AI failed, utilizing fallback engine:', err);
    return null;
  }
}

// Generate Year Plan
export async function buildYearPlan(info: LocalAndSchoolInfo): Promise<YearPlan> {
  const ageGroupId = info.ageGroupId;
  const presetThemes = STANDARD_YEAR_PRESETS[ageGroupId] || STANDARD_YEAR_PRESETS['mau-giao-5-6'];

  // Personalize based on local info after merger
  const localCommune = info.commune || 'Xã/Phường địa phương';
  const localProvince = info.province || 'Tỉnh/Thành phố';
  const localFeatures = info.localFeatures || 'di tích lịch sử, làng nghề truyền thống và cảnh đẹp quê hương';

  const prompt = `Xây dựng Kế hoạch Giáo dục Năm học cho trường mầm non theo Chương trình GDMN mới (Quyết định 388/QĐ-BGDĐT):
- Năm học: ${info.schoolYear}
- Tên trường: ${info.schoolName}
- Địa phương hiện hành (sau sáp nhập): ${localCommune}, ${localProvince} (Địa danh cũ nếu có: ${info.historicalName || 'Không'})
- Đặc điểm nổi bật địa phương: ${localFeatures}
- Độ tuổi: ${info.ageGroupId} (Số lượng trẻ: ${info.childrenCount} trẻ)
- Đặc điểm trường lớp: ${info.schoolFeatures}
- Điều kiện STEAM: ${info.hasSteamFacility ? 'Có phòng STEAM / đồ dùng trải nghiệm' : 'Chưa có phòng riêng, tích hợp đồ dùng sẵn có'}

YÊU CẦU QUAN TRỌNG VỀ PHÂN PHỐI THỜI GIAN VÀ CHỦ ĐỀ:
1. Kế hoạch giáo dục 1 năm học gồm ĐẦY ĐỦ 35 TUẦN THỰC HỌC (từ Tuần 1 đến Tuần 35), phân bổ liên tục vào các Chủ đề trong năm (tổng thời lượng durationWeeks của tất cả các chủ đề phải BẰNG ĐÚNG 35 TUẦN).
2. BẮT BUỘC có chủ đề: "QUÊ HƯƠNG – ĐẤT NƯỚC – BÁC HỒ KÍNH YÊU" điều chỉnh đúng theo độ tuổi ${info.ageGroupId} và tích hợp nét đổi mới của địa phương sau sáp nhập (${localCommune}, ${localProvince}).
3. NGUYÊN TẮC TÔN KÍNH TUYỆT ĐỐI VỚI BÁC HỒ: Với nhánh chủ đề về Bác Hồ / Chủ tịch Hồ Chí Minh (nhân dịp kỷ niệm sinh nhật Bác 19/5), tuyệt đối dùng ngôn ngữ tôn kính, trang trọng (ví dụ: "Chủ tịch Hồ Chí Minh - Vị cha già kính yêu của dân tộc", "Bác Hồ kính yêu với thiếu nhi", "Kỷ niệm ngày sinh nhật Bác 19/5"). TUYỆT ĐỐI KHÔNG dùng các từ ngữ máy móc như "khám phá đặc trưng", "tìm hiểu nét đổi mới tại địa phương" ghép vào Bác Hồ.
4. Hãy trả về một danh sách JSON hợp lệ gồm mảng 8-9 chủ đề trong năm bao trọn 35 tuần, mỗi chủ đề gồm:
- themeName: Tên chủ đề (gồm cả QUÊ HƯƠNG – ĐẤT NƯỚC – BÁC HỒ KÍNH YÊU)
- durationWeeks: Số tuần của chủ đề (tổng cộng các chủ đề phải bằng đúng 35 tuần)
- subThemes: Mảng các nhánh chủ đề (Mỗi tuần tương ứng đúng 01 nhánh chủ đề)
- focusYccdCodes: Mảng các mã YCCĐ trọng tâm (chỉ dùng TC1, TC1.1, TC1.2, TC2, TX1, TX1.1, TX1.2, TX2, NN1, NN1.1, NN1.2, NT1, NT1.1, NT1.2, NgT1, NgT1.1)
- educationalContent: Nội dung giáo dục cốt lõi
- expectedActivities: Hoạt động trải nghiệm dự kiến`;

  const aiText = await callBackendAI(prompt);

  let customizedThemes: YearPlanThemeRow[] = [];

  if (aiText) {
    try {
      // Extract JSON from markdown code block if present
      const jsonMatch = aiText.match(/```json([\s\S]*?)```/) || aiText.match(/\[([\s\S]*?)\]/);
      const jsonStr = jsonMatch ? (jsonMatch[1] ? jsonMatch[1].trim() : jsonMatch[0].trim()) : aiText;
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed) && parsed.length > 0) {
        let currentWeek = 1;
        const mappedThemes = parsed.map((item: any, index: number) => {
          const duration = Math.max(1, Number(item.durationWeeks) || 3);
          const startWeek = currentWeek;
          const endWeek = currentWeek + duration - 1;
          currentWeek = endWeek + 1;
          return {
            id: `ai-theme-${index + 1}-${Date.now()}`,
            order: index + 1,
            themeName: safeString(item.themeName, `Chủ đề ${index + 1}`),
            durationWeeks: duration,
            startWeek,
            endWeek,
            subThemes: Array.isArray(item.subThemes) && item.subThemes.length > 0 
              ? safeStringArray(item.subThemes)
              : Array.from({ length: duration }).map((_, i) => `Nhánh ${i + 1}: Khám phá nhánh nhỏ`),
            focusYccdCodes: Array.isArray(item.focusYccdCodes) ? safeStringArray(item.focusYccdCodes) : ['TC1', 'TX1', 'NN1'],
            educationalContent: safeString(item.educationalContent, 'Nội dung tích hợp lấy trẻ làm trung tâm.'),
            expectedActivities: safeString(item.expectedActivities, 'Hoạt động trải nghiệm thực tế gắn với địa phương.'),
          };
        });

        // Check if total weeks is 35 and has homeland theme
        const totalW = mappedThemes.reduce((sum, t) => sum + t.durationWeeks, 0);
        const hasHomeland = mappedThemes.some(t => 
          t.themeName.toUpperCase().includes('QUÊ HƯƠNG') || t.themeName.toUpperCase().includes('BÁC HỒ')
        );

        if (totalW === 35 && hasHomeland) {
          customizedThemes = mappedThemes;
        }
      }
    } catch (e) {
      console.warn('Could not parse AI year plan JSON, fallback to smart generator with local enrichment:', e);
    }
  }

  // Fallback / standard enriched preset if AI was empty or failed
  if (customizedThemes.length === 0) {
    customizedThemes = presetThemes.map((theme, idx) => {
      // If it is the homeland theme, deeply personalize with merged administrative unit
      if (theme.themeName.includes('QUÊ HƯƠNG') || theme.themeName.includes('Quê hương')) {
        return {
          ...theme,
          id: `theme-local-${idx + 1}`,
          educationalContent: `${theme.educationalContent} Cập nhật tìm hiểu nét đổi mới, danh lam tại ${localCommune}, ${localProvince} sau sáp nhập (${localFeatures}). Thể hiện lòng biết ơn sâu sắc và tình cảm kính yêu đối với Bác Hồ.`,
          expectedActivities: `${theme.expectedActivities} Tham quan/xem phim tư liệu về cảnh đẹp quê hương ${localCommune}; dâng hoa và biểu diễn văn nghệ mừng sinh nhật Bác 19/5.`,
        };
      }
      return { ...theme, id: `theme-${idx + 1}` };
    });
  }

  return sanitizeYearPlan({
    id: `year-plan-${Date.now()}`,
    title: `Kế hoạch Giáo dục Năm học ${info.schoolYear} - Lớp ${info.className}`,
    academicYear: info.schoolYear,
    ageGroupId: info.ageGroupId,
    themes: customizedThemes,
    generalObjectives: `Thực hiện Chương trình Giáo dục Mầm non mới (QĐ 388/QĐ-BGDĐT) lấy trẻ làm trung tâm, phát triển toàn diện 5 lĩnh vực Thể chất, Tình cảm - Xã hội, Ngôn ngữ, Nhận thức và Nghệ thuật phù hợp đặc điểm tâm sinh lý của lứa tuổi ${info.ageGroupId}.`,
    notes: `Kế hoạch được xây dựng linh hoạt theo điều kiện thực tế của Trường Mầm non ${info.schoolName} và địa phương ${localCommune}, ${localProvince}.`,
    updatedAt: new Date().toLocaleDateString('vi-VN'),
  });
}

// Generate Theme Plan with Content and Activity Networks
export async function buildThemePlan(
  themeName: string,
  subThemes: string[],
  durationWeeks: number,
  info: LocalAndSchoolInfo,
  focusCodes: string[]
): Promise<ThemePlan> {
  const isNhaTre = info.ageGroupId.startsWith('nha-tre');
  const is56 = info.ageGroupId === 'mau-giao-5-6';
  const localCommune = info.commune || 'Xã/Phường địa phương';
  const localProvince = info.province || 'Tỉnh/Thành';

  const prompt = `Xây dựng KẾ HOẠCH CHỦ ĐỀ theo Chương trình GDMN mới (QĐ 388/QĐ-BGDĐT):
- Chủ đề: "${themeName}"
- Thời lượng: ${durationWeeks} tuần
- Các nhánh chủ đề: ${subThemes.join(', ')}
- Độ tuổi: ${info.ageGroupId}
- Địa phương sau sáp nhập: ${localCommune}, ${localProvince}
- YCCĐ trọng tâm: ${focusCodes.join(', ')}

LƯU Ý ĐẶC BIỆT VỀ LÒNG TÔN KÍNH:
- Đối với nhánh chủ đề về Bác Hồ / Chủ tịch Hồ Chí Minh (kỷ niệm sinh nhật Bác 19/5), tuyệt đối dùng danh xưng và ngôn từ trang nghiêm, tôn kính (ví dụ: "Chủ tịch Hồ Chí Minh - Vị cha già kính yêu của dân tộc", "Bác Hồ kính yêu với thiếu nhi", "Kỷ niệm ngày sinh nhật Bác 19/5").
- TUYỆT ĐỐI KHÔNG dùng các từ ngữ máy móc như "khám phá đặc trưng", "công dụng", "cấu tạo", "tìm hiểu nét đổi mới tại địa phương" ghép vào Bác Hồ. Thay vào đó là các hoạt động: ngắm ảnh Bác Hồ, nghe kể chuyện Bác Hồ với thiếu nhi, đọc thơ "Ảnh Bác", hát múa ca ngợi Bác, làm hoa tươi dâng lên Bác, học tập 5 điều Bác dạy.

Trả về kết quả định dạng JSON gồm:
1. educationalGoal: Mục tiêu giáo dục của chủ đề
2. selectedYccdCodes: Mảng mã YCCĐ (TC1, TX1.1...)
3. contentNetwork: Mảng mạng nội dung (trả lời: "Trẻ sẽ tìm hiểu những nội dung gì?") gồm các node { title: string, subContents: string[] }
4. activityNetwork: Mảng mạng hoạt động (trả lời: "Trẻ được học, chơi, trải nghiệm bằng những hoạt động nào?") gồm các node { activityType: string, activities: [{ name: string, yccdCodes: string[] }] }`;

  const aiText = await callBackendAI(prompt);

  if (aiText) {
    try {
      const jsonMatch = aiText.match(/```json([\s\S]*?)```/) || aiText.match(/\{[\s\S]*?\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] ? jsonMatch[1].trim() : jsonMatch[0].trim()) : aiText;
      const parsed = JSON.parse(jsonStr);
      if (parsed.contentNetwork && parsed.activityNetwork) {
        return sanitizeThemePlan({
          id: `theme-plan-${Date.now()}`,
          themeName,
          durationWeeks,
          ageGroupId: info.ageGroupId,
          educationalGoal: safeString(parsed.educationalGoal, `Giúp trẻ lĩnh hội kiến thức, kỹ năng và thái độ tích cực trong chủ đề ${themeName}.`),
          selectedYccdCodes: Array.isArray(parsed.selectedYccdCodes) ? safeStringArray(parsed.selectedYccdCodes) : focusCodes,
          contentNetwork: parsed.contentNetwork,
          activityNetwork: parsed.activityNetwork,
          subThemes: safeStringArray(subThemes),
          createdAt: new Date().toLocaleDateString('vi-VN'),
        });
      }
    } catch (err) {
      console.warn('Parse theme plan AI failed, generating robust fallback:', err);
    }
  }

  // High-craft fallback content and activity network
  const contentNetwork = subThemes.map((sub, i) => {
    const isBac = isBacHoContent(sub);
    if (isBac) {
      return {
        title: `Nhánh ${i + 1}: ${sub}`,
        subContents: isNhaTre ? [
          'Nhận biết hình ảnh Bác Hồ kính yêu treo trang trọng trong lớp học',
          'Cảm nhận tình cảm yêu thương, nụ cười hiền từ của Bác Hồ dành cho các cháu thiếu nhi',
          'Bé tập khoanh tay chào lễ phép, chăm ngoan vâng lời cô giáo và cha mẹ',
        ] : [
          'Tìm hiểu về Chủ tịch Hồ Chí Minh kính yêu - Vị lãnh tụ vĩ đại, Người cha già kính yêu của dân tộc Việt Nam',
          'Tình cảm bao la, sự quan tâm chăm sóc ân cần của Bác Hồ đối với các cháu thiếu niên, nhi đồng',
          'Ý nghĩa ngày sinh nhật Bác 19/5; các hoạt động kỷ niệm, dâng hoa, dâng việc tốt mừng sinh nhật Bác',
          'Giáo dục lòng biết ơn sâu sắc, niềm tự hào và noi gương thực hiện tốt 5 điều Bác Hồ dạy',
        ],
      };
    }
    return {
      title: `Nhánh ${i + 1}: ${sub}`,
      subContents: isNhaTre ? [
        `Nhận biết tên gọi và hình dáng nổi bật của ${sub}`,
        `Gọi tên màu sắc (đỏ, vàng, xanh) và kích thước (to - nhỏ) của sự vật`,
        `Biết giữ gìn đồ chơi, nghe lời cô và bày tỏ cảm xúc vui vẻ`,
      ] : [
        `Tìm hiểu đặc điểm đặc trưng, công dụng và ý nghĩa của ${sub}`,
        `Nét gắn kết giữa ${sub} với đời sống tại địa phương ${localCommune}`,
        `Kỹ năng so sánh, phân nhóm, giải quyết vấn đề và giao tiếp hợp tác`,
        `Thể hiện cảm xúc yêu quý, tự hào và giữ gìn nét đẹp quê hương`,
      ],
    };
  });

  const activityNetwork = [
    {
      activityType: isNhaTre ? 'Hoạt động Nhận biết & Vận động cơ bản' : 'Khám phá Khoa học & Xã hội',
      activities: subThemes.map(st => {
        const isBac = isBacHoContent(st);
        if (isBac) {
          return {
            name: isNhaTre
              ? 'Nhận biết tập nói: "Ảnh Bác Hồ kính yêu" (quan sát ảnh Bác Hồ với thiếu nhi, bày tỏ tình cảm yêu mến Bác)'
              : 'Khám phá xã hội: Tìm hiểu về Chủ tịch Hồ Chí Minh kính yêu - Vị cha già kính yêu của dân tộc (Kỷ niệm ngày sinh nhật Bác 19/5; giáo dục lòng biết ơn Bác)',
            yccdCodes: isNhaTre ? ['NN1.1', 'TX1'] : ['NT1.2', 'TX1'],
          };
        }
        return {
          name: isNhaTre ? `Nhận biết tập nói về ${st}` : `Khám phá trải nghiệm thực tế: ${st} tại ${localCommune}`,
          yccdCodes: isNhaTre ? ['NN1.1', 'NT1'] : ['NT1', 'NT1.2'],
        };
      }),
    },
    {
      activityType: isNhaTre ? 'Hoạt động với Đồ vật & Tạo hình đơn giản' : 'Làm quen với Toán & Trải nghiệm',
      activities: subThemes.map((st, i) => {
        const isBac = isBacHoContent(st);
        if (isBac) {
          return {
            name: isNhaTre
              ? 'Chấm màu, dán hoa trang trí khung ảnh Bác Hồ kính yêu'
              : is56
                ? 'Làm quen với Toán: Đếm và sắp xếp lẵng hoa tươi thắm trong phạm vi 10 dâng mừng sinh nhật Bác Hồ 19/5'
                : 'Làm quen với Toán: Đếm số lượng hoa mừng ngày sinh nhật Bác Hồ kính yêu',
            yccdCodes: isNhaTre ? ['NgT1.1', 'TC1.1'] : ['NT1.1', 'TX1'],
          };
        }
        return {
          name: isNhaTre 
            ? `Chấm màu / Xếp chồng đồ vật tạo hình ${st}`
            : is56
              ? `Ứng dụng STEAM: Thiết kế mô hình ${st} từ nguyên vật liệu mở`
              : `Đếm và so sánh số lượng các đối tượng thuộc ${st}`,
          yccdCodes: isNhaTre ? ['NgT1.1', 'TC1.1'] : ['NT1.1', 'NT1'],
        };
      }),
    },
    {
      activityType: 'Làm quen Văn học & Phát triển Ngôn ngữ',
      activities: subThemes.map(st => {
        const isBac = isBacHoContent(st);
        if (isBac) {
          return {
            name: isNhaTre ? 'Nghe cô đọc diễn cảm bài thơ "Ảnh Bác" (Trần Đăng Khoa)' : 'Đọc thơ diễn cảm "Ảnh Bác", nghe kể câu chuyện "Bác Hồ với các cháu thiếu nhi"',
            yccdCodes: ['NN1', 'NN1.1'],
          };
        }
        return {
          name: isNhaTre ? `Nghe đọc thơ ngắn: "${st}"` : `Kể chuyện diễn cảm, đọc thơ sáng tạo về ${st}`,
          yccdCodes: ['NN1', 'NN1.1'],
        };
      }),
    },
    {
      activityType: 'Giáo dục Âm nhạc & Tạo hình nghệ thuật',
      activities: subThemes.map(st => {
        const isBac = isBacHoContent(st);
        if (isBac) {
          return {
            name: 'Hát múa ca ngợi Bác Hồ kính yêu ("Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng", "Đêm qua em mơ gặp Bác Hồ", "Nhớ ơn Bác")',
            yccdCodes: ['NgT1', 'NgT1.1'],
          };
        }
        return {
          name: `Hát, múa vận động minh họa và vẽ/nặn/cắt dán tác phẩm về ${st}`,
          yccdCodes: ['NgT1', 'NgT1.1'],
        };
      }),
    },
    {
      activityType: 'Hoạt động ngoài trời & Trò chơi dân gian',
      activities: [
        {
          name: isBacHoContent(themeName)
            ? 'Dạo chơi sân trường, tham quan góc truyền thống/ngắm ảnh Bác Hồ; TCDG: "Rồng rắn lên mây"'
            : `Dạo chơi quan sát thực tế quanh sân trường về ${themeName}; TCDG: ${isNhaTre ? 'Dung dăng dung dẻ' : 'Rồng rắn lên mây'}`,
          yccdCodes: ['TC1', 'TX1'],
        },
      ],
    },
  ];

  return sanitizeThemePlan({
    id: `theme-plan-${Date.now()}`,
    themeName,
    durationWeeks,
    ageGroupId: info.ageGroupId,
    educationalGoal: `Trẻ tích cực khám phá nội dung chủ đề "${themeName}", hình thành các kỹ năng vận động, nhận thức, ngôn ngữ và biểu cảm nghệ thuật theo đúng YCCĐ Chương trình GDMN mới.`,
    selectedYccdCodes: focusCodes.length > 0 ? focusCodes : ['TC1', 'TX1.1', 'NN1', 'NT1.2', 'NgT1'],
    contentNetwork,
    activityNetwork,
    subThemes,
    createdAt: new Date().toLocaleDateString('vi-VN'),
  });
}

// Generate Day Plan from Week Plan
export function buildDayPlanFromWeek(
  weekPlan: WeekPlan,
  dayOfWeek: string,
  schoolInfo: LocalAndSchoolInfo
): DayPlan {
  const selectedDay = weekPlan.days.find(d => d.dayOfWeek === dayOfWeek) || weekPlan.days[0];
  const studySlot = selectedDay.slots.find(s => s.timeSlotName.toLowerCase().includes('học')) || selectedDay.slots[2];

  const schedulePeriods = [
    { period: '1. Đón trẻ', slotName: 'Đón trẻ' },
    { period: '2. Thể dục sáng', slotName: 'Thể dục sáng' },
    { period: '3. Hoạt động học', slotName: 'Hoạt động học' },
    { period: '4. Hoạt động ngoài trời', slotName: 'Hoạt động ngoài trời' },
    { period: '5. Hoạt động góc', slotName: 'Hoạt động góc' },
    { period: '6. Ăn trưa', slotName: 'Ăn – ngủ – vệ sinh' },
    { period: '7. Ngủ trưa', slotName: 'Ăn – ngủ – vệ sinh' },
    { period: '8. Vệ sinh sau ngủ dậy', slotName: 'Ăn – ngủ – vệ sinh' },
    { period: '9. Hoạt động chiều', slotName: 'Hoạt động chiều' },
    { period: '10. Trả trẻ', slotName: 'Trả trẻ' },
  ];

  const schedule = schedulePeriods.map(p => {
    const matchedSlot = selectedDay.slots.find(s => s.timeSlotName.toLowerCase().includes(p.slotName.toLowerCase()) || p.slotName.includes(s.timeSlotName));
    return {
      period: p.period,
      activityName: matchedSlot ? matchedSlot.activityName : `Thực hiện quy trình chế độ sinh hoạt: ${p.period}`,
      content: matchedSlot ? matchedSlot.activityName : `Rèn luyện nền nếp cho trẻ lứa tuổi ${weekPlan.ageGroupId}.`,
      yccdCodes: matchedSlot?.yccdCodes || ['TC1.2'],
    };
  });

  return sanitizeDayPlan({
    id: `day-${Date.now()}`,
    weekPlanId: weekPlan.id,
    themeName: weekPlan.themeName,
    subThemeName: weekPlan.subThemeName,
    dayOfWeek: selectedDay.dayOfWeek,
    dateStr: new Date().toLocaleDateString('vi-VN'),
    ageGroupId: weekPlan.ageGroupId,
    mainFocusActivity: {
      name: studySlot ? studySlot.activityName : 'Hoạt động học trọng tâm trong ngày',
      learningArea: 'Giáo dục phát triển toàn diện (theo Chương trình GDMN mới)',
      yccdCodes: studySlot?.yccdCodes || ['NT1', 'NN1'],
      objectives: `Trẻ nắm được kiến thức, kỹ năng trọng tâm của hoạt động "${studySlot?.activityName || ''}".`,
    },
    schedule,
    teacherNotes: `Đặc biệt quan sát trẻ nhút nhát, hỗ trợ kịp thời trong giờ vận động và ăn trưa.`,
  });
}

// Generate Detailed Lesson Plan (Giáo án)
export async function buildLessonPlan(
  dayPlan: DayPlan,
  schoolInfo: LocalAndSchoolInfo,
  activityOverride?: string
): Promise<LessonPlan> {
  const activityName = activityOverride || dayPlan.mainFocusActivity.name;
  const isNhaTre = dayPlan.ageGroupId.startsWith('nha-tre');
  const is56 = dayPlan.ageGroupId === 'mau-giao-5-6';
  const duration = isNhaTre ? 15 : is56 ? 30 : 25;
  const isBac = isBacHoContent(activityName) || isBacHoContent(dayPlan.subThemeName) || isBacHoContent(dayPlan.themeName);

  const isSteam = !isBac && !isNhaTre && (activityName.toLowerCase().includes('steam') || activityName.toLowerCase().includes('khám phá') || activityName.toLowerCase().includes('tạo hình') || schoolInfo.hasSteamFacility);

  const prompt = `Soạn GIÁO ÁN MẦM NON MỚI theo Quyết định 388/QĐ-BGDĐT:
- Tên hoạt động: "${activityName}"
- Chủ đề: "${dayPlan.themeName}" - Nhánh: "${dayPlan.subThemeName}"
- Lứa tuổi: ${dayPlan.ageGroupId} (Thời lượng: ${duration} phút)
- Trường: ${schoolInfo.schoolName}, Địa phương: ${schoolInfo.commune}, ${schoolInfo.province}
${isBac ? `
YÊU CẦU ĐẶC BIỆT TÔN KÍNH VỚI BÁC HỒ:
- Hoạt động hướng về Chủ tịch Hồ Chí Minh / Bác Hồ kính yêu (kỷ niệm sinh nhật Bác 19/5), tuyệt đối dùng ngôn ngữ trang trọng, tôn kính, giáo dục lòng biết ơn sâu sắc và tình cảm kính yêu Bác Hồ.
- TUYỆT ĐỐI KHÔNG dùng các từ ngữ kỹ thuật máy móc, không gọi Bác là đồ vật/mô hình, không ghép nét đổi mới địa phương vào Bác Hồ.` : (isSteam ? '- Tích hợp mô hình STEAM (5E hoặc EDP)' : '- Hoạt động truyền thống lấy trẻ làm trung tâm, không ép buộc STEAM')}

Yêu cầu nghiêm ngặt:
- Phù hợp tuyệt đối với tâm sinh lý lứa tuổi ${dayPlan.ageGroupId}
- Trả về định dạng JSON gồm:
1. activityType: Tên phân môn (ví dụ: Khám phá khoa học, Làm quen văn học, Tạo hình, v.v.)
2. objectives: { knowledge: string[], skills: string[], attitude: string[], yccdCodes: string[] }
3. preparations: { teacher: string[], children: string[], environment: string[] }
4. procedure: mảng các bước { stepName: string, teacherAction: string[], childrenAction: string[], suggestedQuestions: string[] }
5. evaluation: string (Đánh giá sau hoạt động)`;

  const aiText = await callBackendAI(prompt);

  if (aiText) {
    try {
      const jsonMatch = aiText.match(/```json([\s\S]*?)```/) || aiText.match(/\{[\s\S]*?\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] ? jsonMatch[1].trim() : jsonMatch[0].trim()) : aiText;
      const parsed = JSON.parse(jsonStr);

      if (parsed.procedure && Array.isArray(parsed.procedure)) {
        const yccdItems = (parsed.objectives?.yccdCodes || ['NT1', 'NN1.1']).map((c: string) => {
          const found = findYCCDByCode(c);
          return {
            code: c,
            domain: found ? found.domainName : 'Phát triển tổng hợp',
            content: found ? found.content : 'Thực hiện yêu cầu cần đạt phù hợp lứa tuổi.',
          };
        });

        return sanitizeLessonPlan({
          id: `lesson-${Date.now()}`,
          dayPlanId: dayPlan.id,
          activityName,
          activityType: parsed.activityType || 'Hoạt động giáo dục trọng tâm',
          themeName: dayPlan.themeName,
          subThemeName: dayPlan.subThemeName,
          ageGroupId: dayPlan.ageGroupId,
          durationMinutes: duration,
          isSteam: isSteam,
          steamModel: isSteam ? (is56 ? '5E' : 'Tích hợp STEAM') : undefined,
          objectives: {
            knowledge: parsed.objectives?.knowledge || ['Trẻ nhận biết nội dung chính của hoạt động.'],
            skills: parsed.objectives?.skills || ['Rèn luyện kỹ năng quan sát, lắng nghe và thao tác.'],
            attitude: parsed.objectives?.attitude || ['Trẻ hứng thú, tích cực tham gia trải nghiệm.'],
            yccdItems,
          },
          preparations: {
            teacher: parsed.preparations?.teacher || ['Giáo án, đồ dùng trực quan, nhạc chủ đề.'],
            children: parsed.preparations?.children || ['Tâm thế vui vẻ, trang phục gọn gàng.'],
            environment: parsed.preparations?.environment || ['Lớp học thoáng mát, đảm bảo an toàn.'],
          },
          procedure: parsed.procedure,
          evaluation: parsed.evaluation || 'Trẻ hoàn thành mục tiêu, có thái độ tích cực.',
        })!;
      }
    } catch (e) {
      console.warn('Parse lesson plan AI failed, applying structured preschool lesson plan template:', e);
    }
  }

  return buildDefaultLessonPlan(dayPlan, schoolInfo, activityOverride);
}

// Structured preschool lesson plan builder (synchronous fallback & initialization)
export function buildDefaultLessonPlan(
  dayPlan: DayPlan,
  schoolInfo: LocalAndSchoolInfo,
  activityOverride?: string
): LessonPlan {
  const activityName = activityOverride || dayPlan.mainFocusActivity.name;
  const isNhaTre = dayPlan.ageGroupId.startsWith('nha-tre');
  const is56 = dayPlan.ageGroupId === 'mau-giao-5-6';
  const duration = isNhaTre ? 15 : is56 ? 30 : 25;
  const isBac = isBacHoContent(activityName) || isBacHoContent(dayPlan.subThemeName) || isBacHoContent(dayPlan.themeName);

  const isSteam = !isBac && !isNhaTre && (activityName.toLowerCase().includes('steam') || activityName.toLowerCase().includes('khám phá') || activityName.toLowerCase().includes('tạo hình') || schoolInfo.hasSteamFacility);

  const defaultYccdList = isBac ? ['NT1.2', 'TX1', 'NgT1.1'] : (isNhaTre ? ['NN1.1', 'NT1'] : ['NT1', 'NN1.1', 'NgT1.1']);
  const yccdObjects = defaultYccdList.map(code => {
    const item = findYCCDByCode(code);
    return {
      code,
      domain: item ? item.domainName : 'Giáo dục toàn diện',
      content: item ? item.content : 'Phù hợp mục tiêu giáo dục mầm non mới.',
    };
  });

  return sanitizeLessonPlan({
    id: `lesson-${Date.now()}`,
    dayPlanId: dayPlan.id,
    activityName,
    activityType: isBac
      ? (isNhaTre ? 'Nhận biết tập nói & Giáo dục tình cảm' : 'Khám phá xã hội & Giáo dục tình cảm')
      : (isNhaTre ? 'Nhận biết tập nói & Vận động giác quan' : 'Hoạt động học tích hợp'),
    themeName: dayPlan.themeName,
    subThemeName: dayPlan.subThemeName,
    ageGroupId: dayPlan.ageGroupId,
    durationMinutes: duration,
    isSteam,
    steamModel: isSteam ? (is56 ? '5E' : 'Tích hợp STEAM') : undefined,
    objectives: {
      knowledge: isBac ? [
        'Trẻ biết Chủ tịch Hồ Chí Minh là vị lãnh tụ vĩ đại, Người cha già kính yêu của dân tộc Việt Nam.',
        'Trẻ biết tình cảm bao la, sự chăm lo ân cần của Bác Hồ dành cho các cháu thiếu niên, nhi đồng.',
        'Trẻ biết ngày 19 tháng 5 là ngày kỷ niệm sinh nhật Bác Hồ kính yêu.',
      ] : (isNhaTre ? [
        `Trẻ nhận biết và gọi được tên: ${activityName}.`,
        'Trẻ nhận biết màu sắc và hình dạng cơ bản thông qua vật thật.',
      ] : [
        `Trẻ hiểu được đặc điểm, cấu tạo, công dụng của đối tượng trong hoạt động: ${activityName}.`,
        `Trẻ biết vận dụng hiểu biết vào thực tế đời sống tại địa phương ${schoolInfo.commune || 'nơi trẻ ở'}.`,
      ]),
      skills: isBac ? [
        'Rèn luyện kỹ năng quan sát tranh ảnh tư liệu, lắng nghe cô kể chuyện về Bác Hồ.',
        'Phát triển ngôn ngữ mạch lạc khi bày tỏ tình cảm kính yêu, lòng biết ơn đối với Bác Hồ.',
        'Rèn luyện sự khéo léo khi đọc thơ, hát múa hoặc làm những bông hoa tươi dâng lên Bác.',
      ] : (isNhaTre ? [
        'Phát triển ngôn ngữ mạch lạc, phát âm rõ ràng từ đơn/từ đôi.',
        'Rèn luyện cử động khéo léo của các ngón tay và khả năng chú ý.',
      ] : [
        'Phát triển kỹ năng quan sát, phán đoán, so sánh và giải quyết vấn đề.',
        'Kỹ năng phối hợp nhóm, lắng nghe và chia sẻ ý kiến với bạn bè.',
      ]),
      attitude: isBac ? [
        'Trẻ thể hiện lòng biết ơn sâu sắc và tình cảm kính yêu đối với Bác Hồ kính yêu.',
        'Có ý thức chăm ngoan, học giỏi, đoàn kết, yêu thương bạn bè và vâng lời cô giáo, cha mẹ theo 5 điều Bác Hồ dạy.',
      ] : [
        'Trẻ hào hứng, chủ động tham gia hoạt động từ đầu đến cuối.',
        'Biết giữ gìn đồ dùng đồ chơi và thể hiện tình cảm gắn bó với cô và bạn.',
      ],
      yccdItems: yccdObjects,
    },
    preparations: {
      teacher: isBac ? [
        'Ảnh Bác Hồ với thiếu nhi treo trang trọng, video tư liệu ngắn về Bác Hồ.',
        'Nhạc các bài hát ca ngợi Bác Hồ ("Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng", "Đêm qua em mơ gặp Bác Hồ").',
        'Lẵng hoa, hoa tươi chuẩn bị cho hoạt động dâng hoa mừng sinh nhật Bác 19/5.',
      ] : [
        'Vật thật / mô hình / tranh ảnh sinh động về chủ đề.',
        'Nhạc không lời nhẹ nhàng và bài hát phù hợp hoạt động.',
        'Thiết kế không gian lớp học rộng rãi, an toàn, thân thiện.',
      ],
      children: isBac ? [
        'Trang phục chỉnh tề, sạch đẹp, tâm thế trang nghiêm, vui tươi.',
        'Hoa giấy, sáp màu, giấy màu để làm sản phẩm dâng lên Bác.',
      ] : [
        'Trang phục gọn gàng, tâm thế thoải mái, sạch sẽ.',
        'Đồ dùng học liệu trải nghiệm cá nhân và theo nhóm nhỏ.',
      ],
      environment: [
        isBac ? 'Lớp học thoáng mát, trang nghiêm, góc chủ đề bố trí đẹp mắt và đủ ánh sáng.' : 'Góc trải nghiệm bố trí logic, đủ ánh sáng và thoáng mát.',
      ],
    },
    procedure: isBac ? [
      {
        stepName: '1. Ổn định tổ chức & Hướng về Bác Hồ kính yêu (2 - 3 phút)',
        teacherAction: [
          'Cô cho trẻ lắng nghe giai điệu bài hát "Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng".',
          'Cô cùng trẻ hướng về ảnh Bác Hồ treo trang trọng trên tường lớp học, trò chuyện bằng giọng trang trọng, ấm áp về Bác.',
        ],
        childrenAction: [
          'Trẻ chăm chú lắng nghe nhạc, hướng mắt nhìn về ảnh Bác Hồ với nụ cười hiền từ.',
          'Hào hứng chia sẻ những điều mình đã biết về Bác Hồ.',
        ],
        suggestedQuestions: [
          'Các con có nhận ra người trong bức ảnh là ai không?',
          'Bác Hồ có nụ cười và ánh mắt như thế nào khi nhìn các cháu thiếu nhi?',
        ],
      },
      {
        stepName: '2. Khám phá & Bày tỏ tình cảm kính yêu Bác Hồ (12 - 18 phút)',
        teacherAction: [
          'Cô giới thiệu cho trẻ xem các hình ảnh tư liệu: Bác Hồ bế em bé, Bác Hồ chia kẹo cho thiếu nhi, Bác Hồ múa hát cùng các bạn nhỏ.',
          'Giới thiệu ý nghĩa ngày sinh nhật Bác 19/5 - ngày cả nước kỷ niệm ngày sinh của Người cha già kính yêu của dân tộc.',
          'Giáo dục trẻ: Tuy Bác đã đi xa nhưng hình ảnh và tình yêu thương của Bác luôn ở trong tim mỗi người dân Việt Nam và các cháu thiếu nhi.',
          'Hướng dẫn trẻ thực hành dâng tình cảm lên Bác: đọc thơ "Ảnh Bác", hát múa, làm lẵng hoa tươi dâng lên mừng sinh nhật Bác.',
        ],
        childrenAction: [
          'Trẻ quan sát hình ảnh tư liệu, lắng nghe cô kể chuyện với thái độ kính cẩn, say mê.',
          'Trẻ cùng nhau đọc thơ "Ảnh Bác" hoặc hát vang các bài hát ca ngợi Bác Hồ.',
          'Tự tay làm bông hoa tươi thắm hoặc tranh vẽ để dâng lên mừng sinh nhật Bác.',
        ],
        suggestedQuestions: [
          'Khi xem ảnh, con thấy Bác Hồ dành tình cảm cho các bạn nhỏ như thế nào?',
          'Ngày 19 tháng 5 là ngày gì đặc biệt của Bác Hồ các con nhỉ?',
          'Để xứng đáng là cháu ngoan Bác Hồ, chúng mình cần làm những việc tốt gì?',
        ],
      },
      {
        stepName: '3. Kết thúc & Khắc ghi lời Bác dạy (2 - 3 phút)',
        teacherAction: [
          'Cô tập hợp trẻ, cùng cất cao lời ca bài hát mừng sinh nhật Bác.',
          'Nhắc nhở và khắc sâu 5 điều Bác Hồ dạy thiếu niên, nhi đồng.',
          'Tuyên dương cả lớp đã tích cực, chăm ngoan trong giờ học.',
        ],
        childrenAction: [
          'Trẻ cùng cô hát vang bài ca kính dâng Bác Hồ.',
          'Đồng thanh nhắc lại lời hứa chăm ngoan, vâng lời cô giáo và cha mẹ.',
        ],
        suggestedQuestions: [
          'Về nhà con sẽ khoe với ông bà, bố mẹ những điều gì về Bác Hồ kính yêu?',
        ],
      },
    ] : isSteam ? [
      {
        stepName: '1. Gắn kết (Engage) - Khơi gợi tò mò',
        teacherAction: [
          'Cô tạo tình huống bất ngờ (hộp quà bí mật / đoạn video ngắn về địa phương).',
          'Tạo bầu không khí vui tươi, dẫn dắt trẻ cùng suy nghĩ về vấn đề cần giải quyết.',
        ],
        childrenAction: [
          'Trẻ chăm chú quan sát, hào hứng khám phá và đưa ra dự đoán ban đầu.',
        ],
        suggestedQuestions: [
          'Các con nhìn thấy điều gì kỳ diệu ở đây?',
          'Theo các con, làm thế nào để chúng mình giải quyết được việc này?',
        ],
      },
      {
        stepName: '2. Khám phá (Explore) - Trải nghiệm thực tế',
        teacherAction: [
          'Chia trẻ thành các nhóm nhỏ, phát học liệu trải nghiệm cho từng nhóm.',
          'Cô đóng vai trò người đồng hành, khích lệ trẻ tự do sờ, thử nghiệm và quan sát.',
        ],
        childrenAction: [
          'Trẻ cùng bạn thảo luận, sờ nắn, thử ghép nối và ghi nhận hiện tượng.',
        ],
        suggestedQuestions: [
          'Con cảm thấy bề mặt này như thế nào khi chạm vào?',
          'Nếu chúng mình thay đổi cách làm thì điều gì sẽ xảy ra?',
        ],
      },
      {
        stepName: '3. Giải thích (Explain) - Chia sẻ ý kiến',
        teacherAction: [
          'Mời đại diện các nhóm chia sẻ những điều mình vừa phát hiện được.',
          'Cô chuẩn hóa kiến thức một cách ngắn gọn, dễ hiểu, phù hợp độ tuổi.',
        ],
        childrenAction: [
          'Trẻ tự tin phát biểu suy nghĩ, lắng nghe ý kiến của bạn.',
        ],
        suggestedQuestions: [
          'Vì sao con lại chọn cách làm như vậy?',
          'Điều gì làm con cảm thấy bất ngờ nhất?',
        ],
      },
      {
        stepName: '4. Áp dụng (Elaborate) - Sáng tạo sản phẩm',
        teacherAction: [
          'Giao thử thách sáng tạo: Ứng dụng kiến thức vừa học để tạo ra sản phẩm.',
          'Bao quát lớp, động viên những trẻ còn rụt rè.',
        ],
        childrenAction: [
          'Trẻ say sưa thực hành tạo ra sản phẩm mang dấu ấn cá nhân hoặc nhóm.',
        ],
        suggestedQuestions: [
          'Sản phẩm này của con dùng để làm gì?',
          'Con muốn tặng sản phẩm này cho ai?',
        ],
      },
      {
        stepName: '5. Đánh giá (Evaluate) - Tự hào thành quả',
        teacherAction: [
          'Tổ chức cho trẻ trưng bày sản phẩm, cùng ngắm nhìn và khen ngợi sự nỗ lực.',
          'Nhận xét tích cực, khích lệ tinh thần học hỏi.',
        ],
        childrenAction: [
          'Trẻ tự hào giới thiệu sản phẩm của mình, vỗ tay tán thưởng bạn.',
        ],
        suggestedQuestions: [
          'Hôm nay con thích nhất bước hoạt động nào?',
        ],
      },
    ] : [
      {
        stepName: '1. Ổn định tổ chức & Gây hứng thú (2 - 3 phút)',
        teacherAction: [
          isNhaTre
            ? 'Cô bật bài hát vui nhộn, gọi trẻ lại gần và âu yếm trò chuyện.'
            : 'Tổ chức trò chơi khởi động nhẹ nhàng, trò chuyện dẫn dắt vào bài học.',
        ],
        childrenAction: [
          'Trẻ vui vẻ hưởng ứng, xúm xít quanh cô, trả lời câu hỏi mộc mạc.',
        ],
        suggestedQuestions: [
          'Hôm nay các con cảm thấy thế nào khi đến lớp?',
          'Các con có đoán được hôm nay cô mang đến món quà gì không?',
        ],
      },
      {
        stepName: '2. Nội dung trọng tâm - Phương pháp & Hình thức tổ chức (10 - 20 phút)',
        teacherAction: [
          'Cô giới thiệu đối tượng quan sát / hướng dẫn mẫu tỉ mỉ, ngôn ngữ trong sáng, chuẩn mực.',
          'Cho trẻ trực tiếp thực hành trải nghiệm, thao tác với học liệu.',
          'Cô quan sát, khích lệ cá nhân trẻ, điều chỉnh kịp thời các thao tác chưa đúng.',
        ],
        childrenAction: [
          'Trẻ chăm chú quan sát cô làm mẫu.',
          'Tự tay thao tác, khám phá và trao đổi cùng bạn bên cạnh.',
        ],
        suggestedQuestions: [
          'Cái này có màu gì/hình gì đây con?',
          'Con đang làm hành động gì thế?',
        ],
      },
      {
        stepName: '3. Kết thúc & Đánh giá tuyên dương (2 - 3 phút)',
        teacherAction: [
          'Cô củng cố lại bài học nhẹ nhàng.',
          'Khen ngợi sự tiến bộ của cả lớp và từng cá nhân nổi bật.',
          'Nhắc trẻ cùng cô thu dọn đồ dùng đồ chơi vào đúng nơi quy định.',
        ],
        childrenAction: [
          'Trẻ vui vẻ lắng nghe lời khen, cùng cô cất đồ chơi gọn gàng.',
        ],
        suggestedQuestions: [
          'Về nhà con sẽ kể cho bố mẹ nghe hoạt động gì hôm nay?',
        ],
      },
    ],
    evaluation: 'Đa số trẻ nắm được mục tiêu bài học, hứng thú tham gia, thao tác khéo léo và biết giữ gìn sản phẩm.',
  })!;
}
