"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, Users, FolderOpen, Settings, Palette, LogOut,
  ChevronLeft, ChevronRight, Mail
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { signOut } from "@/lib/actions";

const navItems = [
  { href: "/dashboard", label: "Tong quan", icon: LayoutDashboard },
  { href: "/dashboard/posts", label: "Bai viet", icon: FileText },
  { href: "/dashboard/categories", label: "Danh muc", icon: FolderOpen },
  { href: "/dashboard/users", label: "Nguoi dung", icon: Users },
  { href: "/dashboard/newsletter", label: "Newsletter", icon: Mail },
  { href: "/dashboard/appearance", label: "Giao dien", icon: Palette },
  { href: "/dashboard/settings", label: "Cai dat", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0 flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
        {!collapsed && <span className="font-bold text-lg text-gray-900 dark:text-white">Admin</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link key={item.href} href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white",
                collapsed && "justify-center"
              )}>
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-2 border-t border-gray-200 dark:border-gray-800">
        <form action={signOut}>
          <button type="submit" className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full",
            collapsed && "justify-center"
          )}>
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && "Dang xuat"}
          </button>
        </form>
      </div>
    </aside>
  );
}
