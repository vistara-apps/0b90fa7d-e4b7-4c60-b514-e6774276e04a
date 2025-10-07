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
    <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-slate-700 px-4 py-3 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-around">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeIndex;
          
          return (
            <button
              key={item.label}
              onClick={() => setActiveIndex(index)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-accent bg-accent bg-opacity-10' 
                  : 'text-muted hover:text-fg'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
