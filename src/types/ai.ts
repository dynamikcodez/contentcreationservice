export interface BrandDNAOutput {
  brandPersonality: string[];
  positioning: string;
  audiencePsychology: string;
  emotionalTerritory: string[];
  verbalIdentity: {
    toneKeywords: string[];
    voiceStyle: string;
    samplePhrases: string[];
    prohibitedJargon: string[];
  };
  visualPersonality: {
    aestheticMode: string;
    overallMood: string;
    keyMotifs: string[];
  };
  colourSystem: {
    observedPalette: string[];
    recommendedPalette: string[];
    accentColour: string;
    contrastHierarchy: string;
    rationale: string;
  };
  typographyDirection: string;
  photographyDirection: string;
  compositionDirection: string;
  graphicLanguage: string;
  textureLanguage: string;
  culturalSignals: string[];
  creativeOpportunities: string[];
  creativeConstraints: string[];
  thingsToAvoid: string[];
  competitorConventionsToAvoid: string[];
}

export interface CreativeConceptInput {
  brandDna: BrandDNAOutput;
  postType: string;
  pillar: string;
  strategicObjective: string;
  hook: string;
  caption: string;
  userRefinement?: string;
  creativeMemory?: Record<string, any>;
}

export interface CreativeConceptOutput {
  strategicObjective: string;
  coreIdea: string;
  visualMetaphor: string;
  composition: string;
  subject: string;
  environment: string;
  lighting: string;
  colourBehaviour: string;
  typographyDirection: string;
  graphicTreatment: string;
  brandAssets: string[];
  culturalContext: string;
  reasonItFitsBrand: string;
  scrollStoppingMechanism: string;
  promptText: string;
}

export interface CreativeCriticOutput {
  brandSpecificity: number; // 0 - 100
  visualQuality: number; // 0 - 100
  conceptStrength: number; // 0 - 100
  assetIntegrity: number; // 0 - 100
  composition: number; // 0 - 100
  readability: number; // 0 - 100
  distinctiveness: number; // 0 - 100
  brandConsistency: number; // 0 - 100
  aiSlopRisk: number; // 0 - 100 (lower is better)
  unnecessaryDecoration: number; // 0 - 100 (lower is better)
  approved: boolean;
  critique: string;
  recommendedRevision: string;
}

export interface ImageGenerationInput {
  brandDna: BrandDNAOutput;
  creativeConcept: CreativeConceptOutput;
  aspectRatio?: '1:1' | '9:16' | '4:5';
  userApiKey?: string;
  brandAssetUrls?: string[];
}

export interface ImageEditInput {
  baseImageUrl: string;
  refinementPrompt: string;
  brandDna: BrandDNAOutput;
  creativeConcept: CreativeConceptOutput;
  userApiKey?: string;
}

export interface ImageGenerationResult {
  success: boolean;
  imageUrl?: string;
  promptUsed: string;
  provider: string;
  criticScore?: CreativeCriticOutput;
  cost?: number;
  durationMs?: number;
  error?: string;
}

export interface ProviderCapabilities {
  name: string;
  supportsInpainting: boolean;
  supportsBYOKey: boolean;
  maxResolution: string;
  costPerImage: number;
}

export interface ImageGenerationProvider {
  generateImage(input: ImageGenerationInput): Promise<ImageGenerationResult>;
  editImage(input: ImageEditInput): Promise<ImageGenerationResult>;
  getCapabilities(): ProviderCapabilities;
}
