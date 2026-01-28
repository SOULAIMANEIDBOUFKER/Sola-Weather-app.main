import { Link } from "react-router-dom";
import { CitySearch } from "./city-search";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "@/context/theme-provider";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img
            src={theme === "dark" ? "/logo.png" : "/logo2.png"}
            alt={t("header.logoAlt")}
            className="h-14"
          />
        </Link>

        <div className="flex gap-3 items-center">
          <CitySearch />
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
