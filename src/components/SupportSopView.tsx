'use client';

import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Smartphone, Video, ShieldCheck, ChevronRight } from 'lucide-react';

export const SupportSopView: React.FC = () => {
  const [activeGuide, setActiveGuide] = useState<number>(0);

  const sops = [
    {
      title: 'WhatsApp Status High-Conversion SOP',
      category: 'COMMERCE EXECUTION',
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
      steps: [
        'Frame 1 (Morning 8:00 AM): Post a relatable friction hook text status (e.g., "If you are running an SME in Lagos today, don\'t make this mistake...").',
        'Frame 2 (11:30 AM): Share 1 unretouched photo/video of your product or client work in progress.',
        'Frame 3 (3:00 PM): Share 1 screenshot of customer proof, payment receipt (with client name blurred), or WhatsApp review.',
        'Frame 4 (7:00 PM): Direct CTA: "We have 4 slots available for tomorrow. Reply \'READY\' to claim yours now."',
        'Closing Rule: Always reply to DMs within 15 minutes. Use voice notes to build instant personal trust.',
      ],
    },
    {
      title: 'Instagram Feed & Carousel Batching SOP',
      category: 'CONTENT SYSTEM',
      icon: <Smartphone className="w-5 h-5 text-pink-400" />,
      steps: [
        'Batching Strategy: Schedule 3 hours every Sunday to review your 20-Day CCS Gameplan.',
        'Carousel Rule: Slide 1 must contain a 5-word scroll-stopping hook. Slide 2-4 deliver punchy value. Slide 5 delivers a single CTA.',
        'Caption Formatting: Keep first 2 lines under 80 characters before the "...more" fold.',
        'Comment Closing: When anyone leaves a comment, reply with a question to double engagement velocity within the first 60 minutes.',
      ],
    },
    {
      title: 'TikTok Organic Hook SOP',
      category: 'ATTENTION HARVESTING',
      icon: <Video className="w-5 h-5 text-amber-400" />,
      steps: [
        'The First 3 Seconds: Start in motion. Speak immediately. Never start with "Hello guys, welcome back to my page".',
        'Problem Demonstration: Show the exact problem your business solves within the first 7 seconds.',
        'Authentic Voice: Use conversational Nigerian English without forcing fake slang. Speak with conviction.',
        'Pinned Comments: Always pin your WhatsApp link or order phone number as the top comment.',
      ],
    },
    {
      title: 'Nigerian Price Objection Closing SOP',
      category: 'SALES CLOSING',
      icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
      steps: [
        'When client says "Your price is too high": Never immediately discount your core price.',
        'Reframe value: "I completely understand. Cheap alternatives exist, but when they fail on day 10, the replacement cost doubles. We build to last."',
        'Offer rational bridge: Direct them to your mid-tier bundle option from your Brand Gameplan.',
      ],
    },
  ];

  return (
    <div className="space-y-6 pb-28 max-w-4xl mx-auto px-4 pt-4 animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <span className="px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider block w-max mb-2">
          NIGERIAN SME PLAYBOOK & SOPS
        </span>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100">Standard Operating Procedures</h1>
        <p className="text-xs text-slate-400 mt-1">Plain-English execution rules for WhatsApp, Instagram, TikTok & sales closing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left SOP List Selector */}
        <div className="space-y-2">
          {sops.map((sop, idx) => (
            <button
              key={idx}
              onClick={() => setActiveGuide(idx)}
              className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center justify-between ${
                activeGuide === idx
                  ? 'bg-amber-500/15 border-amber-500/50 text-slate-100'
                  : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-3">
                {sop.icon}
                <div>
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">{sop.category}</span>
                  <span className="text-xs font-bold truncate max-w-[160px] block">{sop.title}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          ))}
        </div>

        {/* Right Active SOP Guide Content */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
            {sops[activeGuide].icon}
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                {sops[activeGuide].category}
              </span>
              <h2 className="text-base font-bold text-slate-100">{sops[activeGuide].title}</h2>
            </div>
          </div>

          <div className="space-y-3">
            {sops[activeGuide].steps.map((step, sIdx) => (
              <div key={sIdx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {sIdx + 1}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
