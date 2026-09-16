import React, { useState } from 'react';
import { X, MapPin, School, Building2, Check, Sparkles } from 'lucide-react';
import { LocalAndSchoolInfo } from '../types';

interface LocalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  info: LocalAndSchoolInfo;
  onSave: (newInfo: LocalAndSchoolInfo) => void;
}

export const LocalInfoModal: React.FC<LocalInfoModalProps> = ({
  isOpen,
  onClose,
  info,
  onSave,
}) => {
  const [formData, setFormData] = useState<LocalAndSchoolInfo>(info);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden border border-sky-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-indigo-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/15">
              <MapPin className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">THÔNG TIN TRƯỜNG & ĐỊA PHƯƠNG</h2>
              <p className="text-xs text-sky-100">
                Đơn vị hành chính cấp Xã/Phường, Tỉnh/Thành phố sau sáp nhập theo QĐ 388
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/20 transition text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Thông tin trường lớp */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-700 flex items-center gap-1.5 pb-1 border-b border-sky-100">
              <School className="w-4 h-4" /> 1. Thông tin trường & Lớp học
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Năm học
                </label>
                <input
                  type="text"
                  value={formData.schoolYear}
                  onChange={e => setFormData({ ...formData, schoolYear: e.target.value })}
                  placeholder="Ví dụ: 2025 - 2026"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên trường mầm non
                </label>
                <input
                  type="text"
                  value={formData.schoolName}
                  onChange={e => setFormData({ ...formData, schoolName: e.target.value })}
                  placeholder="Ví dụ: Mầm non Hoa Sen"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tên lớp
                </label>
                <input
                  type="text"
                  value={formData.className}
                  onChange={e => setFormData({ ...formData, className: e.target.value })}
                  placeholder="Ví dụ: Lớp Mẫu giáo Lớn A1"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Số lượng trẻ trong lớp
                </label>
                <input
                  type="number"
                  value={formData.childrenCount}
                  onChange={e => setFormData({ ...formData, childrenCount: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  min="1"
                  max="60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Giáo viên phụ trách
                </label>
                <input
                  type="text"
                  value={formData.teacherName}
                  onChange={e => setFormData({ ...formData, teacherName: e.target.value })}
                  placeholder="Họ và tên giáo viên"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Thời lượng thực hiện (tuần)
                </label>
                <input
                  type="number"
                  value={formData.programDurationWeeks}
                  onChange={e => setFormData({ ...formData, programDurationWeeks: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  min="20"
                  max="40"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Địa phương hiện hành sau sáp nhập (Xã/Phường, Tỉnh/Thành phố) */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-700 flex items-center gap-1.5 pb-1 border-b border-sky-100">
              <Building2 className="w-4 h-4 text-amber-500" /> 2. Địa phương (Xã/Phường, Tỉnh/Thành phố) & Bản sắc văn hóa
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tỉnh / Thành phố
                </label>
                <input
                  type="text"
                  value={formData.province}
                  onChange={e => setFormData({ ...formData, province: e.target.value })}
                  placeholder="Ví dụ: Tỉnh Nghệ An, TP. Hà Nội, Đà Nẵng..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Xã / Phường (Đơn vị hành chính sau sáp nhập)
                </label>
                <input
                  type="text"
                  value={formData.commune}
                  onChange={e => setFormData({ ...formData, commune: e.target.value })}
                  placeholder="Ví dụ: Xã Nam Hoa (hoặc Phường Nam Hoa...)"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Địa danh lịch sử / Tên cũ trước sáp nhập (nếu cần liên hệ)
              </label>
              <input
                type="text"
                value={formData.historicalName || ''}
                onChange={e => setFormData({ ...formData, historicalName: e.target.value })}
                placeholder="Ví dụ: Trước sáp nhập gồm xã A và xã B..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Đặc điểm nổi bật của địa phương (Làng nghề, di tích, danh lam, món ăn, lễ hội)
              </label>
              <textarea
                value={formData.localFeatures}
                onChange={e => setFormData({ ...formData, localFeatures: e.target.value })}
                rows={3}
                placeholder="Ví dụ: Có làng nghề làm gốm, di tích đền Hai Bà Trưng, món bánh tẻ truyền thống, lễ hội mùa xuân..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                * AI sẽ sử dụng các dữ kiện địa phương này khi tạo chủ đề &quot;Quê hương - Đất nước - Bác Hồ kính yêu&quot; và các hoạt động trải nghiệm.
              </p>
            </div>
          </div>

          {/* Section 3: Điều kiện cơ sở vật chất & STEAM */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-700 flex items-center gap-1.5 pb-1 border-b border-sky-100">
              <Sparkles className="w-4 h-4 text-purple-500" /> 3. Cơ sở vật chất & STEAM
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Đặc điểm trường lớp & Đồ dùng dạy học
              </label>
              <input
                type="text"
                value={formData.schoolFeatures}
                onChange={e => setFormData({ ...formData, schoolFeatures: e.target.value })}
                placeholder="Sân trường rộng, nhiều cây xanh, đồ chơi thông minh..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div className="flex items-center gap-3 p-3 bg-sky-50/70 rounded-xl border border-sky-100">
              <input
                type="checkbox"
                id="steam-check"
                checked={formData.hasSteamFacility}
                onChange={e => setFormData({ ...formData, hasSteamFacility: e.target.checked })}
                className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500 border-slate-300"
              />
              <label htmlFor="steam-check" className="text-xs font-semibold text-slate-800 cursor-pointer">
                Lớp học / Nhà trường có điều kiện tổ chức hoạt động STEAM / EDP
              </label>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Lưu thông tin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
