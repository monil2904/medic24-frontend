import Navbar from '@/components/layout/Navbar';
import { AlertTriangle, CheckCircle2, Phone, Stethoscope, XCircle } from 'lucide-react';

export const metadata = {
    title: 'Medical Disclaimer — Med24 AI',
    description: 'Important disclaimer about the limitations of Med24 AI medical information.',
};

export default function DisclaimerPage() {
    return (
        <div className="bg-slate-950 min-h-screen text-white">
            <Navbar />
            <div className="max-w-3xl mx-auto py-28 px-4 sm:px-6">
                <div className="mb-12 text-center">
                    <div className="w-20 h-20 rounded-3xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle size={36} className="text-amber-400" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">Important Notice</span>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">Medical Disclaimer</h1>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Please read this disclaimer carefully before using Med24 AI for any health-related purpose.
                    </p>
                </div>

                {/* Emergency callout */}
                <div className="mb-10 p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex gap-4 items-start">
                    <Phone size={24} className="text-rose-400 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-rose-300 font-bold text-base">🚨 Medical Emergency?</p>
                        <p className="text-rose-300 text-sm mt-1 leading-6">
                            Do NOT use Med24 AI for emergencies. Call <strong className="text-white text-lg">112</strong> (India Emergency) immediately or go to your nearest hospital emergency department.
                        </p>
                    </div>
                </div>

                <div className="space-y-8 text-slate-300 text-sm leading-7">

                    {/* What Med24 AI is NOT */}
                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                            <XCircle size={18} className="text-rose-400" /> What Med24 AI is NOT
                        </h2>
                        <ul className="space-y-3">
                            {[
                                'A licensed medical provider or healthcare service',
                                'A replacement for doctors, nurses, or other healthcare professionals',
                                'A diagnostic tool — it cannot diagnose any medical condition',
                                'A prescription service — it cannot prescribe or recommend medications for your specific case',
                                'An emergency service — for emergencies, call 112 immediately',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-slate-400">
                                    <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* What Med24 AI IS */}
                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-emerald-400" /> What Med24 AI IS
                        </h2>
                        <ul className="space-y-3">
                            {[
                                'An AI-powered general health information reference tool',
                                'A platform for educational understanding of medical topics',
                                'A tool to help you form better questions for your doctor',
                                'An aid for understanding lab report values in general terms',
                                'A starting point — not a final answer — for health queries',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-slate-400">
                                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* AI Limitations */}
                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2 flex items-center gap-2">
                            <Stethoscope size={18} className="text-cyan-400" /> AI System Limitations
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-slate-400">
                            <li>AI responses may be inaccurate, incomplete, or outdated</li>
                            <li>AI cannot examine you physically or review your full medical history</li>
                            <li>AI models may "hallucinate" — generating plausible-sounding but incorrect information</li>
                            <li>Medical knowledge evolves; AI responses may not reflect the latest guidelines</li>
                            <li>Individual medical needs vary significantly — general information may not apply to you</li>
                        </ul>
                    </section>

                    {/* Advice */}
                    <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
                        <h2 className="text-base font-bold text-cyan-300 mb-3">Always Consult a Doctor</h2>
                        <p className="text-slate-400 leading-6">
                            For any health concern, symptom, medication question, or medical condition — always consult a qualified, licensed healthcare provider. Med24 AI responses should never be used as the sole basis for any medical decision.
                        </p>
                    </div>

                    <p className="text-slate-500 text-xs border-t border-slate-800 pt-6">
                        By using Med24 AI, you acknowledge that you have read, understood, and agree to be bound by this disclaimer. This disclaimer was last updated March 2025.
                    </p>

                </div>
            </div>
        </div>
    );
}
