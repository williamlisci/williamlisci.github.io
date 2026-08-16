// scripts/generate-posts-index.mjs
import fg from "fast-glob";
import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

const files = await fg("src/posts/*.md");

const posts = files.map((filePath) => {
	const raw = fs.readFileSync(filePath, "utf-8");
	const { data } = matter(raw);
	const slug = path.basename(filePath, ".md");

	return {
		slug,
		title: data.title || slug.replace(/-/g, " "),
		date: data.date || null,
		tags: data.tags || [],
		excerpt: data.excerpt || "",
	};
});

posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

fs.writeFileSync(
	"src/posts-index.json",
	JSON.stringify(posts, null, 2),
);

console.log(`Đã sinh index cho ${posts.length} bài viết.`);
