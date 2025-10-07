'use client';

import { Lightbulb, Lock, Share2 } from 'lucide-react';
import { useState } from 'react';

const mockInsights = [
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
  const [insights, setInsights] = useState(mockInsights);

  const unlockInsight = (id: number) => {
    setInsights(insights.map(insight => 
      insight.id === id ? { ...insight, unlocked: true } : insight
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          AI Insights
        </h2>
        <span className="streak-badge text-sm">
          🔥 12 Day Streak
        </span>
      </div>

      <div className="space-y-3">
        {insights.map(insight => (
          <div key={insight.id} className="glass-card p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500 bg-opacity-20 flex items-center justify-center flex-shrink-0">
                {insight.unlocked ? (
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Lock className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              
              <div className="flex-1">
                <p className={`text-sm ${insight.unlocked ? '' : 'blur-sm select-none'}`}>
                  {insight.unlocked ? insight.full : insight.preview}
                </p>
                
                {!insight.unlocked && (
                  <button 
                    onClick={() => unlockInsight(insight.id)}
                    className="mt-3 btn-primary text-sm py-2"
                  >
                    Unlock for ${insight.price}
                  </button>
                )}
                
                {insight.unlocked && (
                  <button className="mt-3 flex items-center gap-2 text-sm text-accent hover:text-yellow-400 transition-colors duration-200">
                    <Share2 className="w-4 h-4" />
                    Share as Frame
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
