'use client';
import { useChat } from '@/hooks/useChat';
import { SendHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ChatBubble from './ChatBubble';
import ImageUpload from './ImageUpload';
import LoadingIndicator from './LoadingIndicator';
import ModelTabs, { QueryType } from './ModelTabs';
import PaywallModal from './PaywallModal';
import VoiceRecorder from './VoiceRecorder';

export default function ChatInterface() {
    const { messages, sendMessage, loading, error } = useChat();
    const [input, setInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [paywallOpen, setPaywallOpen] = useState(false);
    const [queryType, setQueryType] = useState<QueryType>('general');
    const [showQuerySelector, setShowQuerySelector] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

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
        setIsRecording(false);
        setShowQuerySelector(false);

        try {
            await sendMessage(submittedText, isImageMode, file, queryType);
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
        <div className="flex flex-col h-full bg-slate-50">

            {/* Paywall Overlay */}
            {paywallOpen && (
                <div className="fixed inset-0 z-[200]">
                    <PaywallModal isOpen={paywallOpen} onClose={() => setPaywallOpen(false)} />
                </div>
            )}

            {/* Main Chat Area */}
            <main className="flex-1 overflow-y-auto w-full pt-20 pb-4 px-4 sm:px-6">
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
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4">
                        <ModelTabs value={queryType} onChange={(t) => { setQueryType(t); setShowQuerySelector(false); }} />
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="bg-white border-t border-slate-200 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)] w-full relative z-40">
                <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6">
                    <form
                        onSubmit={handleSubmit}
                        className={`flex items-end gap-3 rounded-3xl border transition-all shadow-sm
              ${isRecording ? 'border-red-300 bg-red-50/30' : 'border-slate-300 bg-white focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-500/10'} 
              p-2 pr-4`}
                    >
                        <VoiceRecorder
                            isRecording={isRecording}
                            setIsRecording={setIsRecording}
                            onTranscription={(text) => setInput(prev => prev ? `${prev} ${text}` : text)}
                        />

                        <ImageUpload
                            selectedFile={selectedImage}
                            onImageSelect={setSelectedImage}
                        />

                        {/* Query Type Button */}
                        <button
                            type="button"
                            onClick={() => setShowQuerySelector(v => !v)}
                            title="Change query focus"
                            className="flex items-center gap-1 text-xs text-slate-500 border-r border-slate-200 pr-3 mr-1 py-1 hover:text-cyan-600 transition-colors whitespace-nowrap"
                        >
                            {QUERY_TYPE_LABELS[queryType]}
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </button>

                        <textarea
                            className="flex-1 max-h-32 min-h-[44px] bg-transparent resize-none outline-none py-3 px-2 text-slate-700 placeholder:text-slate-400 text-sm sm:text-base"
                            placeholder={isRecording ? 'Listening...' : selectedImage ? 'Add details about this image...' : 'Ask a medical question...'}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={loading}
                            rows={1}
                            style={{ height: 'auto' }}
                        />

                        <button
                            type="submit"
                            disabled={loading || (!input.trim() && !selectedImage)}
                            className="mb-1 p-3 rounded-full flex-shrink-0 transition-all font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500
                bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-md hover:shadow-cyan-500/30 disabled:opacity-50 disabled:grayscale"
                        >
                            <SendHorizontal size={20} />
                        </button>
                    </form>

                    <div className="text-center mt-3 mb-1">
                        <span className="text-[10px] sm:text-xs text-slate-400 font-medium tracking-wide border border-transparent hover:border-slate-200 hover:bg-slate-50 px-3 py-1 rounded-full transition-colors cursor-default">
                            Medic24 AI can make mistakes. Always verify clinical information.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
