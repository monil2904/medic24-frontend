"use client";
import { useAuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
    const { user, isLoggedIn, logout } = useAuthContext();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const pathname = usePathname();
    const navLink = (href: string) =>
        `text-sm font-bold transition-all px-4 py-2 rounded-xl ${pathname === href ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`;

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm h-[72px] transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full gap-4">
                    
                    {/* Left: Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center shadow-md group-hover:shadow-blue-600/30 transition-shadow">
                                <span className="text-white font-bold text-lg leading-none">M</span>
                            </div>
                            <span className="font-bold text-xl text-slate-800 tracking-tight hidden sm:block">
                                Medic24<span className="text-blue-600">.ai</span>
                            </span>
                        </Link>
                    </div>

                    {/* Center: Main Navigation */}
                    <div className="hidden lg:flex flex-1 justify-center items-center gap-1 xl:gap-2">
                        <Link href="/chat" className={navLink('/chat')}>Chat</Link>
                        <Link href="/medicine" className={navLink('/medicine')}>Medicine</Link>
                        <Link href="/tools" className={navLink('/tools')}>Tools</Link>
                        <Link href="/lab-report" className={navLink('/lab-report')}>Lab Analysis</Link>
                        <Link href="/compare" className={navLink('/compare')}>Compare</Link>
                        <Link href="/first-aid" className={`text-sm font-bold transition-all px-3 py-2 rounded-lg ${pathname === '/first-aid' ? 'bg-red-50 text-red-600' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                            First Aid <span className="animate-pulse inline-block align-baseline text-[10px]">🔴</span>
                        </Link>
                        <Link href="/tips" className={navLink('/tips')}>Tips</Link>
                        <Link href="/pricing" className={navLink('/pricing')}>Pricing</Link>
                    </div>

                    {/* Right: Auth & Profile */}
                    <div className="flex-shrink-0 flex items-center justify-end">
                        {isLoggedIn && user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-3 focus:outline-none p-1.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                                >
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm font-bold text-slate-800 leading-none">{user.name}</p>
                                        <p className="text-[10px] text-blue-600 uppercase tracking-wider font-bold mt-1 leading-none">{user.subscription_plan} plan</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shadow-sm">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-56 rounded-2xl shadow-xl bg-white ring-1 ring-slate-900/5 overflow-hidden z-[200] transform opacity-100 scale-100 transition-all origin-top-right">
                                        <div className="py-2">
                                            <div className="px-4 py-3 border-b border-slate-100 sm:hidden">
                                                <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                                                <p className="text-xs text-slate-500 font-medium truncate">{user.email}</p>
                                            </div>
                                            <Link href="/history" className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors" onClick={() => setDropdownOpen(false)}>
                                                Chat History
                                            </Link>
                                            <Link href="/lab-report/history" className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors" onClick={() => setDropdownOpen(false)}>
                                                Lab Reports
                                            </Link>
                                            <div className="h-px bg-slate-100 my-1 mx-3" />
                                            <button
                                                onClick={() => { setDropdownOpen(false); logout(); }}
                                                className="block w-full text-left px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login" className="hidden sm:block text-sm font-bold text-slate-500 hover:text-slate-800 px-3 py-2 transition-colors">
                                    Log in
                                </Link>
                                <Link href="/login" className="text-sm font-bold text-white bg-slate-800 hover:bg-slate-900 px-5 py-2.5 rounded-xl shadow-md transition-all">
                                    Sign in
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
}
