/**
 * Script: suggest-tags-excerpt.mjs
 * Mục đích: Dùng Google Gemini API (free tier) để tự động đọc nội dung từng
 * file .md trong src/posts, gợi ý "tags" (mảng string, AI tự do đề xuất theo
 * nội dung) và "excerpt" (tóm tắt ngắn 1-2 câu), rồi ghi lại vào frontmatter.
 *
 * CHỈ xử lý file có tags rỗng ([]) VÀ excerpt rỗng ("") — tức file đã được
 * add-frontmatter.mjs tạo trước đó nhưng chưa gán tay. File nào đã có tags
 * hoặc excerpt (dù chỉ 1 trong 2) sẽ được bỏ qua, không đụng vào.
 *
 * Chuẩn bị:
 *   1. Lấy API key free tại https://aistudio.google.com/apikey
 *   2. pnpm add -D @google/generative-ai dotenv
 *   3. Tạo file .env ở gốc project (đã thêm vào .gitignore):
 *        GEMINI_API_KEY=your-key-here
 *
 * Cách chạy:
 *   node scripts/suggest-tags-excerpt.mjs --dry-run   (xem trước, không ghi file)
 *   node scripts/suggest-tags-excerpt.mjs              (áp dụng thật)
 *
 * Lưu ý free tier Gemini:
 *   - Model gemini-2.0-flash free tier giới hạn khoảng 15 request/phút.
 *   - Script tự động chờ giữa các request (DELAY_MS) để không vượt giới hạn.
 *   - Nếu bị lỗi 429 (rate limit), script tự retry với backoff tăng dần.
 *   - Với 500 file, script sẽ chạy khá lâu (vài chục phút) — đây là đánh đổi
 *     hợp lý để dùng free tier thay vì trả phí.
 */

import "dotenv/config";
import fg from "fast-glob";
import matter from "gray-matter";
import fs from "node:fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const isDryRun = process.argv.includes("--dry-run");

// "dotenv/config" tự đọc file .env ở gốc project và nạp vào process.env,
// nên chỉ cần chạy "node scripts/suggest-tags-excerpt.mjs" là đủ, không cần
// export biến môi trường tay mỗi lần mở terminal mới.
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY && !isDryRun) {
	console.error("Thiếu GEMINI_API_KEY trong file .env. Xem hướng dẫn ở đầu file script.");
	process.exit(1);
}

// gemini-2.0-flash đã bị Google khai tử từ 1/6/2026. Dùng gemini-3.5-flash-lite:
// vẫn nằm trong free tier, rẻ/nhanh, phù hợp cho tác vụ đơn giản như gợi ý tags/excerpt.
// Nếu sau này model này cũng bị deprecate, kiểm tra danh sách free tier hiện hành tại
// https://ai.google.dev/gemini-api/docs/pricing
const MODEL_NAME = "gemini-3.5-flash-lite";
const DELAY_MS = 4500; // ~13 request/phút, chừa dư so với giới hạn free tier 15/phút
const MAX_RETRIES = 3;
const MAX_CONTENT_CHARS = 6000; // Giới hạn độ dài nội dung gửi lên, tránh vượt token free tier

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildPrompt(title, content) {
	return `Bạn là biên tập viên blog tiếng Việt. Đọc nội dung bài viết dưới đây và trả về DUY NHẤT một JSON object (không markdown, không giải thích thêm, không kèm \`\`\`), theo đúng format:

{"tags": ["tag1", "tag2", "tag3"], "excerpt": "một câu tóm tắt ngắn gọn dưới 160 ký tự"}

Yêu cầu:
- "tags": 2 đến 5 từ khóa chủ đề, viết thường, dùng dấu gạch ngang thay khoảng trắng (ví dụ "triet-hoc", "khoa-hoc-du-lieu"), không dấu tiếng Việt trong tag.
- "excerpt": tóm tắt 1 câu bằng tiếng Việt có dấu, hấp dẫn, không lặp lại tiêu đề nguyên văn, dưới 160 ký tự.

Tiêu đề bài viết: "${title}"

Nội dung:
"""
${content.slice(0, MAX_CONTENT_CHARS)}
"""`;
}

function parseAIResponse(text) {
	// Gemini đôi khi vẫn bọc kết quả trong ```json ... ``` dù đã dặn không làm vậy,
	// nên chủ động strip trước khi parse.
	const cleaned = text.replace(/```json|```/g, "").trim();
	const parsed = JSON.parse(cleaned);

	if (!Array.isArray(parsed.tags) || typeof parsed.excerpt !== "string") {
		throw new Error("Response không đúng format mong đợi (thiếu tags[] hoặc excerpt string).");
	}

	return {
		tags: parsed.tags.map((t) => String(t).trim()).filter(Boolean),
		excerpt: parsed.excerpt.trim(),
	};
}

async function suggestForPost(model, title, content) {
	const prompt = buildPrompt(title, content);

	for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
		try {
			const result = await model.generateContent(prompt);
			const text = result.response.text();
			return parseAIResponse(text);
		} catch (err) {
			const isRateLimit = err?.message?.includes("429") || err?.status === 429;
			const isLastAttempt = attempt === MAX_RETRIES;

			if (isLastAttempt) {
				throw err;
			}

			// Backoff tăng dần: 10s, 20s, 30s... ưu tiên xử lý rate limit của free tier
			const backoffMs = isRateLimit ? attempt * 15000 : attempt * 5000;
			console.log(`  Lỗi lần ${attempt} (${err.message?.slice(0, 80)}...), thử lại sau ${backoffMs / 1000}s`);
			await sleep(backoffMs);
		}
	}
}

async function run() {
	const files = await fg("src/posts/*.md");

	if (files.length === 0) {
		console.log("Không tìm thấy file .md nào trong src/posts. Kiểm tra lại đường dẫn chạy script.");
		return;
	}

	const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
	const model = genAI ? genAI.getGenerativeModel({ model: MODEL_NAME }) : null;

	let processed = 0;
	let skipped = 0;
	let failed = 0;

	for (const filePath of files) {
		const raw = fs.readFileSync(filePath, "utf-8");
		const parsed = matter(raw);
		const { data, content } = parsed;

		const hasTags = Array.isArray(data.tags) && data.tags.length > 0;
		const hasExcerpt = typeof data.excerpt === "string" && data.excerpt.trim().length > 0;

		// Chỉ xử lý file CHƯA có tags VÀ CHƯA có excerpt, giữ nguyên file đã gán tay
		if (hasTags || hasExcerpt) {
			skipped++;
			continue;
		}

		if (content.trim().length === 0) {
			console.log(`Bỏ qua ${filePath} — nội dung rỗng, không có gì để phân tích.`);
			skipped++;
			continue;
		}

		console.log(`Đang xử lý: ${filePath}`);

		if (isDryRun) {
			console.log("  [DRY-RUN] Sẽ gọi Gemini API để gợi ý tags/excerpt cho file này.");
			processed++;
			continue;
		}

		try {
			const suggestion = await suggestForPost(model, data.title || filePath, content);

			const newData = {
				...data,
				tags: suggestion.tags,
				excerpt: suggestion.excerpt,
			};

			const newFileContent = matter.stringify(content, newData);
			fs.writeFileSync(filePath, newFileContent, "utf-8");

			console.log(`  Đã cập nhật — tags: [${suggestion.tags.join(", ")}]`);
			console.log(`  excerpt: "${suggestion.excerpt}"`);
			processed++;
		} catch (err) {
			console.error(`  THẤT BẠI: ${filePath} — ${err.message}`);
			failed++;
		}

		// Chờ giữa các request để không vượt giới hạn free tier
		await sleep(DELAY_MS);
	}

	console.log("\n----- Tổng kết -----");
	console.log(`Tổng số file quét: ${files.length}`);
	console.log(`Đã xử lý thành công: ${processed}`);
	console.log(`Bỏ qua (đã có tags/excerpt): ${skipped}`);
	console.log(`Thất bại: ${failed}`);

	if (isDryRun) {
		console.log("\n(Đây là chế độ --dry-run, CHƯA có API call hay ghi file nào thật.)");
	} else if (failed > 0) {
		console.log("\nCó file thất bại — chạy lại script (không --dry-run) để chỉ retry những file còn thiếu tags/excerpt.");
	} else {
		console.log("\nHoàn tất. Chạy lại 'node scripts/generate-posts-index.mjs' để cập nhật posts-index.json với tags/excerpt mới.");
	}
}

run();
