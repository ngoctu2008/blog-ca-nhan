import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';

export default function AdminTimeline() {
  const events = [
    { id: 1, date: '2021', title: 'Bắt đầu làm TikTok', description: 'Xây dựng kênh với tâm thế thử xem sao.' },
    { id: 2, date: '2023', title: 'Đạt 1 triệu follower', description: 'Hành trình lan tỏa giá trị giáo dục.' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Quản lý Hành trình</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={20} />
          <span>Thêm sự kiện</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="py-4 px-4 w-12"></th>
              <th className="py-4 px-6 font-semibold text-slate-600 w-32">Thời gian</th>
              <th className="py-4 px-6 font-semibold text-slate-600 w-1/4">Tiêu đề</th>
              <th className="py-4 px-6 font-semibold text-slate-600">Mô tả</th>
              <th className="py-4 px-6 font-semibold text-slate-600 text-right w-28">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                <td className="py-4 px-4 text-slate-300 cursor-grab active:cursor-grabbing">
                  <GripVertical size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </td>
                <td className="py-4 px-6 font-medium text-blue-600">{event.date}</td>
                <td className="py-4 px-6 font-medium text-slate-800">{event.title}</td>
                <td className="py-4 px-6 text-slate-600 text-sm">{event.description}</td>
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
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">Chưa có sự kiện nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
