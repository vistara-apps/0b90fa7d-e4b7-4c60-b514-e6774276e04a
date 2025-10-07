'use client';

import { Lightbulb, Lock, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { InsightSkeleton } from './SkeletonLoader';

interface Insight {
  id: number;
  type: string;
  preview: string;
  full: string;
  unlocked: boolean;
  price: number;
}

const mockInsights: Insight[] = [
  {
    id: 1,
    type: 'health-money',
    preview: 'Your spending is 30% higher on...',
    full: 'Your spending is 30% higher on days you skip breakfast. Try meal-prepping Sundays.',
    unlocked: false,
    price: 0.10,
  },
  {
    id: 2,
    type: 'health-productivity',
    preview: 'You complete 40% more tasks after...',
    full: 'You complete 40% more tasks after 7+ hours of sleep. Prioritize your sleep schedule.',
    unlocked: true,
    price: 0.10,
  },
];

export function InsightFeed() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setInsights(mockInsights);
      } catch (err) {
        setError('Failed to load insights');
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  const unlockInsight = (id: number) => {
    setInsights(insights.map(insight => 
      insight.id === id ? { ...insight, unlocked: true } : insight
    ));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-slate-700 rounded animate-pulse" />
            <div className="w-24 h-6 bg-slate-700 rounded animate-pulse" />
          </div>
          <div className="w-32 h-8 bg-slate-700 rounded-full animate-pulse" />
        </div>
        <div className="space-y-3">
          <InsightSkeleton />
          <InsightSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-4 border-red-500 border-opacity-50">
        <div className="flex items-center gap-2 text-red-400">
          <Lightbulb className="w-5 h-5" />
          <span className="text-sm">Error loading insights</span>
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

  return (
    <div className="space-y-4 animate-in">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-white">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          AI Insights
        </h2>
        <span className="streak-badge">
          🔥 12 Day Streak
        </span>
      </div>

      <div className="space-y-3">
        {insights.map(insight => (
          <div key={insight.id} className="glass-card p-4 hover:bg-opacity-90 transition-all duration-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500 bg-opacity-20 flex items-center justify-center flex-shrink-0 ring-1 ring-amber-500 ring-opacity-30">
                {insight.unlocked ? (
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                ) : (
                  <Lock className="w-5 h-5 text-amber-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={`text-sm sm:text-base leading-relaxed ${insight.unlocked ? 'text-white' : 'text-gray-300 blur-sm select-none'}`}>
                  {insight.unlocked ? insight.full : insight.preview}
                </p>
                
                {!insight.unlocked && (
                  <button 
                    onClick={() => unlockInsight(insight.id)}
                    className="mt-3 btn-primary text-sm focus-ring"
                    aria-label={`Unlock insight for $${insight.price}`}
                  >
                    Unlock for ${insight.price.toFixed(2)}
                  </button>
                )}
                
                {insight.unlocked && (
                  <button 
                    className="mt-3 flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200 focus-ring rounded p-1 -m-1"
                    aria-label="Share this insight as a frame"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share as Frame</span>
                    <span className="sm:hidden">Share</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
