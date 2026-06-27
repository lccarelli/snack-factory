import React from "react";
import { motion } from "motion/react";

interface CardProps {
  children: React.ReactNode;
  variant?: "terminal" | "cookie" | "menu" | "profile" | "default";
  title?: string;
  subtitle?: string;
  extraLabel?: string;
  sprinkleColor?: "strawberry" | "mint" | "blueberry" | "neutral";
  className?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  variant = "default",
  title,
  subtitle,
  extraLabel,
  sprinkleColor = "neutral",
  className = "",
  onClick,
}: CardProps) {
  // Translate sprinkle color to HEX values
  const getSprinkleHex = () => {
    switch (sprinkleColor) {
      case "strawberry":
        return "#f43f5e";
      case "mint":
        return "#10b981";
      case "blueberry":
        return "#06b6d4";
      default:
        return "transparent";
    }
  };

  const sprinkleHex = getSprinkleHex();

  // Basic transition & hover spring config
  const hoverAnimation = onClick
    ? {
        y: -4,
        scale: 1.01,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }
    : {};

  if (variant === "terminal") {
    return (
      <motion.div
        whileHover={hoverAnimation}
        onClick={onClick}
        className={`bg-[#faf6f0] dark:bg-[#1b120f] border-2 border-[#8b5a2b] dark:border-[#e28743] rounded-lg shadow-[4px_4px_0px_0px_rgba(139,90,43,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(226,135,67,0.15)] overflow-hidden flex flex-col ${
          onClick ? "cursor-pointer" : ""
        } ${className}`}
      >
        {/* Terminal Header */}
        <div className="bg-[#f3ede2] dark:bg-[#291c18] border-b-2 border-[#8b5a2b] dark:border-[#e28743] px-3 py-2 flex items-center justify-between font-mono text-[10px]">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#f43f5e]" title="Close" />
            <span className="w-2.5 h-2.5 rounded-sm bg-[#10b981]" title="Minimize" />
            <span className="w-2.5 h-2.5 rounded-sm bg-[#06b6d4]" title="Maximize" />
          </div>
          {extraLabel && (
            <span className="text-[#8b5a2b] dark:text-[#e28743] uppercase tracking-wider font-bold">
              {extraLabel}
            </span>
          )}
          <span className="text-neutral-400 dark:text-neutral-500 font-mono text-[9px] uppercase">
            tty_01
          </span>
        </div>
        
        {/* Terminal Content */}
        <div className="p-5 flex-grow flex flex-col relative">
          {sprinkleColor !== "neutral" && (
            <div 
              className="absolute top-0 right-0 w-1.5 h-12 rounded-bl"
              style={{ backgroundColor: sprinkleHex }}
            />
          )}
          {title && (
            <div className="mb-3">
              {subtitle && (
                <span className="font-mono text-[10px] text-violet-600 dark:text-emerald-400 tracking-wider uppercase block mb-0.5">
                  ❯ {subtitle}
                </span>
              )}
              <h3 className="text-lg font-serif font-bold text-neutral-900 dark:text-stone-100 italic">
                {title}
              </h3>
            </div>
          )}
          <div className="flex-grow text-sm leading-relaxed text-slate-700 dark:text-stone-300 font-sans">
            {children}
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "cookie") {
    // Pixel bite-notch using clip-path polygon (stepped stair corner cut)
    // Cuts top-right: 16px from right, 16px from top
    const biteClipPath = {
      clipPath: "polygon(0 0, calc(100% - 16px) 0, calc(100% - 16px) 8px, calc(100% - 8px) 8px, calc(100% - 8px) 16px, 100% 16px, 100% 100%, 0 100%)"
    };

    return (
      <motion.div
        whileHover={hoverAnimation}
        onClick={onClick}
        style={biteClipPath}
        className={`bg-[#fdfbf7] dark:bg-[#170f0d] border border-neutral-200 dark:border-zinc-800 p-6 rounded-xl relative group transition-colors duration-300 shadow-sm hover:border-[#8b5a2b]/40 dark:hover:border-[#e28743]/40 ${
          onClick ? "cursor-pointer" : ""
        } ${className}`}
      >
        {/* Bite mark overlay line for aesthetics */}
        <div className="absolute top-0 right-0 w-4 h-4 pointer-events-none">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-0">
            {/* Outline of the stepped stair corner cut */}
            <path d="M 0 0 L 0 8 L 8 8 L 8 16 L 16 16" stroke="currentColor" className="text-neutral-200 dark:text-zinc-800 group-hover:text-[#8b5a2b]/40 dark:group-hover:text-[#e28743]/40 stroke-2" fill="none" />
          </svg>
        </div>

        {/* Sprinkle tag in top-left */}
        {sprinkleColor !== "neutral" && (
          <span 
            className="absolute top-3 left-3 w-2 h-2 rounded-sm"
            style={{ backgroundColor: sprinkleHex }}
          />
        )}

        {title && (
          <div className="mb-3">
            {subtitle && (
              <span className="font-mono text-[9px] text-[#8b5a2b] dark:text-[#e28743] uppercase tracking-widest block mb-1">
                ❯ {subtitle}
              </span>
            )}
            <h3 className="text-xl font-serif font-medium text-neutral-900 dark:text-stone-100">
              {title}
            </h3>
          </div>
        )}

        <div className="text-sm leading-relaxed text-slate-600 dark:text-neutral-300 font-sans">
          {children}
        </div>
      </motion.div>
    );
  }

  if (variant === "menu") {
    return (
      <motion.div
        whileHover={hoverAnimation}
        onClick={onClick}
        className={`bg-transparent p-5 border-b border-dashed border-neutral-200 dark:border-zinc-800 flex flex-col md:flex-row md:items-start justify-between gap-4 group ${
          onClick ? "cursor-pointer hover:bg-[#faf6f0]/40 dark:hover:bg-[#1b120f]/30 rounded-lg" : ""
        } ${className}`}
      >
        <div className="flex-grow max-w-2xl">
          <div className="flex items-baseline mb-2">
            {title && (
              <h4 className="text-xl font-serif font-bold text-neutral-900 dark:text-stone-100 group-hover:text-[#8b5a2b] dark:group-hover:text-[#e28743] transition-colors duration-200">
                {title}
              </h4>
            )}
            {/* Leader dot line */}
            <div className="flex-grow mx-3 border-b-2 border-dotted border-neutral-300 dark:border-zinc-800" />
            {extraLabel && (
              <span className="font-mono text-sm font-bold text-[#8b5a2b] dark:text-[#e28743] shrink-0">
                {extraLabel}
              </span>
            )}
          </div>
          {subtitle && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-2">
              {subtitle}
            </span>
          )}
          <div className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed font-sans">
            {children}
          </div>
        </div>
        {sprinkleColor !== "neutral" && (
          <div className="shrink-0 flex items-center pt-1 md:pt-0">
            <span 
              className="w-2.5 h-6 rounded-sm block"
              style={{ backgroundColor: sprinkleHex }}
              title={`Spiced with ${sprinkleColor}`}
            />
          </div>
        )}
      </motion.div>
    );
  }

  if (variant === "profile") {
    return (
      <motion.div
        whileHover={hoverAnimation}
        onClick={onClick}
        className={`bg-[#faf6f0]/60 dark:bg-[#1b120f]/40 border border-[#f3ede2] dark:border-[#291c18] rounded-2xl p-6 relative flex flex-col ${
          onClick ? "cursor-pointer" : ""
        } ${className}`}
      >
        {/* Pixel strip background line */}
        <div 
          className="absolute top-0 left-6 right-6 h-1 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${sprinkleHex === "transparent" ? "#8b5a2b" : sprinkleHex} 0px, ${sprinkleHex === "transparent" ? "#8b5a2b" : sprinkleHex} 4px, transparent 4px, transparent 8px)`,
            backgroundSize: "8px 8px"
          }}
        />

        {title && (
          <div className="mb-4 mt-2">
            <h3 className="text-2xl font-serif font-bold text-neutral-900 dark:text-stone-100">
              {title}
            </h3>
            {subtitle && (
              <span className="font-mono text-[10px] text-violet-600 dark:text-emerald-400 uppercase tracking-widest font-semibold block mt-0.5">
                {subtitle}
              </span>
            )}
          </div>
        )}

        <div className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed flex-grow font-sans">
          {children}
        </div>
      </motion.div>
    );
  }

  // Default Variant: High-quality minimalist card with soft margins
  return (
    <motion.div
      whileHover={hoverAnimation}
      onClick={onClick}
      className={`bg-white dark:bg-stone-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 transition-all duration-300 ${
        onClick ? "cursor-pointer hover:border-[#8b5a2b]/30 dark:hover:border-[#e28743]/30" : ""
      } ${className}`}
    >
      {title && (
        <div className="mb-3">
          {subtitle && (
            <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-1">
              ❯ {subtitle}
            </span>
          )}
          <h3 className="text-lg font-bold text-neutral-950 dark:text-stone-50">
            {title}
          </h3>
        </div>
      )}
      <div className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed font-sans">
        {children}
      </div>
    </motion.div>
  );
}
