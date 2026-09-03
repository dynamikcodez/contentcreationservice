'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { ShieldCheck, Key, Zap, X, Check, Database, Activity, RefreshCw } from 'lucide-react';

interface OperatorConsoleModalProps {
  onClose: () => void;
}

export const OperatorConsoleModal: React.FC<OperatorConsoleModalProps> = ({ onClose }) => {
  const {
    plan,
    setPlan,
    usage,
    byoApiKey,
    setByoApiKey,
    validationMode,
    designerRequests,
    posts,
  } = useAppStore();

  const [inputKey, setInputKey] = useState(byoApiKey || '');
  const [keySaved, setKeySaved] = useState(false);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    setByoApiKey(inputKey);
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-3xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-100">CCS Ultra Operator Console</h2>
                {validationMode && (
                  <span className="px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] rounded-full uppercase font-bold">
                    VALIDATION_MODE ACTIVE
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">Internal engine metrics, BYO provider routing & quotas</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* System Usage Accounting Metrics (Section 15 & 58) */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-amber-400" />
              Generation Quota Accounting
            </span>
            <span className="text-slate-400 font-mono text-[10px]">
              {usage.imageGenerations} / {usage.maxImageGenerations} Images Used
            </span>
          </div>

          {/* Quota Progress Bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${Math.min(100, (usage.imageGenerations / usage.maxImageGenerations) * 100)}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800/80 text-center">
              <span className="text-slate-400 block text-[9px] uppercase">Plan Tier</span>
              <span className="font-bold text-amber-400">{plan}</span>
            </div>
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800/80 text-center">
              <span className="text-slate-400 block text-[9px] uppercase">Calendar Posts</span>
              <span className="font-bold text-slate-200">{posts.length}</span>
            </div>
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800/80 text-center">
              <span className="text-slate-400 block text-[9px] uppercase">Designer Reqs</span>
              <span className="font-bold text-indigo-400">{designerRequests.length}</span>
            </div>
          </div>
        </div>

        {/* Plan Switcher Simulator (Section 31) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Subscription Plan Switcher (Simulation)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['TRY_IT', 'MONTHLY', 'RETAINER'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPlan(p)}
                className={`py-2 rounded-xl text-xs font-bold transition border ${
                  plan === p
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {p === 'TRY_IT' ? 'TRY IT (₦0)' : p === 'MONTHLY' ? 'MONTHLY (₦5k)' : 'RETAINER (₦15k)'}
              </button>
            ))}
          </div>
        </div>

        {/* BYO AI Provider Connection (Section 17) */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <Key className="w-4 h-4 text-emerald-400" />
              <span>Connect Custom AI Provider (BYO API Key)</span>
            </div>
            {byoApiKey && (
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md font-medium">
                Active
              </span>
            )}
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Optionally supply your own Gemini API key to unlock unlimited generation capacity. Keys are encrypted and processed server-side only.
          </p>

          <form onSubmit={handleSaveKey} className="flex gap-2">
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy... (Gemini API Key)"
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1 shadow-lg shadow-emerald-600/20"
            >
              {keySaved ? <Check className="w-4 h-4" /> : 'Save Key'}
            </button>
          </form>
        </div>

        {/* Operator Controls */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs"
          >
            Close Operator Panel
          </button>
        </div>

      </div>
    </div>
  );
};
