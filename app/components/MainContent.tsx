'use client';

import { useNavigation } from '@/app/contexts/NavigationContext';
import { CirclesPage } from '@/app/components/pages/CirclesPage';
import { SchedulePage } from '@/app/components/pages/SchedulePage';
import { SettingsPage } from '@/app/components/pages/SettingsPage';
import { DashboardPage } from '@/app/components/pages/DashboardPage';

export function MainContent() {
  const { activeTab } = useNavigation();

  switch (activeTab) {
    case 'circles':
      return <CirclesPage />;
    case 'schedule':
      return <SchedulePage />;
    case 'settings':
      return <SettingsPage />;
    case 'dashboard':
    default:
      return <DashboardPage />;
  }
}