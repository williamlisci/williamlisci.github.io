/**
 * Script: remove-frontmatter.mjs
 * Mục đích: Quét toàn bộ src/posts/*.md, với file NÀO CÓ frontmatter
 * thì tự động bóc tách và xóa bỏ phần frontmatter (giữ lại nguyên văn phần content).
 *
 * File nào không có frontmatter sẽ được bỏ qua, không đụng vào.
 *
 * Cách chạy:
 *   pnpm add gray-matter fast-glob -D
 *   node scripts/remove-frontmatter.mjs
 *
 * Chạy thử trước (không ghi file, chỉ xem log) bằng cờ --dry-run:
 *   node scripts/remove-frontmatter.mjs --dry-run
 */

import fg from "fast-glob";
import matter from "gray-matter";
import fs from "node:fs";

const isDryRun = process.argv.includes("--dry-run");

async function run() {
	const files = await fg("src/posts/*.md");

	if (files.length === 0) {
		console.log("Không tìm thấy file .md nào trong src/posts. Kiểm tra lại đường dẫn chạy script (phải chạy ở thư mục gốc project).");
		return;
	}

	let updated = 0;
	let skipped = 0;

	for (const filePath of files) {
		const raw = fs.readFileSync(filePath, "utf-8");
		const parsed = matter(raw);

		// Kiểm tra nếu file có chứa dữ liệu frontmatter
		const hasFrontmatter = Object.keys(parsed.data).length > 0;

		if (!hasFrontmatter) {
			skipped++;
			continue;
		}

		// Lấy phần nội dung Markdown thuần túy (loại bỏ frontmatter)
		const cleanContent = parsed.content.trimStart();

		if (isDryRun) {
			console.log(`[DRY-RUN] Sẽ xóa frontmatter khỏi: ${filePath}`);
		} else {
			fs.writeFileSync(filePath, cleanContent, "utf-8");
			console.log(`Đã xóa frontmatter: ${filePath}`);
		}

		updated++;
	}

	console.log("\n----- Tổng kết -----");
	console.log(`Tổng số file quét: ${files.length}`);
	console.log(`Đã xóa frontmatter: ${updated}`);
	console.log(`Bỏ qua (không có frontmatter): ${skipped}`);
	if (isDryRun) {
		console.log("\n(Đây là chế độ --dry-run, CHƯA có file nào thực sự bị ghi đè.)");
		console.log("Chạy lại không kèm --dry-run để áp dụng thật.");
	}
}

run();