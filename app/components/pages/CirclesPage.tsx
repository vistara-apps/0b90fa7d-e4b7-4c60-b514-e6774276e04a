'use client';

import { Users, Plus, Search, Crown } from 'lucide-react';

export function CirclesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Circles</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Circle
        </button>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Search circles..."
            className="flex-1 bg-transparent border-none outline-none text-fg placeholder:text-muted"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Productivity Squad</h3>
                <Crown className="w-4 h-4 text-warning" />
              </div>
              <p className="text-sm text-muted">12 members • 7-day streak</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-success">+15%</div>
              <div className="text-xs text-muted">this week</div>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Health Champions</h3>
              <p className="text-sm text-muted">8 members • 3-day streak</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-success">+8%</div>
              <div className="text-xs text-muted">this week</div>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Finance Focus</h3>
              <p className="text-sm text-muted">15 members • 1-day streak</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-success">+22%</div>
              <div className="text-xs text-muted">this week</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}