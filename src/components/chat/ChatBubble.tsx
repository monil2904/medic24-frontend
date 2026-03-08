'use client';
import { ChatMessage } from '@/lib/types';
import ReactMarkdown from 'react-markdown';
import ConfidenceBadge from './ConfidenceBadge';
import EmergencyAlert from './EmergencyAlert';
import MedicalDisclaimer from './MedicalDisclaimer';
import ModelTabs from './ModelTabs';

export default function ChatBubble({ msg }: { msg: ChatMessage }) {
    const isUser = msg.role === 'user';

    return (
        <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-[85%] sm:max-w-2xl flex flex-col ${isUser
                    ? 'items-end'
                    : 'items-start'
                    }`}
            >
                {/* Assistant Header Metadata */}
                {!isUser && (
                    <div className="flex flex-wrap items-center gap-2 mb-2 px-1">
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                            M
                        </div>
                        <span className="text-xs font-bold text-slate-700">Medic24 AI Ensemble</span>
                        <ConfidenceBadge score={msg.confidence} />
                    </div>
                )}

                {/* Bubble Content */}
                <div
                    className={`px-5 py-4 shadow-sm w-full ${isUser
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl rounded-tr-sm'
                        : 'bg-white border border-slate-100 text-slate-800 rounded-2xl rounded-tl-sm'
                        }`}
                >
                    {msg.is_emergency && <EmergencyAlert isEmergency={true} />}

                    {msg.base64Image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={msg.base64Image} alt="User uploaded" className="max-w-xs rounded-xl mb-3 shadow-md" />
                    )}

                    <div className={`text-sm md:text-base prose max-w-none ${isUser ? 'prose-invert text-white' : 'prose-slate'}`}>
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>

                    {!isUser && msg.individual_responses && (
                        <ModelTabs responses={msg.individual_responses} />
                    )}
                </div>

                {/* Disclaimer for Assistant */}
                {!isUser && <MedicalDisclaimer />}
            </div>
        </div>
    );
}
