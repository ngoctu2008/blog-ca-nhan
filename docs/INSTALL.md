# 📖 Hướng Dẫn Cài Đặt Chi Tiết

> ⏱️ **Thời gian dự kiến:** 10-15 phút
> 
> 💰 **Chi phí:** Miễn phí (Free tier Supabase + Vercel)

---

## 📋 Yêu cầu trước khi bắt đầu

- Tài khoản [GitHub](https://github.com) (miễn phí)
- Tài khoản [Supabase](https://supabase.com) (miễn phí)
- Tài khoản [Vercel](https://vercel.com) (miễn phí)

> 💡 **Mẹo:** Đăng ký bằng tài khoản GitHub để nhanh hơn!

---

## Bước 1: Fork Repository

1. Truy cập repository: `https://github.com/ngoctu2008/ngoctu-cms`
2. Nhấn nút **Fork** ở góc trên bên phải
3. Đợi GitHub tạo bản sao về tài khoản của bạn

---

## Bước 2: Tạo Database trên Supabase

### 2.1 Tạo Project

1. Đăng nhập [Supabase](https://supabase.com)
2. Nhấn **New Project**
3. Chọn Organization (thường là tên GitHub của bạn)
4. Điền thông tin:
   - **Name:** `ngoctu-cms`
   - **Database Password:** Tạo mật khẩu mạnh (lưu lại!)
   - **Region:** Chọn Singapore (`Southeast Asia`) hoặc gần nhất
5. Nhấn **Create new project**
6. Đợi 1-2 phút để khởi tạo xong

### 2.2 Lấy thông tin kết nối

1. Vào **Project Settings** (biểu tượng bánh răng ở sidebar)
2. Chọn tab **API**
3. Giữ lại 3 giá trị quan trọng:

```
Project URL:            https://xxxxxxxxxxxxxx.supabase.co
Project API keys (anon): eyJhbGciOiJIUzI1NiIs... (dòng anon/public)
Project API keys (service_role): eyJhbGciOiJIUzI1NiIs... (dòng service_role - SECRET!)
```

> ⚠️ **Lưu ý:** Service Role Key rất quan trọng, KHÔNG được chia sẻ!

### 2.3 Chạy Migration

1. Vào **SQL Editor** (biểu tượng `</>` ở sidebar trái)
2. Nhấn **New query**
3. Copy toàn bộ nội dung file `docs/migrations/001_initial.sql` từ repository
4. Paste vào SQL Editor
5. Nhấn **Run** (nút ▶️)

✅ **Kết quả:** Các bảng dữ liệu đã được tạo thành công!

### 2.4 Bật Email Auth (tùy chọn nhưng khuyên dùng)

1. Vào **Authentication** → **Providers**
2. Tìm **Email** → Bật **Enable Signup**
3. (Tùy chọn) Cấu hình SMTP để gửi email xác nhận

---

## Bước 3: Deploy lên Vercel

### Cách 1: Deploy với 1-Click Button (Khuyên dùng)

1. Truy cập repository đã fork của bạn
2. Nhấn nút **Deploy with Vercel** trong README
3. Đăng nhập Vercel bằng GitHub
4. Chọn repository `ngoctu-cms`
5. Điền các biến môi trường:

| Biến | Giá trị |
|------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL từ Bước 2.2 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project API keys (anon/public) |
| `SUPABASE_SERVICE_ROLE_KEY` | Project API keys (service_role) |

6. Nhấn **Deploy**
7. Đợi 2-3 phút

✅ **Kết quả:** Website đã live!

### Cách 2: Deploy thủ công

```bash
# 1. Clone repository
git clone https://github.com/ngoctu2008/ngoctu-cms.git
cd ngoctu-cms

# 2. Cài đặt dependencies
npm install

# 3. Tạo .env.local
cp .env.local.example .env.local

# 4. Điền các giá trị vào .env.local
# (Dùng thông tin từ Bước 2.2)

# 5. Build
npm run build

# 6. Deploy lên Vercel
npm i -g vercel
vercel --prod
```

---

## Bước 4: Tạo Admin User

### 4.1 Đăng ký tài khoản

1. Truy cập website đã deploy (ví dụ: `https://blog-ca-nhan.vercel.app`)
2. Vào trang `/login`
3. Nhấn **Đăng ký** (hoặc dùng form đăng nhập nếu đã có)
4. Tạo tài khoản với email của bạn

### 4.2 Cấp quyền Admin

1. Quay lại **Supabase Dashboard**
2. Vào **SQL Editor → New query**
3. Chạy lệnh:

```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'email-cua-ban@example.com';
```

4. Thay `email-cua-ban@example.com` bằng email bạn vừa đăng ký

### 4.3 Kiểm tra

1. Quay lại website
2. Đăng nhập lại
3. Truy cập `/dashboard`
4. ✅ Bạn đã có quyền Admin đầy đủ!

---

## Bước 5: Cấu hình Storage (Upload ảnh)

1. Vào **Supabase Dashboard → Storage**
2. Nhấn **New bucket**
3. Tên: `images`
4. ✅ Tích **Public bucket**
5. Nhấn **Save**

---

## 🎉 Hoàn tất!

Website của bạn đã sẵn sàng:
- 🌐 **Trang chủ:** `https://your-domain.vercel.app`
- ⚙️ **Admin:** `https://your-domain.vercel.app/dashboard`
- 🔐 **Login:** `https://your-domain.vercel.app/login`

---

## 🔧 Cấu hình nâng cao (Tùy chọn)

### Thay đổi tên website

1. Vào **Supabase → SQL Editor**
2. Chạy:

```sql
UPDATE public.site_settings 
SET site_name = 'Tên Website Của Bạn',
    site_description = 'Mô tả website của bạn';
```

### Thêm danh mục mới

```sql
INSERT INTO public.categories (name, slug, description, color, sort_order)
VALUES ('Tên danh mục', 'ten-danh-muc', 'Mô tả', '#ff0000', 5);
```

### Cấu hình Social Links

```sql
UPDATE public.site_settings 
SET social_links = '{
  "facebook": "https://facebook.com/yourpage",
  "youtube": "https://youtube.com/yourchannel",
  "twitter": "https://twitter.com/yourhandle"
}'::jsonb;
```

---

## ❓ Xử lý lỗi thường gặp

### Lỗi: "Không thể kết nối Supabase"
- Kiểm tra lại `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Đảm bảo không có dấu cách thừa

### Lỗi: "Không có quyền truy cập Admin"
- Chạy lại SQL cấp quyền admin (Bước 4.2)
- Đăng xuất và đăng nhập lại

### Lỗi: "Không upload được ảnh"
- Kiểm tra đã tạo bucket `images` chưa (Bước 5)
- Đảm bảo bucket được đặt **Public**

---

## 📞 Hỗ trợ

Nếu gặp vấn đề, vui lòng:
1. Tạo [Issue](https://github.com/ngoctu2008/ngoctu-cms/issues) trên GitHub
2. Mô tả chi tiết lỗi và các bước đã thực hiện
