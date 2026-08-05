import type React from "react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

// Lazy import: mỗi giá trị trong object là một HÀM trả về Promise,
// nội dung file .md CHỈ được tải khi ta thực sự gọi hàm đó (đúng slug cần xem),
// thay vì đọc hết file ngay khi app khởi động.
const postFiles = import.meta.glob("/src/posts/*.md", {
	query: "?raw",
	import: "default",
}) as Record<string, () => Promise<string>>;

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
		const loadPost = postFiles[filePath];

		if (!loadPost) {
			setMarkdown("Bài viết không tồn tại.");
			setLoading(false);
			return;
		}

		setLoading(true);
		loadPost()
			.then((content) => {
				setMarkdown(content);
			})
			.catch(() => {
				setMarkdown("Không thể tải bài viết. Vui lòng thử lại.");
			})
			.finally(() => {
				setLoading(false);
			});
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
