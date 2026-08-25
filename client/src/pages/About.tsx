/* =============================================================
   About Page – ULP Invest "Dark Atlas" Design
   Sections: Hero, ULP Program, Team, Mission
   ============================================================= */
import { ExternalLink, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const LANDSCAPE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663668553315/UCPcnffX9vjrwurBhixUZj/usambara-landscape-TxKRukdrenTyPFKVocwUJb.webp";

// Team member photos
const ROSE_IMG = "/images/rose-henry-cole.jpg";
const NASRA_IMG = "/images/nasra-kigombola.jpg";
const HANS_IMG = "/images/hans-valkenburg.png";
const THEO_IMG = "/images/theo-van-stuijvenberg.png";

export default function About() {
  const { t, field } = useLanguage();
  const revealRef = useScrollReveal();

  const pillars = [
    {
      number: "01",
      titleKey: "about.ulp.pillar1.title",
      descKey: "about.ulp.pillar1.desc",
      icon: "✈️",
    },
    {
      number: "02",
      titleKey: "about.ulp.pillar2.title",
      descKey: "about.ulp.pillar2.desc",
      icon: "🎓",
    },
    {
      number: "03",
      titleKey: "about.ulp.pillar3.title",
      descKey: "about.ulp.pillar3.desc",
      icon: "💼",
      active: true,
    },
  ];

  return (
    <div ref={revealRef} className="min-h-screen pt-20" style={{ background: "oklch(0.18 0.06 250)" }}>

      {/* ── HERO ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={LANDSCAPE_IMG}
            alt="Usambara Mountains"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, oklch(0.12 0.06 250 / 0.85) 0%, oklch(0.12 0.06 250 / 0.70) 100%)" }}
          />
        </div>
        <div className="container relative z-10 text-center">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "oklch(0.72 0.16 75)" }}
           data-cms-field={field("about.hero.label")}>
            {t("about.hero.label")}
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold mt-3 mb-6 leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.97 0.01 250)" }}
           data-cms-field={field("about.hero.title")}>
            {t("about.hero.title")}
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.80 0.02 250)" }}
           data-cms-field={field("about.hero.subtitle")}>
            {t("about.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ── ULP PROGRAM ── */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <span
              className="fade-up text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.72 0.16 75)" }}
             data-cms-field={field("about.ulp.label")}>
              {t("about.ulp.label")}
            </span>
            <h2
              className="fade-up text-4xl md:text-5xl font-bold mt-3 mb-6"
              style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)", transitionDelay: "60ms" }}
             data-cms-field={field("about.ulp.title")}>
              {t("about.ulp.title")}
            </h2>
            <p
              className="fade-up text-lg max-w-2xl mx-auto mb-6"
              style={{ color: "oklch(0.70 0.03 250)", transitionDelay: "120ms" }}
             data-cms-field={field("about.ulp.body")}>
              {t("about.ulp.body")}
            </p>
            <a
              href="https://www.ubuntuleadershipprogram.nl/"
              target="_blank"
              rel="noopener noreferrer"
              className="fade-up inline-flex items-center gap-2 text-sm font-semibold hover:underline"
              style={{ color: "oklch(0.72 0.16 75)", transitionDelay: "180ms" }}
            >
              {t("about.ulp.link")} <ExternalLink size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <div
                key={pillar.number}
                className="fade-up card-lift p-8 rounded-xl relative overflow-hidden"
                style={{
                  background: pillar.active ? "oklch(0.22 0.06 250)" : "oklch(0.22 0.06 250)",
                  transitionDelay: `${i * 100}ms`,
                  borderTop: pillar.active ? "3px solid oklch(0.72 0.16 75)" : "3px solid oklch(1 0 0 / 10%)"
                }}
              >
                {pillar.active && (
                  <div
                    className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold"
                    style={{ background: "oklch(0.72 0.16 75)", color: "oklch(0.14 0.06 250)" }}
                   data-cms-field={field("about.pillar.active")}>
                    {t("about.pillar.active")}
                  </div>
                )}
                <div className="text-3xl mb-4">{pillar.icon}</div>
                <div
                  className="text-5xl font-bold mb-3"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    color: pillar.active ? "oklch(0.72 0.16 75 / 0.3)" : "oklch(1 0 0 / 0.08)"
                  }}
                >
                  {pillar.number}
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)" }}
                >
                  {t(pillar.titleKey)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "oklch(0.70 0.03 250)" }}>
                  {t(pillar.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24" style={{ background: "oklch(0.22 0.06 250)" }}>
        <div className="container">
          <div className="text-center mb-16">
            <span
              className="fade-up text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.72 0.16 75)" }}
             data-cms-field={field("about.team.label")}>
              {t("about.team.label")}
            </span>
            <h2
              className="fade-up text-4xl md:text-5xl font-bold mt-3"
              style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)", transitionDelay: "60ms" }}
             data-cms-field={field("about.team.title")}>
              {t("about.team.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            {/* Theo */}
            <div
              className="fade-up card-lift p-8 rounded-xl"
              style={{ background: "oklch(0.26 0.055 250)" }}
            >
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={THEO_IMG}
                  alt="Theo van Stuijvenberg"
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  style={{ objectPosition: "center top" }}
                />
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)" }}
                   data-cms-field={field("about.team.theo.name")}>
                    {t("about.team.theo.name")}
                  </h3>
                  <p
                    className="text-sm font-semibold mt-1"
                    style={{ color: "oklch(0.72 0.16 75)" }}
                   data-cms-field={field("about.team.theo.role")}>
                    {t("about.team.theo.role")}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "oklch(0.70 0.03 250)" }} data-cms-field={field("about.team.theo.bio")}>
                {t("about.team.theo.bio")}
              </p>
              <div className="space-y-2">
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
                  {t("about.team.theo.phone")}
                </a>
              </div>
            </div>

            {/* Hans */}
            <div
              className="fade-up card-lift p-8 rounded-xl"
              style={{ background: "oklch(0.26 0.055 250)", transitionDelay: "100ms" }}
            >
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={HANS_IMG}
                  alt="Hans Valkenburg"
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  style={{ objectPosition: "center top" }}
                />
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)" }}
                   data-cms-field={field("about.team.hans.name")}>
                    {t("about.team.hans.name")}
                  </h3>
                  <p
                    className="text-sm font-semibold mt-1"
                    style={{ color: "oklch(0.72 0.16 75)" }}
                   data-cms-field={field("about.team.hans.role")}>
                    {t("about.team.hans.role")}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "oklch(0.70 0.03 250)" }} data-cms-field={field("about.team.hans.bio")}>
                {t("about.team.hans.bio")}
              </p>
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

            {/* Rose Henry Cole */}
            <div
              className="fade-up card-lift p-8 rounded-xl"
              style={{ background: "oklch(0.26 0.055 250)", transitionDelay: "200ms" }}
            >
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={ROSE_IMG}
                  alt="Rose Henry Cole"
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  style={{ objectPosition: "center top" }}
                />
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)" }}
                  >
                    Rose Henry Cole
                  </h3>
                  <p
                    className="text-sm font-semibold mt-1"
                    style={{ color: "oklch(0.72 0.16 75)" }}
                  >
                    Business Coach
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <a
                  href="tel:+255622007120"
                  className="flex items-center gap-2 text-sm hover:text-[oklch(0.72_0.16_75)] transition-colors"
                  style={{ color: "oklch(0.65 0.04 250)" }}
                >
                  <Phone size={14} />
                  +255 622 007 120
                </a>
              </div>
            </div>

            {/* Nasra Kigombola */}
            <div
              className="fade-up card-lift p-8 rounded-xl"
              style={{ background: "oklch(0.26 0.055 250)", transitionDelay: "300ms" }}
            >
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={NASRA_IMG}
                  alt="Nasra Kigombola"
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  style={{ objectPosition: "center top" }}
                />
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)" }}
                  >
                    Nasra Kigombola
                  </h3>
                  <p
                    className="text-sm font-semibold mt-1"
                    style={{ color: "oklch(0.72 0.16 75)" }}
                  >
                    Field Officer
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <a
                  href="tel:+255655106424"
                  className="flex items-center gap-2 text-sm hover:text-[oklch(0.72_0.16_75)] transition-colors"
                  style={{ color: "oklch(0.65 0.04 250)" }}
                >
                  <Phone size={14} />
                  +255 65 510 6424
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={LANDSCAPE_IMG}
            alt="Usambara Mountains"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "oklch(0.12 0.06 250 / 0.82)" }}
          />
        </div>
        <div className="container relative z-10 text-center">
          <span
            className="fade-up text-xs font-bold uppercase tracking-widest"
            style={{ color: "oklch(0.72 0.16 75)" }}
           data-cms-field={field("about.mission.label")}>
            {t("about.mission.label")}
          </span>
          <h2
            className="fade-up text-4xl md:text-6xl font-bold mt-4 mb-6 max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.97 0.01 250)", transitionDelay: "60ms" }}
           data-cms-field={field("about.mission.title")}>
            {t("about.mission.title")}
          </h2>
          <p
            className="fade-up text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.80 0.02 250)", transitionDelay: "120ms" }}
           data-cms-field={field("about.mission.body")}>
            {t("about.mission.body")}
          </p>
        </div>
      </section>

    </div>
  );
}
