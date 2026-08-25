/**
 * Script: add-frontmatter.mjs
 * Mục đích: Quét toàn bộ src/posts/*.md, với file NÀO CHƯA CÓ frontmatter
 * thì tự động chèn thêm title (suy từ tên file) + date (ngày hiện tại).
 *
 * File nào đã có frontmatter (bắt đầu bằng "---") sẽ được bỏ qua, không đụng vào.
 *
 * Cách chạy:
 *   pnpm add gray-matter fast-glob -D
 *   node scripts/add-frontmatter.mjs
 *
 * Chạy thử trước (không ghi file, chỉ xem log) bằng cờ --dry-run:
 *   node scripts/add-frontmatter.mjs --dry-run
 */

import fg from "fast-glob";
import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

const isDryRun = process.argv.includes("--dry-run");

// Chuyển "AI-toan-hoc" -> "Ai Toan Hoc" -> muốn đẹp hơn thì bạn tự sửa tay
// sau khi sinh, script chỉ tạo giá trị TẠM để không có bài nào bị thiếu title.
function slugToTitle(slug) {
	return slug
		.replace(/-/g, " ")
		.split(" ")
		.map((w) => (w.length ? w.charAt(0).toUpperCase() + w.slice(1) : w))
		.join(" ");
}

// Ngày hiện tại dạng YYYY-MM-DD, dùng làm date mặc định.
function todayISO() {
	return new Date().toISOString().slice(0, 10);
}

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
		const slug = path.basename(filePath, ".md");

		// Nếu file đã có frontmatter hợp lệ (data không rỗng) thì bỏ qua.
		const alreadyHasFrontmatter = Object.keys(parsed.data).length > 0;

		if (alreadyHasFrontmatter) {
			skipped++;
			continue;
		}

		const newFrontmatter = {
			title: slugToTitle(slug),
			date: todayISO(),
		};

		// gray-matter.stringify ghép frontmatter mới + nội dung cũ (parsed.content
		// là nội dung markdown SAU khi đã tách phần frontmatter cũ nếu có, hoặc
		// nguyên văn nếu file chưa từng có frontmatter).
		const newFileContent = matter.stringify(parsed.content.trimStart(), newFrontmatter);

		if (isDryRun) {
			console.log(`[DRY-RUN] Sẽ cập nhật: ${filePath}`);
		} else {
			fs.writeFileSync(filePath, newFileContent, "utf-8");
			console.log(`Đã cập nhật: ${filePath}`);
		}

		updated++;
	}

	console.log("\n----- Tổng kết -----");
	console.log(`Tổng số file quét: ${files.length}`);
	console.log(`Đã thêm frontmatter: ${updated}`);
	console.log(`Bỏ qua (đã có frontmatter): ${skipped}`);
	if (isDryRun) {
		console.log("\n(Đây là chế độ --dry-run, CHƯA có file nào thực sự bị ghi đè.)");
		console.log("Chạy lại không kèm --dry-run để áp dụng thật.");
	}
}

run();
