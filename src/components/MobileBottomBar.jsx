import React from 'react';
import { CreditCard, Heart } from 'lucide-react';

export default function MobileBottomBar({ onOpenDonateModal }) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden shadow-[0_-8px_24px_-8px_rgba(92,97,43,0.4)]">
      <div className="bg-primary border-t border-secondary/30 text-primary-foreground px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-secondary">
          <CreditCard className="w-4 h-4 shrink-0" />
          <span className="font-mono text-white text-[11px] sm:text-xs" dir="ltr">04 027 0123456789 01</span>
        </div>
        
        <button 
          onClick={onOpenDonateModal}
          className="inline-flex items-center gap-2 bg-accent text-white font-heading font-bold px-5 py-2.5 rounded-full text-sm glow-amber shadow-lg shrink-0"
        >
          <Heart className="w-4 h-4 fill-current" />
          <span>تبرّع الآن</span>
        </button>
      </div>
    </div>
  );
}
