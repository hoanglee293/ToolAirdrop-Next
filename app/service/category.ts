import { CategoryQuery, Category } from "@/types/news";
import axiosClient from "@/app/utils/axiosClient";

class CategoryService {
    async getAll(query: CategoryQuery = {}): Promise<Category[]> {
        const { data } = await axiosClient.get('/categories', { params: query });
        return data.data;
    }
}

export default new CategoryService();
