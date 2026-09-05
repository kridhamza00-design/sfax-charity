import React, { useState } from 'react';
import { Phone, CreditCard, Check, Copy } from 'lucide-react';

export default function TopBar() {
  const [copied, setCopied] = useState(false);
  const rib = '04 027 0123456789 01';

  const handleCopy = () => {
    navigator.clipboard.writeText(rib);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-primary text-primary-foreground text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2">
        <a 
          href="tel:+21674000000" 
          className="flex items-center gap-2 hover:text-secondary transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span dir="ltr">+216 74 000 000</span>
        </a>

        <button type="button" className="flex items-center gap-2 text-secondary hover:text-white transition-colors" onClick={handleCopy} title="انقر لنسخ الـ RIB" aria-label="نسخ رقم الحساب البنكي">
          <CreditCard className="w-4 h-4" />
          <span className="font-mono tracking-wide" dir="ltr">RIB: {rib}</span>
          {copied ? <Check className="w-3.5 h-3.5 text-secondary" /> : <Copy className="w-3.5 h-3.5 text-secondary/70 hover:text-secondary" />}
          {copied && <span className="text-[11px] font-bold text-secondary">تم النسخ!</span>}
        </button>
      </div>
    </div>
  );
}
