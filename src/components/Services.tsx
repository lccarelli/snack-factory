import { useTranslations } from "next-intl";
import { Icon, type IconName } from "./Icon";

const ITEMS = ["backend", "performance", "mobile", "automation", "rescue"] as const;

const ICONS: Record<(typeof ITEMS)[number], IconName> = {
  backend: "prompt",
  performance: "chip",
  mobile: "cookie",
  automation: "byte",
  rescue: "dispenser",
};

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
            <Icon name={ICONS[key]} />
            <span className="card-tag">{t(`${key}.tag`)}</span>
            <h3>{t(`${key}.title`)}</h3>
            <p>{t(`${key}.desc`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
