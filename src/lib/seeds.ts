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

export async function getSeedBrandData(brandId: string) {
  const demo = DEMO_BRANDS.find((b) => b.id === brandId) || DEMO_BRANDS[0];
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
