/* =============================================================
   Home Page – ULP Invest "Dark Atlas" Design
   Sections: Hero, Stats, What We Do, Microfinance, Why It Works, Cases, CTA
   ============================================================= */
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663668553315/UCPcnffX9vjrwurBhixUZj/hero-usambara-SLyqoHMyyESP8GyuTWMNBM.webp";
const ENTREPRENEUR_IMG = "/images/coaching.jpg";
const LANDSCAPE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663668553315/UCPcnffX9vjrwurBhixUZj/usambara-landscape-TxKRukdrenTyPFKVocwUJb.webp";

export default function Home() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  const caseStudies = [
    {
      key: "case1",
      icon: "🪵",
      investment: "€2.500",
      image: "/images/woodworking.jpg",
    },
    {
      key: "case2",
      icon: "🏡",
      investment: "€3.000",
      image: "/images/hospitality.webp",
    },
    {
      key: "case3",
      icon: "🌾",
      investment: "€1.800",
      image: "/images/agriculture.webp",
    },
  ];

  const whyItems = [
    t("home.why.item1"),
    t("home.why.item2"),
    t("home.why.item3"),
    t("home.why.item4"),
  ];

  const microItems = [
    t("home.micro.item1"),
    t("home.micro.item2"),
    t("home.micro.item3"),
    t("home.micro.item4"),
  ];

  return (
    <div ref={revealRef} className="min-h-screen" style={{ background: "oklch(0.18 0.06 250)" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-end pb-16 pt-20">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMG}
            alt="Usambara Mountains Tanzania"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, oklch(0.12 0.06 250 / 0.92) 0%, oklch(0.12 0.06 250 / 0.7) 50%, oklch(0.12 0.06 250 / 0.3) 100%)"
            }}
          />
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            {/* Label */}
            <div className="flex items-center gap-2 mb-6">
              <MapPin size={14} style={{ color: "oklch(0.72 0.16 75)" }} />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.72 0.16 75)" }}
              >
                {t("home.hero.label")}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-5xl md:text-7xl font-bold leading-tight mb-6"
              style={{
                fontFamily: "'Fraunces', serif",
                color: "oklch(0.97 0.01 250)",
                whiteSpace: "pre-line"
              }}
            >
              {t("home.hero.title")}
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl mb-10 max-w-xl leading-relaxed"
              style={{ color: "oklch(0.80 0.02 250)" }}
            >
              {t("home.hero.subtitle")}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="/entrepreneurs" className="btn-gold flex items-center gap-2">
                {t("home.hero.cta.entrepreneurs")}
                <ArrowRight size={16} />
              </Link>
              <Link href="/investors" className="btn-outline-gold flex items-center gap-2">
                {t("home.hero.cta.investors")}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section style={{ background: "oklch(0.72 0.16 75)" }} className="py-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "€7.300+", label: t("home.stats.invested") },
              { value: "3", label: t("home.stats.businesses") },
              { value: "2021", label: "Opgericht" },
              { value: t("home.stats.region.value"), label: t("home.stats.region") },
            ].map((stat, i) => (
              <div key={i}>
                <div
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.14 0.06 250)" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-semibold uppercase tracking-wide" style={{ color: "oklch(0.25 0.06 250)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="fade-up order-2 lg:order-1">
              <div className="relative">
                <img
                  src={ENTREPRENEUR_IMG}
                  alt="Tanzanian entrepreneur"
                  className="w-full h-96 object-cover rounded-lg"
                  style={{ filter: "brightness(0.9)" }}
                />
                {/* Gold quote overlay */}
                <div
                  className="absolute bottom-6 left-6 right-6 p-5 rounded-lg"
                  style={{ background: "oklch(0.14 0.06 250 / 0.9)", backdropFilter: "blur(8px)" }}
                >
                  <p
                    className="text-xl font-semibold italic"
                    style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.72 0.16 75)" }}
                  >
                    "{t("home.whatwedo.quote")}"
                  </p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="fade-up">
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "oklch(0.72 0.16 75)" }}
                >
                  {t("home.whatwedo.label")}
                </span>
              </div>
              <h2
                className="fade-up text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight"
                style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)", transitionDelay: "60ms" }}
              >
                {t("home.whatwedo.title")}
              </h2>
              <p
                className="fade-up text-lg leading-relaxed mb-8"
                style={{ color: "oklch(0.75 0.03 250)", transitionDelay: "120ms" }}
              >
                {t("home.whatwedo.body")}
              </p>

              {/* Micro items */}
              <div className="fade-up" style={{ transitionDelay: "180ms" }}>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: "oklch(0.72 0.16 75)" }}
                >
                  {t("home.micro.label")}
                </p>
                <ul className="space-y-3">
                  {microItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={16} style={{ color: "oklch(0.72 0.16 75)", flexShrink: 0 }} />
                      <span className="text-sm" style={{ color: "oklch(0.80 0.02 250)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <p
                  className="mt-5 text-sm font-semibold"
                  style={{ color: "oklch(0.72 0.16 75)" }}
                >
                  {t("home.micro.range")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY IT WORKS ── */}
      <section
        className="py-24"
        style={{ background: "oklch(0.22 0.06 250)" }}
      >
        <div className="container">
          <div className="text-center mb-16">
            <span
              className="fade-up text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.72 0.16 75)" }}
            >
              {t("home.why.label")}
            </span>
            <h2
              className="fade-up text-4xl md:text-5xl font-bold mt-3"
              style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)", transitionDelay: "60ms" }}
            >
              {t("home.why.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item, i) => (
              <div
                key={i}
                className="fade-up card-lift p-6 rounded-xl"
                style={{
                  background: "oklch(0.26 0.055 250)",
                  transitionDelay: `${i * 80}ms`,
                  borderLeft: "3px solid oklch(0.72 0.16 75)"
                }}
              >
                <div
                  className="text-3xl font-bold mb-3"
                  style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.72 0.16 75 / 0.4)" }}
                >
                  0{i + 1}
                </div>
                <p className="text-sm font-semibold leading-snug" style={{ color: "oklch(0.85 0.02 250)" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="py-24">
        <div className="container">
          <div className="mb-16">
            <span
              className="fade-up text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.72 0.16 75)" }}
            >
              {t("home.cases.label")}
            </span>
            <h2
              className="fade-up text-4xl md:text-5xl font-bold mt-3 mb-4"
              style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)", transitionDelay: "60ms" }}
            >
              {t("home.cases.title")}
            </h2>
            <p
              className="fade-up text-lg max-w-2xl"
              style={{ color: "oklch(0.70 0.03 250)", transitionDelay: "120ms" }}
            >
              {t("home.cases.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((c, i) => (
              <div
                key={c.key}
                className="fade-up card-lift rounded-xl overflow-hidden"
                style={{
                  background: "oklch(0.22 0.06 250)",
                  transitionDelay: `${i * 100}ms`
                }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={c.image}
                    alt={t(`home.cases.${c.key}.title`)}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: "oklch(0.72 0.16 75)", color: "oklch(0.14 0.06 250)" }}
                  >
                    {t(`home.cases.${c.key}.tag`)}
                  </div>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)" }}
                  >
                    {t(`home.cases.${c.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "oklch(0.70 0.03 250)" }}>
                    {t(`home.cases.${c.key}.desc`)}
                  </p>
                  <div
                    className="flex items-center justify-between pt-4 border-t text-xs font-semibold"
                    style={{ borderColor: "oklch(1 0 0 / 10%)" }}
                  >
                    <span style={{ color: "oklch(0.65 0.04 250)" }}>{t("home.cases.investment")}</span>
                    <span style={{ color: "oklch(0.72 0.16 75)" }}>{c.investment}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LANDSCAPE BANNER ── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={LANDSCAPE_IMG}
            alt="Usambara Mountains landscape"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "oklch(0.12 0.06 250 / 0.75)" }}
          />
        </div>
        <div className="container relative z-10 text-center">
          <p
            className="fade-up text-3xl md:text-5xl font-bold mb-8 max-w-3xl mx-auto leading-tight"
            style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.97 0.01 250)" }}
          >
            "Samen bouwen we aan kansen in de Usambara Mountains."
          </p>
          <div className="fade-up flex flex-wrap justify-center gap-4" style={{ transitionDelay: "120ms" }}>
            <Link href="/entrepreneurs" className="btn-gold flex items-center gap-2">
              {t("home.hero.cta.entrepreneurs")} <ArrowRight size={16} />
            </Link>
            <Link href="/investors" className="btn-outline-gold flex items-center gap-2">
              {t("home.hero.cta.investors")} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
