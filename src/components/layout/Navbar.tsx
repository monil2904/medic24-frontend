"use client";
import { useAuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
export default function Navbar() {
    const { user, isLoggedIn, logout } = useAuthContext();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const navLink = (href: string) =>
        `text-sm font-bold transition-all px-4 py-2 rounded-xl ${pathname === href ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}`;

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => document.body.classList.remove('overflow-hidden');
    }, [mobileMenuOpen]);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm h-[72px] transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex justify-between items-center h-full gap-4">
                        
                        {/* Left: Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center gap-2.5 group">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center shadow-md group-hover:shadow-blue-600/30 transition-shadow">
                                    <span className="text-white font-bold text-lg leading-none">M</span>
                                </div>
                                <span className="font-bold text-lg md:text-xl text-slate-800 tracking-tight hidden sm:block">
                                    Medic24<span className="text-blue-600">.ai</span>
                                </span>
                            </Link>
                        </div>

                        {/* Center: Main Navigation */}
                        <div className="hidden md:flex flex-1 justify-center items-center gap-1 xl:gap-2">
                            <Link href="/chat" className={navLink('/chat')}>Chat</Link>
                            <Link href="/medicine" className={navLink('/medicine')}>Medicine</Link>
                            <Link href="/tools" className={navLink('/tools')}>Tools</Link>
                            <div className="relative group">
                                <Link href="/lab-report" className={navLink('/lab-report') + " inline-flex items-center gap-1"}>
                                    Lab Analysis
                                    <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </Link>
                                <div className="absolute left-0 top-full mt-1 w-48 rounded-xl shadow-xl bg-white border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[200] overflow-hidden translate-y-2 group-hover:translate-y-0">
                                    <Link href="/lab-report" className="block px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 border-b border-slate-50 transition-colors">Analyze Report</Link>
                                    <Link href="/compare" className="block px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">Compare Reports</Link>
                                </div>
                            </div>
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
                                                <Link href="/lab-report" className="block px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors" onClick={() => setDropdownOpen(false)}>
                                                    Lab Analysis
                                                </Link>
                                                <Link href="/compare" className="block px-4 pb-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors" onClick={() => setDropdownOpen(false)}>
                                                    Compare Reports
                                                </Link>
                                                <Link href="/history" className="block px-4 py-2 mt-1 border-t border-slate-100 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors" onClick={() => setDropdownOpen(false)}>
                                                    Chat History
                                                </Link>
                                                <Link href="/lab-report/history" className="block px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors" onClick={() => setDropdownOpen(false)}>
                                                    Lab Report History
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
                                    <Link href="/login" className="text-sm font-bold text-white bg-slate-800 hover:bg-slate-900 px-5 py-2.5 rounded-xl shadow-md transition-all">
                                        Sign in
                                    </Link>
                                </div>
                            )}
                            
                            {/* Mobile Menu Toggle Button */}
                            <button
                                className="md:hidden p-2 text-slate-500 hover:text-slate-800 focus:outline-none"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[1000] bg-slate-950/98 backdrop-blur-xl overflow-y-auto w-full h-full text-white md:hidden">
                    <div className="flex flex-col min-h-full px-6 py-6 border-box">
                        <div className="flex justify-between items-center mb-8">
                            <span className="font-bold text-xl tracking-tight">
                                Medic24<span className="text-blue-500">.ai</span>
                            </span>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-3 text-slate-400 hover:text-white focus:outline-none bg-white/5 rounded-xl">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* User Info if logged in */}
                        {isLoggedIn && user && (
                            <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                                <p className="font-bold text-lg">{user.name}</p>
                                <p className="text-sm text-slate-400 mb-2">{user.email}</p>
                                <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-lg border border-blue-500/30">
                                    {user.subscription_plan} plan
                                </span>
                            </div>
                        )}

                        <div className="flex flex-col gap-2 flex-grow">
                            {[
                                { name: 'Chat', href: '/chat' },
                                { name: 'Medicine', href: '/medicine' },
                                { name: 'Tools', href: '/tools' },
                                { name: 'Lab Analysis', href: '/lab-report' },
                                { name: 'Compare', href: '/compare' },
                                { name: 'First Aid', href: '/first-aid' },
                                { name: 'Tips', href: '/tips' },
                                { name: 'Pricing', href: '/pricing' },
                                { name: 'History', href: '/history' },
                            ].map(item => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="block w-full py-4 text-left font-bold text-lg text-slate-300 hover:text-white border-b border-white/10 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {isLoggedIn ? (
                                <button
                                    onClick={() => { setMobileMenuOpen(false); logout(); }}
                                    className="block w-full py-4 text-left font-bold text-lg text-red-500 hover:text-red-400 border-b border-white/10 transition-colors"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    href="/login"
                                    className="block w-full py-4 mt-4 text-center font-bold text-white bg-blue-600 rounded-xl transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign in
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
