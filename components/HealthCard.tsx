'use client';

import { Activity, Moon, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CardSkeleton } from './SkeletonLoader';
import { AnimatedCounter } from './AnimatedCounter';

interface HealthData {
  score: number;
  sleep: string;
  steps: string;
  hrv: string;
}

export function HealthCard() {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<HealthData | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchHealthData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setData({
          score: 85,
          sleep: '7.2h',
          steps: '8,432',
          hrv: '68ms'
        });
      } catch (err) {
        setError('Failed to load health data');
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  if (loading) {
    return <CardSkeleton />;
  }

  if (error) {
    return (
      <div className="metric-card border-red-500 border-opacity-50">
        <div className="flex items-center gap-2 text-red-400">
          <Activity className="w-5 h-5" />
          <span className="text-sm">Error loading health data</span>
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
    <button 
      className="metric-card text-left w-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      onClick={() => setExpanded(!expanded)}
      aria-expanded={expanded}
      aria-label={`Health score: ${data?.score}. ${expanded ? 'Collapse' : 'Expand'} details`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center">
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="font-semibold">Health</h3>
        </div>
        <div className="flex items-center gap-2">
          <AnimatedCounter 
            value={data?.score || 0} 
            className="text-3xl font-bold text-green-500"
            duration={1500}
          />
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
              <Moon className="w-4 h-4" />
              <span>Sleep</span>
            </div>
            <span className="font-semibold">{data?.sleep}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <TrendingUp className="w-4 h-4" />
              <span>Steps</span>
            </div>
            <span className="font-semibold">{data?.steps}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Activity className="w-4 h-4" />
              <span>HRV</span>
            </div>
            <span className="font-semibold">{data?.hrv}</span>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted">Click to expand details</p>
      )}
    </button>
  );
}
