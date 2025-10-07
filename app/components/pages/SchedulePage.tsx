'use client';

import { Calendar, Clock, Plus, CheckCircle2, AlertCircle } from 'lucide-react';

export function SchedulePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Schedule</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Today's Schedule
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="flex-1">
                <div className="font-medium text-sm">Morning Workout</div>
                <div className="text-xs text-muted">7:00 AM - 8:00 AM</div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <div className="font-medium text-sm">Team Standup</div>
                <div className="text-xs text-muted">9:00 AM - 9:30 AM</div>
              </div>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <div className="flex-1">
                <div className="font-medium text-sm">Focus Time</div>
                <div className="text-xs text-muted">10:00 AM - 12:00 PM</div>
              </div>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Upcoming
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-slate-400"></div>
              <div className="flex-1">
                <div className="font-medium text-sm">Lunch with Sarah</div>
                <div className="text-xs text-muted">Tomorrow, 12:00 PM</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-slate-400"></div>
              <div className="flex-1">
                <div className="font-medium text-sm">Project Review</div>
                <div className="text-xs text-muted">Friday, 2:00 PM</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="w-2 h-2 rounded-full bg-slate-400"></div>
              <div className="flex-1">
                <div className="font-medium text-sm">Weekend Planning</div>
                <div className="text-xs text-muted">Sunday, 10:00 AM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">This Week's Focus</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200">
            <div className="text-2xl font-bold text-green-600">85%</div>
            <div className="text-sm text-muted">Health Goals</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">72%</div>
            <div className="text-sm text-muted">Work Tasks</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-amber-50 border border-amber-200">
            <div className="text-2xl font-bold text-amber-600">68%</div>
            <div className="text-sm text-muted">Personal Projects</div>
          </div>
        </div>
      </div>
    </div>
  );
}