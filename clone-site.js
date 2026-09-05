/**
 * Base44 SPA frontend cloner
 * ---------------------------------
 * Crawls every internal page of a client-rendered (React) site,
 * waits for it to fully render (since it's a React SPA), then saves:
 *   - the rendered HTML for each page
 *   - a full-page screenshot for each page
 *   - every image/css/font asset it can find
 *
 * This captures VISUALS ONLY. Forms, donations, logins, and any
 * data pulled from Base44's backend will not function in the saved
 * copy — that's expected, since you said you'll handle backend/logic
 * separately.
 *
 * USAGE:
 *   1. npm install playwright
 *   2. npx playwright install chromium
 *   3. node clone-site.js https://sfax-giving-pulse.base44.app/
 *
 * Output goes into ./cloned-site/
 *   cloned-site/pages/<route>.html
 *   cloned-site/screenshots/<route>.png
 *   cloned-site/assets/<filename>
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const START_URL = process.argv[2];
if (!START_URL) {
  console.error('Usage: node clone-site.js <start-url>');
  process.exit(1);
}

const ORIGIN = new URL(START_URL).origin;
const OUT_DIR = path.resolve('./cloned-site');
const PAGES_DIR = path.join(OUT_DIR, 'pages');
const SHOTS_DIR = path.join(OUT_DIR, 'screenshots');
const ASSETS_DIR = path.join(OUT_DIR, 'assets');

for (const dir of [OUT_DIR, PAGES_DIR, SHOTS_DIR, ASSETS_DIR]) {
  fs.mkdirSync(dir, { recursive: true });
}

// Turn a URL path into a safe filename
function slugify(pathname) {
  let slug = pathname.replace(/^\//, '').replace(/\/$/, '');
  if (slug === '') slug = 'home';
  return slug.replace(/[\/?#&=]/g, '_');
}

async function downloadAsset(page, assetUrl) {
  try {
    const u = new URL(assetUrl, ORIGIN);
    if (u.origin !== ORIGIN) return; // skip third-party CDNs/fonts you don't own
    const filename = path.basename(u.pathname) || 'asset';
    const dest = path.join(ASSETS_DIR, filename);
    if (fs.existsSync(dest)) return;

    const response = await page.context().request.get(u.toString());
    if (response.ok()) {
      const buffer = await response.body();
      fs.writeFileSync(dest, buffer);
    }
  } catch (err) {
    // non-fatal, just skip broken asset links
  }
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const visited = new Set();
  const queue = [START_URL];

  // Track asset URLs as pages load
  const discoveredAssets = new Set();
  page.on('response', (response) => {
    const ct = response.headers()['content-type'] || '';
    if (/image|font|css/.test(ct)) {
      discoveredAssets.add(response.url());
    }
  });

  while (queue.length > 0) {
    const currentUrl = queue.shift();
    const normalized = currentUrl.split('#')[0];
    if (visited.has(normalized)) continue;
    visited.add(normalized);

    console.log(`Visiting: ${normalized}`);

    try {
      await page.goto(normalized, { waitUntil: 'networkidle', timeout: 30000 });
      // give React a moment for any lazy content/animations
      await page.waitForTimeout(1000);

      const pathname = new URL(normalized).pathname;
      const slug = slugify(pathname);

      // Save rendered HTML
      const html = await page.content();
      fs.writeFileSync(path.join(PAGES_DIR, `${slug}.html`), html, 'utf-8');

      // Save full-page screenshot
      await page.screenshot({
        path: path.join(SHOTS_DIR, `${slug}.png`),
        fullPage: true,
      });

      // Find internal links to keep crawling
      const links = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
      for (const href of links) {
        if (!href) continue;
        if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue;
        try {
          const abs = new URL(href, normalized).toString();
          if (new URL(abs).origin === ORIGIN && !visited.has(abs.split('#')[0])) {
            queue.push(abs);
          }
        } catch (e) {
          /* ignore malformed hrefs */
        }
      }
    } catch (err) {
      console.warn(`  Failed to load ${normalized}: ${err.message}`);
    }
  }

  console.log(`\nDownloading ${discoveredAssets.size} discovered assets...`);
  for (const assetUrl of discoveredAssets) {
    await downloadAsset(page, assetUrl);
  }

  await browser.close();

  console.log(`\nDone. Visited ${visited.size} pages.`);
  console.log(`HTML saved to:        ${PAGES_DIR}`);
  console.log(`Screenshots saved to: ${SHOTS_DIR}`);
  console.log(`Assets saved to:      ${ASSETS_DIR}`);
})();
