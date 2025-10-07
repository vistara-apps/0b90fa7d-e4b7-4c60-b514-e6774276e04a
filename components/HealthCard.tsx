'use client';

import { Activity, Moon, TrendingUp, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { DailySnapshot } from '@/lib/types';

interface HealthCardProps {
  data?: DailySnapshot | null;
  isLoading?: boolean;
}

export function HealthCard({ data, isLoading = false }: HealthCardProps) {
  const [expanded, setExpanded] = useState(false);

  if (isLoading) {
    return (
        <div className="metric-card animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-200"></div>
              <div className="h-6 w-20 bg-slate-200 rounded"></div>
            </div>
            <div className="h-8 w-12 bg-slate-200 rounded"></div>
          </div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
    );
  }

  const healthScore = data?.healthScore || 0;
  const sleepHours = data?.sleepHours || 0;
  const steps = data?.steps || 0;
  const hrv = data?.hrv || 0;

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getHealthBgColor = (score: number) => {
    if (score >= 80) return 'bg-success bg-opacity-20';
    if (score >= 60) return 'bg-warning bg-opacity-20';
    return 'bg-danger bg-opacity-20';
  };

  return (
    <div
      className="metric-card cursor-pointer hover:bg-opacity-70 transition-all duration-200"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-full ${getHealthBgColor(healthScore)} flex items-center justify-center`}>
            <Activity className={`w-5 h-5 ${getHealthColor(healthScore)}`} />
          </div>
          <h3 className="font-semibold">Health</h3>
        </div>
        <div className={`text-3xl font-bold ${getHealthColor(healthScore)}`}>
          {healthScore}
        </div>
      </div>

      {expanded ? (
        <div className="space-y-3 mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Moon className="w-4 h-4" />
              <span>Sleep</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{sleepHours.toFixed(1)}h</span>
              {sleepHours >= 7 ? (
                <div className="w-2 h-2 rounded-full bg-success"></div>
              ) : sleepHours >= 6 ? (
                <div className="w-2 h-2 rounded-full bg-warning"></div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-danger"></div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <TrendingUp className="w-4 h-4" />
              <span>Steps</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{steps.toLocaleString()}</span>
              {steps >= 8000 ? (
                <div className="w-2 h-2 rounded-full bg-success"></div>
              ) : steps >= 5000 ? (
                <div className="w-2 h-2 rounded-full bg-warning"></div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-danger"></div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Heart className="w-4 h-4" />
              <span>HRV</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{hrv.toFixed(0)}ms</span>
              {hrv >= 50 ? (
                <div className="w-2 h-2 rounded-full bg-success"></div>
              ) : hrv >= 30 ? (
                <div className="w-2 h-2 rounded-full bg-warning"></div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-danger"></div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted">Tap to expand</p>
      )}
    </div>
  );
}

