- Deploy to GitHub Pages: pnpm run deploy

- Thứ tự chạy khuyến nghị cho toàn bộ pipeline
  1. node scripts/add-frontmatter.mjs           # thêm frontmatter cho file chưa có
  2. node scripts/convert-latex-delimiters.mjs        # chuẩn hóa ký hiệu toán học theo latex
  3. node scripts/generate-posts-index.mjs      # sinh lại posts-index.json cuối cùng
