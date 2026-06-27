import React from "react";

interface LogoProps {
  className?: string;
  variant?: "mark" | "wordmark" | "horizontal" | "stacked" | "clearspace" | "minimum";
  colorMode?: "dynamic" | "darkOnly" | "lightOnly" | "mono";
  size?: "sm" | "md" | "lg" | "xl" | "auto";
}

export default function BrandLogo({
  className = "",
  variant = "horizontal",
  colorMode = "dynamic",
  size = "md",
}: LogoProps) {
  // Determine sizes
  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-20",
    xl: "h-32",
    auto: "h-full w-full",
  }[size];

  // Colors based on theme context (since we can pass colorMode)
  const getColors = () => {
    switch (colorMode) {
      case "darkOnly":
        return {
          bg: "#1b120f", // deep cocoa black
          accent: "#e28743", // warm toasted cookie caramel
          deepAccent: "#b45309",
          text: "#faf6f0", // warm vanilla dough
          chip: "#e28743",
        };
      case "lightOnly":
        return {
          bg: "#faf6f0", // warm vanilla dough
          accent: "#8b5a2b", // delicious cookie brown
          deepAccent: "#54311c", // dark chocolate
          text: "#1b120f", // deep cocoa black
          chip: "#8b5a2b",
        };
      case "mono":
        return {
          bg: "currentColor",
          accent: "currentColor",
          deepAccent: "currentColor",
          text: "currentColor",
          chip: "currentColor",
        };
      case "dynamic":
      default:
        // Use Tailwind utility-friendly colors
        return {
          accent: "fill-violet-600 dark:fill-emerald-400",
          text: "fill-slate-950 dark:fill-stone-50",
          chip: "fill-violet-600 dark:fill-emerald-400",
          stroke: "stroke-violet-600 dark:stroke-emerald-400",
        };
    }
  };

  const colors = getColors();

  // "The Byte" Monogram Logo Mark SVG Path / Rects
  const renderByteMark = (isMono = false) => {
    const isDynamic = colorMode === "dynamic";
    const accentColor = isDynamic ? colors.accent : colors.accent;

    // Use colorful candy chips by default for that delicious look!
    const chip1Color = isMono || colorMode === "mono" ? "currentColor" : "#f43f5e"; // Strawberry Red-Pink
    const chip2Color = isMono || colorMode === "mono" ? "currentColor" : "#10b981"; // Mint Green
    const chip3Color = isMono || colorMode === "mono" ? "currentColor" : "#06b6d4"; // Blueberry Cyan

    return (
      <svg
        viewBox="0 0 100 100"
        className={`inline-block ${sizeClasses} aspect-square`}
        id="byte-mark-svg"
      >
        {/* Rounded square cookie with pixel-stair bite removed from top-right corner */}
        {/* Full square is 10-90 on both axes. Rounded corner rx=12. 
            Pixel bite stairs starting from x=70, y=30.
            Bite removes the 70-100 x, 0-30 y area in step-like stair shapes. */}
        <path
          d="M 22 10 
             H 64 
             V 22
             H 76
             V 34
             H 90
             V 78
             A 12 12 0 0 1 78 90
             H 22
             A 12 12 0 0 1 10 78
             V 22
             A 12 12 0 0 1 22 10
             Z"
          className={isDynamic ? accentColor : ""}
          fill={!isDynamic ? colors.accent : undefined}
          fillRule="evenodd"
        />

        {/* The 3 small square "chips" inside (each 8x8 px) */}
        {/* Chip 1 */}
        <rect
          x="28"
          y="32"
          width="8"
          height="8"
          fill={chip1Color}
        />
        {/* Chip 2 */}
        <rect
          x="52"
          y="56"
          width="8"
          height="8"
          fill={chip2Color}
        />
        {/* Chip 3 */}
        <rect
          x="28"
          y="60"
          width="8"
          height="8"
          fill={chip3Color}
        />
      </svg>
    );
  };

  // Typographic Wordmark "snack-factory"
  const renderWordmark = () => {
    const isDynamic = colorMode === "dynamic";
    const textFill = isDynamic ? colors.text : colors.text;

    return (
      <div className="inline-flex flex-col justify-center select-none ml-3">
        <span
          className={`font-display font-bold leading-none tracking-tight ${
            size === "sm"
              ? "text-lg"
              : size === "md"
              ? "text-2xl"
              : size === "lg"
              ? "text-4xl"
              : "text-5xl"
          }`}
          style={{
            color: !isDynamic ? colors.text : undefined,
          }}
        >
          snack-factory
        </span>
        <span
          className={`font-mono text-[9px] tracking-[0.18em] uppercase text-neutral-400 dark:text-neutral-500 mt-1 leading-none`}
        >
          small bites • production-grade
        </span>
      </div>
    );
  };

  // Rendering variations
  switch (variant) {
    case "mark":
      return (
        <div className={`inline-flex items-center justify-center ${className}`} id="brand-logo-mark">
          {renderByteMark()}
        </div>
      );
    case "wordmark":
      return (
        <div className={`inline-flex items-center ${className}`} id="brand-logo-wordmark">
          {renderWordmark()}
        </div>
      );
    case "stacked":
      return (
        <div
          className={`inline-flex flex-col items-center text-center ${className}`}
          id="brand-logo-stacked"
        >
          <div className="mb-3">{renderByteMark()}</div>
          {renderWordmark()}
        </div>
      );
    case "clearspace":
      // Visualization of clear space rules (X value of padding)
      return (
        <div className={`relative border border-dashed border-red-400/40 p-10 bg-red-400/5 rounded-lg ${className}`} id="logo-clear-space">
          <div className="absolute top-2 left-2 font-mono text-[9px] text-red-500">CLEAR SPACE (X)</div>
          <div className="flex items-center">
            {renderByteMark()}
            {renderWordmark()}
          </div>
          {/* Visual indicator lines */}
          <div className="absolute top-10 bottom-10 left-10 border-l border-dashed border-red-500/50"></div>
          <div className="absolute top-10 bottom-10 right-10 border-r border-dashed border-red-500/50"></div>
          <div className="absolute left-10 right-10 top-10 border-t border-dashed border-red-500/50"></div>
          <div className="absolute left-10 right-10 bottom-10 border-b border-dashed border-red-500/50"></div>
        </div>
      );
    case "minimum":
      // Small screen / favicon size
      return (
        <div className={`flex flex-col items-center space-y-4 p-4 border border-slate-200 dark:border-zinc-800 rounded-lg ${className}`} id="logo-minimum-size">
          <div className="flex items-end justify-center space-x-6">
            <div className="text-center">
              <div className="h-4 w-4 overflow-hidden mb-1 mx-auto">
                {renderByteMark()}
              </div>
              <div className="font-mono text-[9px] text-neutral-500">16px</div>
            </div>
            <div className="text-center">
              <div className="h-8 w-8 overflow-hidden mb-1 mx-auto">
                {renderByteMark()}
              </div>
              <div className="font-mono text-[9px] text-neutral-500">32px</div>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 overflow-hidden mb-1 mx-auto">
                {renderByteMark()}
              </div>
              <div className="font-mono text-[9px] text-neutral-500">48px</div>
            </div>
          </div>
          <div className="font-mono text-[10px] text-center text-neutral-400">
            Min logo size for print is 12mm. For screen, 16px.
          </div>
        </div>
      );
    case "horizontal":
    default:
      return (
        <div className={`inline-flex items-center ${className}`} id="brand-logo-horizontal">
          {renderByteMark()}
          {renderWordmark()}
        </div>
      );
  }
}
