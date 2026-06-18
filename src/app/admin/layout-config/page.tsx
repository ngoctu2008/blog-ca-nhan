import { Save } from 'lucide-react';

export default function AdminLayoutConfig() {
  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Cấu hình Giao diện</h1>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium shadow-sm">
          <Save size={20} />
          <span>Lưu cấu hình</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-8">
        <p className="text-slate-600 mb-8">Quản lý cách hiển thị các phần trên trang chủ và các trang danh mục. Hỗ trợ responsive đa thiết bị.</p>

        <div className="space-y-8">
          <div className="border border-slate-200 rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Hero Banner (Đầu trang chủ)</h3>
                <p className="text-sm text-slate-500">Phần banner hiển thị bài viết nổi bật</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-slate-700">Hiển thị</span>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Kiểu hiển thị (Desktop)</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="slider">Slider (Trượt)</option>
                  <option value="grid">Grid (Lưới)</option>
                  <option value="hero">Hero tĩnh</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Kiểu hiển thị (Mobile)</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="slider">Slider (Trượt)</option>
                  <option value="list">List (Danh sách)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Bài viết mới nhất</h3>
                <p className="text-sm text-slate-500">Danh sách bài viết trang chủ</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-slate-700">Hiển thị</span>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Kiểu hiển thị</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" defaultValue="grid">
                  <option value="grid">Grid (Lưới - 3 cột)</option>
                  <option value="list">List (Danh sách ngang)</option>
                  <option value="masonry">Masonry (Kiểu Pinterest)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Số bài hiển thị</label>
                <input type="number" defaultValue={6} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
