'use client';
import ChatInterface from '@/components/chat/ChatInterface';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatPage() {
    const { isLoggedIn, loading: authLoading } = useAuth();
    const router = useRouter();

    // Protect route securely
    useEffect(() => {
        if (!authLoading && !isLoggedIn) {
            router.push('/login');
        }
    }, [authLoading, isLoggedIn, router]);

    if (authLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!isLoggedIn) return null; // Wait for redirect to happen

    return (
        <div className="flex flex-col h-screen fixed inset-0 bg-slate-50 w-full overflow-hidden">
            <Navbar />
            <div className="flex-1 w-full h-full relative z-10">
                <ChatInterface />
            </div>
        </div>
    );
}
