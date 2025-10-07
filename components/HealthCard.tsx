'use client';

import { Activity, Moon, TrendingUp, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { useState } from 'react';
import { CardSkeleton } from './SkeletonLoader';
import { AnimatedCounter } from './AnimatedCounter';
import { DailySnapshot } from '@/lib/types';

interface HealthCardProps {
  data?: DailySnapshot | null;
  isLoading?: boolean;
}

export function HealthCard({ data, isLoading = false }: HealthCardProps) {
  const [expanded, setExpanded] = useState(false);

  if (isLoading) {
    return <CardSkeleton />;
  }

  const healthScore = data?.healthScore || 0;
  const sleepHours = data?.sleepHours || 0;
  const steps = data?.steps || 0;
  const hrv = data?.hrv || 0;

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getHealthBgColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500 bg-opacity-20 ring-emerald-500';
    if (score >= 60) return 'bg-amber-500 bg-opacity-20 ring-amber-500';
    return 'bg-red-500 bg-opacity-20 ring-red-500';
  };

  const getSleepIndicator = (hours: number) => {
    if (hours >= 7) return 'bg-emerald-400';
    if (hours >= 6) return 'bg-amber-400';
    return 'bg-red-400';
  };

  const getStepsIndicator = (stepCount: number) => {
    if (stepCount >= 8000) return 'bg-emerald-400';
    if (stepCount >= 5000) return 'bg-amber-400';
    return 'bg-red-400';
  };

  const getHrvIndicator = (hrvValue: number) => {
    if (hrvValue >= 60) return 'bg-emerald-400';
    if (hrvValue >= 40) return 'bg-amber-400';
    return 'bg-red-400';
  };

  return (
    <button 
      className="metric-card text-left w-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      onClick={() => setExpanded(!expanded)}
      aria-expanded={expanded}
      aria-label={`Health score: ${healthScore}. ${expanded ? 'Collapse' : 'Expand'} details`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-full ${getHealthBgColor(healthScore)} ring-1 ring-opacity-30 flex items-center justify-center`}>
            <Activity className={`w-5 h-5 ${getHealthColor(healthScore)}`} />
          </div>
          <h3 className="font-semibold text-white">Health</h3>
        </div>
        <div className="flex items-center gap-2">
          <AnimatedCounter 
            value={healthScore} 
            className={`text-3xl font-bold ${getHealthColor(healthScore)}`}
            duration={1500}
          />
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
              <Moon className="w-4 h-4 text-blue-400" />
              <span>Sleep</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{sleepHours.toFixed(1)}h</span>
              <div className={`w-2 h-2 rounded-full ${getSleepIndicator(sleepHours)}`} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span>Steps</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{steps.toLocaleString()}</span>
              <div className={`w-2 h-2 rounded-full ${getStepsIndicator(steps)}`} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Heart className="w-4 h-4 text-purple-400" />
              <span>HRV</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{hrv}ms</span>
              <div className={`w-2 h-2 rounded-full ${getHrvIndicator(hrv)}`} />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-400">Click to expand details</p>
      )}
    </button>
  );
}