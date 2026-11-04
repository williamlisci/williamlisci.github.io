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

function getTrackedPostContents() {
	const trackedPosts = new Map();

	try {
		const entries = execFileSync(
			"git",
			["ls-tree", "-r", "-z", "HEAD", "--", "src/posts"],
			{ encoding: "utf8" },
		)
			.split("\0")
			.filter(Boolean)
			.map((entry) => {
				const separator = entry.indexOf("\t");
				const [objectId] = entry.slice(0, separator).split(" ").slice(-1);
				return { objectId, filePath: entry.slice(separator + 1) };
			})
			.filter(({ filePath }) => filePath.endsWith(".md"));

		if (entries.length === 0) return trackedPosts;

		const pathsByObjectId = new Map();
		for (const { objectId, filePath } of entries) {
			const paths = pathsByObjectId.get(objectId) ?? [];
			paths.push(filePath);
			pathsByObjectId.set(objectId, paths);
		}

		const output = execFileSync(
			"git",
			["cat-file", "--batch"],
			{
				input: `${entries.map(({ objectId }) => objectId).join("\n")}\n`,
				maxBuffer: 128 * 1024 * 1024,
			},
		);
		let offset = 0;

		while (offset < output.length) {
			const headerEnd = output.indexOf(10, offset);
			if (headerEnd === -1) throw new Error("Phản hồi git cat-file không hợp lệ.");

			const [objectId, type, sizeText] = output
				.subarray(offset, headerEnd)
				.toString("utf8")
				.split(" ");
			const size = Number(sizeText);
			if (type !== "blob" || !Number.isSafeInteger(size) || size < 0) {
				throw new Error("Phản hồi git cat-file không hợp lệ.");
			}

			const contentStart = headerEnd + 1;
			const contentEnd = contentStart + size;
			if (output[contentEnd] !== 10) {
				throw new Error("Nội dung bài viết từ git cat-file không đầy đủ.");
			}

			const raw = output.subarray(contentStart, contentEnd).toString("utf8");
			const parsed = matter(raw);
			for (const filePath of pathsByObjectId.get(objectId) ?? []) {
				trackedPosts.set(filePath, {
					content: normalizeContent(parsed.content),
					title: parsed.data.title,
				});
			}

			offset = contentEnd + 1;
		}
	} catch (error) {
		console.warn(
			"Không thể đọc phiên bản Git trước đó; bỏ qua đồng bộ title và updated_at.",
			error instanceof Error ? error.message : error,
		);
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
