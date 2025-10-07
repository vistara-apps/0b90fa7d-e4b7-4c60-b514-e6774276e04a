'use client';

import { DashboardHeader } from '@/components/DashboardHeader';
import { HealthCard } from '@/components/HealthCard';
import { MoneyCard } from '@/components/MoneyCard';
import { TasksCard } from '@/components/TasksCard';
import { InsightFeed } from '@/components/InsightFeed';
import { BottomNav } from '@/components/BottomNav';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { Plus, Zap, Target, DollarSign } from 'lucide-react';

export default function Home() {
  const handleAddTask = () => console.log('Add task');
  const handleLogExpense = () => console.log('Log expense');
  const handleQuickInsight = () => console.log('Quick insight');

  const fabActions = [
    {
      icon: Target,
      label: 'Add Task',
      onClick: handleAddTask,
      color: 'bg-blue-600'
    },
    {
      icon: DollarSign,
      label: 'Log Expense',
      onClick: handleLogExpense,
      color: 'bg-green-600'
    },
    {
      icon: Zap,
      label: 'Quick Insight',
      onClick: handleQuickInsight,
      color: 'bg-purple-600'
    }
  ];

  return (
    <main className="min-h-screen pb-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <DashboardHeader />
        
        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          {/* Main Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <HealthCard />
            <MoneyCard />
            <TasksCard />
          </div>

          {/* Insight Feed */}
          <InsightFeed />
        </div>
      </div>

      <FloatingActionButton actions={fabActions} />
      <BottomNav />
    </main>
  );
}
