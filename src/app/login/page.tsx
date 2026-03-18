'use client';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const router = useRouter();

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
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        {isLogin ? 'Sign in to your account' : 'Create a new account'}
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" required value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent" />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email address</label>
                                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent" />
                            </div>

                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent" />
                                </div>
                            )}

                            {error && <div className="text-error text-sm text-center">{error}</div>}

                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                {isLogin ? 'Sign in' : 'Register'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-sm font-medium text-accent hover:text-primary">
                                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
