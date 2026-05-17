/* =============================================================
   Navbar – ULP Invest "Dark Atlas" Design
   Dark navy background, gold accent hover underlines
   Language switcher: NL / EN / SW
   ============================================================= */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/entrepreneurs", label: t("nav.entrepreneurs") },
    { href: "/investors", label: t("nav.investors") },
    { href: "/about", label: t("nav.about") },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: "nl", label: "NL" },
    { code: "en", label: "EN" },
    { code: "sw", label: "SW" },
  ];

  return (
    <nav
      style={{ background: "oklch(0.14 0.06 250 / 0.97)", backdropFilter: "blur(12px)" }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
      role="navigation"
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 rounded-sm flex items-center justify-center font-bold text-sm"
              style={{ background: "oklch(0.72 0.16 75)", color: "oklch(0.14 0.06 250)" }}
            >
              ULP
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-base tracking-wide" style={{ color: "oklch(0.95 0.01 250)", fontFamily: "'Fraunces', serif" }}>
                ULP Invest
              </span>
              <span className="text-xs hidden sm:block" style={{ color: "oklch(0.65 0.04 250)" }}>
                {t("nav.tagline")}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-semibold tracking-wide uppercase ${location === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language switcher + mobile toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full px-1 py-1" style={{ background: "oklch(1 0 0 / 8%)" }}>
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase transition-all duration-200 ${
                    lang === l.code
                      ? "text-[oklch(0.14_0.06_250)]"
                      : "text-[oklch(0.65_0.04_250)] hover:text-[oklch(0.95_0.01_250)]"
                  }`}
                  style={lang === l.code ? { background: "oklch(0.72 0.16 75)" } : {}}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded"
              style={{ color: "oklch(0.95 0.01 250)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{ background: "oklch(0.16 0.06 250)" }}
        >
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  location === link.href
                    ? "text-[oklch(0.72_0.16_75)]"
                    : "text-[oklch(0.85_0.01_250)] hover:text-[oklch(0.72_0.16_75)]"
                }`}
                style={location === link.href ? { background: "oklch(0.72 0.16 75 / 10%)" } : {}}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
