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
        `text-sm font-medium transition-colors ${pathname === href ? 'text-blue-700 font-semibold border-b-2 border-blue-700 pb-0.5' : 'text-slate-600 hover:text-blue-700'}`;

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-lg border-b border-blue-100 shadow-sm h-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    {/* Logo */}
                    <div className="flex">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center shadow-md group-hover:shadow-blue-700/30 transition-shadow">
                                <span className="text-white font-bold text-sm">M</span>
                            </div>
                            <span className="font-bold text-xl text-[#0F3460] tracking-tight">
                                Medic24 <span className="text-blue-500">AI</span>
                            </span>
                        </Link>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-6 items-center">
                            <Link href="/chat" className={navLink('/chat')}>Chat</Link>
                            <Link href="/medicine" className={navLink('/medicine')}>Medicine</Link>
                            <Link href="/tools" className={navLink('/tools')}>Tools</Link>
                            <Link href="/lab-report" className={navLink('/lab-report')}>Lab Analysis</Link>
                            <Link href="/compare" className={navLink('/compare')}>Compare</Link>
                            <Link href="/first-aid" className={navLink('/first-aid')}>First Aid 🔴</Link>
                            <Link href="/tips" className={navLink('/tips')}>Tips</Link>
                            <Link href="/pricing" className={navLink('/pricing')}>Pricing</Link>
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
                                        <p className="text-sm font-semibold text-[#0F3460]">{user.name}</p>
                                        <p className="text-[10px] text-blue-500 uppercase tracking-wider font-medium">{user.subscription_plan} plan</p>
                                    </div>
                                    <div className="w-9 h-9 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-white ring-1 ring-blue-100 overflow-hidden z-[200]">
                                        <div className="py-1">
                                            <Link href="/history" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700" onClick={() => setDropdownOpen(false)}>
                                                Chat History
                                            </Link>
                                            <Link href="/lab-report/history" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700" onClick={() => setDropdownOpen(false)}>
                                                Lab Reports
                                            </Link>
                                            <button
                                                onClick={() => { setDropdownOpen(false); logout(); }}
                                                className="block w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 hover:text-red-600"
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-blue-700 px-3 py-2 transition-colors">
                                    Log in
                                </Link>
                                <Link href="/login" className="text-sm font-bold text-white bg-[#0F3460] hover:bg-blue-900 px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
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
