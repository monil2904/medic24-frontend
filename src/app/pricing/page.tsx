'use client';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { CheckCircle2, ChevronRight, Shield, Star, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useState } from 'react';

export default function PricingPage() {
    const { user, isLoggedIn, refreshUser } = useAuth();
    const router = useRouter();
    const [isAnnual, setIsAnnual] = useState(false);
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const plans = [
        {
            id: 'free',
            name: 'Free',
            priceMonthly: 0,
            priceAnnual: 0,
            description: 'Perfect to try out Medic24 AI for simple queries.',
            features: ['5 General Queries/day', 'Text Chat Only', 'Community Support'],
            icon: <Star className="text-slate-400" size={24} />,
            color: 'slate'
        },
        {
            id: 'basic',
            name: 'Basic',
            priceMonthly: 299,
            priceAnnual: 2990,
            popular: false,
            description: 'Great for individuals seeking more robust health analysis.',
            features: ['50 Queries/day', '10 Multimodal Image Scans', 'Priority Support', 'Access to MedGemma'],
            icon: <Zap className="text-cyan-500" size={24} />,
            color: 'cyan'
        },
        {
            id: 'pro',
            name: 'Pro',
            priceMonthly: 899,
            priceAnnual: 8990,
            popular: true,
            description: 'Built for advanced usage with lab report interpretations.',
            features: ['Unlimited General Queries', 'Unlimited Image Scans', '10 Lab Reports/month', 'Full 3-Model Ensemble (Gemma, Llama, Meditron)'],
            icon: <Shield className="text-violet-500" size={24} />,
            color: 'violet'
        },
        {
            id: 'medical_pro',
            name: 'Medical Pro',
            priceMonthly: 2499,
            priceAnnual: 24990,
            popular: false,
            description: 'Designed for medical students and professionals.',
            features: ['Unlimited Everything', 'Clinical Guidelines Priority', 'API Access', '24/7 Dedicated Support', 'White-label Export'],
            icon: <Activity className="text-rose-500" size={24} />,
            color: 'rose'
        }
    ];

    // Placeholder icon for Activity
    function Activity(props: any) {
        return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>;
    }

    const handleUpgrade = async (planId: string, amount: number) => {
        if (!isLoggedIn) {
            router.push('/login?redirect=/pricing');
            return;
        }

        if (planId === 'free') return; // Cannot downgrade to free via checkout

        setLoadingPlan(planId);
        setError('');
        setSuccessMessage('');

        try {
            // STEP 1: Create Order via Backend (Ideally)
            // For now, simulating order creation and firing Razorpay Test Mode
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
                amount: amount * 100, // Amount in paise
                currency: 'INR',
                name: 'Medic24 AI',
                description: `Upgrade to ${planId.toUpperCase()} Plan`,
                image: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png', // Temporary icon
                handler: async function (response: any) {
                    try {
                        // STEP 2: Verify Payment & Upgrade User via Backend
                        const res = await api.post('/api/v1/auth/upgrade', {
                            plan: planId,
                            payment_id: response.razorpay_payment_id || 'mock_pay_id',
                            order_id: response.razorpay_order_id || 'mock_order_id',
                            signature: response.razorpay_signature || 'mock_sig'
                        });

                        await refreshUser();
                        setSuccessMessage(`Successfully upgraded to ${planId.toUpperCase()} plan!`);
                        setTimeout(() => router.push('/chat'), 3000);

                    } catch (err: any) {
                        setError(err.response?.data?.detail || 'Failed to verify payment with server.');
                        console.error('Verify err:', err);
                    } finally {
                        setLoadingPlan(null);
                    }
                },
                prefill: {
                    name: user?.name || '',
                    email: user?.email || '',
                },
                theme: {
                    color: '#0EA5E9'
                },
                modal: {
                    ondismiss: function () {
                        setLoadingPlan(null);
                    }
                }
            };

            if ((window as any).Razorpay) {
                const rzp = new (window as any).Razorpay(options);
                rzp.on('payment.failed', function (response: any) {
                    setError(`Payment Failed: ${response.error.description}`);
                    setLoadingPlan(null);
                });
                rzp.open();
            } else {
                setError('Payment gateway failed to load. Please check your connection.');
                setLoadingPlan(null);
            }

        } catch (err: any) {
            setError('Failed to initiate checkout.');
            setLoadingPlan(null);
        }
    };

    return (
        <div className="min-h-screen border-t border-slate-100 bg-slate-50 font-sans">
            <Navbar />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 mt-12">
                <div className="text-center max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
                    <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl lg:text-6xl font-display">
                        Simple, transparent pricing
                    </h2>
                    <p className="mt-6 text-xl text-slate-500 leading-relaxed">
                        No hidden fees. No surprise charges. Choose the AI ensemble tier that perfectly matches your clinical intelligence needs.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="mt-12 flex justify-center animate-in fade-in duration-1000">
                    <div className="relative flex items-center p-1 bg-slate-200/50 backdrop-blur-sm rounded-full border border-slate-200/60 shadow-inner">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`relative w-40 rounded-full py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-300 z-10 ${!isAnnual ? 'text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Monthly billing
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`relative w-40 rounded-full py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-300 z-10 ${isAnnual ? 'text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Annual billing
                        </button>
                        <div
                            className={`absolute top-1 bottom-1 w-40 bg-white rounded-full shadow-sm border border-slate-200/50 transition-transform duration-300 ease-in-out ${isAnnual ? 'translate-x-[100%]' : 'translate-x-0'}`}
                        />
                    </div>
                    {isAnnual && (
                        <div className="absolute ml-80 -mt-3 hidden sm:block">
                            <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse shadow-sm shadow-green-500/30">
                                Save 16%
                            </span>
                        </div>
                    )}
                </div>

                {/* Alerts */}
                {error && (
                    <div className="mt-8 max-w-2xl mx-auto text-center p-4 bg-red-50 text-red-600 rounded-2xl border border-red-200 animate-in fade-in">
                        {error}
                    </div>
                )}
                {successMessage && (
                    <div className="mt-8 max-w-2xl mx-auto text-center p-4 bg-green-50 text-green-600 rounded-2xl border border-green-200 animate-in fade-in">
                        {successMessage} Redirecting...
                    </div>
                )}

                {/* Pricing Grid */}
                <div className="mt-16 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-6 animate-in slide-in-from-bottom-8 duration-700 delay-150">
                    {plans.map((plan) => {
                        const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
                        const period = isAnnual ? '/year' : '/mo';
                        const isCurrentPlan = user?.subscription_plan === plan.id;

                        // Dynamic styling based on plan variants
                        let ringColor = 'border-slate-200';
                        let buttonClass = 'bg-slate-100 text-slate-800 hover:bg-slate-200';
                        if (plan.popular) {
                            ringColor = 'border-cyan-400 ring-2 ring-cyan-400/20 shadow-xl shadow-cyan-500/10 scale-105 z-10';
                            buttonClass = 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5';
                        } else if (plan.id === 'medical_pro') {
                            ringColor = 'border-slate-200 bg-slate-900 border-slate-800 text-white';
                            buttonClass = 'bg-white text-slate-900 hover:bg-slate-100';
                        }

                        return (
                            <div key={plan.id} className={`relative p-8 rounded-[2rem] border flex flex-col transition-all duration-300 ${ringColor} ${plan.id !== 'medical_pro' ? 'bg-white' : ''}`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                        <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="flex-1">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm
                                        ${plan.id === 'free' ? 'bg-slate-100' : ''}
                                        ${plan.id === 'basic' ? 'bg-cyan-100' : ''}
                                        ${plan.id === 'pro' ? 'bg-violet-100' : ''}
                                        ${plan.id === 'medical_pro' ? 'bg-slate-800' : ''}
                                    `}>
                                        {plan.icon}
                                    </div>

                                    <h3 className={`text-2xl font-bold font-display ${plan.id === 'medical_pro' ? 'text-white' : 'text-slate-900'}`}>
                                        {plan.name}
                                    </h3>

                                    <div className="mt-4 flex items-baseline text-slate-900">
                                        <span className={`text-5xl font-extrabold tracking-tight ${plan.id === 'medical_pro' ? 'text-white' : ''}`}>
                                            ₹{price}
                                        </span>
                                        <span className={`ml-1 text-lg font-medium ${plan.id === 'medical_pro' ? 'text-slate-400' : 'text-slate-500'}`}>
                                            {period}
                                        </span>
                                    </div>
                                    <p className={`mt-6 text-sm leading-relaxed ${plan.id === 'medical_pro' ? 'text-slate-400' : 'text-slate-500'}`}>
                                        {plan.description}
                                    </p>

                                    <ul className="mt-8 space-y-4">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex">
                                                <CheckCircle2 className={`shrink-0 mr-3 ${plan.id === 'medical_pro' ? 'text-rose-400' : 'text-emerald-500'}`} size={20} />
                                                <span className={`text-sm ${plan.id === 'medical_pro' ? 'text-slate-300' : 'text-slate-600'}`}>
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    onClick={() => handleUpgrade(plan.id, price)}
                                    disabled={loadingPlan !== null || isCurrentPlan}
                                    className={`mt-8 w-full py-4 px-6 rounded-xl text-center font-bold transition-all focus:outline-none flex justify-center items-center gap-2
                                        ${isCurrentPlan ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed hidden' : buttonClass}
                                    `}
                                >
                                    {loadingPlan === plan.id ? (
                                        <span className="flex items-center gap-2">Processing <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" /></span>
                                    ) : isCurrentPlan ? (
                                        'Current Plan'
                                    ) : plan.id === 'free' ? (
                                        'Get Started Free'
                                    ) : (
                                        <>Upgrade to {plan.name} <ChevronRight size={16} /></>
                                    )}
                                </button>
                                {isCurrentPlan && (
                                    <div className={`mt-8 w-full py-4 px-6 rounded-xl text-center font-bold flex justify-center items-center gap-2 border border-slate-200 bg-slate-50 text-slate-400 cursor-default ${plan.id === 'medical_pro' ? 'border-slate-700 bg-slate-800' : ''}`}>
                                        Current Active Plan
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
