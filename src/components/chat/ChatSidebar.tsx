import api from '@/lib/api';
import { ChatMessage } from '@/lib/types';
import { Clock, MessageSquare, MessageSquarePlus, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type ChatHistoryItem = {
    id: string;
    query: string;
    ensemble_response: string;
    created_at: string;
    confidence: number;
    models_used?: string[];
};

interface ChatSidebarProps {
    onNewChat: () => void;
    onSelectChat: (messages: ChatMessage[]) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function ChatSidebar({ onNewChat, onSelectChat, isOpen, setIsOpen }: ChatSidebarProps) {
    const [history, setHistory] = useState<ChatHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const res = await api.get('/api/v1/chat/history?limit=20');
            setHistory(res.data.chats);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Auto-fetch when sidebar opens (for mobile) or mount (for desktop)
    useEffect(() => {
        fetchHistory();
    }, [isOpen]);

    const handleSelect = (item: ChatHistoryItem) => {
        const msgs: ChatMessage[] = [
            { role: 'user', content: item.query },
            { role: 'assistant', content: item.ensemble_response, confidence: item.confidence }
        ];
        onSelectChat(msgs);
        if (window.innerWidth < 768) setIsOpen(false); // Auto close on mobile
    };

    return (
        <>
            {/* Mobile backdrop overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}
            
            <div className={`fixed md:relative inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col h-full shadow-2xl md:shadow-none pt-[72px] md:pt-0`}>
                
                {/* Mobile Close Button Header */}
                <div className="flex md:hidden items-center justify-between p-4 border-b border-slate-100">
                    <span className="font-bold text-slate-800">Menu</span>
                    <button onClick={() => setIsOpen(false)} className="p-1 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100">
                        <X size={20} />
                    </button>
                </div>

                {/* New Chat Button */}
                <div className="p-4 border-b border-slate-100 bg-white md:mt-[72px]">
                    <button
                        onClick={() => { onNewChat(); if (window.innerWidth < 768) setIsOpen(false); fetchHistory(); }}
                        className="w-full flex items-center gap-2 justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
                    >
                        <MessageSquarePlus size={18} />
                        New Chat
                    </button>
                </div>

                {/* History List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-1 bg-slate-50/50">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-3 flex items-center justify-between">
                        <span>Recent Conversations</span>
                    </div>
                    {loading ? (
                        <div className="animate-pulse space-y-2 px-2">
                            <div className="h-14 bg-slate-100/80 border border-slate-200 rounded-xl"></div>
                            <div className="h-14 bg-slate-100/80 border border-slate-200 rounded-xl"></div>
                            <div className="h-14 bg-slate-100/80 border border-slate-200 rounded-xl"></div>
                        </div>
                    ) : history.length === 0 ? (
                        <div className="text-center text-slate-400 text-sm py-8 px-2">
                            No recent chats.
                        </div>
                    ) : (
                        history.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleSelect(item)}
                                className="w-full text-left p-3 pt-3.5 pb-3.5 rounded-xl bg-white hover:bg-blue-50 transition-colors flex items-start gap-3 group border border-slate-200 hover:border-blue-200 hover:shadow-sm cursor-pointer"
                            >
                                <MessageSquare size={16} className="text-slate-400 mt-0.5 shrink-0 group-hover:text-blue-500 transition-colors" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-700 truncate group-hover:text-blue-900">{item.query}</p>
                                    <p className="text-[10px] font-medium text-slate-400 flex items-center gap-1 mt-1 uppercase tracking-wider">
                                        <Clock size={10} /> {new Date(item.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
