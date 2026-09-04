import type React from "react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import postsIndex from "../posts-index.json";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import SiteIntro from "./SiteIntro";

interface Post {
  slug: string;
  title: string;
  date: string | null;
}

const posts = postsIndex as Post[];
const POSTS_PER_PAGE = 20;

const PostList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useDocumentMeta({
    title: "Blog — William Li",
    description: `Danh sách ${posts.length} bài viết của William Li.`,
    lang: "vi",
  });

  // Chỉ tính lại khi searchQuery đổi, không phải mỗi lần render
  // (vd: khi bấm chuyển trang thì không cần filter lại toàn bộ list)
  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return posts;
    return posts.filter((post) => post.title.toLowerCase().includes(query));
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedPosts = useMemo(
    () =>
      filteredPosts.slice(
        (safePage - 1) * POSTS_PER_PAGE,
        safePage * POSTS_PER_PAGE,
      ),
    [filteredPosts, safePage],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <SiteIntro totalPosts={posts.length} latestDate={posts[0]?.date ?? null} />

        <div className="mb-8">
          <label htmlFor="post-search" className="sr-only">
            Tìm kiếm bài viết theo tiêu đề
          </label>
          <div className="relative">
            <input
              id="post-search"
              type="text"
              placeholder="nhập để tìm kiếm nhanh"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-6 py-4 text-lg mb-6 focus:outline-none focus:border-cyan-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                aria-label="Xóa tìm kiếm"
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {paginatedPosts.length === 0 ? (
          <p className="text-gray-400 text-center py-12">
            Không tìm thấy bài viết nào khớp với &quot;{searchQuery}&quot;.
          </p>
        ) : (
          <ul className="space-y-4">
            {paginatedPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/posts/${post.slug}`}
                  className="block p-6 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl transition-all hover:border-cyan-500 group"
                >
                  <span className="text-xl group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </span>
                  {post.date && (
                    <span className="block text-sm text-gray-500 mt-1">
                      {post.date}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <nav
            aria-label="Điều hướng trang"
            className="flex items-center justify-center gap-2 mt-10"
          >
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              aria-label="Trang trước"
              className="px-4 py-2 rounded-lg border border-zinc-700 disabled:opacity-30"
            >
              ←
            </button>
            <span className="text-gray-400 px-2">
              Trang {safePage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              aria-label="Trang sau"
              className="px-4 py-2 rounded-lg border border-zinc-700 disabled:opacity-30"
            >
              →
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default PostList;
