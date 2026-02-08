import axiosClient from "@/app/utils/axiosClient";
import { NewsDetail } from "@/types/news";

class GetNewsById {
    async get(id: string): Promise<NewsDetail> {
        const { data } = await axiosClient.get(`/news/${id}`);
        return data.data;
    }
}

export default new GetNewsById();