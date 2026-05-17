/* =============================================================
   About Page – ULP Invest "Dark Atlas" Design
   Sections: Hero, ULP Program, Team, Mission
   ============================================================= */
import { ExternalLink, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const LANDSCAPE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663668553315/UCPcnffX9vjrwurBhixUZj/usambara-landscape-TxKRukdrenTyPFKVocwUJb.webp";

export default function About() {
  const { t } = useLanguage();
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
          >
            {t("about.hero.label")}
          </span>
          <h1
            className="text-4xl md:text-6xl font-bold mt-3 mb-6 leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.97 0.01 250)" }}
          >
            {t("about.hero.title")}
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.80 0.02 250)" }}
          >
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
            >
              {t("about.ulp.label")}
            </span>
            <h2
              className="fade-up text-4xl md:text-5xl font-bold mt-3 mb-6"
              style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)", transitionDelay: "60ms" }}
            >
              {t("about.ulp.title")}
            </h2>
            <p
              className="fade-up text-lg max-w-2xl mx-auto mb-6"
              style={{ color: "oklch(0.70 0.03 250)", transitionDelay: "120ms" }}
            >
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
                  >
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
            >
              {t("about.team.label")}
            </span>
            <h2
              className="fade-up text-4xl md:text-5xl font-bold mt-3"
              style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)", transitionDelay: "60ms" }}
            >
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
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0"
                  style={{ background: "oklch(0.72 0.16 75 / 0.2)", color: "oklch(0.72 0.16 75)" }}
                >
                  TV
                </div>
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)" }}
                  >
                    {t("about.team.theo.name")}
                  </h3>
                  <p
                    className="text-sm font-semibold mt-1"
                    style={{ color: "oklch(0.72 0.16 75)" }}
                  >
                    {t("about.team.theo.role")}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "oklch(0.70 0.03 250)" }}>
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
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0"
                  style={{ background: "oklch(0.72 0.16 75 / 0.2)", color: "oklch(0.72 0.16 75)" }}
                >
                  HV
                </div>
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)" }}
                  >
                    {t("about.team.hans.name")}
                  </h3>
                  <p
                    className="text-sm font-semibold mt-1"
                    style={{ color: "oklch(0.72 0.16 75)" }}
                  >
                    {t("about.team.hans.role")}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "oklch(0.70 0.03 250)" }}>
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

          </div>

          {/* Placeholder for remaining team members */}
          <div
            className="fade-up mt-8 p-6 rounded-xl text-center max-w-4xl mx-auto"
            style={{ background: "oklch(0.26 0.055 250 / 0.5)", border: "1px dashed oklch(1 0 0 / 15%)" }}
          >
            <p className="text-sm" style={{ color: "oklch(0.55 0.03 250)" }}>
              {t("about.team.more")}
            </p>
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
          >
            {t("about.mission.label")}
          </span>
          <h2
            className="fade-up text-4xl md:text-6xl font-bold mt-4 mb-6 max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.97 0.01 250)", transitionDelay: "60ms" }}
          >
            {t("about.mission.title")}
          </h2>
          <p
            className="fade-up text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.80 0.02 250)", transitionDelay: "120ms" }}
          >
            {t("about.mission.body")}
          </p>
        </div>
      </section>

    </div>
  );
}
