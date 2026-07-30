import axios from "axios";

const api = axios.create({
    baseURL: "https://stockmind-ai-backend-07ea.onrender.com",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    console.log("🌐 Request:", config.baseURL + config.url);
    console.log("🔑 Token:", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            alert("Your session has expired. Please login again.");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;