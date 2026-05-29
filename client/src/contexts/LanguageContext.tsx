import React, { createContext, useContext, useState } from "react";

export type Language = "nl" | "en" | "sw";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  nl: {
    // Navigation
    "nav.entrepreneurs": "Voor Ondernemers",
    "nav.investors": "Voor Investeerders",
    "nav.about": "Over Ons",
    "nav.contact": "Contact",
    "nav.tagline": "Microlening, macro impact.",
    "nav.home": "Home",

    // Home / Hero
    "home.hero.label": "Usambara Mountains, Tanzania",
    "home.hero.title": "Kleine leningen,\ngrote kansen.",
    "home.hero.subtitle": "ULP Invest ondersteunt kleine ondernemers met microkredieten én persoonlijke begeleiding. Onderdeel van het Ubuntu Leadership Programma.",
    "home.hero.cta.entrepreneurs": "Voor ondernemers",
    "home.hero.cta.investors": "Voor investeerders",
    "home.stats.invested": "Gemiddelde investering",
    "home.stats.businesses": "Bedrijven ondersteund",
    "home.stats.region": "Regio",
    "home.stats.region.value": "Usambara Mountains",

    // What we do
    "home.whatwedo.label": "Wat doen wij?",
    "home.whatwedo.title": "Meer dan een lening",
    "home.whatwedo.body": "Wij geloven dat iedereen het recht heeft om te ondernemen. Niet iedereen krijgt een kans bij de bank - maar met een goed idee, motivatie en de juiste steun kun je wél starten en groeien.",
    "home.whatwedo.quote": "Kleine steun, groot verschil.",

    // Microfinance
    "home.micro.label": "Wat is microfinanciering?",
    "home.micro.title": "Investeren in groei",
    "home.micro.body": "Microfinanciering betekent kleine leningen met een groot effect. Onze microkredieten geven je de kans om te investeren in je bedrijf.",
    "home.micro.item1": "Materiaal of gereedschap",
    "home.micro.item2": "Inrichting van je werkplek",
    "home.micro.item3": "Marketing of vervoer",
    "home.micro.item4": "Eerste voorraad voor je nieuwe zaak",
    "home.micro.range": "Leningen van €500 tot €5.000, met flexibele voorwaarden.",

    // Why it works
    "home.why.label": "Waarom het werkt",
    "home.why.title": "Onze aanpak",
    "home.why.item1": "Toegang tot kapitaal én kennis",
    "home.why.item2": "Meer kans op duurzaam succes",
    "home.why.item3": "Sterkere lokale economie",
    "home.why.item4": "Zelfstandigheid en trots voor de ondernemer",

    // Cases
    "home.cases.label": "Voorbeeldprojecten",
    "home.cases.title": "Bedrijven die al groeien",
    "home.cases.subtitle": "Drie inspirerende voorbeelden van ondernemers die wij al ondersteunen in de Usambara Mountains.",
    "home.cases.case1.title": "Houtbewerkingswerkplaats",
    "home.cases.case1.desc": "Een lokale timmerman investeerde in professionele machines en een grotere werkplaats. Zijn bedrijf levert nu meubels aan hotels en particulieren in de regio.",
    "home.cases.case1.tag": "Ambacht & Productie",
    "home.cases.case2.title": "Guesthouse & Hospitality",
    "home.cases.case2.desc": "Een jonge ondernemer opende een gastenhuis voor wandelaars en toeristen in de Usambara Mountains. Met begeleiding groeide het van 3 naar 8 kamers.",
    "home.cases.case2.tag": "Toerisme & Hospitality",
    "home.cases.case3.title": "Agrarische Verwerking",
    "home.cases.case3.desc": "Een boerenfamilie investeerde in verwerkingsapparatuur voor lokale producten. Ze verkopen nu verwerkte goederen aan markten in Lushoto en omgeving.",
    "home.cases.case3.tag": "Landbouw & Voeding",
    "home.cases.investment": "Investering",
    "home.cases.sector": "Sector",

    // Entrepreneurs page
    "ent.hero.label": "Voor Ondernemers",
    "ent.hero.title": "Heeft uw bedrijf groeipotentieel?",
    "ent.hero.subtitle": "ULP Invest biedt microkredieten van €500 tot €5.000 én persoonlijke begeleiding voor kleine ondernemers in de Usambara Mountains.",
    "ent.hero.cta": "Stuur ons uw plan",

    "ent.who.label": "Voor wie?",
    "ent.who.title": "Wij zoeken ondernemers met ambitie",
    "ent.who.body": "Onze microkredieten en begeleiding zijn er voor kleine bedrijven die al actief zijn en willen groeien. Geen starters zonder plan, maar ondernemers met bewezen activiteit en een helder groeiverhaal.",
    "ent.who.item1": "Bestaand klein bedrijf met activiteit",
    "ent.who.item2": "Duidelijk plan voor groei",
    "ent.who.item3": "Bereid tot terugbetaling over 3–5 jaar",
    "ent.who.item4": "Gevestigd in de Usambara Mountains regio",

    "ent.loan.label": "Financiering",
    "ent.loan.title": "Eerlijke leningen, flexibele voorwaarden",
    "ent.loan.body": "We verstrekken investeringen tussen €500 en €5.000 met een terugbetalingstermijn van 3 tot 5 jaar. Versneld aflossen is altijd mogelijk.",
    "ent.loan.amount": "€500 – €5.000",
    "ent.loan.term": "3 tot 5 jaar",
    "ent.loan.early": "Versneld aflossen mogelijk",
    "ent.loan.rate": "Eerlijke rente",

    "ent.support.label": "Begeleiding op maat",
    "ent.support.title": "We laten je niet alleen staan",
    "ent.support.body": "Naast de lening krijg je persoonlijke begeleiding door onze coaches en adviseurs. We helpen je stap voor stap naar duurzaam succes.",
    "ent.support.item1": "Businessplan opstellen",
    "ent.support.item2": "Financiële administratie & boekhouding",
    "ent.support.item3": "Fiscale & juridische ondersteuning",
    "ent.support.item4": "Groeistrategie & marketingadvies",
    "ent.support.item5": "Toegang tot netwerk van ondernemers",

    "ent.apply.label": "Aanvragen",
    "ent.apply.title": "Klaar om te groeien?",
    "ent.apply.body": "Stuur ons een e-mail met een korte beschrijving van uw bedrijf en uw groeiplanning. Wij nemen contact met u op.",
    "ent.apply.cta": "Stuur uw aanvraag",

    // Investors page
    "inv.hero.label": "Voor Investeerders",
    "inv.hero.title": "Investeer in mensen en potentieel",
    "inv.hero.subtitle": "Draag bij aan economische ontwikkeling in Tanzania. Als lening, als gift, of als coach - elke bijdrage telt.",
    "inv.hero.cta": "Neem contact op",

    "inv.why.label": "Waarom investeren?",
    "inv.why.title": "Impact die je kunt zien",
    "inv.why.body": "ULP Invest werkt in een regio met enorm potentieel maar beperkte toegang tot kapitaal. Uw investering helpt ondernemers groeien, werkgelegenheid creëren en de lokale economie versterken.",
    "inv.why.item1": "Directe impact op lokale ondernemers",
    "inv.why.item2": "Werkgelegenheid in de Usambara regio",
    "inv.why.item3": "Economische ontwikkeling Tanzania",
    "inv.why.item4": "Jaarlijks bezoek aan de projecten mogelijk",

    "inv.risk.label": "Eerlijk over risico",
    "inv.risk.title": "Hoog risico, hoge impact",
    "inv.risk.body": "We zijn eerlijk: dit is een complex gebied in ontwikkeling. Niet alle leningen zullen volledig worden terugbetaald. Daarom werken we met een mix van commerciële leningen en giften.",
    "inv.risk.quote": "Uw investering is een daad van vertrouwen in mensen met een droom.",

    "inv.loan.label": "Lening verstrekken",
    "inv.loan.title": "Lening aan ULP Invest",
    "inv.loan.body": "U kunt een lening verstrekken aan ULP Invest. Wij stellen een leningsovereenkomst op en zorgen voor transparante rapportage.",
    "inv.loan.rate": "Rente op Euribor-niveau",
    "inv.loan.min": "Minimale looptijd: 5 jaar",
    "inv.loan.pref": "Voorkeur: 10 jaar",
    "inv.loan.cta": "E-mail ons voor een leningsovereenkomst",

    "inv.gift.label": "Schenking",
    "inv.gift.title": "Gift overmaken",
    "inv.gift.body": "Een gift is ook zeer welkom. Maak over naar:",
    "inv.gift.instruction": "Vermeld bij overboeking: ULP Invest – Gift",
    "inv.gift.iban": "IBAN: NL00 XXXX 0000 0000 00",
    "inv.gift.name": "T.n.v.: Stichting Ubuntu Leadership Program",

    "inv.coach.label": "Coaching",
    "inv.coach.title": "Deel uw expertise",
    "inv.coach.body": "Heeft u ervaring in hospitality, houtbewerking, MKB-management, marketing of administratie? Dan kunt u ondernemers ook direct coachen tijdens een jaarlijks bezoek aan Tanzania.",
    "inv.coach.visit": "Jaarlijks bezoek aan Tanzania mogelijk",
    "inv.coach.cta": "Meld u aan als coach",

    // About page
    "about.hero.label": "Over Ons",
    "about.hero.title": "Onderdeel van het Ubuntu Leadership Programma",
    "about.hero.subtitle": "ULP Invest is één van de drie pijlers van het Ubuntu Leadership Programma - een initiatief dat jongeren en ondernemers in de Usambara Mountains ondersteunt.",

    "about.ulp.label": "Ubuntu Leadership Programma",
    "about.ulp.title": "Drie pijlers, één missie",
    "about.ulp.body": "Het Ubuntu Leadership Programma verbindt onderwijs, leiderschap en economische ontwikkeling in Tanzania. Bezoek de hoofdwebsite voor meer informatie.",
    "about.ulp.pillar1.title": "Jaarlijkse Reis",
    "about.ulp.pillar1.desc": "Een jaarlijkse trip naar Tanzania waarbij deelnemers de regio bezoeken, projecten ontmoeten en bijdragen aan de gemeenschap.",
    "about.ulp.pillar2.title": "Business School",
    "about.ulp.pillar2.desc": "Een traject voor jongeren in de Usambara Mountains: stageplekken, ondernemerschap en werkervaring zonder de regio te verlaten.",
    "about.ulp.pillar3.title": "ULP Invest",
    "about.ulp.pillar3.desc": "Microkredieten en begeleiding voor kleine ondernemers met groeipotentieel in de Usambara Mountains.",
    "about.ulp.link": "Bezoek ubuntuleadershipprogram.nl",

    "about.team.label": "Ons Team",
    "about.team.more": "+ 3 teamleden - profielen volgen binnenkort.",
    "about.team.title": "De mensen achter ULP Invest",
    "about.pillar.active": "Dit zijn wij",
    "about.team.theo.name": "Theo van Stuijvenberg",
    "about.team.theo.role": "Fondsbeheerder ULP Invest",
    "about.team.theo.bio": "Theo is fondsbeheerder van ULP Invest en aanspreekpunt voor investeerders. Hij is verantwoordelijk voor het beheer van het investeringsfonds, communicatie met investeerders en de financiële monitoring van investeringen.",
    "about.team.theo.phone": "06 29550134",
    "about.team.hans.name": "Hans Valkenburg",
    "about.team.hans.role": "Oprichter Ubuntu Leadership Program",
    "about.team.hans.bio": "Hans is oprichter van het Ubuntu Leadership Program, de moederorganisatie van ULP Invest. Vanuit deze rol is hij betrokken bij de visie en strategie van ULP Invest en de ontwikkeling van ondernemerschap in Tanzania.",

    "about.mission.label": "Onze Missie",
    "about.mission.title": "Microlening, macro impact.",
    "about.mission.body": "We geven mensen niet alleen financiële steun, maar ook het vertrouwen en de kennis om hun toekomst zelf in handen te nemen. Samen bouwen we aan kansen in de Usambara Mountains.",

    // Contact
    "contact.title": "Contact",
    "contact.email": "E-mail ons",
    "contact.phone": "Telefoon / WhatsApp",
    "contact.website": "Hoofdwebsite ULP",
    "contact.follow": "Volg ons",

    // Footer
    "footer.tagline": "Microlening, macro impact.",
    "footer.part_of": "Onderdeel van het",
    "footer.rights": "Alle rechten voorbehouden.",
    "footer.entrepreneurs": "Voor Ondernemers",
    "footer.investors": "Voor Investeerders",
    "footer.about": "Over Ons",
    "footer.contact": "Contact",

    "tag.businessplan": "Businessplan",
    "tag.administration": "Administratie",
    "tag.legal": "Juridisch",
    "tag.marketing": "Marketing",
    "tag.network": "Netwerk",
    "tag.incubator": "Incubator",
    "tag.incubator.desc": "Een incubator-omgeving voor groeiende ondernemers.",
    "invest.how": "Hoe kunt u bijdragen?",
    "invest.three_ways": "Drie manieren van investeren",
    "invest.contact": "Neem contact op",
    "home": "Home",

    // Stats
    "home.stats.founded": "Opgericht",

    // Mission quote on Home page
    "home.mission.quote": "Samen bouwen we aan kansen in de Usambara Mountains.",

    // Footer
    "footer.nav.heading": "Navigatie",
    "footer.ulp.program": "Het Programma",
    "footer.ulp.contact": "Contact ULP",
  },

  en: {
    "nav.entrepreneurs": "For Entrepreneurs",
    "nav.investors": "For Investors",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.tagline": "Microloan, macro impact.",
    "nav.home": "Home",

    "home.hero.label": "Usambara Mountains, Tanzania",
    "home.hero.title": "Small loans,\nbig opportunities.",
    "home.hero.subtitle": "ULP Invest supports small entrepreneurs with microloans and personal coaching. Part of the Ubuntu Leadership Program.",
    "home.hero.cta.entrepreneurs": "For entrepreneurs",
    "home.hero.cta.investors": "For investors",
    "home.stats.invested": "Average Investment",
    "home.stats.businesses": "Businesses supported",
    "home.stats.region": "Region",
    "home.stats.region.value": "Usambara Mountains",

    "home.whatwedo.label": "What do we do?",
    "home.whatwedo.title": "More than a loan",
    "home.whatwedo.body": "We believe everyone has the right to entrepreneurship. Not everyone gets a chance at the bank - but with a good idea, motivation and the right support, you can start and grow.",
    "home.whatwedo.quote": "Small support, big difference.",

    "home.micro.label": "What is microfinance?",
    "home.micro.title": "Investing in growth",
    "home.micro.body": "Microfinance means small loans with a big effect. Our microloans give you the opportunity to invest in your business.",
    "home.micro.item1": "Materials or tools",
    "home.micro.item2": "Setting up your workspace",
    "home.micro.item3": "Marketing or transport",
    "home.micro.item4": "First stock for your new business",
    "home.micro.range": "Loans from €500 to €5,000, with flexible terms.",

    "home.why.label": "Why it works",
    "home.why.title": "Our approach",
    "home.why.item1": "Access to capital and knowledge",
    "home.why.item2": "Greater chance of sustainable success",
    "home.why.item3": "Stronger local economy",
    "home.why.item4": "Independence and pride for the entrepreneur",

    "home.cases.label": "Example Projects",
    "home.cases.title": "Businesses already growing",
    "home.cases.subtitle": "Three inspiring examples of entrepreneurs we already support in the Usambara Mountains.",
    "home.cases.case1.title": "Woodworking Workshop",
    "home.cases.case1.desc": "A local carpenter invested in professional machines and a larger workshop. His business now supplies furniture to hotels and private clients in the region.",
    "home.cases.case1.tag": "Craft & Production",
    "home.cases.case2.title": "Guesthouse & Hospitality",
    "home.cases.case2.desc": "A young entrepreneur opened a guesthouse for hikers and tourists in the Usambara Mountains. With coaching, it grew from 3 to 8 rooms.",
    "home.cases.case2.tag": "Tourism & Hospitality",
    "home.cases.case3.title": "Agricultural Processing",
    "home.cases.case3.desc": "A farming family invested in processing equipment for local produce. They now sell processed goods to markets in Lushoto and surrounding areas.",
    "home.cases.case3.tag": "Agriculture & Food",
    "home.cases.investment": "Investment",
    "home.cases.sector": "Sector",

    "ent.hero.label": "For Entrepreneurs",
    "ent.hero.title": "Does your business have growth potential?",
    "ent.hero.subtitle": "ULP Invest offers microloans from €500 to €5,000 and personal coaching for small entrepreneurs in the Usambara Mountains.",
    "ent.hero.cta": "Send us your plan",

    "ent.who.label": "Who is it for?",
    "ent.who.title": "We look for ambitious entrepreneurs",
    "ent.who.body": "Our microloans and coaching are for small businesses that are already active and want to grow. Not starters without a plan, but entrepreneurs with proven activity and a clear growth story.",
    "ent.who.item1": "Existing small business with activity",
    "ent.who.item2": "Clear plan for growth",
    "ent.who.item3": "Willing to repay over 3–5 years",
    "ent.who.item4": "Based in the Usambara Mountains region",

    "ent.loan.label": "Financing",
    "ent.loan.title": "Fair loans, flexible terms",
    "ent.loan.body": "We provide investments between €500 and €5,000 with a repayment period of 3 to 5 years. Early repayment is always possible.",
    "ent.loan.amount": "€500 – €5,000",
    "ent.loan.term": "3 to 5 years",
    "ent.loan.early": "Early repayment possible",
    "ent.loan.rate": "Fair interest rate",

    "ent.support.label": "Tailored support",
    "ent.support.title": "We don't leave you alone",
    "ent.support.body": "In addition to the loan, you receive personal coaching from our coaches and advisors. We help you step by step toward sustainable success.",
    "ent.support.item1": "Business plan development",
    "ent.support.item2": "Financial administration & bookkeeping",
    "ent.support.item3": "Tax & legal support",
    "ent.support.item4": "Growth strategy & marketing advice",
    "ent.support.item5": "Access to entrepreneur network",

    "ent.apply.label": "Apply",
    "ent.apply.title": "Ready to grow?",
    "ent.apply.body": "Send us an email with a brief description of your business and your growth plan. We will get in touch.",
    "ent.apply.cta": "Send your application",

    "inv.hero.label": "For Investors",
    "inv.hero.title": "Invest in people and potential",
    "inv.hero.subtitle": "Contribute to economic development in Tanzania. As a loan, as a gift, or as a coach - every contribution counts.",
    "inv.hero.cta": "Get in touch",

    "inv.why.label": "Why invest?",
    "inv.why.title": "Impact you can see",
    "inv.why.body": "ULP Invest works in a region with enormous potential but limited access to capital. Your investment helps entrepreneurs grow, creates jobs and strengthens the local economy.",
    "inv.why.item1": "Direct impact on local entrepreneurs",
    "inv.why.item2": "Employment in the Usambara region",
    "inv.why.item3": "Economic development Tanzania",
    "inv.why.item4": "Annual visit to the projects possible",

    "inv.risk.label": "Honest about risk",
    "inv.risk.title": "High risk, high impact",
    "inv.risk.body": "We are honest: this is a complex developing region. Not all loans will be fully repaid. That is why we work with a mix of commercial loans and gifts.",
    "inv.risk.quote": "Your investment is an act of trust in people with a dream.",

    "inv.loan.label": "Provide a loan",
    "inv.loan.title": "Loan to ULP Invest",
    "inv.loan.body": "You can provide a loan to ULP Invest. We draw up a loan agreement and ensure transparent reporting.",
    "inv.loan.rate": "Interest at Euribor level",
    "inv.loan.min": "Minimum term: 5 years",
    "inv.loan.pref": "Preferred: 10 years",
    "inv.loan.cta": "Email us for a loan agreement",

    "inv.gift.label": "Donation",
    "inv.gift.title": "Make a donation",
    "inv.gift.body": "A donation is also very welcome. Transfer to:",
    "inv.gift.instruction": "Please state: ULP Invest – Gift",
    "inv.gift.iban": "IBAN: NL00 XXXX 0000 0000 00",
    "inv.gift.name": "Payable to: Stichting Ubuntu Leadership Program",

    "inv.coach.label": "Coaching",
    "inv.coach.title": "Share your expertise",
    "inv.coach.body": "Do you have experience in hospitality, woodworking, SME management, marketing or administration? You can also directly coach entrepreneurs during an annual visit to Tanzania.",
    "inv.coach.visit": "Annual visit to Tanzania possible",
    "inv.coach.cta": "Register as a coach",

    "about.hero.label": "About Us",
    "about.hero.title": "Part of the Ubuntu Leadership Program",
    "about.hero.subtitle": "ULP Invest is one of the three pillars of the Ubuntu Leadership Program - an initiative that supports young people and entrepreneurs in the Usambara Mountains.",

    "about.ulp.label": "Ubuntu Leadership Program",
    "about.ulp.title": "Three pillars, one mission",
    "about.ulp.body": "The Ubuntu Leadership Program connects education, leadership and economic development in Tanzania. Visit the main website for more information.",
    "about.ulp.pillar1.title": "Annual Trip",
    "about.ulp.pillar1.desc": "An annual trip to Tanzania where participants visit the region, meet projects and contribute to the community.",
    "about.ulp.pillar2.title": "Business School",
    "about.ulp.pillar2.desc": "A program for young people in the Usambara Mountains: internships, entrepreneurship and work experience without leaving the region.",
    "about.ulp.pillar3.title": "ULP Invest",
    "about.ulp.pillar3.desc": "Microloans and coaching for small entrepreneurs with growth potential in the Usambara Mountains.",
    "about.ulp.link": "Visit ubuntuleadershipprogram.nl",

    "about.team.label": "Our Team",
    "about.team.more": "+ 3 team members - profiles coming soon.",
    "about.team.title": "The people behind ULP Invest",
    "about.pillar.active": "This is us",
    "about.team.theo.name": "Theo van Stuijvenberg",
    "about.team.theo.role": "Fund Manager ULP Invest",
    "about.team.theo.bio": "Theo is fund manager of ULP Invest and the point of contact for investors. Together with the team he is responsible for managing the investment fund, communicating with investors and financial monitoring of investments.",
    "about.team.theo.phone": "06 29550134",
    "about.team.hans.name": "Hans Valkenburg",
    "about.team.hans.role": "Founder Ubuntu Leadership Program",
    "about.team.hans.bio": "Hans is the founder of the Ubuntu Leadership Program, the parent organization of ULP Invest. In this role, he is involved in the vision and strategy of ULP Invest and the development of entrepreneurship in Tanzania.",

    "about.mission.label": "Our Mission",
    "about.mission.title": "Microloan, macro impact.",
    "about.mission.body": "We give people not only financial support, but also the confidence and knowledge to take their future into their own hands. Together we build opportunities in the Usambara Mountains.",

    "contact.title": "Contact",
    "contact.email": "Email us",
    "contact.phone": "Phone / WhatsApp",
    "contact.website": "ULP Main Website",
    "contact.follow": "Follow us",

    "footer.tagline": "Microloan, macro impact.",
    "footer.part_of": "Part of the",
    "footer.rights": "All rights reserved.",
    "footer.entrepreneurs": "For Entrepreneurs",
    "footer.investors": "For Investors",
    "footer.about": "About Us",
    "footer.contact": "Contact",

    "tag.businessplan": "Business Plan",
    "tag.administration": "Administration",
    "tag.legal": "Legal",
    "tag.marketing": "Marketing",
    "tag.network": "Network",
    "tag.incubator": "Incubator",
    "tag.incubator.desc": "An incubator environment for growing entrepreneurs.",
    "invest.how": "How can you contribute?",
    "invest.three_ways": "Three ways to invest",
    "invest.contact": "Get in touch",
    "home": "Home",

    // Stats
    "home.stats.founded": "Founded",

    // Mission quote on Home page
    "home.mission.quote": "Together we build opportunities in the Usambara Mountains.",

    // Footer
    "footer.nav.heading": "Navigation",
    "footer.ulp.program": "The Program",
    "footer.ulp.contact": "Contact ULP",
  },

  sw: {
    "nav.entrepreneurs": "Kwa Wajasiriamali",
    "nav.investors": "Kwa Wawekezaji",
    "nav.about": "Kuhusu Sisi",
    "nav.contact": "Wasiliana",
    "nav.home": "Nyumbani",
    "nav.tagline": "Mkopo mdogo, athari kubwa.",

    "home.hero.label": "Milima ya Usambara, Tanzania",
    "home.hero.title": "Mikopo midogo,\nfursa kubwa.",
    "home.hero.subtitle": "ULP Invest inasaidia wajasiriamali wadogo kwa mikopo na mwongozo wa kibinafsi. Sehemu ya Programu ya Uongozi ya Ubuntu.",
    "home.hero.cta.entrepreneurs": "Kwa wajasiriamali",
    "home.hero.cta.investors": "Kwa wawekezaji",
    "home.stats.invested": "Uwekezaji wa Wastani",
    "home.stats.businesses": "Biashara zilizosaidiwa",
    "home.stats.region": "Mkoa",
    "home.stats.region.value": "Milima ya Usambara",

    "home.whatwedo.label": "Tunafanya nini?",
    "home.whatwedo.title": "Zaidi ya mkopo",
    "home.whatwedo.body": "Tunaamini kila mtu ana haki ya kufanya biashara. Si kila mtu anapata nafasi benki - lakini kwa wazo zuri, motisha na msaada sahihi, unaweza kuanza na kukua.",
    "home.whatwedo.quote": "Msaada mdogo, tofauti kubwa.",

    "home.micro.label": "Ufadhili mdogo ni nini?",
    "home.micro.title": "Kuwekeza katika ukuaji",
    "home.micro.body": "Ufadhili mdogo unamaanisha mikopo midogo yenye athari kubwa. Mikopo yetu inakupa fursa ya kuwekeza katika biashara yako.",
    "home.micro.item1": "Vifaa au zana",
    "home.micro.item2": "Kuandaa mahali pa kazi",
    "home.micro.item3": "Masoko au usafiri",
    "home.micro.item4": "Hifadhi ya kwanza kwa biashara yako mpya",
    "home.micro.range": "Mikopo kuanzia €500 hadi €5,000, kwa masharti ya kubadilika.",

    "home.why.label": "Kwa nini inafanya kazi",
    "home.why.title": "Mbinu yetu",
    "home.why.item1": "Upatikanaji wa mtaji na maarifa",
    "home.why.item2": "Nafasi kubwa ya mafanikio endelevu",
    "home.why.item3": "Uchumi wa ndani wenye nguvu",
    "home.why.item4": "Uhuru na kiburi kwa mjasiriamali",

    "home.cases.label": "Miradi ya Mfano",
    "home.cases.title": "Biashara zinazokua tayari",
    "home.cases.subtitle": "Mifano mitatu ya kuvutia ya wajasiriamali tunaowasiliana nao katika Milima ya Usambara.",
    "home.cases.case1.title": "Warsha ya Useremala",
    "home.cases.case1.desc": "Seremala wa ndani aliwekeza katika mashine za kitaalamu na warsha kubwa. Biashara yake sasa inasambaza samani kwa hoteli na wateja binafsi katika mkoa.",
    "home.cases.case1.tag": "Ufundi & Uzalishaji",
    "home.cases.case2.title": "Nyumba ya Wageni & Utalii",
    "home.cases.case2.desc": "Mjasiriamali mdogo alifungua nyumba ya wageni kwa waandaaji na watalii katika Milima ya Usambara. Kwa mwongozo, ilikua kutoka vyumba 3 hadi 8.",
    "home.cases.case2.tag": "Utalii & Ukarimu",
    "home.cases.case3.title": "Usindikaji wa Kilimo",
    "home.cases.case3.desc": "Familia ya wakulima iliwekeza katika vifaa vya kusindika mazao ya ndani. Sasa wanauza bidhaa zilizosindikwa kwa masoko huko Lushoto na maeneo ya jirani.",
    "home.cases.case3.tag": "Kilimo & Chakula",
    "home.cases.investment": "Uwekezaji",
    "home.cases.sector": "Sekta",

    "ent.hero.label": "Kwa Wajasiriamali",
    "ent.hero.title": "Je, biashara yako ina uwezo wa kukua?",
    "ent.hero.subtitle": "ULP Invest inatoa mikopo kuanzia €500 hadi €5,000 na mwongozo wa kibinafsi kwa wajasiriamali wadogo katika Milima ya Usambara.",
    "ent.hero.cta": "Tutumie mpango wako",

    "ent.who.label": "Kwa nani?",
    "ent.who.title": "Tunatafuta wajasiriamali wenye tamaa",
    "ent.who.body": "Mikopo na mwongozo wetu ni kwa biashara ndogo ambazo tayari zinafanya kazi na zinataka kukua. Si wanaoanza bila mpango, bali wajasiriamali wenye shughuli iliyothibitishwa.",
    "ent.who.item1": "Biashara ndogo iliyopo yenye shughuli",
    "ent.who.item2": "Mpango wazi wa ukuaji",
    "ent.who.item3": "Tayari kulipa kwa miaka 3–5",
    "ent.who.item4": "Ipo katika mkoa wa Milima ya Usambara",

    "ent.loan.label": "Ufadhili",
    "ent.loan.title": "Mikopo ya haki, masharti ya kubadilika",
    "ent.loan.body": "Tunatoa uwekezaji kati ya €500 na €5,000 na muda wa kulipa wa miaka 3 hadi 5. Kulipa mapema daima kunawezekana.",
    "ent.loan.amount": "€500 – €5,000",
    "ent.loan.term": "Miaka 3 hadi 5",
    "ent.loan.early": "Kulipa mapema kunawezekana",
    "ent.loan.rate": "Riba ya haki",

    "ent.support.label": "Msaada wa kibinafsi",
    "ent.support.title": "Hatukuachi peke yako",
    "ent.support.body": "Pamoja na mkopo, unapata mwongozo wa kibinafsi kutoka kwa washauri wetu. Tunakusaidia hatua kwa hatua kuelekea mafanikio endelevu.",
    "ent.support.item1": "Kuandaa mpango wa biashara",
    "ent.support.item2": "Usimamizi wa fedha na uhasibu",
    "ent.support.item3": "Msaada wa kisheria na kodi",
    "ent.support.item4": "Mkakati wa ukuaji na ushauri wa masoko",
    "ent.support.item5": "Upatikanaji wa mtandao wa wajasiriamali",

    "ent.apply.label": "Omba",
    "ent.apply.title": "Uko tayari kukua?",
    "ent.apply.body": "Tutumie barua pepe na maelezo mafupi ya biashara yako na mpango wako wa ukuaji. Tutawasiliana nawe.",
    "ent.apply.cta": "Tuma ombi lako",

    "inv.hero.label": "Kwa Wawekezaji",
    "inv.hero.title": "Wekeza kwa watu na uwezo",
    "inv.hero.subtitle": "Changia maendeleo ya kiuchumi Tanzania. Kama mkopo, kama zawadi, au kama kocha - kila mchango unahesabu.",
    "inv.hero.cta": "Wasiliana nasi",

    "inv.why.label": "Kwa nini kuwekeza?",
    "inv.why.title": "Athari unayoweza kuona",
    "inv.why.body": "ULP Invest inafanya kazi katika mkoa wenye uwezo mkubwa lakini upatikanaji mdogo wa mtaji. Uwekezaji wako unasaidia wajasiriamali kukua, kuunda ajira na kuimarisha uchumi wa ndani.",
    "inv.why.item1": "Athari ya moja kwa moja kwa wajasiriamali wa ndani",
    "inv.why.item2": "Ajira katika mkoa wa Usambara",
    "inv.why.item3": "Maendeleo ya kiuchumi Tanzania",
    "inv.why.item4": "Ziara ya kila mwaka kwa miradi inawezekana",

    "inv.risk.label": "Uwazi kuhusu hatari",
    "inv.risk.title": "Hatari kubwa, athari kubwa",
    "inv.risk.body": "Tunakuwa wazi: hii ni mkoa mgumu unaoendelea. Si mikopo yote italipwa kikamilifu. Ndiyo maana tunafanya kazi na mchanganyiko wa mikopo ya kibiashara na zawadi.",
    "inv.risk.quote": "Uwekezaji wako ni kitendo cha imani kwa watu wenye ndoto.",

    "inv.loan.label": "Toa mkopo",
    "inv.loan.title": "Mkopo kwa ULP Invest",
    "inv.loan.body": "Unaweza kutoa mkopo kwa ULP Invest. Tutaandaa mkataba wa mkopo na kuhakikisha ripoti ya uwazi.",
    "inv.loan.rate": "Riba katika kiwango cha Euribor",
    "inv.loan.min": "Muda wa chini: miaka 5",
    "inv.loan.pref": "Inayopendelewa: miaka 10",
    "inv.loan.cta": "Tutumie barua pepe kwa mkataba wa mkopo",

    "inv.gift.label": "Mchango",
    "inv.gift.title": "Toa mchango",
    "inv.gift.body": "Mchango pia unakaribishwa sana. Hamisha kwa:",
    "inv.gift.instruction": "Taja: ULP Invest – Zawadi",
    "inv.gift.iban": "IBAN: NL00 XXXX 0000 0000 00",
    "inv.gift.name": "Kwa: Stichting Ubuntu Leadership Program",

    "inv.coach.label": "Mafunzo",
    "inv.coach.title": "Shiriki utaalamu wako",
    "inv.coach.body": "Je, una uzoefu katika ukarimu, useremala, usimamizi wa biashara ndogo, masoko au uhasibu? Unaweza pia kufundisha wajasiriamali moja kwa moja wakati wa ziara ya kila mwaka Tanzania.",
    "inv.coach.visit": "Ziara ya kila mwaka Tanzania inawezekana",
    "inv.coach.cta": "Jiandikishe kama kocha",

    "about.hero.label": "Kuhusu Sisi",
    "about.hero.title": "Sehemu ya Programu ya Uongozi ya Ubuntu",
    "about.hero.subtitle": "ULP Invest ni moja ya nguzo tatu za Programu ya Uongozi ya Ubuntu - mpango unaosaidia vijana na wajasiriamali katika Milima ya Usambara.",

    "about.ulp.label": "Programu ya Uongozi ya Ubuntu",
    "about.ulp.title": "Nguzo tatu, dhamira moja",
    "about.ulp.body": "Programu ya Uongozi ya Ubuntu inaunganisha elimu, uongozi na maendeleo ya kiuchumi Tanzania. Tembelea tovuti kuu kwa maelezo zaidi.",
    "about.ulp.pillar1.title": "Safari ya Kila Mwaka",
    "about.ulp.pillar1.desc": "Safari ya kila mwaka Tanzania ambapo washiriki wanatembelea mkoa, kukutana na miradi na kuchangia jamii.",
    "about.ulp.pillar2.title": "Shule ya Biashara",
    "about.ulp.pillar2.desc": "Mpango kwa vijana katika Milima ya Usambara: mafunzo, ujasiriamali na uzoefu wa kazi bila kuacha mkoa.",
    "about.ulp.pillar3.title": "ULP Invest",
    "about.ulp.pillar3.desc": "Mikopo na mwongozo kwa wajasiriamali wadogo wenye uwezo wa kukua katika Milima ya Usambara.",
    "about.ulp.link": "Tembelea ubuntuleadershipprogram.nl",

    "about.team.label": "Timu Yetu",
    "about.team.more": "+ wanachama 3 wa timu - wasifu unakuja hivi karibuni.",
    "about.team.title": "Watu nyuma ya ULP Invest",
    "about.pillar.active": "Hii ni sisi",
    "about.team.theo.name": "Theo van Stuijvenberg",
    "about.team.theo.role": "Msimamizi wa Mfuko wa ULP Invest",
    "about.team.theo.bio": "Theo ni msimamizi wa mfuko wa ULP Invest na mtu wa kuwasiliana naye kwa wawekezaji. Anawajibika kwa usimamizi wa mfuko wa uwekezaji, mawasiliano na wawekezaji na ufuatiliaji wa fedha.",
    "about.team.theo.phone": "06 29550134",
    "about.team.hans.name": "Hans Valkenburg",
    "about.team.hans.role": "Mwanzilishi wa Programu ya Uongozi ya Ubuntu",
    "about.team.hans.bio": "Hans ni mwanzilishi wa Programu ya Uongozi ya Ubuntu, shirika mama la ULP Invest. Katika jukumu hili, anahusika na maono na mkakati wa ULP Invest na maendeleo ya ujasiriamali Tanzania.",

    "about.mission.label": "Dhamira Yetu",
    "about.mission.title": "Mkopo mdogo, athari kubwa.",
    "about.mission.body": "Tunatoa watu si tu msaada wa kifedha, bali pia imani na maarifa ya kuchukua mustakabali wao mikononi mwao. Pamoja tunajenga fursa katika Milima ya Usambara.",

    "contact.title": "Wasiliana",
    "contact.email": "Tutumie barua pepe",
    "contact.phone": "Simu / WhatsApp",
    "contact.website": "Tovuti Kuu ya ULP",
    "contact.follow": "Tufuate",

    "footer.tagline": "Mkopo mdogo, athari kubwa.",
    "footer.part_of": "Sehemu ya",
    "footer.rights": "Haki zote zimehifadhiwa.",
    "footer.entrepreneurs": "Kwa Wajasiriamali",
    "footer.investors": "Kwa Wawekezaji",
    "footer.about": "Kuhusu Sisi",
    "footer.contact": "Wasiliana",

    "tag.businessplan": "Mpango wa Biashara",
    "tag.administration": "Utawala",
    "tag.legal": "Kisheria",
    "tag.marketing": "Marketing",
    "tag.network": "Mtandao",
    "tag.incubator": "Inkubeta",
    "tag.incubator.desc": "Mazingira ya inkubeta kwa wajasiriamali wanaoota.",
    "invest.how": "Unaweza kuchangia vipi?",
    "invest.three_ways": "Njia tatu za kuwekeza",
    "invest.contact": "Wasiliana nasi",
    "home": "Nyumbani",

    // Stats
    "home.stats.founded": "Ilianzishwa",

    // Mission quote on Home page
    "home.mission.quote": "Pamoja tunajenga fursa katika Milima ya Usambara.",

    // Footer
    "footer.nav.heading": "Urambazaji",
    "footer.ulp.program": "Programu",
    "footer.ulp.contact": "Wasiliana ULP",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[lang][key] ?? translations["nl"][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
