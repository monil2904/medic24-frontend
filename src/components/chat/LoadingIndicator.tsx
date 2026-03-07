'use client';

export default function LoadingIndicator() {
    return (
        <div className="flex flex-col space-y-3 p-5 bg-white border border-slate-100 rounded-3xl rounded-tl-none shadow-sm max-w-sm w-full animate-pulse">
            <div className="flex items-center gap-3">
                <div className="flex gap-1.5 p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm font-medium text-slate-500">Ensemble analyzing...</span>
            </div>
            <div className="h-2 bg-slate-100 rounded w-full"></div>
            <div className="h-2 bg-slate-100 rounded w-5/6"></div>
            <div className="h-2 bg-slate-100 rounded w-4/6"></div>
        </div>
    );
}
