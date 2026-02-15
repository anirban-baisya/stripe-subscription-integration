import axios from 'axios';

const apiClient = axios.create({
    // Vite uses import.meta.env to access environment variables
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;