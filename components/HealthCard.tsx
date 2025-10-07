'use client';

import { Activity, Moon, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export function HealthCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className="metric-card"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-green-500 bg-opacity-20 flex items-center justify-center">
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="font-semibold">Health</h3>
        </div>
        <div className="text-3xl font-bold text-green-500">85</div>
      </div>

      {expanded ? (
        <div className="space-y-3 mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Moon className="w-4 h-4" />
              <span>Sleep</span>
            </div>
            <span className="font-semibold">7.2h</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <TrendingUp className="w-4 h-4" />
              <span>Steps</span>
            </div>
            <span className="font-semibold">8,432</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Activity className="w-4 h-4" />
              <span>HRV</span>
            </div>
            <span className="font-semibold">68ms</span>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted">Tap to expand</p>
      )}
    </div>
  );
}
