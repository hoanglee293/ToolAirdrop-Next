import { NewsQuery, NewsItem, Tag } from "@/types/news";
import axiosClient from "@/app/utils/axiosClient";

class NewsService {
    async getAll(query: NewsQuery = {}): Promise<NewsItem[]> {
        const params = new URLSearchParams();

        if (query.limit) params.append("limit", query.limit.toString());
        if (query.page) params.append("page", query.page.toString());
        if (query.sort) params.append("sort", query.sort);
        if (query.search) params.append("search", query.search);
        if (query.category) params.append("category", query.category);
        if (query.timeRange) params.append("timeRange", query.timeRange);
        if (query.tag) params.append("tag", query.tag);
        if (query.isTrending) params.append("isTrending", "true");

        const res = await axiosClient.get(`/news?${params.toString()}`);
        console.log("res", res);

        return res.data.data;
    }

    async getTags(): Promise<string[]> {
        const res = await axiosClient.get(`/news/tags`);

        return res.data.data;
    }
}

export default new NewsService();
