import { createClient } from '@supabase/supabase-js';
import api from './api';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
export const supabase = createClient(supabaseUrl, supabaseKey);

export const loginWithEmail = async (email: string, password: string) => {
    const resp = await api.post('/auth/login', { email, password });
    return resp.data;
};

export const registerWithEmail = async (name: string, email: string, password: string) => {
    const resp = await api.post('/auth/register', {
        name,
        email,
        password,
        confirm_password: password
    });
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
