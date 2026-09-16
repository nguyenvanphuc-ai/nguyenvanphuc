import { AgeGroupId, DomainCode, DomainInfo, YCCDItem } from '../types';

export const DOMAINS: Record<DomainCode, DomainInfo> = {
  TC: {
    code: 'TC',
    name: 'Thể chất',
    shortName: 'Thể chất',
    color: 'text-rose-600',
    bgLight: 'bg-rose-50 text-rose-700 border-rose-200',
    border: 'border-rose-400',
  },
  TX: {
    code: 'TX',
    name: 'Tình cảm – Xã hội',
    shortName: 'Tình cảm - XH',
    color: 'text-amber-600',
    bgLight: 'bg-amber-50 text-amber-700 border-amber-200',
    border: 'border-amber-400',
  },
  NN: {
    code: 'NN',
    name: 'Ngôn ngữ',
    shortName: 'Ngôn ngữ',
    color: 'text-sky-600',
    bgLight: 'bg-sky-50 text-sky-700 border-sky-200',
    border: 'border-sky-400',
  },
  NT: {
    code: 'NT',
    name: 'Nhận thức',
    shortName: 'Nhận thức',
    color: 'text-emerald-600',
    bgLight: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    border: 'border-emerald-400',
  },
  NgT: {
    code: 'NgT',
    name: 'Nghệ thuật',
    shortName: 'Nghệ thuật',
    color: 'text-purple-600',
    bgLight: 'bg-purple-50 text-purple-700 border-purple-200',
    border: 'border-purple-400',
  },
};

export const AGE_GROUPS_LIST = [
  {
    id: 'nha-tre-18-24' as AgeGroupId,
    label: 'Nhà trẻ 18–24 tháng',
    category: 'Nhà trẻ' as const,
    ageRange: '18 - 24 tháng tuổi',
    description: 'Tập trung nhận biết thế giới xung quanh qua giác quan, vận động thô cơ bản, ngôn ngữ cử chỉ và từ đơn.',
    timeSlotMinutes: { study: 15, outdoor: 25, activityCorner: 20 },
  },
  {
    id: 'nha-tre-24-36' as AgeGroupId,
    label: 'Nhà trẻ 24–36 tháng',
    category: 'Nhà trẻ' as const,
    ageRange: '24 - 36 tháng tuổi',
    description: 'Phát triển câu ngắn 2-3 từ, đi chạy vững vàng, thao tác với đồ vật, nhận biết màu sắc và hình dạng đơn giản.',
    timeSlotMinutes: { study: 15, outdoor: 30, activityCorner: 25 },
  },
  {
    id: 'mau-giao-3-4' as AgeGroupId,
    label: 'Mẫu giáo 3–4 tuổi',
    category: 'Mẫu giáo' as const,
    ageRange: '3 - 4 tuổi (Mầm)',
    description: 'Bắt đầu giai đoạn mẫu giáo, phát triển câu giao tiếp hoàn chỉnh, hợp tác nhóm nhỏ, tò mò khám phá sự vật.',
    timeSlotMinutes: { study: 20, outdoor: 35, activityCorner: 30 },
  },
  {
    id: 'mau-giao-4-5' as AgeGroupId,
    label: 'Mẫu giáo 4–5 tuổi',
    category: 'Mẫu giáo' as const,
    ageRange: '4 - 5 tuổi (Chồi)',
    description: 'Tư duy trực quan hình tượng phát triển, biết so sánh, phân loại, ghi nhớ có chủ định, kỹ năng tự phục vụ tốt.',
    timeSlotMinutes: { study: 25, outdoor: 40, activityCorner: 35 },
  },
  {
    id: 'mau-giao-5-6' as AgeGroupId,
    label: 'Mẫu giáo 5–6 tuổi',
    category: 'Mẫu giáo' as const,
    ageRange: '5 - 6 tuổi (Lá)',
    description: 'Chuẩn bị tâm thế vào lớp 1, khả năng giải quyết vấn đề, trải nghiệm STEAM, mở rộng hiểu biết xã hội và quê hương.',
    timeSlotMinutes: { study: 30, outdoor: 40, activityCorner: 40 },
  },
];

// Ngân hàng YCCĐ chuẩn hóa theo 5 lĩnh vực của Chương trình GDMN mới (QĐ 388/QĐ-BGDĐT)
export const INITIAL_YCCD_DATABASE: YCCDItem[] = [
  // ===================== THỂ CHẤT (TC) =====================
  {
    code: 'TC1',
    domain: 'TC',
    domainName: 'Thể chất',
    content: 'Thực hiện được các vận động cơ bản (đi, chạy, nhảy, bò, trườn, ném, bắt) vững vàng, tự tin và phối hợp khéo léo các giác quan.',
    milestone: '6 tuổi',
    applicableAges: ['nha-tre-18-24', 'nha-tre-24-36', 'mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
    ageGuideline: {
      'nha-tre-18-24': 'Đi thăng bằng từng bước, bước qua vật cản thấp 5-10cm, ngồi xổm đứng lên vững.',
      'nha-tre-24-36': 'Đi thay đổi hướng theo hiệu lệnh, chạy chậm 10m, bật tại chỗ bằng 2 chân.',
      'mau-giao-3-4': 'Đi kiễng gót liên tục 3-5m, bật xa 25-30cm, ném bóng trúng đích ngang.',
      'mau-giao-4-5': 'Chạy liên tục theo đường zíc zắc không chệch ra ngoài, nhảy lò cò 3-4 bước liên tục.',
      'mau-giao-5-6': 'Chạy nhanh 15m trong khoảng 5 giây, bật sâu 30-35cm, phối hợp tay - chân nhịp nhàng khi leo trèo cẩn thận.',
    },
  },
  {
    code: 'TC1.1',
    domain: 'TC',
    domainName: 'Thể chất',
    content: 'Thực hiện cử động của bàn tay, ngón tay khéo léo, phối hợp tay - mắt trong các hoạt động tự phục vụ và tạo hình.',
    milestone: '6 tuổi',
    applicableAges: ['nha-tre-18-24', 'nha-tre-24-36', 'mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
    ageGuideline: {
      'nha-tre-18-24': 'Biết nhặt hạt to, xếp chồng 2-3 khối gỗ, cầm thìa xúc thức ăn với sự trợ giúp.',
      'nha-tre-24-36': 'Xâu được vòng hạt to, xoay vặn nắp hộp, tự cầm cốc uống nước không đổ.',
      'mau-giao-3-4': 'Cầm kéo cắt theo đường thẳng ngắn, vo viên đất, cài và cởi cúc áo cỡ lớn.',
      'mau-giao-4-5': 'Gập giấy đôi mép trùng khít, luồn dây qua lỗ nhỏ, cắt theo đường cong đơn giản.',
      'mau-giao-5-6': 'Cắt dán chi tiết tỉ mỉ, thắt dây giày/buộc nơ cơ bản, cầm bút viết nét thanh nét đậm đúng tư thế.',
    },
  },
  {
    code: 'TC1.2',
    domain: 'TC',
    domainName: 'Thể chất',
    content: 'Có hiểu biết và hình thành nền nếp, thói quen tốt trong vệ sinh cá nhân, ăn uống an toàn và bảo vệ sức khỏe bản thân.',
    milestone: '6 tuổi',
    applicableAges: ['nha-tre-18-24', 'nha-tre-24-36', 'mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
    ageGuideline: {
      'nha-tre-18-24': 'Biết rửa tay khi cô nhắc, chịu đội mũ nón khi ra sân chơi ngoài trời.',
      'nha-tre-24-36': 'Tự lau mặt, lau miệng sau khi ăn, nhận biết khi quần áo ướt/bẩn để báo cô.',
      'mau-giao-3-4': 'Tự rửa tay bằng xà phòng đúng quy trình, tự xúc ăn gọn gàng, uống đủ nước.',
      'mau-giao-4-5': 'Biết đánh răng sau bữa ăn, phân biệt thức ăn chín - ôi thiu cơ bản, mặc quần áo theo thời tiết.',
      'mau-giao-5-6': 'Chủ động vệ sinh cá nhân, nhận biết các nhóm chất dinh dưỡng cần thiết, tự giữ gìn đồ dùng học tập sạch sẽ.',
    },
  },
  {
    code: 'TC2',
    domain: 'TC',
    domainName: 'Thể chất',
    content: 'Biết nhận diện các nguy cơ gây tai nạn thương tích phổ biến và có kỹ năng tự bảo vệ an toàn nơi trường lớp, ở nhà và nơi công cộng.',
    milestone: '6 tuổi',
    applicableAges: ['nha-tre-24-36', 'mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
    ageGuideline: {
      'nha-tre-18-24': 'Tránh xa ổ điện, phích nước nóng khi cô hoặc bố mẹ cảnh báo "nóng", "nguy hiểm".',
      'nha-tre-24-36': 'Không cho đồ vật nhỏ vào miệng, mũi, tai; không đi theo người lạ khi chưa hỏi cô.',
      'mau-giao-3-4': 'Nhận ra nơi nguy hiểm (ao hồ, cầu thang dốc, bếp lửa) và không tự ý đến gần.',
      'mau-giao-4-5': 'Biết kêu cứu hoặc gọi người lớn khi gặp sự cố, nhớ số điện thoại khẩn cấp hoặc của bố mẹ.',
      'mau-giao-5-6': 'Thực hành các kỹ năng thoát hiểm khi có hỏa hoạn (che mũi miệng, đi khom), tuân thủ luật giao thông cho người đi bộ.',
    },
  },

  // ===================== TÌNH CẢM – XÃ HỘI (TX) =====================
  {
    code: 'TX1',
    domain: 'TX',
    domainName: 'Tình cảm – Xã hội',
    content: 'Nhận thức được bản thân, biểu lộ cảm xúc phù hợp và biết điều chỉnh cảm xúc, hành vi trong các mối quan hệ với mọi người xung quanh.',
    milestone: '6 tuổi',
    applicableAges: ['nha-tre-18-24', 'nha-tre-24-36', 'mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
    ageGuideline: {
      'nha-tre-18-24': 'Nhận ra hình ảnh mình trong gương, biết gọi tên bản thân, mỉm cười chào cô.',
      'nha-tre-24-36': 'Nói được tên, giới tính của mình; biểu lộ vui, buồn, sợ hãi bằng cử chỉ và từ ngữ ngắn.',
      'mau-giao-3-4': 'Nêu được sở thích, ngày sinh nhật đơn giản; biết kiềm chế khóc nhè khi vào lớp.',
      'mau-giao-4-5': 'Tự tin giới thiệu bản thân trước lớp, biết chia sẻ đồ chơi và an ủi bạn khi bạn buồn.',
      'mau-giao-5-6': 'Tự đánh giá được điểm mạnh và việc mình chưa làm được; bình tĩnh giải quyết xung đột bằng lời nói thay vì xô đẩy.',
    },
  },
  {
    code: 'TX1.1',
    domain: 'TX',
    domainName: 'Tình cảm – Xã hội',
    content: 'Thể hiện tình cảm gắn bó, kính trọng, yêu thương đối với ông bà, cha mẹ, thầy cô, bạn bè và mọi người xung quanh.',
    milestone: '6 tuổi',
    applicableAges: ['nha-tre-18-24', 'nha-tre-24-36', 'mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
    ageGuideline: {
      'nha-tre-18-24': 'Vẫy tay chào tạm biệt, ôm hôn bố mẹ, nghe lời nhắc nhở nhẹ nhàng của cô.',
      'nha-tre-24-36': 'Biết dạ, vâng khi người lớn gọi; chơi cạnh bạn mà không cắn, không cào cấu.',
      'mau-giao-3-4': 'Biết cảm ơn khi được cho quà, xin lỗi khi làm sai; thích cùng bạn chơi các trò chơi đóng vai.',
      'mau-giao-4-5': 'Quan tâm giúp đỡ bạn bè gặp khó khăn, biết làm một số việc vừa sức giúp bố mẹ ở nhà.',
      'mau-giao-5-6': 'Biết bày tỏ lòng biết ơn đối với người có công, yêu mến các nghề nghiệp phục vụ đời sống, tôn trọng sự khác biệt của bạn bè.',
    },
  },
  {
    code: 'TX1.2',
    domain: 'TX',
    domainName: 'Tình cảm – Xã hội',
    content: 'Thể hiện tình yêu quê hương, đất nước, niềm tự hào dân tộc và lòng kính yêu sâu sắc đối với Bác Hồ kính yêu phù hợp với lứa tuổi.',
    milestone: '6 tuổi',
    applicableAges: ['nha-tre-18-24', 'nha-tre-24-36', 'mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
    ageGuideline: {
      'nha-tre-18-24': 'Nhìn ngắm ảnh Bác Hồ treo ở lớp với tình cảm thân thiện, nhận biết lớp học và ngôi nhà của bé.',
      'nha-tre-24-36': 'Chỉ vào ảnh Bác Hồ và nói "Bác Hồ", thích nghe bài hát ru con và hát về quê hương gần gũi.',
      'mau-giao-3-4': 'Biết Bác Hồ yêu các cháu thiếu nhi, biết tên xã/phường, tên trường mầm non nơi mình theo học.',
      'mau-giao-4-5': 'Biết kể một số cảnh đẹp, món ăn ngon của quê hương mình; đứng trang nghiêm khi chào cờ Tổ quốc.',
      'mau-giao-5-6': 'Nhận biết Quốc kỳ, Quốc ca, Thủ đô Hà Nội; kể tên di tích lịch sử, danh lam thắng cảnh, làng nghề nổi tiếng của địa phương (sau sáp nhập) và thể hiện mong muốn bảo tồn quê hương.',
    },
  },
  {
    code: 'TX2',
    domain: 'TX',
    domainName: 'Tình cảm – Xã hội',
    content: 'Có ý thức giữ gìn, bảo vệ môi trường sống, chăm sóc cây xanh, con vật nuôi và tiết kiệm tài nguyên năng lượng.',
    milestone: '6 tuổi',
    applicableAges: ['nha-tre-24-36', 'mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
    ageGuideline: {
      'nha-tre-18-24': 'Không ngắt lá, bẻ cành cây non trong vườn trường khi cô hướng dẫn.',
      'nha-tre-24-36': 'Biết bỏ rác vào thùng sau khi ăn bánh kẹo theo lời hướng dẫn của cô.',
      'mau-giao-3-4': 'Cùng cô tưới cây, lau lá trong góc thiên nhiên; tắt vòi nước sau khi rửa tay xong.',
      'mau-giao-4-5': 'Phân loại rác cơ bản (rác hữu cơ, vô cơ), nhắc nhở bạn không vứt rác bừa bãi ra sân trường.',
      'mau-giao-5-6': 'Chủ động tham gia ngày hội bảo vệ môi trường, biết sử dụng vật liệu tái chế để làm đồ dùng đồ chơi sáng tạo.',
    },
  },

  // ===================== NGÔN NGỮ (NN) =====================
  {
    code: 'NN1',
    domain: 'NN',
    domainName: 'Ngôn ngữ',
    content: 'Nghe hiểu lời nói trong giao tiếp hằng ngày, hiểu được các chỉ dẫn, câu chuyện, bài thơ và nội dung trao đổi phù hợp lứa tuổi.',
    milestone: '6 tuổi',
    applicableAges: ['nha-tre-18-24', 'nha-tre-24-36', 'mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
    ageGuideline: {
      'nha-tre-18-24': 'Lắng nghe giọng nói của cô, hiểu câu lệnh đơn giản: "lại đây", "khoanh tay", "uống nước".',
      'nha-tre-24-36': 'Hiểu câu hỏi "cái gì?", "ở đâu?", "ai đây?"; chú ý nghe cô kể câu chuyện ngắn 1-2 phút.',
      'mau-giao-3-4': 'Hiểu nội dung câu chuyện, bài thơ ngắn; trả lời đúng câu hỏi "như thế nào?", "để làm gì?".',
      'mau-giao-4-5': 'Hiểu và thực hiện liên tiếp 2-3 chỉ dẫn của cô; hiểu nghĩa của một số từ đồng nghĩa đơn giản.',
      'mau-giao-5-6': 'Lắng nghe kiên nhẫn khi người khác nói; hiểu được thông điệp chính và các chi tiết đặc sắc trong câu chuyện văn học dân gian hoặc truyện thiếu nhi.',
    },
  },
  {
    code: 'NN1.1',
    domain: 'NN',
    domainName: 'Ngôn ngữ',
    content: 'Sử dụng lời nói rõ ràng, diễn đạt mạch lạc suy nghĩ, mong muốn, cảm xúc và kể lại sự việc diễn ra bằng ngôn ngữ tiếng Việt chuẩn mực.',
    milestone: '6 tuổi',
    applicableAges: ['nha-tre-18-24', 'nha-tre-24-36', 'mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
    ageGuideline: {
      'nha-tre-18-24': 'Nói được từ đơn, từ đôi: "bà ơi", "cô bế", "đi chơi", "uống nước", phát âm tròn vành.',
      'nha-tre-24-36': 'Nói câu ngắn 3-4 từ: "Con muốn đi vệ sinh", "Bé ăn cơm", biết đọc vuốt theo đuôi câu thơ.',
      'mau-giao-3-4': 'Nói trọn vẹn câu ghép đơn giản, kể lại được chuyện xảy ra ở nhà cho cô và các bạn nghe.',
      'mau-giao-4-5': 'Dùng từ chỉ thời gian (hôm qua, hôm nay, ngày mai), diễn đạt rõ ràng cảm xúc và ý kiến của bản thân.',
      'mau-giao-5-6': 'Kể lại chuyện có mở đầu - diễn biến - kết thúc, sử dụng các từ ngữ biểu cảm phong phú, biết tranh luận ôn hòa về một chủ đề.',
    },
  },
  {
    code: 'NN1.2',
    domain: 'NN',
    domainName: 'Ngôn ngữ',
    content: 'Làm quen với việc đọc, viết và sử dụng sách, tranh ảnh như một phương tiện khám phá thông tin và giải trí lành mạnh.',
    milestone: '6 tuổi',
    applicableAges: ['mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
    ageGuideline: {
      'nha-tre-18-24': 'Thích xem tranh sách khổ to, lật từng trang dày cùng cô giáo.',
      'nha-tre-24-36': 'Chỉ vào con vật, đồ vật trong sách và gọi tên chính xác.',
      'mau-giao-3-4': 'Biết cầm sách đúng chiều, lật giở từ trang đầu đến trang cuối cẩn thận.',
      'mau-giao-4-5': 'Nhận ra các ký hiệu thông thường (biển báo lối thoát hiểm, WC, chữ cái đầu trong tên mình).',
      'mau-giao-5-6': 'Nhận dạng và phát âm đúng 29 chữ cái tiếng Việt; hiểu hướng đọc từ trái sang phải, từ trên xuống dưới; thử sao chép tên mình.',
    },
  },

  // ===================== NHẬN THỨC (NT) =====================
  {
    code: 'NT1',
    domain: 'NT',
    domainName: 'Nhận thức',
    content: 'Tò mò, ham học hỏi, khám phá các sự vật, hiện tượng xung quanh qua quan sát, trải nghiệm thực tế và giải quyết vấn đề đơn giản.',
    milestone: '6 tuổi',
    applicableAges: ['nha-tre-18-24', 'nha-tre-24-36', 'mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
    ageGuideline: {
      'nha-tre-18-24': 'Dùng các giác quan sờ, nhìn, nghe, nếm thử đồ chơi mới; tìm kiếm đồ vật bị giấu một phần.',
      'nha-tre-24-36': 'Hay hỏi "cái gì đây?", thích nghịch nước, cát, lá cây dưới sự giám sát của cô.',
      'mau-giao-3-4': 'Đặt câu hỏi "tại sao?", phát hiện điểm giống và khác nhau rõ nét giữa 2 con vật/đồ vật.',
      'mau-giao-4-5': 'Phán đoán đơn giản qua thí nghiệm (chìm - nổi, tan - không tan), phân nhóm đồ vật theo 2 dấu hiệu.',
      'mau-giao-5-6': 'Ứng dụng kiến thức giải quyết vấn đề trong dự án STEAM/EDP nhỏ, giải thích mối quan hệ nguyên nhân - kết quả quen thuộc trong tự nhiên.',
    },
  },
  {
    code: 'NT1.1',
    domain: 'NT',
    domainName: 'Nhận thức',
    content: 'Nhận biết các biểu tượng toán học sơ đẳng về số lượng, kích thước, hình dạng, định hướng không gian và thời gian.',
    milestone: '6 tuổi',
    applicableAges: ['nha-tre-18-24', 'nha-tre-24-36', 'mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
    ageGuideline: {
      'nha-tre-18-24': 'Nhận biết kích thước "to - nhỏ", nhận biết màu đỏ - vàng - xanh cơ bản.',
      'nha-tre-24-36': 'Nhận biết "một và nhiều", phân biệt hình tròn - hình vuông bằng tay sờ đường bao.',
      'mau-giao-3-4': 'Đếm trong phạm vi 5, so sánh kích thước 2 đối tượng (dài hơn - ngắn hơn, cao hơn - thấp hơn).',
      'mau-giao-4-5': 'Đếm trong phạm vi 10, so sánh số lượng giữa 2 nhóm đối tượng, định hướng phải - trái, trước - sau của bản thân.',
      'mau-giao-5-6': 'Tách gộp số lượng trong phạm vi 10, nhận biết các ngày trong tuần, định hướng không gian so với bạn khác hoặc vật chuẩn.',
    },
  },
  {
    code: 'NT1.2',
    domain: 'NT',
    domainName: 'Nhận thức',
    content: 'Có hiểu biết phong phú về môi trường tự nhiên, động thực vật, con người, các nghề nghiệp xã hội và văn hóa truyền thống quê hương.',
    milestone: '6 tuổi',
    applicableAges: ['nha-tre-18-24', 'nha-tre-24-36', 'mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
    ageGuideline: {
      'nha-tre-18-24': 'Gọi tên con chó, con mèo, ô tô, xe máy qua mô hình hoặc tranh ảnh thật.',
      'nha-tre-24-36': 'Nhận biết một số loại hoa, quả quen thuộc theo màu sắc và mùi vị đặc trưng.',
      'mau-giao-3-4': 'Kể tên một số nghề phổ biến (bác sĩ, giáo viên, bác nông dân) và công cụ lao động gắn liền.',
      'mau-giao-4-5': 'Hiểu quá trình sinh trưởng của cây từ hạt, ích lợi của con vật nuôi và sản phẩm nông nghiệp địa phương.',
      'mau-giao-5-6': 'Khám phá văn hóa, di tích lịch sử, sản phẩm đặc sản của xã/phường sau sáp nhập; hiểu ý nghĩa của các ngày lễ lớn (20/11, 22/12, Giỗ Tổ Hùng Vương, 30/4, 19/5).',
    },
  },

  // ===================== NGHỆ THUẬT (NgT) =====================
  {
    code: 'NgT1',
    domain: 'NgT',
    domainName: 'Nghệ thuật',
    content: 'Cảm nhận và thể hiện cảm xúc trước vẻ đẹp của thiên nhiên, cuộc sống và các tác phẩm nghệ thuật âm nhạc, tạo hình.',
    milestone: '6 tuổi',
    applicableAges: ['nha-tre-18-24', 'nha-tre-24-36', 'mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
    ageGuideline: {
      'nha-tre-18-24': 'Lắc lư theo điệu nhạc vui, thích thú nhìn ngắm những bức tranh nhiều màu sắc sặc sỡ.',
      'nha-tre-24-36': 'Vỗ tay theo nhịp bài hát ngắn, ngắm nhìn và reo vui khi thấy sản phẩm bông hoa do mình chấm màu.',
      'mau-giao-3-4': 'Biết chú ý lắng nghe giai điệu bài hát êm dịu, nhận xét tranh bạn vẽ bằng những câu khen ngợi mộc mạc.',
      'mau-giao-4-5': 'Biết rung động trước cảnh đẹp bình minh, hoàng hôn, hoa nở; chia sẻ cảm nhận về một tác phẩm âm nhạc truyền thống.',
      'mau-giao-5-6': 'Tự tin biểu diễn văn nghệ trước đám đông, biết thưởng thức và giữ gìn các làn điệu dân ca, trò chơi dân gian đặc sắc của quê hương.',
    },
  },
  {
    code: 'NgT1.1',
    domain: 'NgT',
    domainName: 'Nghệ thuật',
    content: 'Có kỹ năng tạo hình và âm nhạc (hát, vận động, gõ đệm, vẽ, nặn, xé dán, xếp hình) để sáng tạo sản phẩm nghệ thuật theo ý thích.',
    milestone: '6 tuổi',
    applicableAges: ['nha-tre-18-24', 'nha-tre-24-36', 'mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
    ageGuideline: {
      'nha-tre-18-24': 'Cầm sáp màu vạch các đường nét nguệch ngoạc lên giấy to; nhún nhảy theo bài hát ngắn.',
      'nha-tre-24-36': 'Chấm màu ngón tay tạo thành chùm quả, lăn dọc đất nặn, hát được câu cuối bài hát quen thuộc.',
      'mau-giao-3-4': 'Vẽ nét cong khép kín tạo quả bóng, xé dải giấy dài dán hàng rào, gõ đệm theo tiết tấu chậm.',
      'mau-giao-4-5': 'Phối hợp các màu sắc hài hòa trong bức tranh, tạo hình con vật từ lá cây khô, hát đúng giai điệu và lời ca.',
      'mau-giao-5-6': 'Sáng tạo bức tranh có bố cục cân đối, xa gần; tự thiết kế trang phục biểu diễn bằng vật liệu tái chế; tự nghĩ ra động tác múa phụ họa theo lời ca.',
    },
  },
];

// Helper to look up YCCD Item by code
export function findYCCDByCode(code: string): YCCDItem | undefined {
  return INITIAL_YCCD_DATABASE.find(item => item.code.toUpperCase() === code.toUpperCase());
}

// Format YCCD for display as mandated by prompt: "Mã YCCĐ + Nội dung YCCĐ + Lĩnh vực"
export function formatYCCDDisplay(item: YCCDItem, ageId?: AgeGroupId): string {
  const guideline = ageId && item.ageGuideline[ageId] ? ` (Độ tuổi: ${item.ageGuideline[ageId]})` : '';
  return `[${item.code}] - ${item.domainName}: ${item.content}${guideline}`;
}
