import { Save } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Cài đặt chung</h1>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors font-medium shadow-sm">
          <Save size={20} />
          <span>Lưu thay đổi</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 space-y-8">

          {/* Thông tin cơ bản */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Thông tin cơ bản</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tên Website</label>
                <input type="text" defaultValue="Thầy Giáo Cá Gỗ" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Slogan</label>
                <input type="text" defaultValue="Cuộc đời không có bản đồ. Bản đồ được vẽ ra khi bạn đi." className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Thông tin chân trang (Footer Info)</label>
                <textarea rows={3} defaultValue="Thầy giáo ▪︎ Người chia sẻ ▪︎ Người đồng hành ▪︎ Người truyền cảm hứng" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"></textarea>
              </div>
            </div>
          </section>

          {/* Mạng xã hội */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Mạng xã hội & Liên hệ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Facebook URL</label>
                <input type="url" defaultValue="https://www.facebook.com/lenhuanphan" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">TikTok URL</label>
                <input type="url" defaultValue="https://www.tiktok.com/@thaygiaocago" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">YouTube URL</label>
                <input type="url" defaultValue="https://youtube.com/@thaygiaocago" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nhóm Zalo URL</label>
                <input type="url" defaultValue="https://zalo.me/g/ncqluq49fve36cpv2i8t" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email liên hệ</label>
                <input type="email" placeholder="example@email.com" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Số điện thoại</label>
                <input type="text" defaultValue="0987674161" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
