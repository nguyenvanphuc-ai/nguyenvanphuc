import { DayPlan, LessonPlan, LocalAndSchoolInfo, ThemePlan, WeekPlan, YearPlan } from '../types';
import { safeString } from './textUtils';

export function copyToClipboard(text: string, onSuccess?: () => void) {
  navigator.clipboard.writeText(text).then(() => {
    if (onSuccess) onSuccess();
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    if (onSuccess) onSuccess();
  });
}

export function exportToWord(filename: string, htmlContent: string) {
  const header = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' 
          xmlns:w='urn:schemas-microsoft-com:office:word' 
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${filename}</title>
      <style>
        body { font-family: 'Times New Roman', Times, serif; font-size: 13pt; line-height: 1.35; color: #000; margin: 1.5cm; }
        h1, h2, h3, h4 { font-family: 'Times New Roman', Times, serif; text-align: center; }
        h1 { font-size: 16pt; font-weight: bold; margin-bottom: 6px; margin-top: 10px; }
        h2 { font-size: 14pt; font-weight: bold; margin-bottom: 5px; margin-top: 8px; }
        h3 { font-size: 13pt; font-weight: bold; margin-bottom: 5px; margin-top: 6px; }
        table { border-collapse: collapse; width: 100%; margin-top: 12px; margin-bottom: 12px; }
        th, td { border: 1px solid #000; padding: 6px 8px; text-align: left; vertical-align: top; font-size: 11pt; }
        th { background-color: #f2f2f2; font-weight: bold; text-align: center; }
        .text-center { text-align: center; }
        .text-bold { font-weight: bold; }
        .signature-table { border: none !important; margin-top: 25px; margin-bottom: 20px; width: 100%; }
        .signature-table td { border: none !important; text-align: center; font-size: 12pt; padding: 5px; }
        .header-table { border: none !important; width: 100%; margin-bottom: 15px; }
        .header-table td { border: none !important; padding: 0; }
        .page-break { page-break-before: always; mso-break-type: section-break; clear: both; height: 1px; }
        .footer-note { font-size: 10pt; font-style: italic; color: #555; text-align: center; margin-top: 25px; border-top: 1px dashed #999; padding-top: 10px; }
        .section-box { border: 1px solid #000; padding: 10px; margin-top: 10px; margin-bottom: 10px; }
        ul { margin-top: 4px; margin-bottom: 8px; padding-left: 20px; }
        li { margin-bottom: 3px; }
      </style>
    </head>
    <body>
  `;
  const footer = `</body></html>`;
  const sourceHTML = header + htmlContent + footer;
  const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
  const fileDownload = document.createElement('a');
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = `${filename}.doc`;
  fileDownload.click();
  document.body.removeChild(fileDownload);
}

export function printDocument() {
  window.print();
}

export function getStandardDocumentHeaderHTML(): string {
  return `
    <table class="header-table" style="width: 100%; margin-bottom: 20px;">
      <tr>
        <td style="width: 50%; text-align: center; vertical-align: top; font-size: 11pt;">
          ỦY BAN NHÂN DÂN XÃ ....................<br/>
          <strong>TRƯỜNG MẦM NON ....................</strong><br/>
          <span style="font-size: 9pt;">----------------</span>
        </td>
        <td style="width: 50%; text-align: center; vertical-align: top; font-size: 11pt;">
          <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br/>
          <strong>Độc lập - Tự do - Hạnh phúc</strong><br/>
          <span style="font-size: 9pt;">----------------</span><br/>
          <em>............., ngày ..... tháng ..... năm 202...</em>
        </td>
      </tr>
    </table>
  `;
}

// 1. KẾ HOẠCH NĂM HTML
export function generateYearPlanPrintHTML(plan: YearPlan, schoolInfo: LocalAndSchoolInfo): string {
  const rowsHTML = plan.themes.map((t, idx) => `
    <tr>
      <td class="text-center">${idx + 1}</td>
      <td class="text-bold">${t.themeName}</td>
      <td>${t.subThemes.map((st, i) => `Tuần ${i + 1}: ${st}`).join('<br/>')}</td>
      <td class="text-center">${t.durationWeeks} tuần</td>
      <td class="text-center">Tuần ${t.startWeek} - ${t.endWeek}</td>
      <td><strong>${t.focusYccdCodes.join(', ')}</strong></td>
      <td>${safeString(t.educationalContent)}</td>
      <td>${safeString(t.expectedActivities)}</td>
    </tr>
  `).join('');

  return `
    ${getStandardDocumentHeaderHTML()}

    <h1>KẾ HOẠCH GIÁO DỤC NĂM HỌC ${schoolInfo.schoolYear || '2025 - 2026'}</h1>
    <h3>Lớp: ${schoolInfo.className || '..........'} | Độ tuổi: ${plan.ageGroupId} | Số trẻ: ${schoolInfo.childrenCount || '.....'}</h3>
    <p class="text-center"><em>Theo Chương trình Giáo dục Mầm non mới (Quyết định 388/QĐ-BGDĐT)</em></p>

    <table>
      <thead>
        <tr>
          <th style="width: 5%;">STT</th>
          <th style="width: 15%;">Tên chủ đề</th>
          <th style="width: 18%;">Nhánh chủ đề (Mỗi tuần 1 nhánh)</th>
          <th style="width: 7%;">Thời lượng</th>
          <th style="width: 8%;">Thời gian thực hiện</th>
          <th style="width: 10%;">Mã YCCĐ trọng tâm</th>
          <th style="width: 20%;">Nội dung giáo dục</th>
          <th style="width: 17%;">Hoạt động dự kiến</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHTML}
      </tbody>
    </table>

    <table class="signature-table">
      <tr>
        <td style="width: 33%;">
          <strong>BAN GIÁM HIỆU DUYỆT</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
        <td style="width: 33%;">
          <strong>TỔ TRƯỞNG CHUYÊN MÔN</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
        <td style="width: 34%;">
          <strong>GIÁO VIÊN PHỤ TRÁCH LỚP</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
      </tr>
    </table>

    <div class="footer-note">
      © Bản quyền Kế hoạch GDMN mới - QĐ 388/QĐ-BGDĐT. Tác giả: Nguyễn Văn Phúc (Zalo: 0949.379.531).
    </div>
  `;
}

// 2. KẾ HOẠCH CHỦ ĐỀ HTML
export function generateThemePlanPrintHTML(themePlan: ThemePlan, schoolInfo: LocalAndSchoolInfo): string {
  return `
    ${getStandardDocumentHeaderHTML()}

    <h1>KẾ HOẠCH GIÁO DỤC CHỦ ĐỀ</h1>
    <h2>CHỦ ĐỀ: ${themePlan.themeName.toUpperCase()}</h2>
    <p class="text-center">
      <strong>Thời lượng:</strong> ${themePlan.durationWeeks} tuần (${themePlan.subThemes.length} nhánh) | 
      <strong>Độ tuổi:</strong> ${themePlan.ageGroupId}
    </p>

    <div style="margin-top: 15px; margin-bottom: 15px;">
      <p><strong>Mục tiêu giáo dục của chủ đề:</strong></p>
      <p style="text-align: justify;">${themePlan.educationalGoal}</p>
      <p><strong>Mã YCCĐ trọng tâm tích hợp:</strong> ${themePlan.selectedYccdCodes.join(', ')}</p>
    </div>

    <h2>I. MẠNG NỘI DUNG</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 30%;">Nhánh chủ đề (Mỗi tuần 1 nhánh)</th>
          <th style="width: 70%;">Nội dung giáo dục cụ thể</th>
        </tr>
      </thead>
      <tbody>
        ${themePlan.contentNetwork.map(n => `
          <tr>
            <td class="text-bold">${n.title}</td>
            <td>${n.subContents.map(c => `• ${c}<br/>`).join('')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <h2>II. MẠNG HOẠT ĐỘNG</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 30%;">Lĩnh vực / Loại hoạt động</th>
          <th style="width: 70%;">Hoạt động giáo dục cụ thể & Mã YCCĐ</th>
        </tr>
      </thead>
      <tbody>
        ${themePlan.activityNetwork.map(a => `
          <tr>
            <td class="text-bold">${a.activityType}</td>
            <td>${a.activities.map(act => `• ${act.name} <em>[${act.yccdCodes.join(', ')}]</em><br/>`).join('')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <table class="signature-table">
      <tr>
        <td style="width: 50%;">
          <strong>TỔ TRƯỞNG CHUYÊN MÔN KÝ DUYỆT</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
        <td style="width: 50%;">
          <strong>GIÁO VIÊN XÂY DỰNG KẾ HOẠCH</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
      </tr>
    </table>

    <div class="footer-note">
      © Bản quyền Kế hoạch GDMN mới - QĐ 388/QĐ-BGDĐT. Tác giả: Nguyễn Văn Phúc (Zalo: 0949.379.531).
    </div>
  `;
}

// 3. KẾ HOẠCH TUẦN HTML
export function generateWeekPlanPrintHTML(week: WeekPlan, schoolInfo: LocalAndSchoolInfo): string {
  const daysHeader = week.days.map(d => `<th style="width: 18%;">${d.dayOfWeek}</th>`).join('');
  
  const timeSlots = [
    'Đón trẻ',
    'Thể dục sáng',
    'Hoạt động học',
    'Hoạt động ngoài trời',
    'Hoạt động góc',
    'Ăn – ngủ – vệ sinh',
    'Hoạt động chiều',
    'Trả trẻ',
  ];

  const rows = timeSlots.map((slotName, slotIdx) => {
    const cells = week.days.map(day => {
      const slot = day.slots.find(s => s.timeSlotName.toLowerCase().includes(slotName.toLowerCase()) || s.timeSlotName === slotName) || day.slots[slotIdx];
      if (!slot) return '<td>-</td>';
      const yccdBadge = slot.yccdCodes && slot.yccdCodes.length > 0 ? `<br/><small style="color: #0369a1;"><strong>[${slot.yccdCodes.join(', ')}]</strong></small>` : '';
      return `<td>${slot.activityName}${yccdBadge}</td>`;
    }).join('');

    return `
      <tr>
        <td class="text-bold" style="background-color: #f9fafb;">${slotName}</td>
        ${cells}
      </tr>
    `;
  }).join('');

  return `
    ${getStandardDocumentHeaderHTML()}

    <h1>KẾ HOẠCH GIÁO DỤC TUẦN ${week.weekNumber}</h1>
    <h2>CHỦ ĐỀ LỚN: ${week.themeName.toUpperCase()}</h2>
    <h3>NHÁNH CHỦ ĐỀ: ${week.subThemeName.toUpperCase()}</h3>
    <p class="text-center"><em>(Mỗi tuần tương ứng 01 nhánh chủ đề theo Chương trình GDMN mới QĐ 388/QĐ-BGDĐT)</em></p>

    <table>
      <thead>
        <tr>
          <th style="width: 10%;">Thời điểm / Hoạt động</th>
          ${daysHeader}
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>

    <p><strong>Đánh giá thực hiện tuần:</strong> ${week.weekEvaluation || 'Trẻ tham gia tích cực, đạt mục tiêu đề ra.'}</p>

    <table class="signature-table">
      <tr>
        <td style="width: 50%;">
          <strong>TỔ TRƯỞNG CHUYÊN MÔN KÝ DUYỆT</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
        <td style="width: 50%;">
          <strong>GIÁO VIÊN THỰC HIỆN</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
      </tr>
    </table>

    <div class="footer-note">
      © Bản quyền Kế hoạch GDMN mới - QĐ 388/QĐ-BGDĐT. Tác giả: Nguyễn Văn Phúc (Zalo: 0949.379.531).
    </div>
  `;
}

// 4. KẾ HOẠCH NGÀY HTML
export function generateDayPlanPrintHTML(dayPlan: DayPlan, schoolInfo: LocalAndSchoolInfo): string {
  return `
    ${getStandardDocumentHeaderHTML()}

    <h1>KẾ HOẠCH GIÁO DỤC NGÀY</h1>
    <h2>${dayPlan.dayOfWeek.toUpperCase()}</h2>
    <p class="text-center">
      <strong>Chủ đề:</strong> ${dayPlan.themeName} | <strong>Nhánh:</strong> ${dayPlan.subThemeName}
    </p>

    <h2>I. HOẠT ĐỘNG TRỌNG TÂM TRONG NGÀY</h2>
    <div class="section-box">
      <p><strong>Tên hoạt động:</strong> ${dayPlan.mainFocusActivity.name}</p>
      <p><strong>Lĩnh vực phát triển:</strong> ${dayPlan.mainFocusActivity.learningArea}</p>
      <p><strong>Mã YCCĐ trọng tâm:</strong> ${dayPlan.mainFocusActivity.yccdCodes.join(', ')}</p>
      <p><strong>Mục tiêu hoạt động:</strong> ${dayPlan.mainFocusActivity.objectives}</p>
    </div>

    <h2>II. CHẾ ĐỘ SINH HOẠT TRONG NGÀY (10 THỜI ĐIỂM THEO QĐ 388)</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Thời điểm</th>
          <th style="width: 55%;">Nội dung hoạt động</th>
          <th style="width: 20%;">Mã YCCĐ tích hợp</th>
        </tr>
      </thead>
      <tbody>
        ${dayPlan.schedule.map(s => `
          <tr>
            <td class="text-bold">${s.period}</td>
            <td>${s.activityName}</td>
            <td class="text-center"><strong>${s.yccdCodes.join(', ')}</strong></td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <p><strong>Nhận xét, lưu ý trong ngày của giáo viên:</strong> ${dayPlan.teacherNotes || 'Trẻ ngoan, nề nếp tốt, hứng thú tham gia các hoạt động trong ngày.'}</p>

    <table class="signature-table">
      <tr>
        <td style="width: 50%;">
          <strong>TỔ TRƯỞNG CHUYÊN MÔN KÝ DUYỆT</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
        <td style="width: 50%;">
          <strong>GIÁO VIÊN THỰC HIỆN</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
      </tr>
    </table>

    <div class="footer-note">
      © Bản quyền Kế hoạch GDMN mới - QĐ 388/QĐ-BGDĐT. Tác giả: Nguyễn Văn Phúc (Zalo: 0949.379.531).
    </div>
  `;
}

// 5. GIÁO ÁN CHI TIẾT HTML
export function generateLessonPlanPrintHTML(lesson: LessonPlan, schoolInfo: LocalAndSchoolInfo): string {
  const objectivesHTML = `
    <p><strong>1. Mục tiêu và Yêu cầu cần đạt:</strong></p>
    <ul>
      <li><strong>Kiến thức:</strong> ${lesson.objectives.knowledge.join('; ')}</li>
      <li><strong>Kỹ năng:</strong> ${lesson.objectives.skills.join('; ')}</li>
      <li><strong>Thái độ:</strong> ${lesson.objectives.attitude.join('; ')}</li>
      <li><strong>YCCĐ đã mã hóa (QĐ 388):</strong>
        <ul>
          ${lesson.objectives.yccdItems.map(y => `<li><strong>${y.code} - ${y.domain}:</strong> ${y.content}</li>`).join('')}
        </ul>
      </li>
    </ul>
  `;

  const prepHTML = `
    <p><strong>2. Chuẩn bị:</strong></p>
    <ul>
      <li><strong>Đồ dùng của cô:</strong> ${lesson.preparations.teacher.join('; ')}</li>
      <li><strong>Đồ dùng của trẻ:</strong> ${lesson.preparations.children.join('; ')}</li>
      <li><strong>Môi trường hoạt động:</strong> ${lesson.preparations.environment.join('; ')}</li>
    </ul>
  `;

  const stepsHTML = lesson.procedure.map(step => `
    <tr>
      <td class="text-bold" style="width: 25%;">${step.stepName}</td>
      <td style="width: 40%;">
        ${step.teacherAction.map(a => `<p>• ${a}</p>`).join('')}
        ${step.suggestedQuestions.length > 0 ? `<p><em>* Câu hỏi gợi mở:</em> ${step.suggestedQuestions.join('; ')}</p>` : ''}
      </td>
      <td style="width: 35%;">
        ${step.childrenAction.map(a => `<p>• ${a}</p>`).join('')}
      </td>
    </tr>
  `).join('');

  return `
    ${getStandardDocumentHeaderHTML()}

    <h1>GIÁO ÁN TỔ CHỨC HOẠT ĐỘNG GIÁO DỤC</h1>
    <h2>TÊN HOẠT ĐỘNG: ${lesson.activityName.toUpperCase()}</h2>
    <p class="text-center">
      <strong>Chủ đề:</strong> ${lesson.themeName} | <strong>Nhánh:</strong> ${lesson.subThemeName}<br/>
      <strong>Độ tuổi:</strong> ${lesson.ageGroupId} | <strong>Thời lượng:</strong> ${lesson.durationMinutes} phút | <strong>Phân môn:</strong> ${lesson.activityType}
      ${lesson.isSteam ? ` | <span style="color: #0284c7; font-weight: bold;">Mô hình STEAM: ${lesson.steamModel || 'Tích hợp'}</span>` : ''}
    </p>

    ${objectivesHTML}
    ${prepHTML}

    <p><strong>3. Tiến trình hoạt động giáo dục:</strong></p>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Các bước thực hiện</th>
          <th style="width: 40%;">Hoạt động của cô</th>
          <th style="width: 35%;">Hoạt động của trẻ</th>
        </tr>
      </thead>
      <tbody>
        ${stepsHTML}
      </tbody>
    </table>

    <p><strong>4. Đánh giá cuối hoạt động:</strong></p>
    <p>${lesson.evaluation || 'Trẻ hứng thú, tích cực trải nghiệm, nắm được nội dung trọng tâm hoạt động.'}</p>

    <table class="signature-table">
      <tr>
        <td style="width: 50%;">
          <strong>BAN GIÁM HIỆU / TỔ CHUYÊN MÔN DUYỆT</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
        <td style="width: 50%;">
          <strong>GIÁO VIÊN SOẠN BÀI</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
      </tr>
    </table>

    <div class="footer-note">
      © Bản quyền Kế hoạch GDMN mới - QĐ 388/QĐ-BGDĐT. Tác giả: Nguyễn Văn Phúc (Zalo: 0949.379.531).
    </div>
  `;
}

// 6. TOÀN BỘ HỒ SƠ 5 PHẦN TRONG 1 FILE WORD
export interface FullPlanExportParams {
  yearPlan: YearPlan;
  themePlan: ThemePlan;
  weekPlan: WeekPlan;
  dayPlan: DayPlan;
  lessonPlan: LessonPlan;
  schoolInfo: LocalAndSchoolInfo;
  customFilename?: string;
}

export function generateFullPlanPrintHTML(params: FullPlanExportParams): string {
  const { yearPlan, themePlan, weekPlan, dayPlan, lessonPlan, schoolInfo } = params;

  const yearRows = yearPlan.themes.map((t, idx) => `
    <tr>
      <td class="text-center">${idx + 1}</td>
      <td class="text-bold">${t.themeName}</td>
      <td>${t.subThemes.map((st, i) => `Tuần ${i + 1}: ${st}`).join('<br/>')}</td>
      <td class="text-center">${t.durationWeeks} tuần</td>
      <td class="text-center">Tuần ${t.startWeek} - ${t.endWeek}</td>
      <td><strong>${t.focusYccdCodes.join(', ')}</strong></td>
      <td>${safeString(t.educationalContent)}</td>
      <td>${safeString(t.expectedActivities)}</td>
    </tr>
  `).join('');

  const weekDaysHeader = weekPlan.days.map(d => `<th style="width: 18%;">${d.dayOfWeek}</th>`).join('');
  const weekTimeSlots = [
    'Đón trẻ',
    'Thể dục sáng',
    'Hoạt động học',
    'Hoạt động ngoài trời',
    'Hoạt động góc',
    'Ăn – ngủ – vệ sinh',
    'Hoạt động chiều',
    'Trả trẻ',
  ];
  const weekRows = weekTimeSlots.map((slotName, slotIdx) => {
    const cells = weekPlan.days.map(day => {
      const slot = day.slots.find(s => s.timeSlotName.toLowerCase().includes(slotName.toLowerCase()) || s.timeSlotName === slotName) || day.slots[slotIdx];
      if (!slot) return '<td>-</td>';
      const yccdBadge = slot.yccdCodes && slot.yccdCodes.length > 0 ? `<br/><small style="color: #0369a1;"><strong>[${slot.yccdCodes.join(', ')}]</strong></small>` : '';
      return `<td>${slot.activityName}${yccdBadge}</td>`;
    }).join('');
    return `
      <tr>
        <td class="text-bold" style="background-color: #f9fafb;">${slotName}</td>
        ${cells}
      </tr>
    `;
  }).join('');

  const lessonSteps = lessonPlan.procedure.map(step => `
    <tr>
      <td class="text-bold" style="width: 25%;">${step.stepName}</td>
      <td style="width: 40%;">
        ${step.teacherAction.map(a => `<p>• ${a}</p>`).join('')}
        ${step.suggestedQuestions.length > 0 ? `<p><em>* Câu hỏi gợi mở:</em> ${step.suggestedQuestions.join('; ')}</p>` : ''}
      </td>
      <td style="width: 35%;">
        ${step.childrenAction.map(a => `<p>• ${a}</p>`).join('')}
      </td>
    </tr>
  `).join('');

  return `
    <!-- TRANG BÌA HỒ SƠ -->
    ${getStandardDocumentHeaderHTML()}

    <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
      <h1 style="font-size: 18pt; line-height: 1.4; color: #0369a1;">HỒ SƠ KẾ HOẠCH GIÁO DỤC MẦM NON TOÀN DIỆN</h1>
      <h2 style="font-size: 13pt; margin-top: 5px;">(Thực hiện theo Chương trình thí điểm Quyết định số 388/QĐ-BGDĐT của Bộ GD&ĐT)</h2>
      <h2 style="font-size: 15pt; margin-top: 15px; color: #b45309;">NĂM HỌC: ${schoolInfo.schoolYear || '2025 - 2026'}</h2>
    </div>

    <table style="width: 85%; margin: 0 auto; border: none !important;">
      <tr>
        <td style="border: none; font-size: 12pt; padding: 5px;"><strong>Lớp:</strong> ${schoolInfo.className || '..........'}</td>
        <td style="border: none; font-size: 12pt; padding: 5px;"><strong>Độ tuổi:</strong> ${yearPlan.ageGroupId}</td>
      </tr>
      <tr>
        <td style="border: none; font-size: 12pt; padding: 5px;"><strong>Số lượng trẻ:</strong> ${schoolInfo.childrenCount || '.....'} trẻ</td>
        <td style="border: none; font-size: 12pt; padding: 5px;"><strong>Thời lượng năm học:</strong> ${schoolInfo.programDurationWeeks || 35} tuần</td>
      </tr>
      <tr>
        <td style="border: none; font-size: 12pt; padding: 5px;" colspan="2"><strong>Giáo viên phụ trách lớp:</strong> ............................................................</td>
      </tr>
      <tr>
        <td style="border: none; font-size: 12pt; padding: 5px;" colspan="2"><strong>Địa bàn sau sáp nhập:</strong> ${schoolInfo.commune || '..........'}, ${schoolInfo.province || '..........'}</td>
      </tr>
    </table>

    <div class="section-box" style="margin-top: 30px;">
      <p style="text-align: center; font-weight: bold; font-size: 13pt; margin-bottom: 8px;">DANH MỤC CÁC PHẦN TRONG HỒ SƠ (TẢI TRỌN BỘ 1 FILE)</p>
      <ul style="font-size: 12pt; line-height: 1.8;">
        <li><strong>PHẦN I: KẾ HOẠCH GIÁO DỤC NĂM HỌC</strong> (Toàn bộ ${yearPlan.themes.length} chủ đề và các nhánh tuần)</li>
        <li><strong>PHẦN II: KẾ HOẠCH GIÁO DỤC CHỦ ĐỀ</strong> (Mục tiêu, Mạng nội dung, Mạng hoạt động: "${themePlan.themeName}")</li>
        <li><strong>PHẦN III: KẾ HOẠCH GIÁO DỤC TUẦN</strong> (Chế độ sinh hoạt Tuần ${weekPlan.weekNumber} - Nhánh: "${weekPlan.subThemeName}")</li>
        <li><strong>PHẦN IV: KẾ HOẠCH GIÁO DỤC NGÀY</strong> (Chế độ sinh hoạt 10 thời điểm: ${dayPlan.dayOfWeek})</li>
        <li><strong>PHẦN V: GIÁO ÁN TỔ CHỨC HOẠT ĐỘNG GIÁO DỤC</strong> (Giáo án hoạt động trọng tâm: "${lessonPlan.activityName}")</li>
      </ul>
    </div>

    <!-- NGẮT TRANG SANG PHẦN I -->
    <div class="page-break"></div>

    <!-- PHẦN I: KẾ HOẠCH NĂM -->
    <h1>PHẦN I: KẾ HOẠCH GIÁO DỤC NĂM HỌC ${schoolInfo.schoolYear || '2025 - 2026'}</h1>
    <h3 class="text-center">Lớp: ${schoolInfo.className || '..........'} | Độ tuổi: ${yearPlan.ageGroupId} | Số trẻ: ${schoolInfo.childrenCount || '.....'}</h3>
    <p class="text-center"><em>(Xây dựng theo Chương trình GDMN mới QĐ 388/QĐ-BGDĐT - Tích hợp địa phương sau sáp nhập)</em></p>

    <table>
      <thead>
        <tr>
          <th style="width: 5%;">STT</th>
          <th style="width: 15%;">Tên chủ đề</th>
          <th style="width: 18%;">Nhánh chủ đề (Mỗi tuần 1 nhánh)</th>
          <th style="width: 7%;">Thời lượng</th>
          <th style="width: 8%;">Thời gian thực hiện</th>
          <th style="width: 10%;">Mã YCCĐ trọng tâm</th>
          <th style="width: 20%;">Nội dung giáo dục</th>
          <th style="width: 17%;">Hoạt động dự kiến</th>
        </tr>
      </thead>
      <tbody>
        ${yearRows}
      </tbody>
    </table>

    <table class="signature-table">
      <tr>
        <td style="width: 33%;">
          <strong>BAN GIÁM HIỆU DUYỆT</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
        <td style="width: 33%;">
          <strong>TỔ TRƯỞNG CHUYÊN MÔN</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
        <td style="width: 34%;">
          <strong>GIÁO VIÊN PHỤ TRÁCH LỚP</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
      </tr>
    </table>

    <!-- NGẮT TRANG SANG PHẦN II -->
    <div class="page-break"></div>

    <!-- PHẦN II: KẾ HOẠCH CHỦ ĐỀ -->
    <h1>PHẦN II: KẾ HOẠCH GIÁO DỤC CHỦ ĐỀ</h1>
    <h2>CHỦ ĐỀ: ${themePlan.themeName.toUpperCase()}</h2>
    <p class="text-center">
      <strong>Thời lượng:</strong> ${themePlan.durationWeeks} tuần (${themePlan.subThemes.length} nhánh) | 
      <strong>Độ tuổi:</strong> ${themePlan.ageGroupId}
    </p>

    <div style="margin-top: 15px; margin-bottom: 15px;">
      <p><strong>Mục tiêu giáo dục của chủ đề:</strong></p>
      <p style="text-align: justify;">${themePlan.educationalGoal}</p>
      <p><strong>Mã YCCĐ trọng tâm tích hợp:</strong> ${themePlan.selectedYccdCodes.join(', ')}</p>
    </div>

    <h2>1. MẠNG NỘI DUNG</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 30%;">Nhánh chủ đề (Mỗi tuần 1 nhánh)</th>
          <th style="width: 70%;">Nội dung giáo dục cụ thể</th>
        </tr>
      </thead>
      <tbody>
        ${themePlan.contentNetwork.map(n => `
          <tr>
            <td class="text-bold">${n.title}</td>
            <td>${n.subContents.map(c => `• ${c}<br/>`).join('')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <h2>2. MẠNG HOẠT ĐỘNG</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 30%;">Lĩnh vực / Loại hoạt động</th>
          <th style="width: 70%;">Hoạt động giáo dục cụ thể & Mã YCCĐ</th>
        </tr>
      </thead>
      <tbody>
        ${themePlan.activityNetwork.map(a => `
          <tr>
            <td class="text-bold">${a.activityType}</td>
            <td>${a.activities.map(act => `• ${act.name} <em>[${act.yccdCodes.join(', ')}]</em><br/>`).join('')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <table class="signature-table">
      <tr>
        <td style="width: 50%;">
          <strong>TỔ TRƯỞNG CHUYÊN MÔN KÝ DUYỆT</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
        <td style="width: 50%;">
          <strong>GIÁO VIÊN XÂY DỰNG KẾ HOẠCH</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
      </tr>
    </table>

    <!-- NGẮT TRANG SANG PHẦN III -->
    <div class="page-break"></div>

    <!-- PHẦN III: KẾ HOẠCH TUẦN -->
    <h1>PHẦN III: KẾ HOẠCH GIÁO DỤC TUẦN ${weekPlan.weekNumber}</h1>
    <h2>CHỦ ĐỀ LỚN: ${weekPlan.themeName.toUpperCase()}</h2>
    <h3>NHÁNH CHỦ ĐỀ: ${weekPlan.subThemeName.toUpperCase()}</h3>
    <p class="text-center"><em>(Mỗi tuần tương ứng 01 nhánh chủ đề theo Chương trình GDMN mới QĐ 388/QĐ-BGDĐT)</em></p>

    <table>
      <thead>
        <tr>
          <th style="width: 10%;">Thời điểm / Hoạt động</th>
          ${weekDaysHeader}
        </tr>
      </thead>
      <tbody>
        ${weekRows}
      </tbody>
    </table>

    <p><strong>Đánh giá thực hiện tuần:</strong> ${weekPlan.weekEvaluation || 'Trẻ tham gia tích cực, đạt mục tiêu đề ra.'}</p>

    <table class="signature-table">
      <tr>
        <td style="width: 50%;">
          <strong>TỔ TRƯỞNG CHUYÊN MÔN KÝ DUYỆT</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
        <td style="width: 50%;">
          <strong>GIÁO VIÊN THỰC HIỆN</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
      </tr>
    </table>

    <!-- NGẮT TRANG SANG PHẦN IV -->
    <div class="page-break"></div>

    <!-- PHẦN IV: KẾ HOẠCH NGÀY -->
    <h1>PHẦN IV: KẾ HOẠCH GIÁO DỤC NGÀY</h1>
    <h2>${dayPlan.dayOfWeek.toUpperCase()}</h2>
    <p class="text-center">
      <strong>Chủ đề:</strong> ${dayPlan.themeName} | <strong>Nhánh:</strong> ${dayPlan.subThemeName}
    </p>

    <h2>1. HOẠT ĐỘNG TRỌNG TÂM TRONG NGÀY</h2>
    <div class="section-box">
      <p><strong>Tên hoạt động:</strong> ${dayPlan.mainFocusActivity.name}</p>
      <p><strong>Lĩnh vực phát triển:</strong> ${dayPlan.mainFocusActivity.learningArea}</p>
      <p><strong>Mã YCCĐ trọng tâm:</strong> ${dayPlan.mainFocusActivity.yccdCodes.join(', ')}</p>
      <p><strong>Mục tiêu hoạt động:</strong> ${dayPlan.mainFocusActivity.objectives}</p>
    </div>

    <h2>2. CHẾ ĐỘ SINH HOẠT TRONG NGÀY (10 THỜI ĐIỂM THEO QĐ 388)</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Thời điểm</th>
          <th style="width: 55%;">Nội dung hoạt động</th>
          <th style="width: 20%;">Mã YCCĐ tích hợp</th>
        </tr>
      </thead>
      <tbody>
        ${dayPlan.schedule.map(s => `
          <tr>
            <td class="text-bold">${s.period}</td>
            <td>${s.activityName}</td>
            <td class="text-center"><strong>${s.yccdCodes.join(', ')}</strong></td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <p><strong>Nhận xét, lưu ý trong ngày của giáo viên:</strong> ${dayPlan.teacherNotes || 'Trẻ ngoan, nề nếp tốt, hứng thú tham gia các hoạt động trong ngày.'}</p>

    <table class="signature-table">
      <tr>
        <td style="width: 50%;">
          <strong>TỔ TRƯỞNG CHUYÊN MÔN KÝ DUYỆT</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
        <td style="width: 50%;">
          <strong>GIÁO VIÊN THỰC HIỆN</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
      </tr>
    </table>

    <!-- NGẮT TRANG SANG PHẦN V -->
    <div class="page-break"></div>

    <!-- PHẦN V: GIÁO ÁN -->
    <h1>PHẦN V: GIÁO ÁN TỔ CHỨC HOẠT ĐỘNG GIÁO DỤC</h1>
    <h2>TÊN HOẠT ĐỘNG: ${lessonPlan.activityName.toUpperCase()}</h2>
    <p class="text-center">
      <strong>Chủ đề:</strong> ${lessonPlan.themeName} | <strong>Nhánh:</strong> ${lessonPlan.subThemeName}<br/>
      <strong>Độ tuổi:</strong> ${lessonPlan.ageGroupId} | <strong>Thời lượng:</strong> ${lessonPlan.durationMinutes} phút | <strong>Phân môn:</strong> ${lessonPlan.activityType}
      ${lessonPlan.isSteam ? ` | <span style="color: #0284c7; font-weight: bold;">Mô hình STEAM: ${lessonPlan.steamModel || 'Tích hợp'}</span>` : ''}
    </p>

    <p><strong>1. Mục tiêu và Yêu cầu cần đạt:</strong></p>
    <ul>
      <li><strong>Kiến thức:</strong> ${lessonPlan.objectives.knowledge.join('; ')}</li>
      <li><strong>Kỹ năng:</strong> ${lessonPlan.objectives.skills.join('; ')}</li>
      <li><strong>Thái độ:</strong> ${lessonPlan.objectives.attitude.join('; ')}</li>
      <li><strong>YCCĐ đã mã hóa (QĐ 388):</strong>
        <ul>
          ${lessonPlan.objectives.yccdItems.map(y => `<li><strong>${y.code} - ${y.domain}:</strong> ${y.content}</li>`).join('')}
        </ul>
      </li>
    </ul>

    <p><strong>2. Chuẩn bị:</strong></p>
    <ul>
      <li><strong>Đồ dùng của cô:</strong> ${lessonPlan.preparations.teacher.join('; ')}</li>
      <li><strong>Đồ dùng của trẻ:</strong> ${lessonPlan.preparations.children.join('; ')}</li>
      <li><strong>Môi trường hoạt động:</strong> ${lessonPlan.preparations.environment.join('; ')}</li>
    </ul>

    <p><strong>3. Tiến trình hoạt động giáo dục:</strong></p>
    <table>
      <thead>
        <tr>
          <th style="width: 25%;">Các bước thực hiện</th>
          <th style="width: 40%;">Hoạt động của cô</th>
          <th style="width: 35%;">Hoạt động của trẻ</th>
        </tr>
      </thead>
      <tbody>
        ${lessonSteps}
      </tbody>
    </table>

    <p><strong>4. Đánh giá cuối hoạt động:</strong></p>
    <p>${lessonPlan.evaluation || 'Trẻ hứng thú, tích cực trải nghiệm, nắm được nội dung trọng tâm hoạt động.'}</p>

    <table class="signature-table">
      <tr>
        <td style="width: 50%;">
          <strong>BAN GIÁM HIỆU / TỔ CHUYÊN MÔN DUYỆT</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
        <td style="width: 50%;">
          <strong>GIÁO VIÊN SOẠN BÀI</strong><br/>
          <em>(Ký và ghi rõ họ tên)</em>
          <br/><br/><br/><br/><br/>
        </td>
      </tr>
    </table>

    <div class="footer-note">
      © Bản quyền Kế hoạch GDMN mới - QĐ 388/QĐ-BGDĐT. Tác giả: Nguyễn Văn Phúc (Zalo: 0949.379.531).
    </div>
  `;
}

// Hàm xuất toàn bộ 5 phần ra file Word duy nhất
export function exportFullPlanToWord(params: FullPlanExportParams) {
  const { schoolInfo, customFilename } = params;
  const classNameSlug = (schoolInfo.className || 'GDMN').replace(/[\s/\\:]+/g, '_');
  const filename = customFilename || `Ke_Hoach_GDMN_Tron_Bo_5_Phan_${classNameSlug}_QD388`;
  const html = generateFullPlanPrintHTML(params);
  exportToWord(filename, html);
}
