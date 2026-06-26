import { useTranslations } from "next-intl";

export function Work() {
  const t = useTranslations("work");
  return (
    <section className="section section-alt" id="work">
      <div className="section-head">
        <span className="section-num">04</span>
        <h2>{t("heading")}</h2>
        <p className="section-sub">{t("sub")}</p>
      </div>
      <div className="work-grid">
        <article className="work">
          <div className="work-top">
            <h3>{t("ashvattha.title")}</h3>
            <span className="work-badge">{t("ashvattha.badge")}</span>
          </div>
          <p>{t("ashvattha.desc")}</p>
          <div className="work-links">
            <a
              href="https://apps.apple.com/ar/app/ashvattha-yoga/id6761851198"
              target="_blank"
              rel="noopener"
            >
              {t("ashvattha.link")}
            </a>
          </div>
        </article>

        <article className="work">
          <div className="work-top">
            <h3>{t("planning.title")}</h3>
            <span className="work-badge">{t("planning.badge")}</span>
          </div>
          <p>{t("planning.desc")}</p>
          <div className="work-links">
            <a href="https://github.com/lccarelli" target="_blank" rel="noopener">
              {t("planning.link")}
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
