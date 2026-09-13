'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { Key, Sparkles, Check, X, ExternalLink, ShieldCheck, AlertTriangle, Eye, EyeOff } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: string;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, reason }) => {
  const { byoApiKey, setByoApiKey, setFeedbackToast } = useAppStore();
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (byoApiKey) {
      setApiKeyInput(byoApiKey);
    }
  }, [byoApiKey, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = apiKeyInput.trim();
    setByoApiKey(trimmed);
    setFeedbackToast(trimmed ? 'Gemini API key updated successfully!' : 'Using standard built-in flyer engine.');
    onClose();
  };

  const handleClear = () => {
    setApiKeyInput('');
    setByoApiKey('');
    setFeedbackToast('Cleared custom key. Using standard built-in flyer engine.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Google Gemini API Key (BYO)
              </h3>
              <p className="text-[11px] text-slate-400">
                Custom key for photorealistic AI & Gemini 3.6 inference
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Reason notice if triggered by generation failure */}
        {reason && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Image generation paused or timed out:</p>
              <p className="text-[11px] text-amber-200/90 leading-relaxed">{reason}</p>
            </div>
          </div>
        )}

        {/* Input Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-200">
              Gemini API Key
            </label>
            {byoApiKey ? (
              <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" />
                Active Key Connected
              </span>
            ) : (
              <span className="text-[10px] text-slate-400">No custom key set</span>
            )}
          </div>

          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AQ.Ab8RN6... or AIzaSy..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 pr-20 text-xs font-mono text-slate-100 focus:outline-none focus:border-amber-500 transition"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="p-1.5 text-slate-400 hover:text-slate-200 transition"
                title={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Your key stays in your browser and local environment. You can get a free API key from{' '}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline inline-flex items-center gap-0.5 font-semibold"
            >
              Google AI Studio <ExternalLink className="w-3 h-3 inline" />
            </a>.
          </p>
        </div>

        {/* Fallback Notice */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 text-xs space-y-1.5 text-slate-300">
          <div className="flex items-center gap-1.5 font-bold text-slate-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Built-in Hybrid Architecture</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            When an API key has free-tier quota limits or times out, CCS automatically generates standard 1080×1350 brand-calibrated marketing flyers so your campaign never breaks.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          {apiKeyInput ? (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-slate-400 hover:text-red-400 font-semibold transition"
            >
              Clear Key
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              Save Key
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
