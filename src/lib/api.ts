import axios from 'axios';
import { API_BASE_URL } from './constants';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the JWT token to headers
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor to handle 401 Unauthorized
api.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.status === 401) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            // Optionally redirect to login, handled in AuthContext mostly
        }
    }
    return Promise.reject(error);
});

export default api;
