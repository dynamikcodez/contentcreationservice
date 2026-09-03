'use client';

import React from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { Target, Compass, Palette, ShieldAlert, Sparkles, Zap, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';

export const GameplanView: React.FC = () => {
  const { activeBrandDna, brands, activeBrandId, pricingTiers } = useAppStore();
  const brand = brands.find((b) => b.id === activeBrandId) || brands[0];

  if (!activeBrandDna) {
    return (
      <div className="p-6 text-center text-slate-400">
        <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-3" />
        <p className="text-sm font-medium">Generating Brand DNA & Strategic Playbook...</p>
      </div>
    );
  }

  const { colourSystem, verbalIdentity, visualPersonality } = activeBrandDna;

  return (
    <div className="space-y-6 pb-24 max-w-4xl mx-auto px-4 pt-4 animate-in fade-in duration-300">
      
      {/* Strategic Header Document Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <span className="px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold rounded-full uppercase tracking-wider">
            CCS Ultra Strategic Gameplan
          </span>
          <span className="text-xs text-slate-400 font-mono">
            CALIBRATED BRAND DNA // v4.0
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 mb-2 tracking-tight">
          {brand.name}
        </h1>
        <p className="text-sm sm:text-base text-amber-300/90 font-medium mb-6 leading-relaxed max-w-2xl">
          "{activeBrandDna.positioning}"
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-800/80 pt-4 text-xs">
          <div>
            <span className="text-slate-400 uppercase text-[10px] tracking-wider block font-semibold">Target Audience</span>
            <span className="text-slate-200 font-medium">{brand.audience}</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase text-[10px] tracking-wider block font-semibold">Location Focus</span>
            <span className="text-slate-200 font-medium">{brand.location}</span>
          </div>
          <div>
            <span className="text-slate-400 uppercase text-[10px] tracking-wider block font-semibold">Unique Selling Proposition</span>
            <span className="text-slate-200 font-medium">{brand.usp}</span>
          </div>
        </div>
      </div>

      {/* Brand Personality & Emotional Territory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Brand Personality Traits</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeBrandDna.brandPersonality.map((trait, i) => (
              <span key={i} className="px-3 py-1 bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium">
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Compass className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Emotional Territory</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeBrandDna.emotionalTerritory.map((emo, i) => (
              <span key={i} className="px-3 py-1 bg-indigo-950/60 text-indigo-300 border border-indigo-800/60 rounded-xl text-xs font-medium">
                {emo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Colour System (Observed vs Recommended) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Brand Colour System</h2>
          </div>
          <span className="text-[11px] text-slate-400">Preserves original identity + recommended upgrades</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Observed Palette */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Observed Brand Palette
            </span>
            <div className="flex items-center gap-2">
              {colourSystem.observedPalette.map((hex, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-lg shadow-inner border border-slate-700" style={{ backgroundColor: hex.includes('#') ? hex : '#475569' }} />
                  <span className="text-[9px] text-slate-400 font-mono">{hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Palette */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-2">
              Recommended Art Direction Palette
            </span>
            <div className="flex items-center gap-2">
              {colourSystem.recommendedPalette.map((hex, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-lg shadow-inner border border-slate-700" style={{ backgroundColor: hex }} />
                  <span className="text-[9px] text-amber-300 font-mono">{hex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 italic">
          Rationale: {colourSystem.rationale}
        </p>
      </div>

      {/* Psychological Pricing Structure (Section 28) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-amber-400" />
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Psychological Pricing Architecture</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-xl p-4 flex flex-col justify-between border transition ${
                tier.recommended
                  ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div>
                {tier.recommended && (
                  <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-bold text-[9px] rounded-full uppercase tracking-wider inline-block mb-2">
                    Recommended Offer Bridge
                  </span>
                )}
                <h3 className="font-bold text-slate-100 text-sm">{tier.name}</h3>
                <div className="text-amber-400 font-extrabold text-base my-1">{tier.price}</div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">{tier.description}</p>
              </div>

              <div className="border-t border-slate-800/80 pt-2 text-[10px] text-slate-400 italic">
                {tier.psychologicalHook}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual & Photography Rules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Photography Direction</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{activeBrandDna.photographyDirection}</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Composition Rules</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{activeBrandDna.compositionDirection}</p>
        </div>
      </div>

      {/* Things to Avoid (Anti-AI-Slop Filter - Section 4) */}
      <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-red-400">
          <ShieldAlert className="w-4 h-4" />
          <h2 className="text-xs font-bold uppercase tracking-wider">Visual Conventions & AI Slop to Avoid</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {activeBrandDna.thingsToAvoid.map((avoidItem, i) => (
            <span key={i} className="px-3 py-1 bg-red-950/60 border border-red-900/60 text-red-300 rounded-xl text-xs font-medium">
              × {avoidItem}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};
