import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const footerLinks = [
    { key: "privacy", href: "#" },
    { key: "terms", href: "#" },
    { key: "sitemap", href: "#" },
  ];

  return (
    <footer className="border-t border-border bg-primary py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between lg:px-10">
        <span className="text-sm text-primary-foreground/60">
          {t("footer.copy")}
        </span>
        <ul className="flex gap-6">
          {footerLinks.map(({ key, href }) => (
            <li key={key}>
              <a
                href={href}
                className="text-sm text-primary-foreground/60 transition hover:text-primary-foreground"
              >
                {t(`footer.links.${key}`)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
