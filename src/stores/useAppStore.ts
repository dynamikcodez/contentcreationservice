import { create } from 'zustand';
import { BrandDNAOutput, CreativeConceptOutput, CreativeCriticOutput } from '@/types/ai';
import { DEMO_BRANDS, getSeedBrandData } from '@/lib/seeds';
import { GeminiImageProvider } from '@/lib/ai/providers/GeminiImageProvider';
import { generateCreativeConcept, generateSingleDayPost } from '@/lib/ai/brandEngine';

export interface PostItem {
  id: string;
  dayNumber: number;
  phase: string;
  pillar: string;
  postType: string;
  strategicObjective: string;
  hook: string;
  caption: string;
  cta: string;
  visualStatus: 'NOT_GENERATED' | 'GENERATING' | 'READY' | 'FAILED';
  imageUrl?: string;
  creativeConcept?: CreativeConceptOutput;
  criticScore?: CreativeCriticOutput;
}

export interface DesignerRequestItem {
  id: string;
  brandId: string;
  brandName: string;
  postId?: string;
  status: 'SUBMITTED' | 'REVIEWING' | 'IN_PROGRESS' | 'DELIVERED';
  preferredDirection: string;
  createdAt: string;
}

export interface AppState {
  // User & Subscription
  userId: string;
  userName: string;
  userEmail: string;
  plan: 'TRY_IT' | 'MONTHLY' | 'RETAINER';
  
  // Quotas & Usage Accounting
  usage: {
    calendarGenerations: number;
    imageGenerations: number;
    maxImageGenerations: number;
    designerRequestsUsed: number;
  };
  byoApiKey?: string;
  validationMode: boolean;

  // Active Brand State
  activeBrandId: string;
  brands: Array<{
    id: string;
    name: string;
    industry: string;
    location: string;
    usp: string;
    description: string;
    audience: string;
    tone: string;
  }>;

  activeBrandDna: BrandDNAOutput | null;
  pricingTiers: Array<{
    name: string;
    price: string;
    description: string;
    psychologicalHook: string;
    recommended: boolean;
  }>;

  posts: PostItem[];
  designerRequests: DesignerRequestItem[];
  creativeMemory: {
    acceptedConcepts: string[];
    rejectedConcepts: string[];
    preferredStyles: string[];
    rejectedStyles: string[];
  };

  // Actions
  selectBrand: (brandId: string) => Promise<void>;
  createBrandFromBrief: (brief: any) => Promise<void>;
  updatePost: (postId: string, updatedFields: Partial<PostItem>) => void;
  regeneratePostText: (postId: string) => void;
  generateVisualForPost: (postId: string) => Promise<void>;
  refineVisualWithMagicWand: (postId: string, prompt: string) => Promise<void>;
  generateSingleDay: (pillar: string, context: string) => void;
  submitDesignerRequest: (brandId: string, preferredDirection: string, postId?: string) => void;
  setPlan: (plan: 'TRY_IT' | 'MONTHLY' | 'RETAINER') => void;
  setByoApiKey: (key: string) => void;
  recordCreativeDecision: (type: 'ACCEPT' | 'REJECT', conceptSummary: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  userId: 'usr-default-sme',
  userName: 'Naija Business Owner',
  userEmail: 'owner@sme.ng',
  plan: 'TRY_IT',
  usage: {
    calendarGenerations: 1,
    imageGenerations: 3,
    maxImageGenerations: 10,
    designerRequestsUsed: 0,
  },
  byoApiKey: '',
  validationMode: true,

  activeBrandId: DEMO_BRANDS[0].id,
  brands: DEMO_BRANDS.map((b) => ({
    id: b.id,
    name: b.name,
    industry: b.industry,
    location: b.location,
    usp: b.usp,
    description: b.description,
    audience: b.audience,
    tone: b.tone,
  })),

  activeBrandDna: null,
  pricingTiers: [],
  posts: [],
  designerRequests: [],
  creativeMemory: {
    acceptedConcepts: [],
    rejectedConcepts: [],
    preferredStyles: ['Editorial Photography', 'Natural Sunlight'],
    rejectedStyles: ['Generic AI Slop', 'Neon Glow'],
  },

  selectBrand: async (brandId: string) => {
    const data = await getSeedBrandData(brandId);
    set({
      activeBrandId: brandId,
      activeBrandDna: data.brandDna,
      pricingTiers: data.pricingTiers,
      posts: data.calendar.map((item, idx) => ({
        id: `post-${brandId}-${item.dayNumber}`,
        ...item,
        visualStatus: idx < 3 ? 'READY' : 'NOT_GENERATED',
        imageUrl: idx < 3 ? undefined : undefined,
      })),
    });

    // Automatically trigger visual generation for post 1 & 2 for realistic experience
    const provider = new GeminiImageProvider(get().byoApiKey);
    const post1 = get().posts[0];
    if (post1 && data.brandDna && !post1.imageUrl) {
      const concept = generateCreativeConcept({
        brandDna: data.brandDna,
        postType: post1.postType,
        pillar: post1.pillar,
        strategicObjective: post1.strategicObjective,
        hook: post1.hook,
        caption: post1.caption,
      });

      const res = await provider.generateImage({
        brandDna: data.brandDna,
        creativeConcept: concept,
      });

      if (res.success) {
        set((state) => ({
          posts: state.posts.map((p, index) =>
            index === 0
              ? {
                  ...p,
                  visualStatus: 'READY',
                  imageUrl: res.imageUrl,
                  creativeConcept: concept,
                  criticScore: res.criticScore,
                }
              : p
          ),
        }));
      }
    }
  },

  createBrandFromBrief: async (brief: any) => {
    const { generateBrandDNA, generatePsychologicalPricing, generate20DayCalendar } = await import('@/lib/ai/brandEngine');
    const newBrandId = `brand-${Date.now()}`;
    const brandDna = await generateBrandDNA(brief);
    const pricingTiers = generatePsychologicalPricing(brief.brandName, brief.industry);
    const calendar = generate20DayCalendar(brief.brandName, brandDna);

    const newBrand = {
      id: newBrandId,
      name: brief.brandName,
      industry: brief.industry,
      location: brief.location,
      usp: brief.usp,
      description: brief.description,
      audience: brief.audience,
      tone: brief.tone,
    };

    set((state) => ({
      brands: [newBrand, ...state.brands],
      activeBrandId: newBrandId,
      activeBrandDna: brandDna,
      pricingTiers,
      posts: calendar.map((item) => ({
        id: `post-${newBrandId}-${item.dayNumber}`,
        ...item,
        visualStatus: 'NOT_GENERATED',
      })),
    }));

    // Trigger visual generation for Day 1 post automatically
    setTimeout(() => {
      get().generateVisualForPost(`post-${newBrandId}-1`);
    }, 300);
  },

  updatePost: (postId: string, updatedFields: Partial<PostItem>) => {
    set((state) => ({
      posts: state.posts.map((p) => (p.id === postId ? { ...p, ...updatedFields } : p)),
    }));
  },

  regeneratePostText: (postId: string) => {
    set((state) => ({
      posts: state.posts.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          hook: `[Refined] ${p.hook}`,
          caption: `[Brand Calibrated] ${p.caption} Re-anchored to solve customer friction with higher authority.`,
        };
      }),
    }));
  },

  generateVisualForPost: async (postId: string) => {
    const { posts, activeBrandDna, byoApiKey, usage } = get();
    const post = posts.find((p) => p.id === postId);
    if (!post || !activeBrandDna) return;

    // Check usage limits
    if (usage.imageGenerations >= usage.maxImageGenerations && !byoApiKey) {
      alert('Your creative studio is running low on generation capacity. Connect your own provider or upgrade your plan.');
      return;
    }

    set((state) => ({
      posts: state.posts.map((p) => (p.id === postId ? { ...p, visualStatus: 'GENERATING' } : p)),
    }));

    const provider = new GeminiImageProvider(byoApiKey);
    const concept = post.creativeConcept || generateCreativeConcept({
      brandDna: activeBrandDna,
      postType: post.postType,
      pillar: post.pillar,
      strategicObjective: post.strategicObjective,
      hook: post.hook,
      caption: post.caption,
    });

    const res = await provider.generateImage({
      brandDna: activeBrandDna,
      creativeConcept: concept,
      userApiKey: byoApiKey,
    });

    if (res.success) {
      set((state) => ({
        usage: { ...state.usage, imageGenerations: state.usage.imageGenerations + 1 },
        posts: state.posts.map((p) =>
          p.id === postId
            ? {
                ...p,
                visualStatus: 'READY',
                imageUrl: res.imageUrl,
                creativeConcept: concept,
                criticScore: res.criticScore,
              }
            : p
        ),
      }));
    } else {
      set((state) => ({
        posts: state.posts.map((p) => (p.id === postId ? { ...p, visualStatus: 'FAILED' } : p)),
      }));
    }
  },

  refineVisualWithMagicWand: async (postId: string, prompt: string) => {
    const { posts, activeBrandDna, byoApiKey } = get();
    const post = posts.find((p) => p.id === postId);
    if (!post || !activeBrandDna || !post.imageUrl) return;

    set((state) => ({
      posts: state.posts.map((p) => (p.id === postId ? { ...p, visualStatus: 'GENERATING' } : p)),
    }));

    const provider = new GeminiImageProvider(byoApiKey);
    const concept = post.creativeConcept || generateCreativeConcept({
      brandDna: activeBrandDna,
      postType: post.postType,
      pillar: post.pillar,
      strategicObjective: post.strategicObjective,
      hook: post.hook,
      caption: post.caption,
    });

    const res = await provider.editImage({
      baseImageUrl: post.imageUrl,
      refinementPrompt: prompt,
      brandDna: activeBrandDna,
      creativeConcept: concept,
    });

    if (res.success) {
      set((state) => ({
        posts: state.posts.map((p) =>
          p.id === postId
            ? {
                ...p,
                visualStatus: 'READY',
                imageUrl: res.imageUrl,
                criticScore: res.criticScore,
              }
            : p
        ),
      }));
    }
  },

  generateSingleDay: (pillar: string, context: string) => {
    const { activeBrandDna, brands, activeBrandId } = get();
    const activeBrand = brands.find((b) => b.id === activeBrandId);
    if (!activeBrandDna || !activeBrand) return;

    const singlePost = generateSingleDayPost(activeBrand.name, activeBrandDna, { pillar, context });
    const newPostId = `single-${Date.now()}`;

    const { dayNumber: _unusedDay, ...singlePostFields } = singlePost;
    const newPostItem: PostItem = {
      id: newPostId,
      dayNumber: get().posts.length + 1,
      phase: 'SINGLE SPOTLIGHT',
      ...singlePostFields,
      visualStatus: 'NOT_GENERATED',
    };

    set((state) => ({
      posts: [newPostItem, ...state.posts],
    }));

    // Trigger visual generation
    get().generateVisualForPost(newPostId);
  },

  submitDesignerRequest: (brandId: string, preferredDirection: string, postId?: string) => {
    const { brands } = get();
    const brand = brands.find((b) => b.id === brandId);
    const newReq: DesignerRequestItem = {
      id: `req-${Date.now()}`,
      brandId,
      brandName: brand?.name || 'My Brand',
      postId,
      status: 'SUBMITTED',
      preferredDirection,
      createdAt: new Date().toISOString().split('T')[0],
    };

    set((state) => ({
      designerRequests: [newReq, ...state.designerRequests],
      usage: { ...state.usage, designerRequestsUsed: state.usage.designerRequestsUsed + 1 },
    }));
  },

  setPlan: (plan: 'TRY_IT' | 'MONTHLY' | 'RETAINER') => {
    const maxGen = plan === 'TRY_IT' ? 10 : plan === 'MONTHLY' ? 50 : 250;
    set((state) => ({
      plan,
      usage: { ...state.usage, maxImageGenerations: maxGen },
    }));
  },

  setByoApiKey: (key: string) => {
    set({ byoApiKey: key });
  },

  recordCreativeDecision: (type: 'ACCEPT' | 'REJECT', conceptSummary: string) => {
    set((state) => ({
      creativeMemory: {
        ...state.creativeMemory,
        acceptedConcepts: type === 'ACCEPT' ? [...state.creativeMemory.acceptedConcepts, conceptSummary] : state.creativeMemory.acceptedConcepts,
        rejectedConcepts: type === 'REJECT' ? [...state.creativeMemory.rejectedConcepts, conceptSummary] : state.creativeMemory.rejectedConcepts,
      },
    }));
  },
}));
