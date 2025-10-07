'use client';

import { useEffect, useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { HealthCard } from '@/components/HealthCard';
import { MoneyCard } from '@/components/MoneyCard';
import { TasksCard } from '@/components/TasksCard';
import { InsightFeed } from '@/components/InsightFeed';
import { BottomNav } from '@/components/BottomNav';
import { DashboardData } from '@/lib/types';

export default function Home() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const result = await response.json();

        if (result.success) {
          setDashboardData(result.data);
        } else {
          setError(result.error || 'Failed to load dashboard');
        }
      } catch (err) {
        setError('Network error while loading dashboard');
        console.error('Dashboard fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return (
      <main className="min-h-screen pb-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-muted mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <DashboardHeader />

        <div className="mt-8 space-y-6">
          {/* Main Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <HealthCard
              data={dashboardData?.todaySnapshot}
              isLoading={isLoading}
            />
            <MoneyCard
              data={dashboardData?.todaySnapshot}
              recentSpending={dashboardData?.recentSpending}
              isLoading={isLoading}
            />
            <TasksCard
              tasks={dashboardData?.tasks}
              isLoading={isLoading}
            />
          </div>

          {/* Insight Feed */}
          <InsightFeed
            insights={dashboardData?.insights}
            streakCount={dashboardData?.todaySnapshot?.streakCount}
            isLoading={isLoading}
          />
        </div>
      </div>

      <BottomNav />
    </main>
  );
}

