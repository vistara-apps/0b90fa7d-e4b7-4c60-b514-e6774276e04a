'use client';

import { Home, Users, Calendar, Settings2 } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: Users, label: 'Circles', active: false },
  { icon: Calendar, label: 'Schedule', active: false },
  { icon: Settings2, label: 'Settings', active: false },
];

export function BottomNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 glass-card border-t border-slate-700 px-2 sm:px-4 py-2 sm:py-3 z-50 backdrop-blur-xl"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-around">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeIndex;
          
          return (
            <button
              key={item.label}
              onClick={() => setActiveIndex(index)}
              className={`flex flex-col items-center gap-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 min-h-[60px] sm:min-h-[64px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 ${
                isActive 
                  ? 'text-accent bg-accent bg-opacity-10 scale-105' 
                  : 'text-muted hover:text-fg hover:bg-slate-700 hover:bg-opacity-30 active:scale-95'
              }`}
              aria-label={`Navigate to ${item.label}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-xs font-medium transition-all duration-200 ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-accent rounded-full mt-1 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
