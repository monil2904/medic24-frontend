'use client';

import { Check } from 'lucide-react';

interface ModelTabsProps {
    selectedMode: string;
    onSelect: (mode: string) => void;
}

const models = [
    {
        id: 'ensemble',
        emoji: '⚡',
        label: 'Ensemble',
        subtitle: 'All 3 models',
        tag: 'Best accuracy',
        accent: { ring: 'ring-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', tagBg: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
    },
    {
        id: 'gemma',
        emoji: '🔬',
        label: 'Clinical',
        subtitle: 'Gemma 3 27B',
        tag: 'Images + diagnosis',
        accent: { ring: 'ring-violet-500', bg: 'bg-violet-50', text: 'text-violet-700', tagBg: 'bg-violet-100 text-violet-700', dot: 'bg-violet-500' },
    },
    {
        id: 'mistral',
        emoji: '📋',
        label: 'Guidelines',
        subtitle: 'Mistral 7B',
        tag: 'Fastest',
        accent: { ring: 'ring-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700', tagBg: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
    },
    {
        id: 'llama',
        emoji: '💬',
        label: 'Easy Explain',
        subtitle: 'Llama 3.1 8B',
        tag: 'Simple language',
        accent: { ring: 'ring-amber-500', bg: 'bg-amber-50', text: 'text-amber-700', tagBg: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
    },
];

export default function ModelTabs({ selectedMode, onSelect }: ModelTabsProps) {
    return (
        <div className="w-full mb-3">
            {/* Tabs row */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x">
                {models.map((m) => {
                    const active = selectedMode === m.id;
                    return (
                        <button
                            key={m.id}
                            onClick={() => onSelect(m.id)}
                            className={`group relative flex items-center gap-2.5 flex-none snap-start px-4 py-2.5 rounded-xl border-2 transition-all duration-200 outline-none
                                ${active
                                    ? `${m.accent.bg} ${m.accent.ring} ring-2 border-transparent shadow-sm`
                                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                                }`}
                        >
                            {/* Emoji */}
                            <span className="text-base leading-none">{m.emoji}</span>

                            {/* Labels */}
                            <div className="text-left min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className={`text-sm font-bold whitespace-nowrap ${active ? m.accent.text : 'text-slate-800'}`}>
                                        {m.label}
                                    </span>
                                    {active && (
                                        <span className={`inline-flex items-center justify-center w-4 h-4 rounded-full ${m.accent.dot}`}>
                                            <Check size={10} className="text-white" strokeWidth={3} />
                                        </span>
                                    )}
                                </div>
                                <span className={`text-[11px] leading-tight whitespace-nowrap ${active ? m.accent.text + ' opacity-70' : 'text-slate-500'}`}>
                                    {m.subtitle}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Active model info strip */}
            <div className="mt-2 flex items-center justify-center gap-1.5">
                {(() => {
                    const active = models.find(m => m.id === selectedMode);
                    if (!active) return null;
                    return (
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${active.accent.tagBg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${active.accent.dot}`} />
                            {active.tag}
                        </span>
                    );
                })()}
            </div>
        </div>
    );
}
