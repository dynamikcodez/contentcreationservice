'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { Palette, Sparkles, Layers, Image as ImageIcon, Sliders, UserCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CreativeStudioView: React.FC = () => {
  const { activeBrandDna, posts, designerRequests, activeBrandId, brands } = useAppStore();
  const [subSection, setSubSection] = useState<'strategy' | 'concepts' | 'artDirection' | 'visuals' | 'bespoke'>('artDirection');

  const brand = brands.find((b) => b.id === activeBrandId) || brands[0];
  const generatedVisuals = posts.filter((p) => p.visualStatus === 'READY' && p.imageUrl);

  return (
    <div className="space-y-6 pb-28 max-w-4xl mx-auto px-4 pt-4 animate-in fade-in duration-300">
      
      {/* Studio Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-bold rounded-full uppercase tracking-wider block mb-1">
            CREATIVE OPERATING STUDIO
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100">{brand.name} Studio</h1>
          <p className="text-xs text-slate-400">Art direction, visual assets & bespoke human designer queue</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-2xl text-xs">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-slate-300 font-semibold">{generatedVisuals.length} Visual Assets Ready</span>
        </div>
      </div>

      {/* Sub-Section Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
        {[
          { id: 'artDirection', label: 'Art Direction', icon: <Palette className="w-3.5 h-3.5" /> },
          { id: 'concepts', label: 'Concepts', icon: <Layers className="w-3.5 h-3.5" /> },
          { id: 'visuals', label: 'Visual Gallery', icon: <ImageIcon className="w-3.5 h-3.5" /> },
          { id: 'bespoke', label: 'Human Escalations', icon: <UserCheck className="w-3.5 h-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubSection(tab.id as any)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              subSection === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* SUB-SECTION 1: ART DIRECTION */}
      {subSection === 'artDirection' && activeBrandDna && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Visual Aesthetic Mode</h3>
            <p className="text-sm font-bold text-slate-100">{activeBrandDna.visualPersonality?.aestheticMode || 'Editorial Photography'}</p>
            <p className="text-xs text-slate-300 leading-relaxed">{activeBrandDna.visualPersonality?.overallMood}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Lighting Rules</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{activeBrandDna.photographyDirection}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Graphic & Line Language</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{activeBrandDna.graphicLanguage}</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-SECTION 2: CONCEPTS */}
      {subSection === 'concepts' && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Campaign Creative Concepts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {posts.slice(0, 6).map((post) => (
              <div key={post.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-amber-400">DAY {post.dayNumber} CONCEPT</span>
                  <span className="text-slate-400">{post.pillar}</span>
                </div>
                <h4 className="font-bold text-slate-200 text-xs">{post.hook}</h4>
                <p className="text-[11px] text-slate-400">Objective: {post.strategicObjective}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-SECTION 3: VISUAL GALLERY */}
      {subSection === 'visuals' && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Generated Brand Assets</h3>
          {generatedVisuals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {generatedVisuals.map((post) => (
                <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                  <div className="aspect-[4/5] bg-slate-950">
                    <img src={post.imageUrl} alt={`Visual Day ${post.dayNumber}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 text-xs">
                    <span className="font-bold text-amber-400 block mb-1">DAY {post.dayNumber}</span>
                    <p className="text-slate-300 line-clamp-2 text-[11px]">{post.hook}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-xs">
              No generated visuals in gallery yet. Go to the Calendar tab to render your first post image!
            </div>
          )}
        </div>
      )}

      {/* SUB-SECTION 4: BESPOKE HUMAN ESCALATION QUEUE (Section 21 & 22) */}
      {subSection === 'bespoke' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-indigo-900/60 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-indigo-400">
              <UserCheck className="w-5 h-5" />
              <h3 className="text-sm font-bold">Human Designer Escalation Queue</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When AI is not enough for complex packaging, custom typography, or heavy video editing, requests route directly to Neye & vetted senior creative designers with complete Brand DNA context pre-loaded.
            </p>
          </div>

          {designerRequests.length > 0 ? (
            <div className="space-y-3">
              {designerRequests.map((req) => (
                <div key={req.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold rounded-md uppercase tracking-wider block w-max mb-1">
                      STATUS: {req.status}
                    </span>
                    <p className="font-bold text-slate-200">{req.preferredDirection}</p>
                    <p className="text-[10px] text-slate-400">Submitted on {req.createdAt}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-xs">
              No bespoke human requests submitted yet.
            </div>
          )}
        </div>
      )}

    </div>
  );
};
