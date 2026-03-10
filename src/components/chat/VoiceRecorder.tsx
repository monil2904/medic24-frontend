'use client';
import { Mic, MicOff, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface VoiceRecorderProps {
    onTranscription: (text: string) => void;
    isRecording: boolean;
    setIsRecording: (val: boolean) => void;
}

const LANGUAGES = [
    { code: 'en-US', label: 'English' },
    { code: 'hi-IN', label: 'हिंदी' },
    { code: 'ta-IN', label: 'தமிழ்' },
    { code: 'te-IN', label: 'తెలుగు' },
    { code: 'mr-IN', label: 'मराठी' },
    { code: 'bn-IN', label: 'বাংলা' },
    { code: 'gu-IN', label: 'ગુજરાતી' },
    { code: 'kn-IN', label: 'ಕನ್ನಡ' },
];

export default function VoiceRecorder({ onTranscription, isRecording, setIsRecording }: VoiceRecorderProps) {
    const recognitionRef = useRef<any>(null);
    // Use a ref to track recording state inside async callbacks (avoids stale closure)
    const isRecordingRef = useRef(false);

    const [interimText, setInterimText] = useState('');
    const [finalText, setFinalText] = useState('');
    const [lang, setLang] = useState('en-US');
    const [supported, setSupported] = useState(true);
    const [showLangPicker, setShowLangPicker] = useState(false);
    const [bars, setBars] = useState<number[]>(Array(12).fill(4));
    const animFrameRef = useRef<number | null>(null);

    // Keep ref in sync with state
    useEffect(() => {
        isRecordingRef.current = isRecording;
    }, [isRecording]);

    // Animate waveform
    useEffect(() => {
        if (isRecording) {
            const animate = () => {
                setBars(Array(12).fill(0).map(() => Math.floor(Math.random() * 28) + 4));
                animFrameRef.current = requestAnimationFrame(animate);
            };
            animFrameRef.current = requestAnimationFrame(animate);
        } else {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            setBars(Array(12).fill(4));
        }
        return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
    }, [isRecording]);

    const createAndStartRecognition = (language: string) => {
        if (typeof window === 'undefined') return;
        const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SR) { setSupported(false); return; }

        // Stop the existing instance cleanly
        if (recognitionRef.current) {
            try { recognitionRef.current.onend = null; recognitionRef.current.abort(); } catch (_) { }
        }

        const rec = new SR();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = language;

        rec.onresult = (event: any) => {
            let interim = '';
            let final = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) final += event.results[i][0].transcript;
                else interim += event.results[i][0].transcript;
            }
            setInterimText(interim);
            if (final) setFinalText(prev => (prev + ' ' + final).trim());
        };

        rec.onerror = (event: any) => {
            if (event.error === 'no-speech') {
                // Silently restart — use ref so we always have the current value
                if (isRecordingRef.current) {
                    setTimeout(() => {
                        if (isRecordingRef.current) {
                            try { rec.start(); } catch (_) { }
                        }
                    }, 150);
                }
                return; // Don't log, don't update state
            }
            if (event.error === 'aborted') return; // We triggered this ourselves, ignore
            console.warn('[VoiceRecorder] error:', event.error);
            isRecordingRef.current = false;
            setIsRecording(false);
            setInterimText('');
        };

        rec.onend = () => {
            // Auto-restart if we're still meant to be recording
            if (isRecordingRef.current) {
                try { rec.start(); } catch (_) { }
            }
        };

        recognitionRef.current = rec;
        try {
            rec.start();
        } catch (e) {
            console.warn('[VoiceRecorder] Could not start:', e);
        }
    };

    const startRecording = () => {
        setFinalText('');
        setInterimText('');
        isRecordingRef.current = true;
        setIsRecording(true);
        createAndStartRecognition(lang);
    };

    const stopRecording = () => {
        isRecordingRef.current = false;
        setIsRecording(false);
        setInterimText('');
        if (recognitionRef.current) {
            try { recognitionRef.current.onend = null; recognitionRef.current.abort(); } catch (_) { }
            recognitionRef.current = null;
        }
    };

    const confirmText = () => {
        const combined = (finalText + ' ' + interimText).trim();
        if (combined) onTranscription(combined);
        setFinalText('');
        setInterimText('');
        stopRecording();
    };

    const cancel = () => {
        setFinalText('');
        setInterimText('');
        stopRecording();
    };

    const switchLang = (newLang: string) => {
        setLang(newLang);
        setShowLangPicker(false);
        if (isRecordingRef.current) {
            createAndStartRecognition(newLang);
        }
    };

    if (!supported) {
        return (
            <button type="button" disabled className="p-3 rounded-full bg-slate-100 text-slate-300 cursor-not-allowed" title="Not supported in this browser">
                <MicOff size={20} />
            </button>
        );
    }

    return (
        <div className="relative">
            {/* Floating panel */}
            {isRecording && (
                <div className="absolute bottom-14 right-0 z-50 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-xs font-semibold text-slate-700">Listening...</span>
                        </div>
                        {/* Language Picker */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowLangPicker(v => !v)}
                                className="text-xs text-slate-500 hover:text-blue-600 border border-slate-200 rounded-lg px-2 py-1 transition-colors"
                            >
                                {LANGUAGES.find(l => l.code === lang)?.label ?? 'EN'} ▾
                            </button>
                            {showLangPicker && (
                                <div className="absolute right-0 top-8 bg-white border border-slate-100 rounded-xl shadow-xl z-50 w-36 overflow-hidden">
                                    {LANGUAGES.map(l => (
                                        <button
                                            key={l.code}
                                            type="button"
                                            onClick={() => switchLang(l.code)}
                                            className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 transition-colors ${lang === l.code ? 'text-blue-600 font-semibold' : 'text-slate-600'}`}
                                        >
                                            {l.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Waveform bars */}
                    <div className="flex items-center justify-center gap-0.5 h-10 mb-3 px-2">
                        {bars.map((h, i) => (
                            <div key={i} className="w-1.5 rounded-full bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-75" style={{ height: `${h}px` }} />
                        ))}
                    </div>

                    {/* Live transcript */}
                    <div className="min-h-[44px] bg-slate-50 rounded-xl px-3 py-2 mb-3 text-sm leading-relaxed">
                        {finalText && <span className="text-slate-800">{finalText}</span>}
                        {interimText && <span className="text-slate-400 italic"> {interimText}</span>}
                        {!finalText && !interimText && <span className="text-slate-400 text-xs">Start speaking...</span>}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                        <button type="button" onClick={cancel}
                            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500 border border-slate-200 py-2 rounded-xl hover:bg-slate-50 transition-colors">
                            <X size={13} /> Cancel
                        </button>
                        <button type="button" onClick={confirmText} disabled={!finalText && !interimText}
                            className="flex-1 text-xs font-semibold text-white bg-[#0F3460] py-2 rounded-xl hover:bg-blue-900 disabled:opacity-40 transition-colors">
                            Use Text ✓
                        </button>
                    </div>
                </div>
            )}

            {/* Mic Button */}
            <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={`p-3 rounded-full flex-shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400
                    ${isRecording ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 scale-110' : 'bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600'}`}
                title={isRecording ? 'Stop Recording' : 'Voice Input (Free — uses browser mic)'}
            >
                {isRecording ? <MicOff size={20} className="animate-pulse" /> : <Mic size={20} />}
            </button>
        </div>
    );
}
