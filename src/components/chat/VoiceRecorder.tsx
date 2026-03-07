'use client';
import { Mic, Square } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface VoiceRecorderProps {
    onTranscription: (text: string) => void;
    isRecording: boolean;
    setIsRecording: (val: boolean) => void;
}

export default function VoiceRecorder({ onTranscription, isRecording, setIsRecording }: VoiceRecorderProps) {
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        // Setup Web Speech API if supported
        if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event: any) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript) {
                    onTranscription(finalTranscript);
                }
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error', event.error);
                setIsRecording(false);
            };

            recognitionRef.current.onend = () => {
                setIsRecording(false);
            };
        }
    }, [onTranscription, setIsRecording]);

    const toggleRecording = () => {
        if (!recognitionRef.current) {
            alert('Speech recognition is not supported in this browser.');
            return;
        }

        if (isRecording) {
            recognitionRef.current.stop();
            setIsRecording(false);
        } else {
            recognitionRef.current.start();
            setIsRecording(true);
        }
    };

    return (
        <button
            type="button"
            onClick={toggleRecording}
            className={`p-3 rounded-full flex-shrink-0 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-cyan-500
        ${isRecording
                    ? 'bg-red-50 text-red-500 hover:bg-red-100 animate-pulse'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800'
                }
      `}
            title={isRecording ? "Stop Recording" : "Start Voice Input"}
        >
            {isRecording ? <Square size={20} className="fill-current" /> : <Mic size={20} />}
        </button>
    );
}
