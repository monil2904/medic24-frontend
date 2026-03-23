'use client';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy'
);

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Listen for Supabase OAuth redirects to sync with our custom backend JWT
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("Supabase Auth Event:", event);
            if (event === 'SIGNED_IN' && session?.access_token) {
                console.log("Session found! Sending to backend...");
                try {
                    const resp = await api.post('/auth/supabase', { access_token: session.access_token });
                    login(resp.data.token, resp.data.user);
                    router.push('/chat');
                } catch (err) {
                    console.error("Supabase sync error:", err);
                    setError("Failed to sync Google account with our database.");
                }
            }
        });
        
        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, [login, router]);

    const handleGoogleLogin = async () => {
        console.log("Clicking Google Login... redirecting to Supabase");
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                // Redirect back to login page so the useEffect catches the session
                redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/login` : 'http://localhost:3000/login'
            }
        });
        if (error) {
            console.error("Google Auth Setup Error:", error.message);
            setError(error.message);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const resp = await api.post('/auth/login', { email, password });
                login(resp.data.token, resp.data.user);
            } else {
                const resp = await api.post('/auth/register', {
                    name,
                    email,
                    password,
                    confirm_password: confirmPassword
                });
                login(resp.data.token, resp.data.user);
            }
            router.push('/chat');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'An error occurred');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col relative">
            <Link href="/" className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors min-h-[44px] px-2 sm:px-0 bg-white/50 sm:bg-transparent rounded-full backdrop-blur-sm sm:backdrop-blur-none z-10">
                <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">Back to Home</span>
            </Link>

            <div className="pt-12 sm:pt-16 w-full flex justify-center">
                <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <div className="h-10 w-10 bg-primary text-white flex items-center justify-center rounded-xl font-bold text-xl">
                        M
                    </div>
                    <img src="/black-wordmark-with-centered-slogan.svg" alt="Medic24 AI" className="h-16 object-contain w-auto" />
                </Link>
            </div>
            <div className="flex-1 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        {isLogin ? 'Sign in to your account' : 'Create a new account'}
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-5 sm:px-10 shadow sm:rounded-lg">
                        <form className="space-y-6 flex flex-col" onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" required value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 sm:py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent text-base sm:text-sm min-h-[44px]" />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email address</label>
                                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 sm:py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent text-base sm:text-sm min-h-[44px]" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 sm:py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent text-base sm:text-sm min-h-[44px]" />
                            </div>

                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 sm:py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent text-base sm:text-sm min-h-[44px]" />
                                </div>
                            )}

                            {error && <div className="text-error text-sm text-center">{error}</div>}

                            <button type="submit" className="w-full flex justify-center py-3 sm:py-2 px-4 border border-transparent rounded-md shadow-sm text-base sm:text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary min-h-[44px]">
                                {isLogin ? 'Sign in' : 'Register'}
                            </button>
                            
                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full flex justify-center items-center py-3 sm:py-2 px-4 border border-gray-300 rounded-md shadow-sm text-base sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary min-h-[44px]"
                            >
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" />
                                Google
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-sm font-medium text-accent hover:text-primary min-h-[44px] w-full border border-transparent hover:border-accent/20 rounded-lg transition-all">
                                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
