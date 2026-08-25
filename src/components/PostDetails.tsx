import type React from "react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import postsIndex from "../posts-index.json";

interface Post {
	slug: string;
	title: string;
	date: string | null;
}

// posts-index.json đã được generate-posts-index.mjs sort theo date mới nhất
// trước, nên "bài tiếp theo" chỉ đơn giản là phần tử kế tiếp trong mảng này.
const posts = postsIndex as Post[];

// Lazy import: mỗi giá trị trong object là một HÀM trả về Promise,
// nội dung file .md CHỈ được tải khi ta thực sự gọi hàm đó (đúng slug cần xem),
// thay vì đọc hết file ngay khi app khởi động.
const postFiles = import.meta.glob("/src/posts/*.md", {
	query: "?raw",
	import: "default",
}) as Record<string, () => Promise<string>>;

// Bỏ phần frontmatter YAML (giữa 2 dòng "---") ở đầu file, không cần gray-matter.
// Nhẹ hơn, chạy được ở browser, không phụ thuộc Node API.
function stripFrontmatter(raw: string): string {
	const frontmatterRegex = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;
	return raw.replace(frontmatterRegex, "");
}

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
				setMarkdown(stripFrontmatter(content));
			})
			.catch(() => {
				setMarkdown("Không thể tải bài viết. Vui lòng thử lại.");
			})
			.finally(() => {
				setLoading(false);
			});

		// Cuộn lên đầu trang mỗi khi chuyển sang bài viết khác (ví dụ khi bấm
		// nút "Bài tiếp theo"), tránh giữ nguyên vị trí cuộn của bài cũ.
		window.scrollTo({ top: 0, behavior: "smooth" });
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

	// Tìm bài hiện tại trong posts-index.json để suy ra bài tiếp theo.
	// Nếu slug hiện tại không có trong index (ví dụ bài quá mới chưa
	// generate lại index), currentIndex sẽ là -1 và nextPost sẽ là null.
	const currentIndex = posts.findIndex((p) => p.slug === slug);
	const nextPost =
		currentIndex === -1
			? null
			: posts[(currentIndex + 1) % posts.length]; // % posts.length để quay vòng về bài đầu tiên

	return (
		<div className="min-h-screen bg-black text-white py-12 px-6">
			<div className="max-w-3xl mx-auto">
				{/* Nút quay lại danh sách bài viết */}
				<Link
					to="/blog"
					className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8"
				>
					← Quay lại danh sách
				</Link>

				<h1 className="text-4xl font-bold mb-10 border-b border-zinc-800 pb-8">
					{formatTitle(slug)}
				</h1>

				<div className="prose prose-invert max-w-none pl-2">
					<ReactMarkdown
						remarkPlugins={[remarkGfm, remarkMath]}
						rehypePlugins={[rehypeKatex]}
					>
						{markdown}
					</ReactMarkdown>
				</div>

				{/* Nút chuyển sang bài viết tiếp theo, chỉ hiện khi tìm được bài kế tiếp */}
				{nextPost && (
					<div className="mt-16 pt-8 border-t border-zinc-800">
						<Link
							to={`/blog/posts/${nextPost.slug}`}
							className="block p-6 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl transition-all hover:border-cyan-500 group"
						>
							<span className="text-sm text-gray-500">Bài viết tiếp theo</span>
							<div className="text-xl font-semibold group-hover:text-cyan-400 transition-colors mt-1">
								{nextPost.title} →
							</div>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default PostDetails;
