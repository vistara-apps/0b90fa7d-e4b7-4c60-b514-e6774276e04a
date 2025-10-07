'use client';

import React, { useState } from 'react';
import { Lightbulb, Lock, Share2, Sparkles } from 'lucide-react';
import { Insight as InsightType } from '@/lib/types';

interface InsightFeedProps {
  insights?: InsightType[];
  streakCount?: number;
  isLoading?: boolean;
}

export function InsightFeed({ insights = [], streakCount = 0, isLoading = false }: InsightFeedProps) {
  const [localInsights, setLocalInsights] = useState<InsightType[]>(insights);

  React.useEffect(() => {
    setLocalInsights(insights);
  }, [insights]);

  const unlockInsight = async (insightId: string) => {
    // TODO: Implement MiniKit payment flow
    try {
      // For now, just mark as unlocked
      setLocalInsights(prevInsights =>
        prevInsights.map(insight =>
          insight.id === insightId
            ? { ...insight, unlocked: true }
            : insight
        )
      );

      // TODO: Call API to unlock insight
      // const response = await fetch(`/api/insights/${insightId}/unlock`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ paymentTx: '...' })
      // });
    } catch (error) {
      console.error('Failed to unlock insight:', error);
    }
  };

  const shareInsight = async (insight: InsightType) => {
    // TODO: Implement Farcaster Frame sharing
    try {
      // const response = await fetch('/api/frames/share', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ insightId: insight.id })
      // });
      console.log('Sharing insight:', insight.id);
    } catch (error) {
      console.error('Failed to share insight:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-32 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-8 w-24 bg-slate-700 rounded animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="glass-card p-4 animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                  <div className="h-8 bg-slate-700 rounded w-24"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getInsightTypeColor = (type: string) => {
    switch (type) {
      case 'health-money': return 'text-green-400';
      case 'health-productivity': return 'text-blue-400';
      case 'money-productivity': return 'text-purple-400';
      default: return 'text-yellow-400';
    }
  };

  const getInsightTypeIcon = (type: string) => {
    switch (type) {
      case 'health-money': return '💚💰';
      case 'health-productivity': return '💚📈';
      case 'money-productivity': return '💰📈';
      default: return '🔍';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          AI Insights
        </h2>
        {streakCount > 0 && (
          <span className="streak-badge text-sm">
            🔥 {streakCount} Day Streak
          </span>
        )}
      </div>

      {localInsights.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <Sparkles className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No insights yet</h3>
          <p className="text-sm text-muted">
            Keep using Orbit and we'll generate personalized insights from your data.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {localInsights.map(insight => (
            <div key={insight.id} className="glass-card p-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full bg-opacity-20 flex items-center justify-center flex-shrink-0 ${
                  insight.unlocked ? 'bg-yellow-500' : 'bg-slate-600'
                }`}>
                  {insight.unlocked ? (
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Lock className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-muted">
                      {getInsightTypeIcon(insight.type)}
                    </span>
                    <span className={`text-xs font-medium ${getInsightTypeColor(insight.type)}`}>
                      {insight.type.replace('-', ' & ').toUpperCase()}
                    </span>
                    <span className="text-xs text-muted">
                      {Math.round(insight.confidence * 100)}% confidence
                    </span>
                  </div>

                  <p className={`text-sm leading-relaxed ${insight.unlocked ? '' : 'blur-sm select-none'}`}>
                    {insight.unlocked ? insight.pattern : `${insight.pattern.substring(0, 50)}...`}
                  </p>

                  {!insight.unlocked && (
                    <button
                      onClick={() => unlockInsight(insight.id)}
                      className="mt-3 btn-primary text-sm py-2 px-4"
                    >
                      Unlock for ${(insight.unlockPrice / 100).toFixed(2)}
                    </button>
                  )}

                  {insight.unlocked && (
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => shareInsight(insight)}
                        className="flex items-center gap-2 text-sm text-accent hover:text-yellow-400 transition-colors duration-200"
                      >
                        <Share2 className="w-4 h-4" />
                        Share as Frame
                      </button>
                      <span className="text-xs text-muted">
                        Unlocked {new Date(insight.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

