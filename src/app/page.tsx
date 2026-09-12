'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/stores/useAppStore';
import { LandingPage } from '@/components/LandingPage';
import { DashboardApp } from '@/components/DashboardApp';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function HomePage() {
  const router = useRouter();
  const {
    selectBrand,
    setPlan,
    currentView: storeView,
    setCurrentView: setStoreView,
  } = useAppStore();

  const [view, setView] = useState<'landing' | 'app'>('landing');

  // Sync store view if updated elsewhere
  useEffect(() => {
    if (storeView) {
      setView(storeView);
    }
  }, [storeView]);

  // Initialize seed brand data on mount and self-heal if stored state is missing Brand DNA
  useEffect(() => {
    const currentState = useAppStore.getState();
    if (!currentState.posts || currentState.posts.length === 0 || !currentState.activeBrandDna) {
      selectBrand(currentState.activeBrandId || 'demo-aura-skincare');
    }
  }, [selectBrand]);

  const handleStartGameplan = () => {
    setView('app');
    setStoreView('app');
    router.push('/app');
  };

  const handleBackToLanding = () => {
    setView('landing');
    setStoreView('landing');
    router.push('/');
  };

  const handleSelectPlan = (plan: 'TRY_IT' | 'MONTHLY' | 'RETAINER') => {
    setPlan(plan);
  };

  if (view === 'landing') {
    return (
      <ErrorBoundary>
        <LandingPage
          onStartGameplan={handleStartGameplan}
          onSelectPlan={handleSelectPlan}
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <DashboardApp onBackToLanding={handleBackToLanding} />
    </ErrorBoundary>
  );
}
