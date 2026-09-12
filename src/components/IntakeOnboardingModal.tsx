'use client';

import React, { useState, useRef } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  X,
  Check,
  Image as ImageIcon,
  Trash2,
  ChevronDown,
  Building2,
  MapPin,
  Flame,
  Shield,
  Crown,
  Zap,
  Leaf,
  Layers,
} from 'lucide-react';

interface IntakeOnboardingModalProps {
  onClose: () => void;
}

interface IndustryPreset {
  id: string;
  name: string;
  icon: string;
  defaultName: string;
  defaultLocation: string;
  defaultUsp: string;
  uspOptions: string[];
  defaultStory: string;
  defaultAudience: string;
  audienceOptions: string[];
  pillars: string[];
  defaultTone: string;
  badgeSymbol: string;
}

const INDUSTRY_PRESETS: IndustryPreset[] = [
  {
    id: 'skincare',
    name: 'Melanin Skincare & Botanical Beauty',
    icon: '🌿',
    defaultName: 'Aura Botanicals',
    defaultLocation: 'Lagos — Island (Lekki / Victoria Island)',
    defaultUsp: 'Pure cold-pressed West African botanicals formulated specifically for high-humidity melanin barrier health.',
    uspOptions: [
      'Pure cold-pressed West African botanicals formulated specifically for high-humidity melanin barrier health.',
      'Dermatologist-backed clinical formulation with zero synthetic fragrance and zero skin-lightening chemicals.',
      'Transparent active ingredient percentages engineered to eliminate tropical climate hyperpigmentation in 14 days.',
    ],
    defaultStory: 'We formulate active botanical skincare engineered specifically for melanin-rich skin in tropical climates. Hand-harvested baobab, shea butter, and wild hibiscus deliver real barrier repair without chemical fillers.',
    defaultAudience: 'Professional women & men (24–45) seeking dermatologist-backed melanin glow without irritation.',
    audienceOptions: [
      'Professional women & men (24–45) seeking dermatologist-backed melanin glow without irritation.',
      'Young skincare enthusiasts dealing with hyperpigmentation, acne, and tropical humidity breakout.',
      'Luxury conscious consumers investing in clean, sustainable, indigenous African beauty rituals.',
    ],
    pillars: ['Botanical Science', 'Barrier Repair Rituals', 'Melanin Glow Proof', 'Lagos Humidity Defense'],
    defaultTone: 'Luxury & Aspirational',
    badgeSymbol: '🌿',
  },
  {
    id: 'food',
    name: 'Campus Snack & Street Food',
    icon: '🌶️',
    defaultName: 'Gidi Bites Snacks',
    defaultLocation: 'Lagos — Mainland (Yaba / Ikeja)',
    defaultUsp: 'Double-spiced crunchy chili plantain chips & artisanal roasted peanut cluster fuel delivered under 20 minutes.',
    uspOptions: [
      'Double-spiced crunchy chili plantain chips & artisanal roasted peanut cluster fuel delivered under 20 minutes.',
      '100% natural unripe plantain kettle-cooked in cold-pressed groundnut oil with zero artificial MSG.',
      'The ultimate midnight fuel for Lagos creatives, traffic commuters, and campus study marathons.',
    ],
    defaultStory: 'Biting into Gidi Bites during 3am reading marathons or heavy traffic is the only thing standing between you and madness. Pure crunch energy and authentic Lagos hustle fuel.',
    defaultAudience: 'University students, young creatives, tech bros, and Lagos traffic commuters.',
    audienceOptions: [
      'University students, young creatives, tech bros, and Lagos traffic commuters.',
      'Hostel students needing instant late-night study delivery without cafeteria delays.',
      'Office workers and event organizers ordering party packs and daily work desks snacks.',
    ],
    pillars: ['Campus Survival', 'Crunch ASMR', 'Late Night Fuel', 'Hostel Offers'],
    defaultTone: 'Street-Smart & Relatable',
    badgeSymbol: '🌶️',
  },
  {
    id: 'legal',
    name: 'Corporate Law & SME Advisory',
    icon: '⚖️',
    defaultName: 'LexAfriq Advisory',
    defaultLocation: 'Lagos — Island (Lekki / Victoria Island)',
    defaultUsp: 'Fixed-fee CAC compliance, cross-border contract auditing, and founder IP protection with 48-hour turnarounds.',
    uspOptions: [
      'Fixed-fee CAC compliance, cross-border contract auditing, and founder IP protection with 48-hour turnarounds.',
      'Zero billable hour surprises: flat-rate corporate legal safety designed specifically for scaling Nigerian SMEs.',
      'Venture-ready term sheets, employment agreements, and regulatory tax compliance made completely jargon-free.',
    ],
    defaultStory: 'We eliminate legal jargon and protect fast-scaling tech and retail businesses in Nigeria from expensive litigation loopholes and CAC compliance penalties.',
    defaultAudience: 'SME founders, tech startups, real estate investors, and commercial directors.',
    audienceOptions: [
      'SME founders, tech startups, real estate investors, and commercial directors.',
      'Early-stage founders raising seed capital and negotiating investor convertible notes.',
      'Import/export merchants and e-commerce brands needing iron-clad vendor agreements.',
    ],
    pillars: ['Contract Clarity', 'CAC Compliance', 'Risk Mitigation', 'Founder Advice'],
    defaultTone: 'Corporate & Trust-Building',
    badgeSymbol: '⚖️',
  },
  {
    id: 'fashion',
    name: 'Fashion, Apparel & Streetwear',
    icon: '👗',
    defaultName: 'AfroModern Studio',
    defaultLocation: 'Lagos — Island (Lekki / Victoria Island)',
    defaultUsp: 'Bespoke contemporary African silhouette tailoring crafted with ethically woven indigenous textiles.',
    uspOptions: [
      'Bespoke contemporary African silhouette tailoring crafted with ethically woven indigenous textiles.',
      'Limited-edition streetwear drops celebrating Lagos youth culture, music, and architectural heritage.',
      'Zero fast-fashion waste: handcrafted garments engineered for supreme durability and statement styling.',
    ],
    defaultStory: 'We bridge heritage West African textiles with contemporary urban streetwear. Each collection is limited to 100 numbered pieces designed for cultural icons and creatives.',
    defaultAudience: 'Fashion-forward Gen-Z, afrobeat creatives, diaspora trendsetters, and luxury collectors.',
    audienceOptions: [
      'Fashion-forward Gen-Z, afrobeat creatives, diaspora trendsetters, and luxury collectors.',
      'Diaspora fashion enthusiasts visiting Lagos for concerts and cultural festivities.',
      'Professionals seeking modern afro-minimalist workwear for gallery and executive events.',
    ],
    pillars: ['Heritage Craft', 'Street Style Drops', 'Behind the Loom', 'VIP Early Access'],
    defaultTone: 'Luxury & Aspirational',
    badgeSymbol: '👑',
  },
  {
    id: 'tech',
    name: 'Fintech, SaaS & Tech Startup',
    icon: '🚀',
    defaultName: 'PayOrbit Africa',
    defaultLocation: 'Lagos — Mainland (Yaba / Ikeja)',
    defaultUsp: 'Instant zero-fee cross-border payouts for African freelancers and digital remote workers.',
    uspOptions: [
      'Instant zero-fee cross-border payouts for African freelancers and digital remote workers.',
      'API-first recurring subscription infrastructure built for African businesses to accept global card payments.',
      'Automated FX settlement protecting digital merchants from local currency volatility in seconds.',
    ],
    defaultStory: 'We empower African digital creators and remote software talent to receive foreign earnings into local bank accounts in under 60 seconds at bank-beating FX rates.',
    defaultAudience: 'Remote software engineers, digital creators, agencies, and cross-border freelancers.',
    audienceOptions: [
      'Remote software engineers, digital creators, agencies, and cross-border freelancers.',
      'African e-commerce businesses expanding sales across Ghana, Kenya, and Nigeria.',
      'Tech founders looking for streamlined automated payroll for distributed African teams.',
    ],
    pillars: ['Payout Speed', 'FX Transparency', 'Developer APIs', 'Remote Worker Stories'],
    defaultTone: 'Corporate & Trust-Building',
    badgeSymbol: '⚡',
  },
  {
    id: 'creator',
    name: 'Creator, Substack & Personal Brand',
    icon: '✍️',
    defaultName: 'The Strategic Operator',
    defaultLocation: 'Online / Pan-African / Remote',
    defaultUsp: 'No-BS tactical essays on scaling B2B services, digital audience growth, and African tech trends.',
    uspOptions: [
      'No-BS tactical essays on scaling B2B services, digital audience growth, and African tech trends.',
      'Actionable weekly frameworks helping founders monetize their personal expertise into high-ticket clients.',
      'Deep-dive breakdowns of emerging consumer brands, media systems, and African venture economics.',
    ],
    defaultStory: 'I write for operators and founders who want real distribution strategies without fluff. Each week breaks down a verified case study in building leverage, media, and enterprise value.',
    defaultAudience: 'Startup operators, agency owners, corporate managers, and independent creators.',
    audienceOptions: [
      'Startup operators, agency owners, corporate managers, and independent creators.',
      'Mid-level executives planning their transition into consulting or entrepreneurial ventures.',
      'Founders seeking thought leadership that consistently attracts inbound investor and client inquiries.',
    ],
    pillars: ['Tactical Frameworks', 'Operator Case Studies', 'Monetization Systems', 'Weekly Essay Drops'],
    defaultTone: 'Witty & Banter-Heavy',
    badgeSymbol: '💡',
  },
];

const LOCATION_OPTIONS = [
  'Lagos — Island (Lekki / Victoria Island / Ikoyi)',
  'Lagos — Mainland (Yaba / Ikeja / Surulere)',
  'Abuja (FCT)',
  'Port Harcourt, Rivers State',
  'Ibadan, Oyo State',
  'Accra, Ghana',
  'London, UK / Diaspora',
  'Online / Pan-African / Remote',
];

const TONE_OPTIONS = [
  {
    label: 'Luxury & Aspirational',
    icon: '👑',
    desc: 'Restrained, calm authority, high-end editorial prestige',
  },
  {
    label: 'Street-Smart & Relatable',
    icon: '🔥',
    desc: 'Lagos energy, relatable hustle, warm conversational grit',
  },
  {
    label: 'Witty & Banter-Heavy',
    icon: '⚡',
    desc: 'Meme-literate, engaging humor, highly shareable viral buzz',
  },
  {
    label: 'Corporate & Trust-Building',
    icon: '🛡️',
    desc: 'Executive credibility, safe institutional tone, zero jargon',
  },
  {
    label: 'Calm & Educational',
    icon: '🌱',
    desc: 'Scientific clarity, informative breakdown, trusted advisor',
  },
];

const BADGE_PRESETS = [
  { label: 'Botanical', icon: '🌿', color: '#10B981' },
  { label: 'Bolt', icon: '⚡', color: '#F59E0B' },
  { label: 'Crown', icon: '👑', color: '#8B5CF6' },
  { label: 'Shield', icon: '🛡️', color: '#3B82F6' },
  { label: 'Diamond', icon: '💎', color: '#EC4899' },
];

export const IntakeOnboardingModal: React.FC<IntakeOnboardingModalProps> = ({ onClose }) => {
  const { createBrandFromBrief } = useAppStore();
  const [step, setStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Active preset
  const [selectedPresetId, setSelectedPresetId] = useState<string>('skincare');
  const activePreset = INDUSTRY_PRESETS.find((p) => p.id === selectedPresetId) || INDUSTRY_PRESETS[0];

  // Core Form State
  const [brandName, setBrandName] = useState('Aura Botanicals');
  const [industry, setIndustry] = useState(activePreset.name);
  const [location, setLocation] = useState(activePreset.defaultLocation);
  const [usp, setUsp] = useState(activePreset.defaultUsp);
  const [description, setDescription] = useState(activePreset.defaultStory);
  const [audience, setAudience] = useState(activePreset.defaultAudience);
  const [tone, setTone] = useState(activePreset.defaultTone);
  const [pillars, setPillars] = useState<string[]>(activePreset.pillars);

  // Logo & Asset State (Working Drag-and-Drop & File Upload)
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle preset selection
  const handleApplyPreset = (preset: IndustryPreset) => {
    setSelectedPresetId(preset.id);
    setBrandName(preset.defaultName);
    setIndustry(preset.name);
    setLocation(preset.defaultLocation);
    setUsp(preset.defaultUsp);
    setDescription(preset.defaultStory);
    setAudience(preset.defaultAudience);
    setTone(preset.defaultTone);
    setPillars(preset.pillars);
  };

  // File Upload Handlers (Real Drag & Drop and File Picker)
  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, SVG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setLogoUrl(dataUrl);
        setLogoFileName(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleSelectBadgeAvatar = (badge: typeof BADGE_PRESETS[0]) => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
        <rect width="200" height="200" rx="40" fill="#0F172A" />
        <circle cx="100" cy="100" r="75" fill="${badge.color}" fill-opacity="0.2" stroke="${badge.color}" stroke-width="4" stroke-dasharray="8 8" />
        <text x="100" y="115" font-size="70" text-anchor="middle">${badge.icon}</text>
      </svg>
    `.trim();
    const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    setLogoUrl(dataUri);
    setLogoFileName(`${badge.label} Signature Badge`);
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    try {
      await createBrandFromBrief({
        brandName: brandName.trim() || 'My Brand',
        industry: industry.trim() || 'Commercial Brand',
        location: location.trim() || 'Lagos, Nigeria',
        usp: usp.trim() || 'Distinctive brand positioning without generic compromises.',
        description: description.trim() || 'We create brand strategy, narrative arcs, and visual positioning.',
        audience: audience.trim() || 'Target audience seeking verified excellence.',
        tone,
        pillars: pillars.filter((p) => p.trim().length > 0),
        logoUrl: logoUrl || undefined,
        assets: logoUrl ? [{ type: 'LOGO', url: logoUrl }] : [],
      });
      setIsGenerating(false);
      onClose();
    } catch (err) {
      console.error('Failed to create brand:', err);
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-black rounded-full uppercase tracking-wider">
                STEP {step} OF 3
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                Streamlined Brand Engine
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-100">
              {step === 1 && '1. Brand Profile & Industry'}
              {step === 2 && '2. Positioning, Voice & Pillars'}
              {step === 3 && '3. Logo & Visual Identity'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3-Step Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: BRAND PROFILE & INDUSTRY PRESETS */}
        {/* ========================================================================= */}
        {step === 1 && (
          <div className="space-y-5">
            {/* Quick 1-Tap Presets Banner */}
            <div>
              <label className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2">
                ⚡ 1-Tap Quick Start (Pick a Category or Customize Below)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {INDUSTRY_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition cursor-pointer ${
                      selectedPresetId === p.id
                        ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-md shadow-amber-500/10'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xl">{p.icon}</span>
                    <div className="truncate">
                      <p className="text-xs font-bold truncate">{p.name.split('&')[0]}</p>
                      <p className="text-[10px] text-slate-400 truncate">{p.defaultName}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Name */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                Brand Name *
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Zuri Glow, Lagos Bakery, Orbit Pay"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 font-bold focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            {/* Industry & Location Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Industry / Domain *
                </label>
                <div className="relative">
                  <select
                    value={industry}
                    onChange={(e) => {
                      const val = e.target.value;
                      setIndustry(val);
                      const matchingPreset = INDUSTRY_PRESETS.find((p) => p.name === val);
                      if (matchingPreset) handleApplyPreset(matchingPreset);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-slate-100 appearance-none focus:outline-none focus:border-amber-500 transition pr-8"
                  >
                    {INDUSTRY_PRESETS.map((p) => (
                      <option key={p.id} value={p.name} className="bg-slate-900 text-slate-200">
                        {p.icon} {p.name}
                      </option>
                    ))}
                    <option value="Custom Business" className="bg-slate-900 text-slate-200">
                      ✨ Custom Business
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Location / Market *
                </label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 text-xs text-slate-100 appearance-none focus:outline-none focus:border-amber-500 transition pr-8"
                  >
                    {LOCATION_OPTIONS.map((loc) => (
                      <option key={loc} value={loc} className="bg-slate-900 text-slate-200">
                        📍 {loc}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Smart Brand Story */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                Brand Story & Mission
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 leading-relaxed"
                placeholder="Why was this business started and what makes it special?"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Auto-populated from industry preset. Edit to match your exact story.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: POSITIONING, VOICE & PILLARS */}
        {/* ========================================================================= */}
        {step === 2 && (
          <div className="space-y-5">
            {/* Superpower / USP Dropdown & Edit */}
            <div>
              <label className="text-xs font-bold text-amber-400 block mb-1.5">
                What sets you apart from competitors? (USP)
              </label>
              <div className="relative mb-2">
                <select
                  onChange={(e) => {
                    if (e.target.value !== 'custom') setUsp(e.target.value);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 appearance-none focus:outline-none focus:border-amber-500 transition pr-8"
                >
                  <option value="">✨ Select a high-converting formula...</option>
                  {activePreset.uspOptions.map((opt, i) => (
                    <option key={i} value={opt} className="bg-slate-900 text-slate-200">
                      {opt}
                    </option>
                  ))}
                  <option value="custom">✏️ Type custom superpower</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <input
                type="text"
                value={usp}
                onChange={(e) => setUsp(e.target.value)}
                placeholder="Describe your unique advantage"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Target Audience Dropdown */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                Target Audience & Purchasing Motivation
              </label>
              <div className="relative mb-2">
                <select
                  onChange={(e) => {
                    if (e.target.value !== 'custom') setAudience(e.target.value);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 appearance-none focus:outline-none focus:border-amber-500 transition pr-8"
                >
                  <option value="">🎯 Select target buyer persona...</option>
                  {activePreset.audienceOptions.map((aud, i) => (
                    <option key={i} value={aud} className="bg-slate-900 text-slate-200">
                      {aud}
                    </option>
                  ))}
                  <option value="custom">✏️ Type custom audience</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="Who are your ideal customers?"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Verbal Tone Selector (Visual Cards) */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">
                Brand Verbal Voice & Tone
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TONE_OPTIONS.map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => setTone(t.label)}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-start gap-2.5 ${
                      tone === t.label
                        ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-md'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xl shrink-0 mt-0.5">{t.icon}</span>
                    <div>
                      <p className="text-xs font-bold">{t.label}</p>
                      <p className="text-[10px] text-slate-400 leading-snug mt-0.5">{t.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Content Pillars */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                4 Strategic Content Pillars
              </label>
              <div className="grid grid-cols-2 gap-2">
                {pillars.map((pillar, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-amber-400 font-bold">
                      0{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={pillar}
                      onChange={(e) => {
                        const newPillars = [...pillars];
                        newPillars[idx] = e.target.value;
                        setPillars(newPillars);
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-100 font-semibold focus:outline-none focus:border-amber-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: LOGO & VISUAL IDENTITY (WORKING FILE UPLOAD & DRAG/DROP) */}
        {/* ========================================================================= */}
        {step === 3 && (
          <div className="space-y-5">
            {/* Real File Input & Drag/Drop Box */}
            <div>
              <label className="text-xs font-bold text-slate-200 block mb-1.5">
                Upload Brand Logo or Product Asset *
              </label>
              <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                Drag and drop your brand logo below or select from files. It will be integrated into every 1080x1350 visual flyer.
              </p>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {logoUrl ? (
                /* Attached Logo Display */
                <div className="bg-slate-950 border-2 border-emerald-500/50 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-lg shadow-emerald-500/5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center p-1">
                      <img src={logoUrl} alt="Brand Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-slate-100">Logo Attached</span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-xs mt-0.5">
                        {logoFileName || 'brand-logo.png'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLogoUrl(null);
                        setLogoFileName(null);
                      }}
                      className="p-2 text-slate-400 hover:text-red-400 transition"
                      title="Remove Logo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Active Drag-and-Drop Area */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center space-y-3 transition cursor-pointer ${
                    isDragging
                      ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
                      : 'border-slate-700 bg-slate-950/60 hover:border-amber-500/50 hover:bg-slate-950'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">
                      {isDragging ? 'Drop your logo here now!' : 'Click to select logo file, or drag and drop here'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Supports PNG, JPG, WebP, SVG (Transparent background recommended)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Signature Avatars (if user doesn't have a logo file ready) */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Don't have a logo file? Pick an Instant Signature Badge:
              </label>
              <div className="grid grid-cols-5 gap-2">
                {BADGE_PRESETS.map((b) => (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => handleSelectBadgeAvatar(b)}
                    className="p-3 bg-slate-950 border border-slate-800 hover:border-amber-500 rounded-2xl flex flex-col items-center gap-1 transition cursor-pointer"
                  >
                    <span className="text-xl">{b.icon}</span>
                    <span className="text-[10px] text-slate-300 font-bold">{b.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Review Summary Card */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Ready to Generate Engine
              </span>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Brand:</span>
                <span className="font-bold text-slate-100">{brandName}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Industry:</span>
                <span className="font-semibold text-slate-200 truncate max-w-[200px]">{industry}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Tone:</span>
                <span className="font-semibold text-amber-400">{tone}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">20-Day Flyers:</span>
                <span className="font-bold text-emerald-400">Ready to render automatically</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP NAVIGATION CONTROLS */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer active:scale-95"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-xl shadow-amber-500/25 transition cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Building Brand DNA & 20-Day Flyers...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Launch 20-Day Content Engine →</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
