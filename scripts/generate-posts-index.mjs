// scripts/generate-posts-index.mjs
import fg from "fast-glob";
import matter from "gray-matter";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const files = await fg("src/posts/*.md");

function slugToTitle(slug) {
	return slug
		.replace(/-/g, " ")
		.split(" ")
		.map((word) =>
			word.length ? word.charAt(0).toUpperCase() + word.slice(1) : word,
		)
		.join(" ");
}

function normalizeContent(content) {
	return content.replace(/\r\n/g, "\n").trim();
}

function getTrackedPostPaths() {
	try {
		return execFileSync(
			"git",
			["ls-tree", "-r", "--name-only", "HEAD", "--", "src/posts"],
			{ encoding: "utf8" },
		)
			.split(/\r?\n/)
			.filter((filePath) => filePath.endsWith(".md"));
	} catch (error) {
		console.warn(
			"Không thể đọc phiên bản Git trước đó; bỏ qua đồng bộ title khi đổi tên file.",
			error instanceof Error ? error.message : error,
		);
		return [];
	}
}

function getTrackedPostContents() {
	const trackedPosts = new Map();

	for (const filePath of getTrackedPostPaths()) {
		try {
			const raw = execFileSync("git", ["show", `HEAD:${filePath}`], {
				encoding: "utf8",
			});
			const parsed = matter(raw);
			trackedPosts.set(filePath, {
				content: normalizeContent(parsed.content),
				title: parsed.data.title,
			});
		} catch (error) {
			console.warn(
				`Không thể đọc bài viết từ Git: ${filePath}`,
				error instanceof Error ? error.message : error,
			);
		}
	}

	return trackedPosts;
}

function replaceFrontmatterTitle(raw, title) {
	const titleLine = /^title:\s*.*$/m;

	if (!titleLine.test(raw)) {
		return raw;
	}

	const safeTitle = /^[\wÀ-ỹ ]+$/.test(title) ? title : JSON.stringify(title);
	return raw.replace(titleLine, `title: ${safeTitle}`);
}

function syncRenamedPostTitles(postFiles) {
	const trackedPosts = getTrackedPostContents();
	if (trackedPosts.size === 0) return;

	const trackedPaths = new Set(trackedPosts.keys());
	const renamedPosts = new Map();

	for (const filePath of postFiles) {
		if (trackedPaths.has(filePath)) continue;

		const raw = fs.readFileSync(filePath, "utf8");
		const parsed = matter(raw);
		const content = normalizeContent(parsed.content);
		const previousPath = [...trackedPosts.entries()].find(
			([trackedPath, trackedPost]) =>
				!postFiles.includes(trackedPath) &&
				trackedPost.content === content &&
				typeof trackedPost.title === "string" &&
				parsed.data.title === trackedPost.title,
		)?.[0];

		if (!previousPath) continue;

		const newTitle = slugToTitle(path.basename(filePath, ".md"));
		if (parsed.data.title === newTitle) continue;

		const updatedRaw = replaceFrontmatterTitle(raw, newTitle);
		fs.writeFileSync(filePath, updatedRaw, "utf8");
		renamedPosts.set(previousPath, filePath);
	}

	for (const [previousPath, newPath] of renamedPosts) {
		console.log(
			`Đã đồng bộ title sau khi đổi tên: ${previousPath} -> ${newPath}`,
		);
	}
}

syncRenamedPostTitles(files);

const posts = files.map((filePath) => {
	const raw = fs.readFileSync(filePath, "utf-8");
	const { data } = matter(raw);
	const slug = path.basename(filePath, ".md");

	return {
		slug,
		title: data.title || slugToTitle(slug),
		date: data.date || null,
	};
});

posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

fs.writeFileSync(
	"src/posts-index.json",
	JSON.stringify(posts, null, 2),
);

console.log(`Đã sinh index cho ${posts.length} bài viết.`);
