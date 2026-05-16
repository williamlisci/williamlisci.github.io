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

  // Hàm định dạng lại slug thành tiêu đề đẹp hơn (Ví dụ: "hoc-react" -> "Học react")
  const formatTitle = (slugString: string | undefined) => {
    if (!slugString) return "Không có tiêu đề";
    const text = slugString.replace(/-/g, " ");
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 border-b border-zinc-800 pb-8">
          {formatTitle(slug)}
        </h1>

        {/* Chỉ cần prose prose-invert và max-w-none là đủ.
        Tailwind v4 Typography sẽ lo toàn bộ phần gạch đầu dòng và màu chữ.
      */}
        <div className="prose prose-invert max-w-none pl-2">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
