import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Database, 
  Plus, 
  Filter, 
  Check, 
  Tag,
  Info 
} from 'lucide-react';
import { DomainCode, YCCDItem } from '../types';
import { DOMAINS, INITIAL_YCCD_DATABASE, formatYCCDDisplay } from '../data/yccdData';

interface YCCDBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  yccdList: YCCDItem[];
  onAddYccd: (item: YCCDItem) => void;
}

export const YCCDBankModal: React.FC<YCCDBankModalProps> = ({
  isOpen,
  onClose,
  yccdList,
  onAddYccd,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<DomainCode | 'ALL'>('ALL');
  const [showAddForm, setShowAddForm] = useState(false);

  // New item state
  const [newCode, setNewCode] = useState('');
  const [newDomain, setNewDomain] = useState<DomainCode>('TC');
  const [newContent, setNewContent] = useState('');
  const [newMilestone, setNewMilestone] = useState<'36 tháng' | '6 tuổi'>('6 tuổi');

  if (!isOpen) return null;

  const filteredItems = yccdList.filter(item => {
    const matchesDomain = selectedDomain === 'ALL' || item.domain === selectedDomain;
    const matchesSearch = 
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.domainName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newContent.trim()) return;

    const newItem: YCCDItem = {
      code: newCode.trim().toUpperCase(),
      domain: newDomain,
      domainName: DOMAINS[newDomain].name,
      content: newContent.trim(),
      milestone: newMilestone,
      applicableAges: ['nha-tre-18-24', 'nha-tre-24-36', 'mau-giao-3-4', 'mau-giao-4-5', 'mau-giao-5-6'],
      ageGuideline: {
        'nha-tre-18-24': 'Thực hiện ở mức nhận biết cơ bản và phản xạ giác quan.',
        'nha-tre-24-36': 'Thực hiện với sự hỗ trợ của cô và đồ dùng trực quan.',
        'mau-giao-3-4': 'Bắt đầu tự giác thực hiện theo hướng dẫn.',
        'mau-giao-4-5': 'Thực hiện độc lập và phối hợp cùng bạn.',
        'mau-giao-5-6': 'Thuần thục, sáng tạo và giải thích được việc mình làm.',
      },
    };

    onAddYccd(newItem);
    setNewCode('');
    setNewContent('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 overflow-hidden border border-emerald-100 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/15">
              <Database className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                NGÂN HÀNG YÊU CẦU CẦN ĐẠT (YCCĐ) MÃ HÓA
              </h2>
              <p className="text-xs text-emerald-100">
                Chuẩn hóa theo 5 lĩnh vực tại Chương trình GDMN mới (QĐ 388/QĐ-BGDĐT)
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

        {/* Filter bar & Actions */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm mã (TC1, NN...), nội dung YCCĐ..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Domain tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedDomain('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedDomain === 'ALL'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              Tất cả ({yccdList.length})
            </button>
            {(Object.keys(DOMAINS) as DomainCode[]).map(code => {
              const dom = DOMAINS[code];
              const count = yccdList.filter(i => i.domain === code).length;
              return (
                <button
                  key={code}
                  onClick={() => setSelectedDomain(code)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    selectedDomain === code
                      ? `${dom.bgLight} border font-bold shadow-xs`
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-300'
                  }`}
                >
                  {code} ({count})
                </button>
              );
            })}

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1 shrink-0 ml-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddForm ? 'Đóng form' : 'Bổ sung YCCĐ'}</span>
            </button>
          </div>
        </div>

        {/* Add Form (Collapsible) */}
        {showAddForm && (
          <form onSubmit={handleCreateNew} className="p-4 bg-emerald-50 border-b border-emerald-200 space-y-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 uppercase">
                + Thêm YCCĐ mới vào Ngân hàng dữ liệu
              </span>
              <span className="text-[11px] text-emerald-700">
                Chủ App có thể bổ sung YCCĐ chính thức bất cứ lúc nào
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mã YCCĐ (ví dụ: TC2.1)
                </label>
                <input
                  type="text"
                  value={newCode}
                  onChange={e => setNewCode(e.target.value)}
                  placeholder="TC2.1"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-bold text-sky-800"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lĩnh vực
                </label>
                <select
                  value={newDomain}
                  onChange={e => setNewDomain(e.target.value as DomainCode)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-semibold text-slate-800"
                >
                  {(Object.keys(DOMAINS) as DomainCode[]).map(code => (
                    <option key={code} value={code}>
                      {code} - {DOMAINS[code].name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mốc cuối độ tuổi
                </label>
                <select
                  value={newMilestone}
                  onChange={e => setNewMilestone(e.target.value as any)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-800"
                >
                  <option value="36 tháng">Cuối Nhà trẻ (36 tháng)</option>
                  <option value="6 tuổi">Cuối Mẫu giáo (6 tuổi)</option>
                </select>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nội dung Yêu cầu cần đạt
                </label>
                <textarea
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="Ghi rõ nội dung yêu cầu cần đạt theo chuẩn QĐ 388/QĐ-BGDĐT..."
                  rows={2}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded shadow-xs"
              >
                Lưu vào Ngân hàng
              </button>
            </div>
          </form>
        )}

        {/* YCCD Cards list */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {filteredItems.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              Không tìm thấy YCCĐ nào khớp với từ khóa tìm kiếm.
            </div>
          ) : (
            filteredItems.map(item => {
              const dom = DOMAINS[item.domain] || DOMAINS.TC;
              return (
                <div
                  key={item.code}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs transition space-y-2.5"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-extrabold border ${dom.bgLight}`}>
                        {item.code}
                      </span>
                      <span className="text-xs font-bold text-slate-700">
                        {item.domainName}
                      </span>
                    </div>
                    <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      Mốc chuẩn: <strong>{item.milestone}</strong>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                    {item.content}
                  </p>

                  {/* Age guidelines breakdown */}
                  {item.ageGuideline && (
                    <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-[11px]">
                      <div className="bg-sky-50/60 p-2 rounded-lg border border-sky-100">
                        <span className="font-bold text-sky-800 block mb-0.5">Nhà trẻ 18–24 th:</span>
                        <span className="text-slate-700">{item.ageGuideline['nha-tre-18-24']}</span>
                      </div>
                      <div className="bg-sky-50/60 p-2 rounded-lg border border-sky-100">
                        <span className="font-bold text-sky-800 block mb-0.5">Nhà trẻ 24–36 th:</span>
                        <span className="text-slate-700">{item.ageGuideline['nha-tre-24-36']}</span>
                      </div>
                      <div className="bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                        <span className="font-bold text-emerald-800 block mb-0.5">Mẫu giáo 3–4 tuổi:</span>
                        <span className="text-slate-700">{item.ageGuideline['mau-giao-3-4']}</span>
                      </div>
                      <div className="bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                        <span className="font-bold text-emerald-800 block mb-0.5">Mẫu giáo 4–5 tuổi:</span>
                        <span className="text-slate-700">{item.ageGuideline['mau-giao-4-5']}</span>
                      </div>
                      <div className="bg-indigo-50/60 p-2 rounded-lg border border-indigo-100 sm:col-span-2 lg:col-span-2">
                        <span className="font-bold text-indigo-800 block mb-0.5">Mẫu giáo 5–6 tuổi (Chuẩn bị lớp 1):</span>
                        <span className="text-slate-700">{item.ageGuideline['mau-giao-5-6']}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Tổng số: <strong>{filteredItems.length}</strong> YCCĐ</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-bold text-white bg-slate-700 hover:bg-slate-600 rounded-lg text-xs transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
