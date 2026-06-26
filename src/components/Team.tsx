import { useTranslations } from "next-intl";

function Member({ who }: { who: "laura" | "partner" }) {
  const t = useTranslations(`team.${who}`);
  const githubUrl = t("githubUrl");
  const linkedinUrl = t("linkedinUrl");
  return (
    <article className="member">
      <h3 className="member-name">{t("name")}</h3>
      <p className="member-role">{t("role")}</p>
      <p className="member-bio">{t("bio")}</p>
      <div className="member-links">
        {githubUrl !== "#" && (
          <a href={githubUrl} target="_blank" rel="noopener">
            {t("github")} ↗
          </a>
        )}
        {linkedinUrl !== "#" && (
          <a href={linkedinUrl} target="_blank" rel="noopener">
            {t("linkedin")} ↗
          </a>
        )}
      </div>
    </article>
  );
}

export function Team() {
  const t = useTranslations("team");
  return (
    <section className="section" id="team">
      <div className="section-head">
        <span className="section-num">03</span>
        <h2>{t("heading")}</h2>
        <p className="section-sub">{t("sub")}</p>
      </div>
      <div className="team-grid">
        <Member who="laura" />
        <Member who="partner" />
      </div>
    </section>
  );
}
