import Link from 'next/link';
import { LayoutDashboard, FileText, Tags, LogOut } from 'lucide-react';

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 pt-24 z-50">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">Quản trị viên</h2>
        <nav className="space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            <LayoutDashboard size={20} />
            <span>Tổng quan</span>
          </Link>
          <Link href="/admin/posts" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            <FileText size={20} />
            <span>Bài viết</span>
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
            <Tags size={20} />
            <span>Danh mục</span>
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-6">
        <Link href="/" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 text-red-400 hover:text-red-300 transition-colors">
          <LogOut size={20} />
          <span>Thoát</span>
        </Link>
      </div>
    </aside>
  );
}
