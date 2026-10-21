# yusufisa.my

A personal site for **Yusuf Isa** — independent web designer and front-end developer in Kuala Lumpur.

- **Live site:** https://yusufisa.my/
- **Repository:** https://github.com/whwgywgr/yusufisa
- **GitHub Pages URL:** https://whwgywgr.github.io/yusufisa/ (redirects to the custom domain)

Built as a small, hand-written static site: semantic HTML, one stylesheet, one JavaScript file, no framework and no build step. The design is quiet but graphic: charcoal surfaces, a faint grid, chunky offset borders and a dark pill navigation. Projects are presented as an index of tactile cards rather than a wall of mockups.

## Preview it locally

From this folder, run either:

```bash
python -m http.server 4173
```

or, if you have Node installed:

```bash
npx serve .
```

Then open **http://localhost:4173**.

Do not open `index.html` through `file://` if your browser is strict about local fonts or clipboard access. A local server is closer to the real thing.

## What's in here

```
index.html                 Page structure, copy, SEO metadata and JSON-LD
styles.css                 Layout, theme and typography
script.js                  Theme, clock, menu, reveals, copy button
site.webmanifest           Installable-site metadata
robots.txt / sitemap.xml   Search and crawler files
llms.txt                   Plain-text site summary for AI answer engines
CNAME                      GitHub Pages custom domain
.nojekyll                  Serve the site as static files on GitHub Pages
assets/fonts/              Self-hosted Instrument Serif, Archivo and DM Mono
assets/images/             App icons and the Open Graph share image
assets/favicon.svg         Vector favicon
```

## Before you publish

This is a finished visual starting point, but some of the content is illustrative and should be replaced with your own details:

- **Projects** — PromptbyMe, My Timeline, SapotMe and Design Library link to live sites. Keep their names, descriptions and link targets in sync with those products.
- **GitHub link** — now points to the real profile, `github.com/whwgywgr`. The old LinkedIn placeholder has been removed; add a verified LinkedIn URL to the contact section and JSON-LD `sameAs` if you want one.
- **Availability** — “Q1 2027” and the booking language are written as plausible sample copy. Change them to match reality.
- **Email** — the site uses `hello@yusufisa.my`. Set that mailbox up before launch, or replace it everywhere (including the mailto links, FAQ and copy-button value in the HTML).
- **Canonical / social URLs** — `https://yusufisa.my/` is already set in `index.html`, `robots.txt`, `sitemap.xml` and the JSON-LD block.
- **SEO image** — the current share image is `assets/images/og-image.png` (1200 × 630). Update it if you change the headline or name.
- **Social links** — the `#social` section currently uses `href="#"` placeholders for YouTube, TikTok, Facebook, Threads and WhatsApp. Replace them with the real profile URLs and remove `aria-disabled`, `title` and `data-social-placeholder` when they are ready.
- **FAQ** — the visible questions in `#faq` and the `FAQPage` JSON-LD should be updated together.
- **Dates** — update `dateModified` in the JSON-LD and `<lastmod>` in `sitemap.xml` when the content changes.

Useful places to edit:

- Headline and intro: `#hero-title`, `.hero__lede` in `index.html`
- About copy: the `.about` block in `index.html`
- Project cards: the `.project-list` block in `index.html`
- FAQ: the `#faq` section in `index.html`
- Contact copy: the `.contact__card` block
- Colour palette and type: the custom properties at the top of `styles.css`
- Theme storage key: `yi-theme` in `script.js`

## Theme behaviour

- The initial theme is applied by a tiny inline script before CSS renders, so there is no bright flash in dark mode.
- The site opens in dark mode by default. Light mode is available from the toggle and uses the same outlined, offset-shadow language.
- Once someone uses the toggle, their choice is saved in `localStorage` and wins on the next visit.
- The toggle updates `aria-pressed`, its accessible label, the browser `theme-color` and the icon shown in the header.

## Accessibility notes

- Semantic landmarks, a skip link, one `h1` and a logical heading order.
- The mobile menu uses a native `<dialog>`, which provides focus handling and Escape-to-close behaviour.
- All interactive controls are keyboard reachable and have visible focus styles.
- Entrance animations and scroll reveals stop under `prefers-reduced-motion`; the sticky header and mobile menu fall back to solid surfaces under `prefers-reduced-transparency` and `prefers-contrast`.
- Decorative project index marks are hidden from assistive technology.
- The copy button has a live status message and a fallback for browsers without the Clipboard API.
- The site works without JavaScript, apart from the optional menu, theme toggle, clock and copy action.

## Search and AI discoverability

The page is set up as a single, indexable profile page:

- A self-referencing canonical URL, page title, meta description, Open Graph and Twitter cards, all using `https://yusufisa.my/`.
- A JSON-LD `@graph` containing `WebSite`, `Person`, `ProfilePage` and `FAQPage`. The FAQ schema mirrors the visible `#faq` answers.
- `sitemap.xml` and `robots.txt`, with explicit allowances for search engines and the major AI answer-engine crawlers.
- `llms.txt`, a plain-text summary of the person, services, selected work, availability and contact details for generative engines.
- Local/entity context: Kuala Lumpur and Malaysia in the visible copy, `PostalAddress`, `areaServed` and `knowsAbout` in the `Person` schema.
- HTTPS and a custom apex domain through GitHub Pages.

After launch, submit `https://yusufisa.my/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Search Console verification needs access to the domain's DNS or HTML file; no verification token has been added. `llms.txt` is an emerging convention, not a ranking guarantee.

## Deploying

This is a static site. Any host that serves files will work:

- **Cloudflare Pages** — connect the repo, leave the build command empty, set the output directory to `/` (or deploy this folder directly with Wrangler).
- **Netlify** — drag the folder into Netlify Drop, or connect the repo with no build command.
- **Vercel** — use the “Other” framework preset with no build step.
- **GitHub Pages** — this repo is published from the `main` branch root at `yusufisa.my`; a push to `main` updates the live site. Keep `CNAME` and `.nojekyll` in the root.
- **Traditional hosting / cPanel** — upload the folder contents to `public_html`.

For the custom domain, point `yusufisa.my` at the host and make sure HTTPS is enabled. The apex resolves to all four recommended GitHub A records, and `www` is a CNAME to `whwgywgr.github.io`. GitHub's current certificate covers the apex only; `https://www.yusufisa.my` may keep showing a TLS warning until GitHub reissues a certificate that includes `www`. Keep the apex canonical until that is fixed. Keep the root `index.html` at the domain root.

## Fonts & licence

The fonts are self-hosted so the site does not call a third-party font CDN:

- **Instrument Serif** — designed by Rodrigo Fuenzalida
- **Archivo** — designed by Omnibus-Type
- **DM Mono** — designed by Colophon Foundry

All three are licensed under the SIL Open Font License 1.1. The licence files are kept alongside the font files in `assets/fonts/`. Do not remove them if you redistribute the project.

## A note on the craft

No trackers, no cookies, no analytics, no newsletter pop-up. The navigation, cards and controls are CSS surfaces with real borders and offset shadows, not flattened images. The project marks and icons are CSS/SVG, and the social image is rendered from the same type, border and colour system.
