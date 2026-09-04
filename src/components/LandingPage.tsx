'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, MessageSquare, Compass, Layers, Palette, BookOpen, Instagram, Youtube, Mail } from 'lucide-react';

interface LandingPageProps {
  onStartGameplan: () => void;
  onSelectPlan: (plan: 'TRY_IT' | 'MONTHLY' | 'RETAINER') => void;
}

const AUDIENCES = [
  { icon: <Instagram className="w-4 h-4" />, label: 'Instagram Creators' },
  { icon: <Youtube className="w-4 h-4" />, label: 'TikTok / YouTube' },
  { icon: <Mail className="w-4 h-4" />, label: 'Substack Writers' },
  { icon: <BookOpen className="w-4 h-4" />, label: 'Personal Brands' },
];

const CREATOR_WINS = [
  { persona: 'Substack Newsletter', quote: 'Went from sporadic newsletters to a content system that grows my paid list every month.', name: 'Tolu A.', role: 'Finance & Career Writer' },
  { persona: 'Instagram Creator', quote: 'My engagement doubled in 3 weeks. I stopped guessing and started posting with a strategic narrative arc.', name: 'Zara O.', role: 'Lifestyle & Wellness Creator' },
  { persona: 'Personal Brand', quote: 'CCS Ultra built my entire positioning framework. Now brands approach me instead of the other way around.', name: 'Emeka N.', role: 'Tech Thought Leader' },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onStartGameplan, onSelectPlan }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleTalkToNeye = () => {
    const text = encodeURIComponent("Hello Neye, I'm interested in the CCS Ultra Retainer. I need a bespoke brand strategy.");
    window.open(`https://wa.me/2349162716205?text=${text}`, '_blank');
  };

  const handleTalkToIyiola = () => {
    const text = encodeURIComponent("Hello Iyiola, I have an inquiry about CCS Ultra onboarding and plans.");
    window.open(`https://wa.me/2347032293819?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans pb-20">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center font-extrabold text-slate-950 text-sm shadow-lg shadow-amber-500/20">C</div>
            <span className="font-extrabold text-lg tracking-tight">CCS ULTRA</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              For creators & brands
            </span>
            <button
              onClick={onStartGameplan}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/20 transition"
            >
              Launch App →
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-16 sm:pt-24 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-500/6 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          {/* Audience pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {AUDIENCES.map((a) => (
              <span key={a.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-semibold">
                {a.icon}
                {a.label}
              </span>
            ))}
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-100 leading-tight">
            Your voice deserves<br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              a real strategy.
            </span>
          </h1>

          <p className="text-lg sm:text-xl font-medium text-slate-400 max-w-2xl mx-auto leading-relaxed">
            CCS Ultra turns your expertise, story, and personal brand into a 20-day content engine — with AI-calibrated Brand DNA, narrative arcs, and visual direction built specifically around <em>you</em>.
          </p>

          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Whether you run a Substack, a brand Instagram, a YouTube channel, or an SME — you need positioning, not just posts.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStartGameplan}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <span>Build My 20-Day Content Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-500">Free to start. No card required.</span>
          </div>
        </div>
      </section>

      {/* THE CREATOR PROBLEM */}
      <section className="py-16 px-4 bg-slate-950/80 border-y border-slate-800/80">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">The Creator Problem</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            You're not struggling with content.<br />
            You're struggling with <em>clarity</em>.
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Posting daily but growing slowly? Brilliant ideas but inconsistent output? Writing newsletters that don't convert? The problem is never the content itself — it's the absence of a strategic narrative that makes your audience feel something, then act.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
            {[
              { label: 'Random posting', fix: 'Strategic 20-day narrative arc' },
              { label: 'Generic visuals', fix: 'Brand-calibrated art direction' },
              { label: 'Inconsistent voice', fix: 'Verbal identity & tone DNA' },
            ].map((item) => (
              <div key={item.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                <p className="text-xs text-red-400 font-bold line-through opacity-70">{item.label}</p>
                <p className="text-xs text-emerald-400 font-bold">→ {item.fix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-16 px-4 max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">Built for creators who are serious.</h2>
          <p className="text-xs text-slate-400">One platform. Every format. Total brand clarity.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            {
              icon: <Mail className="w-5 h-5" />,
              title: 'Substack & Newsletter Writers',
              description: 'Map your editorial voice into a positioning DNA. Generate 20-issue narrative series with subject line hooks and Substack-formatted long-form CTAs.',
              color: 'from-amber-500/10 to-transparent border-amber-500/20',
              badge: 'Newsletter-ready',
            },
            {
              icon: <Instagram className="w-5 h-5" />,
              title: 'Instagram & TikTok Creators',
              description: 'Build a content calendar that tells a story across 20 posts — from authority hooks to community engagement to product conversion.',
              color: 'from-pink-500/10 to-transparent border-pink-500/20',
              badge: 'Caption-ready',
            },
            {
              icon: <BookOpen className="w-5 h-5" />,
              title: 'Personal Brand Builders',
              description: 'Distill your expertise, story, and mission into a Brand DNA that communicates who you are across every platform and format.',
              color: 'from-indigo-500/10 to-transparent border-indigo-500/20',
              badge: 'Cross-platform',
            },
            {
              icon: <Sparkles className="w-5 h-5" />,
              title: 'Nigerian SME & Business Owners',
              description: 'Phone-first brand strategy calibrated to Nigerian market psychology — psychological pricing, WhatsApp marketing, and visual storytelling.',
              color: 'from-emerald-500/10 to-transparent border-emerald-500/20',
              badge: 'Nigeria-specific',
            },
          ].map((item) => (
            <div key={item.title} className={`bg-gradient-to-br ${item.color} border rounded-3xl p-6 space-y-3`}>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold px-2 py-1 bg-slate-900/80 border border-slate-800 rounded-full text-slate-300 uppercase tracking-wider">{item.badge}</span>
              </div>
              <h3 className="font-bold text-slate-100 text-base">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12 px-4 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/40 border-y border-slate-800/80">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">How It Works</span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-bold text-slate-200 items-center">
            {[
              { step: '01', label: 'Your Story & Voice' },
              { arrow: true },
              { step: '02', label: 'Brand DNA Engine' },
              { arrow: true },
              { step: '03', label: 'Creative Direction' },
              { arrow: true },
              { step: '04', label: '20-Day Calendar' },
              { arrow: true },
              { step: '05', label: 'Visual Assets', highlight: true },
            ].map((item, i) =>
              'arrow' in item ? (
                <span key={i} className="text-amber-400 text-center hidden sm:block">→</span>
              ) : (
                <div key={i} className={`p-3 rounded-2xl border text-center space-y-1 ${item.highlight ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
                  <span className={`text-[10px] font-black block ${item.highlight ? 'text-slate-950/70' : 'text-amber-400'}`}>{item.step}</span>
                  <span className="text-[11px] font-bold">{item.label}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 px-4 max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-100">From creators who switched.</h2>
        </div>
        <div className="relative">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <span className="text-[10px] font-bold px-2.5 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-full uppercase tracking-wider">{CREATOR_WINS[activeTestimonial].persona}</span>
            <p className="text-base sm:text-lg font-medium text-slate-200 leading-relaxed italic">"{CREATOR_WINS[activeTestimonial].quote}"</p>
            <div>
              <p className="text-sm font-bold text-slate-100">{CREATOR_WINS[activeTestimonial].name}</p>
              <p className="text-xs text-slate-400">{CREATOR_WINS[activeTestimonial].role}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 pt-4">
            {CREATOR_WINS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === activeTestimonial ? 'bg-amber-400 w-5' : 'bg-slate-700 hover:bg-slate-600'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 px-4 max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">Simple Pricing</h2>
          <p className="text-xs text-slate-400">Start free. Scale when your content starts working.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TRY IT */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">TRY IT</span>
              <div className="text-3xl font-black text-slate-100">₦0</div>
              <p className="text-xs text-slate-400 mt-1">For curious creators & founders</p>
              <ul className="space-y-2.5 pt-5 text-xs text-slate-300">
                {['1 Brand / Creator Profile', '7-Day Content Preview', 'Brand DNA Generation', 'Limited Visuals'].map((f) => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => { onSelectPlan('TRY_IT'); onStartGameplan(); }}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl text-xs transition">
              Start Free
            </button>
          </div>

          {/* MONTHLY */}
          <div className="bg-slate-900/90 border-2 border-amber-500 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-2xl relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-slate-950 font-black text-[10px] rounded-full uppercase tracking-wider shadow-md">Most Popular</span>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">CREATOR</span>
              <div className="text-3xl font-black text-slate-100">₦5,000 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
              <p className="text-xs text-slate-400 mt-1">For creators & brands publishing consistently</p>
              <ul className="space-y-2.5 pt-5 text-xs text-slate-300">
                {['Up to 3 Brands or Creator Profiles', 'Full 20-Day Content Calendar', 'Unlimited Caption & Hook Generation', 'Substack / Instagram / TikTok Formats', 'Visual Studio & Brand Memory', 'WhatsApp & Clipboard Export'].map((f) => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => { onSelectPlan('MONTHLY'); onStartGameplan(); }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-amber-500/20">
              Subscribe Monthly
            </button>
          </div>

          {/* RETAINER */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">RETAINER</span>
              <div className="text-3xl font-black text-slate-100">₦15,000 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
              <p className="text-xs text-slate-400 mt-1">For creators & brands who want expert oversight</p>
              <ul className="space-y-2.5 pt-5 text-xs text-slate-300">
                {['Everything in Creator Plan', 'Strategy Review by Neye (Lead Strategist)', 'Monthly 30-min Strategy Call', 'WhatsApp Direct Access', 'Bespoke Human Designer Access'].map((f) => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => { onSelectPlan('RETAINER'); onStartGameplan(); }}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-indigo-600/20">
              Join Retainer
            </button>
          </div>
        </div>
      </section>

      {/* BESPOKE CTA */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-900/80 p-8 rounded-3xl text-center space-y-4 shadow-2xl">
          <h2 className="text-xl font-bold text-slate-100">Need something built around you, specifically?</h2>
          <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
            Whether you're a creator with a complex niche, a personal brand going through a pivot, or a business that needs end-to-end brand architecture — talk directly to our team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button onClick={handleTalkToNeye}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition">
              <MessageSquare className="w-4 h-4" />
              <span>Talk to Neye — Lead Strategist (+234 916 271 6205)</span>
            </button>
            <button onClick={handleTalkToIyiola}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition">
              <MessageSquare className="w-4 h-4" />
              <span>Talk to Iyiola — Ops & Support (+234 703 229 3819)</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
