import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Thầy Giáo Cá Gỗ",
  description: "Blog cá nhân của Thầy Giáo Cá Gỗ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${beVietnamPro.variable} font-sans antialiased bg-slate-50`}
      >
        <div style={{
          position: 'fixed', top: 0, left: 0, height: '3px',
          background: 'linear-gradient(90deg, #4a90e2, #fbd051)',
          zIndex: 9999, transition: 'width 0.1s linear', width: '0%'
        }} aria-hidden="true" />

        <nav id="navbar" style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          transition: 'all 0.4s ease', background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(8px)', boxShadow: 'none', padding: '1.1rem 0'
        }}>
          <div className="nav-shell max-w-7xl mx-auto px-5 grid grid-cols-[auto_1fr_auto] items-center gap-4">
            <Link className="nav-brand flex-shrink-0 no-underline" href="/">
              <div className="nav-brand-inner flex items-center gap-2">
                <div className="nav-logo w-10 h-10 rounded-full overflow-hidden shadow-md relative flex-shrink-0">
                  <img alt="Thầy Giáo Cá Gỗ Logo" src="/images/logo.png" className="absolute h-full w-full left-0 top-0 object-cover" />
                </div>
                <div className="nav-brand-text">
                  <div className="nav-brand-title text-white font-extrabold text-base leading-tight drop-shadow-md">Thầy Giáo Cá Gỗ</div>
                  <div className="nav-brand-sub text-white/80 text-xs font-medium tracking-wider">Phan Lễ Nhuần</div>
                </div>
              </div>
            </Link>
            <div className="desktop-nav nav-menu hidden md:flex items-center justify-center gap-1 min-w-0">
              <Link className="text-white/90 font-medium text-sm py-2 px-3 rounded-lg transition-all hover:bg-white/10 whitespace-nowrap" href="/#ve-thay">Giới thiệu</Link>
              <Link className="text-white/90 font-medium text-sm py-2 px-3 rounded-lg transition-all hover:bg-white/10 whitespace-nowrap" href="/#giao-duc">Giáo dục</Link>
              <Link className="text-white/90 font-medium text-sm py-2 px-3 rounded-lg transition-all hover:bg-white/10 whitespace-nowrap" href="/#binh-dan">Bình dân học vụ</Link>
              <Link className="text-white/90 font-medium text-sm py-2 px-3 rounded-lg transition-all hover:bg-white/10 whitespace-nowrap" href="/#dinh-huong">Định hướng</Link>
            </div>
            <a href="https://www.facebook.com/lenhuanphan" target="_blank" rel="noopener noreferrer"
              className="desktop-nav nav-follow hidden md:block bg-gradient-to-br from-blue-500 to-blue-400 text-white font-semibold text-sm py-2 px-4 rounded-full no-underline shadow-md transition-all whitespace-nowrap flex-shrink-0">
              Theo dõi
            </a>
          </div>
        </nav>

        {children}

        <footer id="footer" className="relative overflow-hidden text-white mt-12">
          <div className="absolute inset-0">
            <img alt="Footer background" src="/images/anh6.jpg" className="absolute h-full w-full left-0 top-0 object-cover object-[center_60%]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#05140a]/80 to-[#050f08]/90"></div>
          </div>
          <div className="relative z-10 max-w-6xl mx-auto py-20 px-6">
            <div className="text-center mb-16">
              <div className="text-5xl text-emerald-300/40 leading-none mb-4">&quot;</div>
              <blockquote className="text-xl md:text-2xl italic font-normal text-white/90 max-w-3xl mx-auto leading-relaxed">
                Cuộc đời không có bản đồ. Bản đồ được vẽ ra khi bạn đi.
              </blockquote>
              <div className="mt-4 text-sm text-emerald-300/80 font-semibold">— Thầy giáo Cá Gỗ</div>
            </div>
            <div className="h-px bg-white/10 mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full overflow-hidden relative flex-shrink-0 border-2 border-white/20">
                    <img alt="Thầy Giáo Cá Gỗ Logo" src="/images/logo.png" className="absolute h-full w-full left-0 top-0 object-cover" />
                  </div>
                  <div>
                    <div className="font-extrabold text-lg">Thầy Giáo Cá Gỗ</div>
                    <div className="text-xs text-white/50">Phan Lễ Nhuần</div>
                  </div>
                </div>
                <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                  Thầy giáo ▪︎ Người chia sẻ ▪︎ Người đồng hành ▪︎ Người truyền cảm hứng
                </p>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-4 text-white/80 tracking-wider uppercase">Trang</h4>
                <Link href="/#ve-thay" className="block text-white/55 no-underline text-sm mb-2.5 transition-colors hover:text-white">Thầy Giáo Cá Gỗ</Link>
                <Link href="/#giao-duc" className="block text-white/55 no-underline text-sm mb-2.5 transition-colors hover:text-white">Giáo dục và cuộc sống</Link>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-4 text-white/80 tracking-wider uppercase">Mạng Xã Hội</h4>
                <a href="https://www.facebook.com/lenhuanphan" target="_blank" rel="noopener noreferrer" className="block text-white/55 no-underline text-sm mb-2.5 transition-colors hover:text-white">Facebook</a>
                <a href="https://www.tiktok.com/@thaygiaocago" target="_blank" rel="noopener noreferrer" className="block text-white/55 no-underline text-sm mb-2.5 transition-colors hover:text-white">TikTok</a>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex justify-between items-center flex-wrap gap-4">
              <p className="text-xs text-white/40">&copy; 2026 Thầy giáo Cá Gỗ – Phan Lễ Nhuần. Bảo lưu mọi quyền.</p>
              <p className="text-xs text-white/30">Làm với ❤️ từ vùng quê Việt Nam</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
