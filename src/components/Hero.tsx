import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="hero" id="top">
      <p className="hero-kicker">{t("kicker")}</p>
      <h1 className="hero-name hero-headline">{t("headline")}</h1>
      <p className="hero-tagline">{t("sub")}</p>
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
