'use client';

import { Wallet2, TrendingDown, DollarSign } from 'lucide-react';
import { useState } from 'react';

export function MoneyCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className="metric-card"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-yellow-500 bg-opacity-20 flex items-center justify-center">
            <Wallet2 className="w-5 h-5 text-yellow-500" />
          </div>
          <h3 className="font-semibold">Budget</h3>
        </div>
        <div className="text-sm font-semibold text-green-500 bg-green-500 bg-opacity-20 px-3 py-1 rounded-full">
          On Track
        </div>
      </div>

      {expanded ? (
        <div className="space-y-3 mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <DollarSign className="w-4 h-4" />
              <span>Spent Today</span>
            </div>
            <span className="font-semibold">$42.50</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted">
              <TrendingDown className="w-4 h-4" />
              <span>Daily Budget</span>
            </div>
            <span className="font-semibold">$75.00</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 h-2 rounded-full" style={{ width: '57%' }}></div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted">Tap to expand</p>
      )}
    </div>
  );
}
