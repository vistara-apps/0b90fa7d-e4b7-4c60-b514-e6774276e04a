export interface DailySnapshot {
  healthScore: number;
  sleepHours: number;
  steps: number;
  hrv: number;
  budgetStatus: 'under' | 'on-track' | 'over';
  spendingToday: number;
  streakCount: number;
}

export interface SpendingEvent {
  id: string;
  amount: number;
  description?: string;
  category: string;
  timestamp: Date;
  stressContext: 'low' | 'medium' | 'high';
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'done';
  aiPriorityScore: number;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Insight {
  id: string;
  type: 'health-money' | 'health-productivity' | 'money-productivity' | 'general';
  pattern: string;
  confidence: number;
  unlocked: boolean;
  unlockPrice: number; // in cents
  createdAt: Date;
}

export interface DashboardData {
  todaySnapshot: DailySnapshot;
  recentSpending: SpendingEvent[];
  tasks: Task[];
  insights: Insight[];
}