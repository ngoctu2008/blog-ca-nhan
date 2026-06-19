import { createServerSupabaseClient } from "@/lib/supabase";
import HeroSection from "@/components/site/HeroSection";
import PostCard from "@/components/site/PostCard";
import Sidebar from "@/components/site/Sidebar";
import NewsletterForm from "@/components/site/NewsletterForm";
import Pagination from "@/components/ui/Pagination";
import { AppearanceSettings } from "@/types";

export default async function HomePage({ searchParams }: { searchParams: { page?: string } }) {
  const supabase = await createServerSupabaseClient();
  const page = parseInt(searchParams.page || "1");
  const perPage = 9;

  const [{ data: appearance }, { data: featuredPosts }, { data: posts, count }, { data: categories }, { data: trendingPosts }] = await Promise.all([
    supabase.from("appearance_settings").select("*").single(),
    supabase.from("posts").select("*, category:categories(name, slug)").eq("status", "published").eq("featured", true).order("published_at", { ascending: false }).limit(4),
    supabase.from("posts").select("*, author:profiles(id, full_name, avatar_url), category:categories(*)", { count: "exact" }).eq("status", "published").order("published_at", { ascending: false }).range((page - 1) * perPage, page * perPage - 1),
    supabase.from("categories").select("*").order("sort_order"),
    supabase.from("posts").select("*, author:profiles(id, full_name, avatar_url), category:categories(*)").eq("status", "published").order("view_count", { ascending: false }).limit(5),
  ]);

  const allTags = [...new Set((posts || []).flatMap((p: any) => p.tags || []))].slice(0, 15);
  const totalPages = Math.ceil((count || 0) / perPage);
  const showNewsletter = (appearance as unknown as AppearanceSettings)?.show_newsletter !== false;

  return (
    <div>
      {(appearance as unknown as AppearanceSettings)?.show_hero !== false && (
        <HeroSection
          title={(appearance as unknown as AppearanceSettings)?.hero_title || undefined}
          subtitle={(appearance as unknown as AppearanceSettings)?.hero_subtitle || undefined}
          image={(appearance as unknown as AppearanceSettings)?.hero_image || undefined}
          featuredPosts={featuredPosts || []}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bai viet moi</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts?.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={() => {}} />
              </div>
            )}
          </div>
          <div className="space-y-8">
            <Sidebar trendingPosts={trendingPosts || []} categories={categories || []} tags={allTags} />
            {showNewsletter && <NewsletterForm />}
          </div>
        </div>
      </div>
    </div>
  );
}
