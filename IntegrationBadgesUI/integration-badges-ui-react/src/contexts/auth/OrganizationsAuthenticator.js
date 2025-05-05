import axios from "axios";

export const organizationsAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_ORGANIZATION_API_URL
});
