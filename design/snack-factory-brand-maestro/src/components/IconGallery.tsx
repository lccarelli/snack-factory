import React from "react";

interface IconCardProps {
  name: string;
  description: string;
  children: React.ReactNode;
}

function IconCard({ name, description, children }: IconCardProps) {
  return (
    <div className="flex flex-col items-center justify-between p-6 bg-white dark:bg-stone-900 border border-slate-200 dark:border-zinc-800 rounded-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="w-16 h-16 mb-4 flex items-center justify-center text-violet-600 dark:text-emerald-400">
        {children}
      </div>
      <div className="text-center w-full">
        <h4 className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
          {name}
        </h4>
        <p className="text-[11px] text-slate-500 dark:text-neutral-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function IconGallery() {
  return (
    <div className="space-y-6" id="iconography-gallery">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Cookie / Byte */}
        <IconCard name="THE COOKIE-BYTE" description="Main brand mark representing software segments.">
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current">
            {/* Outline & fill of bitten square biscuit */}
            <path d="M 5,2 H 16 L 16,5 H 19 L 19,8 H 22 V 19 C 22,20.6 20.6,22 19,22 H 5 C 3.4,22 2,20.6 2,19 V 5 C 2,3.4 3.4,2 5,2 Z" fillRule="evenodd" />
            <rect x="6" y="6" width="2" height="2" className="fill-white dark:fill-stone-950" />
            <rect x="12" y="12" width="2" height="2" className="fill-white dark:fill-stone-950" />
            <rect x="6" y="14" width="2" height="2" className="fill-white dark:fill-stone-950" />
          </svg>
        </IconCard>

        {/* Potato Chip / Byte Slice */}
        <IconCard name="THE CHIP-SLURP" description="Thin, crispy, ultra-optimized database chunk.">
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current">
            {/* Pixel wave snack */}
            <path d="M 3,6 H 5 V 8 H 7 V 10 H 17 V 8 H 19 V 6 H 21 V 10 H 19 V 12 H 17 V 14 H 7 V 12 H 5 V 10 H 3 Z" />
            <path d="M 7,16 H 17 V 18 H 7 Z" opacity="0.5" />
          </svg>
        </IconCard>

        {/* Pixel Bite Mark */}
        <IconCard name="THE BYTE-MARK" description="Staircase teeth marks representing automation.">
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current">
            <rect x="4" y="4" width="4" height="4" />
            <rect x="8" y="8" width="4" height="4" />
            <rect x="12" y="12" width="4" height="4" />
            <rect x="16" y="8" width="4" height="4" />
            <rect x="20" y="4" width="4" height="4" />
          </svg>
        </IconCard>

        {/* Vending Machine */}
        <IconCard name="THE DISPENSER" description="Production-grade pipeline/vending machine.">
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-none stroke-current" strokeWidth="2" strokeLinecap="square">
            <rect x="4" y="2" width="16" height="20" rx="1" />
            <line x1="4" y1="14" x2="20" y2="14" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <rect x="8" y="9" width="3" height="3" />
            <rect x="13" y="9" width="3" height="3" />
            <rect x="7" y="17" width="10" height="3" fill="currentColor" />
          </svg>
        </IconCard>

        {/* Terminal Prompt */}
        <IconCard name="THE PROMPT" description="Interactive developer console prompt with bite.">
          <svg viewBox="0 0 24 24" className="w-12 h-12 fill-none stroke-current" strokeWidth="2" strokeLinecap="square">
            <polyline points="4 6 10 12 4 18" />
            <line x1="12" y1="18" x2="20" y2="18" strokeWidth="3" />
          </svg>
        </IconCard>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-stone-900/50 border border-slate-200/60 dark:border-zinc-800/60 rounded-xl">
        <h5 className="font-mono text-[10px] uppercase tracking-wider text-slate-400 dark:text-neutral-500 mb-2">
          ICON SYSTEM DESIGN PRINCIPLES
        </h5>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[11px] text-slate-500 dark:text-neutral-400">
          <li>
            <strong className="text-slate-700 dark:text-neutral-300">1. Grid alignment</strong> — Every icon is drawn on a strict 24x24 px workspace aligning strictly with integer values to avoid sub-pixel blurring.
          </li>
          <li>
            <strong className="text-slate-700 dark:text-neutral-300">2. Pixel-Perfect Edges</strong> — Rounded elements are represented through discrete stair-stepped paths rather than standard vectors.
          </li>
          <li>
            <strong className="text-slate-700 dark:text-neutral-300">3. Functional Contrast</strong> — Filled silhouettes handle heavy identification tasks; fine terminal outlines handle metadata support.
          </li>
        </ul>
      </div>
    </div>
  );
}
