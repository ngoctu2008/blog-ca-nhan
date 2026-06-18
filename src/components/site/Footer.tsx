"use client";

import Link from "next/link";
import { Newspaper, Facebook, Youtube } from "lucide-react";
import NewsletterForm from "@/components/site/NewsletterForm";

interface FooterProps {
  siteName?: string;
  footerText?: string;
  socialLinks?: Record<string, string>;
}

export default function Footer({
  siteName = "Ngọc Tú",
  footerText = "© 2024 Ngọc Tú. Tất cả các quyền được bảo lưu.",
  socialLinks = {},
}: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <Newspaper className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">{siteName}</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Chia se kien thuc, kinh nghiem va cau chuyen giao duc. Noi ket noi cong dong giao vien va phu huynh.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary-600 flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Lien ket</h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm hover:text-white transition-colors">Trang chu</Link></li>
              <li><Link href="/category/tin-tuc" className="text-sm hover:text-white transition-colors">Tin tuc</Link></li>
              <li><Link href="/category/giao-duc" className="text-sm hover:text-white transition-colors">Giao duc</Link></li>
              <li><Link href="/category/tu-lieu" className="text-sm hover:text-white transition-colors">Tu lieu</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <NewsletterForm variant="footer" />
        </div>

        <div className="border-t border-gray-800 py-6 text-center">
          <p className="text-sm text-gray-500">{footerText}</p>
        </div>
      </div>
    </footer>
  );
}
