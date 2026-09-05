import React from 'react';
import { motion } from 'framer-motion';

export default function StoryProgress({ activeIndex, storyStages }) {
  return (
    <>
      {/* Desktop Vertical Story Progress Indicator */}
      <aside className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 pointer-events-none">
        <div className="bg-primary/90 backdrop-blur-md border border-secondary/30 rounded-2xl py-4 px-3.5 shadow-2xl space-y-3 pointer-events-auto">
          {storyStages.map((stage, idx) => {
            const isActive = idx === activeIndex;
            return (
              <a
                key={stage.id}
                href={`#${stage.id}`}
                className={`flex items-center gap-3 group transition-all text-xs font-heading ${
                  isActive ? 'text-accent font-bold scale-105' : 'text-white/60 hover:text-white'
                }`}
              >
                <span className="tracking-wide dir-ltr text-[11px] font-mono opacity-80">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="hidden group-hover:inline-block transition-all whitespace-nowrap text-shadow-sm">
                  {stage.title}
                </span>
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-accent ring-4 ring-accent/30 scale-125'
                      : 'bg-white/30 group-hover:bg-white/70'
                  }`}
                />
              </a>
            );
          })}
        </div>
      </aside>

      {/* Mobile Top Minimal Progress Bar */}
      <div className="xl:hidden fixed top-0 left-0 right-0 z-40 h-1 bg-white/10 pointer-events-none">
        <motion.div
          className="h-full bg-accent progress-gradient"
          initial={{ width: '0%' }}
          animate={{ width: `${((activeIndex + 1) / storyStages.length) * 100}%` }}
          transition={{ ease: 'easeOut', duration: 0.3 }}
        />
      </div>
    </>
  );
}
