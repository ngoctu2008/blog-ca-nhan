import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';

export default function AdminMenus() {
  const menus = [
    { id: 1, label: 'Giới thiệu', url: '/#ve-thay', active: true },
    { id: 2, label: 'Giáo dục', url: '/#giao-duc', active: true },
    { id: 3, label: 'Bình dân học vụ', url: '/#binh-dan', active: true },
    { id: 4, label: 'Định hướng', url: '/#dinh-huong', active: true },
    { id: 5, label: 'Tuyển dụng', url: '/tuyen-dung-lam-dong', active: false },
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Quản lý Menu</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={20} />
          <span>Thêm Menu</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50">
          <p className="text-sm text-slate-600">Kéo thả để sắp xếp thứ tự hiển thị menu trên thanh điều hướng.</p>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-200">
              <th className="py-4 px-4 w-12"></th>
              <th className="py-4 px-6 font-semibold text-slate-600">Tên hiển thị</th>
              <th className="py-4 px-6 font-semibold text-slate-600">Đường dẫn (URL)</th>
              <th className="py-4 px-6 font-semibold text-slate-600 w-24 text-center">Trạng thái</th>
              <th className="py-4 px-6 font-semibold text-slate-600 text-right w-28">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-4 text-slate-300 cursor-grab active:cursor-grabbing">
                  <GripVertical size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </td>
                <td className="py-4 px-6 font-medium text-slate-800">{menu.label}</td>
                <td className="py-4 px-6 text-slate-500 font-mono text-sm">{menu.url}</td>
                <td className="py-4 px-6 text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={menu.active} />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end gap-3">
                    <button className="text-slate-400 hover:text-blue-500 transition-colors" title="Sửa">
                      <Edit size={18} />
                    </button>
                    <button className="text-slate-400 hover:text-red-500 transition-colors" title="Xóa">
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
