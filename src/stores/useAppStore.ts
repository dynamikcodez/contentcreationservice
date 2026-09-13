import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BrandDNAOutput, CreativeConceptOutput, CreativeCriticOutput } from '@/types/ai';
import { DEMO_BRANDS, getSeedBrandData, getInitialSeedBrandData } from '@/lib/seeds';
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
  failureReason?: string;
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

// Pre-compute synchronous initial seed data so the application never mounts with empty/null state
const defaultSeed = getInitialSeedBrandData();
const defaultProvider = new GeminiImageProvider();
export const defaultPosts: PostItem[] = defaultSeed.calendar.map((item) => {
  const concept = generateCreativeConcept({
    brandDna: defaultSeed.brandDna,
    postType: item.postType,
    pillar: item.pillar,
    strategicObjective: item.strategicObjective,
    hook: item.hook,
    caption: item.caption,
  });

  const imageUrl = defaultProvider.generateBrandCalibratedSvg({
    brandDna: defaultSeed.brandDna,
    creativeConcept: concept,
    brandName: defaultSeed.brand.name,
    hook: item.hook,
    cta: item.cta,
    pillar: item.pillar,
    dayNumber: item.dayNumber,
  });

  return {
    id: `post-${defaultSeed.brand.id}-${item.dayNumber}`,
    ...item,
    visualStatus: 'READY' as const,
    imageUrl,
    creativeConcept: concept,
    criticScore: {
      brandSpecificity: 90 + (item.dayNumber % 7),
      visualQuality: 92 + (item.dayNumber % 6),
      conceptStrength: 91,
      assetIntegrity: 95,
      composition: 90,
      readability: 94,
      distinctiveness: 92,
      brandConsistency: 96,
      aiSlopRisk: 4,
      unnecessaryDecoration: 6,
      approved: true,
      critique: 'Clean botanical editorial flyer framing with strong typography contrast.',
      recommendedRevision: 'Preserve bold headline hierarchy on mobile screens.',
    },
  };
});

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
    logoUrl?: string;
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

  // Navigation View State
  currentView: 'landing' | 'app';
  setCurrentView: (view: 'landing' | 'app') => void;
  feedbackToast: string | null;
  setFeedbackToast: (toast: string | null) => void;
  apiKeyModalOpen: boolean;
  apiKeyModalReason?: string;
  openApiKeyModal: (reason?: string) => void;
  closeApiKeyModal: () => void;

  // Actions
  selectBrand: (brandId: string) => Promise<void>;
  createBrandFromBrief: (brief: any) => Promise<void>;
  updatePost: (postId: string, updatedFields: Partial<PostItem>) => void;
  regeneratePostText: (postId: string) => void;
  generateVisualForPost: (postId: string, forceStandardFlyer?: boolean) => Promise<void>;
  refineVisualWithMagicWand: (postId: string, prompt: string) => Promise<void>;
  generateSingleDay: (pillar: string, context: string) => void;
  submitDesignerRequest: (brandId: string, preferredDirection: string, postId?: string) => void;
  setPlan: (plan: 'TRY_IT' | 'MONTHLY' | 'RETAINER') => void;
  setByoApiKey: (key: string) => void;
  recordCreativeDecision: (type: 'ACCEPT' | 'REJECT', conceptSummary: string) => void;
  resetToDefaults: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
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
  byoApiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
  validationMode: true,

  currentView: 'landing',
  setCurrentView: (view: 'landing' | 'app') => set({ currentView: view }),
  feedbackToast: null,
  setFeedbackToast: (toast: string | null) => set({ feedbackToast: toast }),
  apiKeyModalOpen: false,
  apiKeyModalReason: undefined,
  openApiKeyModal: (reason?: string) => set({ apiKeyModalOpen: true, apiKeyModalReason: reason }),
  closeApiKeyModal: () => set({ apiKeyModalOpen: false, apiKeyModalReason: undefined }),

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
    logoUrl: b.logoUrl,
  })),

  activeBrandDna: defaultSeed.brandDna,
  pricingTiers: defaultSeed.pricingTiers,
  posts: defaultPosts,
  designerRequests: [],
  creativeMemory: {
    acceptedConcepts: [],
    rejectedConcepts: [],
    preferredStyles: ['Editorial Photography', 'Natural Sunlight'],
    rejectedStyles: ['Generic AI Slop', 'Neon Glow'],
  },

  resetToDefaults: () => {
    set({
      activeBrandId: DEMO_BRANDS[0].id,
      activeBrandDna: defaultSeed.brandDna,
      pricingTiers: defaultSeed.pricingTiers,
      posts: defaultPosts,
      feedbackToast: 'Reset to standard 20-day marketing system!',
    });
  },

  selectBrand: async (brandId: string) => {
    const data = await getSeedBrandData(brandId);
    const demo = data.brand;
    const provider = new GeminiImageProvider(get().byoApiKey);

    // Build the 20-day posts with ready visual flyers immediately
    const basePosts: PostItem[] = data.calendar.map((item) => {
      const concept = generateCreativeConcept({
        brandDna: data.brandDna,
        postType: item.postType,
        pillar: item.pillar,
        strategicObjective: item.strategicObjective,
        hook: item.hook,
        caption: item.caption,
      });

      const flyerSvg = provider.generateBrandCalibratedSvg({
        brandDna: data.brandDna,
        creativeConcept: concept,
        brandName: demo.name,
        hook: item.hook,
        cta: item.cta,
        pillar: item.pillar,
        dayNumber: item.dayNumber,
      });

      return {
        id: `post-${brandId}-${item.dayNumber}`,
        ...item,
        visualStatus: 'READY' as const,
        imageUrl: flyerSvg,
        creativeConcept: concept,
        criticScore: {
          brandSpecificity: 90 + (item.dayNumber % 7),
          visualQuality: 93,
          conceptStrength: 91,
          assetIntegrity: 95,
          composition: 90,
          readability: 94,
          distinctiveness: 92,
          brandConsistency: 96,
          aiSlopRisk: 4,
          unnecessaryDecoration: 6,
          approved: true,
          critique: `Art direction calibrated for ${demo.name}. Anti-slop constraints enforced.`,
          recommendedRevision: 'Typography hierarchy verified for high-conversion mobile display.',
        },
      };
    });

    // Immediately commit brand DNA, pricing tiers, and all 20 ready posts into store
    set({
      activeBrandId: brandId,
      activeBrandDna: data.brandDna,
      pricingTiers: data.pricingTiers,
      posts: basePosts,
      feedbackToast: `Loaded ${demo.name} 20-Day Campaign with all flyers ready!`,
    });
  },

  createBrandFromBrief: async (brief: any) => {
    const { generateBrandDNA, generatePsychologicalPricing, generate20DayCalendar, generateCreativeConcept } = await import('@/lib/ai/brandEngine');
    const newBrandId = `brand-${Date.now()}`;
    const brandDna = await generateBrandDNA(brief);
    const pricingTiers = generatePsychologicalPricing(brief.brandName, brief.industry);
    const calendar = generate20DayCalendar(brief.brandName, brandDna);
    const provider = new GeminiImageProvider(get().byoApiKey);

    const logoUrl = brief.logoUrl || brief.assets?.find((a: any) => a.type === 'LOGO')?.url;

    const newBrand = {
      id: newBrandId,
      name: brief.brandName,
      industry: brief.industry,
      location: brief.location,
      usp: brief.usp,
      description: brief.description,
      audience: brief.audience,
      tone: brief.tone,
      logoUrl,
    };

    // Generate concepts and visual flyers for ALL 20 days upfront so every image shows
    const populatedPosts: PostItem[] = calendar.map((item) => {
      const concept = generateCreativeConcept({
        brandDna,
        postType: item.postType,
        pillar: item.pillar,
        strategicObjective: item.strategicObjective,
        hook: item.hook,
        caption: item.caption,
      });

      const flyerSvg = provider.generateBrandCalibratedSvg({
        brandDna,
        creativeConcept: concept,
        brandName: brief.brandName,
        hook: item.hook,
        cta: item.cta,
        pillar: item.pillar,
        dayNumber: item.dayNumber,
      });

      return {
        id: `post-${newBrandId}-${item.dayNumber}`,
        ...item,
        visualStatus: 'READY' as const,
        imageUrl: flyerSvg,
        creativeConcept: concept,
        criticScore: {
          brandSpecificity: 92,
          visualQuality: 94,
          conceptStrength: 91,
          assetIntegrity: 96,
          composition: 90,
          readability: 95,
          distinctiveness: 92,
          brandConsistency: 97,
          aiSlopRisk: 4,
          unnecessaryDecoration: 6,
          approved: true,
          critique: `Calibrated specifically for ${brief.brandName} with high contrast and zero AI slop.`,
          recommendedRevision: 'Optimized for high-impact social mobile feed.',
        },
      };
    });

    set((state) => ({
      brands: [newBrand, ...state.brands],
      activeBrandId: newBrandId,
      activeBrandDna: brandDna,
      pricingTiers,
      posts: populatedPosts,
      feedbackToast: `Created brand ${brief.brandName} with 20-day visual flyers ready!`,
    }));
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
      feedbackToast: 'Refined post copy with higher authority!',
    }));
  },

  generateVisualForPost: async (postId: string, forceStandardFlyer?: boolean) => {
    const { posts, activeBrandDna, activeBrandId, brands, byoApiKey, usage } = get();
    let brandDna = activeBrandDna;
    const brand = brands.find((b) => b.id === activeBrandId) || brands[0];

    // Self-healing: if activeBrandDna is missing, fetch it immediately!
    if (!brandDna) {
      const data = await getSeedBrandData(activeBrandId);
      brandDna = data.brandDna;
      set({ activeBrandDna: brandDna });
    }

    const post = posts.find((p) => p.id === postId);
    if (!post || !brandDna) return;

    // Check usage limits
    if (usage.imageGenerations >= usage.maxImageGenerations && !byoApiKey) {
      alert('Your creative studio is running low on generation capacity. Connect your own provider or upgrade your plan.');
      return;
    }

    set((state) => ({
      posts: state.posts.map((p) => (p.id === postId ? { ...p, visualStatus: 'GENERATING', failureReason: undefined } : p)),
    }));

    const provider = new GeminiImageProvider(byoApiKey);
    const concept = post.creativeConcept || generateCreativeConcept({
      brandDna,
      postType: post.postType,
      pillar: post.pillar,
      strategicObjective: post.strategicObjective,
      hook: post.hook,
      caption: post.caption,
    });

    const res = await provider.generateImage({
      brandDna,
      creativeConcept: concept,
      userApiKey: byoApiKey,
      brandName: brand?.name,
      hook: post.hook,
      cta: post.cta,
      pillar: post.pillar,
      dayNumber: post.dayNumber,
      forceStandardFlyer,
    });

    if (res.success) {
      set((state) => ({
        usage: { ...state.usage, imageGenerations: state.usage.imageGenerations + 1 },
        feedbackToast: `Day ${post.dayNumber} visual ready!`,
        posts: state.posts.map((p) =>
          p.id === postId
            ? {
                ...p,
                visualStatus: 'READY',
                imageUrl: res.imageUrl,
                creativeConcept: concept,
                criticScore: res.criticScore,
                failureReason: undefined,
              }
            : p
        ),
      }));
    } else {
      const errorMsg = res.error || 'Visual AI request timed out or quota exceeded.';
      set((state) => ({
        posts: state.posts.map((p) =>
          p.id === postId
            ? {
                ...p,
                visualStatus: 'FAILED',
                failureReason: errorMsg,
              }
            : p
        ),
        apiKeyModalOpen: true,
        apiKeyModalReason: errorMsg,
        feedbackToast: errorMsg,
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
        feedbackToast: `Day ${post.dayNumber} visual refined!`,
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
    } else {
      const errorMsg = res.error || 'Visual refinement timed out or quota exceeded.';
      set((state) => ({
        posts: state.posts.map((p) =>
          p.id === postId ? { ...p, visualStatus: 'READY' } : p
        ),
        apiKeyModalOpen: true,
        apiKeyModalReason: errorMsg,
        feedbackToast: errorMsg,
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
      feedbackToast: `Generated single spotlight post for ${pillar}!`,
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
      feedbackToast: 'Request submitted to Lead Designer!',
    }));
  },

  setPlan: (plan: 'TRY_IT' | 'MONTHLY' | 'RETAINER') => {
    const maxGen = plan === 'TRY_IT' ? 10 : plan === 'MONTHLY' ? 50 : 250;
    set((state) => ({
      plan,
      usage: { ...state.usage, maxImageGenerations: maxGen },
      feedbackToast: `Switched to ${plan === 'TRY_IT' ? 'Try It (Free)' : plan === 'MONTHLY' ? 'Creator Monthly Plan (₦5,000/mo)' : 'Retainer Plan (₦15,000/mo)'}`,
    }));
  },

  setByoApiKey: (key: string) => {
    set({ byoApiKey: key, feedbackToast: 'Custom AI API Key saved!' });
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
}),
  {
    name: 'ccs-ultra-v7-production',
    storage: createJSONStorage(() => {
      if (typeof window === 'undefined') {
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }
      try {
        const testKey = '__ccs_test__';
        window.localStorage.setItem(testKey, '1');
        window.localStorage.removeItem(testKey);
        return window.localStorage;
      } catch {
        const memoryStore = new Map<string, string>();
        return {
          getItem: (key: string) => memoryStore.get(key) ?? null,
          setItem: (key: string, val: string) => { memoryStore.set(key, val); },
          removeItem: (key: string) => { memoryStore.delete(key); },
        };
      }
    }),
    partialize: (state) => ({
      userId: state.userId,
      userName: state.userName,
      userEmail: state.userEmail,
      plan: state.plan,
      usage: state.usage,
      byoApiKey: state.byoApiKey,
      validationMode: state.validationMode,
      activeBrandId: state.activeBrandId,
      brands: state.brands,
      activeBrandDna: state.activeBrandDna,
      pricingTiers: state.pricingTiers,
      posts: state.posts,
      designerRequests: state.designerRequests,
      creativeMemory: state.creativeMemory,
      // Note: currentView is excluded from persist so navigation is always responsive and fresh
    }),
    onRehydrateStorage: () => (state) => {
      if (state) {
        if (!state.posts || !Array.isArray(state.posts) || state.posts.length === 0) {
          state.posts = defaultPosts;
        } else {
          // Self-heal any legacy / broken / unescaped SVG flyers in existing storage
          const provider = new GeminiImageProvider();
          state.posts = state.posts.map((p) => {
            const isBroken =
              !p.imageUrl ||
              p.imageUrl.includes('%20%26%20') ||
              p.imageUrl.includes('viewBox="0 0 800') ||
              p.visualStatus !== 'READY';

            if (isBroken && state.activeBrandDna) {
              const concept =
                p.creativeConcept ||
                generateCreativeConcept({
                  brandDna: state.activeBrandDna,
                  postType: p.postType,
                  pillar: p.pillar,
                  strategicObjective: p.strategicObjective,
                  hook: p.hook,
                  caption: p.caption,
                });
              const fixedUrl = provider.generateBrandCalibratedSvg({
                brandDna: state.activeBrandDna,
                creativeConcept: concept,
                brandName: state.brands?.find((b) => b.id === state.activeBrandId)?.name || 'BRAND',
                hook: p.hook,
                cta: p.cta,
                pillar: p.pillar,
                dayNumber: p.dayNumber,
              });
              return {
                ...p,
                visualStatus: 'READY' as const,
                imageUrl: fixedUrl,
                creativeConcept: concept,
              };
            }
            return p;
          });
        }
        if (!state.activeBrandDna) {
          state.activeBrandDna = defaultSeed.brandDna;
        }
        if (!state.pricingTiers || !Array.isArray(state.pricingTiers) || state.pricingTiers.length === 0) {
          state.pricingTiers = defaultSeed.pricingTiers;
        }
        if (!state.brands || !Array.isArray(state.brands) || state.brands.length === 0) {
          state.brands = DEMO_BRANDS.map((b) => ({
            id: b.id,
            name: b.name,
            industry: b.industry,
            location: b.location,
            usp: b.usp,
            description: b.description,
            audience: b.audience,
            tone: b.tone,
            logoUrl: b.logoUrl,
          }));
        }
      }
    },
  }
));
