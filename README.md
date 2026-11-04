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

## Marauder’s Map navigation

The fixed header shows the name, map trigger (desktop), and an intentionally disabled Lumos/Nox placeholder. The previous light-mode preference remains supported by the design system for later wiring. Muggle Mode is available in the footer.

The map loads only when opened. Room names, descriptions, coordinates, and map copy are in `src/data.js`. Native dialog semantics, explicit Tab wrapping, Escape handling, scroll locking, and trigger focus restoration support keyboard use. Real route links preserve modified-click/new-tab behavior. The current room includes project detail routes. Opening reveals the oath and unfolds original SVG parchment; route selection traces a dotted path before navigating; closing folds the map and briefly displays “Mischief managed.” Reduced motion opens and closes instantly without ink or footprint animation.

Footer route links remain visible on every page and highlight the active route. Below 640px and in Muggle Mode, the header links to that list instead of loading the map.

## Spell Book projects

`projects` in `src/data.js` holds the real title, creative spell name, effect, stack, tags, GitHub URL, contributor status, resume bullets, incantation TODO, and SVG node/edge definition for each project. No API paths or runnable project code were supplied, so incantations explicitly remain TODO with non-executable flow notes. Numerical achievement/storage counts are omitted under the no-metrics constraint.

Filters use `?tag=ai-ml`, `?tag=cloud`, `?tag=security`, and `?tag=full-stack`; unknown tags show an empty state. Vaultify's native flip button supports click, Enter, and Space. Muggle Mode/reduced motion exposes its bullets directly, disables layout motion, and renders static diagrams. The details include per-project titles and descriptions, copy feedback, ordered diagram alternatives, contributor attribution, PRAHARI team and win, and previous/next links.

## Ollivanders and Trophy Room

Skills use five resume-based categories. Each category and its decorative core skill has an `owlGrade: 'TODO'` field in `src/data.js`; only explicitly supplied O/E/A category grades render publicly. The SVG wands have no proficiency scale. Hover, focus, and tap expose rune badges; Muggle Mode renders the plain category lists.

The Trophy Room uses the user's revised figures: 8x finalist, 200+ LeetCode problems, and CGPA 9.08/10. These explicitly authorized figures supersede the initial no-metrics instruction for this page. Counters run once when visible and expose final values to assistive technology; Muggle Mode/reduced motion displays final values directly. The page includes the supplied Aarohan team, Google certificate topics and nine-course count, five course scrolls, and profile links with noopener/noreferrer.

Validated: production build; hidden unset grades; keyboard and mobile wand expansion; responsive layouts; static Muggle fallback; final plaque values; profile links; page titles/descriptions; browser console.
