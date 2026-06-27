import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Layers,
  Palette,
  Type,
  Grid,
  ChevronRight,
  Tv,
  CheckCircle2,
  XCircle,
  Laptop,
  MessageSquare,
  ExternalLink
} from "lucide-react";
import BrandLogo from "./BrandLogo";
import IconGallery from "./IconGallery";
import PatternShowcase from "./PatternShowcase";
import { Message, BrandTab } from "../types";

interface BrandViewProps {
  language: "es" | "en";
  theme: "light" | "dark";
}

export default function BrandView({ language, theme }: BrandViewProps) {
  const [activeTab, setActiveTab] = useState<BrandTab>("overview");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [typoPreviewText, setTypoPreviewText] = useState("Small bites, production-grade.");
  const [cardOwner, setCardOwner] = useState<"laura" | "nicolas">("laura");
  const [cardSide, setCardSide] = useState<"front" | "back">("front");
  const [stickerColor, setStickerColor] = useState<"accent" | "dark" | "light">("accent");

  // Chat/Brand Assistant state
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: "1",
      role: "model",
      text: "¡Hola! I am the snack-factory Brand Maestro. I can draft Midjourney prompts for custom assets, brainstorm brand copy in our exact voice, or discuss our production-grade architecture. What are we shipping today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsSending(true);

    try {
      const response = await fetch("/api/brand-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          history: chatMessages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reach Brand Assistant server.");
      }

      const data = await response.json();
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err: any) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          text: `[Error]: Could not generate message. Please verify your GEMINI_API_KEY is configured correctly. Error: ${err.message}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const promptSuggestions = [
    "Draft a Midjourney prompt for a sticker of a pixel sandwich",
    "Write a cold email to an international fintech startup",
    "Describe the snack-factory concept in Twin Peaks style",
    "Explain our technical stack as Nicolás"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="brand-maestro-view-container">
      
      {/* Sidebar navigation inside guidelines tab */}
      <aside className="lg:col-span-3 flex flex-col space-y-1" id="guidelines-sidebar">
        <p className="font-mono text-[9px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest px-3 mb-2">
          Identity Modules
        </p>

        {(["overview", "logo", "colors", "typography", "iconography", "patterns", "applications", "voice", "assistant"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full text-left px-3 py-2.5 rounded-xl font-mono text-xs flex items-center justify-between transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? "bg-violet-600/10 dark:bg-emerald-400/10 text-violet-700 dark:text-emerald-400 border-l-4 border-violet-600 dark:border-emerald-400 font-bold"
                : "text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-zinc-900/50"
            }`}
          >
            <span className="capitalize">{tab === "overview" ? "01. Brand Story" : tab === "logo" ? "02. Logo Suite" : tab === "colors" ? "03. Color Matrix" : tab === "typography" ? "04. Typography" : tab === "iconography" ? "05. Iconography" : tab === "patterns" ? "06. Patterns" : tab === "applications" ? "07. Applications" : tab === "voice" ? "08. Voice Guides" : "09. AI Coach"}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ))}

        {/* Studio Quick Stats */}
        <div className="p-4 bg-slate-100/40 dark:bg-stone-950/20 border border-slate-200/50 dark:border-zinc-800/40 rounded-xl mt-6 space-y-2">
          <h5 className="font-mono text-[8px] uppercase tracking-wider text-neutral-400">
            STUDIO METRICS
          </h5>
          <div className="grid grid-cols-2 gap-2 font-mono text-[9px] text-neutral-500">
            <div>
              <span className="block">HEADCOUNT</span>
              <strong className="text-slate-700 dark:text-neutral-300">2 SENIORS</strong>
            </div>
            <div>
              <span className="block">AI CO-PILOT</span>
              <strong className="text-slate-700 dark:text-neutral-300">AUGMENTED</strong>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace for active identity module */}
      <div className="lg:col-span-9 bg-white dark:bg-stone-900 border border-slate-200/60 dark:border-zinc-800/60 rounded-2xl p-6 shadow-sm">
        
        {/* Module 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4">
              <div>
                <span className="font-mono text-[10px] text-violet-600 dark:text-emerald-400 uppercase tracking-widest">
                  ❯ MODULE_01 // IDENTITY
                </span>
                <h2 className="text-2xl font-serif italic text-slate-900 dark:text-white mt-1">
                  The snack-factory Concept
                </h2>
              </div>
              <Layers className="w-5 h-5 text-neutral-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  THE PHILOSOPHY
                </h3>
                <p className="font-serif italic text-2xl leading-snug text-slate-800 dark:text-stone-200">
                  "Serious engineering, delivered like a great snack."
                </p>
                <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                  We believe international software shouldn't require bloated corporate meetings, 
                  fluff-ridden invoices, or administrative bottlenecks. snack-factory builds pristine, 
                  production-grade code segments. They are small, extremely well-designed portions that 
                  satisfy exactly what your platform needs.
                </p>
              </div>

              <div className="space-y-3 bg-slate-50 dark:bg-stone-950/40 p-5 rounded-xl border border-slate-200/50 dark:border-zinc-800/40 font-mono text-xs text-neutral-500">
                <h3 className="font-mono text-xs font-bold text-violet-600 dark:text-emerald-400 uppercase tracking-wider">
                  THE ARCHITECTS
                </h3>
                <div className="space-y-3">
                  <div>
                    <strong className="text-slate-800 dark:text-stone-200">Laura Carelli</strong>
                    <span className="block mt-0.5">Staff Software Engineer & Tech Lead</span>
                  </div>
                  <div>
                    <strong className="text-slate-800 dark:text-stone-200">Nicolás Sarfati</strong>
                    <span className="block mt-0.5">Software Architect & Performance Lead</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Module 2: LOGO */}
        {activeTab === "logo" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4">
              <div>
                <span className="font-mono text-[10px] text-violet-600 dark:text-emerald-400 uppercase tracking-widest">
                  ❯ MODULE_02 // THE MARK
                </span>
                <h2 className="text-2xl font-serif italic text-slate-900 dark:text-white mt-1">
                  The Logo Suite
                </h2>
              </div>
              <Grid className="w-5 h-5 text-neutral-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-4 bg-slate-50 dark:bg-stone-950/20 border border-slate-200 dark:border-zinc-800 rounded-xl text-center space-y-4">
                <span className="font-mono text-[9px] text-neutral-400 block uppercase">
                  A. PRIMARY LOCKUP
                </span>
                <div className="p-6 bg-white dark:bg-stone-900 rounded-lg flex items-center justify-center min-h-[100px]">
                  <BrandLogo variant="horizontal" size="md" colorMode="dynamic" />
                </div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-stone-950/20 border border-slate-200 dark:border-zinc-800 rounded-xl text-center space-y-4">
                <span className="font-mono text-[9px] text-neutral-400 block uppercase">
                  B. MONOGRAM MARK (THE BYTE)
                </span>
                <div className="p-6 bg-white dark:bg-stone-900 rounded-lg flex items-center justify-center min-h-[100px]">
                  <BrandLogo variant="mark" size="lg" colorMode="dynamic" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Module 3: COLORS */}
        {activeTab === "colors" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4">
              <div>
                <span className="font-mono text-[10px] text-violet-600 dark:text-emerald-400 uppercase tracking-widest">
                  ❯ MODULE_03 // COLORS
                </span>
                <h2 className="text-2xl font-serif italic text-slate-900 dark:text-white mt-1">
                  The Cookie Color Palette
                </h2>
              </div>
              <Palette className="w-5 h-5 text-neutral-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              <div className="p-4 bg-stone-950 text-white rounded-xl space-y-3">
                <span className="text-emerald-400 block font-bold">DARK MODE (COCOA & CARAMEL)</span>
                <div className="space-y-2">
                  <div className="p-2 bg-[#170f0d] rounded border border-zinc-800">BG: #170f0d</div>
                  <div className="p-2 bg-[#e28743] text-black rounded font-bold">Accent: #e28743</div>
                </div>
              </div>
              <div className="p-4 bg-[#faf6f0] text-[#1b120f] rounded-xl space-y-3 border border-slate-200">
                <span className="text-violet-600 block font-bold">LIGHT MODE (VANILLA & CHOCOLATE)</span>
                <div className="space-y-2">
                  <div className="p-2 bg-white rounded border border-violet-200">BG: #faf6f0</div>
                  <div className="p-2 bg-[#8b5a2b] text-white rounded font-bold">Accent: #8b5a2b</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Module 4: TYPOGRAPHY */}
        {activeTab === "typography" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4">
              <div>
                <span className="font-mono text-[10px] text-violet-600 dark:text-emerald-400 uppercase tracking-widest">
                  ❯ MODULE_04 // TYPE
                </span>
                <h2 className="text-2xl font-serif italic text-slate-900 dark:text-white mt-1">
                  Typography Scale
                </h2>
              </div>
              <Type className="w-5 h-5 text-neutral-400" />
            </div>

            <input
              type="text"
              value={typoPreviewText}
              onChange={(e) => setTypoPreviewText(e.target.value)}
              className="w-full font-mono text-xs px-3 py-2 bg-slate-50 dark:bg-stone-950 border border-slate-200 dark:border-zinc-800 rounded-md focus:outline-none"
            />

            <div className="space-y-4 pt-4">
              <div>
                <span className="font-mono text-[9px] text-neutral-400 block mb-1">Fraunces Display (Serif Italic)</span>
                <p className="font-display italic text-3xl text-slate-800 dark:text-stone-100">{typoPreviewText}</p>
              </div>
              <div>
                <span className="font-mono text-[9px] text-neutral-400 block mb-1">Inter Sans (Body Copy)</span>
                <p className="font-sans text-base text-slate-700 dark:text-stone-300">{typoPreviewText}</p>
              </div>
            </div>
          </div>
        )}

        {/* Module 5: ICONOGRAPHY */}
        {activeTab === "iconography" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4">
              <div>
                <span className="font-mono text-[10px] text-violet-600 dark:text-emerald-400 uppercase tracking-widest">
                  ❯ MODULE_05 // PIXELS
                </span>
                <h2 className="text-2xl font-serif italic text-slate-900 dark:text-white mt-1">
                  The Pixel Icons
                </h2>
              </div>
              <Grid className="w-5 h-5 text-neutral-400" />
            </div>
            <IconGallery />
          </div>
        )}

        {/* Module 6: PATTERNS */}
        {activeTab === "patterns" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4">
              <div>
                <span className="font-mono text-[10px] text-violet-600 dark:text-emerald-400 uppercase tracking-widest">
                  ❯ MODULE_06 // TEXTURES
                </span>
                <h2 className="text-2xl font-serif italic text-slate-900 dark:text-white mt-1">
                  Patterns & Scanlines
                </h2>
              </div>
              <Tv className="w-5 h-5 text-neutral-400" />
            </div>
            <PatternShowcase />
          </div>
        )}

        {/* Module 7: APPLICATIONS */}
        {activeTab === "applications" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4">
              <div>
                <span className="font-mono text-[10px] text-violet-600 dark:text-emerald-400 uppercase tracking-widest">
                  ❯ MODULE_07 // MARKETING
                </span>
                <h2 className="text-2xl font-serif italic text-slate-900 dark:text-white mt-1">
                  Brand applications
                </h2>
              </div>
              <Laptop className="w-5 h-5 text-neutral-400" />
            </div>

            <div className="w-full max-w-[400px] aspect-[1.75/1] mx-auto relative rounded-xl shadow-lg border border-slate-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-stone-950 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <BrandLogo variant="mark" size="sm" colorMode="dynamic" />
                <span className="font-mono text-[8px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                  STRICTLY_PRODUCTION_GRADE
                </span>
              </div>
              <div>
                <h4 className="font-display font-bold text-xl text-slate-800 dark:text-stone-100 leading-none">
                  Laura Carelli
                </h4>
                <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 mt-1">
                  Staff Engineer & Tech Lead
                </p>
              </div>
              <div className="flex justify-between items-end font-mono text-[8px] text-neutral-400 dark:text-neutral-500 border-t border-slate-100 dark:border-zinc-900/60 pt-2">
                <span>carelli.lc@gmail.com</span>
                <span>snack-factory.com</span>
              </div>
            </div>
          </div>
        )}

        {/* Module 8: VOICE */}
        {activeTab === "voice" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4">
              <div>
                <span className="font-mono text-[10px] text-violet-600 dark:text-emerald-400 uppercase tracking-widest">
                  ❯ MODULE_08 // VOICE
                </span>
                <h2 className="text-2xl font-serif italic text-slate-900 dark:text-white mt-1">
                  Editorial Tone Guides
                </h2>
              </div>
              <MessageSquare className="w-5 h-5 text-neutral-400" />
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-neutral-300">
              <p>
                snack-factory speaks confidently without ever entering corporate puffery. We are technical professionals writing high-performance algorithms for world-class solutions.
              </p>
              <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-lg font-mono text-xs">
                <span className="text-green-500 font-bold block">WE WRITE LIKE THIS:</span>
                <p className="text-slate-600 dark:text-neutral-300 mt-1">
                  "Your database query patterns were bottlenecking checkout times by 42%. We rewrote the indexing strategy. It's compiled and ready in production."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Module 9: ASSISTANT */}
        {activeTab === "assistant" && (
          <div className="space-y-4 flex flex-col justify-between min-h-[450px]" id="brand-maestro-assistant-box">
            <div className="border-b border-slate-100 dark:border-zinc-800 pb-3">
              <span className="font-mono text-[9px] text-violet-600 dark:text-emerald-400 uppercase tracking-widest font-bold flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                ❯ MODULE_09 // CONVERSATIONAL BRAND MAESTRO
              </span>
              <h2 className="text-lg font-serif italic text-slate-900 dark:text-white mt-1">
                AI Prompt & Brand Architect
              </h2>
            </div>

            {/* Chat output */}
            <div className="flex-grow max-h-[300px] overflow-y-auto border border-slate-200/60 dark:border-zinc-800/60 rounded-xl p-4 bg-slate-50/50 dark:bg-stone-950/20 space-y-3 font-mono text-xs">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div className={`p-3 rounded-2xl ${msg.role === "user" ? "bg-violet-600 text-white dark:bg-emerald-400 dark:text-stone-950" : "bg-neutral-100 dark:bg-stone-950 text-neutral-800 dark:text-stone-200 border border-slate-200 dark:border-zinc-800"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="text-neutral-400 text-[10px] animate-pulse">Brand Maestro is thinking...</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {promptSuggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputMessage(s)}
                  className="px-2 py-0.5 border border-slate-200 dark:border-zinc-800 rounded-full font-mono text-[9px] hover:border-violet-500 text-neutral-500 cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask guidelines queries..."
                className="flex-grow px-3 py-2 bg-white dark:bg-stone-900 border border-slate-200 dark:border-zinc-800 rounded-xl font-mono text-xs focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSending || !inputMessage.trim()}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-700 dark:bg-emerald-400 text-white dark:text-stone-950 font-mono text-xs uppercase font-bold rounded-xl disabled:opacity-50 cursor-pointer"
              >
                SEND
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
