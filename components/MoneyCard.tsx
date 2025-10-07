'use client';

import { Wallet2, TrendingDown, DollarSign, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { DailySnapshot, SpendingEvent } from '@/lib/types';

interface MoneyCardProps {
  data?: DailySnapshot | null;
  recentSpending?: SpendingEvent[];
  isLoading?: boolean;
}

export function MoneyCard({ data, recentSpending = [], isLoading = false }: MoneyCardProps) {
  const [expanded, setExpanded] = useState(false);

  if (isLoading) {
    return (
      <div className="metric-card animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-full bg-slate-200"></div>
          <div className="h-6 w-20 bg-slate-200 rounded"></div>
          <div className="h-6 w-16 bg-slate-200 rounded"></div>
        </div>
        <div className="h-4 w-32 bg-slate-200 rounded"></div>
      </div>
    );
  }

  const budgetStatus = data?.budgetStatus || 'on-track';
  const spendingToday = data?.spendingToday || 0;
  const dailyBudget = 75; // This could come from user settings

  const getBudgetColor = (status: string) => {
    switch (status) {
      case 'under': return 'text-success';
      case 'on-track': return 'text-success';
      case 'over': return 'text-danger';
      default: return 'text-success';
    }
  };

  const getBudgetBgColor = (status: string) => {
    switch (status) {
      case 'under': return 'bg-green-100';
      case 'on-track': return 'bg-green-100';
      case 'over': return 'bg-red-100';
      default: return 'bg-green-100';
    }
  };

  const getBudgetLabel = (status: string) => {
    switch (status) {
      case 'under': return 'Under Budget';
      case 'on-track': return 'On Track';
      case 'over': return 'Over Budget';
      default: return 'On Track';
    }
  };

  const spendingPercentage = Math.min((spendingToday / dailyBudget) * 100, 100);
  const hasRecentHighStressSpending = recentSpending.some(
    event => event.stressContext === 'high' && event.timestamp > new Date(Date.now() - 24 * 60 * 60 * 1000)
  );

  return (
    <div
      className="metric-card cursor-pointer hover:bg-opacity-70 transition-all duration-200"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-full ${getBudgetBgColor(budgetStatus)} flex items-center justify-center`}>
            <Wallet2 className={`w-5 h-5 ${getBudgetColor(budgetStatus)}`} />
          </div>
          <h3 className="font-semibold">Budget</h3>
        </div>
        <div className={`text-sm font-semibold ${getBudgetColor(budgetStatus)} ${getBudgetBgColor(budgetStatus)} px-3 py-1 rounded-full flex items-center gap-1`}>
          {budgetStatus === 'over' && <AlertTriangle className="w-3 h-3" />}
          {getBudgetLabel(budgetStatus)}
        </div>
      </div>

      {expanded ? (
        <div className="space-y-3 mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <DollarSign className="w-4 h-4" />
              <span>Spent Today</span>
            </div>
            <span className="font-semibold">${spendingToday.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <TrendingDown className="w-4 h-4" />
              <span>Daily Budget</span>
            </div>
            <span className="font-semibold">${dailyBudget.toFixed(2)}</span>
          </div>

          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                spendingPercentage > 90 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                spendingPercentage > 75 ? 'bg-gradient-to-r from-yellow-500 to-amber-500' :
                'bg-gradient-to-r from-green-500 to-green-600'
              }`}
              style={{ width: `${spendingPercentage}%` }}
            ></div>
          </div>

          {hasRecentHighStressSpending && (
            <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500 bg-opacity-10 px-2 py-1 rounded">
              <AlertTriangle className="w-3 h-3" />
              High-stress spending detected
            </div>
          )}

          {recentSpending.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-700">
              <p className="text-xs text-muted mb-2">Recent Transactions</p>
              <div className="space-y-1">
                {recentSpending.slice(0, 3).map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-muted truncate max-w-32">{transaction.description || transaction.category}</span>
                    <span className="font-semibold">${transaction.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted">Tap to expand</p>
          <div className="text-sm font-semibold">
            ${spendingToday.toFixed(2)} / ${dailyBudget.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

