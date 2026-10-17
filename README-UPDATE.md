# ArtViSiON Portfolio — Updated Site (GitHub-ready)

Full updated build of **https://rjsarkar83.github.io/vector-portfolio/** with the new
AV mockup library, liquid-effect popup, and audience-analysis section.

## What's new in this build

| # | Section | Details |
|---|---------|---------|
| 02 | **Mockup library** (`#mockups`) | All **158 red-minimal SVG mockups** across **18 categories**, with category filter chips. |
| — | **Liquid popup** | Tap any card → gooey liquid-goo + morphing-radius popup with spec grid, full AI prompt, **Download SVG**, prev/next, `←/→` + `Esc` keys, and a **Full pack · ZIP** button. |
| 07 | **Audience analysis** (`#audience`) | Public mirror of `/AV/dashboard.html`: KPIs, 7-day traffic, sources donut, top pages, locations, devices, live event stream (sample-preview data). |
| — | Downloads | Per-card ⤓ button, popup **Download SVG**, two **ZIP pack** entry points → `assets/mockups/AV_Red_Minimal_Mockups.zip`. |
| — | Nav | Header + mobile sheet now include **Mockups** and **Audience**; section labels renumbered 01–08. |
| — | Cleanup | Cloudflare-only scripts removed; contact email is a plain `mailto:rjsarkar@icloud.com` (works on GitHub Pages). |

The 158 scenes follow the original **Branding Mockup Guide** prompt set verbatim
(every prompt's size / material / lighting / camera / elements shown in each SVG footer
and in the popup), rendered in the red minimal system (`#E5322D / #17131A / #F2EFE7`)
with the three AV logos rotated across scenes and shown in every card/popup badge.

## Folder layout

```
vector-portfolio/
├── index.html              ← updated single page (sections 01–08)
├── css/
│   ├── style.css           ← original
│   ├── method.css          ← original
│   └── library.css         ← NEW (mockup grid, liquid popup, audience)
├── js/
│   ├── app.js              ← original
│   ├── method.js           ← original
│   ├── mockups-data.js     ← NEW (158-item manifest)
│   ├── library.js          ← NEW (grid, chips, liquid popup)
│   └── audience.js         ← NEW (dashboard analytics section)
└── assets/
    ├── fonts/ brands/ covers/ hover/ retail/ more/ archive/ dive/
    ├── storyboard/ templates/ …   ← original artwork
    └── mockups/                   ← NEW (158 SVGs + full-pack ZIP)
        ├── 001_fascia-shop-front-signage.svg … 158_outlet-audit-brand-standards-sheet.svg
        └── AV_Red_Minimal_Mockups.zip
```

## Deploy on GitHub Pages

1. Unzip → you get the `vector-portfolio/` folder.
2. **If updating the existing repo** `rjsarkar83.github.io/vector-portfolio`:
   ```bash
   unzip github-vector-portfolio-update.zip
   cd vector-portfolio
   git add -A && git commit -m "Add mockup library, liquid popup + audience section"
   git push
   ```
3. **Or fresh publish**: create a repo, put the *contents* of `vector-portfolio/`
   at the required path (e.g. `/vector-portfolio/` folder in the `rjsarkar83.github.io`
   repo, or the repo root for a `username.github.io` repo) and push.
4. GitHub Pages serves `index.html` automatically — no build step.
   All asset paths are **relative**, so the site works at any base path
   (root, `/repo/`, or a custom domain).

## Notes

- Audience data: **sample preview** (same demo dataset shape as the dashboard's
  offline fallback). Live Firebase sessions stay behind dashboard login.
- Fonts are self-hosted (Instrument Serif + Manrope `.woff2`) — no Google Fonts,
  no external CDNs; the page loads fully offline.
- The mockup ZIP inside `assets/mockups/` is the same 158-SVG pack, offered as a
  single download from the section header and the popup.

— Generated 2026-10-16 · AV red minimal system · 158 / 158 prompts covered.
