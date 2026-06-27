import type { Metadata } from "next";
import { BrandMark } from "@/components/BrandMark";
import { Icon, type IconName } from "@/components/Icon";

export const metadata: Metadata = {
  title: "snack-factory — brand guidelines",
  robots: { index: false, follow: false },
};

function Swatch({ name, hex, text }: { name: string; hex: string; text?: string }) {
  return (
    <div className="bp-swatch">
      <div className="bp-chip" style={{ background: hex, color: text ?? "#fff" }}>
        {hex}
      </div>
      <span className="bp-swatch-name">{name}</span>
    </div>
  );
}

const ICONS: { name: IconName; label: string }[] = [
  { name: "cookie", label: "the cookie-byte" },
  { name: "chip", label: "the chip" },
  { name: "byte", label: "the byte-mark" },
  { name: "dispenser", label: "the dispenser" },
  { name: "prompt", label: "the prompt" },
];

export default function BrandPage() {
  return (
    <div className="bp">
      <a href="/" className="bp-back">← back to site</a>

      <header className="bp-header">
        <div className="brand" style={{ fontSize: "1.4rem" }}>
          <BrandMark />
          <span className="brand-word">
            snack<span className="brand-dot">-</span>factory
          </span>
        </div>
        <h1 className="bp-title">Brand guidelines</h1>
        <p className="bp-tag">small bites, production-grade · food meets terminal culture</p>
      </header>

      {/* LOGO */}
      <section className="bp-section">
        <h2 className="bp-h2">01 · Logo — “The Byte”</h2>
        <p className="bp-p">
          A rounded-square cookie with a pixel-stair bite (bite = byte) and three
          candy-chip sprinkles. Use the horizontal lockup by default; the mark
          alone for avatars and favicons.
        </p>
        <div className="bp-logo-grid">
          <div className="bp-logo-cell">
            <div className="brand" style={{ fontSize: "1.6rem" }}>
              <BrandMark />
              <span className="brand-word">
                snack<span className="brand-dot">-</span>factory
              </span>
            </div>
            <span className="bp-cap">horizontal — primary</span>
          </div>
          <div className="bp-logo-cell">
            <div style={{ width: 56, height: 56, color: "var(--accent)" }}>
              <BrandMark />
            </div>
            <span className="bp-cap">mark only</span>
          </div>
          <div className="bp-logo-cell">
            <div className="bp-minsizes">
              <div style={{ width: 16, height: 16, color: "var(--accent)" }}><BrandMark /></div>
              <div style={{ width: 24, height: 24, color: "var(--accent)" }}><BrandMark /></div>
              <div style={{ width: 32, height: 32, color: "var(--accent)" }}><BrandMark /></div>
            </div>
            <span className="bp-cap">min 16px (screen) · 12mm (print)</span>
          </div>
        </div>
      </section>

      {/* COLOR */}
      <section className="bp-section">
        <h2 className="bp-h2">02 · Color</h2>
        <p className="bp-p">
          Dual theme that inverts by mode. 60-30-10 rule: neutral base, accent,
          then a touch of sprinkle. Caramel only on cocoa; cookie-brown only on
          vanilla. Never light gold on pure white.
        </p>
        <h3 className="bp-h3">Dark — toasted caramel</h3>
        <div className="bp-swatches">
          <Swatch name="deep cocoa (bg)" hex="#170f0d" />
          <Swatch name="toasted caramel (accent)" hex="#e28743" text="#170f0d" />
          <Swatch name="sweet amber" hex="#d97706" text="#170f0d" />
          <Swatch name="vanilla dough (text)" hex="#faf6f0" text="#170f0d" />
        </div>
        <h3 className="bp-h3">Light — cookie brown</h3>
        <div className="bp-swatches">
          <Swatch name="vanilla (bg)" hex="#fdfbf7" text="#1b120f" />
          <Swatch name="cookie brown (accent)" hex="#8b5a2b" />
          <Swatch name="choco fudge" hex="#54311c" />
          <Swatch name="deep cocoa (text)" hex="#1b120f" />
        </div>
        <h3 className="bp-h3">Candy sprinkles — use sparingly</h3>
        <div className="bp-swatches">
          <Swatch name="strawberry" hex="#f43f5e" />
          <Swatch name="mint" hex="#10b981" text="#06241a" />
          <Swatch name="blueberry" hex="#06b6d4" text="#06241a" />
        </div>
      </section>

      {/* TYPE */}
      <section className="bp-section">
        <h2 className="bp-h2">03 · Typography</h2>
        <div className="bp-type">
          <div>
            <p className="bp-type-spec" style={{ fontFamily: "var(--font-serif), serif", fontSize: "2.4rem", fontWeight: 600 }}>
              Fraunces
            </p>
            <span className="bp-cap">Display · headlines, names</span>
          </div>
          <div>
            <p className="bp-type-spec" style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: "1.6rem" }}>
              Inter — body &amp; UI
            </p>
            <span className="bp-cap">Sans · paragraphs, interface</span>
          </div>
          <div>
            <p className="bp-type-spec" style={{ fontFamily: "var(--font-mono), monospace", fontSize: "1.3rem" }}>
              JetBrains Mono ❯ labels
            </p>
            <span className="bp-cap">Mono · code, micro-labels, terminal cues</span>
          </div>
        </div>
      </section>

      {/* ICONS */}
      <section className="bp-section">
        <h2 className="bp-h2">04 · Iconography</h2>
        <p className="bp-p">
          Pixel icons on a strict 24×24 grid, integer coordinates, stair-stepped
          edges. Filled silhouettes for identity, terminal outlines for metadata.
        </p>
        <div className="bp-icons">
          {ICONS.map((i) => (
            <div className="bp-icon-cell" key={i.name}>
              <Icon name={i.name} className="bp-icon" />
              <span className="bp-cap">{i.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PATTERNS */}
      <section className="bp-section">
        <h2 className="bp-h2">05 · Patterns</h2>
        <div className="bp-patterns">
          <div className="bp-pat scanlines"><span>SCANLINE_CRT</span></div>
          <div className="bp-pat pixel-grid-bg"><span>PIXEL_GRID</span></div>
          <div className="bp-pat chip-scatter"><span>CHIP_SCATTER</span></div>
        </div>
      </section>

      {/* VOICE & RULES */}
      <section className="bp-section">
        <h2 className="bp-h2">06 · Voice &amp; rules</h2>
        <p className="bp-p">
          Tone: byte-sized &amp; pro. Playful but premium, nerdy but disciplined.
          We say <em>“we”</em> — a two-person studio. Subtle nods (human after all,
          i want to believe), never literal.
        </p>
        <div className="bp-rules">
          <div className="bp-rule bp-do">
            <span className="bp-rule-h">DO</span>
            <ul>
              <li>Keep the 60-30-10 balance: neutral, accent, sprinkle.</li>
              <li>Caramel on cocoa (dark); cookie-brown on vanilla (light).</li>
              <li>Use sprinkles only as small accents in icons/marks.</li>
              <li>Stay restrained — playful through details, not everywhere.</li>
            </ul>
          </div>
          <div className="bp-rule bp-dont">
            <span className="bp-rule-h">DON’T</span>
            <ul>
              <li>Light gold text on pure white.</li>
              <li>Overflow the layout with sprinkles.</li>
              <li>Mix in unrelated bright gradients on technical text.</li>
              <li>Stretch or recolor the logo outside the system.</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="bp-footer">
        <span className="footer-brand">snack-factory</span> — brand guidelines · v1
      </footer>
    </div>
  );
}
