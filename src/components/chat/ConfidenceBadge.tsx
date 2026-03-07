export default function ConfidenceBadge({ score }: { score?: number }) {
    if (!score) return null;
    const percentage = Math.round(score * 100);
    let color = 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    if (percentage < 70) color = 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    if (percentage < 40) color = 'bg-red-500/10 text-red-600 border-red-500/20';

    return (
        <span className={`px-2 py-0.5 text-[10px] sm:text-xs font-bold rounded-full border ${color} inline-flex items-center gap-1`}>
            {percentage >= 70 ? 'High' : percentage >= 40 ? 'Medium' : 'Low'} Confidence ({percentage}%)
        </span>
    );
}
