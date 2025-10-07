'use client';

import { Wallet2, TrendingDown, DollarSign, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { CardSkeleton } from './SkeletonLoader';
import { ProgressRing } from './ProgressRing';
import { AnimatedCounter } from './AnimatedCounter';
import { DailySnapshot, SpendingEvent } from '@/lib/types';

interface MoneyCardProps {
  data?: DailySnapshot | null;
  recentSpending?: SpendingEvent[];
  isLoading?: boolean;
}

export function MoneyCard({ data, recentSpending = [], isLoading = false }: MoneyCardProps) {
  const [expanded, setExpanded] = useState(false);

  if (isLoading) {
    return <CardSkeleton />;
  }

  const spentToday = data?.spendingToday || 0;
  const dailyBudget = 75; // Default daily budget - could be made configurable
  const budgetStatus = data?.budgetStatus || 'on-track';
  const percentage = dailyBudget > 0 ? (spentToday / dailyBudget) * 100 : 0;

  const statusConfig = {
    'under': { text: 'Under Budget', color: 'text-emerald-400 bg-emerald-500' },
    'on-track': { text: 'On Track', color: 'text-emerald-400 bg-emerald-500' },
    'over': { text: 'Over Budget', color: 'text-red-400 bg-red-500' }
  };

  const currentStatus = statusConfig[budgetStatus] || statusConfig['on-track'];

  return (
    <button 
      className="metric-card text-left w-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      onClick={() => setExpanded(!expanded)}
      aria-expanded={expanded}
      aria-label={`Budget status: ${currentStatus.text}. Spent $${spentToday} of $${dailyBudget}. ${expanded ? 'Collapse' : 'Expand'} details`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-amber-500 bg-opacity-20 flex items-center justify-center ring-1 ring-amber-500 ring-opacity-30">
            <Wallet2 className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="font-semibold text-white">Budget</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className={`text-sm font-semibold ${currentStatus.color} bg-opacity-20 px-3 py-1 rounded-full`}>
            {currentStatus.text}
          </div>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>

      {expanded ? (
        <div className="space-y-3 mt-4 pt-4 border-t border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <DollarSign className="w-4 h-4 text-red-400" />
              <span>Spent Today</span>
            </div>
            <span className="font-semibold text-white">${spentToday.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <TrendingDown className="w-4 h-4 text-blue-400" />
              <span>Daily Budget</span>
            </div>
            <span className="font-semibold text-white">${dailyBudget.toFixed(2)}</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-xs text-gray-400">
              <span>{percentage.toFixed(0)}% used</span>
              <span>${(dailyBudget - spentToday).toFixed(2)} remaining</span>
            </div>
            <div className="flex items-center justify-center">
              <ProgressRing 
                progress={percentage} 
                size={80} 
                strokeWidth={6}
                className="text-amber-400"
              >
                <div className="text-center">
                  <AnimatedCounter 
                    value={percentage} 
                    className="text-sm font-bold text-amber-400"
                    suffix="%"
                    duration={1000}
                  />
                  <div className="text-xs text-gray-400">used</div>
                </div>
              </ProgressRing>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            {recentSpending.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-600">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Recent Spending</h4>
                <div className="space-y-1">
                  {recentSpending.slice(0, 3).map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 truncate flex-1 mr-2">{expense.description || expense.category}</span>
                      <span className="text-white font-medium">${expense.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-400">Click to expand details</p>
      )}
    </button>
  );
}