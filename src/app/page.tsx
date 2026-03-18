"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/api";

// ======================== DATA ========================

const features = [
  {
    emoji: "💬",
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    title: "Smart Triage",
    description: "Discuss symptoms naturally. Our AI extracts clinical meaning rapidly while scanning for emergency keywords.",
    href: "/chat",
  },
  {
    emoji: "🧪",
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    title: "Lab Parsing",
    description: "Drop a PDF or image of your lab report. We extract the values and flag abnormalities instantly.",
    href: "/lab-report",
  },
  {
    emoji: "🧠",
    bg: "bg-violet-50",
    iconBg: "bg-violet-100",
    title: "Ensemble Models",
    description: "We don't rely on just one brain. Your query is verified against 3 leading medical LLMs simultaneously.",
    href: "/chat",
  },
  {
    emoji: "📸",
    bg: "bg-rose-50",
    iconBg: "bg-rose-100",
    title: "Image Analysis",
    description: "Upload photos of skin conditions, rashes, or injuries. Our vision AI provides detailed visual insights.",
    href: "/chat",
  },
  {
    emoji: "🛡️",
    bg: "bg-cyan-50",
    iconBg: "bg-cyan-100",
    title: "Emergency Detection",
    description: "Automatic detection of critical symptoms with immediate emergency guidance and contact information.",
    href: "/first-aid",
  },
  {
    emoji: "💊",
    bg: "bg-orange-50",
    iconBg: "bg-orange-100",
    title: "Medicine Lookup",
    description: "Instant AI-powered medicine info — dosage, side effects, drug interactions, and clinical overview in seconds.",
    href: "/medicine",
  },
  {
    emoji: "💡",
    bg: "bg-yellow-50",
    iconBg: "bg-yellow-100",
    title: "Daily Health Tips",
    description: "Science-backed tips covering nutrition, exercise, mental health, and prevention — refreshed every day.",
    href: "/tips",
  },
  {
    emoji: "🩺",
    bg: "bg-teal-50",
    iconBg: "bg-teal-100",
    title: "Health Tools",
    description: "BMI calculator, body fat estimator, calorie tracker, heart rate zones, and more — all in one place.",
    href: "/tools",
  },
  {
    emoji: "🚨",
    bg: "bg-red-50",
    iconBg: "bg-red-100",
    title: "First Aid Guide",
    description: "Step-by-step first aid for common emergencies — shareable via WhatsApp with a single tap.",
    href: "/first-aid",
  },
  {
    emoji: "📊",
    bg: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    title: "Compare Lab Reports",
    description: "Upload two reports and get an AI trend analysis — see what improved, worsened, or stayed the same.",
    href: "/compare",
  },
];

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/mo",
    description: "Try it out",
    features: [
      "5 text queries / day",
      "Basic medical Q&A",
      "Text chat only",
      "Medical disclaimers",
    ],
    cta: "Start Free",
    href: "/chat",
    popular: false,
  },
  {
    name: "Basic",
    price: "₹299",
    period: "/mo",
    description: "For regular use",
    features: [
      "50 text queries / day",
      "10 image analyses / month",
      "Access to MedGemma",
      "Priority support",
    ],
    cta: "Get Basic",
    href: "/pricing",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹899",
    period: "/mo",
    description: "Full power",
    features: [
      "Unlimited text queries",
      "Unlimited image analysis",
      "10 lab reports / month",
      "Full 3-model ensemble",
      "Priority AI processing",
    ],
    cta: "Go Pro",
    href: "/pricing",
    popular: true,
  },
  {
    name: "Medical Pro",
    price: "₹2,499",
    period: "/mo",
    description: "For professionals",
    features: [
      "Unlimited everything",
      "Unlimited lab reports",
      "API access",
      "24/7 dedicated support",
      "White-label export",
    ],
    cta: "Upgrade Now",
    href: "/pricing",
    popular: false,
  },
];

// ======================== NAVBAR ========================

function SiteNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-xl text-[#0F3460] tracking-tight">
            Medic24 <span className="text-blue-500">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5">
          <Link href="/chat" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">Chat</Link>
          <Link href="/medicine" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">Medicine</Link>
          <Link href="/tips" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">Tips</Link>
          <Link href="/first-aid" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">First Aid</Link>
          <Link href="/tools" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">Tools</Link>
          <Link href="/lab-report" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">Lab Analysis</Link>
          <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors">Pricing</Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-blue-700 px-3 py-2 transition-colors">
            Log in
          </Link>
          <Link href="/login" className="text-sm font-semibold text-white bg-[#0F3460] hover:bg-blue-800 px-5 py-2.5 rounded-xl shadow-md transition-all hover:-translate-y-0.5">
            Sign in
          </Link>
        </div>

        {/* Mobile Button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-slate-500 hover:text-blue-700 p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-blue-100 px-5 py-4 space-y-3">
          <Link href="/chat" className="block text-slate-600 hover:text-blue-700 py-2" onClick={() => setMobileOpen(false)}>Chat</Link>
          <Link href="/medicine" className="block text-slate-600 hover:text-blue-700 py-2" onClick={() => setMobileOpen(false)}>Medicine Lookup</Link>
          <Link href="/tips" className="block text-slate-600 hover:text-blue-700 py-2" onClick={() => setMobileOpen(false)}>Health Tips</Link>
          <Link href="/first-aid" className="block text-slate-600 hover:text-blue-700 py-2" onClick={() => setMobileOpen(false)}>First Aid</Link>
          <Link href="/tools" className="block text-slate-600 hover:text-blue-700 py-2" onClick={() => setMobileOpen(false)}>Health Tools</Link>
          <Link href="/compare" className="block text-slate-600 hover:text-blue-700 py-2" onClick={() => setMobileOpen(false)}>Compare Reports</Link>
          <Link href="/lab-report" className="block text-slate-600 hover:text-blue-700 py-2" onClick={() => setMobileOpen(false)}>Lab Analysis</Link>
          <Link href="/pricing" className="block text-slate-600 hover:text-blue-700 py-2" onClick={() => setMobileOpen(false)}>Pricing</Link>
          <div className="pt-3 border-t border-blue-100 flex gap-3">
            <Link href="/login" className="flex-1 text-center text-sm text-slate-600 border border-slate-200 px-4 py-2.5 rounded-xl">Log in</Link>
            <Link href="/login" className="flex-1 text-center text-sm font-semibold text-white bg-[#0F3460] px-4 py-2.5 rounded-xl">Sign in</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// ======================== HERO ========================

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ddeeff] via-[#e8f2ff] to-[#f0f8ff]" />
      {/* Blobs */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-200/40 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 border border-blue-200 rounded-full px-4 py-1.5 mb-8 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm text-blue-800 font-medium">Powered by Gemma 3 27B · Mixtral 8x7B · Llama 3.1 8B</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0F3460] leading-tight tracking-tight mb-6">
          Your Clinical<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900">Intelligence Partner</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Instant, evidence-based medical insights. Chat with symptoms, analyze lab reports,
          look up medicines, access first aid guides, track health with tools — all powered by an ensemble AI engine.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href="/chat"
            className="flex items-center gap-2 bg-[#0F3460] hover:bg-blue-900 text-white font-semibold px-8 py-4 rounded-2xl text-lg shadow-xl shadow-blue-900/20 hover:shadow-blue-900/30 transition-all hover:-translate-y-0.5"
          >
            Start Chatting
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
          <Link
            href="/lab-report"
            className="flex items-center gap-2 text-[#0F3460] font-semibold border-2 border-[#0F3460]/20 hover:border-[#0F3460]/50 bg-white/80 hover:bg-white px-8 py-4 rounded-2xl text-lg transition-all hover:-translate-y-0.5 shadow-sm"
          >
            Analyze Lab Report
          </Link>
        </div>

        {/* Quick feature links */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {[
            { label: "💊 Medicine", href: "/medicine" },
            { label: "💡 Health Tips", href: "/tips" },
            { label: "🚨 First Aid", href: "/first-aid" },
            { label: "🩺 Health Tools", href: "/tools" },
            { label: "📊 Compare Reports", href: "/compare" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-blue-700 bg-white/80 border border-blue-200 hover:border-blue-400 hover:bg-white px-4 py-2 rounded-full transition-all shadow-sm hover:-translate-y-0.5"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          {["No credit card required", "5 free queries daily", "Made in India 🇮🇳"].map((t, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ======================== FEATURES ========================

function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">Features</span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0F3460] mt-3 mb-4">
            Built for real medical intelligence
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Every feature is designed around how clinicians and patients actually think about health questions.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Link key={i} href={f.href} className={`group ${f.bg} rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1 block`}>
              <div className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center text-2xl mb-5 shadow-sm`}>
                {f.emoji}
              </div>
              <h3 className="text-lg font-bold text-[#0F3460] mb-2 group-hover:text-blue-700 transition-colors">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{f.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ======================== HOW IT WORKS ========================

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-gradient-to-br from-[#e8f2ff] to-[#f0f8ff]">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">How it works</span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0F3460] mt-3 mb-4">
            Three steps. Three models. One answer.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { num: "01", title: "Ask anything", desc: "Type, speak, or upload an image. No jargon needed. Choose Ensemble mode for maximum accuracy or a single model for speed." },
            { num: "02", title: "AI models analyze together", desc: "Gemma 3 27B, Mistral 7B, and Llama 3.1 8B process your query simultaneously — clinical reasoning, guideline matching, and plain-language explanation." },
            { num: "03", title: "Get your answer", desc: "Receive a merged, confidence-scored response with source model attribution. Emergency alerts auto-trigger for critical symptoms." },
          ].map((step, i) => (
            <div key={i} className="bg-white/80 backdrop-blur rounded-2xl p-7 border border-blue-100 shadow-sm hover:shadow-md transition-all">
              <span className="text-6xl font-black text-blue-100 leading-none block mb-2">{step.num}</span>
              <h3 className="text-xl font-bold text-[#0F3460] mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Model visualization */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-blue-100 shadow-lg p-8">
          <p className="text-xs text-slate-400 uppercase tracking-wider text-center mb-6 font-semibold">Ensemble Model Architecture</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { name: "Gemma 3 27B", model: "google/gemma-3-27b-it", role: "Clinical AI", icon: "🔬", color: "bg-blue-50 text-blue-700 border-blue-200" },
              { name: "Mixtral 8x7B", model: "mistralai/Mixtral-8x7B-v0.1", role: "Guidelines AI", icon: "📋", color: "bg-violet-50 text-violet-700 border-violet-200" },
              { name: "Llama 3.1 8B", model: "meta/Llama-3.1-8B", role: "Easy Explain", icon: "💬", color: "bg-amber-50 text-amber-700 border-amber-200" },
            ].map((m, i) => (
              <div key={i} className={`text-center p-4 rounded-xl border ${m.color}`}>
                <div className="text-2xl mb-2">{m.icon}</div>
                <p className="text-sm font-bold">{m.name}</p>
                <p className="text-xs font-semibold mt-0.5 opacity-90">{m.role}</p>
                <p className="text-[10px] mt-1 opacity-50 font-mono break-all">{m.model}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-4">
              {["bg-blue-300", "bg-violet-300", "bg-amber-300"].map((c, i) => (
                <div key={i} className={`w-px h-8 ${c}`} />
              ))}
            </div>
            <div className="w-9 h-9 rounded-full bg-[#0F3460] flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div className="text-center mt-2">
              <p className="text-sm font-bold text-[#0F3460]">Merged Ensemble Response</p>
              <p className="text-xs text-emerald-600 mt-1 font-medium">Confidence-scored · Emergency-aware · Disclaimer included</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ======================== TODAY'S TIP ========================

function TodaysTipSection() {
  const [tip, setTip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTip = async () => {
      try {
        const res = await api.get("/api/v1/tips/today");
        setTip(res.data.tip);
      } catch (err) {
        console.error("Failed to fetch today's tip", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTip();
  }, []);

  if (loading || !tip) return null;

  const categoryColors: Record<string, string> = {
    nutrition: "from-orange-600 to-orange-700",
    exercise: "from-green-600 to-green-700",
    checkup: "from-blue-600 to-blue-700",
    lifestyle: "from-purple-600 to-purple-700",
    mental: "from-pink-600 to-pink-700",
    seasonal: "from-yellow-600 to-yellow-700",
  };

  return (
    <section id="tips" className="py-24 sm:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-10">
          <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">Today&apos;s Health Tip</span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0F3460] mt-3 mb-4">
            Small habits, big health wins
          </h2>
        </div>

        <div className={`bg-gradient-to-br ${categoryColors[tip.category] || "from-blue-600 to-blue-700"} rounded-3xl p-8 md:p-12 text-white shadow-2xl border border-white/20`}>
          <div className="flex items-start gap-6 md:gap-8">
            <div className="text-6xl md:text-7xl flex-shrink-0">{tip.icon}</div>
            <div className="flex-1">
              <div className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-sm font-semibold mb-4">
                {tip.title}
              </div>
              <p className="text-lg md:text-xl leading-relaxed mb-6">{tip.tip}</p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Link
                  href="/tips"
                  className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all hover:-translate-y-0.5 shadow-lg"
                >
                  See All {tip.total_tips || 30} Tips →
                </Link>
                <span className="text-sm text-white/80">💡 Rotates daily</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ======================== PRICING ========================

function PricingSection() {
  return (
    <section id="pricing" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-14">
          <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">Pricing</span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0F3460] mt-3 mb-4">Simple, transparent pricing</h2>
          <p className="text-slate-500 text-lg">Start free. Upgrade when you need more.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-7 transition-all hover:-translate-y-1 ${plan.popular
                ? "bg-[#0F3460] text-white shadow-2xl shadow-blue-900/30 border-2 border-blue-700"
                : "bg-slate-50 border border-slate-200 hover:border-blue-200 hover:shadow-md"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-5">
                <h3 className={`text-lg font-bold ${plan.popular ? "text-white" : "text-[#0F3460]"}`}>{plan.name}</h3>
                <p className={`text-sm mt-1 ${plan.popular ? "text-blue-300" : "text-slate-500"}`}>{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className={`text-4xl font-black ${plan.popular ? "text-white" : "text-[#0F3460]"}`}>{plan.price}</span>
                <span className={`text-sm ${plan.popular ? "text-blue-300" : "text-slate-500"}`}>{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-cyan-400" : "text-emerald-500"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`text-sm ${plan.popular ? "text-blue-100" : "text-slate-600"}`}>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block text-center text-sm font-bold py-3 rounded-xl transition-all ${plan.popular
                  ? "bg-white text-[#0F3460] hover:bg-blue-50 shadow-sm"
                  : "bg-[#0F3460] text-white hover:bg-blue-800 shadow-md hover:shadow-lg"
                  }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ======================== FOOTER ========================

function SiteFooter() {
  return (
    <footer className="bg-[#0F3460] text-white py-16">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-xl tracking-tight">Medic24 <span className="text-blue-300">AI</span></span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed max-w-sm mb-4">
              AI-powered clinical intelligence built in India. Chat with symptoms, analyze lab reports, look up medicines, explore first aid guides, track health with tools — all backed by Gemma 3 27B, Mixtral 8x7B, and Llama 3.1 8B working 24/7.
            </p>
            <p className="text-blue-300 text-xs">🇮🇳 Made in India by AM24 Labs</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2.5">
              {[["Chat", "/chat"], ["Medicine Lookup", "/medicine"], ["Health Tips", "/tips"], ["First Aid Guide", "/first-aid"], ["Health Tools", "/tools"], ["Compare Reports", "/compare"], ["Lab Analysis", "/lab-report"], ["Pricing", "/pricing"]].map(([label, href]) => (
                <li key={label}><Link href={href} className="text-sm text-blue-300 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {[["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Medical Disclaimer", "/disclaimer"]].map(([label, href]) => (
                <li key={label}><Link href={href} className="text-sm text-blue-300 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-8">
          <p className="text-xs text-blue-200 leading-relaxed">
            <strong className="text-white">⚠️ Medical Disclaimer:</strong> Medic24 AI is an informational tool only and does not provide medical diagnosis, treatment, or professional medical advice. Always consult a qualified healthcare professional. In emergencies, call 112 (India).
          </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <p className="text-xs text-blue-400">© 2026 AM24 Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ======================== MAIN PAGE ========================

export default function Home() {
  return (
    <main className="antialiased">
      <SiteNavbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TodaysTipSection />
      <PricingSection />
      <SiteFooter />
    </main>
  );
}
