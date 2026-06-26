import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="hero" id="top">
      <p className="hero-kicker">{t("kicker")}</p>
      <h1 className="hero-name">Laura Carelli</h1>
      <p className="hero-title">
        <span className="t-primary">{t("titlePrimary")}</span>
        <span className="t-rest">{t("titleRest")}</span>
      </p>
      <p className="hero-tagline">{t("tagline")}</p>
      <div className="hero-cta">
        <a href="#services" className="btn btn-primary">
          {t("ctaServices")}
        </a>
        <a href="#contact" className="btn btn-ghost">
          {t("ctaTalk")}
        </a>
      </div>
      <p className="hero-whisper" aria-hidden="true">
        {t("whisper")}
      </p>
    </section>
  );
}
