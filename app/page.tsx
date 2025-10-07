import { DashboardHeader } from '@/components/DashboardHeader';
import { HealthCard } from '@/components/HealthCard';
import { MoneyCard } from '@/components/MoneyCard';
import { TasksCard } from '@/components/TasksCard';
import { InsightFeed } from '@/components/InsightFeed';
import { BottomNav } from '@/components/BottomNav';

export default function Home() {
  return (
    <main className="min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <DashboardHeader />
        
        <div className="mt-8 space-y-6">
          {/* Main Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <HealthCard />
            <MoneyCard />
            <TasksCard />
          </div>

          {/* Insight Feed */}
          <InsightFeed />
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
