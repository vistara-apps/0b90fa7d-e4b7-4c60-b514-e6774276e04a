'use client';

import { Wallet2, TrendingDown, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CardSkeleton } from './SkeletonLoader';
import { ProgressRing } from './ProgressRing';
import { AnimatedCounter } from './AnimatedCounter';

interface BudgetData {
  spentToday: number;
  dailyBudget: number;
  status: 'on-track' | 'warning' | 'over-budget';
}

export function MoneyCard() {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BudgetData | null>(null);

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        setData({
          spentToday: 42.50,
          dailyBudget: 75.00,
          status: 'on-track'
        });
      } catch (err) {
        setError('Failed to load budget data');
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetData();
  }, []);

  if (loading) {
    return <CardSkeleton />;
  }

  if (error) {
    return (
      <div className="metric-card border-red-500 border-opacity-50">
        <div className="flex items-center gap-2 text-red-400">
          <Wallet2 className="w-5 h-5" />
          <span className="text-sm">Error loading budget data</span>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-xs text-accent hover:text-yellow-400 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const percentage = data ? (data.spentToday / data.dailyBudget) * 100 : 0;
  const statusConfig = {
    'on-track': { text: 'On Track', color: 'text-green-500 bg-green-500' },
    'warning': { text: 'Warning', color: 'text-yellow-500 bg-yellow-500' },
    'over-budget': { text: 'Over Budget', color: 'text-red-500 bg-red-500' }
  };

  const currentStatus = data ? statusConfig[data.status] : statusConfig['on-track'];

  return (
    <button 
      className="metric-card text-left w-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      onClick={() => setExpanded(!expanded)}
      aria-expanded={expanded}
      aria-label={`Budget status: ${currentStatus.text}. Spent $${data?.spentToday} of $${data?.dailyBudget}. ${expanded ? 'Collapse' : 'Expand'} details`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-yellow-500 bg-opacity-20 flex items-center justify-center">
            <Wallet2 className="w-5 h-5 text-yellow-500" />
          </div>
          <h3 className="font-semibold">Budget</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className={`text-sm font-semibold ${currentStatus.color} bg-opacity-20 px-3 py-1 rounded-full`}>
            {currentStatus.text}
          </div>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted" />
          )}
        </div>
      </div>

      {expanded ? (
        <div className="space-y-3 mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <DollarSign className="w-4 h-4" />
              <span>Spent Today</span>
            </div>
            <span className="font-semibold">${data?.spentToday.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <TrendingDown className="w-4 h-4" />
              <span>Daily Budget</span>
            </div>
            <span className="font-semibold">${data?.dailyBudget.toFixed(2)}</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-xs text-muted">
              <span>{percentage.toFixed(0)}% used</span>
              <span>${data ? (data.dailyBudget - data.spentToday).toFixed(2) : '0.00'} remaining</span>
            </div>
            <div className="flex items-center justify-center">
              <ProgressRing 
                progress={percentage} 
                size={80} 
                strokeWidth={6}
                className="text-yellow-500"
              >
                <div className="text-center">
                  <AnimatedCounter 
                    value={percentage} 
                    className="text-sm font-bold text-yellow-500"
                    suffix="%"
                    duration={1000}
                  />
                  <div className="text-xs text-muted">used</div>
                </div>
              </ProgressRing>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-amber-500 h-2 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted">Click to expand details</p>
      )}
    </button>
  );
}
