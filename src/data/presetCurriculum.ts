import { AgeGroupId, ThemePlan, WeekPlan, YearPlanThemeRow } from '../types';

export interface DefaultCurriculumPreset {
  ageGroupId: AgeGroupId;
  themes: YearPlanThemeRow[];
}

// Preset standard year theme structure for 5 age groups - 35 weeks full coverage
export const STANDARD_YEAR_PRESETS: Record<AgeGroupId, YearPlanThemeRow[]> = {
  'nha-tre-18-24': [
    {
      id: 'nt18-t1',
      order: 1,
      themeName: 'Bé và các bạn ở nhóm trẻ',
      durationWeeks: 4,
      startWeek: 1,
      endWeek: 4,
      subThemes: ['Bé đi nhà trẻ vui vẻ', 'Cô giáo dịu hiền và bạn bè', 'Đồ chơi xinh của bé', 'Bé ngoan vâng lời cô'],
      focusYccdCodes: ['TC1', 'TX1', 'NN1'],
      educationalContent: 'Làm quen với cô giáo, bạn bè, đồ dùng đồ chơi quen thuộc, tập chào cô và vẫy tay chào bố mẹ.',
      expectedActivities: 'Chơi với bóng mềm, nghe cô hát Bé đi nhà trẻ, xem tranh đồ chơi to, đi trong vạch quy định.',
    },
    {
      id: 'nt18-t2',
      order: 2,
      themeName: 'Bản thân bé đáng yêu',
      durationWeeks: 3,
      startWeek: 5,
      endWeek: 7,
      subThemes: ['Các bộ phận trên cơ thể bé', 'Bé giữ gìn vệ sinh sạch sẽ', 'Trang phục đẹp của bé'],
      focusYccdCodes: ['TC1.2', 'TX1', 'NN1.1'],
      educationalContent: 'Nhận biết mắt, mũi, miệng, tay, chân; tập thói quen tự xúc cơm, rửa tay, lau mặt sạch sẽ.',
      expectedActivities: 'Chỉ vào bộ phận cơ thể theo nhạc, tập đi dép, nhún nhảy theo bài hát "Đôi dép xinh".',
    },
    {
      id: 'nt18-t3',
      order: 3,
      themeName: 'Gia đình ấm áp của bé',
      durationWeeks: 4,
      startWeek: 8,
      endWeek: 11,
      subThemes: ['Bố mẹ và người thân yêu bé', 'Ngôi nhà xinh xắn của bé', 'Đồ dùng ăn uống của bé', 'Món ăn ngon bé thích'],
      focusYccdCodes: ['TX1.1', 'TC1.1', 'NN1.1'],
      educationalContent: 'Nhận biết các thành viên ruột thịt, đồ dùng ăn uống sinh hoạt hàng ngày, thói quen chào hỏi.',
      expectedActivities: 'Xếp chồng gạch làm nhà, nhận biết bát thìa cá nhân, nghe đọc thơ Yêu mẹ, xâu vòng tặng mẹ.',
    },
    {
      id: 'nt18-t4',
      order: 4,
      themeName: 'Những con vật gần gũi',
      durationWeeks: 4,
      startWeek: 12,
      endWeek: 15,
      subThemes: ['Bạn cún ngoan, bạn mèo meo meo', 'Đàn gà con lông vàng', 'Những chú chim hót líu lo', 'Đàn cá nhỏ bơi lội'],
      focusYccdCodes: ['NT1.2', 'NN1.1', 'TC1.1'],
      educationalContent: 'Nhận biết tên gọi, tiếng kêu, hình dáng con vật nuôi gần gũi trong gia đình và xung quanh.',
      expectedActivities: 'Bắt chước tiếng kêu con vật, chấm màu làm hạt thóc cho gà, vận động theo bài Đàn gà trong sân.',
    },
    {
      id: 'nt18-t5',
      order: 5,
      themeName: 'Cây và hoa quanh bé',
      durationWeeks: 4,
      startWeek: 16,
      endWeek: 19,
      subThemes: ['Cây xanh che bóng mát', 'Những bông hoa rực rỡ sắc màu', 'Quả ngọt thơm ngon bé thích', 'Rau xanh củ quả tốt cho sức khỏe'],
      focusYccdCodes: ['NT1', 'NgT1.1', 'TC1.2'],
      educationalContent: 'Nhận biết màu sắc đỏ - vàng - xanh, sờ lá cây, ngắm hoa, nếm vị quả ngọt thơm ngon.',
      expectedActivities: 'Tưới cây cùng cô, nặn quả tròn lăn dài, vận động bài Hoa trong vườn, rửa tay sạch trước khi ăn hoa quả.',
    },
    {
      id: 'nt18-t6',
      order: 6,
      themeName: 'Phương tiện giao thông bé thấy',
      durationWeeks: 4,
      startWeek: 20,
      endWeek: 23,
      subThemes: ['Xe máy bíp bíp bon bon', 'Xe đạp cọc cạch', 'Ô tô bon bon trên đường', 'Tàu hỏa xình xịch, máy bay trên trời'],
      focusYccdCodes: ['NT1.2', 'TC1', 'TC2'],
      educationalContent: 'Nhận biết phương tiện đi lại trên đường bộ quanh nhà, đội mũ bảo hiểm khi ngồi xe máy.',
      expectedActivities: 'Lái xe vòng quanh lớp, dán bánh xe tròn, trò chơi đèn đỏ dừng lại đèn xanh đi tiếp.',
    },
    {
      id: 'nt18-t7',
      order: 7,
      themeName: 'Nước và các hiện tượng tự nhiên quanh bé',
      durationWeeks: 4,
      startWeek: 24,
      endWeek: 27,
      subThemes: ['Nước mát bé uống và tắm giặt', 'Trời nắng, trời mưa mát mẻ', 'Gió mát và không khí trong lành', 'Mùa hè vui tươi của bé'],
      focusYccdCodes: ['NT1', 'TC1.2', 'TX2'],
      educationalContent: 'Nhận biết nước sạch dùng để uống, rửa tay, cảm nhận thời tiết nắng mưa, không nghịch nước bẩn.',
      expectedActivities: 'Thả thuyền giấy trên chậu nước, chơi trò che ô khi trời mưa, nghe bài hát "Cho tôi đi làm mưa với".',
    },
    {
      id: 'nt18-t8',
      order: 8,
      themeName: 'QUÊ HƯƠNG – ĐẤT NƯỚC – BÁC HỒ KÍNH YÊU',
      durationWeeks: 4,
      startWeek: 28,
      endWeek: 31,
      subThemes: ['Nơi bé và gia đình đang sinh sống', 'Con đường làng/phố quen thuộc nơi bé ở', 'Ảnh Bác Hồ kính yêu ở lớp học', 'Bé mừng ngày sinh nhật Bác Hồ 19/5'],
      focusYccdCodes: ['TX1.2', 'NgT1', 'NN1'],
      educationalContent: 'Nhận biết con đường quen thuộc đến trường, ngôi nhà của bé ở quê hương, ngắm ảnh Bác Hồ với thiếu nhi.',
      expectedActivities: 'Dạo chơi sân trường ngắm cảnh quê hương, ngắm ảnh Bác Hồ treo trên tường, nghe cô hát Đêm qua em mơ gặp Bác Hồ.',
    },
    {
      id: 'nt18-t9',
      order: 9,
      themeName: 'Bé lên lớp mẫu giáo - Tạm biệt nhóm trẻ',
      durationWeeks: 4,
      startWeek: 32,
      endWeek: 35,
      subThemes: ['Bé lớn lên từng ngày ngoan ngoãn', 'Bé tập tự phục vụ bản thân', 'Những trò chơi bé yêu thích', 'Ngày hội tổng kết năm học của bé'],
      focusYccdCodes: ['TC1', 'TX1', 'NgT1.1'],
      educationalContent: 'Tự hào vì bé đã lớn, tự xúc ăn, tự cất dép gọn gàng, sẵn sàng tâm thế bước vào lớp mẫu giáo bé.',
      expectedActivities: 'Biểu diễn văn nghệ cuối năm, liên hoan bé ngoan, làm quen với đồ chơi lớp mẫu giáo.',
    },
  ],

  'nha-tre-24-36': [
    {
      id: 'nt24-t1',
      order: 1,
      themeName: 'Trường mầm non và các bạn thân yêu',
      durationWeeks: 4,
      startWeek: 1,
      endWeek: 4,
      subThemes: ['Ngày hội đến trường của bé', 'Lớp học và các góc chơi thân quen', 'Cô giáo dịu hiền và bạn bè cùng chơi', 'Đồ chơi an toàn trong lớp của bé'],
      focusYccdCodes: ['TC1', 'TX1', 'NN1.1'],
      educationalContent: 'Làm quen tên trường, tên lớp, đồ chơi các góc; hình thành thói quen cất đồ chơi đúng nơi quy định.',
      expectedActivities: 'Chạy nhặt bóng theo màu, xâu chuỗi hoa tặng bạn, nghe kể chuyện Bạn mới đến lớp.',
    },
    {
      id: 'nt24-t2',
      order: 2,
      themeName: 'Bản thân bé đáng yêu và khỏe mạnh',
      durationWeeks: 4,
      startWeek: 5,
      endWeek: 8,
      subThemes: ['Tôi là ai - Bé trai hay bé gái', 'Cơ thể và các giác quan kỳ diệu', 'Đồ dùng, quần áo đẹp của bé', 'Bé giữ gìn vệ sinh và ăn uống đủ chất'],
      focusYccdCodes: ['TC1.2', 'TX1', 'NT1.1'],
      educationalContent: 'Nhận biết mắt, mũi, miệng, tay chân; tác dụng của từng bộ phận và kỹ năng tự xúc cơm, rửa tay lau mặt.',
      expectedActivities: 'Chỉ và nói tên các giác quan, múa Vui đến trường, tập gấp áo đơn giản, nhận biết đôi dép của mình.',
    },
    {
      id: 'nt24-t3',
      order: 3,
      themeName: 'Gia đình yêu thương',
      durationWeeks: 4,
      startWeek: 9,
      endWeek: 12,
      subThemes: ['Những người thân yêu trong gia đình', 'Ngôi nhà ấm cúng của bé', 'Đồ dùng sinh hoạt tiện ích trong nhà', 'Tình cảm yêu thương và sự hiếu thảo'],
      focusYccdCodes: ['TX1.1', 'NN1.1', 'NT1.1'],
      educationalContent: 'Kể tên bố mẹ, ông bà, anh chị em; nhận biết đồ dùng quen thuộc trong nhà và biết dạ vâng lễ phép.',
      expectedActivities: 'Xếp ngôi nhà bằng khối gỗ, nặn quả trứng cho mẹ, hát Cả nhà thương nhau, chơi phân vai mẹ con.',
    },
    {
      id: 'nt24-t4',
      order: 4,
      themeName: 'Thế giới động vật quanh bé',
      durationWeeks: 5,
      startWeek: 13,
      endWeek: 17,
      subThemes: ['Động vật nuôi trong gia đình (Chó, Mèo)', 'Gia cầm quen thuộc (Gà, Vịt)', 'Những con vật sống dưới nước (Cá, Tôm, Cua)', 'Các con vật sống trong rừng (Voi, Khỉ, Thỏ)', 'Bé yêu quý và chăm sóc bảo vệ con vật'],
      focusYccdCodes: ['NT1.2', 'NgT1.1', 'TC1'],
      educationalContent: 'Tên gọi, đặc điểm bên ngoài, tiếng kêu, thức ăn và lợi ích của các con vật nuôi quen thuộc.',
      expectedActivities: 'Bắt chước dáng đi của thỏ, vẽ các nét uốn lượn cho cá bơi, nghe truyện Cáo, Thỏ và Gà trống.',
    },
    {
      id: 'nt24-t5',
      order: 5,
      themeName: 'Thế giới thực vật và mùa xuân tươi đẹp',
      durationWeeks: 5,
      startWeek: 18,
      endWeek: 22,
      subThemes: ['Cây xanh cho bóng mát sân trường', 'Những loài hoa rực rỡ sắc màu', 'Quả thơm trái ngọt bốn mùa', 'Các loại rau xanh giàu dinh dưỡng', 'Tết Nguyên Đán và lễ hội vui xuân'],
      focusYccdCodes: ['NT1', 'NgT1.1', 'TX2'],
      educationalContent: 'Phân biệt màu sắc, mùi vị các loại quả; cảm nhận ích lợi của cây xanh đối với bóng mát sân trường, đón Tết cổ truyền.',
      expectedActivities: 'In hình hoa bằng ngón tay và củ cải, bóc vỏ chuối ăn phụ xế, dạo vườn nhặt lá khô, trang trí cành đào.',
    },
    {
      id: 'nt24-t6',
      order: 6,
      themeName: 'Phương tiện giao thông và an toàn giao thông',
      durationWeeks: 4,
      startWeek: 23,
      endWeek: 26,
      subThemes: ['Phương tiện giao thông đường bộ', 'Phương tiện giao thông đường thủy', 'Phương tiện đường hàng không và đường sắt', 'Bé chấp hành luật an toàn giao thông'],
      focusYccdCodes: ['NT1.2', 'TC1', 'TX1'],
      educationalContent: 'Tên gọi, đặc điểm, nơi hoạt động của các phương tiện giao thông phổ biến, quy định đội mũ bảo hiểm khi ngồi xe máy.',
      expectedActivities: 'Tập lái ô tô theo tín hiệu đèn giao thông, dán hình thuyền buồm, nghe hát Em tập lái ô tô.',
    },
    {
      id: 'nt24-t7',
      order: 7,
      themeName: 'QUÊ HƯƠNG – ĐẤT NƯỚC – BÁC HỒ KÍNH YÊU',
      durationWeeks: 4,
      startWeek: 27,
      endWeek: 30,
      subThemes: ['Quê hương - Làng xóm/Phố phường nơi bé ở (sau sáp nhập)', 'Cảnh đẹp quê hương và di tích lịch sử', 'Bác Hồ kính yêu với thiếu nhi', 'Bé mừng ngày sinh nhật Bác Hồ 19/5'],
      focusYccdCodes: ['TX1.2', 'NgT1', 'NN1.1'],
      educationalContent: 'Nhận biết thôn xóm, tổ dân phố, đường làng ngõ xóm nơi gia đình sống; tình cảm yêu quý dành cho Bác Hồ.',
      expectedActivities: 'Dán hoa quanh ảnh Bác Hồ, đi dạo ngắm con đường làng quê mới mở rộng khang trang, nghe đọc thơ Ảnh Bác.',
    },
    {
      id: 'nt24-t8',
      order: 8,
      themeName: 'Nước và các hiện tượng tự nhiên - Mùa hè của bé',
      durationWeeks: 5,
      startWeek: 31,
      endWeek: 35,
      subThemes: ['Nguồn nước mát lành với đời sống', 'Các hiện tượng thời tiết (Nắng, Mưa, Gió)', 'Ngày và đêm - Mặt trời và mặt trăng', 'Mùa hè rực rỡ và những chuyến đi chơi', 'Bé chuẩn bị tâm thế lên lớp Mẫu giáo bé'],
      focusYccdCodes: ['NT1', 'TX2', 'TC1.1'],
      educationalContent: 'Tìm hiểu ích lợi của nước, cách bảo vệ nguồn nước sạch, nhận biết các hiện tượng tự nhiên và chuẩn bị tâm thế lên mẫu giáo.',
      expectedActivities: 'Chơi đong nước vào chai, thí nghiệm chìm nổi, múa bài Mùa hè đến, liên hoan tổng kết năm học.',
    },
  ],

  'mau-giao-3-4': [
    {
      id: 'mg3-t1',
      order: 1,
      themeName: 'Trường mầm non thân yêu của bé',
      durationWeeks: 4,
      startWeek: 1,
      endWeek: 4,
      subThemes: ['Ngày hội đến trường của bé - Bé làm quen bạn bè', 'Lớp học của bé - Đồ dùng, đồ chơi các góc', 'Các cô, các bác trong trường mầm non', 'Tết Trung thu rước đèn vui hội'],
      focusYccdCodes: ['TC1', 'TX1', 'NN1'],
      educationalContent: 'Tên trường, tên cô giáo, bạn bè trong lớp, các góc chơi và quy định ứng xử thân thiện, rước đèn Trung thu.',
      expectedActivities: 'Tập đi đều theo hiệu lệnh, vẽ nét thẳng trang trí cờ hoa, hát Vui đến trường, phân vai bán hàng.',
    },
    {
      id: 'mg3-t2',
      order: 2,
      themeName: 'Bản thân bé kỳ diệu',
      durationWeeks: 4,
      startWeek: 5,
      endWeek: 8,
      subThemes: ['Tôi là ai - Sở thích và đặc điểm riêng của tôi', 'Cơ thể tôi và các giác quan', 'Trang phục và đồ dùng cá nhân của bé', 'Bé giữ gìn sức khỏe, phòng chống dịch bệnh'],
      focusYccdCodes: ['TC1.2', 'TX1', 'NT1.1'],
      educationalContent: 'Phân biệt giới tính bạn trai, bạn gái; nhận biết cảm xúc vui buồn; thói quen ăn uống đủ chất và rửa tay.',
      expectedActivities: 'In dấu bàn tay sáng tạo, đếm số lượng 1-3 ngón tay, chơi trò chơi Giác quan kỳ diệu.',
    },
    {
      id: 'mg3-t3',
      order: 3,
      themeName: 'Gia đình sum vầy yêu thương',
      durationWeeks: 4,
      startWeek: 9,
      endWeek: 12,
      subThemes: ['Gia đình ấm áp và các thành viên', 'Ngôi nhà thân yêu - Địa chỉ nhà của bé', 'Đồ dùng trong gia đình và nhu cầu sinh hoạt', 'Món ăn ngon gia đình và tình cảm gắn kết'],
      focusYccdCodes: ['TX1.1', 'NN1.1', 'NT1.1'],
      educationalContent: 'Vai trò của các thành viên gia đình, địa chỉ nhà ở, đồ dùng sinh hoạt và thể hiện sự hiếu thảo.',
      expectedActivities: 'Cắt dán mái nhà hình tam giác, hát Ba ngọn nến lung linh, nghe truyện Tích Chu, làm khung ảnh gia đình.',
    },
    {
      id: 'mg3-t4',
      order: 4,
      themeName: 'Nghề nghiệp trong xã hội',
      durationWeeks: 4,
      startWeek: 13,
      endWeek: 16,
      subThemes: ['Nghề giáo viên, bác sĩ (chăm sóc sức khỏe và dạy học)', 'Nghề nông nghiệp và người lao động tại địa phương', 'Nghề xây dựng và thợ thủ công', 'Ước mơ tương lai của bé'],
      focusYccdCodes: ['NT1.2', 'TX1.1', 'NgT1.1'],
      educationalContent: 'Công việc, trang phục và đồ dùng đặc trưng của các nghề nghiệp gần gũi trong đời sống, tri ân người lao động.',
      expectedActivities: 'Đóng vai phòng khám bác sĩ nhí, nặn các viên gạch xây nhà, múa bài Cháu yêu cô chú công nhân.',
    },
    {
      id: 'mg3-t5',
      order: 5,
      themeName: 'Thế giới thực vật - Tết và Mùa xuân',
      durationWeeks: 5,
      startWeek: 17,
      endWeek: 21,
      subThemes: ['Cây xanh và lợi ích của cây đối với môi trường', 'Một số loài hoa rực rỡ khoe sắc', 'Các loại quả ngọt thơm ngon', 'Các loại rau quen thuộc bé ăn hằng ngày', 'Tết Nguyên đán và Mùa xuân tươi đẹp'],
      focusYccdCodes: ['NT1', 'TX2', 'NgT1.1'],
      educationalContent: 'Ích lợi của cây xanh, hoa quả, rau củ; các phong tục ngày Tết cổ truyền và cảm nhận vẻ đẹp mùa xuân.',
      expectedActivities: 'Gieo hạt đỗ quan sát nảy mầm, cắm hoa ngày Tết, gói bánh chưng mini bằng lá chuối, hát Sắp đến Tết rồi.',
    },
    {
      id: 'mg3-t6',
      order: 6,
      themeName: 'Thế giới động vật quanh ta',
      durationWeeks: 4,
      startWeek: 22,
      endWeek: 25,
      subThemes: ['Những con vật nuôi gần gũi trong gia đình', 'Những con vật sống trong rừng', 'Những con vật sống dưới nước', 'Một số loài côn trùng và chim biết bay'],
      focusYccdCodes: ['NT1.2', 'TC1', 'NgT1.1'],
      educationalContent: 'Phân loại động vật theo môi trường sống, đặc điểm vận động, nguồn thức ăn và ý thức bảo vệ động vật.',
      expectedActivities: 'Tạo hình con vật từ lá cây khô, mô phỏng tiếng kêu và dáng đi của muông thú, đếm số chân của con vật.',
    },
    {
      id: 'mg3-t7',
      order: 7,
      themeName: 'Phương tiện và quy định an toàn giao thông',
      durationWeeks: 3,
      startWeek: 26,
      endWeek: 28,
      subThemes: ['Một số phương tiện giao thông đường bộ, đường sắt', 'Phương tiện giao thông đường thủy, đường hàng không', 'Bé thực hiện an toàn giao thông'],
      focusYccdCodes: ['NT1.2', 'TC1.1', 'TX1'],
      educationalContent: 'Phân biệt nơi hoạt động, tiếng còi của các phương tiện giao thông; chấp hành đèn tín hiệu giao thông.',
      expectedActivities: 'Lắp ráp mô hình đoàn tàu hỏa bằng vỏ hộp sữa, chơi trò chơi Ngã tư đường phố, múa Em đi qua ngã tư đường phố.',
    },
    {
      id: 'mg3-t8',
      order: 8,
      themeName: 'QUÊ HƯƠNG – ĐẤT NƯỚC – BÁC HỒ KÍNH YÊU',
      durationWeeks: 4,
      startWeek: 29,
      endWeek: 32,
      subThemes: ['Quê hương em tươi đẹp (Xã/Phường sau sáp nhập)', 'Cảnh đẹp, di tích lịch sử và danh lam quê hương', 'Đất nước Việt Nam mến yêu - Thủ đô Hà Nội', 'Bác Hồ kính yêu với các cháu thiếu nhi'],
      focusYccdCodes: ['TX1.2', 'NN1.1', 'NT1.2', 'NgT1'],
      educationalContent: 'Tên xã/phường hiện nay, cảnh đẹp quê hương nơi bé ở, cờ đỏ sao vàng, lăng Bác và tấm lòng biết ơn Bác Hồ.',
      expectedActivities: 'Xé dán lá cờ Tổ quốc đỏ sao vàng, hát Nhớ ơn Bác, dạo chơi quan sát phong cảnh địa phương, múa Quê hương tươi đẹp.',
    },
    {
      id: 'mg3-t9',
      order: 9,
      themeName: 'Nước và các hiện tượng tự nhiên - Mùa hè của bé',
      durationWeeks: 3,
      startWeek: 33,
      endWeek: 35,
      subThemes: ['Nước và ích lợi của nước với sự sống', 'Một số hiện tượng thời tiết và các mùa trong năm', 'Mùa hè rực rỡ - Bé chào đón năm học mới'],
      focusYccdCodes: ['NT1', 'TX2', 'TC1.2'],
      educationalContent: 'Các trạng thái của nước, tác hại của ô nhiễm nguồn nước, giữ gìn sức khỏe trong mùa hè nắng nóng.',
      expectedActivities: 'Thí nghiệm pha màu nước, chơi với bong bóng xà phòng, múa Mùa hè đến, chuẩn bị tâm thế lên lớp mẫu giáo nhỡ.',
    },
  ],

  'mau-giao-4-5': [
    {
      id: 'mg4-t1',
      order: 1,
      themeName: 'Trường mầm non hạnh phúc',
      durationWeeks: 3,
      startWeek: 1,
      endWeek: 3,
      subThemes: ['Trường mầm non của bé - Ngày hội đến trường', 'Lớp học hạnh phúc - Đồ dùng, đồ chơi các góc', 'Tết Trung thu rước đèn đón trăng'],
      focusYccdCodes: ['TC1', 'TX1', 'NgT1.1'],
      educationalContent: 'Nhiệm vụ của học sinh mẫu giáo nhỡ, quy tắc đoàn kết, chia sẻ góc chơi, phong tục rước đèn Trung thu.',
      expectedActivities: 'Làm lồng đèn Trung thu bằng cốc giấy tái chế, đo độ dài bàn ghế học bằng gang tay, hát Đêm Trung thu.',
    },
    {
      id: 'mg4-t2',
      order: 2,
      themeName: 'Bản thân - Cơ thể và Sức khỏe',
      durationWeeks: 4,
      startWeek: 4,
      endWeek: 7,
      subThemes: ['Tôi là ai - Khám phá cá tính và cảm xúc của tôi', 'Cơ thể tôi kỳ diệu và 5 giác quan', 'Dinh dưỡng lành mạnh và rèn luyện thể lực', 'Kỹ năng an toàn và bảo vệ bản thân (Quy tắc 5 ngón tay)'],
      focusYccdCodes: ['TC2', 'TX1', 'NN1.1'],
      educationalContent: 'Tìm hiểu chức năng của 5 giác quan, quản lý cảm xúc, kỹ năng phòng tránh xâm hại, chế độ dinh dưỡng hợp lý.',
      expectedActivities: 'Thử thách đoán vị giác bằng bịt mắt nếm quả, vẽ tranh chân dung tự họa, đóng kịch tình huống an toàn.',
    },
    {
      id: 'mg4-t3',
      order: 3,
      themeName: 'Gia đình yêu thương',
      durationWeeks: 4,
      startWeek: 8,
      endWeek: 11,
      subThemes: ['Gia đình và các mối quan hệ họ hàng', 'Ngôi nhà khang trang - Không gian sống tiện nghi', 'Đồ dùng trong gia đình - Tiết kiệm điện nước', 'Ngày hội gia đình - Bày tỏ lòng biết ơn cha mẹ'],
      focusYccdCodes: ['TX1.1', 'NT1.1', 'TX2'],
      educationalContent: 'Phân biệt đồ dùng bằng gỗ - thủy tinh - điện máy, ý thức tiết kiệm điện nước, chia sẻ việc nhà vừa sức.',
      expectedActivities: 'Xếp chuỗi quy tắc phân loại đồ dùng, làm thiệp chúc mừng sinh nhật bố mẹ, hát Chỉ có một trên đời.',
    },
    {
      id: 'mg4-t4',
      order: 4,
      themeName: 'Nghề nghiệp và Người lao động địa phương',
      durationWeeks: 4,
      startWeek: 12,
      endWeek: 15,
      subThemes: ['Nghề dịch vụ và chăm sóc sức khỏe cộng đồng', 'Nghề sản xuất nông - lâm - ngư nghiệp', 'Làng nghề truyền thống đặc sắc tại quê hương (sau sáp nhập)', 'Ngày hội trải nghiệm nghề nghiệp của bé'],
      focusYccdCodes: ['NT1.2', 'TX1.1', 'NN1.1'],
      educationalContent: 'Sự vất vả và giá trị của người lao động, các ngành nghề nổi bật tại địa phương sau sáp nhập, tôn trọng mọi nghề.',
      expectedActivities: 'Trải nghiệm nặn gốm hoặc đan lát đơn giản, đếm số lượng dụng cụ lao động phạm vi 7, phỏng vấn cô cấp dưỡng.',
    },
    {
      id: 'mg4-t5',
      order: 5,
      themeName: 'Thế giới thực vật - Tết Nguyên đán và Mùa xuân',
      durationWeeks: 5,
      startWeek: 16,
      endWeek: 20,
      subThemes: ['Cây xanh và hệ sinh thái quanh bé', 'Thế giới các loài hoa muôn màu muôn vẻ', 'Quả ngon bốn mùa và giá trị dinh dưỡng', 'Rau sạch nông nghiệp công nghệ cao', 'Tết cổ truyền dân tộc và lễ hội mùa xuân'],
      focusYccdCodes: ['NT1', 'TX2', 'NgT1.1'],
      educationalContent: 'Sự phát triển của thực vật từ hạt, phân loại hoa lá, bảo vệ rừng và cây xanh; phong tục Tết và lễ hội quê hương.',
      expectedActivities: 'Thực hành gieo hạt giá đỗ, làm tranh hoa ép khô, biểu diễn múa lân sư rồng vui Tết, hát Mùa xuân ơi.',
    },
    {
      id: 'mg4-t6',
      order: 6,
      themeName: 'Thế giới động vật đa dạng',
      durationWeeks: 4,
      startWeek: 21,
      endWeek: 24,
      subThemes: ['Động vật nuôi trong gia đình và trang trại', 'Thế giới động vật hoang dã trong rừng sâu', 'Các loài động vật sống dưới đại dương và sông nước', 'Bảo vệ động vật quý hiếm và cân bằng sinh thái'],
      focusYccdCodes: ['NT1.2', 'TC1', 'TX1'],
      educationalContent: 'Môi trường sống, tập tính săn mồi, sinh sản của động vật, tầm quan trọng của việc không săn bắt động vật hoang dã.',
      expectedActivities: 'Dựng sa bàn thế giới động vật từ đất nặn và bìa carton, đếm và so sánh số lượng con vật phạm vi 8.',
    },
    {
      id: 'mg4-t7',
      order: 7,
      themeName: 'Phương tiện và Luật giao thông',
      durationWeeks: 3,
      startWeek: 25,
      endWeek: 27,
      subThemes: ['Các phương tiện giao thông đường bộ, đường sắt', 'Các phương tiện giao thông đường thủy, đường hàng không', 'Luật giao thông đường bộ và văn hóa khi tham gia giao thông'],
      focusYccdCodes: ['NT1.2', 'TX1.1', 'TC1.1'],
      educationalContent: 'Quy định khi đi bộ, đi xe đạp, ngồi trên xe máy ô tô; ý nghĩa các biển báo hiệu giao thông cấm và chỉ dẫn.',
      expectedActivities: 'Mô hình sa bàn giao thông ngã tư đường phố, đóng kịch CSGT phân luồng, làm biển báo giao thông mini.',
    },
    {
      id: 'mg4-t8',
      order: 8,
      themeName: 'QUÊ HƯƠNG – ĐẤT NƯỚC – BÁC HỒ KÍNH YÊU',
      durationWeeks: 4,
      startWeek: 28,
      endWeek: 31,
      subThemes: ['Quê hương đổi mới - Xã/Phường em sau sáp nhập', 'Danh lam thắng cảnh, di tích lịch sử và sản vật quê hương', 'Đất nước Việt Nam - Biển đảo quê hương và Quốc kỳ', 'Chủ tịch Hồ Chí Minh - Vị cha già kính yêu của dân tộc (19/5)'],
      focusYccdCodes: ['TX1.2', 'NT1.2', 'NgT1.1', 'NN1.1'],
      educationalContent: 'Khám phá địa danh, di tích, lễ hội địa phương sau sáp nhập; biểu tượng quốc kỳ, bản đồ hình chữ S và công lao Bác Hồ.',
      expectedActivities: 'Dựng mô hình danh lam quê hương từ cát và sỏi, vẽ hoa sen dâng Bác ngày sinh nhật 19/5, múa Quê hương tươi đẹp.',
    },
    {
      id: 'mg4-t9',
      order: 9,
      themeName: 'Nước - Các hiện tượng tự nhiên và Mùa hè',
      durationWeeks: 4,
      startWeek: 32,
      endWeek: 35,
      subThemes: ['Nguồn nước, vòng tuần hoàn của nước và bảo vệ nguồn nước', 'Không khí, ánh sáng và các hiện tượng thời tiết', 'Mùa hè rực rỡ và các hoạt động vui chơi du lịch', 'Bé ôn tập kiến thức - Tạm biệt lớp Mẫu giáo nhỡ'],
      focusYccdCodes: ['NT1', 'TX2', 'TC1.1'],
      educationalContent: 'Chu trình của giọt nước, thực nghiệm lọc nước đơn giản, phòng tránh đuối nước và chuẩn bị tâm thế lên lớp 5-6 tuổi.',
      expectedActivities: 'Dự án STEAM: Chế tạo bè nổi chở hàng, vẽ tranh tuyên truyền bảo vệ dòng sông quê em, liên hoan tổng kết năm học.',
    },
  ],

  'mau-giao-5-6': [
    {
      id: 'mg5-t1',
      order: 1,
      themeName: 'Trường mầm non - Bé chuẩn bị vào lớp Một',
      durationWeeks: 3,
      startWeek: 1,
      endWeek: 3,
      subThemes: ['Trường mầm non hạnh phúc - Lớp Mẫu giáo Lớn thân yêu', 'Đồ dùng, đồ chơi và các quy định của lớp 5 tuổi', 'Tết Trung thu rước đèn - Bé tìm hiểu về trường Tiểu học'],
      focusYccdCodes: ['TC1', 'TX1', 'NN1.2'],
      educationalContent: 'Tâm thế phấn khởi, nền nếp tự lập, làm quen bàn ghế, đồ dùng học tập của học sinh lớp Một, vui hội Trung thu.',
      expectedActivities: 'Làm quen chữ cái o, ô, ơ; sắp xếp balo ngăn nắp; tham quan lớp một (qua video/ảnh thực tế); vẽ trường học mơ ước.',
    },
    {
      id: 'mg5-t2',
      order: 2,
      themeName: 'Bản thân - Tâm lý, Tính cách và Kỹ năng sống',
      durationWeeks: 3,
      startWeek: 4,
      endWeek: 6,
      subThemes: ['Tôi là ai - Tôi là một cá thể độc đáo và tự tin', 'Cơ thể tôi lớn lên - Các giác quan và bảo vệ bản thân', 'Kỹ năng quản lý cảm xúc, thoát hiểm và tự vệ an toàn'],
      focusYccdCodes: ['TC2', 'TX1', 'NN1.1'],
      educationalContent: 'Nhận biết điểm mạnh, tự tin trước tập thể, xử lý khi lạc đường, thoát nạn khi cháy, bảo vệ bản thân an toàn.',
      expectedActivities: 'Thực hành diễn tập thoát hiểm PCCC (khăn ẩm bịt mũi, bò thấp men tường), hùng biện "Tôi tự hào về bản thân".',
    },
    {
      id: 'mg5-t3',
      order: 3,
      themeName: 'Gia đình - Văn hóa và Nếp sống gia đình',
      durationWeeks: 4,
      startWeek: 7,
      endWeek: 10,
      subThemes: ['Gia đình nhiều thế hệ và mối quan hệ huyết thống', 'Ngôi nhà thông minh, an toàn và tiện nghi', 'Đồ dùng gia đình - Ứng dụng công nghệ và tiết kiệm năng lượng', 'Nếp sống văn hóa, chia sẻ công việc và sự hiếu thảo'],
      focusYccdCodes: ['TX1.1', 'NT1.1', 'NgT1.1'],
      educationalContent: 'Cây phả hệ gia đình (ông bà, cha mẹ, con cái), truyền thống gia đình, ứng dụng công nghệ an toàn, tiết kiệm điện nước.',
      expectedActivities: 'Vẽ cây gia phả, tách gộp nhóm đồ dùng gia đình trong phạm vi 10, sáng tạo khung ảnh từ que kem tái chế.',
    },
    {
      id: 'mg5-t4',
      order: 4,
      themeName: 'Nghề nghiệp hiện đại và Làng nghề truyền thống',
      durationWeeks: 4,
      startWeek: 11,
      endWeek: 14,
      subThemes: ['Nghề tri thức, công nghệ thông tin và khoa học kỹ thuật', 'Nghề dịch vụ, y tế, giáo dục và công an bộ đội', 'Làng nghề truyền thống và sản phẩm OCOP địa phương sau sáp nhập', 'Ước mơ nghề nghiệp tương lai và giá trị của lao động'],
      focusYccdCodes: ['NT1.2', 'TX1.1', 'NgT1.1'],
      educationalContent: 'Tìm hiểu nghề truyền thống đặc sắc của xã/phường sáp nhập, công nghệ mới hỗ trợ nông dân và bác sĩ, tôn vinh người lao động.',
      expectedActivities: 'Dự án STEAM: Làm robot thu gom rác bằng bìa carton, nặn sản phẩm gốm/mây tre đan đặc trưng quê hương.',
    },
    {
      id: 'mg5-t5',
      order: 5,
      themeName: 'Thế giới thực vật - Tết Nguyên Đán và Mùa xuân',
      durationWeeks: 5,
      startWeek: 15,
      endWeek: 19,
      subThemes: ['Cây xanh và vai trò bảo vệ môi trường, chống biến đổi khí hậu', 'Muôn hoa khoe sắc và ứng dụng nghệ thuật tạo hình', 'Thế giới các loại quả ngọt và dinh dưỡng cho sự phát triển', 'Rau củ quả sạch và mô hình nông nghiệp công nghệ cao', 'Phong tục Tết cổ truyền Việt Nam và Lễ hội mùa xuân'],
      focusYccdCodes: ['NT1', 'TX2', 'NgT1.1', 'TC1.1'],
      educationalContent: 'Cây xanh thanh lọc không khí, quy trình sinh trưởng của cây, nông nghiệp sạch, phong tục Tết cổ truyền và lễ hội quê hương.',
      expectedActivities: 'Trồng cây xanh tại góc thiên nhiên, gói bánh chưng mini trải nghiệm, thiết kế thiệp chúc Tết sáng tạo.',
    },
    {
      id: 'mg5-t6',
      order: 6,
      themeName: 'Thế giới động vật và Đa dạng sinh học',
      durationWeeks: 4,
      startWeek: 20,
      endWeek: 23,
      subThemes: ['Động vật nuôi trong gia đình và lợi ích đối với con người', 'Động vật hoang dã trong tự nhiên - Hành tinh xanh', 'Thế giới sinh vật biển và đại dương bao la', 'Vòng đời của sinh vật và bảo tồn động vật có nguy cơ tuyệt chủng'],
      focusYccdCodes: ['NT1', 'TX2', 'NT1.1'],
      educationalContent: 'Vòng đời của bướm/ếch, chuỗi thức ăn đơn giản, trách nhiệm bảo vệ loài động vật hoang dã và môi trường biển.',
      expectedActivities: 'Khám phá kính lúp quan sát cấu tạo lá cây và tổ kiến, dự án STEAM: Làm ngôi nhà tổ ấm cho chim non.',
    },
    {
      id: 'mg5-t7',
      order: 7,
      themeName: 'Phương tiện và Luật an toàn giao thông',
      durationWeeks: 3,
      startWeek: 24,
      endWeek: 26,
      subThemes: ['Các loại phương tiện giao thông và người điều khiển', 'Biển báo giao thông cơ bản và quy tắc đi đường an toàn', 'Văn hóa giao thông văn minh - Dự án STEAM: Phương tiện tương lai'],
      focusYccdCodes: ['NT1.2', 'TC1.1', 'TX1.1'],
      educationalContent: 'Hệ thống biển báo hiệu đường bộ, văn hóa nhường đường cho người già và trẻ nhỏ, thiết kế phương tiện thân thiện với môi trường.',
      expectedActivities: 'Dự án STEAM: Chế tạo ô tô chạy bằng năng lượng bóng bay, đóng kịch "Em là chú công an giao thông".',
    },
    {
      id: 'mg5-t8',
      order: 8,
      themeName: 'QUÊ HƯƠNG – ĐẤT NƯỚC – BÁC HỒ KÍNH YÊU',
      durationWeeks: 5,
      startWeek: 27,
      endWeek: 31,
      subThemes: [
        'Địa phương em sau sáp nhập - Đổi mới, phát triển và tự hào',
        'Danh lam thắng cảnh, di tích lịch sử và văn hóa quê hương',
        'Đất nước Việt Nam mến yêu - Thủ đô Hà Nội và các vùng miền',
        'Biển đảo quê hương Việt Nam - Quần đảo Hoàng Sa và Trường Sa',
        'Chủ tịch Hồ Chí Minh - Vị cha già kính yêu của dân tộc (Kỷ niệm sinh nhật Bác 19/5)'
      ],
      focusYccdCodes: ['TX1.2', 'NT1.2', 'NN1.1', 'NgT1.1'],
      educationalContent: 'Tên mới của xã/phường sau sáp nhập, các danh lam, di tích, sản phẩm OCOP địa phương; bản đồ Việt Nam, Hoàng Sa - Trường Sa; tấm gương Bác Hồ và lời dâng lên Bác.',
      expectedActivities: 'Thuyết trình về di tích địa phương sau sáp nhập, cắt dán bản đồ Việt Nam và đánh dấu quần đảo Trường Sa, Hoàng Sa, hát bài Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng, làm album ảnh quê hương.',
    },
    {
      id: 'mg5-t9',
      order: 9,
      themeName: 'Các hiện tượng tự nhiên, Vũ trụ và Mùa hè của bé',
      durationWeeks: 4,
      startWeek: 32,
      endWeek: 35,
      subThemes: [
        'Nguồn nước, không khí, ánh sáng và bảo vệ tài nguyên thiên nhiên',
        'Hệ Mặt trời, các hành tinh và khám phá vũ trụ kỳ thú',
        'Mùa hè sôi động, phòng tránh đuối nước và tai nạn thương tích',
        'Lễ ra trường - Tạm biệt trường Mầm non, vững bước vào Lớp Một'
      ],
      focusYccdCodes: ['NT1', 'TX2', 'NgT1.1', 'TC1.2'],
      educationalContent: 'Các hành tinh trong hệ Mặt trời, ngày và đêm, ứng phó biến đổi khí hậu; kỹ năng an toàn trong mùa hè; tâm thế tự tin sẵn sàng vào lớp Một.',
      expectedActivities: 'Mô hình hệ mặt trời xoay, thí nghiệm làm cầu vồng từ gương và nước, làm kỷ yếu mầm non, biểu diễn lễ ra trường.',
    },
  ],
};

// Helper to detect content relating to Bác Hồ / Chủ tịch Hồ Chí Minh
export function isBacHoContent(text: string): boolean {
  if (!text) return false;
  const upper = text.toUpperCase();
  return (
    upper.includes('BÁC HỒ') ||
    upper.includes('CHỦ TỊCH HỒ CHÍ MINH') ||
    upper.includes('HỒ CHÍ MINH') ||
    upper.includes('CHA GIÀ') ||
    upper.includes('19/5') ||
    upper.includes('ẢNH BÁC')
  );
}

// Generate an authentic weekly schedule matrix (Thứ Hai -> Thứ Sáu, 8 slots)
export function generateDefaultWeekPlan(
  themeName: string,
  subThemeName: string,
  ageGroupId: AgeGroupId,
  weekNumber: number,
  localDistrictName: string = 'địa phương'
): WeekPlan {
  const isNhaTre = ageGroupId.startsWith('nha-tre');
  const is5to6 = ageGroupId === 'mau-giao-5-6';
  const isBacHo = isBacHoContent(subThemeName) || isBacHoContent(themeName);

  const days: WeekPlan['days'] = [
    {
      dayOfWeek: 'Thứ Hai',
      slots: [
        {
          timeSlotName: 'Đón trẻ',
          activityName: isBacHo
            ? 'Đón trẻ vào lớp, nhắc trẻ chào cô và cha mẹ, cùng hướng về ảnh Bác Hồ kính yêu treo trang trọng trong lớp học, trò chuyện về tình cảm bao la của Bác dành cho thiếu nhi.'
            : `Đón trẻ vào lớp, nhắc trẻ chào cô và bố mẹ, trò chuyện về nhánh chủ đề: "${subThemeName}".`,
          yccdCodes: ['TX1.1', 'NN1.1'],
        },
        {
          timeSlotName: 'Thể dục sáng',
          activityName: isNhaTre 
            ? 'Tập bài thể dục sáng: "Tay giơ cao, chân bước đều" theo nhịp xắc xô nhẹ nhàng.' 
            : isBacHo
              ? 'Thể dục sáng theo nền nhạc bài hát "Nhớ ơn Bác" / "Em là búp măng non": Tập các động tác Hô hấp, Tay, Bụng, Bật nhảy khỏe khoắn, tư thế ngay ngắn.'
              : 'Tập các động tác Hô hấp, Tay, Bụng - lườn, Chân, Bật nhảy theo bài hát chủ đề.',
          yccdCodes: ['TC1'],
        },
        {
          timeSlotName: 'Hoạt động học',
          activityName: isNhaTre
            ? (isBacHo
                ? 'Nhận biết tập nói: "Ảnh Bác Hồ kính yêu" (quan sát ảnh Bác Hồ bế em bé, ngắm nụ cười hiền từ của Bác, bày tỏ tình cảm yêu mến Bác).'
                : `Nhận biết tập nói: "${subThemeName}" (quan sát vật thật/mô hình).`)
            : isBacHo
              ? (is5to6
                  ? 'Khám phá khoa học - xã hội: Tìm hiểu về Chủ tịch Hồ Chí Minh kính yêu - Vị lãnh tụ vĩ đại, Người cha già kính yêu của dân tộc Việt Nam (Kỷ niệm ngày sinh nhật Bác 19/5; giáo dục lòng biết ơn và tình cảm kính yêu Bác Hồ).'
                  : 'Khám phá: Tìm hiểu về Bác Hồ kính yêu với các cháu thiếu nhi (Kỷ niệm ngày sinh nhật Bác 19/5; giáo dục lòng biết ơn Bác).')
              : is5to6
                ? `Khám phá khoa học - xã hội: Khám phá đặc trưng và nét đẹp của "${subThemeName}" (tìm hiểu nét đổi mới tại ${localDistrictName}).`
                : `Khám phá: Khám phá nét đẹp của "${subThemeName}".`,
          yccdCodes: isNhaTre ? ['NN1.1', 'TX1'] : ['NT1', 'NT1.2'],
        },
        {
          timeSlotName: 'Hoạt động ngoài trời',
          activityName: isNhaTre
            ? (isBacHo
                ? 'Dạo chơi sân trường; cùng cô ngắm ảnh Bác Hồ ở bảng tin; TCDG: "Dung dăng dung dẻ".'
                : 'Quan sát cây hoa trong sân trường; Chơi trò chơi dân gian: "Dung dăng dung dẻ".')
            : isBacHo
              ? 'Dạo chơi sân trường, quan sát góc thiên nhiên, tham quan góc truyền thống/ảnh Bác Hồ; TCDG: "Rồng rắn lên mây"; Chơi tự do.'
              : 'Quan sát thời tiết, dạo quanh góc thiên nhiên; TCDG: "Rồng rắn lên mây"; Chơi tự do.',
          yccdCodes: ['TC1', 'NT1'],
        },
        {
          timeSlotName: 'Hoạt động góc',
          activityName: isNhaTre
            ? (isBacHo
                ? 'Góc thao tác vai: Bế em bé; Góc HĐVĐV: Xếp hàng rào vườn hoa dâng Bác.'
                : 'Góc thao tác vai: Bế em bé, cho em ăn; Góc HĐVĐV: Xếp hàng rào cho ngôi nhà.')
            : isBacHo
              ? 'Góc Nghệ thuật: Vẽ tranh, xé dán hoa dâng tặng Bác Hồ; Góc Sách truyện: Xem album ảnh tư liệu "Bác Hồ với thiếu nhi"; Góc Xây dựng: Xếp hình khuôn viên Lăng Bác Hồ.'
              : 'Góc Phân vai: Cửa hàng bán đồ đặc sản quê hương; Góc Xây dựng: Xây dựng khuôn viên theo chủ đề; Góc Nghệ thuật: Vẽ hoa.',
          yccdCodes: ['TX1', 'NgT1.1'],
        },
        {
          timeSlotName: 'Ăn – ngủ – vệ sinh',
          activityName: 'Tập thói quen rửa tay bằng xà phòng trước khi ăn, xúc ăn gọn gàng, nằm ngủ đúng tư thế thoáng mát.',
          yccdCodes: ['TC1.2'],
        },
        {
          timeSlotName: 'Hoạt động chiều',
          activityName: isNhaTre
            ? (isBacHo
                ? 'Nghe cô đọc bài thơ ngắn "Ảnh Bác"; Vận động nhẹ nhàng theo bài hát "Đêm qua em mơ gặp Bác Hồ".'
                : 'Nghe cô kể chuyện ngắn theo tranh; Vận động nhẹ bài "Nu na nu nống".')
            : isBacHo
              ? 'Làm quen bài hát "Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng"; kể cho cô và bạn nghe những việc tốt bé làm dâng Bác; Chơi ở góc yêu thích.'
              : 'Làm quen bài hát mới; Hướng dẫn kỹ năng tự gấp quần áo gọn gàng; Chơi trò chơi góc yêu thích.',
          yccdCodes: ['NN1', 'TC1.1'],
        },
        {
          timeSlotName: 'Trả trẻ',
          activityName: 'Trao đổi với phụ huynh về tình hình ăn ngủ của trẻ, nhắc trẻ chào cô và tạm biệt các bạn trước khi về.',
          yccdCodes: ['TX1'],
        },
      ],
    },
    {
      dayOfWeek: 'Thứ Ba',
      slots: [
        {
          timeSlotName: 'Đón trẻ',
          activityName: isBacHo
            ? 'Đón trẻ thân thiện, hướng dẫn trẻ tự cất balo vào ngăn tủ cá nhân, quan sát góc tranh ảnh Bác Hồ với thiếu niên nhi đồng.'
            : 'Đón trẻ thân thiện, hướng dẫn trẻ tự cất balo vào ngăn tủ cá nhân, quan sát tranh chủ đề nhánh.',
          yccdCodes: ['TC1.1', 'TX1'],
        },
        {
          timeSlotName: 'Thể dục sáng',
          activityName: 'Khởi động xoay cổ tay, cánh tay, chạy chậm quanh sân; thực hiện chuỗi động tác thể dục nhịp điệu.',
          yccdCodes: ['TC1'],
        },
        {
          timeSlotName: 'Hoạt động học',
          activityName: isNhaTre
            ? (isBacHo
                ? 'Phát triển vận động: Đi trong đường hẹp mang hoa dâng tặng Bác Hồ kính yêu.'
                : 'Phát triển vận động: Đi trong đường hẹp có mang vật trên tay.')
            : isBacHo
              ? (is5to6
                  ? 'Làm quen với Toán: Đếm và tạo nhóm các bông hoa, món quà trong phạm vi 10 để kết thành lẵng hoa tươi thắm mừng sinh nhật Bác Hồ 19/5.'
                  : 'Làm quen với Toán: Đếm số lượng hoa tươi thắm mừng ngày sinh nhật Bác Hồ kính yêu.')
              : is5to6
                ? 'Làm quen với Toán: Tách gộp nhóm đối tượng có số lượng trong phạm vi 10 theo chủ đề nhánh.'
                : 'Làm quen với Toán: Đếm trên đối tượng và so sánh số lượng.',
          yccdCodes: isNhaTre ? ['TC1'] : ['NT1.1'],
        },
        {
          timeSlotName: 'Hoạt động ngoài trời',
          activityName: 'Thí nghiệm nhỏ ngoài trời: Quan sát bóng râm và ánh nắng mặt trời; TCVĐ: "Cáo và thỏ".',
          yccdCodes: ['NT1', 'TC1'],
        },
        {
          timeSlotName: 'Hoạt động góc',
          activityName: isBacHo
            ? 'Góc Phân vai: Cửa hàng hoa tươi dâng Bác; Góc Xây dựng: Xếp đường vào Lăng Bác; Góc Học tập: Đếm số hoa mừng sinh nhật Bác.'
            : 'Góc học tập: Xếp tương ứng 1-1; Góc Khám phá: Chơi với nước và cát; Góc Thư viện: Xem tranh ảnh.',
          yccdCodes: ['NT1.1', 'NN1.2'],
        },
        {
          timeSlotName: 'Ăn – ngủ – vệ sinh',
          activityName: 'Rèn luyện kỹ năng tự lau miệng sau ăn, súc miệng nước muối ấm, ngủ trưa đủ giấc.',
          yccdCodes: ['TC1.2'],
        },
        {
          timeSlotName: 'Hoạt động chiều',
          activityName: isNhaTre
            ? 'Ôn luyện trò chơi ngón tay: "Hai chú chim xinh".'
            : isBacHo
              ? 'Ôn luyện đếm số hoa dâng Bác qua thẻ tranh tương tác; Chơi tự do ở góc nghệ thuật.'
              : 'Ôn kiến thức toán buổi sáng qua thẻ tranh tương tác; Chơi tự do ở góc xây dựng.',
          yccdCodes: ['NT1.1'],
        },
        {
          timeSlotName: 'Trả trẻ',
          activityName: 'Trò chuyện cuối ngày, dặn dò trẻ trang phục phù hợp thời tiết ngày mai.',
          yccdCodes: ['TX1'],
        },
      ],
    },
    {
      dayOfWeek: 'Thứ Tư',
      slots: [
        {
          timeSlotName: 'Đón trẻ',
          activityName: 'Đón trẻ vào lớp, cho trẻ nghe giai điệu nhạc vui tươi dân gian, điểm danh buổi sáng.',
          yccdCodes: ['TX1', 'NgT1'],
        },
        {
          timeSlotName: 'Thể dục sáng',
          activityName: 'Bài tập phát triển chung với gậy thể dục hoặc cờ hoa nhiều màu sắc rực rỡ.',
          yccdCodes: ['TC1'],
        },
        {
          timeSlotName: 'Hoạt động học',
          activityName: isNhaTre
            ? (isBacHo
                ? 'Làm quen văn học: Nghe cô đọc bài thơ diễn cảm "Ảnh Bác" (Trần Đăng Khoa) và ngắm ảnh Bác Hồ.'
                : 'Làm quen văn học: Nghe cô đọc bài thơ ngắn diễn cảm theo tranh minh họa.')
            : isBacHo
              ? 'Làm quen văn học: Đọc thơ diễn cảm bài thơ "Ảnh Bác" (Trần Đăng Khoa), nghe kể chuyện "Bác Hồ với các cháu thiếu nhi", giáo dục lòng kính yêu Bác.'
              : is5to6
                ? `Làm quen văn học: Kể chuyện sáng tạo / Đọc diễn cảm câu chuyện về "${subThemeName}".`
                : `Làm quen văn học: Thơ/Truyện phù hợp nhánh "${subThemeName}".`,
          yccdCodes: ['NN1', 'NN1.1'],
        },
        {
          timeSlotName: 'Hoạt động ngoài trời',
          activityName: 'Dạo chơi sân trường, quan sát bồn hoa cây cảnh; Trò chơi vận động: "Mèo đuổi chuột".',
          yccdCodes: ['TC1', 'TX2'],
        },
        {
          timeSlotName: 'Hoạt động góc',
          activityName: isBacHo
            ? 'Góc Sách truyện: Bé tập "đọc" thơ Ảnh Bác qua tranh minh họa; Góc Tạo hình: Nặn bông hoa thơm dâng Bác; Góc Đóng vai: Gia đình quây quần kể chuyện Bác Hồ.'
            : 'Góc Sách truyện: Trẻ tập "đọc" truyện qua tranh, kể lại chuyện theo cách hiểu; Góc đóng vai.',
          yccdCodes: ['NN1.2', 'TX1'],
        },
        {
          timeSlotName: 'Ăn – ngủ – vệ sinh',
          activityName: 'Tập nếp ăn không rơi vãi, cất khay bát thìa đúng nơi quy định, ngủ đúng giờ.',
          yccdCodes: ['TC1.2'],
        },
        {
          timeSlotName: 'Hoạt động chiều',
          activityName: isBacHo
            ? 'Tập đọc diễn cảm bài thơ "Ảnh Bác", thi đua đọc thơ hay giữa các tổ; Chơi tự do ở góc thư viện.'
            : 'Tập đóng kịch phân vai theo trích đoạn câu chuyện văn học buổi sáng.',
          yccdCodes: ['NN1.1', 'NgT1'],
        },
        {
          timeSlotName: 'Trả trẻ',
          activityName: 'Nhắc trẻ kiểm tra đủ đồ dùng mang về nhà, vui vẻ chào tạm biệt cô.',
          yccdCodes: ['TX1'],
        },
      ],
    },
    {
      dayOfWeek: 'Thứ Năm',
      slots: [
        {
          timeSlotName: 'Đón trẻ',
          activityName: isBacHo
            ? 'Đón trẻ vào lớp, trò chuyện về những việc tốt bé đã làm được để dâng mừng sinh nhật Bác Hồ kính yêu.'
            : 'Đón trẻ, hướng dẫn trẻ tự đo thân nhiệt, quan sát tranh ảnh các hoạt động làng nghề/văn hóa.',
          yccdCodes: ['TC1.2', 'TX1'],
        },
        {
          timeSlotName: 'Thể dục sáng',
          activityName: 'Đồng diễn thể dục theo nhạc thiếu nhi sôi động, rèn luyện sự dẻo dai và tư thế ngay ngắn.',
          yccdCodes: ['TC1'],
        },
        {
          timeSlotName: 'Hoạt động học',
          activityName: isNhaTre
            ? (isBacHo
                ? 'Hoạt động với đồ vật / Tạo hình: Chấm màu, dán hoa trang trí quanh khung ảnh Bác Hồ kính yêu.'
                : 'Hoạt động với đồ vật / Tạo hình: Chấm màu / Dán hình trang trí đồ vật đơn giản.')
            : isBacHo
              ? (is5to6
                  ? 'Tạo hình: Xé dán, vẽ tranh, làm lẵng hoa tươi thắm dâng lên Chủ tịch Hồ Chí Minh kính yêu nhân ngày sinh nhật Bác 19/5.'
                  : 'Tạo hình: Cắt dán và vẽ hoa tươi thắm mừng sinh nhật Bác Hồ kính yêu.')
              : is5to6
                ? `Tạo hình (Ứng dụng STEAM): Thiết kế và chế tạo mô hình sáng tạo gắn với "${subThemeName}".`
                : `Tạo hình: Vẽ / Nặn / Cắt dán sản phẩm chủ đề "${subThemeName}".`,
          yccdCodes: ['NgT1.1', 'TC1.1'],
        },
        {
          timeSlotName: 'Hoạt động ngoài trời',
          activityName: 'Nhặt lá vàng rụng trong sân trường để làm nguyên liệu tạo hình tái chế; Chơi tự do.',
          yccdCodes: ['TX2', 'TC1.1'],
        },
        {
          timeSlotName: 'Hoạt động góc',
          activityName: isBacHo
            ? 'Góc Tạo hình: Trưng bày triển lãm tranh vẽ, bưu thiếp và lẵng hoa dâng lên Bác Hồ; Góc Đóng vai: Giới thiệu triển lãm tranh Bác Hồ.'
            : 'Góc Tạo hình: Trẻ hoàn thiện sản phẩm nghệ thuật; Trưng bày triển lãm góc nhỏ của bé.',
          yccdCodes: ['NgT1', 'NgT1.1'],
        },
        {
          timeSlotName: 'Ăn – ngủ – vệ sinh',
          activityName: 'Thực hành tự cài cúc áo sau khi thức dậy, chải tóc gọn gàng, uống nước ấm.',
          yccdCodes: ['TC1.1', 'TC1.2'],
        },
        {
          timeSlotName: 'Hoạt động chiều',
          activityName: isBacHo
            ? 'Tổ chức triển lãm sản phẩm tạo hình "Bông hoa đẹp dâng Bác Hồ": Trẻ tự hào giới thiệu sản phẩm của mình.'
            : 'Tổ chức mini-triển lãm: Trẻ giới thiệu tác phẩm nghệ thuật của mình cho bạn nghe.',
          yccdCodes: ['NN1.1', 'TX1'],
        },
        {
          timeSlotName: 'Trả trẻ',
          activityName: 'Khen ngợi trẻ có tiến bộ trong giờ tạo hình, trao đổi cùng phụ huynh.',
          yccdCodes: ['TX1'],
        },
      ],
    },
    {
      dayOfWeek: 'Thứ Sáu',
      slots: [
        {
          timeSlotName: 'Đón trẻ',
          activityName: isBacHo
            ? 'Đón trẻ với tâm thế rạng rỡ, trò chuyện về buổi biểu diễn văn nghệ mừng sinh nhật Bác Hồ vào cuối tuần.'
            : 'Đón trẻ với tâm thế vui vẻ kết thúc tuần học, trò chuyện về những điều trẻ thích nhất trong tuần.',
          yccdCodes: ['TX1', 'NN1.1'],
        },
        {
          timeSlotName: 'Thể dục sáng',
          activityName: 'Thể dục sáng nhịp điệu toàn trường, hít thở sâu, thư giãn cơ thể.',
          yccdCodes: ['TC1'],
        },
        {
          timeSlotName: 'Hoạt động học',
          activityName: isNhaTre
            ? (isBacHo
                ? 'Giáo dục Âm nhạc: Nghe hát bài "Đêm qua em mơ gặp Bác Hồ", nhún nhảy vỗ tay theo nhịp điệu yêu thương.'
                : 'Giáo dục Âm nhạc: Nghe hát bài hát êm dịu, nhún nhảy vỗ tay theo phách.')
            : isBacHo
              ? (is5to6
                  ? 'Giáo dục Âm nhạc: Dạy hát, vận động vỗ tay theo bài hát "Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng" / "Nhớ ơn Bác"; biểu diễn văn nghệ dâng lên Bác Hồ kính yêu 19/5.'
                  : 'Giáo dục Âm nhạc: Dạy hát và múa bài "Đêm qua em mơ gặp Bác Hồ" / "Nhớ ơn Bác".')
              : is5to6
                ? `Giáo dục Âm nhạc: Dạy hát, vận động minh họa sáng tạo bài hát về "${subThemeName}"; Nghe hát dân ca địa phương.`
                : `Giáo dục Âm nhạc: Dạy hát và múa phụ họa bài hát theo chủ đề nhánh.`,
          yccdCodes: ['NgT1', 'NgT1.1'],
        },
        {
          timeSlotName: 'Hoạt động ngoài trời',
          activityName: 'Giao lưu trò chơi vận động tập thể liên lớp ngoài sân trường; TCDG: "Kéo co / Nhảy bao bố".',
          yccdCodes: ['TC1', 'TX1'],
        },
        {
          timeSlotName: 'Hoạt động góc',
          activityName: isBacHo
            ? 'Góc Âm nhạc: Biểu diễn các bài hát ca ngợi Bác Hồ kính yêu với các nhạc cụ tự tạo; Góc Giao lưu bạn bè: Nêu gương bạn tốt làm theo lời Bác.'
            : 'Góc Âm nhạc: Biểu diễn văn nghệ cuối tuần với các nhạc cụ tự tạo; Góc Giao lưu bạn bè.',
          yccdCodes: ['NgT1.1', 'TX1'],
        },
        {
          timeSlotName: 'Ăn – ngủ – vệ sinh',
          activityName: 'Bảo đảm vệ sinh an toàn thực phẩm, ăn hết suất, ngủ đủ giấc chuẩn bị sinh hoạt cuối tuần.',
          yccdCodes: ['TC1.2'],
        },
        {
          timeSlotName: 'Hoạt động chiều',
          activityName: isBacHo
            ? 'Sinh hoạt cuối tuần: Nhận xét bé ngoan, tặng phiếu hoa bé ngoan dâng Bác Hồ; biểu diễn các tiết mục văn nghệ mừng sinh nhật Bác 19/5.'
            : 'Sinh hoạt cuối tuần: Nhận xét bé ngoan, tặng phiếu hoa bé ngoan, biểu diễn các tiết mục văn nghệ.',
          yccdCodes: ['TX1', 'NgT1'],
        },
        {
          timeSlotName: 'Trả trẻ',
          activityName: 'Chào cô và các bạn, chúc nhau ngày nghỉ cuối tuần vui vẻ, an toàn bên gia đình.',
          yccdCodes: ['TX1'],
        },
      ],
    },
  ];

  return {
    id: `week-${weekNumber}-${Date.now()}`,
    themeName,
    subThemeName,
    weekNumber,
    ageGroupId,
    days,
    focusYccdCodes: ['TC1', 'TX1.1', 'NN1', 'NT1', 'NgT1.1'],
    weekEvaluation: 'Trẻ tích cực tham gia các hoạt động, hứng thú khám phá và thể hiện cảm xúc phù hợp lứa tuổi.',
  };
}
