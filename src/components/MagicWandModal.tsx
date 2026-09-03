'use client';

import React, { useState } from 'react';
import { useAppStore, PostItem } from '@/stores/useAppStore';
import { Wand2, X, Sparkles } from 'lucide-react';

interface MagicWandModalProps {
  post: PostItem;
  onClose: () => void;
}

export const MagicWandModal: React.FC<MagicWandModalProps> = ({ post, onClose }) => {
  const { refineVisualWithMagicWand } = useAppStore();
  const [prompt, setPrompt] = useState('Make the environment feel like a modern sunlit Lagos apartment with warm teak wood.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsSubmitting(true);
    await refineVisualWithMagicWand(post.id, prompt);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400">
            <Wand2 className="w-5 h-5" />
            <h2 className="text-sm font-bold text-slate-100">Magic Wand Visual Refiner</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300">
          Refines the background environment & camera framing while preserving product shape, packaging, and Brand DNA rules.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-amber-400 uppercase block mb-1">
              Visual Refinement Request
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Change environment to a warm outdoor terrace in Victoria Island..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
            />
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
              disabled={isSubmitting}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Refining Visual...</span>
                </>
              ) : (
                <span>Apply Refinement</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
