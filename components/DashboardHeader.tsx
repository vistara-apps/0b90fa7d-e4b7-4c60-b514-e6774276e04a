'use client';

import { Wallet, ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { Sparkles } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between animate-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center shadow-glow">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
            Orbit
          </h1>
          <p className="text-xs sm:text-sm text-muted">Your AI Life Dashboard</p>
        </div>
      </div>

      <Wallet>
        <ConnectWallet>
          <div className="flex items-center gap-2 glass-card px-3 py-2 sm:px-4 hover:bg-opacity-70 transition-all duration-200">
            <Avatar className="w-6 h-6 sm:w-8 sm:h-8" />
            <Name className="text-xs sm:text-sm font-medium hidden sm:block" />
          </div>
        </ConnectWallet>
      </Wallet>
    </header>
  );
}
