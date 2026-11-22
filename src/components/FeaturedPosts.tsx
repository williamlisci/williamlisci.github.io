import type React from "react";
import { Link } from "react-router-dom";

interface FeaturedPost {
  slug: string;
  title: string;
  created_at: string | null;
  updated_at: string | null;
}

interface FeaturedPostsProps {
  posts: FeaturedPost[];
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="featured-posts-heading"
      className="mb-10 rounded-2xl border border-cyan-900/70 bg-cyan-950/20 p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2
          id="featured-posts-heading"
          className="text-lg font-semibold text-cyan-300"
        >
          Quan trọng
        </h2>
        <span className="text-xs uppercase tracking-wider text-cyan-500">
          Đã ghim
        </span>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={`/blog/posts/${post.slug}`}
              className="block rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 transition-all hover:border-cyan-500 hover:bg-zinc-800 group"
            >
              <span className="text-base group-hover:text-cyan-400 transition-colors">
                {post.title}
              </span>
              {(post.updated_at || post.created_at) && (
                <span className="mt-1 block text-sm text-gray-500">
                  {post.updated_at || post.created_at}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeaturedPosts;
