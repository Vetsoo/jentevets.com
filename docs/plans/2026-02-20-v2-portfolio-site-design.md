# v2 Portfolio Site Design

## Overview

Minimal personal portfolio website for Jente Vets. Acts as a central hub pointing to social profiles and Medium articles. Pure static HTML/CSS/JS hosted on GitHub Pages.

## Goals

- Build brand identity with a modern, minimal dark aesthetic
- Link to GitHub, LinkedIn, and Medium profiles
- Display Medium articles dynamically with custom vanity URLs (e.g., `jentevets.com/article/my-post`)
- No content hosted directly - all writing lives on Medium

## Approach

Pure static site with client-side JavaScript:
- Single `index.html` with external CSS/JS
- JavaScript fetches Medium RSS feed on page load
- Custom URL routing via GitHub Pages 404.html trick
- No build step, no dependencies

## Layout

Split Hero + Grid layout:

```
┌───────────────────────────────────┐
│  ┌───────┐                        │
│  │       │   Jente Vets           │
│  │ Photo │   Software Engineer    │
│  │       │                        │
│  └───────┘   [GH] [LI] [Medium]   │
├───────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐         │
│  │ Article │  │ Article │         │
│  └─────────┘  └─────────┘         │
│  ┌─────────┐  ┌─────────┐         │
│  │ Article │  │ Article │         │
│  └─────────┘  └─────────┘         │
└───────────────────────────────────┘
```

- Hero: Photo left, name/title/social links right
- Articles: 2-column grid of article cards below

## Visual Style

**Colors:**
- Background: `#0d1117` (GitHub dark)
- Text: `#e6edf3` (off-white)
- Accent: `#58a6ff` (blue, for links/hover)

**Typography:**
- System font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

**Elements:**
- Social links as icon buttons with hover glow
- Article cards with subtle border
- Smooth transitions (0.2s ease)
- Flat design, no heavy shadows

## File Structure

```
v2/
├── index.html
├── 404.html          # Copy of index.html for routing
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── photo.jpg
```

## Custom URL Routing

1. GitHub Pages serves `404.html` for unknown paths
2. `404.html` is identical to `index.html`
3. JavaScript detects `/article/<slug>` path
4. Looks up slug in mapping generated from Medium RSS
5. Redirects to corresponding Medium URL

Slug generation: "My Great Post" → `my-great-post`

## Medium RSS Integration

- Endpoint: `https://medium.com/feed/@username`
- Fetched via CORS proxy (`api.allorigins.win`)
- Cached in sessionStorage
- Displays: title, publication date, optional description snippet

## Responsive Design

- Breakpoint: 768px
- Desktop: hero side-by-side, 2-column article grid
- Mobile: hero stacked vertically, 1-column articles

## Error Handling

- RSS fetch failure: show fallback "Latest articles on Medium →" link
- Invalid article slug: redirect to homepage

## Hosting

- GitHub Pages from `v2/` directory (or root)
- Custom domain via CNAME file
