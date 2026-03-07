'use client';
import { IndividualResponses } from '@/lib/types';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function ModelTabs({ responses }: { responses?: IndividualResponses }) {
    const [activeTab, setActiveTab] = useState<'medgemma' | 'meditron' | 'medichat'>('medgemma');

    if (!responses) return null;

    return (
        <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex gap-2 border-b border-slate-200 pb-2 mb-3 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setActiveTab('medgemma')}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap ${activeTab === 'medgemma' ? 'bg-cyan-100 text-cyan-800' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                >
                    MedGemma
                </button>
                <button
                    onClick={() => setActiveTab('meditron')}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap ${activeTab === 'meditron' ? 'bg-violet-100 text-violet-800' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                >
                    Meditron
                </button>
                <button
                    onClick={() => setActiveTab('medichat')}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap ${activeTab === 'medichat' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                >
                    MediChat
                </button>
            </div>

            <div className="text-sm prose prose-sm prose-slate max-w-none text-slate-600">
                <ReactMarkdown>{responses[activeTab] || 'No individual response generated.'}</ReactMarkdown>
            </div>
        </div>
    );
}
