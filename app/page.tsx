'use client';

import { MainContent } from '@/app/components/MainContent';
import { BottomNav } from '@/components/BottomNav';

export default function Home() {
  return (
    <main className="min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <MainContent />
      </div>
      <BottomNav />
    </main>
  );
}