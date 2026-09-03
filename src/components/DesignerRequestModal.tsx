'use client';

import React, { useState } from 'react';
import { useAppStore, PostItem } from '@/stores/useAppStore';
import { UserCheck, X, Send, Sparkles } from 'lucide-react';

interface DesignerRequestModalProps {
  post: PostItem;
  onClose: () => void;
}

export const DesignerRequestModal: React.FC<DesignerRequestModalProps> = ({ post, onClose }) => {
  const { submitDesignerRequest, activeBrandId, activeBrandDna } = useAppStore();
  const [direction, setDirection] = useState(
    `Need a bespoke human graphic layout for Day ${post.dayNumber} [${post.pillar}]. Incorporate product packaging texture and high-contrast typography.`
  );
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!direction.trim()) return;

    submitDesignerRequest(activeBrandId, direction, post.id);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-indigo-900/80 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <UserCheck className="w-5 h-5" />
            <h2 className="text-sm font-bold text-slate-100">Bespoke Human Designer Brief</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-2">
            <Sparkles className="w-8 h-8 text-indigo-400 animate-bounce mx-auto" />
            <h3 className="text-sm font-bold text-slate-100">Brief Escalated Successfully!</h3>
            <p className="text-xs text-slate-400">
              Your Brand DNA, post context, and instructions have been bundled and sent to senior designers.
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-300">
              When AI is not enough for complex design, escalate to a human designer. Your brief automatically includes your Brand DNA rules, palette, and campaign context.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-indigo-400 uppercase block mb-1">
                  Specific Design Instructions
                </label>
                <textarea
                  rows={4}
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-[10px] text-slate-400 space-y-1">
                <span className="font-bold text-slate-300 block">Auto-Attached Brief Metadata:</span>
                <p>• Brand DNA & Color Rationale pre-loaded</p>
                <p>• Post Hook: "{post.hook.slice(0, 30)}..."</p>
                <p>• Target Format: Mobile Instagram / WhatsApp 4:5</p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Brief to Operator</span>
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
};
