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

function getDateValue(value) {
	if (value instanceof Date) {
		return value.toISOString().slice(0, 10);
	}

	return typeof value === "string" ? value : null;
}

function replaceFrontmatterUpdatedAt(raw, date) {
	const frontmatter = raw.match(/^(---\r?\n)([\s\S]*?)(\r?\n---(?:\r?\n|$))/);
	if (!frontmatter) return raw;

	const newline = raw.includes("\r\n") ? "\r\n" : "\n";
	const updatedAtLine = /^updated_at:\s*.*$/m;
	const content = updatedAtLine.test(frontmatter[2])
		? frontmatter[2].replace(updatedAtLine, `updated_at: '${date}'`)
		: `${frontmatter[2]}${newline}updated_at: '${date}'`;

	return raw.replace(
		frontmatter[0],
		`${frontmatter[1]}${content}${frontmatter[3]}`,
	);
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

function syncRenamedPostTitles(postFiles, trackedPosts) {
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

function syncUpdatedAt(postFiles, trackedPosts) {
	const today = new Date().toISOString().slice(0, 10);

	for (const filePath of postFiles) {
		const trackedPost = trackedPosts.get(filePath);
		if (!trackedPost) continue;

		const raw = fs.readFileSync(filePath, "utf8");
		const parsed = matter(raw);
		if (normalizeContent(parsed.content) === trackedPost.content) continue;

		const updatedAt = getDateValue(parsed.data.updated_at);
		const modifiedAt = fs.statSync(filePath).mtime.toISOString().slice(0, 10);
		if (updatedAt && updatedAt >= modifiedAt) continue;

		const updatedRaw = replaceFrontmatterUpdatedAt(raw, today);
		if (updatedRaw === raw) {
			console.warn(`Không thể cập nhật updated_at vì thiếu frontmatter: ${filePath}`);
			continue;
		}

		fs.writeFileSync(filePath, updatedRaw, "utf8");
		console.log(`Đã cập nhật updated_at: ${filePath} -> ${today}`);
	}
}

const isIndexOnly = process.argv.includes("--index-only");
const trackedPosts = isIndexOnly ? new Map() : getTrackedPostContents();

if (!isIndexOnly) {
	syncRenamedPostTitles(files, trackedPosts);
	syncUpdatedAt(files, trackedPosts);
}

const posts = files.map((filePath) => {
	const raw = fs.readFileSync(filePath, "utf-8");
	const { data } = matter(raw);
	const slug = path.basename(filePath, ".md");

	return {
		slug,
		title: data.title || slugToTitle(slug),
		created_at: getDateValue(data.created_at),
		updated_at: getDateValue(data.updated_at),
	};
});

posts.sort((a, b) =>
	(b.updated_at || b.created_at || "").localeCompare(
		a.updated_at || a.created_at || "",
	),
);

fs.writeFileSync(
	"src/posts-index.json",
	JSON.stringify(posts, null, 2),
);

console.log(`Đã sinh index cho ${posts.length} bài viết.`);
