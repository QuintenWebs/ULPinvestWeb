/* =============================================================
   Footer – ULP Invest "Dark Atlas" Design
   Deep navy with gold accents, links to ULP main site
   ============================================================= */
import { Link } from "wouter";
import { Mail, Phone, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import content from "@/content.json";
import { telHref } from "@/lib/utils";
// Images are the same in every language, so they live once under shared.images
// in content.json rather than per language. Editable in the Mirantic CMS.
const images = content.shared.images;
// Text that is the same in every language, editable in the Mirantic CMS.
const text = content.shared.text.footer;

export default function Footer() {
  const { t, field } = useLanguage();

  return (
    <footer style={{ background: "oklch(0.12 0.055 250)" }} className="border-t">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={images.logo}
                data-cms-field="shared.images.logo"
                alt="ULP Logo"
                className="h-12 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)" }}
                data-cms-field="shared.text.footer.brand"
              >
                {text.brand}
              </span>
            </div>
            <p className="text-sm mb-2" style={{ color: "oklch(0.65 0.04 250)" }}>
              <span data-cms-field={field("footer.part_of")}>{t("footer.part_of")}</span>{" "}
              <a
                href="https://www.ubuntuleadershipprogram.nl/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[oklch(0.72_0.16_75)] transition-colors"
                style={{ color: "oklch(0.72 0.16 75)" }}
                data-cms-field="shared.text.footer.ulpName"
              >
                {text.ulpName}
              </a>
            </p>
            <p
              className="text-lg font-semibold mt-4"
              style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.72 0.16 75)" }}
             data-cms-field={field("footer.tagline")}>
              {t("footer.tagline")}
            </p>

            {/* Contact info */}
            <div className="mt-6 flex flex-col gap-2">
              <a
                href={`mailto:${text.email}`}
                className="flex items-center gap-2 text-sm hover:text-[oklch(0.72_0.16_75)] transition-colors"
                style={{ color: "oklch(0.65 0.04 250)" }}
              >
                <Mail size={14} />
                <span data-cms-field="shared.text.footer.email">{text.email}</span>
              </a>
              <a
                href={telHref(text.phone)}
                className="flex items-center gap-2 text-sm hover:text-[oklch(0.72_0.16_75)] transition-colors"
                style={{ color: "oklch(0.65 0.04 250)" }}
              >
                <Phone size={14} />
                <span data-cms-field="shared.text.footer.phone">{text.phone}</span>
              </a>
              <a
                href="https://www.ubuntuleadershipprogram.nl/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-[oklch(0.72_0.16_75)] transition-colors"
                style={{ color: "oklch(0.65 0.04 250)" }}
              >
                <ExternalLink size={14} />
                <span data-cms-field="shared.text.footer.website">{text.website}</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "oklch(0.72 0.16 75)" }}
             data-cms-field={field("footer.nav.heading")}>
              {t("footer.nav.heading")}
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/entrepreneurs", label: t("footer.entrepreneurs"), cmsField: field("footer.entrepreneurs") },
                { href: "/investors", label: t("footer.investors"), cmsField: field("footer.investors") },
                { href: "/about", label: t("footer.about"), cmsField: field("footer.about") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cms-field={link.cmsField}
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
              data-cms-field="shared.text.footer.ulpHeading"
            >
              {text.ulpHeading}
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: "https://www.ubuntuleadershipprogram.nl/the-program/", label: t("footer.ulp.program"), cmsField: field("footer.ulp.program") },
                { href: "https://www.ubuntuleadershipprogram.nl/", label: text.businessSchool, cmsField: "shared.text.footer.businessSchool" },
                { href: "https://www.ubuntuleadershipprogram.nl/contact-us/", label: t("footer.ulp.contact"), cmsField: field("footer.ulp.contact") },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-[oklch(0.72_0.16_75)] transition-colors flex items-center gap-1"
                    style={{ color: "oklch(0.65 0.04 250)" }}
                  >
                    <span data-cms-field={link.cmsField}>{link.label}</span>
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
          <span>
            © {new Date().getFullYear()}{" "}
            <span data-cms-field="shared.text.footer.legal">{text.legal}</span>{" "}
            <span data-cms-field={field("footer.rights")}>{t("footer.rights")}</span>
          </span>
          <span data-cms-field="shared.text.footer.location">{text.location}</span>
        </div>
      </div>
    </footer>
  );
}
