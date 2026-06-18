# Blog Cá Nhân - Hệ thống quản lý nội dung với Next.js & Supabase

Dự án Blog Cá Nhân là một hệ thống quản lý nội dung (CMS) nhỏ gọn, được xây dựng dựa trên Next.js (App Router), Tailwind CSS và Supabase. Dự án được tối ưu hóa để triển khai nhanh chóng trên nền tảng Vercel.

## 1. Giới thiệu về mã nguồn

Dự án cung cấp một giao diện blog chuyên nghiệp dành cho cá nhân (như giáo viên, chuyên gia, blogger), đi kèm với một trang quản trị (Admin Dashboard) giúp người dùng dễ dàng quản lý nội dung mà không cần can thiệp vào mã nguồn.

### Các công nghệ chính:
- **Framework:** Next.js 15 (React 19)
- **Styling:** Tailwind CSS 3
- **Cơ sở dữ liệu:** Supabase (PostgreSQL)
- **Biểu tượng (Icons):** Lucide React

---

## 2. Các chức năng của Blog

### Giao diện người dùng (Frontend)
- **Trang chủ:** Hiển thị danh sách các bài viết mới nhất dưới dạng lưới (Grid), tích hợp Hero Banner nổi bật.
- **Trang chi tiết bài viết:** Hiển thị nội dung bài viết, thông tin tác giả, ngày đăng, thời gian đọc, cùng với các chuyên mục liên quan.
- **Thanh điều hướng (Navbar):** Menu động, tự động thay đổi hiệu ứng khi cuộn trang.
- **Chân trang (Footer):** Hiển thị thông tin liên hệ, mạng xã hội, slogan.
- **Giao diện đáp ứng (Responsive):** Tương thích tốt trên cả máy tính, máy tính bảng và điện thoại di động.

### Trang Quản trị (Admin Dashboard)
- **Tổng quan:** Thống kê số lượng bài viết, danh mục.
- **Quản lý Bài viết:** Thêm, sửa, xóa các bài đăng blog.
- **Quản lý Danh mục:** Phân loại bài viết theo các chủ đề khác nhau.
- **Hành trình (Timeline):** Cập nhật các cột mốc sự kiện quan trọng của bản thân.
- **Quản lý Menu:** Tùy chỉnh các liên kết trên thanh điều hướng (Navbar).
- **Cấu hình Giao diện:** Bật/tắt hiển thị slider, thay đổi kiểu hiển thị bài viết (Grid/List).
- **Cài đặt chung:** Thay đổi tên Website, Slogan, thông tin liên hệ, các liên kết mạng xã hội (Facebook, TikTok, Zalo, YouTube).

---

## 3. Hướng dẫn cài đặt và sử dụng

### 3.1. Thiết lập Cơ sở dữ liệu (Supabase)

1. Truy cập [Supabase](https://supabase.com/) và đăng nhập/đăng ký tài khoản.
2. Tạo một **Project** mới.
3. Sau khi Project được tạo, vào mục **SQL Editor** ở thanh menu bên trái.
4. Click **New Query**.
5. Mở file `supabase/schema.sql` trong mã nguồn, copy toàn bộ nội dung và dán vào SQL Editor.
6. Nhấn **Run** để khởi tạo các bảng (`authors`, `categories`, `posts`, `settings`, `timeline_events`, `menus`, `layout_configs`) và dữ liệu mẫu cơ bản.
7. Vào mục **Project Settings** -> **API** để lấy thông tin:
   - **Project URL**
   - **Project API Keys (anon, public)**

### 3.2. Chạy dự án trên máy cá nhân (Local)

1. Clone mã nguồn về máy:
   ```bash
   git clone <url-repository>
   cd blog-ca-nhan
   ```
2. Cài đặt các thư viện:
   ```bash
   npm install
   ```
3. Tạo file `.env.local` ở thư mục gốc (tham khảo file `.env.example`) và điền thông tin:
   ```env
   SITE_NAME="Tên website của bạn"
   NEXT_PUBLIC_SUPABASE_URL="Dán Project URL của Supabase vào đây"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="Dán Project API Key (anon) của Supabase vào đây"
   ```
4. Khởi động server phát triển:
   ```bash
   npm run dev
   ```
5. Truy cập:
   - Giao diện người dùng: `http://localhost:3000`
   - Trang quản trị: `http://localhost:3000/admin`

### 3.3. Hướng dẫn Deploy lên Vercel

Dự án này được thiết kế để triển khai liền mạch trên Vercel:

1. Đẩy mã nguồn của bạn lên một kho lưu trữ trên GitHub.
2. Đăng nhập vào [Vercel](https://vercel.com/) bằng tài khoản GitHub của bạn.
3. Chọn **Add New** -> **Project**.
4. Chọn kho lưu trữ `blog-ca-nhan` của bạn và nhấn **Import**.
5. Trong phần **Environment Variables**, hãy thêm các biến sau giống như bạn đã cấu hình ở `.env.local`:
   - `SITE_NAME` : *Ví dụ: Thầy giáo Tú*
   - `NEXT_PUBLIC_SUPABASE_URL` : *Dán Project URL*
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` : *Dán Project API Key*
6. Nhấn **Deploy**. Vercel sẽ tự động cài đặt và triển khai ứng dụng của bạn.

---

## 4. Hướng dẫn sử dụng Admin

1. Truy cập đường dẫn `/admin` trên tên miền của bạn (Ví dụ: `https://ten-mien-cua-ban.vercel.app/admin`).
2. **Cài đặt chung:** Đi tới mục "Cài đặt chung" trên thanh bên trái để cập nhật Tên website, Slogan, Email, Số điện thoại và các Link mạng xã hội.
3. **Menu:** Đi tới mục "Menu" để thêm các đường dẫn hiển thị trên thanh Navbar.
4. **Hành trình:** Thêm các mốc thời gian để hiển thị ở phần Giới thiệu.
5. **Đăng bài mới:** Đi tới "Bài viết" -> "Thêm bài viết". Bạn cần chọn Danh mục cho bài viết trước khi đăng.
6. **Cấu hình giao diện:** Bật/tắt các khối nội dung hiển thị ở trang chủ theo ý muốn.
