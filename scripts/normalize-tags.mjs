/**
 * Script: normalize-tags.mjs
 * Mục đích: Chuẩn hoá tag trên toàn bộ file .md trong src/posts để tránh tình
 * trạng tag trùng ý nhưng khác chuỗi ký tự, ví dụ:
 *   "triết-học", "Triet-Hoc", "triet_hoc", "triết học"  ->  đều gộp về "triet-hoc"
 *
 * Gồm 2 bước:
 *   1. CHUẨN HOÁ TỰ ĐỘNG (an toàn, không cần review):
 *      - Bỏ dấu tiếng Việt (triết-học -> triet-hoc)
 *      - Viết thường toàn bộ
 *      - Đổi khoảng trắng / gạch dưới thành gạch ngang
 *      - Xoá ký tự thừa, gạch ngang lặp
 *
 *   2. GỘP TAG GẦN GIỐNG NHAU (cần review tay):
 *      Sau bước 1, một số tag tuy đã chuẩn hoá nhưng vẫn có thể là 2 cách viết
 *      khác nhau của cùng 1 ý (ví dụ "ai" vs "tri-tue-nhan-tao", hoặc lỗi số ít/
 *      số nhiều do AI tự đặt). Script sẽ liệt kê các CẶP tag có độ tương đồng
 *      cao (dựa trên Levenshtein distance) để bạn tự quyết định gộp hay không —
 *      KHÔNG tự động gộp bước này vì dễ gộp nhầm 2 tag có ý nghĩa khác nhau.
 *
 * Cách chạy:
 *   node scripts/normalize-tags.mjs --dry-run   (chỉ xem báo cáo, không ghi file)
 *   node scripts/normalize-tags.mjs              (áp dụng chuẩn hoá bước 1 thật sự)
 *
 * Sau khi chạy bước 1, đọc phần "GỢI Ý GỘP TAG" ở cuối log để tự quyết định có
 * cần sửa tay thêm bằng --merge (xem hướng dẫn cuối file) hay không.
 */

import fg from "fast-glob";
import matter from "gray-matter";
import fs from "node:fs";

const isDryRun = process.argv.includes("--dry-run");

// Cờ --merge="tag-cu=tag-moi,tag-cu-2=tag-moi-2" để gộp thủ công các cặp tag
// bạn đã tự xác nhận là trùng ý sau khi đọc báo cáo GỢI Ý GỘP TAG.
const mergeArg = process.argv.find((arg) => arg.startsWith("--merge="));
const manualMergeMap = new Map();
if (mergeArg) {
	const pairs = mergeArg.replace("--merge=", "").split(",");
	for (const pair of pairs) {
		const [from, to] = pair.split("=").map((s) => s.trim());
		if (from && to) {
			manualMergeMap.set(from, to);
		}
	}
}

// Bảng bỏ dấu tiếng Việt — cover đủ các tổ hợp nguyên âm + dấu thanh thường gặp
const VIETNAMESE_MAP = {
	"à": "a", "á": "a", "ạ": "a", "ả": "a", "ã": "a",
	"â": "a", "ầ": "a", "ấ": "a", "ậ": "a", "ẩ": "a", "ẫ": "a",
	"ă": "a", "ằ": "a", "ắ": "a", "ặ": "a", "ẳ": "a", "ẵ": "a",
	"è": "e", "é": "e", "ẹ": "e", "ẻ": "e", "ẽ": "e",
	"ê": "e", "ề": "e", "ế": "e", "ệ": "e", "ể": "e", "ễ": "e",
	"ì": "i", "í": "i", "ị": "i", "ỉ": "i", "ĩ": "i",
	"ò": "o", "ó": "o", "ọ": "o", "ỏ": "o", "õ": "o",
	"ô": "o", "ồ": "o", "ố": "o", "ộ": "o", "ổ": "o", "ỗ": "o",
	"ơ": "o", "ờ": "o", "ớ": "o", "ợ": "o", "ở": "o", "ỡ": "o",
	"ù": "u", "ú": "u", "ụ": "u", "ủ": "u", "ũ": "u",
	"ư": "u", "ừ": "u", "ứ": "u", "ự": "u", "ử": "u", "ữ": "u",
	"ỳ": "y", "ý": "y", "ỵ": "y", "ỷ": "y", "ỹ": "y",
	"đ": "d",
};

function removeVietnameseDiacritics(str) {
	return str
		.split("")
		.map((char) => VIETNAMESE_MAP[char.toLowerCase()] ?? char)
		.join("");
}

// Chuẩn hoá 1 tag: bỏ dấu, viết thường, thay khoảng trắng/gạch dưới bằng gạch
// ngang, xoá ký tự không phải chữ-số-gạch ngang, gộp nhiều gạch ngang liên tiếp.
function normalizeTag(rawTag) {
	let tag = rawTag.trim().toLowerCase();
	tag = removeVietnameseDiacritics(tag);
	tag = tag.replace(/[\s_]+/g, "-");
	tag = tag.replace(/[^a-z0-9-]/g, "");
	tag = tag.replace(/-+/g, "-");
	tag = tag.replace(/^-|-$/g, "");
	return tag;
}

// Levenshtein distance đơn giản, dùng để phát hiện cặp tag GẦN GIỐNG (gợi ý
// cho người dùng tự xem xét, không tự động gộp).
function levenshtein(a, b) {
	const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
		Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
	);

	for (let i = 1; i <= a.length; i++) {
		for (let j = 1; j <= b.length; j++) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			matrix[i][j] = Math.min(
				matrix[i - 1][j] + 1,
				matrix[i][j - 1] + 1,
				matrix[i - 1][j - 1] + cost,
			);
		}
	}

	return matrix[a.length][b.length];
}

async function run() {
	const files = await fg("src/posts/*.md");

	if (files.length === 0) {
		console.log("Không tìm thấy file .md nào trong src/posts.");
		return;
	}

	let filesChanged = 0;
	const tagFrequency = new Map(); // tag đã chuẩn hoá -> số bài dùng

	for (const filePath of files) {
		const raw = fs.readFileSync(filePath, "utf-8");
		const parsed = matter(raw);
		const { data, content } = parsed;

		if (!Array.isArray(data.tags) || data.tags.length === 0) {
			continue;
		}

		const normalizedTags = Array.from(
			new Set(
				data.tags
					.map((t) => {
						const normalized = normalizeTag(t);
						// Áp dụng gộp thủ công nếu người dùng có truyền --merge
						return manualMergeMap.get(normalized) ?? normalized;
					})
					.filter(Boolean),
			),
		).sort();

		for (const tag of normalizedTags) {
			tagFrequency.set(tag, (tagFrequency.get(tag) ?? 0) + 1);
		}

		const isChanged = JSON.stringify(normalizedTags) !== JSON.stringify(data.tags);

		if (!isChanged) {
			continue;
		}

		filesChanged++;

		if (isDryRun) {
			console.log(`[DRY-RUN] ${filePath}`);
			console.log(`  cũ: [${data.tags.join(", ")}]`);
			console.log(`  mới: [${normalizedTags.join(", ")}]`);
		} else {
			const newData = { ...data, tags: normalizedTags };
			fs.writeFileSync(filePath, matter.stringify(content, newData), "utf-8");
			console.log(`Đã cập nhật: ${filePath} — [${normalizedTags.join(", ")}]`);
		}
	}

	console.log("\n----- Tổng kết chuẩn hoá -----");
	console.log(`Tổng số file quét: ${files.length}`);
	console.log(`Số file có tag bị đổi: ${filesChanged}`);
	console.log(`Tổng số tag duy nhất sau chuẩn hoá: ${tagFrequency.size}`);

	// Bước 2: gợi ý các cặp tag GẦN GIỐNG NHAU để người dùng tự quyết định gộp
	const allTags = Array.from(tagFrequency.keys());
	const suggestions = [];
	const DISTANCE_THRESHOLD = 2; // khác nhau tối đa 2 ký tự thì coi là "gần giống"

	for (let i = 0; i < allTags.length; i++) {
		for (let j = i + 1; j < allTags.length; j++) {
			const a = allTags[i];
			const b = allTags[j];
			// Bỏ qua cặp quá ngắn để tránh false positive (vd "ai" vs "ba" cách nhau 2 ký tự nhưng vô nghĩa)
			if (a.length < 4 || b.length < 4) continue;

			const dist = levenshtein(a, b);
			if (dist > 0 && dist <= DISTANCE_THRESHOLD) {
				suggestions.push({ a, b, dist, countA: tagFrequency.get(a), countB: tagFrequency.get(b) });
			}
		}
	}

	if (suggestions.length > 0) {
		console.log("\n----- GỢI Ý GỘP TAG (cần bạn tự xác nhận, KHÔNG tự động gộp) -----");
		suggestions
			.sort((x, y) => x.dist - y.dist)
			.forEach(({ a, b, dist, countA, countB }) => {
				console.log(`  "${a}" (${countA} bài)  <->  "${b}" (${countB} bài)   [khác ${dist} ký tự]`);
			});

		console.log("\nNếu xác nhận 1 cặp nào đó thực sự trùng ý, chạy lại với cờ --merge:");
		console.log('  node scripts/normalize-tags.mjs --merge="tag-cu=tag-giu-lai"');
		console.log("Có thể gộp nhiều cặp cùng lúc, phân tách bằng dấu phẩy:");
		console.log('  node scripts/normalize-tags.mjs --merge="tag-cu-1=tag-moi-1,tag-cu-2=tag-moi-2"');
	} else {
		console.log("\nKhông tìm thấy cặp tag nào gần giống nhau đáng nghi ngờ.");
	}

	if (isDryRun) {
		console.log("\n(Đây là chế độ --dry-run, CHƯA có file nào thực sự bị ghi đè.)");
	} else if (filesChanged > 0) {
		console.log("\nHoàn tất. Chạy lại 'node scripts/generate-posts-index.mjs' để cập nhật posts-index.json.");
	}
}

run();
