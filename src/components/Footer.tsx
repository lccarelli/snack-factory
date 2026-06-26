import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>
        © {year} <span className="footer-brand">snack-factory</span> —{" "}
        {t("tagline")}
      </p>
      <p className="footer-right" title="The owls are not what they seem.">
        {t("whisper")} <span aria-hidden="true">🛸</span>
      </p>
    </footer>
  );
}
