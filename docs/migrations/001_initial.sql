-- ============================================================
-- NGOCTU CMS - DATABASE MIGRATION
-- Chạy toàn bộ file này trong SQL Editor của Supabase
-- ============================================================

-- ============================================================
-- 1. PROFILES TABLE (Người dùng)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'subscriber' CHECK (role IN ('admin', 'editor', 'author', 'subscriber')),
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. CATEGORIES TABLE (Danh mục)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT,
  icon TEXT,
  parent_id UUID REFERENCES public.categories(id),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. POSTS TABLE (Bài viết)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL DEFAULT '',
  cover_image TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  author_id UUID REFERENCES public.profiles(id) NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  tags TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. SITE SETTINGS (Cài đặt website)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT DEFAULT 'Ngọc Tú',
  site_description TEXT DEFAULT '',
  site_logo TEXT,
  site_favicon TEXT,
  primary_color TEXT DEFAULT '#3b82f6',
  secondary_color TEXT DEFAULT '#22c55e',
  footer_text TEXT,
  social_links JSONB,
  analytics_id TEXT,
  maintenance_mode BOOLEAN DEFAULT FALSE,
  posts_per_page INTEGER DEFAULT 10,
  enable_comments BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 5. APPEARANCE SETTINGS (Giao diện)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.appearance_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  theme TEXT DEFAULT 'system',
  font_family TEXT DEFAULT 'inter',
  header_style TEXT DEFAULT 'default',
  show_hero BOOLEAN DEFAULT TRUE,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_image TEXT,
  sidebar_position TEXT DEFAULT 'right',
  show_trending BOOLEAN DEFAULT TRUE,
  show_newsletter BOOLEAN DEFAULT TRUE,
  custom_css TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 6. NAVIGATION (Menu)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.navigation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  icon TEXT,
  parent_id UUID REFERENCES public.navigation(id),
  sort_order INTEGER DEFAULT 0,
  is_external BOOLEAN DEFAULT FALSE,
  target TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. COMMENTS (Bình luận)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  author_website TEXT,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES public.comments(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'spam')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 8. NEWSLETTER SUBSCRIBERS (Người đăng ký nhận tin)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  last_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 9. NEWSLETTER CAMPAIGNS (Chiến dịch email)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.newsletter_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sending', 'sent', 'failed')),
  sent_count INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES public.profiles(id),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 10. NEWSLETTER OPENS (Theo dõi mở email)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.newsletter_opens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES public.newsletter_campaigns(id) ON DELETE CASCADE,
  subscriber_id UUID REFERENCES public.newsletter_subscribers(id) ON DELETE CASCADE,
  opened_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  ip_address TEXT
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appearance_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_opens ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (TRUE);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Posts policies
CREATE POLICY "Published posts are viewable by everyone" ON public.posts FOR SELECT USING (status = 'published');
CREATE POLICY "Authors can manage own posts" ON public.posts FOR ALL USING (auth.uid() = author_id);
CREATE POLICY "Admins can manage all posts" ON public.posts FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (TRUE);

-- Settings policies
CREATE POLICY "Settings are viewable by everyone" ON public.site_settings FOR SELECT USING (TRUE);
CREATE POLICY "Appearance settings are viewable by everyone" ON public.appearance_settings FOR SELECT USING (TRUE);

-- Newsletter policies
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Users can view own subscription" ON public.newsletter_subscribers FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage subscribers" ON public.newsletter_subscribers FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);
CREATE POLICY "Admins can manage campaigns" ON public.newsletter_campaigns FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Comments policies
CREATE POLICY "Approved comments are viewable" ON public.comments FOR SELECT USING (status = 'approved');
CREATE POLICY "Anyone can create comment" ON public.comments FOR INSERT WITH CHECK (TRUE);

-- ============================================================
-- FUNCTIONS
-- ============================================================
CREATE OR REPLACE FUNCTION public.increment_post_views(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.posts SET view_count = view_count + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- DEFAULT DATA
-- ============================================================

-- Insert default site settings
INSERT INTO public.site_settings (id, site_name, site_description, footer_text)
VALUES (
  gen_random_uuid(),
  'Ngọc Tú',
  'Chia sẻ kiến thức, kinh nghiệm và câu chuyện giáo dục',
  '© 2024 Ngọc Tú. Tất cả các quyền được bảo lưu.'
)
ON CONFLICT DO NOTHING;

-- Insert default appearance settings
INSERT INTO public.appearance_settings (id)
VALUES (gen_random_uuid())
ON CONFLICT DO NOTHING;

-- Insert sample categories
INSERT INTO public.categories (name, slug, description, color, sort_order) VALUES
  ('Tin tức', 'tin-tuc', 'Tin tức giáo dục mới nhất', '#3b82f6', 1),
  ('Giáo dục', 'giao-duc', 'Kiến thức và phương pháp giáo dục', '#22c55e', 2),
  ('Tư liệu', 'tu-lieu', 'Tài liệu và tư liệu giảng dạy', '#f59e0b', 3),
  ('Tâm sự', 'tam-su', 'Chia sẻ câu chuyện nghề giáo', '#ec4899', 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert default navigation
INSERT INTO public.navigation (label, href, sort_order) VALUES
  ('Trang chủ', '/', 1),
  ('Tin tức', '/category/tin-tuc', 2),
  ('Giáo dục', '/category/giao-duc', 3),
  ('Tư liệu', '/category/tu-lieu', 4)
ON CONFLICT DO NOTHING;

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON public.posts(featured);
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category_id);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON public.newsletter_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_comments_post ON public.comments(post_id);
