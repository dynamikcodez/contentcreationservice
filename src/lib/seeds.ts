import { generateBrandDNA, generatePsychologicalPricing, generate20DayCalendar } from './ai/brandEngine';

export const DEMO_BRANDS = [
  {
    id: 'demo-aura-skincare',
    name: 'AURA NAIJA',
    industry: 'Melanin Skincare & Botanical Cosmetics',
    location: 'Victoria Island, Lagos',
    usp: 'Pure cold-pressed West African botanicals formulated specifically for high-humidity melanin skin barrier health.',
    description: 'We harvest indigenous baobab, shea butter, and wild hibiscus to create high-potency skin rituals. No synthetic fragrances, no skin lightening, no cheap fillers.',
    audience: 'Professional women and men aged 24-45 seeking dermatologist-backed melanin glow without chemical irritation.',
    tone: 'Luxury & Aspirational (Restrained Editorial)',
    pillars: ['Botanical Science', 'Barrier Rituals', 'Melanin Proof', 'Lagos Skin Protection'],
    logoUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'demo-gidi-bites',
    name: 'GIDI BITES',
    industry: 'Campus Snack & Street Food',
    location: 'Unilag Akoka & Yaba, Lagos',
    usp: 'Double-spiced crunchy chili plantain chips & artisanal roasted peanut cluster fuel delivered under 20 minutes.',
    description: 'Biting into Gidi Bites during 3am reading marathons or heavy traffic is the only thing standing between you and madness. Pure crunch energy.',
    audience: 'University students, young creatives, tech bros, and Lagos traffic commuters.',
    tone: 'Street-Smart & Relatable (Banter Heavy)',
    pillars: ['Campus Survival', 'Crunch ASMR', 'Late Night Fuel', 'Hostel Offers'],
    logoUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'demo-lexafriq-legal',
    name: 'LEXAFRIQ LEGAL',
    industry: 'Corporate Law & SME Advisory',
    location: 'Ikeja GRA, Lagos',
    usp: 'Fixed-fee CAC compliance, cross-border contract auditing, and founder IP protection with 48-hour turnarounds.',
    description: 'We eliminate legal jargon and protect fast-scaling tech & retail businesses in Nigeria from expensive litigation loopholes.',
    audience: 'SME founders, tech startups, real estate investors, and commercial directors.',
    tone: 'Corporate & Trust-Building',
    pillars: ['Contract Clarity', 'CAC Compliance', 'Risk Mitigation', 'Founder Advice'],
    logoUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=300&q=80',
  },
];

export const DEFAULT_AURA_DNA = {
  brandPersonality: ['Restrained', 'Botanical Precision', 'Unapologetic Quality', 'Warm Editorial'],
  positioning: 'AURA NAIJA is the definitive botanical skincare ritual engineered specifically for melanin-rich skin in tropical climates.',
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

export function getInitialSeedBrandData() {
  const demo = DEMO_BRANDS[0];
  const brandDna = DEFAULT_AURA_DNA;
  const pricingTiers = generatePsychologicalPricing(demo.name, demo.industry);
  const calendar = generate20DayCalendar(demo.name, brandDna);

  return {
    brand: demo,
    brandDna,
    pricingTiers,
    calendar,
  };
}

export async function getSeedBrandData(brandId: string) {
  const demo = DEMO_BRANDS.find((b) => b.id === brandId) || DEMO_BRANDS[0];
  if (brandId === 'demo-aura-skincare') {
    return getInitialSeedBrandData();
  }
  const brandDna = await generateBrandDNA({
    brandName: demo.name,
    industry: demo.industry,
    location: demo.location,
    usp: demo.usp,
    description: demo.description,
    audience: demo.audience,
    tone: demo.tone,
    pillars: demo.pillars,
    assets: [],
  });
  const pricingTiers = generatePsychologicalPricing(demo.name, demo.industry);
  const calendar = generate20DayCalendar(demo.name, brandDna);

  return {
    brand: demo,
    brandDna,
    pricingTiers,
    calendar,
  };
}
