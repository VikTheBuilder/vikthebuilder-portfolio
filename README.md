# Vikramaditya Singh | Developer Portfolio.

A Gryffindor-inspired portfolio presenting projects, skills, achievements, education, and contact information.



## Features

- Routes: `/`, `/about`, `/projects`, `/projects/:slug`, `/skills`, `/trophies`, `/journey`, and `/contact`, plus a themed 404.
- Marauder's Map navigation with a plain-text fallback.
- Spell Book project filters, detail pages, and SVG architecture diagrams.
- Ollivanders skills, Trophy Room certifications, and the Hogwarts Express timeline.
- Owl Post contact form with validation, bot verification, and an email fallback.
- Lumos/Nox themes and Muggle Mode (plain, fast view), with keyboard and reduced-motion support.

## Tech stack

Dependencies declared in `package.json`:

- React 19 and React DOM.
- Vite 6 with the React plugin.
- React Router v6.
- Tailwind CSS 4, imported in `src/styles.css` and integrated through the Vite plugin.
- Framer Motion 12.
- Fontsource packages for Cinzel and Inter.

Web3Forms is accessed through browser `fetch`, and Vercel is configured through `vercel.json`; neither is an npm dependency.

## Getting started

Install Git, Node.js, and npm. The repository specifies no Node `engines` field and has no `.nvmrc` or `.node-version`. Setup was verified with Node.js 22.14.0 and npm 10.9.2.

Replace `<repository-url>` with your repository or fork URL:

```sh
git clone <repository-url> portfolio
cd portfolio
npm install
cp .env.example .env
npm run dev
```

`cp` works in Bash and as a PowerShell alias. Set the optional contact key in `.env` before starting development. Follow the local URL printed by Vite; it uses an available port on `127.0.0.1`. Stop the server with Ctrl+C.

Every package script:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the application and route metadata into `dist/`; generate robots and sitemap files. |
| `npm run preview` | Serve the existing production build locally. Run the build first. |
| `npm run check` | Check built metadata, content invariants, assets, headers, and environment hygiene; report JavaScript chunk sizes. Run after building. |

The rate limiter also has a standalone test file (no `npm test` script):

```sh
node --test scripts/form-rate-limit.test.mjs
```

## Environment variables

| Variable | Purpose and source | If missing |
| --- | --- | --- |
| `VITE_WEB3FORMS_KEY` | Public access key obtained from [Web3Forms](https://web3forms.com/) for Owl Post submissions. | Opens a prefilled `mailto:` draft; the visitor must send it from their email application. |

Web3Forms access keys are public-facing by design. Vite embeds `VITE_` variables in the browser bundle; never use them for private secrets. Restrict the key to the production domain in the Web3Forms dashboard where supported by your plan. Enable server-side hCaptcha enforcement under the form's **Block Spam** settings; the client already loads hCaptcha and submits its token.

Keep `.env.example` blank. `.env` and local environment files are ignored by Git. Rebuild and redeploy after changing the production key.

## Customizing content

`src/data.js` centralizes portfolio facts and configuration:

- `profile`, education, professional links, and page copy.
- `projects`: slugs, titles, stacks, descriptions, contributor flags, GitHub links, and diagram definitions.
- `skills`: categories, items, and category/top-skill `owlGrade` fields. Only category grades set to `O`, `E`, or `A` render; unset grades stay hidden. Top-skill grades are stored but not displayed.
- `trophies`, certifications, courses, and the Aarohan award. Their `credentialUrl` fields control optional Verify links; an empty value renders no link.
- `journey`: station content and displayed dates. `sortKey` is not displayed.
- `siteSeo`: production origin and route metadata.

Some interface labels remain in page/component JSX; not every displayed string is data-driven. Project incantations are documented flow notes, not executable examples.

The resume is already included at `public/Vikramaditya_Singh_Resume.pdf`. Replace that file to update the download, review its text and metadata for private information, and rebuild. If absent at build time, download controls are disabled.

## Project structure

```text
src/
  App.jsx              Lazy routes and page transitions
  main.jsx             React entry point and BrowserRouter
  data.js              Portfolio data, links, copy, and SEO settings
  styles.css           Theme, layout, responsive styles, and shared buttons
  fonts.css            Latin font faces with swap loading
  pages/               Route components
  components/          Navigation, cards, diagrams, forms, and effects
  context/             Persistent theme and Muggle Mode settings
  lib/                 Browser-side form rate limiter
public/                Resume PDF, favicon, and social-sharing artwork
scripts/               SEO build plugin, site checks, and rate-limiter tests
index.html             Document shell, font preloads, and theme bootstrap
package.json           Dependencies and npm scripts
package-lock.json      Dependency lockfile
vite.config.js         React, Tailwind, and SEO build plugins
vercel.json            SPA rewrite and security headers
.env.example           Blank contact-key template
AUDIT.md               Dated audit findings and measurements
dist/                  Generated production output; ignored by Git
```

## Accessibility and performance

Keyboard navigation includes a skip link, visible focus rings, map-dialog focus trapping and Escape dismissal. Route changes reset scroll and focus the page heading. Forms associate inline errors with fields and announce status; SVG architecture diagrams have text alternatives.

OS `prefers-reduced-motion` and Muggle Mode disable decorative motion. Muggle Mode also simplifies styling and substitutes text navigation for the map. Routes and selected effects are lazy-loaded; local Latin WOFF2 fonts use `font-display: swap` and primary-face preloads.

[The audit dated November 4, 2026](AUDIT.md) records these mobile Lighthouse measurements on a **local production preview with simulated throttling**, not the live deployment:

| Page | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Home | 96 | 100 | 100 | 100 |
| Projects | 96 | 100 | 100 | 100 |

These historical results predate later changes and vary by host/device. Automated checks do not replace assistive-technology user testing.

## Deployment

1. Import the repository into Vercel and select the **Vite** preset.
2. Use `npm run build` as the build command and `dist` as the output directory.
3. Add `VITE_WEB3FORMS_KEY` to the deployment environment, then deploy.
4. Set `siteSeo.origin` in `src/data.js` to the production domain and rebuild. Canonical URLs, `dist/sitemap.xml`, and `dist/robots.txt` must use that domain; `scripts/seo.mjs` generates them.
5. Verify direct-route loading, response headers, crawlability, and contact delivery on the deployed site.

`vercel.json` rewrites `/(.*)` to `/index.html` for SPA navigation and configures `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `X-Frame-Options: DENY`. Vite's local servers do not apply these Vercel headers.

## Known limitations

- React Router v6 retains the advisories documented in [AUDIT.md](AUDIT.md); installation verification still reported two moderate vulnerabilities. Fixed local destinations and the client-only SPA limit relevant exposure, but do not eliminate dependency risk. A separate v7 migration is planned; it is not implemented here.
- Unknown routes display a themed 404 with `noindex`, but SPA hosting can still return HTTP 200.
- Browser-side cooldowns, persisted attempt limits, and the honeypot are bypassable. They are not server-side rate limiting or DDoS protection; enforce protection through Web3Forms and the host.
- Real email delivery and dashboard protection settings require a manual deployment test. No test email was sent during README verification.
- Grades remain optional and unset. Review production-domain metadata, hosting headers, and public access after deployment.
- The audit's missing-resume note is historical: the PDF is now present. Its numeric-plaque removal was also superseded by the resume-stat clarification in that document.

## Disclaimer

Fan-made tribute. Not affiliated with or endorsed by Warner Bros., J.K. Rowling, or any rights holder. All Harry Potter related names are trademarks of their respective owners. This site is non-commercial. Artwork is original.

## Contact and license

- [GitHub](https://github.com/VikTheBuilder)
- [LinkedIn](https://linkedin.com/in/vikthebuilder)
- [Email](mailto:vikthebuilder@gmail.com): vikthebuilder@gmail.com

Personal content, including resume text, project descriptions, and the name, is not licensed for reuse.
