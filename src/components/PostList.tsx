import type React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Post {
	slug: string;
	title: string;
}

// Không cần đọc nội dung file ở đây — chỉ cần tên file (key) để suy ra slug/title.
// Bỏ "eager: true" và "query: raw" giúp Vite KHÔNG import nội dung của toàn bộ file .md
// ngay khi trang danh sách được tải, tránh làm chậm trang chính.
const postFiles = import.meta.glob("/src/posts/*.md");

const PostList: React.FC = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const POSTS_PER_PAGE = 20;

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

	const totalPages = Math.max(
		1,
		Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
	);
	const safePage = Math.min(currentPage, totalPages);
	const startIndex = (safePage - 1) * POSTS_PER_PAGE;
	const paginatedPosts = filteredPosts.slice(
		startIndex,
		startIndex + POSTS_PER_PAGE,
	);

	const goToPage = (page: number) => {
		const clamped = Math.min(Math.max(page, 1), totalPages);
		setCurrentPage(clamped);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="min-h-screen bg-black text-white py-12 px-6">
			<div className="max-w-3xl mx-auto">
				{/* Thêm max-w-none để loại bỏ giới hạn chiều rộng mặc định của prose */}
				<div className="prose prose-invert max-w-none mb-12">
					{/* Thêm text-justify để chữ căn đều hai bên lề trái/phải khít với ô tìm kiếm */}
					<p className="text-lg text-gray-300 text-justify leading-relaxed">
						- Xin chào, tôi là Nghĩa. `Nghĩa` trong trọng tình, trọng nghĩa :)
						<br />- Đây là không gian kỹ thuật số nơi tôi lưu giữ và chia sẻ
            những thông tin quan trọng mà tôi quan tâm và đốn ngộ được.
						<br />- Thành ngữ tiếng Việt có câu :"Chân cứng đá mềm", hàm ý không khó khăn nào có thể chống lại 1 ý chí mạnh mẽ và bền bỉ. chúc cho sự nghiệp của bạn luôn thăng tiến, "chân cứng đá mềm", may mắn và thành công.
						<br />- Tổng số bài đăng: {posts.length} bài. Cập nhật lần cuối: 2026.
					</p>
				</div>

				<div className="mb-8">
					<input
						type="text"
						placeholder="nhập để tìm kiếm nhanh"
						value={searchQuery}
						onChange={(e) => {
							setSearchQuery(e.target.value);
							// Quay về trang 1 ngay khi từ khóa tìm kiếm thay đổi, tránh
							// người dùng bị "kẹt" ở một trang không còn kết quả nào
							setCurrentPage(1);
						}}
						className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-cyan-500 transition-colors"
					/>
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
							</Link>
						</li>
					))}
				</ul>

				{totalPages > 1 && (
					<div className="flex items-center justify-center gap-2 mt-10">
						<button
							type="button"
							onClick={() => goToPage(safePage - 1)}
							disabled={safePage === 1}
							className="px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
						>
							←
						</button>

						<span className="text-gray-400 px-2">
							Trang {safePage} / {totalPages}
						</span>

						<button
							type="button"
							onClick={() => goToPage(safePage + 1)}
							disabled={safePage === totalPages}
							className="px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
