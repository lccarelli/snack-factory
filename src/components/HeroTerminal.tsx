"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

const SEED: string[] = [
  "❯ snack-factory init --studio",
  "loading laura.carelli + nicolas.sarfati … ok",
  "billing channel: USD … ok",
  "❯ bake --flavor=production",
  "backend · mobile · automation … ready",
  "tests: passing · coverage: green",
];

type Line = { text: string; prompt?: boolean };

export function HeroTerminal() {
  const t = useTranslations("hero.terminal");
  const [lines, setLines] = useState<Line[]>(
    SEED.map((s) => ({ text: s, prompt: s.startsWith("❯") })),
  );
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const out: Line[] = [{ text: `❯ ${raw}`, prompt: true }];

    switch (cmd) {
      case "help":
        out.push({ text: t("help") });
        break;
      case "menu":
      case "services":
        out.push({ text: "→ menu" });
        scrollToId("services");
        break;
      case "team":
      case "us":
        out.push({ text: "→ team" });
        scrollToId("team");
        break;
      case "rates":
      case "pricing":
        out.push({ text: "→ rates" });
        scrollToId("rates");
        break;
      case "contact":
      case "book":
        out.push({ text: "→ contact" });
        scrollToId("contact");
        break;
      case "bake":
        out.push({ text: t("baked") });
        break;
      case "clear":
        setLines([]);
        setInput("");
        return;
      default:
        out.push({ text: `${t("notFound")}: ${cmd}` });
    }

    setLines((prev) => [...prev, ...out]);
    setInput("");
    requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    });
  }

  return (
    <div className="terminal" aria-label="snack-factory terminal">
      <div className="terminal-bar">
        <span className="terminal-dots">
          <span style={{ background: "#f43f5e" }} />
          <span style={{ background: "#10b981" }} />
          <span style={{ background: "#06b6d4" }} />
        </span>
        <span className="terminal-title">SNACK_TERMINAL — ~/bakery</span>
        <span className="terminal-ver">v1.0</span>
      </div>

      <div className="terminal-body" ref={bodyRef}>
        {lines.map((l, i) => (
          <div key={i} className={l.prompt ? "terminal-line is-prompt" : "terminal-line"}>
            {l.text}
          </div>
        ))}
      </div>

      <form
        className="terminal-input"
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
        }}
      >
        <span className="terminal-caret">❯</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("placeholder")}
          aria-label="terminal input"
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
