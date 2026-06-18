"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient, createAdminClient } from "./supabase";
import { generateSlug } from "./utils";
import type { Post, Category, SiteSettings, AppearanceSettings } from "@/types";

// ==================== AUTH ACTIONS ====================
export async function signIn(email: string, password: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { error: error.message };
  return { data };
}

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile;
}

// ==================== POST ACTIONS ====================
export async function createPost(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const slug = generateSlug(title);
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const coverImage = formData.get("cover_image") as string;
  const status = formData.get("status") as "draft" | "published";
  const featured = formData.get("featured") === "true";
  const categoryId = formData.get("category_id") as string;
  const tags = (formData.get("tags") as string).split(",").map(t => t.trim()).filter(Boolean);
  const metaTitle = formData.get("meta_title") as string;
  const metaDescription = formData.get("meta_description") as string;

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title,
      slug,
      content,
      excerpt: excerpt || null,
      cover_image: coverImage || null,
      status,
      featured,
      author_id: user.id,
      category_id: categoryId || null,
      tags: tags.length > 0 ? tags : null,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      published_at: status === "published" ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const coverImage = formData.get("cover_image") as string;
  const status = formData.get("status") as "draft" | "published";
  const featured = formData.get("featured") === "true";
  const categoryId = formData.get("category_id") as string;
  const tags = (formData.get("tags") as string).split(",").map(t => t.trim()).filter(Boolean);
  const metaTitle = formData.get("meta_title") as string;
  const metaDescription = formData.get("meta_description") as string;

  const { data: existingPost } = await supabase
    .from("posts")
    .select("status, published_at")
    .eq("id", id)
    .single();

  const updates: Record<string, unknown> = {
    title,
    content,
    excerpt: excerpt || null,
    cover_image: coverImage || null,
    status,
    featured,
    category_id: categoryId || null,
    tags: tags.length > 0 ? tags : null,
    meta_title: metaTitle || null,
    meta_description: metaDescription || null,
    updated_at: new Date().toISOString(),
  };

  if (status === "published" && existingPost?.status === "draft") {
    updates.published_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("posts")
    .update(updates)
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath(`/dashboard/posts/edit/${id}`);
  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}

export async function deletePost(id: string) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/dashboard/posts");
  return { success: true };
}

export async function incrementViewCount(postId: string) {
  const supabase = await createServerSupabaseClient();

  await supabase.rpc("increment_post_views", { post_id: postId });
}

// ==================== CATEGORY ACTIONS ====================
export async function createCategory(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const name = formData.get("name") as string;
  const slug = generateSlug(name);
  const description = formData.get("description") as string;
  const color = formData.get("color") as string;
  const icon = formData.get("icon") as string;
  const parentId = formData.get("parent_id") as string;
  const sortOrder = parseInt(formData.get("sort_order") as string) || 0;

  const { error } = await supabase
    .from("categories")
    .insert({
      name,
      slug,
      description: description || null,
      color: color || null,
      icon: icon || null,
      parent_id: parentId || null,
      sort_order: sortOrder,
    });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const name = formData.get("name") as string;
  const slug = generateSlug(name);
  const description = formData.get("description") as string;
  const color = formData.get("color") as string;
  const icon = formData.get("icon") as string;
  const parentId = formData.get("parent_id") as string;
  const sortOrder = parseInt(formData.get("sort_order") as string) || 0;

  const { error } = await supabase
    .from("categories")
    .update({
      name,
      slug,
      description: description || null,
      color: color || null,
      icon: icon || null,
      parent_id: parentId || null,
      sort_order: sortOrder,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
}

export async function deleteCategory(id: string) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/categories");
  return { success: true };
}

// ==================== USER ACTIONS ====================
export async function updateUserRole(userId: string, role: string) {
  const supabase = await createAdminClient();

  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function deleteUser(userId: string) {
  const admin = createAdminClient();

  const { error: authError } = await admin.auth.admin.deleteUser(userId);
  if (authError) return { error: authError.message };

  revalidatePath("/dashboard/users");
  return { success: true };
}

// ==================== SETTINGS ACTIONS ====================
export async function updateSiteSettings(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const id = formData.get("id") as string;
  const siteName = formData.get("site_name") as string;
  const siteDescription = formData.get("site_description") as string;
  const siteLogo = formData.get("site_logo") as string;
  const siteFavicon = formData.get("site_favicon") as string;
  const primaryColor = formData.get("primary_color") as string;
  const secondaryColor = formData.get("secondary_color") as string;
  const footerText = formData.get("footer_text") as string;
  const socialLinks = JSON.parse(formData.get("social_links") as string || "{}");
  const analyticsId = formData.get("analytics_id") as string;
  const maintenanceMode = formData.get("maintenance_mode") === "true";
  const postsPerPage = parseInt(formData.get("posts_per_page") as string) || 10;
  const enableComments = formData.get("enable_comments") === "true";

  const { error } = await supabase
    .from("site_settings")
    .update({
      site_name: siteName,
      site_description: siteDescription,
      site_logo: siteLogo || null,
      site_favicon: siteFavicon || null,
      primary_color: primaryColor,
      secondary_color: secondaryColor,
      footer_text: footerText || null,
      social_links: socialLinks,
      analytics_id: analyticsId || null,
      maintenance_mode: maintenanceMode,
      posts_per_page: postsPerPage,
      enable_comments: enableComments,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/dashboard/settings");
  return { success: true };
}

export async function updateAppearanceSettings(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const id = formData.get("id") as string;
  const theme = formData.get("theme") as string;
  const fontFamily = formData.get("font_family") as string;
  const headerStyle = formData.get("header_style") as string;
  const showHero = formData.get("show_hero") === "true";
  const heroTitle = formData.get("hero_title") as string;
  const heroSubtitle = formData.get("hero_subtitle") as string;
  const heroImage = formData.get("hero_image") as string;
  const sidebarPosition = formData.get("sidebar_position") as string;
  const showTrending = formData.get("show_trending") === "true";
  const showNewsletter = formData.get("show_newsletter") === "true";
  const customCss = formData.get("custom_css") as string;

  const { error } = await supabase
    .from("appearance_settings")
    .update({
      theme,
      font_family: fontFamily,
      header_style: headerStyle,
      show_hero: showHero,
      hero_title: heroTitle || null,
      hero_subtitle: heroSubtitle || null,
      hero_image: heroImage || null,
      sidebar_position: sidebarPosition,
      show_trending: showTrending,
      show_newsletter: showNewsletter,
      custom_css: customCss || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/dashboard/appearance");
  return { success: true };
}

// ==================== UPLOAD ACTIONS ====================
export async function uploadImage(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const file = formData.get("file") as File;
  if (!file) return { error: "No file provided" };

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) return { error: uploadError.message };

  const { data: { publicUrl } } = supabase.storage
    .from("images")
    .getPublicUrl(filePath);

  return { url: publicUrl };
}
