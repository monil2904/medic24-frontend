import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { RefreshCcw } from 'lucide-react';

export const metadata = {
    title: 'Refund Policy — Medic24 AI',
    description: 'Refund Policy for Medic24 AI.',
};

export default function RefundPage() {
    return (
        <div className="bg-[#0B1120] min-h-screen text-slate-300">
            <Navbar />
            <div className="max-w-4xl mx-auto py-24 sm:py-32 px-4 sm:px-6">
                
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                            <RefreshCcw className="text-teal-400 w-6 h-6" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Refund Policy</h1>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Last Updated: March 2026</p>
                </div>

                <div className="bg-[#1E293B]/50 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl space-y-10 leading-relaxed text-sm">
                    
                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">1. REFUND ELIGIBILITY</h2>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li>Refund requests must be made within 7 days of payment</li>
                            <li>Refunds are available if the service is materially defective or unavailable for extended periods (&gt;24 hours)</li>
                            <li>Refunds are processed to the original payment method</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">2. NON-REFUNDABLE</h2>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li>Partial month usage (after 7-day window)</li>
                            <li>If you have used more than 50% of your plan&apos;s monthly limits</li>
                            <li>Change of mind after using the service</li>
                            <li>Free plan (no payment, no refund)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">3. HOW TO REQUEST A REFUND</h2>
                        <p className="mb-3">Send email to: <a href="mailto:am24@medic24.io" className="text-teal-400 hover:underline">am24@medic24.io</a> with:</p>
                        <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
                            <li><strong>Subject:</strong> &quot;Refund Request — [Your Email]&quot;</li>
                            <li>Your registered email address</li>
                            <li>Payment date and amount</li>
                            <li>Reason for refund</li>
                        </ul>
                        <p>We will process valid requests within 5-7 business days.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">4. CANCELLATION</h2>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li>You can cancel your subscription anytime from Settings</li>
                            <li>Cancellation takes effect at end of current billing period</li>
                            <li>You retain access to paid features until the period ends</li>
                            <li>No automatic refund on cancellation (you keep access till expiry)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">5. CONTACT</h2>
                        <p className="mb-2"><strong>Email:</strong> <a href="mailto:am24@medic24.io" className="text-teal-400 hover:underline">am24@medic24.io</a></p>
                        <p><strong>Response time:</strong> Within 48 hours</p>
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
