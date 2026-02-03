// src/components/PostList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../assets/css/Post.module.css";

// Định nghĩa kiểu dữ liệu cho một bài viết
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
      return {
        slug,
        title,
      };
    });
    setPosts(loadedPosts);
  }, []);

  // Lọc bài viết dựa trên từ khóa tìm kiếm
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className={styles.postList}>
      <header className={styles.introText}>
        <p>
          Xin chào, tôi là Nghĩa. `Nghĩa` trong trọng tình, trọng nghĩa :).
          <br />
          Đây là không gian kỹ thuật số nơi tôi lưu giữ và chia sẻ những điều
          quan trọng mà tôi đã đốn ngộ được.
          <br />
          Ngôn ngữ trong các bài viết của tôi là tiếng Việt vì tôi thích nhịp
          điệu trầm bổng, giàu cảm xúc của ngôn ngữ này. Đặc biệt là giọng nói
          nũng nịu của con gái:)
          <br />
          Cập nhật lần cuối: Jan 2026.
        </p>
        {/* Thêm input và button tìm kiếm ở đây */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Tìm kiếm nhanh..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </header>
      <ul className={styles.postListItems}>
        {filteredPosts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
