import { useTranslations } from "next-intl";
import { HeroTerminal } from "./HeroTerminal";

export function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">{t("kicker")}</p>
          <h1 className="hero-name hero-headline">
            {t("headline")}
            <em className="hero-em">{t("headlineEm")}</em>
          </h1>
          <p className="hero-tagline">{t("sub")}</p>
          <div className="hero-cta">
            <a href="#services" className="btn btn-primary">
              {t("ctaServices")}
            </a>
            <a href="#contact" className="btn btn-ghost">
              {t("ctaTalk")}
            </a>
          </div>
          <p className="hero-whisper-line" aria-hidden="true">
            🛸 {t("whisper")}
          </p>
        </div>

        <div className="hero-terminal-wrap">
          <HeroTerminal />
        </div>
      </div>
    </section>
  );
}
