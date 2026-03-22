'use client';

interface ModelTabsProps {
    selectedMode: string;
    onSelect: (mode: string) => void;
}

const models = [
    { id: 'ensemble', emoji: '⚡', label: 'Ensemble' },
    { id: 'gemma', emoji: '🔬', label: 'Clinical' },
    { id: 'qwen', emoji: '📋', label: 'Guidelines' },
    { id: 'llama', emoji: '💬', label: 'Simple Explain' }
];

export default function ModelTabs({ selectedMode, onSelect }: ModelTabsProps) {
    return (
        <div className="w-full mb-3 flex justify-center">
            <div className="bg-slate-100/90 p-1.5 rounded-2xl flex items-center gap-1 shadow-inner border border-slate-200/60 overflow-x-auto max-w-full scrollbar-hide snap-x">
                {models.map((m) => {
                    const active = selectedMode === m.id;
                    return (
                        <button
                            key={m.id}
                            onClick={() => onSelect(m.id)}
                            className={`relative px-4 py-2 flex-shrink-0 flex items-center gap-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 outline-none snap-start
                                ${active
                                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80 ring-1 ring-slate-900/5 scale-100'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 border border-transparent scale-95'
                                }`}
                        >
                            <span className="text-sm sm:text-base leading-none opacity-90">{m.emoji}</span>
                            {m.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
