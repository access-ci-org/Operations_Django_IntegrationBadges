import axios from "axios";

export const organizationsAxiosInstance = axios.create({
    baseURL: window.SETTINGS.OPERATIONS_API_BASE_URL + window.SETTINGS.OPERATIONS_API_INTEGRATION_BADGES_PATH
    // baseURL: window.SETTINGS.OPERATIONS_API_BASE_URL + window.SETTINGS.OPERATIONS_API_ORGANIZATIONS_PATH
});
