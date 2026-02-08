import axios from "axios"

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
const axiosClient = axios.create({
    baseURL: `${apiUrl}/api/`,
    withCredentials: true,
})

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // useAuthStore.getState().logout()
        }
        return Promise.reject(error)
    }
)

export default axiosClient
