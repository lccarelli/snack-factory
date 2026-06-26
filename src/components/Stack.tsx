import { useTranslations } from "next-intl";

const STACK = [
  "Kotlin",
  "Spring WebFlux",
  "Java",
  "Go",
  "PHP",
  "Flutter / Dart",
  "PostgreSQL · R2DBC",
  "Flyway",
  "Docker",
  "n8n",
  "JWT",
  "Mercado Pago",
  "SonarQube",
  "Shell",
  "Git",
];

export function Stack() {
  const t = useTranslations("stack");
  return (
    <section className="section" id="stack">
      <div className="section-head">
        <span className="section-num">06</span>
        <h2>{t("heading")}</h2>
      </div>
      <ul className="stack-list">
        {STACK.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
