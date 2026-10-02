# ArtViSiON — Ranjan (Rj) Sarkar · Portfolio

Creative Lead portfolio site for **ArtViSiON** (Indore, since 2024).
*Your ViSiON, Our Creation.*

Static site: plain HTML + CSS + JavaScript. No build step, no dependencies.

## Files
- `index.html` — page structure
- `style.css` — styles
- `app.js` — interactions (work grid, case views, A to Z full-screen viewer, scroll storyboard)
- `assets/` — logo, fonts, project covers and A–Z / storyboard SVG artwork

## Artwork (all original vector SVG, flat style)
- `assets/covers/` — feature image (ACP-clad brand store) + 8 project covers
- `assets/dive/` — 9 scenes for the scroll-dive (ACP facade, coffee, poster wall, botanical, book, social grid, mark construction, brand store interior, POSM)
- `assets/storyboard/` — 5 pillar scenes, golden-ratio key visual, A to Z letters (A–Z)
Every image is used once; the only intentional repeat is the work-grid cover / list hover preview.

## Run locally
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy on GitHub Pages
Settings → Pages → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save.
