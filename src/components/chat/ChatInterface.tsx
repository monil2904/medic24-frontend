'use client';
import { useChat } from '@/hooks/useChat';
import ChatSidebar from './ChatSidebar';
import { Menu, SendHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ChatBubble from './ChatBubble';
import ImageUpload from './ImageUpload';
import LoadingIndicator from './LoadingIndicator';
import ModelTabs from './ModelTabs';
import PaywallModal from './PaywallModal';

import { ChatMessage } from '@/lib/types';

type QueryType = 'general' | 'symptom' | 'clinical' | 'drug';
const QUERY_TYPES: { value: QueryType; label: string; description: string; color: string }[] = [
    { value: 'general', label: 'General', description: 'Balanced response', color: 'bg-cyan-100 text-cyan-700 border-cyan-300' },
    { value: 'symptom', label: 'Symptoms', description: 'Patient-friendly', color: 'bg-violet-100 text-violet-700 border-violet-300' },
    { value: 'clinical', label: 'Clinical', description: 'Clinical reasoning', color: 'bg-blue-100 text-blue-700 border-blue-300' },
    { value: 'drug', label: 'Medications', description: 'Drug info', color: 'bg-amber-100 text-amber-700 border-amber-300' }
];

export default function ChatInterface() {
    const { messages, setMessages, sendMessage, loading, error } = useChat();
    const [input, setInput] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [paywallOpen, setPaywallOpen] = useState(false);
    const [queryType, setQueryType] = useState<QueryType>('general');
    const [modelMode, setModelMode] = useState('ensemble');
    const [showQuerySelector, setShowQuerySelector] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleNewChat = () => setMessages([]);
    const handleSelectChat = (msgs: ChatMessage[]) => setMessages(msgs);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    useEffect(() => {
        if (error && error.toLowerCase().includes('limit')) {
            setPaywallOpen(true);
        }
    }, [error]);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if ((!input.trim() && !selectedImage) || loading) return;

        const submittedText = input.trim() || 'Please analyze this medical image.';
        const isImageMode = !!selectedImage;
        const file = selectedImage;

        setInput('');
        setSelectedImage(null);
        setShowQuerySelector(false);

        try {
            await sendMessage(submittedText, isImageMode, file, queryType, modelMode);
        } catch (err) {
            console.error(err);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const QUERY_TYPE_LABELS: Record<QueryType, string> = {
        general: '⚖️ General',
        symptom: '🩺 Symptoms',
        clinical: '🔬 Clinical',
        drug: '💊 Medications',
    };

    return (
        <div className="flex h-full w-full bg-slate-50 overflow-hidden">
            
            <button onClick={() => setSidebarOpen(true)} className="md:hidden absolute top-20 left-4 z-40 p-2.5 bg-white rounded-xl shadow-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                <Menu size={20} className="text-slate-600" />
            </button>
            
            <ChatSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onNewChat={handleNewChat} onSelectChat={handleSelectChat} />

            <div className="flex-1 flex flex-col h-full relative overflow-hidden transition-all duration-300">

            {/* Paywall Overlay */}
            {paywallOpen && (
                <div className="fixed inset-0 z-[200]">
                    <PaywallModal isOpen={paywallOpen} onClose={() => setPaywallOpen(false)} />
                </div>
            )}

            {/* Main Chat Area */}
            <main className="flex-1 overflow-y-auto w-full pt-20 pb-[max(120px,env(safe-area-inset-bottom))] px-3 sm:px-6">
                <div className="max-w-4xl mx-auto flex flex-col min-h-full justify-end">

                    {messages.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 my-20">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-6 shadow-inner">
                                <span className="text-4xl drop-shadow-sm">🩺</span>
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-800 mb-4 font-display">How can we help today?</h2>
                            <p className="text-slate-500 max-w-lg mb-10 leading-relaxed text-lg text-balance">
                                Describe your symptoms, upload a lab report, or scan a clinical image. Our 3-model medical AI ensemble is ready.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                                <button onClick={() => { setInput('I have a persistent headache and mild fever. What could it be?'); setQueryType('symptom'); }} className="text-left px-5 py-3 rounded-2xl border border-slate-200 bg-white hover:border-cyan-300 hover:shadow-md transition-all">
                                    <span className="block text-sm font-semibold text-slate-700 mb-1">Common Symptoms</span>
                                    <span className="block text-xs text-slate-500">Persistent headache with fever...</span>
                                </button>
                                <button onClick={() => { setInput('What are the potential side effects of taking Amoxicillin 500mg?'); setQueryType('drug'); }} className="text-left px-5 py-3 rounded-2xl border border-slate-200 bg-white hover:border-cyan-300 hover:shadow-md transition-all">
                                    <span className="block text-sm font-semibold text-slate-700 mb-1">Drug Interactions</span>
                                    <span className="block text-xs text-slate-500">Side effects of Amoxicillin...</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full space-y-6 pb-4">
                            {messages.map((msg, i) => (
                                <ChatBubble key={i} msg={msg} />
                            ))}

                            {loading && (
                                <div className="flex justify-start">
                                    <LoadingIndicator />
                                </div>
                            )}

                            {error && !error.toLowerCase().includes('limit') && (
                                <div className="flex justify-center my-4">
                                    <span className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-xl text-sm font-medium shadow-sm">
                                        {error}
                                    </span>
                                </div>
                            )}
                            <div ref={messagesEndRef} className="h-4" />
                        </div>
                    )}
                </div>
            </main>

            {/* Query Type Popover */}
            {showQuerySelector && (
                <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 flex flex-wrap gap-2 justify-center">
                        {QUERY_TYPES.map(tab => (
                            <button
                                key={tab.value}
                                onClick={() => { setQueryType(tab.value); setShowQuerySelector(false); }}
                                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${queryType === tab.value ? tab.color : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="fixed bottom-0 left-0 right-0 z-[100] bg-slate-950 border-t border-white/5 pb-[max(12px,env(safe-area-inset-bottom))]">
                <div className="max-w-4xl mx-auto px-3 py-2 sm:px-6">
                    <ModelTabs selectedMode={modelMode} onSelect={setModelMode} />
                    
                    {/* Small thumbnail preview */}
                    {selectedImage && (
                        <div className="mb-2 relative inline-block">
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-2 -right-2 bg-slate-800 text-white rounded-full p-1 border border-slate-700 w-5 h-5 flex items-center justify-center text-xs"
                            >
                                x
                            </button>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="w-10 h-10 object-cover rounded-lg border border-slate-700" />
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="flex items-end gap-2"
                    >
                        <ImageUpload
                            selectedFile={selectedImage}
                            onImageSelect={setSelectedImage}
                        />

                        {/* Query Type Button */}
                        <button
                            type="button"
                            onClick={() => setShowQuerySelector(v => !v)}
                            title="Change query focus"
                            className="flex items-center justify-center w-11 h-11 shrink-0 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-colors"
                        >
                            <span className="text-xl">{QUERY_TYPE_LABELS[queryType].split(' ')[0]}</span>
                        </button>

                        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all flex items-center overflow-hidden min-h-[44px]">
                            <textarea
                                className="flex-1 max-h-32 min-h-[44px] bg-transparent resize-none outline-none py-3 px-3 text-slate-200 font-medium placeholder:text-slate-500 text-base"
                                placeholder={selectedImage ? 'Add details...' : 'Message Medic24...'}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={loading}
                                rows={1}
                                style={{ height: 'auto' }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || (!input.trim() && !selectedImage)}
                            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-950
                bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md disabled:bg-slate-800 disabled:text-slate-600"
                        >
                            <SendHorizontal size={20} />
                        </button>
                    </form>

                    <div className="text-center mt-2.5 hidden sm:block">
                        <span className="text-xs text-slate-500 font-medium tracking-wide">
                            Medic24 AI can make mistakes. Always verify clinical information.
                        </span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
