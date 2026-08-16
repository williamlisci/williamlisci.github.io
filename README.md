- Deploy to GitHub Pages: pnpm run deploy
- script tự động thêm frontmatter mặc định (title suy từ tên file, date = ngày hiện tại) add-frontmatter.mjs
  1. chạy thử : node scripts/add-frontmatter.mjs --dry-run
  2. chạy thật: node scripts/add-frontmatter.mjs
- sinh posts-index.json từ frontmatter vừa thêm: node scripts/generate-posts-index.mjs
