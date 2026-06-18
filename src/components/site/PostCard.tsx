"use client";

import Link from "next/link";
import { Clock, Eye, User } from "lucide-react";
import { formatRelativeTime, estimateReadTime, truncateText } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    cover_image: string | null;
    content: string;
    view_count: number;
    featured: boolean;
    published_at: string;
    category?: { name: string; slug: string; color?: string } | null;
    author?: { full_name: string; avatar_url: string | null } | null;
  };
  variant?: "default" | "compact" | "horizontal" | "featured";
}

export default function PostCard({ post, variant = "default" }: PostCardProps) {
  const readTime = estimateReadTime(post.content || "");

  if (variant === "compact") {
    return (
      <Link href={`/${post.slug}`} className="group flex gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
          {post.cover_image ? (
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 transition-colors">{post.title}</h3>
          <span className="text-xs text-gray-400 mt-1 block">{formatRelativeTime(post.published_at)}</span>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/${post.slug}`} className="group block">
        <article className="flex gap-4 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="w-40 md:w-48 shrink-0">
            <div className="aspect-[4/3] overflow-hidden">
              {post.cover_image ? (
                <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200" />
              )}
            </div>
          </div>
          <div className="flex-1 py-4 pr-4 flex flex-col justify-center">
            {post.category && <Badge variant="primary" size="sm" className="w-fit mb-2">{post.category.name}</Badge>}
            <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 transition-colors">{post.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 hidden md:block">{truncateText(post.excerpt || "", 120)}</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readTime} phút</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.view_count}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/${post.slug}`} className="group block h-full">
      <article className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="aspect-[16/10] overflow-hidden">
          {post.cover_image ? (
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800" />
          )}
        </div>
        <div className="p-5 flex-1 flex flex-col">
          {post.category && <Badge variant="primary" size="sm" className="w-fit mb-3">{post.category.name}</Badge>}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 transition-colors mb-2">{post.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 flex-1">{truncateText(post.excerpt || "", 150)}</p>
          <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-1.5">
              {post.author?.avatar_url ? (
                <img src={post.author.avatar_url} alt="" className="w-5 h-5 rounded-full" />
              ) : (
                <User className="w-4 h-4" />
              )}
              <span>{post.author?.full_name || "Admin"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readTime} phút</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.view_count}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
