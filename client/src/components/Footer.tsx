/* =============================================================
   Footer – ULP Invest "Dark Atlas" Design
   Deep navy with gold accents, links to ULP main site
   ============================================================= */
import { Link } from "wouter";
import { Mail, Phone, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ background: "oklch(0.12 0.055 250)" }} className="border-t">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://www.ubuntuleadershipprogram.nl/wp-content/uploads/2025/04/ULPLOGO-2.png"
                alt="ULP Logo"
                className="h-12 w-auto"
              />
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)" }}
              >
                ULP Invest
              </span>
            </div>
            <p className="text-sm mb-2" style={{ color: "oklch(0.65 0.04 250)" }}>
              {t("footer.part_of")}{" "}
              <a
                href="https://www.ubuntuleadershipprogram.nl/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[oklch(0.72_0.16_75)] transition-colors"
                style={{ color: "oklch(0.72 0.16 75)" }}
              >
                Ubuntu Leadership Program
              </a>
            </p>
            <p
              className="text-lg font-semibold mt-4"
              style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.72 0.16 75)" }}
            >
              {t("footer.tagline")}
            </p>

            {/* Contact info */}
            <div className="mt-6 flex flex-col gap-2">
              <a
                href="mailto:info@ulpinvest.nl"
                className="flex items-center gap-2 text-sm hover:text-[oklch(0.72_0.16_75)] transition-colors"
                style={{ color: "oklch(0.65 0.04 250)" }}
              >
                <Mail size={14} />
                info@ulpinvest.nl
              </a>
              <a
                href="tel:+31629550134"
                className="flex items-center gap-2 text-sm hover:text-[oklch(0.72_0.16_75)] transition-colors"
                style={{ color: "oklch(0.65 0.04 250)" }}
              >
                <Phone size={14} />
                06 29550134 (Theo van Stuijvenberg)
              </a>
              <a
                href="https://www.ubuntuleadershipprogram.nl/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-[oklch(0.72_0.16_75)] transition-colors"
                style={{ color: "oklch(0.65 0.04 250)" }}
              >
                <ExternalLink size={14} />
                ubuntuleadershipprogram.nl
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "oklch(0.72 0.16 75)" }}
            >
              Navigatie
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/entrepreneurs", label: t("footer.entrepreneurs") },
                { href: "/investors", label: t("footer.investors") },
                { href: "/about", label: t("footer.about") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[oklch(0.72_0.16_75)] transition-colors"
                    style={{ color: "oklch(0.65 0.04 250)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ULP Program */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "oklch(0.72 0.16 75)" }}
            >
              Ubuntu Leadership Program
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: "https://www.ubuntuleadershipprogram.nl/the-program/", label: "Het Programma" },
                { href: "https://www.ubuntuleadershipprogram.nl/", label: "Business School" },
                { href: "https://www.ubuntuleadershipprogram.nl/contact-us/", label: "Contact ULP" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-[oklch(0.72_0.16_75)] transition-colors flex items-center gap-1"
                    style={{ color: "oklch(0.65 0.04 250)" }}
                  >
                    {link.label}
                    <ExternalLink size={10} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ color: "oklch(0.50 0.03 250)" }}
        >
          <span>© {new Date().getFullYear()} ULP Invest – Stichting Ubuntu Leadership Program. {t("footer.rights")}</span>
          <span>Usambara Mountains, Tanzania</span>
        </div>
      </div>
    </footer>
  );
}
