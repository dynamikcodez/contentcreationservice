import { z } from 'zod';

export const IntakeBriefSchema = z.object({
  brandName: z.string().min(2, 'Brand name is required'),
  industry: z.string().min(2, 'Industry is required'),
  location: z.string().min(2, 'Location is required'),
  usp: z.string().min(5, 'USP is required'),
  description: z.string().min(30, 'Please tell your story in at least 30 characters'),
  audience: z.string().min(5, 'Target audience description is required'),
  tone: z.string().default('Let CCS determine'),
  pillars: z.array(z.string()).min(2, 'Select at least 2 content pillars'),
  assets: z.array(z.object({
    type: z.enum(['LOGO', 'PRODUCT', 'FOUNDER', 'REFERENCE', 'GRAPHIC', 'OTHER']),
    url: z.string(),
  })).optional().default([]),
});

export type IntakeBriefInput = z.infer<typeof IntakeBriefSchema>;

export const PostEditSchema = z.object({
  hook: z.string().min(3, 'Hook is required'),
  caption: z.string().min(10, 'Caption is required'),
  cta: z.string().min(2, 'CTA is required'),
  postType: z.string().optional(),
  pillar: z.string().optional(),
});

export const MagicWandRefineSchema = z.object({
  postId: z.string(),
  refinementPrompt: z.string().min(3, 'Please describe your visual change request'),
});

export const ProviderConfigSchema = z.object({
  provider: z.enum(['GEMINI', 'OPENAI', 'STABILITY', 'REPLICATE']),
  apiKey: z.string().min(10, 'API key is required'),
});

export const DesignerRequestSchema = z.object({
  brandId: z.string(),
  postId: z.string().optional(),
  preferredDirection: z.string().min(10, 'Please describe your preferred direction'),
  rejectedDirections: z.string().optional(),
});
