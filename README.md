# VikTheBuilder portfolio

React + Vite + Tailwind CSS + Framer Motion; React Router v6 with BrowserRouter. Portfolio facts, dates, links, theme copy, and SEO settings live in `src/data.js`. Original CSS/SVG artwork only; no photos, audio, phone numbers, live demos, or invented project performance metrics. Resume achievement facts are retained.

## Setup and scripts

Requires Node.js 22 and npm. Run `npm ci`, then `npm run dev`.

- `npm run dev`: local development at 127.0.0.1.
- `npm run build`: production output in `dist/`, including route-specific HTML metadata, favicon, OG image, robots.txt, and sitemap.xml.
- `npm run preview`: serve the production build locally, normally at http://127.0.0.1:4173.
- `npm run check`: validate built route metadata, content invariants, public assets, headers, env hygiene, and report raw/gzip JS chunk sizes. Run after building.

## Owl Post

Copy `.env.example` to `.env.local` and set `VITE_WEB3FORMS_KEY` to your Web3Forms public access key. The client sends to https://api.web3forms.com/submit only after validation. Vite embeds VITE_ variables in the browser bundle: never put a private service secret in them. Configure domain restrictions and spam protection in Web3Forms. Local validation, a honeypot, and a 30-second client cooldown are convenience protections, not server-side abuse controls.

Without a key, the form opens a mailto draft and explicitly says it has not sent a message. No delivery claim is made. The network success/error paths require a configured key for an end-to-end delivery test; test email delivery yourself after configuration. Set the key in Vercel's build environment and redeploy when it changes. `.env` and `.env.*` are ignored; only `.env.example` is tracked.

## Resume and skills

Add the real, phone-free resume at `public/Vikramaditya_Singh_Resume.pdf`, review its visible text and PDF metadata for private information, and rebuild. Until then the download is disabled with an unavailable note. No PDF was supplied during the audit, so PDF contents could not be verified.

Optionally fill category/top-skill `owlGrade` fields in `src/data.js`. Only O, E, or A are accepted for public category badges. Unset grades remain hidden; no proficiency is guessed. Project incantations are clearly labeled documented flow notes, not fabricated executable code.

## Routes and hosting

Routes: `/`, `/about`, `/projects`, `/projects/vaultify`, `/projects/unspoken`, `/projects/equilibria`, `/projects/prahari`, `/skills`, `/trophies`, `/journey`, `/contact`; unknown paths show the themed 404. Filters use `?tag=`. The sitemap lists the 11 real pages, not the 404 or filter variants.

For Vercel, build with `npm run build`, publish `dist`, and retain `vercel.json`. It includes the SPA fallback plus nosniff, strict-origin-when-cross-origin, and DENY frame headers. Verify the headers against the actual Vercel deployment; localhost Vite and Sites do not automatically apply Vercel configuration. Sites deployment uses `.openai/hosting.json` and the existing private audience.

The build writes unique title, description, canonical, Open Graph, and Twitter metadata into each route's HTML; client navigation updates the same tags. Canonicals and sitemap URLs use `siteSeo.origin` in `data.js`. Change that one value if moving to a different production domain, then rebuild. `public/og-image.svg` is the original artwork; `public/og-image.png` is its rasterized sharing version. The icon is an original geometric V seal. No raster image is rendered in page content.

## Accessibility and settings

Lumos/Nox and Muggle Mode persist with storage-error handling. An inline bootstrap sets theme/motion attributes before React. System reduced-motion defaults to plain mode unless the user has selected otherwise; motion remains disabled under the OS preference even if plain mode is turned off. The map, train, diagrams, owl, flame, particles, and Patronus respect the shared quiet setting.

Header/footer toggles, text navigation, a first-focusable skip link, gold focus rings, route-heading focus, native form controls, associated error messages, and live status messages are retained. Map dismissal restores trigger focus; map navigation focuses the destination heading. The wand cursor is restricted to fine-pointer hover devices and preserves native text-entry/focus cursors. Its bounded canvas pauses when hidden.

## Audit and performance

See `AUDIT.md` for findings, scope, measurements, route chunk sizes, and outstanding setup. Routes, map, and contact animations are code-split. Fonts are Latin WOFF2 with swap display; primary Cinzel/Inter faces are preloaded. No runtime dependency was added for this audit. Lighthouse and the SVG rasterizer were installed only in ignored `.sites-runtime/audit-tools`.

React Router v6 remains as explicitly requested. `npm audit` reports two moderate package entries arising from upstream open-redirect and SSR-hydration advisories. Current route destinations are fixed local data, and the application does not use SSR hydration/deserialization. The available upstream fix is v7.18.5, a major upgrade; this remains a documented dependency risk, not a clean audit claim. Plan a separate v7 migration if a zero-advisory policy is required.
