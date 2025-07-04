import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Backend URL-ni özünə görə dəyiş

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Bütün iş elanlarını çəkmək üçün funksiya
export const getAllJobs = async () => {
    try {
        const response = await api.get("/jobs");
        return response.data; // { jobs: [...] } formatında gözlənilir
    } catch (error) {
        throw error;
    }
};
