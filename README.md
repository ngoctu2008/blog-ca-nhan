# 📰 Ngọc Tú - CMS Blog

Hệ thống quản lý nội dung blog tin tức giáo dục, xây dựng với **Next.js 15**, **Supabase**, **Tailwind CSS**, **TipTap Editor** và **Newsletter**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fngoctu2008%2Fblog-ca-nhan&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY&project-name=blog-ca-nhan&repository-name=blog-ca-nhan)

---

## ⚡ Cài đặt nhanh (10-15 phút)

### Bước 1: Tạo Database (Miễn phí với Supabase)

1. Tạo tài khoản miễn phí tại [https://github.com](https://github.com) nếu chưa có.
2. Tạo tài khoản miễn phí tại [https://supabase.com](https://supabase.com) (khuyên dùng đăng ký bằng GitHub).
3. Tạo **New Project**. Đợi 1-2 phút để hệ thống khởi tạo.
4. Vào **Project Settings → API**, giữ lại 2 giá trị:
   - **Project URL** → dùng cho `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API Keys** (anon/public) → dùng cho `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Service Role Key** → dùng cho `SUPABASE_SERVICE_ROLE_KEY` (Settings → API → Service Role)

5. Vào **SQL Editor → New Query**, chạy toàn bộ file `docs/migrations/001_initial.sql` để tạo bảng dữ liệu.

### Bước 2: Deploy lên Vercel (1-click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fngoctu2008%2Fblog-ca-nhan&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY&project-name=blog-ca-nhan&repository-name=blog-ca-nhan)

1. Nhấn nút **Deploy** bên trên.
2. Điền các biến môi trường đã lưu ở Bước 1:
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Project API Keys (anon/public)
   - `SUPABASE_SERVICE_ROLE_KEY` = Service Role Key
3. Nhấn **Deploy** và chờ 2-3 phút.
4. Bạn sẽ có website để sử dụng ngay!

### Bước 3: Tạo Admin User

1. Truy cập website vừa deploy.
2. Vào trang `/login` và đăng ký tài khoản mới.
3. Vào **Supabase SQL Editor**, chạy:

```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'email-cua-ban@example.com';
```

4. Đăng nhập lại → bạn đã có quyền Admin!

---

## 🛠️ Cài đặt thủ công (Development)

```bash
# 1. Clone repository
git clone https://github.com/ngoctu2008/blog-ca-nhan.git
cd blog-ca-nhan

# 2. Cài đặt dependencies
npm install

# 3. Tạo file .env.local
cp .env.local.example .env.local

# 4. Điền các giá trị vào .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# 5. Chạy migration SQL trong Supabase SQL Editor
# docs/migrations/001_initial.sql

# 6. Chạy development server
npm run dev
```

---

## ✨ Tính năng

### 📝 Quản lý Bài viết
- **TipTap Rich Text Editor** - Trình soạn thảo WYSIWYG với 30+ công cụ
- Hỗ trợ chèn ảnh (upload lên Supabase Storage), video YouTube, bảng
- Phân loại theo danh mục, gắn tag, SEO meta
- Bài viết nổi bật, lưu bản nháp

### 📧 Newsletter
- Form đăng ký nhận tin ở footer và sidebar
- Quản lý subscribers, gửi chiến dịch email
- Theo dõi open rate, click rate
- Link hủy đăng ký an toàn

### 🎨 Tùy chỉnh Giao diện
- Dark mode tự động
- Tùy chỉnh màu sắc chủ đạo
- Hero section, sidebar, trending posts
- Custom CSS

### 👥 Quản lý Người dùng
- Phân quyền: Admin, Editor, Author, Subscriber
- Quản lý profile, avatar

### 🔍 Khác
- Tìm kiếm full-text
- Responsive design
- Share buttons (Facebook, Twitter)
- View count, read time estimate
- Comments system

---

## 🏗️ Công nghệ

| Công nghệ | Mục đích |
|-----------|----------|
| Next.js 15 | Framework React full-stack |
| Supabase | Database, Auth, Storage |
| Tailwind CSS | Styling |
| TipTap | Rich Text Editor |
| TypeScript | Type safety |
| Vercel | Hosting |

---

## 📂 Cấu trúc dự án

```
blog-ca-nhan/
├── docs/
│   └── migrations/
│       └── 001_initial.sql      # Database schema
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (admin)/              # Admin routes
│   │   ├── (site)/               # Public site routes
│   │   ├── api/                  # API routes
│   │   └── login/                # Login page
│   ├── components/
│   │   ├── admin/                # Admin components
│   │   ├── site/                 # Site components
│   │   └── ui/                   # UI components (18 components)
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utilities, Supabase clients, actions
│   ├── styles/                   # Global & editor CSS
│   └── types/                    # TypeScript types
├── .env.local.example            # Environment variables template
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔐 Environment Variables

| Biến | Bắt buộc | Mô tả |
|------|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase Anon/Public API Key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase Service Role Key (cho admin operations) |

---

## 📝 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

---

## 💬 Hỗ trợ

Nếu gặp vấn đề, vui lòng tạo [Issue](https://github.com/ngoctu2008/blog-ca-nhan/issues) trên GitHub.
