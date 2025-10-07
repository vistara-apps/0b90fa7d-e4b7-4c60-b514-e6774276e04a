'use client';

import { Settings2, User, Bell, Shield, Palette, Database, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    health: true,
    budget: true,
    tasks: false,
    insights: true,
  });

  const [theme, setTheme] = useState('light');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings2 className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="space-y-4">
        {/* Profile Section */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5" />
            <h3 className="font-semibold">Profile</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Display Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                defaultValue="john@example.com"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5" />
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="capitalize">{key} alerts</span>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    value ? 'bg-accent' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Theme Section */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5" />
            <h3 className="font-semibold">Appearance</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Theme</span>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5" />
            <h3 className="font-semibold">Privacy & Security</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="font-medium">Data Export</div>
              <div className="text-sm text-muted">Download your data</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="font-medium">Delete Account</div>
              <div className="text-sm text-muted">Permanently delete your account</div>
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-5 h-5" />
            <h3 className="font-semibold">Support</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="font-medium">Help Center</div>
              <div className="text-sm text-muted">Get help and support</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="font-medium">Contact Us</div>
              <div className="text-sm text-muted">Send us feedback</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="font-medium">About Orbit</div>
              <div className="text-sm text-muted">Version 1.0.0</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}