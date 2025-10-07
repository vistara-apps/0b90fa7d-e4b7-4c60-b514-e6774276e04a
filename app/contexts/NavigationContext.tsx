'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type TabType = 'dashboard' | 'circles' | 'schedule' | 'settings';

interface NavigationContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  return (
    <NavigationContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}