'use client';

import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface FABAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  color?: string;
}

interface FloatingActionButtonProps {
  actions: FABAction[];
  className?: string;
}

export function FloatingActionButton({ actions, className = '' }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={`fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 ${className}`}>
      {/* Action buttons */}
      <div className={`flex flex-col gap-3 mb-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => {
                action.onClick();
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 ${action.color || 'bg-slate-700'} hover:bg-opacity-80 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 group`}
              style={{ animationDelay: `${index * 50}ms` }}
              aria-label={action.label}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium whitespace-nowrap pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main FAB button */}
      <button
        onClick={toggleMenu}
        className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-full shadow-lg hover:shadow-glow flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95"
        aria-label={isOpen ? 'Close menu' : 'Open quick actions'}
        aria-expanded={isOpen}
      >
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </div>
      </button>
    </div>
  );
}