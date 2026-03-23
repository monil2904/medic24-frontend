import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export const metadata = {
    title: 'Medical Disclaimer — Medic24 AI',
    description: 'Medical Disclaimer for Medic24 AI.',
};

export default function DisclaimerPage() {
    return (
        <div className="bg-[#0B1120] min-h-screen text-slate-300">
            <Navbar />
            <div className="max-w-4xl mx-auto py-24 sm:py-32 px-4 sm:px-6">
                
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                            <AlertTriangle className="text-amber-500 w-6 h-6" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Medical Disclaimer</h1>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Last Updated: March 2026</p>
                </div>

                <div className="bg-[#1E293B]/50 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl space-y-10 leading-relaxed text-sm">
                    
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
                        <h2 className="text-xl font-black text-amber-500 mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-6 h-6" />
                            IMPORTANT — PLEASE READ CAREFULLY
                        </h2>
                        <p className="text-amber-200/90 leading-relaxed font-semibold text-base mb-4">
                            Medic24 AI is an INFORMATIONAL TOOL ONLY.
                        </p>
                        <p className="text-amber-200/90 leading-relaxed font-semibold mb-2">It does NOT provide:</p>
                        <ul className="list-disc list-outside ml-6 space-y-2 text-amber-200/80 mb-6">
                            <li>Medical diagnosis</li>
                            <li>Medical treatment recommendations</li>
                            <li>Prescription of medications</li>
                            <li>Professional medical advice</li>
                            <li>Emergency medical services</li>
                        </ul>
                    </div>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">WHAT MED24 AI IS:</h2>
                        <p>
                            Medic24 AI is an artificial intelligence-powered platform that provides general health information based on publicly available medical knowledge. It uses three AI language models (Gemma, Mistral, Llama) to generate responses to health-related queries. These models are trained on general medical literature and may not reflect the most current medical guidelines.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">WHAT MED24 AI IS NOT:</h2>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li>Medic24 AI is NOT a doctor, nurse, or licensed medical professional</li>
                            <li>Medic24 AI is NOT a substitute for professional medical consultation</li>
                            <li>Medic24 AI is NOT a regulated medical device</li>
                            <li>Medic24 AI does NOT establish a doctor-patient relationship</li>
                            <li>Medic24 AI is NOT certified for clinical use</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">AI LIMITATIONS:</h2>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li>AI responses may contain errors, inaccuracies, or outdated information</li>
                            <li>AI cannot examine you physically or access your complete medical history</li>
                            <li>AI cannot account for drug interactions specific to your medications</li>
                            <li>AI confidence scores are algorithmic estimates, not clinical certainty</li>
                            <li>AI may miss critical symptoms or conditions</li>
                            <li>AI responses vary and may not be consistent across queries</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">LAB REPORT ANALYSIS:</h2>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li>Lab report parsing uses OCR (Optical Character Recognition) which may misread values from scanned documents</li>
                            <li>Reference ranges may vary between laboratories</li>
                            <li>AI interpretation of lab values is general and may not account for your specific medical conditions, medications, or history</li>
                            <li>Always verify AI-parsed lab values against your original report</li>
                            <li>Discuss ALL lab results with your doctor</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">MEDICAL IMAGE ANALYSIS:</h2>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li>Image analysis is powered by general-purpose AI models, NOT clinically validated medical imaging systems</li>
                            <li>AI cannot replace radiologist or dermatologist evaluation</li>
                            <li>Image quality, lighting, and angle affect AI accuracy</li>
                            <li>Do NOT rely on AI image analysis for skin cancer screening, fracture detection, or any diagnostic purpose</li>
                        </ul>
                    </section>

                    <section className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 md:p-8">
                        <h2 className="text-2xl font-black text-red-500 mb-4 flex items-center gap-2">
                            <span className="text-3xl">🚨</span> EMERGENCY WARNING
                        </h2>
                        <p className="text-red-200/90 leading-relaxed font-semibold mb-4 text-base">
                            If you are experiencing any of the following, STOP using this app and CALL 112 (India) or go to your nearest emergency room IMMEDIATELY:
                        </p>
                        <ul className="list-disc list-outside ml-6 space-y-2 text-red-200/80 mb-8 font-medium">
                            <li>Chest pain or difficulty breathing</li>
                            <li>Signs of stroke (face drooping, arm weakness, speech difficulty)</li>
                            <li>Severe bleeding that won&apos;t stop</li>
                            <li>Loss of consciousness</li>
                            <li>Severe allergic reaction (anaphylaxis)</li>
                            <li>Suicidal thoughts or self-harm</li>
                            <li>Poisoning or drug overdose</li>
                            <li>Seizures lasting more than 5 minutes</li>
                        </ul>
                        <a href="tel:112" className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold text-xl py-4 rounded-xl transition-colors shadow-lg shadow-red-600/20">
                            CALL 112 NOW
                        </a>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">YOUR RESPONSIBILITY:</h2>
                        <p className="mb-3">By using Medic24 AI, you acknowledge and agree that:</p>
                        <ol className="list-decimal list-outside ml-5 space-y-2">
                            <li>You will NOT use AI responses as the sole basis for medical decisions</li>
                            <li>You will consult a qualified healthcare professional for all medical concerns</li>
                            <li>You understand that AI-generated information may be inaccurate</li>
                            <li>You will seek emergency medical help for urgent symptoms</li>
                            <li>You are solely responsible for your health decisions</li>
                            <li>AM24 Labs is not liable for any outcomes resulting from use of this information</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">REGULATORY STATUS:</h2>
                        <p className="mb-3">Medic24 AI is NOT approved, cleared, or certified by:</p>
                        <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
                            <li>Central Drugs Standard Control Organisation (CDSCO)</li>
                            <li>Medical Council of India (MCI/NMC)</li>
                            <li>U.S. Food and Drug Administration (FDA)</li>
                            <li>Any other medical regulatory authority</li>
                        </ul>
                        <p>This product is classified as a general wellness and health information tool, not a medical device.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">FOR HEALTHCARE PROFESSIONALS:</h2>
                        <p>
                            If you are a healthcare professional using Medic24 AI, please note that AI responses should be used as supplementary reference only, not as clinical decision support. Always apply your professional judgment and follow established clinical guidelines.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">CONTACT:</h2>
                        <p className="mb-2">If you have concerns about the accuracy of AI-generated content or wish to report a safety issue:</p>
                        <ul className="list-none space-y-2">
                            <li><strong>Email:</strong> <a href="mailto:am24@medic24.io" className="text-teal-400 hover:underline">am24@medic24.io</a></li>
                            <li><strong>Emergency:</strong> Call 112 (India)</li>
                        </ul>
                    </section>

                    <div className="pt-8 pb-4 text-center mt-8">
                        <p className="text-slate-500 mb-6 font-medium text-xs text-center border-t border-slate-800 pt-8">
                            © 2026 AM24 Labs. All rights reserved.
                        </p>
                        <Link href="/" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
                            &larr; Back to Home
                        </Link>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}
