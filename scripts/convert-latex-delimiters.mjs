/**
 * Script: convert-latex-delimiters.mjs
 * Mục đích: Chuyển cú pháp LaTeX kiểu MathJax sang cú pháp KaTeX chuẩn
 * cho toàn bộ file .md trong src/posts:
 *
 *   \( ... \)   ->   $ ... $        (inline math)
 *   \[ ... \]   ->   $$ ... $$      (block/display math)
 *
 * An toàn khi chạy nhiều lần: nếu file không còn \(...\) hay \[...\]
 * thì được bỏ qua, không ghi lại.
 *
 * Cách chạy:
 *   node scripts/convert-latex-delimiters.mjs --dry-run   (xem trước, không ghi file)
 *   node scripts/convert-latex-delimiters.mjs             (áp dụng thật)
 *
 * Khuyến nghị: chạy --dry-run trước, review kỹ log rồi mới chạy thật.
 * Nên commit git trước khi chạy để có thể revert nếu cần.
 */

import fg from "fast-glob";
import fs from "node:fs";

const isDryRun = process.argv.includes("--dry-run");

// Regex cho \( ... \)  -> inline math
// [\s\S] thay vì . để match được cả xuống dòng bên trong công thức (hiếm nhưng có thể xảy ra)
// +? (lazy) để không "nuốt" qua nhiều cặp \( \) liền nhau trong cùng dòng
const INLINE_MATH_REGEX = /\\\(([\s\S]+?)\\\)/g;

// Regex cho \[ ... \] -> block math
const BLOCK_MATH_REGEX = /\\\[([\s\S]+?)\\\]/g;

function convertContent(content) {
	let changedCount = 0;

	// Xử lý block trước ( \[ \] ) để tránh xung đột nếu nội dung có chứa \( \) lồng bên trong
	let result = content.replace(BLOCK_MATH_REGEX, (_match, formula) => {
		changedCount++;
		return `$$${formula.trim()}$$`;
	});

	result = result.replace(INLINE_MATH_REGEX, (_match, formula) => {
		changedCount++;
		return `$${formula.trim()}$`;
	});

	return { result, changedCount };
}

async function run() {
	const files = await fg("src/posts/*.md");

	if (files.length === 0) {
		console.log("Không tìm thấy file .md nào trong src/posts. Kiểm tra lại đường dẫn chạy script (phải chạy ở thư mục gốc project).");
		return;
	}

	let filesChanged = 0;
	let totalFormulasConverted = 0;

	for (const filePath of files) {
		const raw = fs.readFileSync(filePath, "utf-8");
		const { result, changedCount } = convertContent(raw);

		if (changedCount === 0) {
			continue; // Không có gì để đổi trong file này
		}

		filesChanged++;
		totalFormulasConverted += changedCount;

		if (isDryRun) {
			console.log(`[DRY-RUN] ${filePath} — sẽ chuyển ${changedCount} công thức`);
		} else {
			fs.writeFileSync(filePath, result, "utf-8");
			console.log(`Đã cập nhật: ${filePath} — chuyển ${changedCount} công thức`);
		}
	}

	console.log("\n----- Tổng kết -----");
	console.log(`Tổng số file quét: ${files.length}`);
	console.log(`Số file có thay đổi: ${filesChanged}`);
	console.log(`Tổng số công thức đã chuyển: ${totalFormulasConverted}`);

	if (isDryRun) {
		console.log("\n(Đây là chế độ --dry-run, CHƯA có file nào thực sự bị ghi đè.)");
		console.log("Chạy lại không kèm --dry-run để áp dụng thật.");
	} else {
		console.log("\nHoàn tất. Nhớ chạy lại 'node scripts/generate-posts-index.mjs' nếu excerpt trong index có chứa công thức toán.");
	}
}

run();
