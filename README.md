<div align="center">

# 🚀 Ngọc Tú CMS

### Modern CMS Platform powered by Next.js 15, Supabase & TipTap Editor

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green?logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Developed by Ngọc Tú**

</div>

---

# 📖 Giới Thiệu

**Ngọc Tú CMS** là hệ thống quản trị nội dung (CMS) hiện đại được xây dựng bằng Next.js App Router và Supabase.

Hệ thống hỗ trợ:

- 📰 Quản lý bài viết chuyên nghiệp
- 📂 Quản lý danh mục
- 👥 Quản lý người dùng và phân quyền
- ✍️ TipTap Rich Text Editor
- 📧 Newsletter Marketing
- 🎨 Tùy chỉnh giao diện
- 🌙 Dark Mode
- ☁️ Upload hình ảnh lên Supabase Storage
- 🔐 Authentication & Authorization
- 🚀 Deploy nhanh trên Vercel

---

# 📋 Mục Lục

- [Tính năng](#-tính-năng)
- [Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt](#-cài-đặt)
- [Cấu hình môi trường](#-cấu-hình-môi-trường)
- [Supabase Setup](#-supabase-setup)
- [TipTap Editor](#-tiptap-rich-text-editor)
- [Newsletter](#-newsletter-subscription)
- [Deploy lên Vercel](#-deploy-lên-vercel)
- [Database Schema](#-database-schema)
- [Roadmap](#-roadmap)
- [License](#-license)

---

# ✨ Tính Năng

## 🌐 Frontend Website

| Tính năng | Trạng thái |
|------------|------------|
| Hero Section | ✅ |
| Featured Posts | ✅ |
| Post Grid | ✅ |
| Search | ✅ |
| Category Pages | ✅ |
| Related Posts | ✅ |
| Responsive | ✅ |
| Dark Mode | ✅ |
| Newsletter Form | ✅ |

---

## 🔐 Authentication

| Tính năng | Trạng thái |
|------------|------------|
| Login | ✅ |
| Logout | ✅ |
| Session Management | ✅ |
| Role Permission | ✅ |
| Admin | ✅ |
| Editor | ✅ |
| Author | ✅ |

---

## 📝 Content Management

| Tính năng | Trạng thái |
|------------|------------|
| CRUD Posts | ✅ |
| CRUD Categories | ✅ |
| Upload Cover Image | ✅ |
| SEO Meta | ✅ |
| Tags | ✅ |
| Slug Generator | ✅ |

---

## ⚙️ Administration

| Tính năng | Trạng thái |
|------------|------------|
| Dashboard | ✅ |
| User Management | ✅ |
| Appearance Settings | ✅ |
| Site Settings | ✅ |
| Newsletter Management | ✅ |

---

# 🏗️ Kiến Trúc Hệ Thống

```text
Browser
   │
   ▼
Next.js Frontend
   │
   ├── Server Actions
   ├── API Routes
   │
   ▼
Supabase Backend
   ├── PostgreSQL
   ├── Authentication
   └── Storage
```

---

# 📂 Cấu Trúc Dự Án

```text
thaygiaocago-cms/

├── src/
│
├── app/
│   ├── (site)
│   ├── (admin)
│   ├── api
│   ├── login
│   └── unsubscribe
│
├── components/
│   ├── admin
│   ├── site
│   └── ui
│
├── hooks
├── lib
├── styles
├── types
│
└── supabase/
    └── migrations
```

---

# 💻 Yêu Cầu Hệ Thống

| Thành phần | Phiên bản |
|------------|-----------|
| Node.js | >= 20 |
| npm | >= 10 |
| PostgreSQL | Supabase |
| Next.js | 15 |
| TypeScript | 5 |

---

# ⚡ Cài Đặt

## Clone Repository

```bash
git clone https://github.com/ngoctu2008/thaygiaocago-cms.git

cd thaygiaocago-cms
```

## Cài đặt Packages

```bash
npm install
```

## Chạy Local

```bash
npm run dev
```

Mở trình duyệt:

```text
http://localhost:3000
```

---

# 🔧 Cấu Hình Môi Trường

Tạo file:

```env
.env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXT_PUBLIC_SITE_NAME=Ngọc Tú

NEXT_PUBLIC_SITE_URL=https://your-domain.com

RESEND_API_KEY=re_xxxxxxxxx
```

---

# 🗄️ Supabase Setup

## Tạo Project

Truy cập:

```text
https://supabase.com
```

Tạo project mới.

---

## Chạy Migration

SQL Editor → New Query

Chạy:

```sql
001_initial_schema.sql
```

Tiếp theo:

```sql
002_newsletter.sql
```

---

## Authentication

```text
Authentication
→ Settings
→ Enable Email Provider
```

---

## Storage

```text
Storage
→ Create Bucket
→ images
→ Public
```

---

# 🎨 TipTap Rich Text Editor

## Tính năng

| Tính năng | Hỗ trợ |
|------------|---------|
| Bold | ✅ |
| Italic | ✅ |
| Underline | ✅ |
| Strikethrough | ✅ |
| Subscript | ✅ |
| Superscript | ✅ |
| H1-H6 | ✅ |
| Bullet List | ✅ |
| Ordered List | ✅ |
| Alignment | ✅ |
| Image Upload | ✅ |
| YouTube Embed | ✅ |
| Table | ✅ |
| Blockquote | ✅ |
| Code Block | ✅ |
| Highlight | ✅ |
| Link | ✅ |
| Undo / Redo | ✅ |

---

## Cấu trúc

```text
src/components/admin/

├── EditorToolbar.tsx
├── TipTapEditor.tsx
└── AdminSidebar.tsx

src/styles/

└── editor.css
```

---

## Sử dụng

```tsx
const TipTapEditor = dynamic(
  () => import("@/components/admin/TipTapEditor"),
  {
    ssr: false
  }
);

<TipTapEditor
  content={content}
  onChange={setContent}
  placeholder="Viết nội dung bài viết..."
/>
```

---

# 📧 Newsletter Subscription

## Tính năng

| Tính năng | Trạng thái |
|------------|------------|
| Subscribe | ✅ |
| Re-subscribe | ✅ |
| Unsubscribe | ✅ |
| Campaign Management | ✅ |
| Open Tracking | ✅ |
| Click Tracking | ✅ |
| Statistics | ✅ |

---

## API Routes

```text
/api/newsletter/

├── subscribe
├── unsubscribe
├── subscribers
├── campaigns
└── send
```

---

## Database

### newsletter_subscribers

```text
id
email
name
status
subscribed_at
unsubscribed_at
last_sent_at
```

### newsletter_campaigns

```text
id
subject
content
status
sent_count
open_count
click_count
created_by
sent_at
```

### newsletter_opens

```text
id
campaign_id
subscriber_id
opened_at
user_agent
ip_address
```

---

# 📦 Dependencies Chính

```bash
next
react
typescript
tailwindcss

@supabase/supabase-js

@tiptap/react
@tiptap/starter-kit
@tiptap/extension-highlight
@tiptap/extension-subscript
@tiptap/extension-superscript
@tiptap/extension-youtube
@tiptap/extension-table
@tiptap/extension-table-row
@tiptap/extension-table-cell
@tiptap/extension-table-header

react-hot-toast
lucide-react
```

---

# 👑 Tạo Admin User Đầu Tiên

Sau khi đăng ký tài khoản:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

---

# 🚀 Deploy Lên Vercel

## Push Source Code

```bash
git init

git add .

git commit -m "Initial commit"

git branch -M main

git remote add origin https://github.com/ngoctu2008/thaygiaocago-cms.git

git push -u origin main
```

---

## Deploy

Vào:

```text
https://vercel.com
```

Chọn:

```text
Import Git Repository
```

Framework:

```text
Next.js
```

Thêm Environment Variables:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL
RESEND_API_KEY
```

Nhấn Deploy.

---

# 📊 Thống Kê Dự Án

| Hạng mục | Số lượng |
|-----------|-----------|
| Frontend Components | 7 |
| Admin Components | 4 |
| UI Components | 18 |
| API Routes | 10 |
| App Pages | 10+ |
| Database Tables | 10+ |
| Hooks | 4 |
| Server Actions | 15+ |
| TipTap Extensions | 9 |

---

# 🛣️ Roadmap

## Version 1.1

- [ ] AI Content Generator
- [ ] AI SEO Assistant
- [ ] Comment System
- [ ] Multi-language
- [ ] Analytics Dashboard

## Version 1.2

- [ ] Push Notification
- [ ] Membership System
- [ ] Video Library
- [ ] Mobile API

## Version 2.0

- [ ] LMS Module
- [ ] Online Courses
- [ ] Payment Gateway
- [ ] Marketplace

---

# 🤝 Đóng Góp

Mọi đóng góp đều được chào đón.

1. Fork dự án
2. Tạo branch mới

```bash
git checkout -b feature/my-feature
```

3. Commit

```bash
git commit -m "Add new feature"
```

4. Push

```bash
git push origin feature/my-feature
```

5. Tạo Pull Request

---

# 📜 License

MIT License

Copyright (c) 2026 Ngọc Tú

---

# 👨‍💻 Tác Giả

## Ngọc Tú

- Chuyên viên Công nghệ thông tin
- Nhà phát triển Website & CMS
- Chuyên gia triển khai Next.js, Supabase, NukeViet
- Nghiên cứu ứng dụng AI trong giáo dục

GitHub:

```text
https://github.com/ngoctu2008
```

---

<div align="center">

## ❤️ Ngọc Tú CMS

Modern CMS powered by Next.js + Supabase + TipTap

**Developed by Ngọc Tú**

Made with ❤️ in Vietnam 🇻🇳

</div>
