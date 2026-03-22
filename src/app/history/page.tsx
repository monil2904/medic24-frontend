'use client';
import Navbar from '@/components/layout/Navbar';
import api from '@/lib/api';
import { ChevronDown, ChevronUp, Clock, FlaskConical, ImageIcon, MessageCircle, RefreshCw, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

type Chat = {
    id: string;
    query: string;
    query_type: string;
    ensemble_response: string;
    confidence: number;
    created_at: string;
};

const FILTER_TABS = [
    { label: 'All', value: 'all', icon: <MessageCircle size={14} /> },
    { label: 'General', value: 'general', icon: <Zap size={14} /> },
    { label: 'Symptoms', value: 'symptom', icon: <FlaskConical size={14} /> },
    { label: 'Clinical', value: 'clinical', icon: <RefreshCw size={14} /> },
    { label: 'Medications', value: 'drug', icon: <ImageIcon size={14} /> },
];

function ConfidenceBadge({ value }: { value: number }) {
    const pct = Math.round(value * 100);
    const color = pct >= 67 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
        : pct >= 34 ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            : 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    return (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${color}`}>
            {pct}% confidence
        </span>
    );
}

function QueryTypeBadge({ type }: { type: string }) {
    const map: Record<string, string> = {
        general: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        symptom: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
        clinical: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        drug: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    };
    return (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${map[type] || 'bg-slate-700 text-slate-300 border-slate-600'}`}>
            {type.toUpperCase()}
        </span>
    );
}

function ChatItem({ chat }: { chat: Chat }) {
    const [expanded, setExpanded] = useState(false);
    const date = new Date(chat.created_at).toLocaleString('en-IN', {
        dateStyle: 'medium', timeStyle: 'short',
    });

    return (
        <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900 hover:border-slate-700 transition-colors w-full">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full text-left p-4 sm:p-5 flex items-start gap-3 sm:gap-4 transition-colors"
                aria-expanded={expanded}
            >
                <div className="flex-1 min-w-0">
                    <p className="text-slate-200 font-medium text-sm sm:text-base line-clamp-2 pr-2">
                        {chat.query}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2">
                        <QueryTypeBadge type={chat.query_type} />
                        <ConfidenceBadge value={chat.confidence} />
                        <span className="text-slate-500 text-[10px] sm:text-xs flex items-center gap-1 mt-1 sm:mt-0 w-full sm:w-auto">
                            <Clock size={12} /> {date}
                        </span>
                    </div>
                </div>
                <span className="text-slate-500 mt-1 shrink-0 p-1">
                    {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
            </button>

            {expanded && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-slate-800 pt-4">
                    <div className="prose prose-sm prose-invert max-w-none text-slate-300 text-sm leading-relaxed break-words [word-break:break-word]">
                        <ReactMarkdown>{chat.ensemble_response}</ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function HistoryPage() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [filter, setFilter] = useState('all');
    const [error, setError] = useState('');
    const LIMIT = 20;

    const fetchChats = async (newOffset = 0, append = false) => {
        try {
            append ? setLoadingMore(true) : setLoading(true);
            const res = await api.get(`/api/v1/chat/history?limit=${LIMIT}&offset=${newOffset}`);
            const fetched: Chat[] = res.data.chats;
            setChats(prev => append ? [...prev, ...fetched] : fetched);
            setHasMore(fetched.length === LIMIT);
            setOffset(newOffset + LIMIT);
        } catch (e: any) {
            setError(e.response?.data?.detail || 'Failed to load chat history');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchChats(0, false);
    }, []);

    const filtered = filter === 'all' ? chats : chats.filter(c => c.query_type === filter);

    return (
        <div className="bg-slate-950 min-h-screen text-white">
            <Navbar />
            <div className="max-w-3xl mx-auto py-20 sm:py-28 px-4 sm:px-6">
                {/* Header */}
                <div className="mb-6 sm:mb-8 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Chat History</h1>
                    <p className="text-slate-400 mt-1 text-xs sm:text-sm">Your past medical AI conversations</p>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-4 sm:mb-6 [&::-webkit-scrollbar]:hidden w-full snap-x">
                    {FILTER_TABS.map(tab => (
                        <button
                            key={tab.value}
                            onClick={() => setFilter(tab.value)}
                            className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 sm:py-1.5 rounded-full border transition-all shrink-0 snap-start min-h-[36px]
                                ${filter === tab.value
                                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600'}`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                        {error}
                    </div>
                )}

                {/* Loading skeleton */}
                {loading && (
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-20 rounded-2xl bg-slate-800 animate-pulse" />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && filtered.length === 0 && !error && (
                    <div className="text-center py-24">
                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                            <MessageCircle size={28} className="text-slate-600" />
                        </div>
                        <h3 className="text-slate-300 font-semibold text-lg">
                            {filter === 'all' ? 'No conversations yet' : `No ${filter} conversations`}
                        </h3>
                        <p className="text-slate-500 text-sm mt-2">
                            {filter === 'all' ? 'Start chatting to see your history here.' : 'Try a different filter.'}
                        </p>
                    </div>
                )}

                {/* Chat list */}
                {!loading && filtered.length > 0 && (
                    <div className="space-y-3">
                        {filtered.map(chat => (
                            <ChatItem key={chat.id} chat={chat} />
                        ))}
                    </div>
                )}

                {/* Load more */}
                {!loading && hasMore && filter === 'all' && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => fetchChats(offset, true)}
                            disabled={loadingMore}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 text-sm font-semibold transition-all disabled:opacity-50"
                        >
                            {loadingMore ? (
                                <><div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" /> Loading...</>
                            ) : (
                                <>Load more <ChevronDown size={16} /></>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
