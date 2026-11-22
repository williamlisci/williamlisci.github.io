import type React from "react";
import { Link } from "react-router-dom";

interface BioProps {
	onPullUp: () => void;
}

// Tách khỏi App.tsx: các mục Short Bio / Technical Skills / Contact / Quotes
// hiển thị khi người dùng bấm "WHO AM I ↓". Trạng thái trượt (showBio) vẫn
// do Home quản lý — Bio chỉ gọi lại onPullUp khi người dùng bấm "Pull Up ↑".
const Bio: React.FC<BioProps> = ({ onPullUp }) => {
	return (
		<>
			<section className="mb-16">
				<h3 className="text-2xl font-semibold mb-6">Short Bio</h3>
				<ul className="space-y-3 text-gray-300">
					<li>Who Am I: William Li (Vietnamese: Lê Thanh Nghĩa)</li>
					<li>
						Born: May 14, 1997, Ngô Gia Tự Street,{" "}
						<a
							href="https://vi.wikipedia.org/wiki/B%C3%ACnh_%C4%90%E1%BB%8Bnh_(ph%C6%B0%E1%BB%9Dng)"
							target="_blank"
							rel="noopener noreferrer"
							className="text-cyan-400 hover:underline"
						>
							Bình Định Ward
						</a>
						,{" "}
						<a
							href="https://vi.wikipedia.org/wiki/Gia_Lai"
							target="_blank"
							rel="noopener noreferrer"
							className="text-cyan-400 hover:underline"
						>
							Gia Lai Province
						</a>
						,{" "}
						<a
							href="https://en.wikipedia.org/wiki/Vietnam"
							target="_blank"
							rel="noopener noreferrer"
							className="text-cyan-400 hover:underline"
						>
							Việt Nam
						</a>
					</li>
					<li>
						Nationality:{" "}
						<a
							href="https://en.wikipedia.org/wiki/Vietnamese_people"
							target="_blank"
							rel="noopener noreferrer"
							className="text-cyan-400 hover:underline"
						>
							Vietnamese
						</a>
					</li>
				</ul>
			</section>

			<section className="mb-16">
				<h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
				<ul className="space-y-3 text-gray-300">
					<li>
						Human language:{" "}
						<mark className="bg-cyan-900 text-cyan-300 px-1">Vietnamese</mark>,{" "}
						<mark className="bg-cyan-900 text-cyan-300 px-1">English</mark>
					</li>
					<li>
						Programming language:{" "}
						<mark className="bg-cyan-900 text-cyan-300 px-1">Python</mark>,{" "}
						<mark className="bg-cyan-900 text-cyan-300 px-1">C++</mark>,{" "}
						<mark className="bg-cyan-900 text-cyan-300 px-1">Fortran</mark>,{" "}
						<mark className="bg-cyan-900 text-cyan-300 px-1">Julia</mark>
					</li>
					<li>
						Documents:{" "}
						<mark className="bg-cyan-900 text-cyan-300 px-1">
							https://github.com/williamlisci/awesome-nuclear
						</mark>
					</li>
				</ul>
			</section>

			<section className="mb-16">
				<h3 className="text-2xl font-semibold mb-6">Contact</h3>
				<ul className="space-y-3 text-gray-300">
					<li>
						Links: Reach out to me at X@Y, where X=williamli.sci and
						Y=gmail.com.
					</li>
					<li>
						<Link to="/blog" className="text-cyan-400 hover:underline">
							My Blog
						</Link>
					</li>
				</ul>
			</section>

			<section>
				<h3 className="text-2xl font-semibold mb-6">
					Blessed are those who have not seen and yet believe
				</h3>
				<ul className="space-y-3 text-gray-300">
					<li>
						<a
							href="https://www.youtube.com/watch?v=anWRa7TiXvw"
							target="_blank"
							rel="noopener noreferrer"
							className="text-cyan-400 hover:underline"
						>
							Tìm trật tự trong sự hỗn loạn?
						</a>
					</li>
					<li>
						<a
							href="https://youtu.be/2gL0LE6xiyo?si=pw4sJ0p1SPExkWOz"
							target="_blank"
							rel="noopener noreferrer"
							className="text-cyan-400 hover:underline"
						>
							Tìm biên giới của vũ trụ?
						</a>
					</li>
				</ul>
			</section>

			{/* Nút bấm kích hoạt hiệu ứng trượt lên, thoát khỏi Bio */}
			<button
				type="button"
				onClick={onPullUp}
				className="block mt-14 mb-1 text-center text-cyan-400 hover:text-white cursor-pointer transition-colors text-lg bg-transparent border-none"
			>
				Pull Up ↑
			</button>
		</>
	);
};

export default Bio;
