import type React from "react";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import postsIndex from "../posts-index.json";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

interface Post {
	slug: string;
	title: string;
	date: string | null;
}

// posts-index.json đã được generate-posts-index.mjs sort theo date mới nhất
// trước, nên "bài trước/bài tiếp theo" chỉ đơn giản là phần tử liền kề
// trong mảng này.
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

// Rút gọn markdown thành đoạn mô tả ngắn, dùng cho <meta name="description">
// và og:description — bỏ các ký tự cú pháp markdown phổ biến.
function toExcerpt(markdown: string, maxLength = 155): string {
	const plain = markdown
		.replace(/```[\s\S]*?```/g, " ") // bỏ code block
		.replace(/!\[.*?\]\(.*?\)/g, " ") // bỏ ảnh
		.replace(/\[(.*?)\]\(.*?\)/g, "$1") // link -> chỉ giữ text hiển thị
		.replace(/[#*_>`~-]/g, " ") // bỏ ký tự markdown còn lại
		.replace(/\s+/g, " ")
		.trim();

	if (plain.length <= maxLength) return plain;
	return `${plain.slice(0, maxLength).trimEnd()}…`;
}

// Fallback: chỉ dùng khi slug không có trong posts-index.json (bài chưa kịp
// generate lại index), định dạng tạm slug thành tiêu đề đọc được
// (Ví dụ: "hoc-react" -> "Hoc react"). Bình thường title thật lấy từ
// posts-index.json (currentPost.title).
function formatTitle(slugString: string | undefined): string {
	if (!slugString) return "Không có tiêu đề";
	const text = slugString.replace(/-/g, " ");
	return text.charAt(0).toUpperCase() + text.slice(1);
}

// Cache nội dung markdown đã tải (tồn tại suốt phiên làm việc trong bộ nhớ,
// không mất khi component unmount) — quay lại bài đã xem không phải tải lại
// từ mạng.
const markdownCache = new Map<string, string>();

const PostDetails: React.FC = () => {
	const { slug } = useParams();
	const [markdown, setMarkdown] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	// Tìm bài hiện tại + suy ra bài trước/bài tiếp theo. Nếu slug hiện tại
	// không có trong index, currentIndex là -1 và currentPost/prevPost/
	// nextPost đều null.
	const currentIndex = posts.findIndex((p) => p.slug === slug);
	const currentPost = currentIndex === -1 ? null : posts[currentIndex];
	// Không quay vòng nữa: chỉ hiện bài trước/tiếp theo khi thực sự tồn tại,
	// để nhãn "Bài viết tiếp theo" luôn đúng nghĩa (trước đây ở bài cuối
	// cùng, "tiếp theo" sẽ quay vòng về bài đầu, dễ gây hiểu lầm).
	const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
	const nextPost =
		currentIndex !== -1 && currentIndex < posts.length - 1
			? posts[currentIndex + 1]
			: null;

	const displayTitle = currentPost?.title ?? formatTitle(slug);
	const description = useMemo(() => toExcerpt(markdown), [markdown]);

	useDocumentMeta({
		title: `${displayTitle} — William Li`,
		description: description || undefined,
		lang: "vi",
	});

	useEffect(() => {
		if (!slug) {
			setMarkdown("Bài viết không tồn tại.");
			setLoading(false);
			return;
		}

		const cached = markdownCache.get(slug);
		if (cached !== undefined) {
			setMarkdown(cached);
			setLoading(false);
			window.scrollTo({ top: 0, behavior: "smooth" });
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
				const stripped = stripFrontmatter(content);
				markdownCache.set(slug, stripped);
				setMarkdown(stripped);
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
					{displayTitle}
				</h1>

				<div className="prose prose-invert max-w-none pl-2">
					<ReactMarkdown
						remarkPlugins={[remarkGfm, remarkMath]}
						rehypePlugins={[rehypeKatex]}
					>
						{markdown}
					</ReactMarkdown>
				</div>

				{/* Điều hướng bài trước/bài tiếp theo — chỉ hiện khi thực sự có,
				    không quay vòng về bài đầu ở cuối danh sách nữa. */}
				{(prevPost || nextPost) && (
					<div className="mt-16 pt-8 border-t border-zinc-800 grid gap-4 sm:grid-cols-2">
						{prevPost && (
							<Link
								to={`/blog/posts/${prevPost.slug}`}
								className="block p-6 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl transition-all hover:border-cyan-500 group"
							>
								<span className="text-sm text-gray-500">← Bài trước</span>
								<div className="text-xl font-semibold group-hover:text-cyan-400 transition-colors mt-1">
									{prevPost.title}
								</div>
							</Link>
						)}
						{nextPost && (
							<Link
								to={`/blog/posts/${nextPost.slug}`}
								className="block p-6 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl transition-all hover:border-cyan-500 group sm:text-right sm:col-start-2"
							>
								<span className="text-sm text-gray-500">Bài viết tiếp theo →</span>
								<div className="text-xl font-semibold group-hover:text-cyan-400 transition-colors mt-1">
									{nextPost.title}
								</div>
							</Link>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default PostDetails;
