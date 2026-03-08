'use client';

export type QueryType = 'general' | 'symptom' | 'clinical' | 'drug';

interface ModelTabsProps {
    value: QueryType;
    onChange: (type: QueryType) => void;
}

const QUERY_TYPES: { value: QueryType; label: string; description: string; color: string }[] = [
    {
        value: 'general',
        label: 'General',
        description: 'Balanced response from all 3 models',
        color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/30',
    },
    {
        value: 'symptom',
        label: 'Symptoms',
        description: 'Patient-friendly explanation focus',
        color: 'bg-violet-500/20 text-violet-300 border-violet-500/30 hover:bg-violet-500/30',
    },
    {
        value: 'clinical',
        label: 'Clinical',
        description: 'Clinical reasoning & guidelines focus',
        color: 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30',
    },
    {
        value: 'drug',
        label: 'Medications',
        description: 'Drug info & pharmacology focus',
        color: 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30',
    },
];

export default function ModelTabs({ value, onChange }: ModelTabsProps) {
    const active = QUERY_TYPES.find(t => t.value === value) ?? QUERY_TYPES[0];

    return (
        <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Query Focus</p>
            <div className="flex flex-wrap gap-2">
                {QUERY_TYPES.map(tab => (
                    <button
                        key={tab.value}
                        onClick={() => onChange(tab.value)}
                        title={tab.description}
                        className={`text-xs px-3.5 py-1.5 rounded-full font-semibold border transition-all whitespace-nowrap
                            ${value === tab.value
                                ? tab.color.replace('hover:', '')
                                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">{active.description}</p>
        </div>
    );
}
