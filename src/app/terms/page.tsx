import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export const metadata = {
    title: 'Terms of Service — Medic24 AI',
    description: 'Terms of Service for Medic24 AI.',
};

export default function TermsPage() {
    return (
        <div className="bg-[#0B1120] min-h-screen text-slate-300">
            <Navbar />
            <div className="max-w-4xl mx-auto py-24 sm:py-32 px-4 sm:px-6">
                
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                            <FileText className="text-teal-400 w-6 h-6" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Terms of Service</h1>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Last Updated: March 2026</p>
                </div>

                <div className="bg-[#1E293B]/50 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl space-y-10 leading-relaxed text-sm">
                    
                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">1. ACCEPTANCE OF TERMS</h2>
                        <p>
                            By accessing or using Medic24 AI (medic24.io and the Medic24 AI mobile application), operated by AM24 Labs, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">2. DESCRIPTION OF SERVICE</h2>
                        <p className="mb-3">
                            Medic24 AI is an AI-powered healthcare INFORMATION platform that provides:
                        </p>
                        <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
                            <li>AI-generated responses to medical queries</li>
                            <li>Lab report analysis and interpretation</li>
                            <li>Medicine information lookup</li>
                            <li>Health calculators and tools</li>
                            <li>First aid reference guides</li>
                            <li>Medical image analysis</li>
                        </ul>
                        
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-5">
                            <p className="text-amber-200/90 leading-relaxed font-semibold">
                                <strong className="text-amber-400">IMPORTANT:</strong> Medic24 AI is NOT a medical provider, hospital, clinic, or licensed healthcare service. We provide INFORMATION only — not diagnosis, treatment, or prescriptions.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">3. ELIGIBILITY</h2>
                        <p className="mb-3">You must be:</p>
                        <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
                            <li>At least 18 years of age</li>
                            <li>Capable of forming a legally binding agreement</li>
                            <li>A resident of India (for payment and subscription features)</li>
                        </ul>
                        <p>By creating an account, you represent that you meet these requirements.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">4. USER ACCOUNTS</h2>
                        
                        <h3 className="text-lg font-bold text-slate-200 mt-6 mb-3">4.1 Registration:</h3>
                        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
                            <li>You must provide accurate and complete information</li>
                            <li>You are responsible for maintaining account security</li>
                            <li>You must not share your account credentials</li>
                            <li>One account per person</li>
                        </ul>

                        <h3 className="text-lg font-bold text-slate-200 mt-6 mb-3">4.2 Account Termination:</h3>
                        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
                            <li>You may delete your account at any time from Settings</li>
                            <li>We may suspend or terminate accounts that violate these terms</li>
                            <li>Upon termination, your data will be deleted per our Privacy Policy</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">5. ACCEPTABLE USE</h2>
                        <p className="mb-3">You agree NOT to:</p>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li>Use Medic24 AI as a substitute for professional medical care</li>
                            <li>Delay seeking emergency medical treatment based on AI responses</li>
                            <li>Upload false or misleading medical information</li>
                            <li>Attempt to reverse-engineer our AI models</li>
                            <li>Use automated scripts or bots to access the service</li>
                            <li>Scrape, copy, or redistribute our content</li>
                            <li>Use the service for illegal purposes</li>
                            <li>Impersonate another person or entity</li>
                            <li>Upload malicious files or harmful content</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">6. MEDICAL DISCLAIMER</h2>
                        
                        <h3 className="text-lg font-bold text-slate-200 mt-6 mb-3">6.1 Medic24 AI provides INFORMATIONAL content only. It does NOT:</h3>
                        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
                            <li>Diagnose medical conditions</li>
                            <li>Prescribe medications or treatments</li>
                            <li>Replace professional medical advice</li>
                            <li>Establish a doctor-patient relationship</li>
                        </ul>

                        <h3 className="text-lg font-bold text-slate-200 mt-6 mb-3">6.2 AI responses may contain errors, omissions, or inaccuracies.</h3>
                        <p className="mb-3">You should ALWAYS:</p>
                        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
                            <li>Consult a qualified doctor before making health decisions</li>
                            <li>Seek emergency medical help for urgent symptoms (Call 112)</li>
                            <li>Verify AI-generated information with your healthcare provider</li>
                            <li>Not rely solely on AI output for critical health decisions</li>
                        </ul>

                        <h3 className="text-lg font-bold text-slate-200 mt-6 mb-3">6.3 Limitation:</h3>
                        <p>
                            We are not responsible for any health outcomes resulting from the use or misuse of information provided by Medic24 AI.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">7. SUBSCRIPTION PLANS AND PAYMENTS</h2>
                        
                        <h3 className="text-lg font-bold text-slate-200 mt-6 mb-3">7.1 Plans:</h3>
                        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
                            <li><strong>Free:</strong> Limited daily queries at no cost</li>
                            <li><strong>Basic (₹99/month):</strong> Increased limits</li>
                            <li><strong>Pro (₹299/month):</strong> Unlimited text, image, voice queries</li>
                            <li><strong>Medical Pro (₹999/month):</strong> All features + unlimited lab reports</li>
                        </ul>

                        <h3 className="text-lg font-bold text-slate-200 mt-6 mb-3">7.2 Payment:</h3>
                        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
                            <li>Payments processed securely via Razorpay</li>
                            <li>Prices are in Indian Rupees (INR) and include applicable taxes</li>
                            <li>Subscriptions auto-renew unless cancelled</li>
                        </ul>

                        <h3 className="text-lg font-bold text-slate-200 mt-6 mb-3">7.3 Refund Policy:</h3>
                        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
                            <li>Refunds available within 7 days of payment if service is materially defective</li>
                            <li>No refunds for partial month usage after 7-day window</li>
                            <li>Contact <a href="mailto:am24@medic24.io" className="text-teal-400 hover:underline">am24@medic24.io</a> for refund requests</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">8. INTELLECTUAL PROPERTY</h2>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li><strong>8.1</strong> Medic24 AI, including its design, code, AI models integration, content, and branding, is the intellectual property of AM24 Labs.</li>
                            <li><strong>8.2</strong> You may not copy, modify, distribute, or create derivative works from our service without written permission.</li>
                            <li><strong>8.3</strong> AI-generated responses are provided for your personal use. You may share individual responses but may not systematically collect or redistribute them.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">9. LIMITATION OF LIABILITY</h2>
                        <p className="mb-3"><strong>9.1</strong> Medic24 AI is provided &quot;AS IS&quot; without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or accuracy of AI-generated content.</p>
                        <p className="mb-3"><strong>9.2</strong> AM24 Labs shall not be liable for:</p>
                        <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
                            <li>Any medical decisions made based on AI responses</li>
                            <li>Inaccuracies in AI-generated medical information</li>
                            <li>Service interruptions or downtime</li>
                            <li>Data loss due to technical issues</li>
                            <li>Any indirect, consequential, or incidental damages</li>
                        </ul>
                        <p><strong>9.3</strong> Our total liability shall not exceed the amount you paid for the service in the 12 months preceding the claim.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">10. INDEMNIFICATION</h2>
                        <p>
                            You agree to indemnify and hold harmless AM24 Labs, its founders, employees, and affiliates from any claims, damages, or expenses arising from your use of the service or violation of these terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">11. GOVERNING LAW AND DISPUTES</h2>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li><strong>11.1</strong> These terms are governed by the laws of India.</li>
                            <li><strong>11.2</strong> Any disputes shall be subject to the exclusive jurisdiction of the courts in Vadodara, Gujarat, India.</li>
                            <li><strong>11.3</strong> Before filing any legal action, both parties agree to attempt resolution through good-faith negotiation for 30 days.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">12. CHANGES TO TERMS</h2>
                        <p>
                            We may modify these terms at any time. Significant changes will be communicated via email or in-app notification at least 15 days before taking effect. Continued use after changes constitutes acceptance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">13. CONTACT</h2>
                        <p className="mb-2"><strong>AM24 Labs</strong></p>
                        <p className="mb-2">Parul University, Vadodara, Gujarat 391760, India</p>
                        <p className="mb-2"><strong>Email:</strong> <a href="mailto:am24@medic24.io" className="text-teal-400 hover:underline">am24@medic24.io</a></p>
                        <p><strong>Website:</strong> <a href="https://medic24.io" className="text-teal-400 hover:underline">medic24.io</a></p>
                    </section>

                    <div className="pt-8 border-t border-slate-800 text-center">
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
