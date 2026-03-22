'use client';
import api from '@/lib/api';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy'
);
interface User {
    id: string;
    name: string | null;
    email: string;
    subscription_plan: string;
    queries_today: number;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    isLoggedIn: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage on mount
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            refreshUser(storedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const refreshUser = async (currentToken?: string) => {
        try {
            const resp = await api.get('/auth/me');
            setUser(resp.data);
        } catch (err: any) {
            if (err.response?.status !== 401) {
                console.error('Failed to refresh user', err);
            }
            // If 401, interceptor already cleared token from localstorage
            setToken(null);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = (newToken: string, newUser: User) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        
        // Also sign out of Supabase to prevent auto-relogin loops
        supabase.auth.signOut().catch(e => console.error(e));
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, isLoggedIn: !!user, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
