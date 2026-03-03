import api from './axios';

export const authService = {
    // Fonction pour se connecter
    login: async (credentials: any) => {
        const response = await api.post('/login', credentials);
        
        // Si la connexion réussit, on sauvegarde le token et l'utilisateur dans le navigateur
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Fonction pour s'inscrire
    register: async (userData: any) => {
        const response = await api.post('/register', userData);
        
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
        }
        return response.data;
    },

    // Fonction pour se déconnecter
    logout: async () => {
        await api.post('/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Récupérer l'utilisateur actuel (optionnel)
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    }
};