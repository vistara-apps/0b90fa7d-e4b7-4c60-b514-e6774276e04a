'use client';

import { Wallet, ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { Sparkles } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-glow">
          <Sparkles className="w-6 h-6 text-slate-900" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
            Orbit
          </h1>
          <p className="text-sm text-muted">Your AI Life Dashboard</p>
        </div>
      </div>

      <Wallet>
        <ConnectWallet>
          <div className="flex items-center gap-2 glass-card px-4 py-2">
            <Avatar className="w-8 h-8" />
            <Name className="text-sm font-medium" />
          </div>
        </ConnectWallet>
      </Wallet>
    </header>
  );
}
