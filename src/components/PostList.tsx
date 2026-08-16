import type React from "react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import postsIndex from "../posts-index.json";

interface Post {
  slug: string;
  title: string;
  date: string | null;
  tags: string[];
  excerpt: string;
}

const posts = postsIndex as Post[];

const PostList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 20;

  const allTags = useMemo(() => {
    const set = new Set(posts.flatMap((p) => p.tags));
    return Array.from(set).sort();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag = !activeTag || post.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
  );
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Thêm max-w-none để loại bỏ giới hạn chiều rộng mặc định của prose */}
        <div className="prose prose-invert max-w-none mb-12">
          {/* Thêm text-justify để chữ căn đều hai bên lề trái/phải khít với ô tìm kiếm */}
          <p className="text-lg text-gray-300 text-justify leading-relaxed">
            - Xin chào, tôi là Nghĩa. `Nghĩa` trong trọng tình, trọng nghĩa :)
            <br />- Đây là không gian kỹ thuật số nơi tôi lưu giữ và chia sẻ
            những suy ngẫm cá nhân, thông tin và trích dẫn thú vị.
            <br />- Hãy dám đi sau thế giới, và giành thế thượng phong từ phía
            sau. 段永平.
            <br />- Tổng số bài đăng: {posts.length} bài. Cập nhật lần cuối:
            2026.
          </p>
        </div>
        <div className="mb-8">
          <input
            type="text"
            placeholder="nhập để tìm kiếm nhanh"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-6 py-4 text-lg mb-6 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Filter theo tag */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => {
              setActiveTag(null);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-full text-sm border ${
              !activeTag
                ? "bg-cyan-500 text-black border-cyan-500"
                : "border-zinc-700 text-gray-300"
            }`}
          >
            Tất cả
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setActiveTag(tag);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-full text-sm border ${
                activeTag === tag
                  ? "bg-cyan-500 text-black border-cyan-500"
                  : "border-zinc-700 text-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

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
                {post.excerpt && (
                  <p className="text-sm text-gray-400 mt-2">{post.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
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
              className="px-4 py-2 rounded-lg border border-zinc-700 disabled:opacity-30"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;
