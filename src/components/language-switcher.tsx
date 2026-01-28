import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "en").toLowerCase();

  const btnClass = (code: "en" | "de") =>
    `px-3 py-1 rounded-md border text-sm transition ${
      lang.startsWith(code) ? "opacity-100" : "opacity-60 hover:opacity-100"
    }`;

  return (
    <div className="flex items-center gap-2">
      <button className={btnClass("en")} onClick={() => i18n.changeLanguage("en")}>
        {t("language.en")}
      </button>
      <button className={btnClass("de")} onClick={() => i18n.changeLanguage("de")}>
        {t("language.de")}
      </button>
    </div>
  );
}
