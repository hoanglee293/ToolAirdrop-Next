export type Author = {
    name: string;
    image: string;
    bio?: string;
    _id?: number | string;
    _ref?: number | string;
};

export type NewsItem = {
    id: string | number;
    _id?: string;
    title: string;
    excerpt?: string;
    image?: string;
    date: string;
    authorObj?: Author;
    author?: string;
    category?: string;
    tags?: string[];
    isTrending?: boolean;
    readTime?: string;
    views?: number;
    authorName?: string;
};

export type Category = {
    id: string | number;
    name: string;
    slug: string;
    type?: string;
};

export type Tag = {
    id: string | number;
    name: string;
    slug: string;
    count?: number;
};

export type NewsQuery = {
    limit?: number;
    page?: number;
    sort?: "latest" | "popular" | "oldest";
    search?: string;
    category?: string;
    timeRange?: "today" | "week" | "month" | "all";
    tag?: string;
    isTrending?: boolean;
};

export type CategoryQuery = {
    type?: string;
};

export type NewsDetail = {
    _id: string;
    title: string;
    excerpt?: string;
    content: string;
    image?: string;
    author: string;
    authorImage?: string;
    category?: string;
    tags?: string[];
    isTrending?: boolean;
    views?: number;
    readTime?: string;
    status?: string;
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    date?: string;
};
