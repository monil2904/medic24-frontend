"use client";
import { useAuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const { user, isLoggedIn, logout } = useAuthContext();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-slate-950/80 backdrop-blur-xl border-b border-white/5 h-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    {/* Logo */}
                    <div className="flex">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                                <span className="text-white font-bold text-sm">M</span>
                            </div>
                            <span className="font-display text-xl font-bold text-white tracking-tight">
                                Medic<span className="text-cyan-400">24</span> AI
                            </span>
                        </Link>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-6 items-center">
                            <Link href="/chat" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                Chat
                            </Link>
                            <Link href="/lab-report" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                Lab Analysis
                            </Link>
                            <Link href="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                Pricing
                            </Link>
                        </div>
                    </div>

                    {/* Auth State */}
                    <div className="flex items-center">
                        {isLoggedIn && user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-3 focus:outline-none"
                                >
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm font-medium text-white">{user.name}</p>
                                        <p className="text-[10px] text-cyan-400 uppercase tracking-wider">{user.subscription_plan} plan</p>
                                    </div>
                                    <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-white font-bold">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg shadow-black/50 bg-slate-900 ring-1 ring-white/10 focus:outline-none overflow-hidden">
                                        <div className="py-1">
                                            <Link href="/history" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white" onClick={() => setDropdownOpen(false)}>
                                                Chat History
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setDropdownOpen(false);
                                                    logout();
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-800 hover:text-red-300"
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login" className="text-sm text-slate-300 hover:text-white font-medium px-2">
                                    Log in
                                </Link>
                                <Link href="/login" className="text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all">
                                    Sign up Free
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
