import { useTranslations } from "next-intl";

export function Contact() {
  const t = useTranslations("contact");
  return (
    <section className="section section-contact" id="contact">
      <div className="section-head">
        <span className="section-num">06</span>
        <h2>{t("heading")}</h2>
        <p className="section-sub">{t("sub")}</p>
      </div>
      <div className="contact-links">
        <a href="mailto:carelli.lc@gmail.com" className="contact-link">
          <span className="contact-label">{t("emailLabel")}</span>
          <span className="contact-val">carelli.lc@gmail.com</span>
        </a>
        <a
          href="https://www.linkedin.com/in/lccarelli/"
          target="_blank"
          rel="noopener"
          className="contact-link"
        >
          <span className="contact-label">{t("linkedinLabel")}</span>
          <span className="contact-val">in/lccarelli ↗</span>
        </a>
        <a
          href="https://github.com/lccarelli"
          target="_blank"
          rel="noopener"
          className="contact-link"
        >
          <span className="contact-label">{t("githubLabel")}</span>
          <span className="contact-val">@lccarelli ↗</span>
        </a>
      </div>
      {/* Booking flow lands here in Milestone 3 (replaces mailto with /book) */}
      <div className="contact-cta">
        <a href="mailto:carelli.lc@gmail.com" className="btn btn-primary">
          {t("bookCta")}
        </a>
      </div>
    </section>
  );
}
