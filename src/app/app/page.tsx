'use client';

import { DashboardApp } from '@/components/DashboardApp';
import { useRouter } from 'next/navigation';

export default function AppPage() {
  const router = useRouter();

  return (
    <DashboardApp onBackToLanding={() => router.push('/')} />
  );
}
