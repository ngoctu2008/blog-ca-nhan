import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminCategories() {
  const categories = [
    { id: 1, name: 'Giáo dục', slug: 'giao-duc' },
    { id: 2, name: 'Pháp luật giáo dục', slug: 'phap-luat-giao-duc' },
    { id: 3, name: 'Cuộc sống', slug: 'cuoc-song' },
    { id: 4, name: 'Thương hiệu cá nhân', slug: 'thuong-hieu-ca-nhan' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Quản lý Danh mục</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>Thêm danh mục</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="py-4 px-6 font-semibold text-slate-600">Tên danh mục</th>
              <th className="py-4 px-6 font-semibold text-slate-600">Slug</th>
              <th className="py-4 px-6 font-semibold text-slate-600 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 font-medium text-slate-800">{cat.name}</td>
                <td className="py-4 px-6 text-slate-500 font-mono text-sm">{cat.slug}</td>
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
