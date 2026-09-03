'use client';

import React, { useState } from 'react';
import { useAppStore, PostItem } from '@/stores/useAppStore';
import { Sparkles, Wand2, Edit3, Copy, Check, Share2, AlertCircle, RefreshCw, UserCheck, MessageSquare, PlusCircle } from 'lucide-react';

interface CalendarFeedViewProps {
  onOpenEditModal: (post: PostItem) => void;
  onOpenMagicWandModal: (post: PostItem) => void;
  onOpenDesignerModal: (post: PostItem) => void;
}

export const CalendarFeedView: React.FC<CalendarFeedViewProps> = ({
  onOpenEditModal,
  onOpenMagicWandModal,
  onOpenDesignerModal,
}) => {
  const { posts, generateVisualForPost, regeneratePostText, generateSingleDay, activeBrandDna } = useAppStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showSingleDayForm, setShowSingleDayForm] = useState(false);
  const [singlePillar, setSinglePillar] = useState('Customer Testimonial');
  const [singleContext, setSingleContext] = useState('Weekend flash promo offer');

  const handleCopyPost = (post: PostItem) => {
    const text = `DAY ${post.dayNumber} [${post.phase}]\n\nHOOK:\n${post.hook}\n\nCAPTION:\n${post.caption}\n\nCTA:\n${post.cta}`;
    navigator.clipboard.writeText(text);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWhatsAppExportAll = () => {
    const fullExport = posts
      .map(
        (p) =>
          `*DAY ${p.dayNumber} — ${p.pillar.toUpperCase()}*\n*HOOK:* ${p.hook}\n\n*CAPTION:*\n${p.caption}\n\n*CTA:* ${p.cta}\n----------------------------------`
      )
      .join('\n\n');

    navigator.clipboard.writeText(fullExport);
    alert('Full 20-Day Campaign exported to Clipboard! Ready to paste into WhatsApp.');
  };

  const handleAddSingleDay = () => {
    generateSingleDay(singlePillar, singleContext);
    setShowSingleDayForm(false);
  };

  return (
    <div className="space-y-6 pb-28 max-w-2xl mx-auto px-4 pt-4 animate-in fade-in duration-300">
      
      {/* Top Feed Actions Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-lg">
        <div>
          <h2 className="text-base font-bold text-slate-100">20-Day Campaign Feed</h2>
          <p className="text-xs text-slate-400">Narrative progression from Attention to Conversion</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSingleDayForm(!showSingleDayForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 rounded-xl text-xs font-bold transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Generate Today's Post</span>
          </button>

          <button
            onClick={handleWhatsAppExportAll}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 transition"
            title="Export Full 20-Day Calendar to WhatsApp Clipboard"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">WhatsApp Export</span>
          </button>
        </div>
      </div>

      {/* Single Day Custom Post Trigger Form */}
      {showSingleDayForm && (
        <div className="bg-slate-900 border border-amber-500/40 p-4 rounded-2xl space-y-3 animate-in fade-in slide-in-from-top-2">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Generate Custom Single-Day Post</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">Content Pillar</label>
              <input
                type="text"
                value={singlePillar}
                onChange={(e) => setSinglePillar(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase block mb-1">Specific Context / Event</label>
              <input
                type="text"
                value={singleContext}
                onChange={(e) => setSingleContext(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
          <button
            onClick={handleAddSingleDay}
            className="w-full py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition"
          >
            Generate Post Now
          </button>
        </div>
      )}

      {/* 20-Day Feed Vertical Cards */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-slate-700/80 transition duration-200"
          >
            {/* Card Header Pill & Meta */}
            <div className="px-5 py-3.5 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black rounded-lg">
                  DAY {post.dayNumber < 10 ? `0${post.dayNumber}` : post.dayNumber}
                </span>
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  {post.phase}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full font-medium">
                {post.pillar}
              </span>
            </div>

            {/* Visual Container */}
            <div className="relative aspect-[4/5] bg-slate-950 flex flex-col items-center justify-center border-b border-slate-800/80 overflow-hidden">
              {post.visualStatus === 'READY' && post.imageUrl ? (
                <>
                  <img
                    src={post.imageUrl}
                    alt={`Day ${post.dayNumber} Visual`}
                    className="w-full h-full object-cover"
                  />

                  {/* Creative Critic Score Badge (Section 19) */}
                  {post.criticScore && (
                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md border border-slate-700/80 px-2.5 py-1 rounded-full text-[10px] text-slate-200 flex items-center gap-1 shadow-lg">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Critic Score:</span>
                      <span className="font-extrabold text-amber-400">
                        {post.criticScore.brandSpecificity}%
                      </span>
                    </div>
                  )}

                  {/* Magic Wand Quick Overlay Trigger */}
                  <button
                    onClick={() => onOpenMagicWandModal(post)}
                    className="absolute bottom-3 right-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xl transition"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Magic Wand Refine</span>
                  </button>
                </>
              ) : post.visualStatus === 'GENERATING' ? (
                <div className="text-center p-6 space-y-3">
                  <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
                  <p className="text-xs font-semibold text-amber-300">
                    Art Directing & Rendering Visual...
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Calibrating against Brand DNA rules
                  </p>
                </div>
              ) : post.visualStatus === 'FAILED' ? (
                <div className="text-center p-6 space-y-3">
                  <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
                  <p className="text-xs text-red-300 font-medium">
                    Visual generation failed gracefully.
                  </p>
                  <button
                    onClick={() => generateVisualForPost(post.id)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-semibold rounded-xl"
                  >
                    Retry Visual Generation
                  </button>
                </div>
              ) : (
                <div className="text-center p-6 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
                    <Wand2 className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Visual Concept Ready</h4>
                    <p className="text-[10px] text-slate-400 max-w-xs mt-0.5">
                      Art direction logic set. Click below to render brand visual.
                    </p>
                  </div>
                  <button
                    onClick={() => generateVisualForPost(post.id)}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition"
                  >
                    Generate Visual Concept
                  </button>
                </div>
              )}
            </div>

            {/* Post Content Details */}
            <div className="p-5 space-y-4">
              {/* Hook */}
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  HOOK (Attention Grabber)
                </span>
                <h3 className="font-bold text-slate-100 text-sm leading-snug">
                  {post.hook}
                </h3>
              </div>

              {/* Caption */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  CAPTION (Brand-Calibrated Copy)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {post.caption}
                </p>
              </div>

              {/* CTA */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-0.5">
                  CALL TO ACTION (CTA)
                </span>
                <p className="text-xs text-slate-200 font-semibold">{post.cta}</p>
              </div>

              {/* Bottom Card Action Toolbar */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                
                {/* Left Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenEditModal(post)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                    title="Edit Hook, Caption & CTA"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => regeneratePostText(post.id)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                    title="Regenerate Post Text"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleCopyPost(post)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                    title="Copy Copy to Clipboard"
                  >
                    {copiedId === post.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Right Action: Human Designer Escalation (Section 21) */}
                <button
                  onClick={() => onOpenDesignerModal(post)}
                  className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium transition"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Escalate to Human Designer</span>
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
