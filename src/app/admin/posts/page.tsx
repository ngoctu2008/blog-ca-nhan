import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminPosts() {
  const posts = [
    { id: 1, title: '[BỘ GIÁO DỤC VÀ ĐÀO TẠO] Bộ GD&ĐT đề nghị các địa phương...', category: 'Pháp luật giáo dục', date: '2026-06-14' },
    { id: 2, title: 'Dạy học thời công nghệ: Những điều tôi học được...', category: 'Giáo dục', date: '2026-05-11' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Quản lý Bài viết</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>Thêm bài viết</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="py-4 px-6 font-semibold text-slate-600">Tiêu đề</th>
              <th className="py-4 px-6 font-semibold text-slate-600">Danh mục</th>
              <th className="py-4 px-6 font-semibold text-slate-600">Ngày đăng</th>
              <th className="py-4 px-6 font-semibold text-slate-600 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 font-medium text-slate-800">{post.title}</td>
                <td className="py-4 px-6 text-slate-600">
                  <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-600">{post.date}</td>
                <td className="py-4 px-6">
                  <div className="flex justify-end gap-3">
                    <button className="text-slate-400 hover:text-blue-500 transition-colors">
                      <Edit size={18} />
                    </button>
                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
