// ==================== USER TYPES ====================
export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: "admin" | "editor" | "author" | "subscriber";
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: string;
  bio: string | null;
}

// ==================== POST TYPES ====================
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  status: "draft" | "published" | "archived";
  featured: boolean;
  view_count: number;
  author_id: string;
  category_id: string | null;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  author?: UserProfile;
  category?: Category;
}

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  status: "draft" | "published";
  featured: boolean;
  category_id: string;
  tags: string[];
  meta_title: string;
  meta_description: string;
}

// ==================== CATEGORY TYPES ====================
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  parent_id: string | null;
  sort_order: number;
  post_count?: number;
  created_at: string;
}

// ==================== SETTING TYPES ====================
export interface SiteSettings {
  id: string;
  site_name: string;
  site_description: string;
  site_logo: string | null;
  site_favicon: string | null;
  primary_color: string;
  secondary_color: string;
  footer_text: string | null;
  social_links: SocialLinks | null;
  analytics_id: string | null;
  maintenance_mode: boolean;
  posts_per_page: number;
  enable_comments: boolean;
  created_at: string;
  updated_at: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  youtube?: string;
  instagram?: string;
  tiktok?: string;
  zalo?: string;
}

export interface AppearanceSettings {
  id: string;
  theme: "light" | "dark" | "system";
  font_family: string;
  header_style: "default" | "centered" | "minimal";
  show_hero: boolean;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_image: string | null;
  sidebar_position: "left" | "right" | "none";
  show_trending: boolean;
  show_newsletter: boolean;
  custom_css: string | null;
  updated_at: string;
}

// ==================== NAVIGATION TYPES ====================
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string | null;
  parent_id: string | null;
  sort_order: number;
  is_external: boolean;
  target: string | null;
}

// ==================== COMMENT TYPES ====================
export interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string;
  author_website: string | null;
  content: string;
  parent_id: string | null;
  status: "pending" | "approved" | "spam";
  created_at: string;
}

// ==================== API RESPONSE TYPES ====================
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// ==================== MENU TYPES ====================
export interface MenuItem {
  id: string;
  label: string;
  url: string;
  icon?: string;
  children?: MenuItem[];
}
