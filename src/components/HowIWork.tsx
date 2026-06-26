import { useTranslations } from "next-intl";

const ITEMS = ["plan", "tests", "docs", "deliveries", "ai"] as const;

export function HowIWork() {
  const t = useTranslations("how");
  return (
    <section className="section section-alt" id="how">
      <div className="section-head">
        <span className="section-num">02</span>
        <h2>{t("heading")}</h2>
        <p className="section-sub">{t("sub")}</p>
      </div>
      <ul className="how-list">
        {ITEMS.map((key) => (
          <li key={key}>
            <h3>{t(`${key}.title`)}</h3>
            <p>{t(`${key}.desc`)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
