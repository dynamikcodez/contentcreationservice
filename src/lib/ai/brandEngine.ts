import { BrandDNAOutput, CreativeConceptOutput, CreativeConceptInput } from '@/types/ai';
import { IntakeBriefInput } from '../validation/schemas';
import { GoogleGenAI } from '@google/genai';

const aiClient = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

/**
 * BRAND STRATEGIST & ANALYST ENGINE
 * Analyzes intake data and generates comprehensive Brand DNA.
 */
export async function generateBrandDNA(brief: IntakeBriefInput): Promise<BrandDNAOutput> {
  // If GEMINI_API_KEY is available, we attempt live LLM structured inference
  if (aiClient) {
    try {
      const prompt = `
You are an elite Brand Strategist, Creative Director, and Art Director for Nigerian SME brands.
Analyze the following intake brief and produce a structured Brand DNA object in JSON matching the exact schema.

BRAND DETAILS:
- Brand Name: ${brief.brandName}
- Industry: ${brief.industry}
- Location: ${brief.location}
- USP: ${brief.usp}
- Story/Description: ${brief.description}
- Audience: ${brief.audience}
- Desired Tone: ${brief.tone}
- Stated Pillars: ${brief.pillars.join(', ')}

Return ONLY valid JSON matching this exact JSON format:
{
  "brandPersonality": ["array of 3-5 traits"],
  "positioning": "one powerful positioning statement",
  "audiencePsychology": "deep psychological insight into purchasing habits and trust drivers",
  "emotionalTerritory": ["array of 3 emotional triggers"],
  "verbalIdentity": {
    "toneKeywords": ["array of tone words"],
    "voiceStyle": "description of voice",
    "samplePhrases": ["3 realistic sample brand phrases"],
    "prohibitedJargon": ["3 corporate or generic words to strictly avoid"]
  },
  "visualPersonality": {
    "aestheticMode": "e.g. Editorial Photography / Raw Mobile / Graphic Poster",
    "overallMood": "description of mood",
    "keyMotifs": ["3 visual elements"]
  },
  "colourSystem": {
    "observedPalette": ["HEX or colour names"],
    "recommendedPalette": ["#1E1B4B", "#F59E0B", "#F3F4F6"],
    "accentColour": "#F59E0B",
    "contrastHierarchy": "High contrast editorial balance",
    "rationale": "Why these colours suit this specific brand"
  },
  "typographyDirection": "Bold editorial serif paired with clean sans-serif",
  "photographyDirection": "Natural directional light, authentic textures, zero glossy stock feel",
  "compositionDirection": "Asymmetric balanced whitespace with strong focal anchor",
  "graphicLanguage": "Minimalist structured borders, subtle rule lines, no generic blobs",
  "textureLanguage": "Matte paper, warm grain, natural architectural surfaces",
  "culturalSignals": ["3 subtle Nigerian market signals"],
  "creativeOpportunities": ["3 distinct marketing opportunities"],
  "creativeConstraints": ["2 strategic boundaries"],
  "thingsToAvoid": ["generic AI slop", "purple gradients", "glowing neon", "stock photos"],
  "competitorConventionsToAvoid": ["3 cliché conventions in this industry"]
}
      `;

      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text || '';
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      if (parsed.brandPersonality && parsed.colourSystem) {
        return parsed as BrandDNAOutput;
      }
    } catch (err) {
      console.warn('Gemini LLM call failed or unconfigured, falling back to calibrated Brand DNA rule engine:', err);
    }
  }

  // CALIBRATED BRAND DNA ENGINE (Fallback & Instant Engine)
  const isSkincare = brief.industry.toLowerCase().includes('skin') || brief.industry.toLowerCase().includes('beauty');
  const isFood = brief.industry.toLowerCase().includes('food') || brief.industry.toLowerCase().includes('snack') || brief.industry.toLowerCase().includes('catering');
  const isLegal = brief.industry.toLowerCase().includes('law') || brief.industry.toLowerCase().includes('legal') || brief.industry.toLowerCase().includes('consult');

  if (isSkincare) {
    return {
      brandPersonality: ['Restrained', 'Botanical Precision', 'Unapologetic Quality', 'Warm Editorial'],
      positioning: `${brief.brandName} is the definitive botanical skincare ritual engineered specifically for melanin-rich skin in tropical climates.`,
      audiencePsychology: 'Disillusioned by synthetic products promising miracle glow; seeks transparent ingredient formulas, dermatologist backing, and authentic peer transformation proof.',
      emotionalTerritory: ['Quiet Confidence', 'Self-Care Sanity', 'Melanin Radiance'],
      verbalIdentity: {
        toneKeywords: ['Editorial', 'Calm Authority', 'Sensory', 'Scientific'],
        voiceStyle: 'Restrained sophistication. Conversational yet deeply knowledgeable.',
        samplePhrases: [
          'Melanin thrives when barrier balance comes first.',
          'No filler. Just active botanical potency.',
          'Your skin doesn’t need 10 steps. It needs the right 3.'
        ],
        prohibitedJargon: ['Elevate your potential', 'Miracle solution', 'Unlock your beauty', 'Omo guys']
      },
      visualPersonality: {
        aestheticMode: 'Minimalist Botanical Editorial',
        overallMood: 'Tactile, sun-dappled, organic luxury without ostentation',
        keyMotifs: ['Matte clay containers', 'Dew drop micro-texture', 'Warm sunlight flares']
      },
      colourSystem: {
        observedPalette: ['Earthy Clay (#8C5A47)', 'Sage (#6B8E23)', 'Pure Warm Milk (#FAF9F6)'],
        recommendedPalette: ['#8C5A47', '#D4A373', '#FAEDCD', '#283618'],
        accentColour: '#D4A373',
        contrastHierarchy: 'Deep earthy contrast against crisp warm whitespace',
        rationale: 'Rooted in West African botanical clay textures and natural sunlit skin tones.'
      },
      typographyDirection: 'Editorial Serif for display headers paired with clean geometric sans for ingredient breakdowns.',
      photographyDirection: 'Macro product textures on raw stone or linen, soft morning directional sunlight, unretouched real melanin skin texture.',
      compositionDirection: 'Asymmetric whitespace, 60/40 visual weight balance favoring negative space.',
      graphicLanguage: 'Fine hairline borders, numbered formula labels, clean architectural grid lines.',
      textureLanguage: 'Micro-droplets, unpolished ceramic, raw cotton linen.',
      culturalSignals: ['Lagos humidity resistance', 'Harmattan skin protection', 'Daily Lagos commuter ritual'],
      creativeOpportunities: ['Behind-the-formula ingredient breakdowns', 'Harmattan skin shield campaign', 'Melanin barrier education'],
      creativeConstraints: ['Never use generic pink glitter or excessive glowing filters', 'Never use AI smiling stock faces'],
      thingsToAvoid: ['purple gradients', 'glowing neon borders', 'generic luxury marble', 'fake doctor stock photos'],
      competitorConventionsToAvoid: ['Before/after lightening claims', 'Over-packaged plastic bottles', 'Excessive golden ribbon graphics']
    };
  }

  if (isFood) {
    return {
      brandPersonality: ['Energetic', 'Culturally Sharpened', 'Banter-Heavy', 'Irresistibly Honest'],
      positioning: `${brief.brandName} delivers instant high-potency flavor fuel crafted specifically for Lagos hustlers, campus night-crammers, and workplace survivors.`,
      audiencePsychology: 'Motivated by speed, intense taste satisfaction, affordability, and relatable humor during grueling daily routines.',
      emotionalTerritory: ['Instant Craving Relief', 'Campus Survival Bond', 'No-Nonsense Satisfaction'],
      verbalIdentity: {
        toneKeywords: ['Sharp', 'Witty', 'Unapologetic', 'Street-Smart'],
        voiceStyle: 'Punchy street-smart banter with zero corporate sugarcoating.',
        samplePhrases: [
          'Read 5 hours without snacking? Who are you lying to?',
          'Hot, crunch, repeat. No time for dull food.',
          'Your stomach knows when you are trying to cheat it.'
        ],
        prohibitedJargon: ['Synergistic snacking', 'Premium culinary experience', 'Delighted to inform you']
      },
      visualPersonality: {
        aestheticMode: 'High-Impact Graphic Poster & Street Lifestyle',
        overallMood: 'Vibrant, punchy, high-contrast street energy',
        keyMotifs: ['Bold halftone prints', 'Dynamic food motion sprays', 'Bold sticker badges']
      },
      colourSystem: {
        observedPalette: ['Electric Spice Red (#DC2626)', 'Warm Amber (#F59E0B)', 'Deep Charcoal (#111827)'],
        recommendedPalette: ['#DC2626', '#F59E0B', '#111827', '#F3F4F6'],
        accentColour: '#F59E0B',
        contrastHierarchy: 'Maximum pop punchy contrast',
        rationale: 'Stimulates appetite triggers while reflecting street-level energy.'
      },
      typographyDirection: 'Ultra-bold condensed sans-serif header for street poster impact.',
      photographyDirection: 'High-contrast flash photography, steam rising, crunchy texture close-ups, handheld camera feel.',
      compositionDirection: 'Dynamic diagonal alignments, frame-filling product closeups.',
      graphicLanguage: 'Sticker callouts, bold discount badges, newspaper headline stamp style.',
      textureLanguage: 'Crunchy oil sizzle reflection, matte kraft paper packaging.',
      culturalSignals: ['Late night hostel reading fuel', 'Lagos traffic jam sanity saver', 'Breaktime office sharing'],
      creativeOpportunities: ['Night owl study combo bundle', 'Campus hostel delivery challenge', 'Crunch audio ASMR clips'],
      creativeConstraints: ['Do not make it look like a boring corporate catering menu'],
      thingsToAvoid: ['pastel colors', 'slow soft motion videos', 'stuffy fine-dining porcelain'],
      competitorConventionsToAvoid: ['Boring white background food photos', 'Fake cartoon mascots']
    };
  }

  // Default / Professional Service / General SME
  return {
    brandPersonality: ['Authoritative', 'Clarity-Driven', 'Strategic', 'Relentlessly Reliable'],
    positioning: `${brief.brandName} turns complex industry hurdles into structured, high-value outcomes for growth-focused clients in Nigeria.`,
    audiencePsychology: 'Values peace of mind, speed of execution, risk mitigation, and clear, transparent pricing without hidden fees.',
    emotionalTerritory: ['Strategic Safety', 'Unshakeable Confidence', 'Zero-Stress Execution'],
    verbalIdentity: {
      toneKeywords: ['Direct', 'Intelligent', 'Reassuring', 'Pragmatic'],
      voiceStyle: 'Clear, crisp corporate authority with plain-English transparency.',
      samplePhrases: [
        'Clear contracts prevent expensive litigation.',
        'We handle the regulatory friction so you can focus on scale.',
        'No legal jargon. Just business clarity.'
      ],
      prohibitedJargon: ['State of the art solutions', 'Paradigm shift', 'Synergy', 'Best-in-class']
    },
    visualPersonality: {
      aestheticMode: 'Editorial Corporate & Typographic Focus',
      overallMood: 'Restrained, premium, intelligent, calm',
      keyMotifs: ['Architectural linework', 'Document stamp detail', 'Clean slate panels']
    },
    colourSystem: {
      observedPalette: ['Deep Indigo (#1E1B4B)', 'Warm Amber (#F59E0B)', 'Slate Grey (#475569)'],
      recommendedPalette: ['#1E1B4B', '#475569', '#CBD5E1', '#F59E0B'],
      accentColour: '#F59E0B',
      contrastHierarchy: 'Restrained architectural contrast with accent highlight',
      rationale: 'Instills deep trust, legal precision, and intellectual calm.'
    },
    typographyDirection: 'Clean geometric sans-serif paired with authoritative modern serif headlines.',
    photographyDirection: 'Natural desk environments, authentic client consultations, architectural office light, documentary human style.',
    compositionDirection: 'Structured grid system, strong alignment anchors, generous margin spacing.',
    graphicLanguage: 'Subtle document dividers, stamp icons, structured key metric cards.',
    textureLanguage: 'Heavy cardstock paper texture, brushed metal, polished teak desk.',
    culturalSignals: ['CAC registration peace of mind', 'Lagos commercial court realities', 'Cross-border transaction trust'],
    creativeOpportunities: ['Common contract loophole breakdown', 'SME compliance checklist series', 'Founder legal QA session'],
    creativeConstraints: ['Avoid cheap stock imagery of handshakes or gavels'],
    thingsToAvoid: ['glowing neon', 'cheap clip art', 'cartoon illustrations', 'cheesy stock handshake'],
    competitorConventionsToAvoid: ['Unreadable legal fine print', 'Stuffy outdated courtroom photos']
  };
}

/**
 * PSYCHOLOGICAL PRICING ENGINE
 * Generates 3 strategically named & structured pricing tiers based on the brand's business domain (Section 28).
 */
export function generatePsychologicalPricing(brandName: string, industry: string) {
  const isLegal = industry.toLowerCase().includes('law') || industry.toLowerCase().includes('legal');
  const isFood = industry.toLowerCase().includes('food') || industry.toLowerCase().includes('snack');
  const isBeauty = industry.toLowerCase().includes('skin') || industry.toLowerCase().includes('beauty');

  if (isLegal) {
    return [
      {
        name: 'The Brief',
        price: '₦75,000 / audit',
        description: 'Single contract review & legal risk assessment for immediate deals.',
        psychologicalHook: 'Entry-level peace of mind for high-stakes single contracts.',
        recommended: false,
      },
      {
        name: 'The Retainer',
        price: '₦250,000 / month',
        description: 'Continuous legal counsel, monthly compliance checkups, and fast contract drafting.',
        psychologicalHook: 'The rational bridge for growing businesses needing permanent legal backing.',
        recommended: true,
      },
      {
        name: 'The Senior Advocate',
        price: '₦750,000 / quarter',
        description: 'Full-spectrum corporate architecture, international IP protection & priority litigation defense.',
        psychologicalHook: 'Top-tier enterprise security for established industry leaders.',
        recommended: false,
      },
    ];
  }

  if (isFood) {
    return [
      {
        name: 'The Snack Pack',
        price: '₦3,500',
        description: 'Instant hunger fix for individual study sessions or afternoon hustle.',
        psychologicalHook: 'Zero-friction impulse purchase price point.',
        recommended: false,
      },
      {
        name: 'The Hostel Stock',
        price: '₦12,500',
        description: '5-day bulk survival kit with mixed flavors & priority campus delivery.',
        psychologicalHook: 'Best value for group sharing and weekly fuel planning.',
        recommended: true,
      },
      {
        name: 'The Party Vault',
        price: '₦35,000',
        description: 'Large event crate + customized brand merch + instant refill guarantee.',
        psychologicalHook: 'Maximum flex option for campus events and office celebrations.',
        recommended: false,
      },
    ];
  }

  if (isBeauty) {
    return [
      {
        name: 'The Discovery Ritual',
        price: '₦15,000',
        description: '3-piece mini starter kit to test skin compatibility over 14 days.',
        psychologicalHook: 'Low-risk intro point for cautious skin types.',
        recommended: false,
      },
      {
        name: 'The Barrier Glow System',
        price: '₦38,000',
        description: 'Full 90-day daily cleanser, active serum, and hydrating barrier cream.',
        psychologicalHook: 'The complete daily routine engineered for maximum skin transformation.',
        recommended: true,
      },
      {
        name: 'The Concierge Glow Retainer',
        price: '₦85,000 / month',
        description: 'Monthly fresh formula drop + personalized virtual skin dermatologist consultation.',
        psychologicalHook: 'VIP luxury experience for dedicated skincare enthusiasts.',
        recommended: false,
      },
    ];
  }

  return [
    {
      name: 'The Essential Starter',
      price: '₦25,000',
      description: 'Core baseline deliverable designed for immediate tactical execution.',
      psychologicalHook: 'Quick victory option.',
      recommended: false,
    },
    {
      name: 'The Growth System',
      price: '₦65,000',
      description: 'Full strategic implementation bundle with ongoing calibration support.',
      psychologicalHook: 'The optimal balance of high value and rapid ROI.',
      recommended: true,
    },
    {
      name: 'The Enterprise Bespoke',
      price: '₦180,000',
      description: 'Custom end-to-end operational overhaul with dedicated strategist oversight.',
      psychologicalHook: 'Complete hands-off transformation.',
      recommended: false,
    },
  ];
}

/**
 * 20-DAY CONTENT STRATEGY & NARRATIVE ARC ENGINE
 * Builds a narrative 20-day content calendar structured across strategic phases (Attention -> Trust -> Education -> Desire -> Proof -> Conversion).
 */
export function generate20DayCalendar(brandName: string, brandDna: BrandDNAOutput) {
  const pillars = brandDna.creativeOpportunities?.length
    ? ['Education & Value', 'Trust & Proof', 'Behind The Scenes', 'High-Converting Offer']
    : ['Product Focus', 'Customer Story', 'Industry Education', 'Brand Philosophy'];

  const narrativePhases = [
    { range: [1, 3], phase: 'ATTENTION', focus: 'Disrupt scrolling with bold problem framing & high-relatability hooks' },
    { range: [4, 7], phase: 'TRUST', focus: 'Demonstrate deep expertise, founder transparency & raw process behind the product' },
    { range: [8, 11], phase: 'EDUCATION', focus: 'Break down common industry myths, contract traps, or ingredient secrets' },
    { range: [12, 15], phase: 'DESIRE', focus: 'Showcase transformation proof, aesthetic lifestyle context & customer reactions' },
    { range: [16, 18], phase: 'PROOF', focus: 'Case studies, unretouched results, peer testimonials & authority signals' },
    { range: [19, 20], phase: 'CONVERSION', focus: 'Irresistible limited offer, clear purchase path & psychological pricing trigger' },
  ];

  const calendar = [];

  for (let day = 1; day <= 20; day++) {
    const currentPhaseObj = narrativePhases.find((p) => day >= p.range[0] && day <= p.range[1]) || narrativePhases[0];
    const phaseName = currentPhaseObj.phase;
    const pillar = pillars[(day - 1) % pillars.length];

    let postType = 'Educational';
    let hook = '';
    let caption = '';
    let cta = '';
    let strategicObjective = '';

    if (day === 1) {
      postType = 'Brand Manifestation';
      strategicObjective = 'Disrupt industry clichés and declare brand positioning';
      hook = `Most businesses in Nigeria are doing ${brandDna.thingsToAvoid[0] || 'marketing'} completely backwards.`;
      caption = `Here is the truth about ${brandDna.positioning}. We didn't build ${brandName} to add to the noise. We built it to solve the exact friction you experience every single week. Here is our promise to you...`;
      cta = `Drop a 'TRUTH' in the comments if you're tired of generic promises.`;
    } else if (day === 2) {
      postType = 'Problem Framing';
      strategicObjective = 'Expose the hidden cost of low-quality alternatives';
      hook = `The hidden tax you pay when choosing cheap options in ${brandDna.culturalSignals[0] || 'Lagos'}.`;
      caption = `It seems cheaper on day 1. But by day 30, the rework cost, stress, and lost time double your initial spend. ${brandName} approaches this with ${brandDna.brandPersonality[0]} discipline.`;
      cta = `Save this post before your next buying decision.`;
    } else if (day === 5) {
      postType = 'Behind the Scenes';
      strategicObjective = 'Build unshakeable trust through raw operational transparency';
      hook = `What actually happens inside our workshop before your order ships.`;
      caption = `No glossy filters. No shortcuts. Just our team inspecting every single detail to ensure barrier integrity and absolute quality. ${brandDna.verbalIdentity.samplePhrases[0] || ''}`;
      cta = `Send a WhatsApp message to inspect our formula batch notes.`;
    } else if (day === 10) {
      postType = 'Myth-Busting';
      strategicObjective = 'Position brand as the ultimate intellectual authority';
      hook = `Myth: You need 10 steps or ₦500k to get real results.`;
      caption = `Fact: Complexity is usually a cover for weak core ingredients. When you focus on ${brandDna.positioning}, everything else falls into place. Here are 3 steps to eliminate right now...`;
      cta = `Tap the link in bio to read our free clarity guide.`;
    } else if (day === 15) {
      postType = 'Transformation Proof';
      strategicObjective = 'Provide indisputable social proof';
      hook = `"I was skeptical until week 2." — Real client outcome.`;
      caption = `When ${brandName} was introduced into their routine, the turnaround was undeniable. Check out the step-by-step evolution breakdown above.`;
      cta = `DM us 'GLOW' or 'START' for a personalized recommendation.`;
    } else if (day === 20) {
      postType = 'High-Converting Offer';
      strategicObjective = 'Drive immediate revenue and claim campaign offer';
      hook = `Ready to stop settling and start winning with ${brandName}?`;
      caption = `Our calendar for this month is opening 15 dedicated slots. Lock in your spot today with our guaranteed package. ${brandDna.verbalIdentity.samplePhrases[1] || ''}`;
      cta = `Click our WhatsApp link in bio to secure your spot now before slots fill up.`;
    } else {
      postType = day % 2 === 0 ? 'Educational' : 'Customer Story';
      strategicObjective = `Execute ${phaseName} strategy for day ${day}`;
      hook = `Day ${day}: Why top operators choose ${brandDna.brandPersonality[(day % brandDna.brandPersonality.length)] || 'quality'} over noise.`;
      caption = `Consistency isn't about posting random graphics. It's about maintaining ${brandDna.photographyDirection}. Here is how we apply this principle for you every day...`;
      cta = `Share this with a business owner who needs to see this today.`;
    }

    calendar.push({
      dayNumber: day,
      phase: phaseName,
      pillar,
      postType,
      strategicObjective,
      hook,
      caption,
      cta,
      visualStatus: 'NOT_GENERATED',
    });
  }

  return calendar;
}

/**
 * CREATIVE CONCEPT ART DIRECTOR ENGINE (Section 9 & 54)
 * Generates a structured art direction concept before any visual rendering occurs.
 */
export function generateCreativeConcept(input: CreativeConceptInput): CreativeConceptOutput {
  const { brandDna, postType, pillar, hook, userRefinement } = input;
  const palette = brandDna.colourSystem?.recommendedPalette || ['#1E1B4B', '#F59E0B', '#F3F4F6'];

  const coreIdea = `Visual manifestation of ${hook.slice(0, 40)}`;
  const visualMetaphor = `Architectural balance of ${brandDna.visualPersonality.keyMotifs[0] || 'natural form'} framing the core brand value.`;
  const environment = userRefinement
    ? userRefinement
    : `Sun-dappled Lagos morning light against ${brandDna.textureLanguage || 'matte architectural stone'}`;
  const subject = `${brandDna.positioning.slice(0, 60)} in action`;
  const composition = brandDna.compositionDirection || 'Asymmetric 60/40 visual balance with deep negative space';
  const lighting = brandDna.photographyDirection || 'Directional natural morning light, soft highlights, zero artificial gloss';

  return {
    strategicObjective: input.strategicObjective || 'Disrupt scrolling feed with brand-calibrated visual authority',
    coreIdea,
    visualMetaphor,
    composition,
    subject,
    environment,
    lighting,
    colourBehaviour: `Dominant ${palette[0]} ground with subtle ${palette[1]} focal highlight`,
    typographyDirection: brandDna.typographyDirection,
    graphicTreatment: brandDna.graphicLanguage,
    brandAssets: [],
    culturalContext: brandDna.culturalSignals[0] || 'Contemporary Nigerian urban aesthetic',
    reasonItFitsBrand: `Respects established Brand DNA: ${brandDna.brandPersonality.join(', ')}. Avoids ${brandDna.thingsToAvoid[0] || 'ai slop'}.`,
    scrollStoppingMechanism: 'High-contrast focal anchor and unexpected tactile material texture.',
    promptText: `Art Directed Photography of ${subject} in ${environment}. Composition: ${composition}. Lighting: ${lighting}. Palette: ${palette.join(', ')}. Style: ${brandDna.visualPersonality.aestheticMode}. Zero generic AI slop, no purple gradients, no glowing neon.`,
  };
}

/**
 * SINGLE DAY POST GENERATOR (Section 26)
 */
export function generateSingleDayPost(
  brandName: string,
  brandDna: BrandDNAOutput,
  options: { pillar?: string; context?: string; objective?: string; toneOverride?: string }
) {
  const pillar = options.pillar || 'Strategic Highlight';
  const context = options.context || 'Daily spotlight';
  const tone = options.toneOverride || brandDna.verbalIdentity.voiceStyle;

  return {
    dayNumber: 1,
    pillar,
    postType: 'Spotlight Post',
    strategicObjective: options.objective || 'Engage audience with targeted strategic insight',
    hook: `The one thing about ${brandName} that changes the game today.`,
    caption: `Context: ${context}. In a market crowded with generic options, ${brandDna.positioning} stands out because we refuse to compromise on core quality. Here is why this matters to you right now...`,
    cta: `Send us a WhatsApp DM to learn more about how we can support you today.`,
    visualStatus: 'NOT_GENERATED',
  };
}
