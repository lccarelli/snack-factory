import { useTranslations } from "next-intl";

export function Rates() {
  const t = useTranslations("rates");
  const tier = (key: "dev" | "eng" | "lead", extraClass = "", flag = false) => (
    <article className={`rate ${extraClass}`.trim()}>
      {flag && <span className="rate-flag">{t("flag")}</span>}
      <div className="rate-head">
        <h3>{t(`${key}.title`)}</h3>
        <p className="rate-price">
          {t(`${key}.price`)}
          <span>{t("perHour")}</span>
        </p>
      </div>
      <p className="rate-role">{t(`${key}.role`)}</p>
      <p className="rate-desc">{t(`${key}.desc`)}</p>
    </article>
  );

  return (
    <section className="section" id="rates">
      <div className="section-head">
        <span className="section-num">04</span>
        <h2>{t("heading")}</h2>
        <p className="section-sub">{t("sub")}</p>
      </div>
      <div className="rates">
        {tier("dev")}
        {tier("eng")}
        {tier("lead", "rate-top", true)}
      </div>
      <p className="rates-note">{t("note")}</p>
    </section>
  );
}
