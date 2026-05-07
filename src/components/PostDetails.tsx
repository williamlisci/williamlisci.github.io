import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const postFiles: Record<string, string> = import.meta.glob("/src/posts/*.md", {
  eager: true,
  query: "raw",
  import: "default",
});

const PostDetails: React.FC = () => {
  const { slug } = useParams();
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!slug) {
      setMarkdown("Bài viết không tồn tại.");
      setLoading(false);
      return;
    }

    const filePath = `/src/posts/${slug}.md`;
    const fileContent = postFiles[filePath];

    if (fileContent) {
      setMarkdown(fileContent);
    } else {
      setMarkdown("Bài viết không tồn tại.");
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert prose-headings:text-white prose-a:text-cyan-400 prose-strong:text-white max-w-none">
        <h1 className="text-4xl font-bold mb-10 border-b border-zinc-800 pb-8">
          {slug ? slug.replace(/-/g, " ").toUpperCase() : "Không có tiêu đề"}
        </h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PostDetails;
