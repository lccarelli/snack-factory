# snack-factory — Design Brief for a Redesign

> Paste this into a design AI. It describes what snack-factory is, how the site
> is built today, and what we want improved. Goal: a stronger visual design /
> layout while keeping the brand identity, content and tech stack.

---

## 1. What it is

**snack-factory** is a **two-person software studio** (not a personal portfolio):
- **Laura Carelli** — Staff Software Engineer & Tech Lead (full-stack, delivery)
- **Nicolás Sarfati** — Software Architect, performance specialist

They build production-grade software (backend, mobile, automation, performance)
for **international clients, remotely, billed in USD**. AI-augmented. Senior,
independent, no-bullshit. Tone: **"byte-sized & pro"** — playful but premium.

**Core concept:** *bite = byte* — "food meets terminal culture". Software made
like a great snack: small, well-made portions, fresh, no filler.
**Tagline:** "small bites, production-grade".

It's a **bilingual** site (Spanish default at `/`, English at `/en`) with a
**light/dark theme** toggle.

---

## 2. Tech stack & hard constraints (must keep)

- **Next.js 16** (App Router, React 19, Server Components) + **TypeScript**
- **Tailwind CSS v4** + a custom CSS design-token layer (CSS variables)
- **next-intl** for i18n (all copy lives in `messages/es.json` + `messages/en.json`)
- Fonts via `next/font`: **Fraunces** (display serif), **Inter** (sans/body),
  **JetBrains Mono** (mono/labels)
- Self-hosted (Docker), `output: standalone`
- Light/dark theme via `data-theme` on `<body>`, persisted in localStorage

The redesign must work within this: HTML/CSS/React components, Tailwind-friendly,
theme-able with CSS variables, bilingual-safe (text length varies ES vs EN).

---

## 3. Brand identity (must keep — this part we like)

**Logo "The Byte":** a rounded-square cookie/chip with a pixel-stair bite removed
(bite = byte) and three candy-chip sprinkles inside.

**Palette — dual theme that inverts by mode:**
- **Dark:** bg deep cocoa `#170f0d`, accent toasted caramel `#e28743`,
  amber `#d97706`, text vanilla `#faf6f0`
- **Light:** bg vanilla `#fdfbf7`, accent cookie-brown `#8b5a2b`,
  choco fudge `#54311c`, text cocoa `#1b120f`
- **Sprinkles (sparingly):** strawberry `#f43f5e`, mint `#10b981`, blueberry `#06b6d4`

**Motifs:** byte/cookie logo, pixel zigzag strip, terminal prompt `❯`, monospace
micro-labels, a 5-icon pixel set (cookie, chip, byte-mark, dispenser, prompt),
and texture patterns (CRT scanlines, pixel-grid, chip-scatter).
There's an internal brand guidelines page at `/brand`.

Subtle personality nods (keep tasteful, never literal): Daft Punk "Human After
All", X-Files "I Want to Believe", Twin Peaks.

---

## 4. Current page structure (single-page home)

Top zigzag strip, then a **sticky nav** (logo left; links: Services, How we work,
Who we are, Rates, Work, Contact; theme toggle ☀/☾; language toggle ES/EN).

Then these stacked sections (each = a centered heading with a mono "❯ NN" index,
a subtitle, and a grid of bordered cards):

1. **Hero** — kicker line, big serif headline ("We build production software, in
   small, well-made bites"), one-paragraph sub, two buttons (See services / Book
   a call), faint chip-scatter texture, a tiny "human after all" whisper.
2. **Services (01)** — "What we do" + a "// the menu — pick your bite" eyebrow +
   **5 cards** (Backend, Performance, Mobile, Automation, Project rescue), each
   with a pixel icon, a mono "01 · TAG" label, title and description.
3. **How we work (02)** — alt background; **5 numbered items** (plan before code,
   tests, docs, agreed deliveries, AI-augmented).
4. **Who we are (03)** — **2 member cards** (Laura, Nicolás): name, role, bio, links.
5. **Rates (04)** — **3 tier cards** (Development $40, Engineering+design $50,
   Lead+implementation $65; the last flagged "Most value") + a note.
6. **Work (05)** — alt background; **2 project cards** (Ashvattha Yoga app, a
   project-planning repo).
7. **Stack (06)** — a row of monospace "chip" tags (Kotlin, Flutter, Go, etc.).
8. **Contact (07)** — 3 cards (Email, LinkedIn, GitHub) + a "Book a call" button.
9. **Footer** — "© snack-factory — small bites, production-grade" + "i want to
   believe 🛸". Plus a hidden Konami-code easter egg (serves a snack toast).

---

## 5. Current design system (what it looks like today)

- **Layout:** single column, max-width ~1080px, centered. Every section is the
  same shape: heading + subtitle + an auto-fit grid of **bordered, rounded cards**
  with a subtle hover (accent border + 3px lift).
- **Type:** Fraunces for big headings, Inter for body, JetBrains Mono for labels/
  numbers/tags. Section numbers prefixed with a terminal `❯`.
- **Color:** warm, theme-able; accent used on labels, borders-on-hover, buttons,
  section numbers.
- **Density/rhythm:** generous vertical padding; alternating section backgrounds
  for rhythm.

---

## 6. What's NOT working / goals for the redesign

Honest critique of the current design (this is what to fix):

- **Too uniform / template-like.** Almost every section is "centered title +
  grid of bordered cards". It reads safe and repetitive; there's little visual
  hierarchy or surprise.
- **Flat composition.** No real hero moment, no asymmetry, no scale contrast, no
  imagery or illustration — it's all type + boxes.
- **Personality underused.** The brand (snack + terminal, warm bakery, pixel
  icons, candy chips, scanlines) is rich, but the layout barely expresses it.
  It should *feel* like the brand, not just borrow its colors.
- **Static.** No motion, no interactive moments beyond hover and one easter egg.
- **Generic cards.** Cards are plain rounded rectangles; they could carry the
  byte/pixel/snack language (bite-notch corners, vending-machine framing, menu
  styling, terminal windows, etc.).

**Goals:**
1. A memorable, branded layout system — still clean and premium for international
   clients, but unmistakably snack-factory.
2. Strong hierarchy and composition: a real hero, scale/weight contrast,
   asymmetry, intentional whitespace.
3. Express the "food meets terminal" concept structurally (not just via color):
   e.g. services as an actual **menu**, a terminal/console motif, pixel/snack
   illustration, playful-but-restrained micro-interactions.
4. Keep it **accessible and bilingual-safe** (text expands in Spanish), and
   **theme-able** (works in both warm dark and warm light).

---

## 7. What we want you (the design AI) to deliver

1. **2–3 distinct layout/art-direction directions** for the home page, described
   and/or mocked (low-fi wireframe + a styled hero is enough to choose).
2. For the chosen direction: section-by-section layout for all 9 sections above,
   reusing the existing content (don't invent new sections; you may merge/reorder).
3. A refreshed **component language** (how cards, the menu, the team, rates,
   buttons, nav should look) consistent across the site.
4. Concrete specs we can implement in Tailwind/CSS: spacing scale, type scale,
   grid system, motion guidelines, and how each brand motif is applied.
5. Notes on **responsive** behavior (mobile-first) and **dark/light** parity.

**Keep:** brand identity (logo, palette, fonts, motifs), all content/copy, the
bilingual + theme + Next.js/Tailwind constraints.
**Change freely:** layout, composition, hierarchy, card/section treatments,
imagery/illustration, motion, the overall art direction.

---

## 8. Output format

Give an organized response: the directions first (with rationale), then the
detailed layout for the chosen direction, then the component specs and tokens.
Where helpful, include ASCII/wireframe sketches or HTML/CSS snippets we can adapt.
