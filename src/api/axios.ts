import axios from 'axios';

// Configuration de base d'Axios
const api = axios.create({
    baseURL: 'http://localhost:8000/api', // L'URL de votre back-end Laravel
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Intercepteur : Ajoute automatiquement le token Sanctum à chaque requête
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;