import { IntakeBriefSchema, PostEditSchema } from '../src/lib/validation/schemas';
import { generateBrandDNA, generatePsychologicalPricing, generate20DayCalendar, generateCreativeConcept, generateSingleDayPost } from '../src/lib/ai/brandEngine';
import { GeminiImageProvider } from '../src/lib/ai/providers/GeminiImageProvider';

async function runAllTests() {
  console.log('====================================================');
  console.log('⚡ CCS ULTRA PRODUCTION TEST SUITE RUNNER');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}`);
      failed++;
    }
  }

  // TEST 1: Schema Validation (Intake Brief)
  try {
    const validBrief = IntakeBriefSchema.parse({
      brandName: 'Test Brand',
      industry: 'Law Firm',
      location: 'Lagos',
      usp: '48hr contract auditing',
      description: 'We help growing Nigerian SMEs protect their IP and draft solid contracts without legal jargon.',
      audience: 'Tech startups',
      tone: 'Corporate & Trust-Building',
      pillars: ['Contract Advice', 'CAC Compliance'],
    });
    assert(validBrief.brandName === 'Test Brand', 'IntakeBriefSchema validation for valid input');
  } catch (e: any) {
    assert(false, `IntakeBriefSchema validation failed: ${e.message}`);
  }

  // TEST 2: Brand DNA Generation Engine
  try {
    const dna = await generateBrandDNA({
      brandName: 'Aura Skincare',
      industry: 'Melanin Skincare & Cosmetics',
      location: 'Victoria Island',
      usp: '100% cold pressed botanicals',
      description: 'We make natural skin remedies for melanin skin barrier repair.',
      audience: 'Women 25-45',
      tone: 'Luxury & Aspirational',
      pillars: ['Barrier Repair', 'Botanical Science'],
      assets: [],
    });
    assert(Array.isArray(dna.brandPersonality) && dna.brandPersonality.length > 0, 'Brand DNA generates personality array');
    assert(dna.colourSystem.recommendedPalette.length >= 3, 'Brand DNA generates recommended colour palette');
    assert(dna.thingsToAvoid.length > 0, 'Brand DNA includes anti-AI-slop constraints');
  } catch (e: any) {
    assert(false, `Brand DNA generation engine failed: ${e.message}`);
  }

  // TEST 3: Psychological Pricing Engine
  try {
    const legalPricing = generatePsychologicalPricing('Lexafriq', 'Corporate Law');
    assert(legalPricing.length === 3, 'Psychological pricing generates exactly 3 tiers');
    assert(legalPricing[1].recommended === true, 'Middle tier acts as recommended offer bridge');
  } catch (e: any) {
    assert(false, `Psychological pricing failed: ${e.message}`);
  }

  // TEST 4: 20-Day Content Strategy Calendar Engine
  try {
    const dna = await generateBrandDNA({
      brandName: 'Gidi Bites',
      industry: 'Campus Food',
      location: 'Unilag',
      usp: 'Chili plantain crunch',
      description: 'Campus reading fuel delivered under 20 mins.',
      audience: 'Students',
      tone: 'Street-Smart',
      pillars: ['Campus Survival', 'Crunch ASMR'],
      assets: [],
    });
    const calendar = generate20DayCalendar('Gidi Bites', dna);
    assert(calendar.length === 20, 'Calendar Engine generates 20-day strategic post sequence');
    assert(calendar[0].phase === 'ATTENTION', 'Day 1 starts with ATTENTION narrative phase');
    assert(calendar[19].phase === 'CONVERSION', 'Day 20 concludes with CONVERSION narrative phase');
  } catch (e: any) {
    assert(false, `20-Day Calendar Engine failed: ${e.message}`);
  }

  // TEST 5: Creative Critic & Image Provider Engine
  try {
    const provider = new GeminiImageProvider();
    const dna = await generateBrandDNA({
      brandName: 'Test',
      industry: 'Legal',
      location: 'Lagos',
      usp: 'Clarity',
      description: 'Legal counsel for startups and business owners.',
      audience: 'SMEs',
      tone: 'Corporate',
      pillars: ['Compliance'],
      assets: [],
    });
    const concept = generateCreativeConcept({
      brandDna: dna,
      postType: 'Educational',
      pillar: 'Compliance',
      strategicObjective: 'Disrupt scrolling',
      hook: 'Don’t sign this contract',
      caption: 'Sample caption body text',
    });

    const res = await provider.generateImage({
      brandDna: dna,
      creativeConcept: concept,
    });

    assert(res.success === true, 'Gemini Provider generates brand-calibrated visual');
    assert(res.criticScore?.approved === true, 'Creative Critic Stage evaluates and approves output');
    assert((res.criticScore?.aiSlopRisk ?? 100) < 30, 'Creative Critic validates low AI slop risk');
  } catch (e: any) {
    assert(false, `Image Provider & Critic test failed: ${e.message}`);
  }

  // TEST 6: Single-Day Generation
  try {
    const dna = await generateBrandDNA({
      brandName: 'Test',
      industry: 'Bakery',
      location: 'Lagos',
      usp: 'Sourdough',
      description: 'Daily sourdough bread baked fresh.',
      audience: 'Foodies',
      tone: 'Warm',
      pillars: ['Baking'],
      assets: [],
    });
    const single = generateSingleDayPost('Test', dna, { pillar: 'Flash Offer', context: 'Weekend deal' });
    assert(single.postType === 'Spotlight Post', 'Single day post generated successfully');
  } catch (e: any) {
    assert(false, `Single day post generation failed: ${e.message}`);
  }

  console.log('\n====================================================');
  console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) process.exit(1);
}

runAllTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
