import Navbar from '@/components/layout/Navbar';

export const metadata = {
    title: 'Terms of Service — Med24 AI',
    description: 'Terms and conditions for using Med24 AI, the AI-powered medical information platform.',
};

export default function TermsPage() {
    return (
        <div className="bg-slate-950 min-h-screen text-white">
            <Navbar />
            <div className="max-w-3xl mx-auto py-28 px-4 sm:px-6">
                <div className="mb-12">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3 block">Legal</span>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">Terms of Service</h1>
                    <p className="text-slate-400">Last updated: March 2025 · Governing law: India</p>
                </div>

                {/* Prominent medical disclaimer at top */}
                <div className="mb-10 p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                    <p className="text-rose-400 font-bold text-sm mb-1">⚠️ IMPORTANT MEDICAL DISCLAIMER</p>
                    <p className="text-rose-300 text-sm leading-6">
                        Med24 AI provides general health information powered by AI. It is <strong>NOT a substitute for professional medical advice, diagnosis, or treatment.</strong> In case of a medical emergency, call <strong>112</strong> or visit your nearest hospital.
                    </p>
                </div>

                <div className="space-y-10 text-slate-300 text-sm leading-7">

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">1. Service Description</h2>
                        <p>Med24 AI is an artificial intelligence platform that provides general medical information in response to user queries. We use a multi-model ensemble of large language models (MedGemma 27B, Meditron 7B, MediChat-Llama3) to generate informational responses about medical topics.</p>
                        <p className="mt-3">Responses are generated automatically and are for <strong className="text-white">educational and informational purposes only</strong>.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">2. Eligibility</h2>
                        <ul className="list-disc list-inside space-y-1 text-slate-400">
                            <li>You must be at least <strong className="text-slate-300">18 years old</strong> to use Med24 AI</li>
                            <li>You must be a resident of India or use the service in compliance with your local laws</li>
                            <li>By creating an account, you confirm you meet these requirements</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">3. Acceptable Use</h2>
                        <p>You agree NOT to:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
                            <li>Use Med24 AI to replace professional medical care or for emergency situations</li>
                            <li>Upload content that is not medical or health-related (e.g., explicit, illegal, or harmful content)</li>
                            <li>Attempt to reverse-engineer, scrape, or abuse the API</li>
                            <li>Share your account credentials with others</li>
                            <li>Use the service to harm others or spread health misinformation</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">4. Subscriptions & Payments</h2>
                        <ul className="list-disc list-inside space-y-1 text-slate-400">
                            <li>Paid plans are billed monthly or annually as selected at checkout</li>
                            <li>Payments are processed by Razorpay; you agree to their payment terms</li>
                            <li><strong className="text-slate-300">Refund Policy:</strong> Refunds are available within 7 days of purchase if the service has not been used beyond the free tier equivalent. Contact support@med24ai.in to request a refund.</li>
                            <li>Plan downgrades take effect at end of billing period</li>
                            <li>We reserve the right to change pricing with 30 days' notice</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">5. Limitation of Liability</h2>
                        <p>To the fullest extent permitted by law:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
                            <li>Med24 AI is provided "as is" without warranties of any kind</li>
                            <li>We are not liable for any medical decisions made based on AI-generated content</li>
                            <li>Our maximum liability to you is limited to the amount you paid in the last 3 months</li>
                            <li>We are not liable for indirect, incidental, or consequential damages</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">6. Termination</h2>
                        <p>We reserve the right to suspend or terminate your account without notice if you violate these terms. You may delete your account at any time from your profile settings.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">7. Governing Law & Disputes</h2>
                        <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India. We encourage resolving disputes amicably before pursuing legal action.</p>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-white mb-3 border-b border-slate-800 pb-2">8. Contact</h2>
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                            <p className="text-white font-semibold">Med24 AI Support</p>
                            <p className="text-slate-400 mt-1">Email: <a href="mailto:support@med24ai.in" className="text-cyan-400 hover:underline">support@med24ai.in</a></p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
