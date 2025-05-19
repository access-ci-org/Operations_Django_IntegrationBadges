import axios from "axios";

export const dashboardAxiosInstance = axios.create({
    baseURL: window.SETTINGS.OPERATIONS_API_BASE_URL
});

dashboardAxiosInstance.interceptors.request.use(
    async function (config) {
        let newToken;
        try{
            newToken = await getNewToken();
        } catch (e) {
            newToken = "<no-valid-token-received-from-dashboard>"
        }

        // Update the Authorization header
        //config.headers.Authorization = `Bearer ${newToken}`;

        return config;
    },
    function (error) {
        // Handle request errors
        return Promise.reject(error);
    }
);

async function getNewToken() {
    try {
        const res = await axios.get(`${window.SETTINGS.DASHBOARD_BASE_URL}/badgetoken/v1/token/`);
        return res.data.token;
    } catch (error) {
        throw error;
    }
}




