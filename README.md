- Deploy to GitHub Pages: pnpm run deploy

## Ghim bài đăng nổi bật

Danh sách bài đăng nổi bật được cấu hình trong `src/featured-posts.ts`.
Thay các slug trong `FEATURED_POST_SLUGS` bằng slug của bài viết muốn ghim.
Danh sách hiển thị tối đa 5 bài và nằm ngay bên dưới thanh tìm kiếm trên trang
`/blog`.

- Thứ tự chạy khuyến nghị cho toàn bộ pipeline
  1. node scripts/add-frontmatter.mjs           # thêm frontmatter cho file chưa có
  2. node scripts/convert-latex-delimiters.mjs        # chuẩn hóa ký hiệu toán học theo latex
  3. node scripts/generate-posts-index.mjs      # sinh lại posts-index.json cuối cùng
