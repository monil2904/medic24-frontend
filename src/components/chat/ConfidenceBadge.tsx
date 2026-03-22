export default function ConfidenceBadge({ score }: { score?: number }) {
    if (!score) return null;
    const percentage = Math.round(score * 100);
    let color = 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    if (percentage < 70) color = 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    if (percentage < 40) color = 'bg-red-500/10 text-red-600 border-red-500/20';

    return (
        <span className={`px-1.5 py-0.5 border rounded-md text-[10px] sm:text-xs font-bold ${color}`}>
            {percentage}% Confident
        </span>
    );
}
