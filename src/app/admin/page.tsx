export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Tổng quan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-medium text-slate-500 mb-2">Tổng số bài viết</h3>
          <p className="text-4xl font-bold text-slate-800">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-medium text-slate-500 mb-2">Tổng số danh mục</h3>
          <p className="text-4xl font-bold text-slate-800">4</p>
        </div>
      </div>
    </div>
  );
}
