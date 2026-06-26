import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // ES served at "/", EN at "/en"
  localePrefix: "as-needed",
});
