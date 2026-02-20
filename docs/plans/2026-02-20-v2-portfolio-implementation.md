# v2 Portfolio Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a minimal dark-themed portfolio site that displays social links and Medium articles with custom vanity URLs.

**Architecture:** Pure static HTML/CSS/JS with no build step. JavaScript fetches Medium RSS via CORS proxy and handles custom URL routing through GitHub Pages 404.html trick.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, GitHub Pages

---

## Task 1: Create File Structure

**Files:**
- Create: `v2/index.html`
- Create: `v2/css/style.css`
- Create: `v2/js/main.js`
- Create: `v2/assets/` (directory)

**Step 1: Create directories and placeholder files**

```bash
mkdir -p v2/css v2/js v2/assets
touch v2/index.html v2/css/style.css v2/js/main.js
```

**Step 2: Verify structure**

```bash
ls -la v2/
ls -la v2/css v2/js v2/assets
```

Expected: All directories and files exist

---

## Task 2: Create Base HTML Structure

**Files:**
- Modify: `v2/index.html`

**Step 1: Write base HTML with linked CSS/JS**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Jente Vets - Software Engineer">
    <meta name="author" content="Jente Vets">
    <title>Jente Vets | Software Engineer</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <main class="container">
        <!-- Hero section -->
        <header class="hero">
            <img src="/assets/photo.jpg" alt="Jente Vets" class="hero__photo">
            <div class="hero__content">
                <h1 class="hero__name">Jente Vets</h1>
                <p class="hero__title">Software Engineer</p>
                <nav class="hero__links">
                    <a href="https://github.com/Vetsoo" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
                        <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    </a>
                    <a href="https://linkedin.com/in/jentevets" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
                        <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="https://medium.com/@jentevets" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Medium">
                        <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
                    </a>
                </nav>
            </div>
        </header>

        <!-- Articles section -->
        <section class="articles">
            <h2 class="articles__heading">Latest Articles</h2>
            <div class="articles__grid" id="articles-grid">
                <!-- Populated by JavaScript -->
            </div>
            <p class="articles__fallback" id="articles-fallback" hidden>
                <a href="https://medium.com/@jentevets" target="_blank" rel="noopener noreferrer">
                    View all articles on Medium →
                </a>
            </p>
        </section>
    </main>

    <script src="/js/main.js"></script>
</body>
</html>
```

**Step 2: Open in browser to verify structure loads**

```bash
cd v2 && python -m http.server 8000
```

Open http://localhost:8000 - page should load (unstyled)

---

## Task 3: Add Base CSS Variables and Reset

**Files:**
- Modify: `v2/css/style.css`

**Step 1: Write CSS reset and variables**

```css
/* === Variables === */
:root {
    --color-bg: #0d1117;
    --color-text: #e6edf3;
    --color-text-muted: #8b949e;
    --color-accent: #58a6ff;
    --color-border: #30363d;
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    --transition: 0.2s ease;
}

/* === Reset === */
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    font-family: var(--font-family);
    background-color: var(--color-bg);
    color: var(--color-text);
    line-height: 1.6;
    min-height: 100vh;
}

a {
    color: var(--color-accent);
    text-decoration: none;
    transition: color var(--transition);
}

a:hover {
    color: var(--color-text);
}

img {
    max-width: 100%;
    height: auto;
    display: block;
}
```

**Step 2: Verify in browser**

Refresh http://localhost:8000 - dark background, light text visible

---

## Task 4: Style Hero Section

**Files:**
- Modify: `v2/css/style.css` (append)

**Step 1: Add hero styles**

```css
/* === Layout === */
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 4rem 1.5rem;
}

/* === Hero === */
.hero {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 3rem;
}

.hero__photo {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--color-border);
}

.hero__content {
    flex: 1;
}

.hero__name {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.hero__title {
    font-size: 1.25rem;
    color: var(--color-text-muted);
    margin-bottom: 1rem;
}

.hero__links {
    display: flex;
    gap: 1rem;
}

.social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: var(--color-border);
    color: var(--color-text);
    transition: background-color var(--transition), box-shadow var(--transition);
}

.social-link:hover {
    background-color: var(--color-accent);
    box-shadow: 0 0 15px rgba(88, 166, 255, 0.4);
}

.social-icon {
    width: 24px;
    height: 24px;
}
```

**Step 2: Add placeholder photo**

Copy headshot from v1 or add placeholder:

```bash
cp "v1/wwwroot/assets/imgs/headshot-jentevets.jpg" v2/assets/photo.jpg
```

**Step 3: Verify in browser**

Refresh - hero should display with photo, name, title, social icons

---

## Task 5: Style Articles Section

**Files:**
- Modify: `v2/css/style.css` (append)

**Step 1: Add articles grid styles**

```css
/* === Articles === */
.articles__heading {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
}

.articles__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
}

.article-card {
    display: block;
    padding: 1.5rem;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background-color: transparent;
    transition: border-color var(--transition), background-color var(--transition);
}

.article-card:hover {
    border-color: var(--color-accent);
    background-color: rgba(88, 166, 255, 0.05);
}

.article-card__title {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--color-text);
    margin-bottom: 0.5rem;
    line-height: 1.4;
}

.article-card__date {
    font-size: 0.875rem;
    color: var(--color-text-muted);
}

.articles__fallback {
    text-align: center;
    padding: 2rem;
}

.articles__fallback a {
    font-size: 1.1rem;
}
```

**Step 2: Verify in browser**

Refresh - articles section heading visible, grid ready for content

---

## Task 6: Add Responsive Styles

**Files:**
- Modify: `v2/css/style.css` (append)

**Step 1: Add mobile breakpoint**

```css
/* === Responsive === */
@media (max-width: 768px) {
    .container {
        padding: 2rem 1rem;
    }

    .hero {
        flex-direction: column;
        text-align: center;
    }

    .hero__photo {
        width: 120px;
        height: 120px;
    }

    .hero__name {
        font-size: 2rem;
    }

    .hero__links {
        justify-content: center;
    }

    .articles__grid {
        grid-template-columns: 1fr;
    }
}
```

**Step 2: Test responsive behavior**

Open browser DevTools, toggle device toolbar, verify layout stacks on mobile

---

## Task 7: Implement Medium RSS Fetching

**Files:**
- Modify: `v2/js/main.js`

**Step 1: Write RSS fetch and parse logic**

```javascript
// === Configuration ===
const MEDIUM_USERNAME = 'jentevets';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const MEDIUM_FEED_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
const CACHE_KEY = 'medium_articles';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

// === DOM Elements ===
const articlesGrid = document.getElementById('articles-grid');
const articlesFallback = document.getElementById('articles-fallback');

// === Article Storage (for URL routing) ===
const articleMap = new Map();

// === Utility Functions ===
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function parseRSSItem(item) {
    const title = item.querySelector('title')?.textContent || 'Untitled';
    const link = item.querySelector('link')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';
    const slug = slugify(title);

    return { title, link, pubDate, slug };
}

// === Caching ===
function getCachedArticles() {
    try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const { articles, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp > CACHE_DURATION) {
            sessionStorage.removeItem(CACHE_KEY);
            return null;
        }
        return articles;
    } catch {
        return null;
    }
}

function cacheArticles(articles) {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            articles,
            timestamp: Date.now()
        }));
    } catch {
        // Ignore storage errors
    }
}

// === Fetch and Render ===
async function fetchArticles() {
    const cached = getCachedArticles();
    if (cached) {
        return cached;
    }

    const response = await fetch(CORS_PROXY + encodeURIComponent(MEDIUM_FEED_URL));
    if (!response.ok) throw new Error('Failed to fetch feed');

    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    const items = xml.querySelectorAll('item');

    const articles = Array.from(items).slice(0, 6).map(parseRSSItem);
    cacheArticles(articles);
    return articles;
}

function renderArticles(articles) {
    articlesGrid.innerHTML = articles.map(article => {
        // Store in map for URL routing
        articleMap.set(article.slug, article.link);

        return `
            <a href="/article/${article.slug}" class="article-card">
                <h3 class="article-card__title">${article.title}</h3>
                <time class="article-card__date">${formatDate(article.pubDate)}</time>
            </a>
        `;
    }).join('');
}

function showFallback() {
    articlesGrid.hidden = true;
    articlesFallback.hidden = false;
}

async function initArticles() {
    try {
        const articles = await fetchArticles();
        if (articles.length === 0) {
            showFallback();
        } else {
            renderArticles(articles);
        }
    } catch (error) {
        console.error('Failed to load articles:', error);
        showFallback();
    }
}

// === Initialize ===
initArticles();
```

**Step 2: Test in browser**

Refresh - articles should load from Medium (or fallback shows if no articles/CORS issue)

---

## Task 8: Implement Custom URL Routing

**Files:**
- Modify: `v2/js/main.js` (add to top, before initArticles call)

**Step 1: Add routing logic at the end of main.js, before initArticles()**

Replace the `// === Initialize ===` section with:

```javascript
// === URL Routing ===
async function handleRouting() {
    const path = window.location.pathname;
    const articleMatch = path.match(/^\/article\/([^/]+)\/?$/);

    if (articleMatch) {
        const slug = articleMatch[1];

        // Wait for articles to load to populate articleMap
        try {
            const articles = await fetchArticles();
            articles.forEach(article => {
                articleMap.set(article.slug, article.link);
            });

            const mediumUrl = articleMap.get(slug);
            if (mediumUrl) {
                window.location.href = mediumUrl;
                return;
            }
        } catch {
            // Fall through to homepage
        }

        // Slug not found - redirect to homepage
        window.location.href = '/';
        return;
    }

    // Normal page - render articles
    initArticles();
}

// === Initialize ===
handleRouting();
```

**Step 2: Remove the standalone `initArticles();` call at the bottom**

The routing function now calls it.

---

## Task 9: Create 404.html for GitHub Pages Routing

**Files:**
- Create: `v2/404.html`

**Step 1: Copy index.html to 404.html**

```bash
cp v2/index.html v2/404.html
```

Both files must be identical for the routing trick to work.

**Step 2: Verify file exists**

```bash
ls -la v2/404.html
```

---

## Task 10: Add GitHub Pages CNAME

**Files:**
- Create: `v2/CNAME`

**Step 1: Create CNAME file with domain**

```bash
echo "jentevets.com" > v2/CNAME
```

**Step 2: Verify content**

```bash
cat v2/CNAME
```

Expected: `jentevets.com`

---

## Task 11: Final Verification

**Step 1: Start local server**

```bash
cd v2 && python -m http.server 8000
```

**Step 2: Verify checklist**

- [ ] Homepage loads with dark theme
- [ ] Hero shows photo, name, title, social links
- [ ] Social links open correct profiles in new tab
- [ ] Articles load from Medium (or fallback displays)
- [ ] Article cards link to `/article/<slug>`
- [ ] Mobile layout stacks correctly (test in DevTools)

**Step 3: Test article routing locally**

Note: `/article/` routing won't fully work locally without the 404 trick, but the redirect logic can be tested by manually navigating to an article URL after articles load.

---

## Summary

| Task | Description |
|------|-------------|
| 1 | Create file structure |
| 2 | Base HTML with hero and articles sections |
| 3 | CSS reset and variables |
| 4 | Hero section styling |
| 5 | Articles grid styling |
| 6 | Responsive mobile styles |
| 7 | Medium RSS fetch with caching |
| 8 | Custom URL routing |
| 9 | 404.html for GitHub Pages |
| 10 | CNAME for custom domain |
| 11 | Final verification |
