# yusufisa.my

A personal site for **Yusuf Isa** — independent web designer and front-end developer in Kuala Lumpur.

- **Live site:** https://yusufisa.my/
- **Repository:** https://github.com/whwgywgr/yusufisa
- **GitHub Pages URL:** https://whwgywgr.github.io/yusufisa/ (redirects to the custom domain)

Built as a small, hand-written static site: semantic HTML, one stylesheet, one JavaScript file, no framework and no build step. The design is deliberately quiet: a warm neutral palette, an editorial serif, generous space, and only two glass surfaces. Projects are presented as a compact typographic index instead of a wall of mockups.

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

- **Projects** — Rumah, Kira and Jalan are sample case studies. Replace the names, years, descriptions and disciplines if they are not your real work.
- **GitHub link** — now points to the real profile, `github.com/whwgywgr`. The old LinkedIn placeholder has been removed; add a verified LinkedIn URL to the contact section and JSON-LD `sameAs` if you want one.
- **Availability** — “Q1 2027” and the booking language are written as plausible sample copy. Change them to match reality.
- **Email** — the site uses `hello@yusufisa.my`. Set that mailbox up before launch, or replace it everywhere (including the mailto links, FAQ and copy-button value in the HTML).
- **Canonical / social URLs** — `https://yusufisa.my/` is already set in `index.html`, `robots.txt`, `sitemap.xml` and the JSON-LD block.
- **SEO image** — the current share image is `assets/images/og-image.png` (1200 × 630). Update it if you change the headline or name.
- **FAQ** — the visible questions in `#faq` and the `FAQPage` JSON-LD should be updated together.
- **Dates** — update `dateModified` in the JSON-LD and `<lastmod>` in `sitemap.xml` when the content changes.

Useful places to edit:

- Headline and intro: `#hero-title`, `.hero__lede` in `index.html`
- About copy: the `.about` block in `index.html`
- Project rows: search for `project--rumah`, `project--kira`, `project--jalan`
- FAQ: the `#faq` section in `index.html`
- Contact copy: the `.contact__card` block
- Colour palette and type: the custom properties at the top of `styles.css`
- Theme storage key: `yi-theme` in `script.js`

## Theme behaviour

- The initial theme is applied by a tiny inline script before CSS renders, so there is no bright flash in dark mode.
- On a first visit, the site respects the operating system's light/dark preference.
- Once someone uses the toggle, their choice is saved in `localStorage` and wins over the system setting.
- The toggle updates `aria-pressed`, its accessible label, the browser `theme-color` and the icon shown in the header.

## Accessibility notes

- Semantic landmarks, a skip link, one `h1` and a logical heading order.
- The mobile menu uses a native `<dialog>`, which provides focus handling and Escape-to-close behaviour.
- All interactive controls are keyboard reachable and have visible focus styles.
- Entrance animations and scroll reveals stop under `prefers-reduced-motion`; glass effects are made solid under `prefers-reduced-transparency` and `prefers-contrast`.
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

For the custom domain, point `yusufisa.my` at the host and make sure HTTPS is enabled. The apex currently resolves to GitHub Pages, but only one of the four recommended GitHub A records is present; add all four to your DNS zone for redundancy. Point `www` at `whwgywgr.github.io` with a CNAME, not at the apex, so GitHub can issue a certificate that covers the `www` hostname. Keep the root `index.html` at the domain root.

## Fonts & licence

The fonts are self-hosted so the site does not call a third-party font CDN:

- **Instrument Serif** — designed by Rodrigo Fuenzalida
- **Archivo** — designed by Omnibus-Type
- **DM Mono** — designed by Colophon Foundry

All three are licensed under the SIL Open Font License 1.1. The licence files are kept alongside the font files in `assets/fonts/`. Do not remove them if you redistribute the project.

## A note on the craft

No trackers, no cookies, no analytics, no newsletter pop-up. The glass panels are real CSS surfaces with a fallback, not flattened PNGs. The project marks and icons are CSS and SVG, and the social image is rendered from the same type and colour system.
