import Navbar from '@/components/layout/Navbar';

export const metadata = {
    title: 'Privacy Policy — Med24 AI',
    description: 'How Med24 AI collects, uses, and protects your personal and medical data.',
};

export default function PrivacyPage() {
    return (
        <div className="bg-slate-950 min-h-screen text-white">
            <Navbar />
            <div className="max-w-3xl mx-auto py-28 px-4 sm:px-6">
                <div className="mb-12">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">Legal</span>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">Privacy Policy</h1>
                    <p className="text-slate-400">Last updated: March 2025</p>
                </div>

                <div className="space-y-10 text-slate-300 text-sm leading-7">

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">1. What Data We Collect</h2>
                        <p>Med24 AI collects the following categories of personal data when you use our service:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
                            <li><strong className="text-slate-300">Account Information:</strong> Name, email address, and (optionally) Google account ID</li>
                            <li><strong className="text-slate-300">Chat Queries:</strong> Text queries you submit to our AI, query type, and AI-generated responses</li>
                            <li><strong className="text-slate-300">Uploaded Files:</strong> Medical images and lab report files you upload for AI analysis</li>
                            <li><strong className="text-slate-300">Usage Data:</strong> Number of queries made, subscription plan, timestamps</li>
                            <li><strong className="text-slate-300">Payment Data:</strong> Razorpay payment IDs and subscription status (we do NOT store card details)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">2. How We Use Your Data</h2>
                        <ul className="list-disc list-inside space-y-1 text-slate-400">
                            <li>To provide AI-powered medical information responses</li>
                            <li>To enforce subscription plan limits (daily/monthly query quotas)</li>
                            <li>To improve our AI models and service quality</li>
                            <li>To process payments and manage subscriptions</li>
                            <li>To communicate important service updates</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">3. Data Storage & Security</h2>
                        <p>Your data is stored on encrypted servers. Our infrastructure spans:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
                            <li><strong className="text-slate-300">Database:</strong> Neon PostgreSQL (hosted in AWS Singapore region)</li>
                            <li><strong className="text-slate-300">File Storage:</strong> Google Cloud Storage (Mumbai / Singapore)</li>
                            <li><strong className="text-slate-300">Backend API:</strong> Google Cloud Run (Singapore)</li>
                        </ul>
                        <p className="mt-3">All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Access is restricted to authenticated users via JWT tokens.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">4. Third-Party Services</h2>
                        <ul className="list-disc list-inside space-y-1 text-slate-400">
                            <li><strong className="text-slate-300">Hugging Face:</strong> Your queries are processed by AI models hosted on Hugging Face Inference API</li>
                            <li><strong className="text-slate-300">Google Cloud:</strong> File storage for uploaded images and lab reports</li>
                            <li><strong className="text-slate-300">Razorpay:</strong> Payment processing (governed by Razorpay's own Privacy Policy)</li>
                            <li><strong className="text-slate-300">Google OAuth:</strong> Optional sign-in via Google account</li>
                        </ul>
                        <p className="mt-3">We do <strong className="text-white">not</strong> sell your personal or medical data to any third party.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">5. Your Rights</h2>
                        <p>Under the Digital Personal Data Protection Act 2023 (India) and IT Act 2000, you have the right to:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
                            <li><strong className="text-slate-300">Access:</strong> Request a copy of your stored data</li>
                            <li><strong className="text-slate-300">Correction:</strong> Request correction of inaccurate data</li>
                            <li><strong className="text-slate-300">Deletion:</strong> Request deletion of your account and associated data</li>
                            <li><strong className="text-slate-300">Export:</strong> Request your chat history in a portable format</li>
                            <li><strong className="text-slate-300">Grievance:</strong> Lodge a complaint with our grievance officer</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">6. Medical Disclaimer</h2>
                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm">
                            ⚠️ Med24 AI is NOT a licensed medical provider. Responses generated by our AI are for <strong>informational and educational purposes only</strong> and do not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical decisions.
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">7. Legal Compliance</h2>
                        <p>Med24 AI complies with:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
                            <li>Information Technology Act, 2000 (India)</li>
                            <li>Digital Personal Data Protection Act, 2023 (India)</li>
                            <li>IT (Reasonable Security Practices and Procedures) Rules, 2011</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">8. Contact</h2>
                        <p>For privacy-related queries or data deletion requests, contact our Grievance Officer:</p>
                        <div className="mt-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
                            <p className="text-white font-semibold">Med24 AI — Grievance Officer</p>
                            <p className="text-slate-400 mt-1">Email: <a href="mailto:privacy@med24ai.in" className="text-cyan-400 hover:underline">privacy@med24ai.in</a></p>
                            <p className="text-slate-400">Response time: Within 30 days of receipt</p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
