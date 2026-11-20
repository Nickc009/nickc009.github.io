# nickccook.com

Personal portfolio for Nick Cook — IT and systems administration.

Hand-written HTML, CSS, and a small amount of JavaScript. No framework, no build
step, no JavaScript required to read the content. Hosted on GitHub Pages.

## Structure

```
index.html                  One-page home: hero, work, about, capabilities, contact
404.html                    GitHub Pages not-found page
work/homelab.html           Home lab case study
work/altimeter-pi.html      Raspberry Pi / Flask case study
work/music-pipeline.html    Python / rclone automation case study
assets/css/styles.css       All styling
assets/js/main.js           Navigation, reveal-on-scroll, contact form
assets/fonts/               Self-hosted Fraunces and Inter (latin subsets)
assets/images/              Optimised responsive images and favicons
CNAME                       Custom domain for GitHub Pages
robots.txt                  Crawler rules + sitemap
sitemap.xml                 Canonical URLs
```

## Local preview

```bash
python3 -m http.server 4173
open http://localhost:4173
```

Any static file server works. There is nothing to compile.

## Contact form

The form posts to Formspree at `https://formspree.io/f/xyewprnn`.
Submissions are delivered to the email configured in the Formspree dashboard.

If the endpoint is ever unset (a `YOUR_FORM_ID` placeholder), JavaScript falls
back to opening a pre-filled email to `NickCookCS@gmail.com`, so the form is
never a dead end. Spam protection uses Formspree's `_gotcha` honeypot field.

## Deploy

GitHub Pages serves the `main` branch of `Nickc009/nickc009.github.io` at
`nickccook.com` (see `CNAME`). A push to `main` publishes automatically.

The redesign lives on the `redesign` branch so `main` stays untouched until it is
reviewed:

```bash
git switch main
git merge redesign
git push origin main
```

## Images

Source photos are intentionally not committed to this branch. The site uses
responsive AVIF, WebP, and JPEG variants in `assets/images/`:

- Hero: 2400 / 1600 / 1200 / 800 px wide
- Portrait: 720 / 480 px square
- Prairie band: 2000 / 1280 px wide

To regenerate from originals, resize and crop first, then export with
ImageMagick at quality ~80 (JPEG), ~52 (WebP), and ~48 (AVIF). Keep the hero
under roughly 250 KB at 2400 px.

## Content notes

- The footer year is generated from `data-year`, so it stays current.
- Case studies are plain HTML; copy an existing page to add another.
- The home-lab write-up deliberately omits hostnames, addresses, ports, and
  credentials. Keep it that way.
- When adding a project page, update `sitemap.xml` and the "Next project" link.

## Previous version

The original Bootstrap-based site is preserved in the `main` branch history.
