import React, { useState } from 'react';
import { PhoneCall, Check, ShieldCheck, Heart, AlertTriangle } from 'lucide-react';
import { copyToClipboard } from '../utils/exportUtils';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyZalo = () => {
    copyToClipboard('0949379531', () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <footer className="mt-16 bg-slate-900 text-slate-200 border-t-4 border-sky-500 py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>BẢN QUYỀN CHÍNH THỨC</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
            © BẢN QUYỀN APP: KẾ HOẠCH GIÁO DỤC MẦM NON MỚI
          </h2>
          <p className="text-sky-300 font-medium text-sm">
            Theo Chương trình Giáo dục Mầm non thí điểm tại Quyết định 388/QĐ-BGDĐT
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-lg max-w-xl mx-auto space-y-3">
          <p className="text-base text-slate-100 font-bold">
            Tác giả / Chủ sở hữu nội dung và App: <span className="text-amber-400 font-extrabold">Nguyễn Văn Phúc</span>
          </p>
          
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-sm text-slate-300">
              Liên hệ mua App theo năm qua Zalo:
            </span>
            <div className="inline-flex items-center gap-2">
              <a
                href="https://zalo.me/0949379531"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow transition hover:scale-105"
              >
                <PhoneCall className="w-4 h-4 text-amber-300" />
                <span>0949.379.531</span>
              </a>
              <button
                onClick={handleCopyZalo}
                className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-medium transition"
                title="Sao chép số Zalo"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : 'Sao chép'}
              </button>
            </div>
          </div>
        </div>

        {/* AI Disclaimer and Verification Note */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/90 border border-amber-500/30 max-w-2xl mx-auto text-left space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wide">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Lưu ý kiểm tra nội dung &amp; Miễn trừ trách nhiệm pháp lý</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Nội dung kế hoạch và giáo án do Trí tuệ nhân tạo (AI) hỗ trợ xây dựng chỉ mang tính chất tham khảo chuyên môn và gợi ý soạn giảng. Do mô hình AI có thể phát sinh sai sót, nhầm lẫn hoặc chưa hoàn toàn phù hợp với thực tế của từng đơn vị, giáo viên và nhà trường <strong>bắt buộc phải kiểm tra kỹ lưỡng, rà soát và điều chỉnh</strong> theo Chương trình GDMN và điều kiện thực tế trước khi áp dụng hoặc phê duyệt ban hành. Tác giả và ứng dụng <strong>miễn trừ mọi trách nhiệm pháp lý</strong> liên quan đến các sai sót hoặc việc sử dụng nguyên trạng nội dung do AI tạo ra.
          </p>
        </div>

        <div className="pt-2 text-xs text-slate-500 flex items-center justify-center gap-1">
          <span>Đồng hành cùng giáo viên mầm non Việt Nam</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        </div>
      </div>
    </footer>
  );
};
