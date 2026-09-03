'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Shield, Upload, X } from 'lucide-react';

interface IntakeOnboardingModalProps {
  onClose: () => void;
}

export const IntakeOnboardingModal: React.FC<IntakeOnboardingModalProps> = ({ onClose }) => {
  const { createBrandFromBrief } = useAppStore();
  const [step, setStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Form State
  const [brandName, setBrandName] = useState('Lagos Craft Bakery');
  const [industry, setIndustry] = useState('Artisanal Pastry & Coffee');
  const [location, setLocation] = useState('Lekki Phase 1, Lagos');
  const [usp, setUsp] = useState('100% real sourdough fermentation with zero preservatives, baked fresh daily at 6:00 AM.');
  const [description, setDescription] = useState(
    'We started Lagos Craft Bakery because we got tired of over-processed, sugar-laden bread in supermarkets. We source organic flour and slow-ferment our sourdough for 24 hours. Our customers come to us for authentic morning coffee and sourdough loaves that actually digest easily.'
  );
  const [audience, setAudience] = useState('Health-conscious Lagos professionals, families, and brunch enthusiasts in Lekki.');
  const [tone, setTone] = useState('Street-Smart & Relatable');
  const [pillars, setPillars] = useState<string[]>([
    'Baking Science & Fermentation',
    'Morning Rituals',
    'Unretouched Kitchen Process',
    'Weekend Brunch Offers',
  ]);

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    await createBrandFromBrief({
      brandName,
      industry,
      location,
      usp,
      description,
      audience,
      tone,
      pillars,
    });
    setIsGenerating(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
        
        {/* Progress Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
              STEP {step} OF 6 — INTAKE BRIEF
            </span>
            <h2 className="text-base font-extrabold text-slate-100">
              {step === 1 && 'Step 1: Brand Identity'}
              {step === 2 && 'Step 2: Tell Your Story'}
              {step === 3 && 'Step 3: Audience & Psychology'}
              {step === 4 && 'Step 4: Strategic Content Pillars'}
              {step === 5 && 'Step 5: Brand Asset Vault'}
              {step === 6 && 'Step 6: Voice & Brand Tone'}
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        {/* STEP 1: BRAND IDENTITY */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Brand Name</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-bold"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Industry</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-amber-400 block mb-1">
                What's the one thing competitors can't honestly say about themselves? (USP)
              </label>
              <input
                type="text"
                value={usp}
                onChange={(e) => setUsp(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        )}

        {/* STEP 2: TELL YOUR STORY */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Describe your business like you're talking to a friend who wants to refer you. Mention what you sell, who buys, why customers return, and how they discover you.
            </p>
            <div>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500 leading-relaxed"
              />
              <span className="text-[10px] text-slate-500 block text-right mt-1">
                {description.length} characters (Min 100 recommended)
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: AUDIENCE */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Who do you serve & what are their primary trust concerns?
              </label>
              <textarea
                rows={4}
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        )}

        {/* STEP 4: CONTENT PILLARS */}
        {step === 4 && (
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Select or edit your 4 core content pillars:
            </label>
            <div className="space-y-2">
              {pillars.map((pillar, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={pillar}
                  onChange={(e) => {
                    const newArr = [...pillars];
                    newArr[idx] = e.target.value;
                    setPillars(newArr);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-500 font-semibold"
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: ASSET VAULT */}
        {step === 5 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              Upload your logo or product photographs. CCS preserves your packaging, logo proportions, and recognizable colours.
            </p>
            <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center space-y-2 hover:border-amber-500/50 transition cursor-pointer">
              <Upload className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="text-xs font-bold text-slate-200">Tap to upload brand logos or product photos</p>
              <p className="text-[10px] text-slate-500">Supports PNG, JPG, WebP up to 10MB</p>
            </div>
          </div>
        )}

        {/* STEP 6: TONE */}
        {step === 6 && (
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Choose your brand's verbal tone:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'Luxury & Aspirational',
                'Street-Smart & Relatable',
                'Banter-Heavy & Witty',
                'Corporate & Trust-Building',
                'Let CCS determine',
              ].map((tOption) => (
                <button
                  key={tOption}
                  type="button"
                  onClick={() => setTone(tOption)}
                  className={`p-3 rounded-xl text-xs font-bold border text-left transition ${
                    tone === tOption
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tOption}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 6 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/20"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isGenerating}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-xl shadow-amber-500/20"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Building Brand DNA & 20-Day Gameplan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Brand DNA & Campaign</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
