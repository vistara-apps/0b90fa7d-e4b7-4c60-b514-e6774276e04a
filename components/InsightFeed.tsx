'use client';

import { Lightbulb, Lock, Share2 } from 'lucide-react';
import { useState } from 'react';
import { InsightSkeleton } from './SkeletonLoader';
import { Insight } from '@/lib/types';

interface InsightFeedProps {
  insights?: Insight[];
  streakCount?: number;
  isLoading?: boolean;
}

export function InsightFeed({ insights = [], streakCount = 0, isLoading = false }: InsightFeedProps) {
  const [localInsights, setLocalInsights] = useState(insights);

  const unlockInsight = (id: string) => {
    setLocalInsights(prev => 
      prev.map(insight => 
        insight.id === id ? { ...insight, unlocked: true } : insight
      )
    );
    // This would typically make an API call to unlock the insight
    console.log('Unlock insight:', id);
  };

  if (isLoading) {
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

  return (
    <div className="space-y-4 animate-in">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-white">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          AI Insights
        </h2>
        <span className="streak-badge">
          🔥 {streakCount} Day Streak
        </span>
      </div>

      <div className="space-y-3">
        {localInsights.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 text-amber-400 opacity-50" />
            <h3 className="text-lg font-semibold text-white mb-2">No insights yet</h3>
            <p className="text-gray-400">Keep using the app to unlock AI-powered insights about your patterns.</p>
          </div>
        ) : (
          localInsights.map(insight => (
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
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-indigo-500 bg-opacity-20 text-indigo-400 font-medium">
                      {insight.type.replace('-', ' → ')}
                    </span>
                    <span className="text-xs text-gray-400">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                  
                  <p className={`text-sm sm:text-base leading-relaxed ${
                    insight.unlocked ? 'text-white' : 'text-gray-300 blur-sm select-none'
                  }`}>
                    {insight.pattern}
                  </p>
                  
                  {!insight.unlocked && (
                    <button 
                      onClick={() => unlockInsight(insight.id)}
                      className="mt-3 btn-primary text-sm focus-ring"
                      aria-label={`Unlock insight for $${(insight.unlockPrice / 100).toFixed(2)}`}
                    >
                      Unlock for ${(insight.unlockPrice / 100).toFixed(2)}
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
          ))
        )}
      </div>
    </div>
  );
}