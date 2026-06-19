import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface SidebarProps {
  trendingPosts: any[];
  categories: any[];
  tags: string[];
}

export default function Sidebar({ trendingPosts, categories, tags }: SidebarProps) {
  return (
    <div className="space-y-8">
      {/* Trending Posts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Bài viết nổi bật</h3>
        <div className="space-y-4">
          {trendingPosts?.map((post) => (
            <div key={post.id} className="flex gap-4">
              {post.cover_image && (
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div>
                <Link
                  href={`/post/${post.slug}`}
                  className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 line-clamp-2"
                >
                  {post.title}
                </Link>
                <div className="text-xs text-gray-500 mt-1">
                  {format(new Date(post.published_at), "dd MMM, yyyy", { locale: vi })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Danh mục</h3>
        <div className="space-y-2">
          {categories?.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex items-center justify-between py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Thẻ</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tag}`}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
