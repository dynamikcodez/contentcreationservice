'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, CheckCircle2, MessageSquare, Compass, Layers, Palette } from 'lucide-react';

interface LandingPageProps {
  onStartGameplan: () => void;
  onSelectPlan: (plan: 'TRY_IT' | 'MONTHLY' | 'RETAINER') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartGameplan, onSelectPlan }) => {
  const handleTalkToNeye = () => {
    const text = encodeURIComponent("Hello Neye, I'm interested in the CCS Ultra Retainer for my business. I need a bespoke brand strategy built around my business.");
    window.open(`https://wa.me/2349162716205?text=${text}`, '_blank');
  };

  const handleTalkToIyiola = () => {
    const text = encodeURIComponent("Hello Iyiola, I have an inquiry regarding CCS Ultra onboarding, payments, and operational support.");
    window.open(`https://wa.me/2347032293819?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans pb-20">
      
      {/* Landing Header */}
      <header className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center font-extrabold text-slate-950 text-sm shadow-lg shadow-amber-500/20">
              C
            </div>
            <span className="font-extrabold text-lg tracking-tight">CCS ULTRA</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onStartGameplan}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/20 transition"
            >
              Launch App
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION (Section 30) */}
      <section className="relative pt-16 sm:pt-24 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Phone-First Creative Agency for Nigerian SMEs
          </span>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-100 leading-tight">
            STOP POSTING. <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              START WINNING.
            </span>
          </h1>

          <p className="text-lg sm:text-xl font-medium text-slate-400 max-w-xl mx-auto leading-relaxed">
            Storytelling for the Remarkable Few. Turn what you know about your business into a brand identity, creative direction, and 20-day social strategy.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStartGameplan}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <span>Build My 20-Day Gameplan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* THE REFRAME SECTION (Section 30) */}
      <section className="py-16 px-4 bg-slate-950/80 border-y border-slate-800/80">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
            THE PERCEPTION GAP
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Your business doesn't have a content problem. <br />
            It has a positioning problem.
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Customers in Nigeria do not evaluate products purely through objective utility. Framing, context, presentation, language, and perceived meaning matter. CCS Ultra acts as your dedicated brand strategist.
          </p>
        </div>
      </section>

      {/* WHAT CCS ACTUALLY DOES (Section 30) */}
      <section className="py-16 px-4 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">What CCS Ultra Actually Does</h2>
          <p className="text-xs text-slate-400">Three fundamental pillars of brand transformation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base">1. Understands Your Brand</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Not generic AI prompts. CCS extracts your Brand DNA, verbal identity, and Nigerian market signals.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base">2. Builds Your Strategy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Not random post ideas. Constructs a 20-day narrative campaign progressing from Attention to Conversion.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base">3. Creates The Creative</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Not generic templates. Renders brand-calibrated visuals with zero generic AI slop or purple gradients.
            </p>
          </div>

        </div>
      </section>

      {/* CREATIVE TRANSFORMATION PIPELINE (Section 30) */}
      <section className="py-12 px-4 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/40 border-y border-slate-800/80">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
            THE INTELLIGENCE PIPELINE
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-bold text-slate-200">
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">Your Business</span>
            <span className="text-amber-400">↓</span>
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">Brand DNA</span>
            <span className="text-amber-400">↓</span>
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">Creative Direction</span>
            <span className="text-amber-400">↓</span>
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">Content</span>
            <span className="text-amber-400">↓</span>
            <span className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">Visuals</span>
            <span className="text-amber-400">↓</span>
            <span className="bg-amber-500 text-slate-950 px-3 py-1.5 rounded-xl font-black">Campaign</span>
          </div>
        </div>
      </section>

      {/* PRICING SECTION (Section 31) */}
      <section className="py-16 px-4 max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">Simple, Transparent Pricing</h2>
          <p className="text-xs text-slate-400">Select the plan that fits your current operational stage</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* TRY IT Tier */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">TRY IT</span>
              <div className="text-3xl font-black text-slate-100">₦0</div>
              <p className="text-xs text-slate-400 mt-1">For initial experimentation</p>
              
              <ul className="space-y-2.5 pt-6 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 1 Brand Identity</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 7-Day Campaign Preview</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Brand DNA Generation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Limited Visual Generation</li>
              </ul>
            </div>

            <button
              onClick={() => {
                onSelectPlan('TRY_IT');
                onStartGameplan();
              }}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl text-xs transition"
            >
              Start Free Trial
            </button>
          </div>

          {/* MONTHLY Tier */}
          <div className="bg-slate-900/90 border-2 border-amber-500 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-2xl relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-slate-950 font-black text-[10px] rounded-full uppercase tracking-wider shadow-md">
              MOST POPULAR
            </span>

            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">MONTHLY</span>
              <div className="text-3xl font-black text-slate-100">₦5,000 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
              <p className="text-xs text-slate-400 mt-1">For businesses running their marketing</p>
              
              <ul className="space-y-2.5 pt-6 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Up to 3 Brands</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Full 20-Day Calendar</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Fair-Use Visual Generation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Creative Studio & Memory</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> WhatsApp Export</li>
              </ul>
            </div>

            <button
              onClick={() => {
                onSelectPlan('MONTHLY');
                onStartGameplan();
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-amber-500/20"
            >
              Subscribe Monthly
            </button>
          </div>

          {/* RETAINER Tier */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">RETAINER</span>
              <div className="text-3xl font-black text-slate-100">₦15,000 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
              <p className="text-xs text-slate-400 mt-1">For businesses seeking professional oversight</p>
              
              <ul className="space-y-2.5 pt-6 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Everything in Monthly</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Priority Strategy Review by Neye</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Direct WhatsApp Strategy Access</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Monthly 30-min Strategy Call</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Bespoke Human Designer Access</li>
              </ul>
            </div>

            <button
              onClick={() => {
                onSelectPlan('RETAINER');
                onStartGameplan();
              }}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-indigo-600/20"
            >
              Join Retainer
            </button>
          </div>

        </div>
      </section>

      {/* BESPOKE LANDING PAGE CTA (Section 68) */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-900/80 p-8 rounded-3xl text-center space-y-4 shadow-2xl">
          <h3 className="text-xl font-bold text-slate-100">Some businesses need something more particular.</h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
            If you want a creative strategy built around your business — not a template — talk directly to our team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleTalkToNeye}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Talk to Neye (Lead Strategist: +234 916 271 6205)</span>
            </button>

            <button
              onClick={handleTalkToIyiola}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Talk to Iyiola (Ops & Support: 07032293819)</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
