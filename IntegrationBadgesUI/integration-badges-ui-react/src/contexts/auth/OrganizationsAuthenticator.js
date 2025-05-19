import axios from "axios";

export const organizationsAxiosInstance = axios.create({
    baseURL: window.SETTINGS.ORGANIZATIONS_API_BASE_URL
});
