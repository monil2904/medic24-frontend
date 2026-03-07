import api from './api';

export const loginWithGoogle = async (token: string) => {
    const resp = await api.post('/auth/google', { id_token: token });
    return resp.data;
};

export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

export const setToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
    }
};

export const removeToken = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
    }
};

export const isAuthenticated = (): boolean => {
    return !!getToken();
};
