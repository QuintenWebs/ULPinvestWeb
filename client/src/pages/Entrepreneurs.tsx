/* =============================================================
   Entrepreneurs Page – ULP Invest "Dark Atlas" Design
   Sections: Hero, Who is it for, Financing, Support, Apply
   ============================================================= */
import { Link } from "wouter";
import { CheckCircle2, ArrowRight, Euro, Clock, TrendingUp, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ENTREPRENEUR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663668553315/UCPcnffX9vjrwurBhixUZj/entrepreneur-market-WWWVVn4Xj4EZgWtJt8oeTT.webp";

export default function Entrepreneurs() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  const whoItems = [
    t("ent.who.item1"),
    t("ent.who.item2"),
    t("ent.who.item3"),
    t("ent.who.item4"),
  ];

  const supportItems = [
    t("ent.support.item1"),
    t("ent.support.item2"),
    t("ent.support.item3"),
    t("ent.support.item4"),
    t("ent.support.item5"),
  ];

  const loanHighlights = [
    { icon: Euro, value: t("ent.loan.amount"), label: t("ent.loan.label") },
    { icon: Clock, value: t("ent.loan.term"), label: "Looptijd" },
    { icon: TrendingUp, value: t("ent.loan.early"), label: "" },
    { icon: Users, value: t("ent.loan.rate"), label: "" },
  ];

  return (
    <div ref={revealRef} className="min-h-screen pt-20" style={{ background: "oklch(0.18 0.06 250)" }}>

      {/* ── HERO ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={ENTREPRENEUR_IMG}
            alt="Tanzanian entrepreneur"
            className="w-full h-full object-cover object-top"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, oklch(0.14 0.06 250 / 0.88) 0%, oklch(0.14 0.06 250 / 0.75) 100%)" }}
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.72 0.16 75)" }}
            >
              {t("ent.hero.label")}
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold mt-3 mb-6 leading-tight"
              style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.97 0.01 250)" }}
            >
              {t("ent.hero.title")}
            </h1>
            <p
              className="text-lg mb-8 leading-relaxed"
              style={{ color: "oklch(0.80 0.02 250)" }}
            >
              {t("ent.hero.subtitle")}
            </p>
            <a
              href="mailto:info@ulpinvest.nl?subject=Aanvraag%20ULP%20Invest"
              className="btn-gold flex items-center gap-2 w-fit"
            >
              {t("ent.hero.cta")} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── WHO IS IT FOR ── */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span
                className="fade-up text-xs font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.72 0.16 75)" }}
              >
                {t("ent.who.label")}
              </span>
              <h2
                className="fade-up text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight"
                style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)", transitionDelay: "60ms" }}
              >
                {t("ent.who.title")}
              </h2>
              <p
                className="fade-up text-lg leading-relaxed"
                style={{ color: "oklch(0.75 0.03 250)", transitionDelay: "120ms" }}
              >
                {t("ent.who.body")}
              </p>
            </div>

            <div className="fade-up space-y-4" style={{ transitionDelay: "180ms" }}>
              {whoItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-xl"
                  style={{ background: "oklch(0.22 0.06 250)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "oklch(0.72 0.16 75 / 0.15)" }}
                  >
                    <CheckCircle2 size={16} style={{ color: "oklch(0.72 0.16 75)" }} />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "oklch(0.80 0.02 250)" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINANCING ── */}
      <section className="py-24" style={{ background: "oklch(0.22 0.06 250)" }}>
        <div className="container">
          <div className="text-center mb-16">
            <span
              className="fade-up text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.72 0.16 75)" }}
            >
              {t("ent.loan.label")}
            </span>
            <h2
              className="fade-up text-4xl md:text-5xl font-bold mt-3"
              style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)", transitionDelay: "60ms" }}
            >
              {t("ent.loan.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {loanHighlights.map((item, i) => (
              <div
                key={i}
                className="fade-up card-lift p-6 rounded-xl text-center"
                style={{
                  background: "oklch(0.26 0.055 250)",
                  transitionDelay: `${i * 80}ms`
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "oklch(0.72 0.16 75 / 0.15)" }}
                >
                  <item.icon size={20} style={{ color: "oklch(0.72 0.16 75)" }} />
                </div>
                <p
                  className="text-lg font-bold mb-1"
                  style={{ color: "oklch(0.72 0.16 75)", fontFamily: "'Fraunces', serif" }}
                >
                  {item.value}
                </p>
                {item.label && (
                  <p className="text-xs uppercase tracking-wide" style={{ color: "oklch(0.65 0.04 250)" }}>
                    {item.label}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div
            className="fade-up p-8 rounded-xl gold-border-left max-w-3xl mx-auto"
            style={{ background: "oklch(0.26 0.055 250)" }}
          >
            <p className="text-lg leading-relaxed" style={{ color: "oklch(0.80 0.02 250)" }}>
              {t("ent.loan.body")}
            </p>
          </div>
        </div>
      </section>

      {/* ── SUPPORT ── */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="fade-up text-xs font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.72 0.16 75)" }}
              >
                {t("ent.support.label")}
              </span>
              <h2
                className="fade-up text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight"
                style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)", transitionDelay: "60ms" }}
              >
                {t("ent.support.title")}
              </h2>
              <p
                className="fade-up text-lg leading-relaxed mb-8"
                style={{ color: "oklch(0.75 0.03 250)", transitionDelay: "120ms" }}
              >
                {t("ent.support.body")}
              </p>

              <ul className="fade-up space-y-3" style={{ transitionDelay: "180ms" }}>
                {supportItems.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "oklch(0.72 0.16 75)" }}
                    >
                      <span className="text-xs font-bold" style={{ color: "oklch(0.14 0.06 250)" }}>
                        {i + 1}
                      </span>
                    </div>
                    <span className="text-sm" style={{ color: "oklch(0.80 0.02 250)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual block */}
            <div className="fade-up" style={{ transitionDelay: "100ms" }}>
              <div
                className="rounded-xl p-8 h-full min-h-80"
                style={{ background: "oklch(0.22 0.06 250)" }}
              >
                <div
                  className="text-3xl mb-4"
                  style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.72 0.16 75 / 0.4)" }}
                >
                  {t("tag.incubator")}
                </div>
                <p
                  className="text-2xl font-semibold leading-snug mb-6"
                  style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.85 0.02 250)" }}
                >
                  {t("tag.incubator.desc")}
                </p>
                <div className="space-y-3">
                  {[t("tag.businessplan"), t("tag.administration"), t("tag.legal"), t("tag.marketing"), t("tag.network")].map((tag) => (
                    <span
                      key={tag}
                      className="inline-block mr-2 mb-2 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: "oklch(0.72 0.16 75 / 0.15)", color: "oklch(0.72 0.16 75)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APPLY CTA ── */}
      <section
        className="py-24"
        style={{ background: "oklch(0.72 0.16 75)" }}
      >
        <div className="container text-center">
          <span
            className="fade-up text-xs font-bold uppercase tracking-widest"
            style={{ color: "oklch(0.25 0.06 250)" }}
          >
            {t("ent.apply.label")}
          </span>
          <h2
            className="fade-up text-4xl md:text-5xl font-bold mt-3 mb-6"
            style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.14 0.06 250)", transitionDelay: "60ms" }}
          >
            {t("ent.apply.title")}
          </h2>
          <p
            className="fade-up text-lg mb-8 max-w-xl mx-auto"
            style={{ color: "oklch(0.25 0.06 250)", transitionDelay: "120ms" }}
          >
            {t("ent.apply.body")}
          </p>
          <a
            href="mailto:info@ulpinvest.nl?subject=Aanvraag%20ULP%20Invest"
            className="fade-up inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105"
            style={{
              background: "oklch(0.14 0.06 250)",
              color: "oklch(0.72 0.16 75)",
              transitionDelay: "180ms"
            }}
          >
            {t("ent.apply.cta")} <ArrowRight size={20} />
          </a>
        </div>
      </section>

    </div>
  );
}
