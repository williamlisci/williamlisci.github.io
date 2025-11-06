// src/components/PostList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/css/Post.module.css';

// Định nghĩa kiểu dữ liệu cho một bài viết
interface Post {
    slug: string;
    title: string;
}

const postFiles: Record<string, string> = import.meta.glob('/src/posts/*.md', { eager: true, query:'?raw', import:'default' });

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [lastUpdated, setLastUpdated] = useState<string>('');

    useEffect(() => {
        const loadedPosts: Post[] = Object.keys(postFiles).map(key => {
            const slug = key.split('/').pop()?.replace('.md', '') || '';
            const title = slug.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            return {
                slug,
                title,
            };
        });
        setPosts(loadedPosts);
        setLastUpdated(new Date().toISOString().split('T')[0]);
    }, []);

    // Lọc bài viết dựa trên từ khóa tìm kiếm
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPosts = posts.length;

    return (
        <div className={styles.postList}>
            <header className={styles.introText}>
                <p>Tôi là William. Đây là nơi chia sẻ kiến thức và cuộc sống cá nhân của tôi. Nếu có bất kỳ vấn đề nào, xin vui lòng trao đổi riêng qua gmail. Tôi đã viết tổng cộng {totalPosts} bài viết cho đến nay. Cập nhật lần cuối: {lastUpdated}.</p>
                {/* Thêm input và button tìm kiếm ở đây */}
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm nhanh..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />

                </div>
            </header>
            <ul className={styles.postListItems}>
                {filteredPosts.map(post => (
                    <li key={post.slug}>
                        <Link to={`/blog/posts/${post.slug}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
