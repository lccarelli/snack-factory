"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(target: "es" | "en") {
    if (target !== locale) router.replace(pathname, { locale: target });
  }

  return (
    <button
      className="lang-toggle"
      onClick={() => switchTo(locale === "es" ? "en" : "es")}
      aria-label="Switch language"
    >
      <span className={locale === "es" ? "lang-active" : undefined}>ES</span>
      <span className="lang-sep">/</span>
      <span className={locale === "en" ? "lang-active" : undefined}>EN</span>
    </button>
  );
}
