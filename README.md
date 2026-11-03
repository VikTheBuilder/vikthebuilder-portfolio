# VikTheBuilder portfolio

React + Vite + Tailwind CSS + Framer Motion. Original CSS/SVG artwork; locally bundled Cinzel and Inter fonts.

Run `npm install`, then `npm run dev`. Production: `npm run build` and `npm run preview`.

## Multi-page app

React Router v6 uses BrowserRouter, lazy route modules, Suspense, and a shared Layout. Routes: `/`, `/about`, `/projects`, `/projects/:slug`, `/skills`, `/trophies`, `/journey`, `/contact`, and a themed catch-all. `vercel.json` rewrites deep links to `index.html`.

All factual portfolio content is in `src/data.js`. Existing CSS and SVG banner artwork are retained. Project filters are reflected in query parameters. The full-screen acceptance letter is dismissed for the current session using sessionStorage. Light mode and Muggle Mode preferences use localStorage. Reduced motion and Muggle Mode bypass the intro. The seal, Skip intro link, and Escape dismiss the letter; focus is trapped during the intro and returns to the landing heading afterward. If browser storage is blocked, settings work for the current page session.

Owl Post validates fields and prepares a mailto draft in the visitor's email app. It does not transmit or store messages on a server. Direct message delivery would require a separately configured service.

The home heading is plain text and does not animate. Decorative candlelight and 18 CSS embers pause while the tab is hidden. Home copy and CTA labels are sourced from data.js. Motion includes wait-mode page transitions on other routes, shared project layout IDs, short SVG flow animation, route footprints, and scroll reveals. Reduced-motion preferences and Muggle Mode disable these effects. Modal navigation uses native dialog focus trapping and Escape dismissal. Route pages set unique document titles, scroll to the top, and focus their h1 after lazy loading.

Dependency audit: the requested React Router v6 has moderate upstream advisories (open redirect with untrusted Link destinations and SSR hydration). The app uses fixed internal destinations and BrowserRouter without SSR hydration. npm's proposed remediation requires upgrading to v7, which is outside the requested v6 constraint.

## Content TODO

Add the actual resume at `public/Vikramaditya_Singh_Resume.pdf`, then rebuild. The download button automatically becomes available when the file is present. Vite serves it at `/Vikramaditya_Singh_Resume.pdf`.

Numerical achievements and CGPA are omitted to follow the no-metrics requirement. No professional experience or credential URLs were supplied, so none are invented. Source links preserve the provided Codeforces spelling.

## Accessibility and performance

Semantic landmarks, skip link, native keyboard controls, visible focus states, named SVG diagrams, reduced-motion support, mobile menu with expanded state, and local fonts. Run Lighthouse against a production preview to verify the requested 90+ target; do not treat implementation choices as a measured score.
