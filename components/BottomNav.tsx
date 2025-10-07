'use client';

import { Home, Users, Calendar, Settings2 } from 'lucide-react';
import { useNavigation } from '@/app/contexts/NavigationContext';

const navItems = [
  { icon: Home, label: 'Dashboard', tab: 'dashboard' as const },
  { icon: Users, label: 'Circles', tab: 'circles' as const },
  { icon: Calendar, label: 'Schedule', tab: 'schedule' as const },
  { icon: Settings2, label: 'Settings', tab: 'settings' as const },
];

export function BottomNav() {
  const { activeTab, setActiveTab } = useNavigation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-slate-200 px-4 py-3 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          
          return (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.tab)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-accent bg-amber-100' 
                  : 'text-muted hover:text-fg hover:bg-slate-100'
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
