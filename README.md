# ULP Invest — website

The site for [ulpinvest.com](https://www.ulpinvest.com), part of the Ubuntu Leadership Program. React + Vite + Tailwind, static, deployed on Vercel from `main`.

```bash
pnpm install
pnpm dev         # local dev server
pnpm build       # production build to dist/public
```

## Content

The site is trilingual (NL / EN / SW). Copy lives in `client/src/content.json` under `nl`, `en` and `sw`; text and images that are the same in every language live under `shared`. Everything is edited through the [Mirantic CMS](https://app.mirantic.com): elements carry `data-cms-field`, and `client/public/cms-bridge.js` connects the page to the editor. `useLanguage()` gives `t(key)` for the current language and `field(key)` for its CMS path.

Images live in `client/public/images/`. Images uploaded through the CMS are committed to `client/public/uploads/` when you publish.
