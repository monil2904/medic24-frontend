"use client";

import { useState } from "react";

// ======================== DATA ========================

const features = [
  {
    icon: IconBrain,
    title: "3-Model AI Ensemble",
    description: "Three specialized medical AI models analyze your query in parallel, then merge into one comprehensive, high-confidence answer.",
    accent: "from-cyan-500 to-blue-600",
    bgAccent: "bg-cyan-500/10",
    borderAccent: "border-cyan-500/20",
  },
  {
    icon: IconImage,
    title: "Medical Image Analysis",
    description: "Upload photos of skin conditions, X-rays, rashes, or injuries. Our vision AI model provides detailed visual analysis.",
    accent: "from-violet-500 to-purple-600",
    bgAccent: "bg-violet-500/10",
    borderAccent: "border-violet-500/20",
  },
  {
    icon: IconMic,
    title: "Voice Input",
    description: "Just speak your symptoms naturally. On-device voice recognition means zero extra cost and complete privacy.",
    accent: "from-amber-500 to-orange-600",
    bgAccent: "bg-amber-500/10",
    borderAccent: "border-amber-500/20",
  },
  {
    icon: IconReport,
    title: "Lab Report AI",
    description: "Upload your blood test or lab report PDF. AI reads every value, flags abnormals, and explains what it all means in plain language.",
    accent: "from-emerald-500 to-green-600",
    bgAccent: "bg-emerald-500/10",
    borderAccent: "border-emerald-500/20",
  },
];

const steps = [
  {
    num: "01",
    title: "Ask anything",
    description: "Type, speak, or upload an image of your medical question. No jargon needed — ask like you'd ask a friend.",
  },
  {
    num: "02",
    title: "3 AIs analyze together",
    description: "MedGemma, Meditron, and MediChat process your query simultaneously — clinical reasoning, guideline matching, and patient-friendly explanation.",
  },
  {
    num: "03",
    title: "Get your answer",
    description: "Receive a merged, confidence-scored response. See individual model perspectives. Emergency alerts if critical symptoms detected.",
  },
];

const plans = [
  {
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Try it out",
    features: ["5 text queries / day", "Basic medical Q&A", "3-model ensemble responses", "Medical disclaimers"],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Basic",
    monthlyPrice: 99,
    annualPrice: 79,
    description: "For regular use",
    features: ["50 text queries / day", "5 image analyses / month", "10 voice queries / day", "Chat history"],
    cta: "Get Basic",
    popular: false,
  },
  {
    name: "Pro",
    monthlyPrice: 299,
    annualPrice: 239,
    description: "Full power",
    features: ["Unlimited text & voice", "Unlimited image analysis", "10 lab reports / month", "Priority AI processing", "No ads"],
    cta: "Go Pro",
    popular: true,
  },
  {
    name: "Medical Pro",
    monthlyPrice: 999,
    annualPrice: 799,
    description: "For professionals",
    features: ["Everything in Pro", "Unlimited lab reports", "Individual model responses", "Export chat as PDF", "Early access to features"],
    cta: "Contact Us",
    popular: false,
  },
];

// ======================== COMPONENTS ========================

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-display text-xl font-bold text-white tracking-tight">
            Medic<span className="text-cyan-400">24</span> AI
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-sm text-slate-300 hover:text-white px-4 py-2 transition-colors">
            Log in
          </a>
          <a
            href="/chat"
            className="text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:-translate-y-0.5"
          >
            Try Free
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-slate-400 hover:text-white p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-xl px-5 py-4 space-y-3">
          <a href="#features" className="block text-slate-300 hover:text-white py-2" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#how-it-works" className="block text-slate-300 hover:text-white py-2" onClick={() => setMobileOpen(false)}>How it Works</a>
          <a href="#pricing" className="block text-slate-300 hover:text-white py-2" onClick={() => setMobileOpen(false)}>Pricing</a>
          <div className="pt-3 border-t border-white/10 flex gap-3">
            <a href="/login" className="flex-1 text-center text-sm text-slate-300 border border-white/10 px-4 py-2.5 rounded-xl">Log in</a>
            <a href="/chat" className="flex-1 text-center text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 rounded-xl">Try Free</a>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/50 via-slate-950 to-slate-950" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-5 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-slate-300">Powered by 3 Medical AI Models</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-6">
          Your 24/7
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            AI Medical
          </span>
          <br />
          Assistant
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Ask health questions. Upload medical images. Analyze lab reports.
          <br className="hidden sm:block" />
          Three specialized AI models work together for answers you can trust.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="/chat"
            className="group flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-8 py-4 rounded-2xl text-lg shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all hover:-translate-y-1"
          >
            Try Medic24 AI Free
            <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#pricing"
            className="flex items-center gap-2 text-slate-300 hover:text-white border border-white/10 hover:border-white/25 px-8 py-4 rounded-2xl text-lg transition-all hover:-translate-y-0.5"
          >
            See Plans
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <IconShield className="w-4 h-4 text-emerald-500" />
            No credit card required
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-700" />
          <span className="flex items-center gap-1.5">
            <IconShield className="w-4 h-4 text-emerald-500" />
            5 free queries daily
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-700" />
          <span className="flex items-center gap-1.5">
            <IconShield className="w-4 h-4 text-emerald-500" />
            Made in India
          </span>
        </div>

        {/* Mockup preview */}
        <div className="mt-16 mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-sm p-4 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <div className="flex-1 mx-4 h-7 bg-slate-800 rounded-lg flex items-center px-3">
              <span className="text-xs text-slate-500">medic24ai.in/chat</span>
            </div>
          </div>
          <div className="bg-slate-950 rounded-xl p-6 min-h-[200px] space-y-4">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-cyan-600/20 border border-cyan-500/20 text-cyan-100 text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-xs text-left">
                I have a persistent headache for 3 days with mild fever. Should I be worried?
              </div>
            </div>
            {/* AI response */}
            <div className="flex justify-start">
              <div className="bg-slate-800/80 border border-white/5 text-slate-200 text-sm px-4 py-3 rounded-2xl rounded-bl-sm max-w-sm space-y-2 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">M</span>
                  </div>
                  <span className="text-xs font-medium text-cyan-400">Medic24 AI</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">High Confidence</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  A 3-day headache with mild fever is commonly seen with viral infections, tension headaches, or sinusitis. Most cases resolve on their own...
                </p>
                <p className="text-[10px] text-slate-600 italic mt-2">3 models analyzed • Disclaimer: This is not a substitute for professional medical advice</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="relative bg-slate-950 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-slate-950 to-slate-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-5">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-cyan-400 tracking-widest uppercase">Features</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-5">
            Not one AI model. <span className="text-cyan-400">Three.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Each model brings a different medical specialty. Together, they deliver answers no single AI can match.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl border ${feature.borderAccent} ${feature.bgAccent} p-7 sm:p-8 hover:border-white/20 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.accent} flex items-center justify-center mb-5 shadow-lg`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-display">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-slate-950 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-cyan-400 tracking-widest uppercase">How it works</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-5">
            Three steps. Three models. One answer.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-cyan-500/30 to-transparent z-0" />
              )}

              <div className="relative z-10">
                <span className="font-display text-6xl font-black text-cyan-500/10 leading-none">{step.num}</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3 font-display">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Model visualization */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-6 text-center">How the ensemble works</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { name: "MedGemma 27B", role: "Clinical Reasoning", color: "cyan" },
                { name: "Meditron 7B", role: "Medical Guidelines", color: "violet" },
                { name: "MediChat-Llama3", role: "Patient Explanation", color: "amber" },
              ].map((model, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-slate-800/50 border border-white/5">
                  <div
                    className={`w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center ${model.color === "cyan"
                      ? "bg-cyan-500/20 text-cyan-400"
                      : model.color === "violet"
                        ? "bg-violet-500/20 text-violet-400"
                        : "bg-amber-500/20 text-amber-400"
                      }`}
                  >
                    <IconBrain className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-white">{model.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{model.role}</p>
                </div>
              ))}
            </div>

            {/* Merge arrow */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                <div className="w-px h-8 bg-cyan-500/30" />
                <div className="w-px h-8 bg-violet-500/30" />
                <div className="w-px h-8 bg-amber-500/30" />
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div className="text-center mt-2">
                <p className="text-sm font-semibold text-white">Merged Ensemble Response</p>
                <p className="text-xs text-emerald-400 mt-1">Confidence Score: 94%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative bg-slate-950 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-950/30 via-slate-950 to-slate-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-5">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-cyan-400 tracking-widest uppercase">Pricing</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-5">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
            Start free. Upgrade when you need more.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-slate-800/50 border border-white/5 rounded-full p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!annual ? "bg-white text-slate-900 shadow" : "text-slate-400 hover:text-white"
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${annual ? "bg-white text-slate-900 shadow" : "text-slate-400 hover:text-white"
                }`}
            >
              Annual
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${plan.popular
                ? "bg-gradient-to-b from-cyan-500/10 to-blue-600/5 border-2 border-cyan-500/30 shadow-xl shadow-cyan-500/10"
                : "bg-slate-900/40 border border-white/5 hover:border-white/15"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white font-display">{plan.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white font-display">
                    {plan.monthlyPrice === 0 ? "Free" : `₹${annual ? plan.annualPrice : plan.monthlyPrice}`}
                  </span>
                  {plan.monthlyPrice > 0 && (
                    <span className="text-sm text-slate-500">/mo</span>
                  )}
                </div>
                {annual && plan.monthlyPrice > 0 && (
                  <p className="text-xs text-slate-600 mt-1 line-through">₹{plan.monthlyPrice}/mo</p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <IconCheck className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-cyan-400" : "text-slate-600"}`} />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.monthlyPrice === 0 ? "/chat" : "/pricing"}
                className={`block text-center text-sm font-semibold py-3 rounded-xl transition-all ${plan.popular
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
                  : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-display text-xl font-bold text-white tracking-tight">
                Medic<span className="text-cyan-400">24</span> AI
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-4">
              AI-powered medical assistant built in India. Three specialized models work together to give you reliable health information, 24/7.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span>🇮🇳</span>
              <span>Made in India by AM24 Labs</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><a href="/chat" className="text-sm text-slate-500 hover:text-white transition-colors">Chat</a></li>
              <li><a href="#features" className="text-sm text-slate-500 hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-sm text-slate-500 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/lab-report" className="text-sm text-slate-500 hover:text-white transition-colors">Lab Reports</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><a href="/privacy" className="text-sm text-slate-500 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-sm text-slate-500 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/disclaimer" className="text-sm text-slate-500 hover:text-white transition-colors">Medical Disclaimer</a></li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="rounded-xl bg-amber-500/5 border border-amber-500/10 p-4 mb-8">
          <p className="text-xs text-amber-500/80 leading-relaxed">
            <strong>Medical Disclaimer:</strong> Medic24 AI is an informational tool only and does not provide medical diagnosis, treatment, or professional medical advice. Always consult a qualified healthcare professional for medical decisions. In case of emergency, call 112 (India) or visit your nearest hospital immediately.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-slate-600">© 2026 AM24 Labs. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://twitter.com" className="text-slate-600 hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="https://linkedin.com" className="text-slate-600 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ======================== ICONS DEFINED ABOVE ========================

function IconBrain({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
      <path d="M9 21h6" />
      <path d="M10 17v4" />
      <path d="M14 17v4" />
      <path d="M12 2v4" />
      <path d="M8 6l2 2" />
      <path d="M16 6l-2 2" />
    </svg>
  );
}

function IconImage({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function IconMic({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function IconReport({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconCheck({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconArrowRight({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function IconShield({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

// ======================== MAIN PAGE ========================

export default function Home() {
  return (
    <main className="bg-slate-950 text-white font-body antialiased">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
