'use client';
import MedicalDisclaimer from '@/components/chat/MedicalDisclaimer';
import PaywallModal from '@/components/chat/PaywallModal';
import LabResultCard from '@/components/lab/LabResultCard';
import UploadZone from '@/components/lab/UploadZone';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { LabResponse } from '@/lib/types';
import { Activity, AlertTriangle, CheckCircle2, FileText } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function LabReportPage() {
    const { isLoggedIn, loading: authLoading } = useAuth();
    const [file, setFile] = useState<File | null>(null);

    // States
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const [result, setResult] = useState<LabResponse | null>(null);
    const [error, setError] = useState('');
    const [paywallOpen, setPaywallOpen] = useState(false);

    // Fake loading sequence for better UX
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (loading) {
            setLoadingStep(1); // Extracting text
            interval = setInterval(() => {
                setLoadingStep(prev => {
                    if (prev >= 3) return 3;
                    return prev + 1;
                });
            }, 2500); // Progress every 2.5s: 1->Text, 2->Parsing, 3->AI
        }
        return () => clearInterval(interval);
    }, [loading]);

    const handleUpload = async (selectedFile: File) => {
        setFile(selectedFile);
        setLoading(true);
        setError('');
        setResult(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const resp = await api.post<LabResponse>('/api/v1/lab-report/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(resp.data);
        } catch (err: any) {
            const errDetail = err.response?.data?.detail?.toLowerCase() || '';
            if (errDetail.includes('limit') || errDetail.includes('plan')) {
                setPaywallOpen(true);
            } else {
                setError(err.response?.data?.detail || 'Failed to analyze lab report. Please ensure it is a clear PDF or Image.');
            }
            setFile(null);
        } finally {
            setLoading(false);
            setLoadingStep(0);
        }
    };

    if (authLoading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-cyan-500/20 mb-8 pt-10">
                        <FileText className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-800 mb-4 font-display tracking-tight">AI Lab Analysis</h2>
                    <p className="text-slate-500 mb-8 max-w-md text-lg leading-relaxed">
                        Instantly extract values from your medical reports and get plain-english interpretations from our clinical AI ensemble.
                    </p>
                    <Link href="/login" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                        Sign in to Upload
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-16">
            <Navbar />
            <PaywallModal isOpen={paywallOpen} onClose={() => setPaywallOpen(false)} title="Upgrade to Pro" message="Lab report analysis requires heavy AI vision models and is restricted to Pro plan users." />

            <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-16">

                {/* Header section */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-display">
                        Lab Report Intelligence
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
                        Drop your blood test, lipid panel, or general lab report. We extract the biomarkers and explain what they mean.
                    </p>
                </div>

                {/* Upload State */}
                {!result && (
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-2 max-w-3xl mx-auto">
                        <UploadZone onFileSelect={handleUpload} isLoading={loading} />

                        {loading && (
                            <div className="w-full mt-6 mb-4 px-8 text-center animate-in fade-in duration-500">
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4 relative">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-1000 ease-out rounded-full"
                                        style={{ width: `${(loadingStep / 3) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs font-semibold text-slate-400">
                                    <span className={loadingStep >= 1 ? 'text-cyan-600' : ''}>1. OCR Extraction</span>
                                    <span className={loadingStep >= 2 ? 'text-cyan-600' : ''}>2. Parsing Values</span>
                                    <span className={loadingStep >= 3 ? 'text-cyan-600' : ''}>3. AI Analysis</span>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-200 text-center animate-in slide-in-from-top-2">
                                <AlertTriangle className="inline-block mr-2 mb-1" size={18} />
                                {error}
                            </div>
                        )}
                    </div>
                )}

                {/* Results State */}
                {result && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-800 font-display flex items-center gap-3">
                                <Activity className="text-cyan-500" /> Analysis Complete
                            </h2>
                            <button
                                onClick={() => { setResult(null); setFile(null); }}
                                className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
                            >
                                Upload another report
                            </button>
                        </div>

                        {/* Traffic Light Summary */}
                        <div className={`rounded-3xl p-8 border ${result.abnormal_count > 0 ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-amber-500/5' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-green-500/5'} shadow-lg relative overflow-hidden`}>
                            {/* Decorative background circle */}
                            <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-50 ${result.abnormal_count > 0 ? 'bg-amber-400' : 'bg-green-400'}`}></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm
                  ${result.abnormal_count > 0 ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                                    {result.abnormal_count > 0 ? <AlertTriangle size={32} /> : <CheckCircle2 size={32} />}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                                        {result.abnormal_count > 0
                                            ? `${result.abnormal_count} Abnormal Values Detected`
                                            : 'All Biometrics within Normal Range'}
                                    </h3>
                                    <p className="text-slate-700 text-lg leading-relaxed">{result.summary}</p>
                                </div>
                            </div>
                        </div>

                        {/* AI Explanation Markdown */}
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-10">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 font-display border-b border-slate-100 pb-4">
                                Clinical Interpretation
                            </h3>
                            <div className="prose prose-slate prose-lg max-w-none text-slate-600">
                                <ReactMarkdown>{result.ensemble_interpretation}</ReactMarkdown>
                            </div>
                        </div>

                        {/* Test Cards Grid */}
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 font-display">Extracted Data Points ({result.total_tests})</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {result.parsed_results.map((test, idx) => (
                                    <LabResultCard key={idx} result={test} />
                                ))}
                            </div>
                        </div>

                        <div className="mt-12 text-center pb-12">
                            <MedicalDisclaimer />
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
}
