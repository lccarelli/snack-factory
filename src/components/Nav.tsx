import { useTranslations } from "next-intl";
import { BrandMark } from "./BrandMark";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitch } from "./LocaleSwitch";

export function Nav() {
  const t = useTranslations("nav");
  return (
    <header className="nav">
      <a href="#top" className="brand" aria-label="snack-factory — home">
        <BrandMark />
        <span className="brand-word">
          snack<span className="brand-dot">-</span>factory
        </span>
      </a>
      <nav className="nav-links">
        <a href="#services">{t("services")}</a>
        <a href="#how">{t("how")}</a>
        <a href="#rates">{t("rates")}</a>
        <a href="#work">{t("work")}</a>
        <a href="#contact">{t("contact")}</a>
      </nav>
      <ThemeToggle />
      <LocaleSwitch />
    </header>
  );
}
