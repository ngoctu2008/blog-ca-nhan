export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: string;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          cover_image: string | null;
          status: string;
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
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          cover_image?: string | null;
          status?: string;
          featured?: boolean;
          view_count?: number;
          author_id: string;
          category_id?: string | null;
          tags?: string[] | null;
          meta_title?: string | null;
          meta_description?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          cover_image?: string | null;
          status?: string;
          featured?: boolean;
          view_count?: number;
          author_id?: string;
          category_id?: string | null;
          tags?: string[] | null;
          meta_title?: string | null;
          meta_description?: string | null;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          color: string | null;
          icon: string | null;
          parent_id: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          color?: string | null;
          icon?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          color?: string | null;
          icon?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      site_settings: {
        Row: {
          id: string;
          site_name: string;
          site_description: string;
          site_logo: string | null;
          site_favicon: string | null;
          primary_color: string;
          secondary_color: string;
          footer_text: string | null;
          social_links: Json | null;
          analytics_id: string | null;
          maintenance_mode: boolean;
          posts_per_page: number;
          enable_comments: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          site_name?: string;
          site_description?: string;
          site_logo?: string | null;
          site_favicon?: string | null;
          primary_color?: string;
          secondary_color?: string;
          footer_text?: string | null;
          social_links?: Json | null;
          analytics_id?: string | null;
          maintenance_mode?: boolean;
          posts_per_page?: number;
          enable_comments?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          site_name?: string;
          site_description?: string;
          site_logo?: string | null;
          site_favicon?: string | null;
          primary_color?: string;
          secondary_color?: string;
          footer_text?: string | null;
          social_links?: Json | null;
          analytics_id?: string | null;
          maintenance_mode?: boolean;
          posts_per_page?: number;
          enable_comments?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      appearance_settings: {
        Row: {
          id: string;
          theme: string;
          font_family: string;
          header_style: string;
          show_hero: boolean;
          hero_title: string | null;
          hero_subtitle: string | null;
          hero_image: string | null;
          sidebar_position: string;
          show_trending: boolean;
          show_newsletter: boolean;
          custom_css: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          theme?: string;
          font_family?: string;
          header_style?: string;
          show_hero?: boolean;
          hero_title?: string | null;
          hero_subtitle?: string | null;
          hero_image?: string | null;
          sidebar_position?: string;
          show_trending?: boolean;
          show_newsletter?: boolean;
          custom_css?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          theme?: string;
          font_family?: string;
          header_style?: string;
          show_hero?: boolean;
          hero_title?: string | null;
          hero_subtitle?: string | null;
          hero_image?: string | null;
          sidebar_position?: string;
          show_trending?: boolean;
          show_newsletter?: boolean;
          custom_css?: string | null;
          updated_at?: string;
        };
      };
      navigation: {
        Row: {
          id: string;
          label: string;
          href: string;
          icon: string | null;
          parent_id: string | null;
          sort_order: number;
          is_external: boolean;
          target: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          href: string;
          icon?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          is_external?: boolean;
          target?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          label?: string;
          href?: string;
          icon?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          is_external?: boolean;
          target?: string | null;
          created_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_name: string;
          author_email: string;
          author_website: string | null;
          content: string;
          parent_id: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_name: string;
          author_email: string;
          author_website?: string | null;
          content: string;
          parent_id?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          author_name?: string;
          author_email?: string;
          author_website?: string | null;
          content?: string;
          parent_id?: string | null;
          status?: string;
          created_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          status: string;
          subscribed_at: string;
          unsubscribed_at: string | null;
          last_sent_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          status?: string;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          last_sent_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          status?: string;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          last_sent_at?: string | null;
          created_at?: string;
        };
      };
      newsletter_campaigns: {
        Row: {
          id: string;
          subject: string;
          content: string;
          status: string;
          sent_count: number;
          open_count: number;
          click_count: number;
          created_by: string | null;
          sent_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          subject: string;
          content: string;
          status?: string;
          sent_count?: number;
          open_count?: number;
          click_count?: number;
          created_by?: string | null;
          sent_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          subject?: string;
          content?: string;
          status?: string;
          sent_count?: number;
          open_count?: number;
          click_count?: number;
          created_by?: string | null;
          sent_at?: string | null;
          created_at?: string;
        };
      };
      newsletter_opens: {
        Row: {
          id: string;
          campaign_id: string;
          subscriber_id: string;
          opened_at: string;
          user_agent: string | null;
          ip_address: string | null;
        };
        Insert: {
          id?: string;
          campaign_id: string;
          subscriber_id: string;
          opened_at?: string;
          user_agent?: string | null;
          ip_address?: string | null;
        };
        Update: {
          id?: string;
          campaign_id?: string;
          subscriber_id?: string;
          opened_at?: string;
          user_agent?: string | null;
          ip_address?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
