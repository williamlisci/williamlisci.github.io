- Deploy to GitHub Pages: pnpm run deploy

- Thứ tự chạy khuyến nghị cho toàn bộ pipeline
  1. node scripts/add-frontmatter.mjs           # 1. thêm frontmatter cho file chưa có
  2. node scripts/suggest-tags-excerpt.mjs      # 2. AI gợi ý tags/excerpt (model đã fix)
  3. node scripts/normalize-tags.mjs            # 3. chuẩn hoá tag
  4. node scripts/normalize-tags.mjs --merge="..." # 4. (nếu cần) gộp tag gần giống
  5. node scripts/convert-latex-delimiters.mjs        # 5. chuẩn hóa ký hiệu toán học theo latex
  6. node scripts/generate-posts-index.mjs      # 6. sinh lại posts-index.json cuối cùng
