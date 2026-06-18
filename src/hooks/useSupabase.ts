"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createBrowserClient();

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(profile);
      }

      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          setProfile(profile);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, profile, loading, isAdmin: profile?.role === "admin" };
}

export function usePosts(options?: {
  status?: string;
  category?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
}) {
  const [posts, setPosts] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createBrowserClient();
      let query = supabase
        .from("posts")
        .select("*, author:profiles(id, full_name, avatar_url), category:categories(*)", { count: "exact" });

      if (options?.status) query = query.eq("status", options.status);
      if (options?.category) query = query.eq("category_id", options.category);
      if (options?.featured) query = query.eq("featured", true);

      const page = options?.page || 1;
      const limit = options?.limit || 10;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.order("created_at", { ascending: false }).range(from, to);

      const { data, count, error } = await query;

      if (!error) {
        setPosts(data || []);
        setTotal(count || 0);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [options?.status, options?.category, options?.featured, options?.page, options?.limit]);

  return { posts, loading, total };
}

export function useCategories() {
  const [categories, setCategories] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error) setCategories(data || []);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return { categories, loading };
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const supabase = createBrowserClient();
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .single();

      if (!error) setSettings(data);
      setLoading(false);
    };

    fetchSettings();
  }, []);

  return { settings, loading };
}
