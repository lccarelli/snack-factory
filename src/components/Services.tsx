import { useTranslations } from "next-intl";

const ITEMS = ["backend", "mobile", "automation", "rescue"] as const;

export function Services() {
  const t = useTranslations("services");
  return (
    <section className="section" id="services">
      <div className="section-head">
        <span className="section-num">01</span>
        <h2>{t("heading")}</h2>
        <p className="section-sub">{t("sub")}</p>
      </div>
      <p className="menu-eyebrow">{t("menuEyebrow")}</p>
      <div className="cards">
        {ITEMS.map((key) => (
          <article className="card" key={key}>
            <span className="card-tag">{t(`${key}.tag`)}</span>
            <h3>{t(`${key}.title`)}</h3>
            <p>{t(`${key}.desc`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
