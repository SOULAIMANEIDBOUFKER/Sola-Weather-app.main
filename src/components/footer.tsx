import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation("common"); 
  const year = new Date().getFullYear();

  const name = "Soulaimane Idboufker";
  const githubUrl = "https://github.com/SOULAIMANEIDBOUFKER";
  const linkedinUrl = "https://www.linkedin.com/in/soulaimane-idboufker-92aab92aa";
  const email = "soulaimaneidboufker@gmail.com";

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-base font-semibold tracking-tight">{name}</p>
            <p className="text-sm text-muted-foreground">{t("footer.tagline")}</p>
            <p className="text-xs text-muted-foreground">
              {t("footer.rights", { year, name })}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">{t("footer.contact")}</p>

            <div className="flex flex-wrap gap-3">
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:bg-muted"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:bg-muted"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>

              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:bg-muted"
              >
                <Mail className="h-4 w-4" />
                {t("footer.email")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
