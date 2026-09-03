'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore, PostItem } from '@/stores/useAppStore';
import { HeaderNav } from '@/components/HeaderNav';
import { BottomTabBar, TabType } from '@/components/BottomTabBar';
import { GameplanView } from '@/components/GameplanView';
import { CalendarFeedView } from '@/components/CalendarFeedView';
import { CreativeStudioView } from '@/components/CreativeStudioView';
import { SupportSopView } from '@/components/SupportSopView';
import { LandingPage } from '@/components/LandingPage';
import { PostEditorModal } from '@/components/PostEditorModal';
import { MagicWandModal } from '@/components/MagicWandModal';
import { DesignerRequestModal } from '@/components/DesignerRequestModal';
import { OperatorConsoleModal } from '@/components/OperatorConsoleModal';
import { IntakeOnboardingModal } from '@/components/IntakeOnboardingModal';

export default function HomePage() {
  const { selectBrand, activeBrandId, setPlan } = useAppStore();

  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<TabType>('calendar');

  // Modal States
  const [editingPost, setEditingPost] = useState<PostItem | null>(null);
  const [wandPost, setWandPost] = useState<PostItem | null>(null);
  const [designerPost, setDesignerPost] = useState<PostItem | null>(null);
  const [showOperator, setShowOperator] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  // Initialize seed brand data on mount only if stored state is empty
  useEffect(() => {
    const currentState = useAppStore.getState();
    if (!currentState.posts || currentState.posts.length === 0) {
      selectBrand(activeBrandId);
    }
  }, []);

  const handleStartGameplan = () => {
    setView('app');
    setActiveTab('calendar');
  };

  const handleSelectPlan = (plan: 'TRY_IT' | 'MONTHLY' | 'RETAINER') => {
    setPlan(plan);
  };

  if (view === 'landing') {
    return (
      <LandingPage
        onStartGameplan={handleStartGameplan}
        onSelectPlan={handleSelectPlan}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans pb-20">
      
      {/* Top Header Navigation with Brand Selector */}
      <HeaderNav
        onOpenOperator={() => setShowOperator(true)}
        onOpenOnboarding={() => setShowOnboarding(true)}
      />

      {/* Main Tab Views */}
      <main className="pt-2">
        {activeTab === 'gameplan' && <GameplanView />}
        
        {activeTab === 'calendar' && (
          <CalendarFeedView
            onOpenEditModal={(post) => setEditingPost(post)}
            onOpenMagicWandModal={(post) => setWandPost(post)}
            onOpenDesignerModal={(post) => setDesignerPost(post)}
          />
        )}

        {activeTab === 'studio' && <CreativeStudioView />}

        {activeTab === 'support' && <SupportSopView />}
      </main>

      {/* Mobile-First Bottom Navigation Bar */}
      <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modals & Overlays */}
      {editingPost && (
        <PostEditorModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
        />
      )}

      {wandPost && (
        <MagicWandModal
          post={wandPost}
          onClose={() => setWandPost(null)}
        />
      )}

      {designerPost && (
        <DesignerRequestModal
          post={designerPost}
          onClose={() => setDesignerPost(null)}
        />
      )}

      {showOperator && (
        <OperatorConsoleModal
          onClose={() => setShowOperator(false)}
        />
      )}

      {showOnboarding && (
        <IntakeOnboardingModal
          onClose={() => setShowOnboarding(false)}
        />
      )}

    </div>
  );
}
