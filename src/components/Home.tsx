import React, { Suspense, useState } from "react";
import ChineseTranslate from "./ChineseTranslate";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import Bio from "./Bio";

// Scene (3D) khá nặng nên vẫn lazy-load riêng, chỉ dùng ở trang chủ.
const Scene = React.lazy(() => import("./Scene"));

const Home: React.FC = () => {
	// Trạng thái kiểm soát việc trượt hiển thị nội dung Bio
	const [showBio, setShowBio] = useState(false);

	useDocumentMeta({
		title: "William Li",
		description: "William Li - Researcher, Engineer",
		lang: "vi",
	});

	return (
		// overflow-hidden để chặn cuộn chuột toàn trang
		<div className="h-screen w-full overflow-hidden bg-black text-white relative">
			{/* Vùng chứa 200vh trượt mượt mà (chứa cả Header và Bio) */}
			<div
				className={`h-[200vh] w-full flex flex-col transition-transform duration-700 ease-in-out ${
					showBio ? "-translate-y-1/2" : "translate-y-0"
				}`}
			>
				{/* ----------------- PHẦN 1: HEADER (100vh) ----------------- */}
				<div className="h-[50%] w-full relative">
					<div className="absolute inset-0 z-0">
						<Suspense fallback={null}>
							<Scene />
						</Suspense>
					</div>

					<header className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pointer-events-none">
						<span className="text-cyan-400 text-xl tracking-widest">
							Hi, Welcome To My Digital Space
						</span>
						<h1 className="text-5xl md:text-6xl font-bold mt-4">
							My name William Li
						</h1>
						<h3 className="text-xl md:text-2xl mt-3 text-gray-300">
							A man interested in the field of Reactor Nuclear Physics ☢
						</h3>
						{/* Nút bấm kích hoạt hiệu ứng trượt xuống */}
						<button
							type="button"
							onClick={() => setShowBio(true)}
							className="pointer-events-auto mt-12 text-cyan-400 hover:text-white text-lg cursor-pointer transition-colors bg-transparent border-none"
						>
							WHO AM I ↓
						</button>

						<div className="absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-auto">
							<ChineseTranslate />
						</div>
					</header>
				</div>

				{/* ----------------- PHẦN 2: BLOG CONTENT (100vh) ----------------- */}
				{/* Vùng này có overflow-y-auto để đọc bio dài, nhưng không thể cuộn lố lên Header */}
				<div className="h-[50%] w-full overflow-y-auto relative z-10 bg-black">
					<main className="py-20 px-6 max-w-4xl mx-auto flex flex-1 flex-col">
						<Bio onPullUp={() => setShowBio(false)} />
					</main>
					<footer>
						<small className="block text-center text-gray-500 pt-8 pb-6 mt-8 border-t border-zinc-900">
							©2026. This website was created by William and AI LLM.
						</small>
					</footer>
				</div>
			</div>
		</div>
	);
};

export default Home;
