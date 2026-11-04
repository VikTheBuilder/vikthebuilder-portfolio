# Portfolio audit — 2026-11-04

## Findings reported before fixes

| Severity | File | Problem | Fix / outcome |
|---|---|---|---|
| High | src/data.js, src/pages/ProjectDetail.jsx, src/components/ResumeDownload.jsx | Public TODO placeholders | Removed from flow notes, accessible labels, and PDF fallback. Unset internal grades remain hidden. |
| Medium | src/data.js, src/pages/Trophies.jsx | Numeric plaques violated latest no-metrics instruction | Removed numeric values/counters, retained achievement descriptions. Dates and named courses/challenges are not performance metrics and remain exact. |
| Medium | src/components/Layout.jsx | Map dismissal could steal destination heading focus | Separate dismissal focus return from navigation completion. |
| Medium | src/components/ProjectCard.jsx, src/pages/ProjectDetail.jsx | Missing explicit noopener | Every new-tab link now has noopener noreferrer. |
| Medium | src/components/PageMeta.jsx, src/components/Motion.jsx, route pages | Duplicated/stale descriptions and scattered effects | Central route metadata from data.js with unique titles/descriptions and noindex for 404. |
| Medium | index.html, scripts/seo.mjs, public/ | Missing sharing/discovery metadata and art | Build-time route HTML, canonical tags, OG/Twitter tags, original SVG-to-PNG OG art, favicon, robots and sitemap. |
| Medium | .gitignore, vercel.json | Env exclusion and security headers missing | Explicit env ignores; three requested Vercel headers; SPA fallback preserved. |
| Medium | src/main.jsx, src/fonts.css, index.html | No preloads; redundant font formats | Latin WOFF2 only, swap, primary face preloads. |
| Medium | src/pages/Skills.jsx | Tap could only expand a wand | Toggle behavior with pointer/focus handling. |
| Medium | package.json, package-lock.json | Two moderate React Router advisory entries | Unresolved upstream on requested v6; fixed destinations/no SSR limit relevant exposure. v7 migration is the available upstream fix. |
| Low | README.md | Outdated setup and behavior documentation | Replaced with current setup, env, scripts, SEO, hosting, accessibility and risk notes. |
| Medium | public/Vikramaditya_Singh_Resume.pdf | Resume absent | No fabricated PDF; disabled download retained. User must supply and inspect it. |
| Medium | src/styles.css | First-visit LCP was letter paragraph | Existing letter heading sized to be primary text; final Lighthouse identifies H2. |
| Low | public/favicon.svg | Missing favicon produced console 404 | Added original V seal icon. |
| Medium | src/styles.css | Lazy Projects load shifted footer; CLS 0.143 | Reserved loading space; final CLS 0. |
| Medium | src/components/SettingsToggles.jsx | Accessible name omitted visible theme suffix | Visible label is now the button name. |

## Re-checks

- All 11 real routes plus a nonsense path rendered directly and after refresh in Lumos and Nox; one H1 per page. The nonsense path renders the themed 404 with noindex. Static SPA hosting may still return HTTP 200 for unknown paths.
- Local production build and preview started without errors. Browser route walks reported no console warnings/errors; final Lighthouse console audit passed.
- Keyboard: map open, Shift+Tab/Tab wrap, Escape, trigger return, selection, new-page H1 focus and scroll=0; filter query survives reload; flip works with Space/Enter; empty form focuses first invalid input with three associated errors. Toggles persist.
- Rendered text contrast scan passed all routes in both themes; mobile Lighthouse accessibility scored 100 on both target pages. SVG architecture uses light labels on dark nodes and a screen-reader ordered alternative. Automated scores are not a substitute for assistive-technology user testing.
- No public placeholder strings or raw ordering keys; exact profile links, contributor labels, team, milestone wording retained. No phone-shaped number, tel link, audio markup, or recognizable secret token found by the source/build scan. This is a heuristic scan, not a guarantee about an absent PDF or unknown historic secrets.
- Muggle Mode removes the canvas, map animation, train and particles; quiet guards also cover owl/flame/Patronus/diagrams and OS reduced-motion. OS preference defaults and overrides reviewed in source. Live external email delivery was not attempted without a key.
- All application dependencies have imports; no heavy runtime dependencies added. Audit utilities stay ignored outside application package.json.
- No photographs, screenshots, audio, or demo links added. The single PNG is the explicitly requested social-sharing artwork, not page imagery.
- Canonical and sharing tags generated per real route; query filters canonicalize to the projects page. robots and sitemap reference the configured production origin. Vercel security headers are configured, not claimed to be enforced by Vite or Sites.

## Mobile Lighthouse

Local production preview, simulated mobile throttling, Chrome headless. Scores vary by host/device and do not establish public-production scores. Initial baseline Home: performance 87, accessibility 100, best practices 96, SEO 90. First measured Projects pass after initial fixes: 91/100/100/100, CLS 0.143. Final results and chunks below are generated from saved reports/build output.

| Page | Performance | Accessibility | Best practices | SEO | CLS |
|---|---:|---:|---:|---:|---:|
| / | 96 | 100 | 100 | 100 | 0 |
| /projects | 96 | 100 | 100 | 100 | 0 |

## JavaScript chunk sizes

Decimal kB; route chunks exclude shared core, shared Motion, and separately loaded effects.

| Chunk | Raw kB | Gzip kB |
|---|---:|---:|
| About | 1.22 | 0.54 |
| Contact | 5.98 | 2.42 |
| ContactMagic | 1.32 | 0.63 |
| GlobalMagic | 3.43 | 1.68 |
| Home | 5.55 | 2.14 |
| index | 402.92 | 130.45 |
| Journey | 12.36 | 5.01 |
| MaraudersMap | 6.16 | 2.55 |
| Motion | 1.80 | 0.91 |
| NotFound | 0.49 | 0.34 |
| ProjectDetail | 4.91 | 2.02 |
| Projects | 4.21 | 1.66 |
| Skills | 3.01 | 1.37 |
| Trophies | 3.46 | 1.34 |
| use-animation | 0.69 | 0.41 |

## Manual completion

1. Optionally fill owlGrade values with O/E/A; hidden while unset.
2. Supply public/Vikramaditya_Singh_Resume.pdf after checking its text and metadata contain no phone number. Rebuild.
3. Set VITE_WEB3FORMS_KEY in Vercel/build environment, redeploy, and send a delivery test.
4. If deploying on a new domain, update siteSeo.origin; verify Vercel rewrite/security headers and public crawlability there. Existing Sites audience remains private.
5. Decide on a separate React Router v7 migration to resolve the remaining upstream advisories while changing the original v6 requirement.

Additional low-severity focus edge case (`src/components/Layout.jsx`): selecting the current map room does not mount a new page. Clear the pending navigation target for same-route selection so dismissal restores the trigger instead of waiting for a nonexistent page-ready event.

## Resume-stat clarification

The owner clarified that the no-metrics restriction applies only to project performance claims (such as latency, accuracy, or users). Restored the supplied resume facts: 8x hackathon finalist, 200+ DSA problems on LeetCode, and CGPA 9.08/10, with once-on-scroll counters and static reduced-motion/Muggle Mode values. The earlier numeric-plaque removal is superseded; every other audit fix remains. Both 100 Days of Code journey stops were already intact. No project metrics were added.
