import type React from "react";
interface FeaturedPost {
    slug: string;
    title: string;
    created_at: string | null;
    updated_at: string | null;
}
interface FeaturedPostsProps {
    posts: FeaturedPost[];
}
declare const FeaturedPosts: React.FC<FeaturedPostsProps>;
export default FeaturedPosts;
