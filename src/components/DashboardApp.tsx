'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore, PostItem } from '@/stores/useAppStore';
import { HeaderNav } from '@/components/HeaderNav';
import { BottomTabBar, TabType } from '@/components/BottomTabBar';
import { GameplanView } from '@/components/GameplanView';
import { CalendarFeedView } from '@/components/CalendarFeedView';
import { CreativeStudioView } from '@/components/CreativeStudioView';
import { SupportSopView } from '@/components/SupportSopView';
import { PostEditorModal } from '@/components/PostEditorModal';
import { MagicWandModal } from '@/components/MagicWandModal';
import { DesignerRequestModal } from '@/components/DesignerRequestModal';
import { OperatorConsoleModal } from '@/components/OperatorConsoleModal';
import { IntakeOnboardingModal } from '@/components/IntakeOnboardingModal';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface DashboardAppProps {
  onBackToLanding?: () => void;
}

export const DashboardApp: React.FC<DashboardAppProps> = ({ onBackToLanding }) => {
  const {
    selectBrand,
    feedbackToast,
    setFeedbackToast,
    apiKeyModalOpen,
    apiKeyModalReason,
    openApiKeyModal,
    closeApiKeyModal,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<TabType>('calendar');

  // Modal States
  const [editingPost, setEditingPost] = useState<PostItem | null>(null);
  const [wandPost, setWandPost] = useState<PostItem | null>(null);
  const [designerPost, setDesignerPost] = useState<PostItem | null>(null);
  const [showOperator, setShowOperator] = useState<boolean>(false);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);

  // Initialize seed brand data on mount and self-heal if stored state is missing Brand DNA
  useEffect(() => {
    const currentState = useAppStore.getState();
    if (!currentState.posts || currentState.posts.length === 0 || !currentState.activeBrandDna) {
      selectBrand(currentState.activeBrandId || 'demo-aura-skincare');
    }
  }, [selectBrand]);

  // Auto-dismiss toast after 3.5s
  useEffect(() => {
    if (feedbackToast) {
      const timer = setTimeout(() => {
        setFeedbackToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [feedbackToast, setFeedbackToast]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0B0F19] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans pb-20">
        
        {/* Top Header Navigation with Brand Selector & Landing Page Back Link */}
        <HeaderNav
          onOpenOperator={() => setShowOperator(true)}
          onOpenOnboarding={() => setShowOnboarding(true)}
          onBackToLanding={onBackToLanding}
          onOpenApiKey={() => openApiKeyModal()}
        />

        {/* Main Tab Views */}
        <main className="pt-2">
          {activeTab === 'gameplan' && <GameplanView />}
          
          {activeTab === 'calendar' && (
            <CalendarFeedView
              onOpenEditModal={(post) => setEditingPost(post)}
              onOpenMagicWandModal={(post) => setWandPost(post)}
              onOpenDesignerModal={(post) => setDesignerPost(post)}
              onOpenApiKeyModal={(reason?: string) => openApiKeyModal(reason)}
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

        {/* BYO API Key Modal */}
        <ApiKeyModal
          isOpen={apiKeyModalOpen}
          onClose={closeApiKeyModal}
          reason={apiKeyModalReason}
        />

        {/* Floating System Toast */}
        {feedbackToast && (
          <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 bg-slate-900/95 border border-amber-500/60 text-slate-100 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>{feedbackToast}</span>
          </div>
        )}

      </div>
    </ErrorBoundary>
  );
};
