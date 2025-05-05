import axios from "axios";

export const dashboardAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_OPERATIONS_API_URL
});

dashboardAxiosInstance.interceptors.request.use(
    function (config) {
        // const newToken = "bla bla";
        // const newToken = getNewToken();

        // Update the Authorization header
        // config.headers.Authorization = `Bearer ${newToken}`;

        return config;
    },
    function (error) {
        // Handle request errors
        return Promise.reject(error);
    }
);

async function getNewToken() {
    try {
        const res = await axios.get(`https://dashboard.operations.access-ci.org/badgetoken/v1/token/`);
        return res.data.token;
    } catch (error) {
        return error;
    }
}




