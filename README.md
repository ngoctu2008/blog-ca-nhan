# 🎨 1. TipTap Rich Text Editor

## Tính năng Editor

| Tính năng | Mô tả |
|-----------|--------|
| Định dạng văn bản | Bold, Italic, Underline, Strikethrough, Subscript, Superscript |
| Tiêu đề | H1, H2, H3, H4, H5, H6 |
| Danh sách | Bullet List, Numbered List |
| Căn chỉnh | Left, Center, Right |
| Chèn ảnh | Upload ảnh lên Supabase Storage hoặc nhập URL |
| Chèn video | Nhúng YouTube Video |
| Bảng | Insert Table với Header, Resize |
| Trích dẫn | Blockquote với style đẹp |
| Code Block | Syntax Highlighting |
| Highlight | Đánh dấu văn bản nhiều màu |
| Link | Thêm/Sửa/Xóa Hyperlink |
| Undo/Redo | Hỗ trợ phím tắt `Ctrl + Z` / `Ctrl + Y` |

## Cấu trúc file

```text
src/components/admin/
├── EditorToolbar.tsx      # Thanh công cụ với 30+ nút chức năng
├── TipTapEditor.tsx       # Component editor chính với modal chèn ảnh
└── AdminSidebar.tsx       # Đã thêm menu Newsletter

src/styles/
└── editor.css             # Custom CSS cho table, YouTube embed, highlight
```

## Cách sử dụng trong form bài viết

```tsx
const TipTapEditor = dynamic(
  () => import("@/components/admin/TipTapEditor"),
  { ssr: false }
);

<TipTapEditor
  content={content}
  onChange={setContent}
  placeholder="Viết nội dung bài viết..."
/>;
```

---

# 📧 2. Newsletter Subscription

## Tính năng Newsletter

| Tính năng | Mô tả |
|-----------|--------|
| Đăng ký | Form đăng ký ở Footer, Sidebar (Card) hoặc Inline |
| Xác thực email | Kiểm tra email đã tồn tại, hỗ trợ Re-subscribe |
| Hủy đăng ký | Link Unsubscribe an toàn với Token xác thực |
| Gửi chiến dịch | Soạn và gửi Email HTML đến toàn bộ Subscribers |
| Thống kê | Theo dõi Sent Count, Open Rate, Click Rate |
| Quản lý Subscribers | Xem danh sách, trạng thái, xóa Subscriber |
| Quản lý Campaigns | Xem lịch sử chiến dịch, xóa Campaign |

## Cấu trúc file

```text
src/components/site/
└── NewsletterForm.tsx     # 3 variants: card, inline, footer

src/app/(admin)/dashboard/
└── newsletter/
    └── page.tsx           # Trang quản lý Newsletter đầy đủ

src/app/api/newsletter/
├── subscribe/route.ts     # POST: Đăng ký nhận tin
├── unsubscribe/route.ts   # GET: Hủy đăng ký (với Token)
├── subscribers/route.ts   # GET/DELETE: Quản lý Subscribers
├── campaigns/route.ts     # GET/DELETE: Quản lý Campaigns
└── send/route.ts          # POST: Gửi chiến dịch Email

src/app/
└── unsubscribe/
    └── page.tsx           # Trang xác nhận hủy đăng ký

supabase/migrations/
└── 002_newsletter.sql     # Schema Newsletter Tables
```

## Database Schema (Newsletter)

```sql
newsletter_subscribers
├── id
├── email
├── name
├── status (active/unsubscribed/bounced)
├── subscribed_at
├── unsubscribed_at
└── last_sent_at

newsletter_campaigns
├── id
├── subject
├── content
├── status (draft/sending/sent/failed)
├── sent_count
├── open_count
├── click_count
├── created_by
└── sent_at

newsletter_opens
├── id
├── campaign_id
├── subscriber_id
├── opened_at
├── user_agent
└── ip_address
```

---

# 🔄 Cập nhật các file hiện có

| File | Thay đổi |
|--------|----------|
| `package.json` | Thêm 9 package TipTap Extensions: Highlight, Subscript, Superscript, YouTube, Table, TableRow, TableCell, TableHeader |
| `AdminSidebar.tsx` | Thêm menu Newsletter với icon Mail |
| `Footer.tsx` | Thay thế form Newsletter cũ bằng `NewsletterForm` component |
| `page.tsx` (Home) | Thêm `NewsletterForm` Card ở Sidebar |
| `database.types.ts` | Thêm types cho `newsletter_subscribers`, `newsletter_campaigns`, `newsletter_opens` |
| `posts/new/page.tsx` | Thay `textarea` bằng `TipTapEditor` với Dynamic Import (SSR-safe) |

---

# 🚀 Hướng dẫn triển khai mở rộng

## Bước 1: Cài đặt Dependencies mới

```bash
cd thaygiaocago-cms
npm install
```

## Bước 2: Chạy Migration mới trên Supabase

Truy cập:

**Supabase Dashboard → SQL Editor → New Query**

Sau đó:

1. Mở file `supabase/migrations/002_newsletter.sql`
2. Copy toàn bộ nội dung
3. Paste vào SQL Editor
4. Nhấn **Run**

## Bước 3: Cấu hình gửi Email (Tùy chọn)

Mặc định API `/api/newsletter/send` chỉ cập nhật Database.

Để gửi Email thực tế, có thể tích hợp:

- Resend
- SendGrid
- AWS SES

Ví dụ với **Resend**:

```ts
// Trong /api/newsletter/send/route.ts

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Gửi email cho từng subscriber
for (const subscriber of subscribers) {
  await resend.emails.send({
    from: "newsletter@yourdomain.com",
    to: subscriber.email,
    subject,
    html:
      content +
      `<p><a href="${unsubscribeUrl}">Hủy đăng ký</a></p>`,
  });
}
```

## Bước 4: Thêm biến môi trường

```env
# .env.local

RESEND_API_KEY=re_xxxxxxxx
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

---

# 📊 Tổng kết dự án hoàn chỉnh

| Module | Thành phần | Tính năng |
|----------|------------|-----------|
| Frontend Site | 7 Components | Header, Footer, Hero, PostCard, Sidebar, PostContent, RelatedPosts |
| Frontend Admin | 4 Components | AdminSidebar, StatsCards, EditorToolbar, TipTapEditor |
| UI Components | 18 Components | Button, Input, Textarea, Select, Card, Badge, Modal, Table, Tabs, Toast, Spinner, EmptyState, ImageUpload, ColorPicker, Toggle, SearchInput, Pagination, ConfirmDialog |
| API Routes | 10 Routes | Posts, Categories, Users, Settings, Upload, Newsletter (5 Routes) |
| App Pages | 10+ Pages | Home, Post Detail, Category, Search, Login, Dashboard, Posts CRUD, Categories, Users, Settings, Appearance, Newsletter |
| Database | 8 Tables | Profiles, Posts, Categories, Site Settings, Appearance Settings, Navigation, Comments, Newsletter Subscribers/Campaigns/Opens |
| Hooks | 4 Hooks | useAuth, usePosts, useCategories, useSiteSettings |
| Server Actions | 15+ Actions | Auth, Post CRUD, Category CRUD, User Management, Settings, Upload |

---

## ✅ Trạng thái dự án

> Dự án đã sẵn sàng để triển khai (**Deploy**) trên **Vercel** với **Supabase Backend**, hỗ trợ:
>
> - ✍️ TipTap Rich Text Editor nâng cao
> - 📧 Newsletter Marketing
> - 🔐 Authentication & Authorization
> - 📂 Quản lý bài viết, danh mục
> - 🎨 Quản lý giao diện Website
> - ☁️ Upload hình ảnh lên Supabase Storage
> - 📊 Thống kê và quản trị nội dung
