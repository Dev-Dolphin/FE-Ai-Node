import axios from "axios";

axios.defaults.timeout = 30000;
// axios.defaults.timeout = 100;
axios.defaults.timeoutErrorMessage = "timeout";

const api = axios.create({
    baseURL: "http://localhost:8888/api",
    withCredentials: false,
    headers: {
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
    },
});
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default api;