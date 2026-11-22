# Technical Blog

Trang blog cá nhân xây bằng React, TypeScript và Vite. Bài viết được lưu dưới dạng Markdown trong `src/posts`; chỉ mục bài viết được tạo tự động khi chạy build.

## Chạy và kiểm tra trên máy

Cần cài Node.js 22 và pnpm 12.21.0.

```bash
pnpm install
pnpm run dev
```

Trước khi đẩy code, chạy đầy đủ kiểm tra và build:

```bash
pnpm run check
```

Lệnh này chạy lần lượt `tsc --noEmit`, Oxlint và Vite build. Có thể chạy riêng `pnpm run typecheck`, `pnpm run lint` hoặc `pnpm run build`.

## Đẩy code lên Git và deploy

Commit và push lên nhánh `main`:

```bash
git add .
git commit -m "Mô tả thay đổi"
git push origin main
```

Mỗi lần có commit mới trên `main`, GitHub Actions tự cài dependencies với cache pnpm, kiểm tra TypeScript, chạy Oxlint, build trang và deploy thư mục `dist` lên GitHub Pages. Có thể theo dõi tiến trình trong tab **Actions** của repository.

Để bật Pages lần đầu, mở **Settings → Pages** và chọn **GitHub Actions** trong mục **Build and deployment → Source**. Sau khi workflow hoàn tất, website được cập nhật tại [williamlisci.github.io](https://williamlisci.github.io/).
