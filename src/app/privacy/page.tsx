import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
    title: 'Privacy Policy — Medic24 AI',
    description: 'Privacy Policy for Medic24 AI, detailing how we collect and use your data.',
};

export default function PrivacyPage() {
    return (
        <div className="bg-[#0B1120] min-h-screen text-slate-300">
            <Navbar />
            <div className="max-w-4xl mx-auto py-24 sm:py-32 px-4 sm:px-6">
                
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                            <ShieldCheck className="text-teal-400 w-6 h-6" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Last Updated: March 2026</p>
                </div>

                <div className="bg-[#1E293B]/50 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl space-y-10 leading-relaxed text-sm">
                    
                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">1. INTRODUCTION</h2>
                        <p>
                            Medic24 AI (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is operated by AM24 Labs. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website (medic24.io) and mobile application.
                        </p>
                        <p className="mt-3">
                            We are committed to protecting your privacy and complying with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (DPDPA) of India.
                        </p>
                        <p className="mt-3">
                            By using Medic24 AI, you agree to the collection and use of information as described in this policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">2. INFORMATION WE COLLECT</h2>
                        
                        <h3 className="text-lg font-bold text-slate-200 mt-6 mb-3">2.1 Information You Provide:</h3>
                        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
                            <li><strong>Account information:</strong> name, email address, password (encrypted)</li>
                            <li><strong>Google account details</strong> (if using Google Sign-In): name, email, profile picture</li>
                            <li><strong>Health queries:</strong> text messages you send to the AI chatbot</li>
                            <li><strong>Voice input:</strong> speech converted to text on your device (audio is NOT recorded or stored on our servers)</li>
                            <li><strong>Medical images:</strong> photos you upload for AI analysis</li>
                            <li><strong>Lab reports:</strong> PDF or image files you upload for analysis</li>
                            <li><strong>Payment information:</strong> processed by Razorpay (we do not store your credit/debit card numbers)</li>
                        </ul>

                        <h3 className="text-lg font-bold text-slate-200 mt-6 mb-3">2.2 Information Collected Automatically:</h3>
                        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
                            <li>Device type and operating system</li>
                            <li>IP address (anonymized)</li>
                            <li>Usage patterns (pages visited, features used)</li>
                            <li>App crash reports</li>
                        </ul>

                        <h3 className="text-lg font-bold text-slate-200 mt-6 mb-3">2.3 Information We Do NOT Collect:</h3>
                        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
                            <li>Aadhaar number or government ID numbers</li>
                            <li>Precise GPS location</li>
                            <li>Contact list or phone data</li>
                            <li>Audio recordings (voice is processed on-device only)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">3. HOW WE USE YOUR INFORMATION</h2>
                        <p className="mb-3">We use your information solely to:</p>
                        <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
                            <li>Provide AI-powered medical information and analysis</li>
                            <li>Create and manage your account</li>
                            <li>Process subscription payments via Razorpay</li>
                            <li>Improve our AI models and services</li>
                            <li>Send important service notifications</li>
                            <li>Comply with legal obligations</li>
                        </ul>

                        <p className="mb-3">We do NOT:</p>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li>Sell your personal data to third parties</li>
                            <li>Use your health data for advertising</li>
                            <li>Share your medical queries with insurance companies</li>
                            <li>Send marketing emails without your consent</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">4. DATA STORAGE AND SECURITY</h2>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li><strong>Your data is stored on encrypted servers:</strong>
                                <ul className="list-circle list-outside ml-6 mt-2 space-y-1">
                                    <li>Database: Neon PostgreSQL (Singapore region)</li>
                                    <li>File storage: Google Cloud Storage (Mumbai, India region)</li>
                                    <li>Backend: Google Cloud Run (encrypted in transit and at rest)</li>
                                </ul>
                            </li>
                            <li>Passwords are hashed using bcrypt (industry standard)</li>
                            <li>All data transmitted via HTTPS/TLS encryption</li>
                            <li>JWT tokens expire after 72 hours</li>
                            <li>We do not store your data on local devices except your authentication token</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">5. THIRD-PARTY SERVICES</h2>
                        <p className="mb-3">We use the following third-party services:</p>
                        <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
                            <li><strong>HuggingFace</strong> (AI model inference) — processes your queries to generate responses. See: <a href="https://huggingface.co/privacy" className="text-teal-400 hover:underline" target="_blank" rel="noopener noreferrer">huggingface.co/privacy</a></li>
                            <li><strong>Google Cloud Platform</strong> (hosting and storage) — stores your uploaded files. See: <a href="https://cloud.google.com/privacy" className="text-teal-400 hover:underline" target="_blank" rel="noopener noreferrer">cloud.google.com/privacy</a></li>
                            <li><strong>Neon</strong> (database hosting) — stores your account and chat data. See: <a href="https://neon.tech/privacy" className="text-teal-400 hover:underline" target="_blank" rel="noopener noreferrer">neon.tech/privacy</a></li>
                            <li><strong>Razorpay</strong> (payment processing) — processes your payments. See: <a href="https://razorpay.com/privacy" className="text-teal-400 hover:underline" target="_blank" rel="noopener noreferrer">razorpay.com/privacy</a></li>
                            <li><strong>Google OAuth</strong> (authentication) — handles Google Sign-In. See: <a href="https://policies.google.com/privacy" className="text-teal-400 hover:underline" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></li>
                            <li><strong>Vercel</strong> (website hosting) — serves the web application. See: <a href="https://vercel.com/legal/privacy-policy" className="text-teal-400 hover:underline" target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a></li>
                        </ul>
                        <p>These services have their own privacy policies. We recommend reviewing them.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">6. YOUR RIGHTS (Under DPDPA 2023)</h2>
                        <p className="mb-3">As a user in India, you have the right to:</p>
                        <ul className="list-disc list-outside ml-5 space-y-2 mb-4">
                            <li><strong>Access:</strong> Request a copy of your personal data</li>
                            <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                            <li><strong>Deletion:</strong> Request deletion of your account and all associated data</li>
                            <li><strong>Portability:</strong> Request your data in a portable format</li>
                            <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
                            <li><strong>Grievance:</strong> File a complaint with our Grievance Officer</li>
                        </ul>
                        <p>To exercise any of these rights, email: <a href="mailto:am24@medic24.io" className="text-teal-400 hover:underline">am24@medic24.io</a></p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">7. DATA RETENTION</h2>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li><strong>Active accounts:</strong> Data retained as long as account is active</li>
                            <li><strong>Deleted accounts:</strong> All personal data deleted within 30 days of account deletion request</li>
                            <li><strong>Chat history:</strong> Retained for 12 months, then automatically deleted</li>
                            <li><strong>Lab reports:</strong> Retained for 6 months after upload</li>
                            <li><strong>Payment records:</strong> Retained for 7 years as required by Indian tax law</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">8. CHILDREN&apos;S PRIVACY</h2>
                        <p>
                            Medic24 AI is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with personal data, please contact us at <a href="mailto:am24@medic24.io" className="text-teal-400 hover:underline">am24@medic24.io</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">9. COOKIES AND TRACKING</h2>
                        <p className="mb-3">Our website uses essential cookies only:</p>
                        <ul className="list-disc list-outside ml-5 space-y-2 mb-6">
                            <li>Authentication token (to keep you logged in)</li>
                            <li>Session preferences (language, theme)</li>
                        </ul>

                        <p className="mb-3">We do NOT use:</p>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li>Advertising cookies</li>
                            <li>Third-party tracking cookies</li>
                            <li>Analytics cookies that track you across websites</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">10. CHANGES TO THIS POLICY</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of significant changes via email or in-app notification. Continued use of Medic24 AI after changes constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">11. GRIEVANCE OFFICER</h2>
                        <p className="mb-3">
                            <strong>Name:</strong> Monil Lalwani<br/>
                            <strong>Designation:</strong> Founder, AM24 Labs<br/>
                            <strong>Email:</strong> <a href="mailto:am24@medic24.io" className="text-teal-400 hover:underline">am24@medic24.io</a><br/>
                            <strong>Address:</strong> Parul University, Vadodara, Gujarat 391760, India
                        </p>
                        <p><strong>Response time:</strong> Within 48 hours of receiving your query.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mt-8 mb-4 border-b border-slate-700/50 pb-2">12. CONTACT US</h2>
                        <p className="mb-2">For any privacy-related questions or concerns:</p>
                        <ul className="list-disc list-outside ml-5 space-y-2">
                            <li><strong>Email:</strong> <a href="mailto:am24@medic24.io" className="text-teal-400 hover:underline">am24@medic24.io</a></li>
                            <li><strong>General:</strong> <a href="mailto:am24@medic24.io" className="text-teal-400 hover:underline">am24@medic24.io</a></li>
                            <li><strong>Address:</strong> AM24 Labs, Parul University, Vadodara, Gujarat 391760</li>
                        </ul>
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
