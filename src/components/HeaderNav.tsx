'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { Sparkles, Key, ShieldCheck, ChevronDown, Check, Zap } from 'lucide-react';

interface HeaderNavProps {
  onOpenOperator: () => void;
  onOpenOnboarding: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onOpenOperator, onOpenOnboarding }) => {
  const { activeBrandId, brands, selectBrand, plan, setPlan, byoApiKey } = useAppStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeBrand = brands.find((b) => b.id === activeBrandId) || brands[0];

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        
        {/* Brand Dropdown Selector */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 px-3 py-1.5 rounded-xl transition text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs">
              {activeBrand?.name.charAt(0) || 'C'}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-slate-100 truncate max-w-[130px] sm:max-w-[180px]">
                  {activeBrand?.name || 'Select Brand'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <p className="text-[10px] text-slate-400 truncate max-w-[130px] sm:max-w-[180px]">
                {activeBrand?.industry || 'Brand Identity'}
              </p>
            </div>
          </button>

          {/* Brand Selector Dropdown */}
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Switch Active Brand
              </div>
              <div className="space-y-1">
                {brands.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      selectBrand(b.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between text-xs transition ${
                      b.id === activeBrandId
                        ? 'bg-amber-500/15 text-amber-300 font-medium border border-amber-500/30'
                        : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="truncate">{b.name}</span>
                    {b.id === activeBrandId && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-800 my-2 pt-2">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenOnboarding();
                  }}
                  className="w-full text-center py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded-xl transition shadow-lg shadow-amber-500/20"
                >
                  + Create New Brand DNA
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Badges & Controls */}
        <div className="flex items-center gap-2">
          
          {/* Plan Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-amber-400">{plan}</span>
          </div>

          {/* BYO Key indicator */}
          {byoApiKey ? (
            <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-[10px] font-medium" title="User BYO API Key Active">
              <Key className="w-3 h-3" />
              <span className="hidden sm:inline">BYO Key</span>
            </div>
          ) : null}

          {/* Operator Console Trigger */}
          <button
            onClick={onOpenOperator}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 transition"
            title="Open Internal Operator Console"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Operator</span>
          </button>
        </div>
      </div>
    </header>
  );
};
