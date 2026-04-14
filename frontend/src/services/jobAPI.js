import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Backend URL-ni özünə görə dəyiş

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Bütün iş elanlarını çəkmək üçün funksiya
export const getAllJobs = async () => {
    try {
        const response = await api.get("/jobs");

        // Response həmişə { jobs: [...] } formatında olsun
        if (Array.isArray(response.data)) {
            return { jobs: response.data };
        } else if (response.data.jobs) {
            return response.data;
        } else {
            return { jobs: [] };
        }
    } catch (error) {
        console.error("getAllJobs API error:", error);
        return { jobs: [] }; // Xəta olsa belə boş array qaytarır
    }
};
