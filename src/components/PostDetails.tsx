// src/components/PostDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from '../assets/css/Post.module.css';

// Sửa cú pháp: Sử dụng `as: 'raw'` để lấy nội dung file Markdown dưới dạng chuỗi
const postFiles: Record<string, string> = import.meta.glob('/src/posts/*.md', { eager: true, query: 'raw', import: 'default' });

const PostDetails: React.FC = () => {
    // useParams sẽ tự suy luận kiểu dữ liệu, không cần `<{ slug: string }>`
    const { slug } = useParams();
    const [markdown, setMarkdown] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!slug) {
            setMarkdown('Bài viết không tồn tại.');
            setLoading(false);
            return;
        }

        const filePath = `/src/posts/${slug}.md`;

        // Truy cập nội dung file trực tiếp, không gọi hàm `.then()`
        const fileContent = postFiles[filePath];

        if (fileContent) {
            setMarkdown(fileContent);
            setLoading(false);
        } else {
            setMarkdown('Bài viết không tồn tại.');
            setLoading(false);
        }
    }, [slug]);

    if (loading) {
        return <div>Đang tải...</div>;
    }

    return (
        <div className={styles.postDetails}>
            <h1>{slug ? slug.replace(/-/g, ' ').toUpperCase() : 'Không có tiêu đề'}</h1>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
            </ReactMarkdown>
        </div>
    );
};

export default PostDetails;
