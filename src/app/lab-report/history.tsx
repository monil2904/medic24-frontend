'use client';
import Navbar from '@/components/layout/Navbar';
import api from '@/lib/api';
import { AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Clock, FileText, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

type TestResult = {
    test: string;
    value: string;
    unit: string;
    range: string;
    flag: string;
};

type LabReport = {
    id: string;
    file_url: string;
    summary: string;
    abnormal_count: number;
    total_tests: number;
    confidence: number;
    interpretation: string;
    parsed_data: TestResult[];
    created_at: string;
};

function AbnormalBadge({ count, total }: { count: number; total: number }) {
    const hasAbnormal = count > 0;
    return (
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border flex items-center gap-1.5 ${
            hasAbnormal
                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
        }`}>
            {hasAbnormal ? <AlertTriangle size={12} /> : <CheckCircle size={12} />}
            {count} of {total} abnormal
        </span>
    );
}

function ConfidenceBadge({ value }: { value: number }) {
    const pct = Math.round(value * 100);
    const color = pct >= 67 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
        : pct >= 34 ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            : 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    return (
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${color}`}>
            {pct}% confidence
        </span>
    );
}

function TestFlag({ flag }: { flag: string }) {
    const colorMap: Record<string, string> = {
        'HIGH': 'bg-red-500/10 text-red-500',
        'LOW': 'bg-orange-500/10 text-orange-500',
        'NORMAL': 'bg-emerald-500/10 text-emerald-500',
        'CRITICAL': 'bg-red-600/10 text-red-600',
    };
    return (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${colorMap[flag] || 'bg-slate-500/10 text-slate-500'}`}>
            {flag}
        </span>
    );
}

function LabReportItem({ report }: { report: LabReport }) {
    const [expanded, setExpanded] = useState(false);
    const [showTests, setShowTests] = useState(false);
    const date = new Date(report.created_at).toLocaleString('en-IN', {
        dateStyle: 'medium', timeStyle: 'short',
    });

    // Get abnormal tests
    const abnormalTests = report.parsed_data.filter(t => ['HIGH', 'LOW', 'CRITICAL'].includes(t.flag));

    return (
        <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900 hover:border-slate-700 transition-colors">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full text-left p-5 flex items-start gap-4"
            >
                <div className="mt-1">
                    <FileText size={20} className="text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-slate-200 font-medium text-sm truncate pr-4">
                        {report.summary}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        <AbnormalBadge count={report.abnormal_count} total={report.total_tests} />
                        <ConfidenceBadge value={report.confidence} />
                        <span className="text-slate-500 text-[10px] flex items-center gap-1">
                            <Clock size={10} /> {date}
                        </span>
                    </div>
                </div>
                <span className="text-slate-500 mt-1 shrink-0">
                    {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
            </button>

            {expanded && (
                <div className="px-5 pb-5 border-t border-slate-800 pt-4 space-y-4">
                    {/* AI Interpretation */}
                    <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">AI Interpretation</h4>
                        <div className="prose prose-sm prose-invert max-w-none text-slate-300 text-sm leading-relaxed bg-slate-800/50 p-4 rounded-lg">
                            <ReactMarkdown>{report.interpretation}</ReactMarkdown>
                        </div>
                    </div>

                    {/* Abnormal Tests Summary */}
                    {abnormalTests.length > 0 && (
                        <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Abnormal Results</h4>
                            <div className="space-y-2">
                                {abnormalTests.slice(0, 5).map((test, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm bg-slate-800/50 p-3 rounded-lg">
                                        <span className="text-slate-300 flex-1">{test.test}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-400 text-xs">{test.value} {test.unit}</span>
                                            <TestFlag flag={test.flag} />
                                        </div>
                                    </div>
                                ))}
                                {abnormalTests.length > 5 && (
                                    <p className="text-slate-400 text-xs px-3">+{abnormalTests.length - 5} more abnormal results</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* View All Tests Toggle */}
                    <button
                        onClick={() => setShowTests(!showTests)}
                        className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold flex items-center gap-1 mt-2"
                    >
                        {showTests ? 'Hide' : 'View'} all {report.total_tests} tests
                        {showTests ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>

                    {/* All Tests */}
                    {showTests && (
                        <div className="bg-slate-800/50 p-4 rounded-lg max-h-96 overflow-y-auto">
                            <div className="space-y-2">
                                {report.parsed_data.map((test, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs border-b border-slate-700/50 pb-2 last:border-0">
                                        <span className="text-slate-400 flex-1">{test.test}</span>
                                        <span className="text-slate-400 w-20 text-right">{test.value} {test.unit}</span>
                                        <TestFlag flag={test.flag} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Download/View File */}
                    {report.file_url && (
                        <a
                            href={report.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold"
                        >
                            View original file →
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}

export default function LabReportHistoryPage() {
    const [reports, setReports] = useState<LabReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState('');
    const LIMIT = 10;

    const fetchReports = async (newOffset = 0, append = false) => {
        try {
            append ? setLoadingMore(true) : setLoading(true);
            const res = await api.get(`/api/v1/lab-report/history?limit=${LIMIT}&offset=${newOffset}`);
            const fetched: LabReport[] = res.data.reports;
            setReports(prev => append ? [...prev, ...fetched] : fetched);
            setHasMore(fetched.length === LIMIT);
            setOffset(newOffset + LIMIT);
        } catch (e: any) {
            setError(e.response?.data?.detail || 'Failed to load lab report history');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchReports(0, false);
    }, []);

    return (
        <div className="bg-slate-950 min-h-screen text-white">
            <Navbar />
            <div className="max-w-3xl mx-auto py-28 px-4 sm:px-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Lab Report History</h1>
                    <p className="text-slate-400 mt-1 text-sm">Your past medical lab analyses</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                    <Link
                        href="/lab-report"
                        className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                        <Zap size={14} /> Upload New Report
                    </Link>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg p-4 mb-6 text-sm">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-24 bg-slate-800 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && reports.length === 0 && (
                    <div className="text-center py-12">
                        <FileText size={48} className="mx-auto text-slate-600 mb-4" />
                        <p className="text-slate-400 mb-4">No lab reports yet</p>
                        <Link
                            href="/lab-report"
                            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors inline-block"
                        >
                            Upload Your First Report
                        </Link>
                    </div>
                )}

                {/* Reports List */}
                {!loading && reports.length > 0 && (
                    <>
                        <div className="space-y-4">
                            {reports.map((report, i) => (
                                <LabReportItem key={i} report={report} />
                            ))}
                        </div>

                        {/* Load More */}
                        {hasMore && (
                            <button
                                onClick={() => fetchReports(offset, true)}
                                disabled={loadingMore}
                                className="w-full mt-6 py-3 border border-slate-700 hover:border-slate-600 rounded-lg text-slate-400 hover:text-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loadingMore ? 'Loading...' : 'Load More Reports'}
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
