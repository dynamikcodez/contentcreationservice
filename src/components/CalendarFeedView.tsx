'use client';

import React, { useState } from 'react';
import { useAppStore, PostItem } from '@/stores/useAppStore';
import {
  Sparkles,
  Wand2,
  Edit3,
  Copy,
  Check,
  Share2,
  AlertCircle,
  RefreshCw,
  UserCheck,
  PlusCircle,
  Download,
  FileSpreadsheet,
  FileText,
  MessageSquare,
  ExternalLink,
  X,
  Layers,
  Key,
} from 'lucide-react';
import {
  downloadPostFlyerAsPng,
  downloadPostCopyAsTxt,
  exportCalendarAsCsv,
  exportCalendarAsMarkdown,
  downloadAllFlyersAsPng,
  copyFullCalendarForWhatsApp,
} from '@/lib/exportUtils';
import { DEMO_BRANDS } from '@/lib/seeds';

interface CalendarFeedViewProps {
  onOpenEditModal: (post: PostItem) => void;
  onOpenMagicWandModal: (post: PostItem) => void;
  onOpenDesignerModal: (post: PostItem) => void;
  onOpenApiKeyModal?: (reason?: string) => void;
}

export const CalendarFeedView: React.FC<CalendarFeedViewProps> = ({
  onOpenEditModal,
  onOpenMagicWandModal,
  onOpenDesignerModal,
  onOpenApiKeyModal,
}) => {
  const {
    posts,
    generateVisualForPost,
    regeneratePostText,
    generateSingleDay,
    activeBrandDna,
    brands,
    activeBrandId,
    pricingTiers,
    setFeedbackToast,
  } = useAppStore();

  const safePosts = Array.isArray(posts) && posts.length > 0 ? posts : [];
  const safeBrands = Array.isArray(brands) && brands.length > 0 ? brands : DEMO_BRANDS;
  const brand = safeBrands.find((b) => b && b.id === activeBrandId) || safeBrands[0] || DEMO_BRANDS[0];
  const brandName = brand?.name || 'AURA NAIJA';

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showSingleDayForm, setShowSingleDayForm] = useState(false);
  const [singlePillar, setSinglePillar] = useState('Customer Testimonial');
  const [singleContext, setSingleContext] = useState('Weekend flash promo offer');

  // Sharing & Export States
  const [sharingPost, setSharingPost] = useState<PostItem | null>(null);
  const [downloadingPostId, setDownloadingPostId] = useState<string | null>(null);
  const [isBatchDownloading, setIsBatchDownloading] = useState(false);
  const [whatsAppCopied, setWhatsAppCopied] = useState(false);

  const readyFlyersCount = safePosts.filter((p) => p && p.visualStatus === 'READY' && p.imageUrl).length;

  const handleCopyPost = (post: PostItem) => {
    const text = `DAY ${post.dayNumber} [${post.phase}]\n\nHOOK:\n${post.hook}\n\nCAPTION:\n${post.caption}\n\nCTA:\n${post.cta}`;
    navigator.clipboard.writeText(text);
    setCopiedId(post.id);
    setFeedbackToast(`Day ${post.dayNumber} copy copied to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadFlyer = async (post: PostItem) => {
    if (!post.imageUrl) {
      // Trigger generation first if not ready
      setFeedbackToast(`Rendering Day ${post.dayNumber} visual flyer first...`);
      await generateVisualForPost(post.id);
      return;
    }

    setDownloadingPostId(post.id);
    setFeedbackToast(`Downloading Day ${post.dayNumber} standard flyer (PNG)...`);
    await downloadPostFlyerAsPng(post, brandName);
    setDownloadingPostId(null);
  };

  const handleDownloadAllFlyers = async () => {
    if (readyFlyersCount === 0) {
      alert('No flyers are ready to download yet. Click "Generate Visual Concept" on any post to create standard flyers.');
      return;
    }

    setIsBatchDownloading(true);
    setFeedbackToast(`Downloading all ${readyFlyersCount} flyers as PNGs...`);
    await downloadAllFlyersAsPng(posts, brandName);
    setIsBatchDownloading(false);
    setFeedbackToast(`Successfully downloaded ${readyFlyersCount} flyers!`);
  };

  const handleExportCsv = () => {
    exportCalendarAsCsv(posts, brandName);
    setFeedbackToast('20-Day Calendar exported as CSV spreadsheet!');
  };

  const handleExportMarkdown = () => {
    exportCalendarAsMarkdown(posts, brand, activeBrandDna, pricingTiers);
    setFeedbackToast('Full Brand Strategy Playbook exported as Markdown!');
  };

  const handleCopyWhatsAppSequence = () => {
    const sequence = copyFullCalendarForWhatsApp(posts, brandName);
    navigator.clipboard.writeText(sequence);
    setWhatsAppCopied(true);
    setFeedbackToast('Full 20-Day Campaign formatted & copied for WhatsApp!');
    setTimeout(() => setWhatsAppCopied(false), 2500);
  };

  const handleAddSingleDay = () => {
    generateSingleDay(singlePillar, singleContext);
    setShowSingleDayForm(false);
  };

  return (
    <div className="space-y-6 pb-28 max-w-2xl mx-auto px-4 pt-4 animate-in fade-in duration-300">
      
      {/* ========================================================================= */}
      {/* SECTION: DOWNLOAD & EXPORT FULL CALENDAR CENTER */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-700/80 p-5 rounded-3xl shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                EXPORT CENTER
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {readyFlyersCount} of {posts.length} Flyers Rendered
              </span>
            </div>
            <h2 className="text-base font-extrabold text-slate-100 mt-1">
              Download Full Campaign & Assets
            </h2>
            <p className="text-xs text-slate-400">
              Export your complete 20-day marketing system as CSV, Playbook document, WhatsApp sequence, or PNG flyers.
            </p>
          </div>

          <button
            onClick={() => setShowSingleDayForm(!showSingleDayForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 rounded-xl text-xs font-bold transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Generate Today's Post</span>
          </button>
        </div>

        {/* 4 Primary Export Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {/* Action 1: CSV Export */}
          <button
            onClick={handleExportCsv}
            className="flex flex-col items-center text-center p-3 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 rounded-2xl transition group"
            title="Download CSV formatted for Excel, Google Sheets, Buffer, and Notion"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-200">Export CSV</span>
            <span className="text-[9px] text-slate-400 mt-0.5">Excel / Buffer</span>
          </button>

          {/* Action 2: Markdown Playbook */}
          <button
            onClick={handleExportMarkdown}
            className="flex flex-col items-center text-center p-3 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 rounded-2xl transition group"
            title="Download complete Strategic Playbook & Copy as Markdown"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-200">Playbook Doc</span>
            <span className="text-[9px] text-slate-400 mt-0.5">Markdown / PDF</span>
          </button>

          {/* Action 3: Batch PNG Flyers Download */}
          <button
            onClick={handleDownloadAllFlyers}
            disabled={isBatchDownloading || readyFlyersCount === 0}
            className={`flex flex-col items-center text-center p-3 rounded-2xl border transition group ${
              readyFlyersCount > 0
                ? 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-300'
                : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60 cursor-not-allowed'
            }`}
            title="Download all generated flyers as 1080x1350 PNG files"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
              <Download className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-200">
              {isBatchDownloading ? 'Downloading...' : 'Download Flyers'}
            </span>
            <span className="text-[9px] text-amber-400/80 mt-0.5">
              {readyFlyersCount} PNGs Ready
            </span>
          </button>

          {/* Action 4: WhatsApp Broadcast Sequence */}
          <button
            onClick={handleCopyWhatsAppSequence}
            className="flex flex-col items-center text-center p-3 bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 rounded-2xl transition group"
            title="Copy 20-Day Sequence formatted for WhatsApp Status & Broadcasts"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-1.5 group-hover:scale-105 transition">
              {whatsAppCopied ? <Check className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
            </div>
            <span className="text-xs font-bold text-slate-200">
              {whatsAppCopied ? 'Copied!' : 'WhatsApp Copy'}
            </span>
            <span className="text-[9px] text-emerald-400/80 mt-0.5">Full 20 Days</span>
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

      {/* ========================================================================= */}
      {/* 20-DAY FEED VERTICAL CARDS */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        {safePosts.filter(Boolean).map((post) => (
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
              <span className="text-[11px] text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full font-medium">
                {post.pillar}
              </span>
            </div>

            {/* Visual Flyer Container (4:5 Portrait Flyer Ratio) */}
            <div className="relative aspect-[4/5] bg-slate-950 flex flex-col items-center justify-center border-b border-slate-800/80 overflow-hidden group">
              {post.visualStatus === 'READY' && post.imageUrl ? (
                <>
                  <img
                    src={post.imageUrl}
                    alt={`${brandName} Day ${post.dayNumber} Flyer`}
                    className="w-full h-full object-cover"
                  />

                  {/* Top Left: Direct Download Flyer Badge */}
                  <button
                    onClick={() => handleDownloadFlyer(post)}
                    disabled={downloadingPostId === post.id}
                    className="absolute top-3 left-3 bg-slate-950/85 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xl transition backdrop-blur-md"
                    title="Download High-Res 1080x1350 PNG Flyer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloadingPostId === post.id ? 'Saving...' : 'Download Flyer (PNG)'}</span>
                  </button>

                  {/* Top Right: Creative Critic Score Badge */}
                  {post.criticScore && (
                    <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 px-2.5 py-1 rounded-full text-[10px] text-slate-200 flex items-center gap-1 shadow-lg">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Critic:</span>
                      <span className="font-extrabold text-amber-400">
                        {post.criticScore.brandSpecificity}%
                      </span>
                    </div>
                  )}

                  {/* Bottom Right: Magic Wand Quick Overlay */}
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
                    Designing 1080x1350 Marketing Flyer...
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Calibrating typography, colors & anti-slop rules
                  </p>
                </div>
              ) : post.visualStatus === 'FAILED' ? (
                <div className="text-center p-5 space-y-3 bg-slate-900/80 rounded-2xl border border-amber-500/20 m-3 shadow-inner">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-400">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-300">
                      AI Generation Limit / Quota Notice
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      {post.failureReason || 'Gemini image generation timed out or exceeded free tier quota.'}
                    </p>
                  </div>
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => onOpenApiKeyModal?.(post.failureReason || 'AI image generation encountered a quota or timeout issue.')}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md transition"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>Update / BYO Gemini API Key</span>
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => generateVisualForPost(post.id, true)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition"
                        title="Renders deterministic 1080x1350 vector marketing flyer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Render Standard Flyer</span>
                      </button>
                      <button
                        onClick={() => generateVisualForPost(post.id)}
                        className="flex items-center justify-center gap-1 px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
                        title="Retry AI Generation"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Retry</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-400">
                    <Wand2 className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Marketing Flyer Ready</h4>
                    <p className="text-[10px] text-slate-400 max-w-xs mt-0.5">
                      Art direction calibrated. Click below to render standard flyer.
                    </p>
                  </div>
                  <button
                    onClick={() => generateVisualForPost(post.id)}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition"
                  >
                    Generate Flyer (1080x1350)
                  </button>
                </div>
              )}
            </div>

            {/* Post Copy & Content */}
            <div className="p-5 space-y-4">
              {/* Hook */}
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  HOOK (Scroll Stopper)
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

              {/* BOTTOM CARD ACTION TOOLBAR (With Share & Download Buttons) */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                
                {/* Left Primary Actions: Download & Share */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Download Flyer Button */}
                  <button
                    onClick={() => handleDownloadFlyer(post)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 rounded-xl text-xs font-bold transition"
                    title="Download standard 1080x1350 PNG flyer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Flyer</span>
                  </button>

                  {/* Share Post Button */}
                  <button
                    onClick={() => setSharingPost(post)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-medium transition"
                    title="Share to WhatsApp, X, or Copy Full Text"
                  >
                    <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Share</span>
                  </button>

                  {/* Copy Copy Button */}
                  <button
                    onClick={() => handleCopyPost(post)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                    title="Copy Caption & Hook"
                  >
                    {copiedId === post.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* Edit Post Text */}
                  <button
                    onClick={() => onOpenEditModal(post)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                    title="Edit Hook, Caption & CTA"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {/* Regenerate Post Text */}
                  <button
                    onClick={() => regeneratePostText(post.id)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                    title="Regenerate Copy with Higher Authority"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Right Action: Human Designer Escalation */}
                <button
                  onClick={() => onOpenDesignerModal(post)}
                  className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium transition"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Escalate to Designer</span>
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: POST SHARE SHEET (WhatsApp, Native Share, Text Download) */}
      {/* ========================================================================= */}
      {sharingPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  SHARE & PUBLISH
                </span>
                <h3 className="text-sm font-extrabold text-slate-100">
                  Day {sharingPost.dayNumber} — {sharingPost.pillar}
                </h3>
              </div>
              <button
                onClick={() => setSharingPost(null)}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Preview */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs space-y-2 max-h-36 overflow-y-auto">
              <p className="font-bold text-slate-200">"{sharingPost.hook}"</p>
              <p className="text-slate-400 leading-relaxed text-[11px] line-clamp-3">
                {sharingPost.caption}
              </p>
            </div>

            {/* Share Options */}
            <div className="space-y-2.5">
              {/* Option 1: Direct WhatsApp Share */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `*${brandName.toUpperCase()} — DAY ${sharingPost.dayNumber}*\n\n` +
                    `*${sharingPost.hook}*\n\n` +
                    `${sharingPost.caption}\n\n` +
                    `👉 *CTA:* ${sharingPost.cta}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Share Direct to WhatsApp</span>
              </a>

              {/* Option 2: Download Flyer PNG */}
              <button
                onClick={() => {
                  handleDownloadFlyer(sharingPost);
                  setSharingPost(null);
                }}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
              >
                <Download className="w-4 h-4" />
                <span>Download Flyer (PNG)</span>
              </button>

              {/* Option 3: Download Copy as TXT file */}
              <button
                onClick={() => {
                  downloadPostCopyAsTxt(sharingPost, brandName);
                  setFeedbackToast(`Downloaded Day ${sharingPost.dayNumber} copy as text!`);
                  setSharingPost(null);
                }}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Download Copy (.txt)</span>
              </button>

              {/* Option 4: Copy to Clipboard */}
              <button
                onClick={() => {
                  handleCopyPost(sharingPost);
                  setSharingPost(null);
                }}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
              >
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Copy Caption to Clipboard</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
