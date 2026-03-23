import Link from "next/link";
import { Youtube, Instagram, Facebook, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0F3460] text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-center md:text-left">
                    <div className="md:col-span-2 flex flex-col items-center md:items-start">
                        <div className="flex items-center justify-center md:justify-start gap-2.5 mb-4 group">
                            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-white">
                                <img src="/black-outline-monogram.svg" alt="Medic24 Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="font-bold text-2xl text-white tracking-tight">
                                Medic24 <span className="text-blue-300">AI</span>
                            </span>
                        </div>
                        <p className="font-bold text-white mb-3">Healthcare at Your Fingertips. 24/7</p>
                        <p className="text-sm leading-relaxed max-w-sm mb-4 text-blue-100">
                            AI-powered clinical intelligence built in India. Chat with symptoms, analyze lab reports, look up medicines, and explore first aid guides: free, 24/7.
                        </p>
                        <p className="text-blue-300 text-xs mb-6 font-medium">🇮🇳 Made in India by AM24 Labs</p>

                        <div className="flex items-center gap-4">
                            <a href="https://youtube.com/@anjalimed24?si=1FUiWYcWurCr3wwg" className="text-slate-400 hover:text-[#FF0000] transition-colors" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel 1">
                                <Youtube size={24} />
                            </a>
                            <a href="https://youtube.com/@themedguide24?si=gOsEq-cYafXP0Vt1" className="text-slate-400 hover:text-[#FF0000] transition-colors" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel 2">
                                <Youtube size={24} />
                            </a>
                            <a href="https://www.instagram.com/anjalimed24?igsh=c3ozY3pmc2puOTBu" className="text-slate-400 hover:text-[#E4405F] transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Instagram 1">
                                <Instagram size={24} />
                            </a>
                            <a href="https://www.instagram.com/anjalimed24?igsh=d2pydmx2eWx2czY3" className="text-slate-400 hover:text-[#E4405F] transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Instagram 2">
                                <Instagram size={24} />
                            </a>
                            <a href="https://www.facebook.com/share/1EWKeFjQ5B/" className="text-slate-400 hover:text-[#1877F2] transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <Facebook size={24} />
                            </a>
                            <a href="mailto:am24@medic24.io" className="text-slate-400 hover:text-[#0D9488] transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Email Support">
                                <Mail size={24} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Product</h4>
                        <ul className="space-y-3">
                            {[
                                ["AI Chat", "/chat"],
                                ["Medicine Lookup", "/medicine"],
                                ["Lab Analysis", "/lab-report"],
                                ["Compare Reports", "/compare"],
                                ["Health Tools", "/tools"],
                                ["First Aid Guide", "/first-aid"],
                                ["Health Tips", "/tips"]
                            ].map(([label, href]) => (
                                <li key={label}><Link href={href} className="text-sm text-blue-200 hover:text-white transition-colors">{label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Company</h4>
                        <ul className="space-y-3 mb-8">
                            <li><Link href="/pricing" className="text-sm text-blue-200 hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="text-sm text-blue-200 hover:text-white transition-colors">About Us</Link></li>
                            <li><a href="mailto:am24@medic24.io" className="text-sm text-blue-200 hover:text-white transition-colors">Contact Us</a></li>
                        </ul>

                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-3">
                            <li><Link href="/privacy" className="text-sm text-blue-200 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-sm text-blue-200 hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/disclaimer" className="text-sm text-blue-200 hover:text-white transition-colors">Medical Disclaimer</Link></li>
                            <li><Link href="/refund" className="text-sm text-blue-200 hover:text-white transition-colors">Refund Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-8 w-full">
                    <p className="text-xs text-blue-200 leading-relaxed text-center md:text-left">
                        <strong className="text-white flex items-center justify-center md:justify-start gap-1 mb-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> Medical Disclaimer:</strong> Medic24 AI is an informational tool only and does not provide medical diagnosis, treatment, or professional medical advice. Always consult a qualified healthcare professional. In emergencies, call 112 (India) or visit your nearest hospital.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-white/10 gap-4">
                    <p className="text-xs text-blue-400 text-center md:text-left">© 2026 AM24 Labs. All rights reserved.</p>
                    <p className="text-xs text-blue-400 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-blue-400/50" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        medic24.io | Vadodara, Gujarat, India
                    </p>
                </div>
            </div>
        </footer>
    );
}
