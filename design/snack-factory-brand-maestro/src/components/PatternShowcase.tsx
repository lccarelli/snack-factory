import React, { useState } from "react";

export default function PatternShowcase() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const patterns = [
    {
      name: "Twin Peaks Zigzag Motif",
      description: "Stepped pixel zigzag expressing structure, movement, and a slight twin-peaks mystery.",
      css: "background: repeating-linear-gradient(45deg, var(--accent) 0, var(--accent) 10px, transparent 10px, transparent 20px);",
      tailwind: "bg-[repeating-linear-gradient(45deg,currentColor_0,currentColor_10px,transparent_10px,transparent_20px)]",
      render: (isDark: boolean) => (
        <div className="w-full h-32 rounded-lg relative overflow-hidden bg-slate-100 dark:bg-stone-950 border border-slate-200 dark:border-zinc-800 flex items-center justify-center">
          <div 
            className="absolute inset-0 opacity-15 dark:opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 20 L10 10 L20 20 L30 10 L40 20 L40 30 L30 20 L20 30 L10 20 L0 30 Z' fill='${isDark ? '%2334d399' : '%237c3aed'}' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: "20px 20px"
            }}
          />
          <span className="font-mono text-xs z-10 px-3 py-1 bg-white/90 dark:bg-stone-900/90 shadow-sm rounded border border-slate-200/50 dark:border-zinc-800/50 text-slate-800 dark:text-neutral-200">
            ZIGZAG_STRIP
          </span>
        </div>
      )
    },
    {
      name: "Square 'Chip' Scatter",
      description: "Randomized distribution of 4x4 square pixel blocks representing granular snack fragments or floating bytes.",
      css: "background-image: radial-gradient(circle, var(--accent) 2px, transparent 2px); background-size: 16px 16px;",
      tailwind: "bg-[radial-gradient(circle,currentColor_2px,transparent_2px)] bg-[size:16px_16px]",
      render: (isDark: boolean) => (
        <div className="w-full h-32 rounded-lg relative overflow-hidden bg-slate-100 dark:bg-stone-950 border border-slate-200 dark:border-zinc-800 flex items-center justify-center">
          <div 
            className="absolute inset-0 opacity-20 dark:opacity-25"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Crect x='4' y='4' width='4' height='4' fill='${isDark ? '%2334d399' : '%237c3aed'}' /%3E%3Crect x='14' y='14' width='4' height='4' fill='${isDark ? '%2334d399' : '%237c3aed'}' opacity='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: "24px 24px"
            }}
          />
          <span className="font-mono text-xs z-10 px-3 py-1 bg-white/90 dark:bg-stone-900/90 shadow-sm rounded border border-slate-200/50 dark:border-zinc-800/50 text-slate-800 dark:text-neutral-200">
            CHIP_SCATTER
          </span>
        </div>
      )
    },
    {
      name: "Terminal Scanline Grid",
      description: "Horizontal CRT monitor beam lines providing a technical, retro software-terminal depth.",
      css: "background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%); background-size: 100% 4px;",
      tailwind: "bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px]",
      render: (isDark: boolean) => (
        <div className="w-full h-32 rounded-lg relative overflow-hidden bg-slate-100 dark:bg-stone-950 border border-slate-200 dark:border-zinc-800 flex items-center justify-center">
          {/* Scanline pattern */}
          <div className="absolute inset-0 scanlines opacity-50 dark:opacity-80" />
          <div className="absolute inset-0 pixel-grid opacity-30" />
          <span className="font-mono text-xs z-10 px-3 py-1 bg-white/90 dark:bg-stone-900/90 shadow-sm rounded border border-slate-200/50 dark:border-zinc-800/50 text-slate-800 dark:text-neutral-200">
            SCANLINE_CRT
          </span>
        </div>
      )
    }
  ];

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="patterns-showcase-grid">
      {patterns.map((pattern, index) => (
        <div 
          key={index} 
          className="p-5 bg-white dark:bg-stone-900 border border-slate-200 dark:border-zinc-800 rounded-xl flex flex-col justify-between"
        >
          <div className="space-y-3">
            {/* Dark & Light dynamic detection would be nice, but we can pass it based on standard page body class */}
            {pattern.render(document.documentElement.classList.contains("dark") || false)}
            <div>
              <h4 className="font-sans font-semibold text-sm text-slate-800 dark:text-slate-100">
                {pattern.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-neutral-400 mt-1 leading-relaxed">
                {pattern.description}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                Tailwind CSS Class
              </span>
              <button
                onClick={() => handleCopy(pattern.tailwind, index)}
                className="font-mono text-[10px] text-violet-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                {copiedIndex === index ? "COPIED!" : "COPY CLASS"}
              </button>
            </div>
            <code className="block font-mono text-[10px] p-2 bg-slate-50 dark:bg-stone-950/50 text-slate-600 dark:text-neutral-300 rounded overflow-x-auto whitespace-nowrap">
              {pattern.tailwind}
            </code>
          </div>
        </div>
      ))}
    </div>
  );
}
