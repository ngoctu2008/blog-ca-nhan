import Link from 'next/link';
import { LayoutDashboard, FileText, Tags, Settings, Clock, LayoutTemplate, Menu, LogOut } from 'lucide-react';

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 pt-8 z-50 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">Quản trị viên</h2>
        <nav className="space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
            <LayoutDashboard size={20} />
            <span>Tổng quan</span>
          </Link>
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nội dung</p>
          </div>
          <Link href="/admin/posts" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
            <FileText size={20} />
            <span>Bài viết</span>
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
            <Tags size={20} />
            <span>Danh mục</span>
          </Link>
          <Link href="/admin/timeline" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
            <Clock size={20} />
            <span>Hành trình</span>
          </Link>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Hệ thống</p>
          </div>
          <Link href="/admin/menus" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
            <Menu size={20} />
            <span>Menu</span>
          </Link>
          <Link href="/admin/layout-config" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
            <LayoutTemplate size={20} />
            <span>Giao diện</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
            <Settings size={20} />
            <span>Cài đặt chung</span>
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-6 border-t border-slate-800">
        <Link href="/" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 text-red-400 hover:text-red-300 transition-colors">
          <LogOut size={20} />
          <span>Thoát</span>
        </Link>
      </div>
    </aside>
  );
}
