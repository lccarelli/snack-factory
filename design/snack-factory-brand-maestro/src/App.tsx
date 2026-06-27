import React, { useState, useEffect } from "react";
import { 
  Home, 
  BookOpen, 
  Layers, 
  Moon, 
  Sun, 
  Globe,
  Check
} from "lucide-react";
import BrandLogo from "./components/BrandLogo";
import HomeView from "./components/HomeView";
import BlogView from "./components/BlogView";
import BrandView from "./components/BrandView";
import { ActivePage } from "./types";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>("home");
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Sync Tailwind CSS theme classes on the root document
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Handle smooth page routing or navigation from home components
  const handleTabChange = (tab: string) => {
    if (tab === "services" || tab === "contact") {
      const element = document.getElementById(tab === "services" ? "services-menu" : "contact-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div 
      className="min-h-screen bg-brand-off-white dark:bg-brand-near-black text-brand-near-black dark:text-brand-off-white transition-colors duration-500 font-sans relative overflow-x-hidden flex flex-col justify-between"
      id="brand-app-container"
    >
      {/* Decorative Background Scanlines Texture (Visual Flairs) */}
      <div className="absolute inset-0 scanlines opacity-5 pointer-events-none" />

      {/* Decorative Watermark Backdrops */}
      <div className="absolute top-24 right-[-5%] opacity-[0.02] text-[10vw] font-mono font-bold tracking-tighter uppercase select-none pointer-events-none">
        snack-factory
      </div>
      <div className="absolute bottom-24 left-[-5%] opacity-[0.02] text-[8vw] font-serif italic tracking-tighter select-none pointer-events-none">
        bite_equals_byte
      </div>

      {/* Primary Sticky Header */}
      <header className="sticky top-0 z-50 bg-brand-off-white/80 dark:bg-[#110b0a]/80 backdrop-blur-md border-b border-slate-200/60 dark:border-zinc-800/60 px-4 md:px-10 h-20 flex items-center justify-between shadow-sm">
        
        {/* Brand Logo Lockup */}
        <div 
          onClick={() => setActivePage("home")} 
          className="cursor-pointer hover:opacity-90 transition-opacity flex items-center"
        >
          <BrandLogo variant="horizontal" size="md" colorMode="dynamic" />
        </div>

        {/* Dynamic Global Page Router */}
        <nav className="hidden md:flex items-center space-x-1.5 bg-slate-100/60 dark:bg-stone-900/40 p-1 rounded-xl border border-slate-200/40 dark:border-zinc-800/40">
          <button
            onClick={() => setActivePage("home")}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
              activePage === "home"
                ? "bg-[#8b5a2b] dark:bg-[#e28743] text-white dark:text-[#1b120f] shadow-sm"
                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{language === "es" ? "Inicio" : "Home"}</span>
          </button>
          
          <button
            onClick={() => setActivePage("blog")}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
              activePage === "blog"
                ? "bg-[#8b5a2b] dark:bg-[#e28743] text-white dark:text-[#1b120f] shadow-sm"
                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === "es" ? "Pensamientos" : "Dev Blog"}</span>
          </button>

          <button
            onClick={() => setActivePage("brand")}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
              activePage === "brand"
                ? "bg-[#8b5a2b] dark:bg-[#e28743] text-white dark:text-[#1b120f] shadow-sm"
                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{language === "es" ? "Manual de Marca" : "Brand Book"}</span>
          </button>
        </nav>

        {/* Global Configuration Controls (Theme, Language, etc.) */}
        <div className="flex items-center space-x-3.5">
          {/* Quick Language Toggle */}
          <div className="flex items-center bg-slate-100/60 dark:bg-stone-900/40 p-1 rounded-xl border border-slate-200/40 dark:border-zinc-800/40 font-mono text-[10px]">
            <button
              onClick={() => setLanguage("es")}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                language === "es"
                  ? "bg-white dark:bg-stone-800 text-[#8b5a2b] dark:text-[#e28743] shadow-xs"
                  : "text-neutral-400"
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                language === "en"
                  ? "bg-white dark:bg-stone-800 text-[#8b5a2b] dark:text-[#e28743] shadow-xs"
                  : "text-neutral-400"
              }`}
            >
              EN
            </button>
          </div>

          {/* Theme switcher */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-stone-900/40 text-violet-600 dark:text-emerald-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xs cursor-pointer"
            aria-label="Toggle brand theme mode"
          >
            {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
          </button>
        </div>
      </header>

      {/* Mobile Routing Sheet Header (Only visible on small devices) */}
      <div className="md:hidden flex justify-around items-center h-12 bg-slate-50 dark:bg-[#170f0d] border-b border-slate-200/60 dark:border-zinc-800/60 text-xs font-mono font-bold">
        <button 
          onClick={() => setActivePage("home")}
          className={`flex-grow text-center py-2 transition-colors duration-200 ${activePage === "home" ? "text-[#8b5a2b] dark:text-[#e28743] border-b-2 border-[#8b5a2b] dark:border-[#e28743]" : "text-neutral-400"}`}
        >
          {language === "es" ? "INICIO" : "HOME"}
        </button>
        <button 
          onClick={() => setActivePage("blog")}
          className={`flex-grow text-center py-2 transition-colors duration-200 ${activePage === "blog" ? "text-[#8b5a2b] dark:text-[#e28743] border-b-2 border-[#8b5a2b] dark:border-[#e28743]" : "text-neutral-400"}`}
        >
          {language === "es" ? "BLOG" : "BLOG"}
        </button>
        <button 
          onClick={() => setActivePage("brand")}
          className={`flex-grow text-center py-2 transition-colors duration-200 ${activePage === "brand" ? "text-[#8b5a2b] dark:text-[#e28743] border-b-2 border-[#8b5a2b] dark:border-[#e28743]" : "text-neutral-400"}`}
        >
          {language === "es" ? "MARCA" : "BRAND"}
        </button>
      </div>

      {/* Core Dynamic Content Stage */}
      <main className="max-w-7xl w-full mx-auto px-4 md:px-8 py-10 flex-grow" id="main-content-stage">
        <AnimatePresence mode="wait">
          {activePage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <HomeView language={language} theme={theme} onTabChange={handleTabChange} />
            </motion.div>
          )}

          {activePage === "blog" && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <BlogView language={language} theme={theme} />
            </motion.div>
          )}

          {activePage === "brand" && (
            <motion.div
              key="brand"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <BrandView language={language} theme={theme} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer Banner */}
      <footer className="w-full bg-[#110b0a] flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-6 md:py-8 text-[9px] font-mono uppercase tracking-[0.2em] text-white/40 border-t border-zinc-900 mt-16" id="app-footer">
        <div className="text-center md:text-left mb-3 md:mb-0">
          © 2026 snack-factory (LAURA CARELLI + NICOLÁS SARFATI)
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-3 md:mb-0">
          <span className="text-emerald-400">EMERALD.HEX: #10B981</span>
          <span className="text-[#e28743]">CARAMEL.HEX: #E28743</span>
          <span className="text-[#8b5a2b]">CHOCOLATE.HEX: #8B5A2B</span>
        </div>
        <div className="font-bold text-center">
          small bites, production-grade.
        </div>
      </footer>
    </div>
  );
}
