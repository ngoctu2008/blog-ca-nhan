"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  image?: string;
  featuredPosts?: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string;
    category: { name: string; slug: string };
    published_at: string;
  }>;
}

export default function HeroSection({
  title = "Chia sẻ kiến thức giáo dục",
  subtitle = "Nơi kết nối cộng đồng giáo viên, phụ huynh và học sinh",
  image,
  featuredPosts = [],
}: HeroSectionProps) {
  const mainPost = featuredPosts[0];
  const sidePosts = featuredPosts.slice(1, 4);

  return (
    <section className="relative">
      <div className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        {image && (
          <div className="absolute inset-0 opacity-20">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              <span>Tin nổi bật</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{title}</h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8">{subtitle}</p>
            <Link
              href={mainPost ? `/${mainPost.slug}` : "/category/tin-tuc"}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors"
            >
              Đọc ngay
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {featuredPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mainPost && (
              <div className="lg:col-span-2">
                <Link href={`/${mainPost.slug}`} className="group block">
                  <article className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="aspect-[16/9] overflow-hidden">
                      {mainPost.cover_image ? (
                        <img src={mainPost.cover_image} alt={mainPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200" />
                      )}
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mb-3">
                        {mainPost.category?.name || "Tin tức"}
                      </span>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {mainPost.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">{mainPost.excerpt}</p>
                      <span className="text-xs text-gray-400">{formatRelativeTime(mainPost.published_at)}</span>
                    </div>
                  </article>
                </Link>
              </div>
            )}

            <div className="space-y-4">
              {sidePosts.map((post) => (
                <Link key={post.id} href={`/${post.slug}`} className="group block">
                  <article className="flex gap-4 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                      {post.cover_image ? (
                        <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium text-primary-600 dark:text-primary-400">{post.category?.name || "Tin tức"}</span>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 transition-colors mt-1">{post.title}</h3>
                      <span className="text-xs text-gray-400 mt-1 block">{formatRelativeTime(post.published_at)}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
