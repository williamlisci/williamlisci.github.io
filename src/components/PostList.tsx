import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Post {
  slug: string;
  title: string;
}

const postFiles: Record<string, string> = import.meta.glob("/src/posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const loadedPosts: Post[] = Object.keys(postFiles).map((key) => {
      const slug = key.split("/").pop()?.replace(".md", "") || "";
      const title = slug
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return { slug, title };
    });
    setPosts(loadedPosts);
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="prose prose-invert mb-12">
          <p className="text-lg text-gray-300">
            Xin chào, tôi là Nghĩa. `Nghĩa` trong trọng tình, trọng nghĩa :)
            <br />
            Đây là không gian kỹ thuật số nơi tôi lưu giữ và chia sẻ những điều
            quan trọng mà tôi đã đốn ngộ được.
            <br />
            Mọi thứ chúng ta tiếp nhận bằng giác quan chỉ là phần nổi của tảng
            băng chìm. Nếu không đốn ngộ được nội hàm tầng sâu, mọi hiểu biết là vô nghĩa.
            <br />
            Cập nhật lần cuối: May 2026.
          </p>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="nhập để tìm kiếm nhanh"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <ul className="space-y-4">
          {filteredPosts.map((post) => (
            <li key={post.slug}>
              <Link
                to={`/blog/posts/${post.slug}`}
                className="block p-6 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl transition-all hover:border-cyan-500 group"
              >
                <span className="text-xl group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostList;
