import axios from 'axios';

// Configuration de base d'Axios
const api = axios.create({
    // On utilise l'IP directe (127.0.0.1) ou la variable d'environnement pour éviter les lenteurs
    baseURL: (import.meta as any).env?.VITE_API_URL || 'https://conceptify.pro/api',
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