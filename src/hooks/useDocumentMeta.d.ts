interface DocumentMetaOptions {
    title: string;
    description?: string;
    lang?: string;
}
/**
 * Cập nhật document.title, <meta name="description">, các thẻ Open Graph
 * (og:title/og:description) và document.documentElement.lang theo từng
 * trang. Khôi phục lại title & lang cũ khi component unmount, tránh "rò rỉ"
 * title của trang trước sang trang kế tiếp.
 *
 * LƯU Ý QUAN TRỌNG: đây là cập nhật client-side (chạy sau khi JS tải xong),
 * nên chỉ chắc chắn đúng với tab trình duyệt, bookmark, và crawler có chạy
 * JS (Googlebot thường render JS). Trình quét preview mạng xã hội
 * (Facebook, Twitter/X, Zalo...) thường KHÔNG chạy JS, nên card chia sẻ vẫn
 * có thể lấy meta gốc trong index.html thay vì meta của bài viết cụ thể.
 * Muốn khắc phục triệt để phần preview MXH cần prerender/SSR cho từng
 * route — việc đó nằm ngoài phạm vi thay đổi thuần client-side này.
 */
export declare function useDocumentMeta({ title, description, lang }: DocumentMetaOptions): void;
export {};
