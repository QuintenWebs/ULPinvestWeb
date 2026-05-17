/* =============================================================
   Investors Page – ULP Invest "Dark Atlas" Design
   Sections: Hero, Why Invest, Risk, Loan, Gift, Coaching
   ============================================================= */
import { ArrowRight, TrendingUp, Globe, Heart, Users, AlertTriangle, Plane } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const INVESTORS_IMG = "/manus-storage/PHOTO-2025-02-19-08-50-49_e73995aa.jpg";

export default function Investors() {
  const { t } = useLanguage();
  const revealRef = useScrollReveal();

  const whyItems = [
    { icon: TrendingUp, text: t("inv.why.item1") },
    { icon: Users, text: t("inv.why.item2") },
    { icon: Globe, text: t("inv.why.item3") },
    { icon: Plane, text: t("inv.why.item4") },
  ];

  return (
    <div ref={revealRef} className="min-h-screen pt-20" style={{ background: "oklch(0.18 0.06 250)" }}>

      {/* ── HERO ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={INVESTORS_IMG}
            alt="Investment partnership"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, oklch(0.12 0.06 250 / 0.92) 0%, oklch(0.12 0.06 250 / 0.65) 100%)" }}
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.72 0.16 75)" }}
            >
              {t("inv.hero.label")}
            </span>
            <h1
              className="text-4xl md:text-6xl font-bold mt-3 mb-6 leading-tight"
              style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.97 0.01 250)" }}
            >
              {t("inv.hero.title")}
            </h1>
            <p
              className="text-lg mb-8 leading-relaxed"
              style={{ color: "oklch(0.80 0.02 250)" }}
            >
              {t("inv.hero.subtitle")}
            </p>
            <a
              href="mailto:info@ulpinvest.nl?subject=Investering%20ULP%20Invest"
              className="btn-gold flex items-center gap-2 w-fit"
            >
              {t("inv.hero.cta")} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY INVEST ── */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <span
              className="fade-up text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.72 0.16 75)" }}
            >
              {t("inv.why.label")}
            </span>
            <h2
              className="fade-up text-4xl md:text-5xl font-bold mt-3 mb-6"
              style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)", transitionDelay: "60ms" }}
            >
              {t("inv.why.title")}
            </h2>
            <p
              className="fade-up text-lg max-w-2xl mx-auto"
              style={{ color: "oklch(0.70 0.03 250)", transitionDelay: "120ms" }}
            >
              {t("inv.why.body")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item, i) => (
              <div
                key={i}
                className="fade-up card-lift p-6 rounded-xl"
                style={{
                  background: "oklch(0.22 0.06 250)",
                  transitionDelay: `${i * 80}ms`
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "oklch(0.72 0.16 75 / 0.15)" }}
                >
                  <item.icon size={20} style={{ color: "oklch(0.72 0.16 75)" }} />
                </div>
                <p className="text-sm font-semibold leading-snug" style={{ color: "oklch(0.80 0.02 250)" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RISK TRANSPARENCY ── */}
      <section className="py-24" style={{ background: "oklch(0.22 0.06 250)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle size={20} style={{ color: "oklch(0.72 0.16 75)" }} />
                <span
                  className="fade-up text-xs font-bold uppercase tracking-widest"
                  style={{ color: "oklch(0.72 0.16 75)" }}
                >
                  {t("inv.risk.label")}
                </span>
              </div>
              <h2
                className="fade-up text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight"
                style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)", transitionDelay: "60ms" }}
              >
                {t("inv.risk.title")}
              </h2>
              <p
                className="fade-up text-lg leading-relaxed"
                style={{ color: "oklch(0.75 0.03 250)", transitionDelay: "120ms" }}
              >
                {t("inv.risk.body")}
              </p>
            </div>

            <div
              className="fade-up p-8 rounded-xl gold-border-left"
              style={{ background: "oklch(0.26 0.055 250)", transitionDelay: "100ms" }}
            >
              <p
                className="text-2xl font-semibold italic leading-relaxed"
                style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.85 0.02 250)" }}
              >
                "{t("inv.risk.quote")}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE WAYS TO INVEST ── */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <span
              className="fade-up text-xs font-bold uppercase tracking-widest"
              style={{ color: "oklch(0.72 0.16 75)" }}
            >
              {t("invest.how")}
            </span>
            <h2
              className="fade-up text-4xl md:text-5xl font-bold mt-3"
              style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)", transitionDelay: "60ms" }}
            >
              {t("invest.three_ways")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Loan */}
            <div
              className="fade-up card-lift p-8 rounded-xl flex flex-col"
              style={{ background: "oklch(0.22 0.06 250)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                style={{ background: "oklch(0.72 0.16 75 / 0.15)" }}
              >
                <TrendingUp size={20} style={{ color: "oklch(0.72 0.16 75)" }} />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "oklch(0.72 0.16 75)" }}
              >
                {t("inv.loan.label")}
              </span>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)" }}
              >
                {t("inv.loan.title")}
              </h3>
              <p className="text-sm leading-relaxed mb-6 flex-grow" style={{ color: "oklch(0.70 0.03 250)" }}>
                {t("inv.loan.body")}
              </p>
              <div className="space-y-2 mb-6">
                {[t("inv.loan.rate"), t("inv.loan.min"), t("inv.loan.pref")].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "oklch(0.72 0.16 75)" }}
                    />
                    <span style={{ color: "oklch(0.75 0.03 250)" }}>{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="mailto:info@ulpinvest.nl?subject=Lening%20ULP%20Invest"
                className="btn-outline-gold text-center text-sm"
              >
                {t("inv.loan.cta")}
              </a>
            </div>

            {/* Gift */}
            <div
              className="fade-up card-lift p-8 rounded-xl flex flex-col"
              style={{ background: "oklch(0.22 0.06 250)", transitionDelay: "100ms" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                style={{ background: "oklch(0.72 0.16 75 / 0.15)" }}
              >
                <Heart size={20} style={{ color: "oklch(0.72 0.16 75)" }} />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "oklch(0.72 0.16 75)" }}
              >
                {t("inv.gift.label")}
              </span>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)" }}
              >
                {t("inv.gift.title")}
              </h3>
              <p className="text-sm leading-relaxed mb-6 flex-grow" style={{ color: "oklch(0.70 0.03 250)" }}>
                {t("inv.gift.body")}
              </p>
              <div
                className="p-4 rounded-lg mb-6 space-y-2"
                style={{ background: "oklch(0.26 0.055 250)" }}
              >
                <p className="text-sm font-mono" style={{ color: "oklch(0.72 0.16 75)" }}>
                  {t("inv.gift.iban")}
                </p>
                <p className="text-xs" style={{ color: "oklch(0.65 0.04 250)" }}>
                  {t("inv.gift.name")}
                </p>
                <p
                  className="text-xs font-semibold mt-2 pt-2 border-t"
                  style={{ color: "oklch(0.72 0.16 75)", borderColor: "oklch(1 0 0 / 10%)" }}
                >
                  {t("inv.gift.instruction")}
                </p>
              </div>
              <a
                href="mailto:info@ulpinvest.nl?subject=Gift%20ULP%20Invest"
                className="btn-outline-gold text-center text-sm"
              >
                {t("invest.contact")}
              </a>
            </div>

            {/* Coaching */}
            <div
              className="fade-up card-lift p-8 rounded-xl flex flex-col"
              style={{ background: "oklch(0.22 0.06 250)", transitionDelay: "200ms" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                style={{ background: "oklch(0.72 0.16 75 / 0.15)" }}
              >
                <Users size={20} style={{ color: "oklch(0.72 0.16 75)" }} />
              </div>
              <span
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "oklch(0.72 0.16 75)" }}
              >
                {t("inv.coach.label")}
              </span>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "'Fraunces', serif", color: "oklch(0.95 0.01 250)" }}
              >
                {t("inv.coach.title")}
              </h3>
              <p className="text-sm leading-relaxed mb-6 flex-grow" style={{ color: "oklch(0.70 0.03 250)" }}>
                {t("inv.coach.body")}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Hospitality", "Woodworking", "SME", t("tag.marketing"), t("tag.administration")].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "oklch(0.72 0.16 75 / 0.15)", color: "oklch(0.72 0.16 75)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div
                className="flex items-center gap-2 text-xs mb-6"
                style={{ color: "oklch(0.65 0.04 250)" }}
              >
                <Plane size={12} />
                {t("inv.coach.visit")}
              </div>
              <a
                href="mailto:info@ulpinvest.nl?subject=Coaching%20ULP%20Invest"
                className="btn-outline-gold text-center text-sm"
              >
                {t("inv.coach.cta")}
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
