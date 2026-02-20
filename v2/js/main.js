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
