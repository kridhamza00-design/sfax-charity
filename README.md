# Site cloner — setup & usage

This script uses a real headless browser (Playwright) to visit every
internal page of your Base44 site, wait for it to fully render (since
it's a React SPA), then save the rendered HTML, a full-page screenshot,
and any images/CSS/fonts it can find. It automatically discovers pages
by following internal links, so you don't need to list routes by hand.

**Scope:** visuals/frontend only, as requested. Donation forms, logins,
and anything backed by Base44's database will show up visually but
won't function in the saved copy — you'll handle backend/logic
separately.

## 1. Install requirements

You need Node.js installed (v18+). Then, in a terminal, in the same
folder as `clone-site.js`:

```bash
npm init -y
npm install playwright
npx playwright install chromium
```

## 2. Run it

```bash
node clone-site.js https://sfax-giving-pulse.base44.app/
```

Replace the URL with the actual live URL of your site.

## 3. Where the output goes

A new folder `cloned-site/` appears next to the script:

```
cloned-site/
  pages/          → one .html file per page (fully rendered)
  screenshots/     → one .png per page, useful for visual reference
  assets/         → images, CSS, fonts pulled from your own domain
```

## 4. Notes

- It only follows links on the same domain, so it won't wander off
  into external sites it links to.
- If a page needs a login to view, the script won't be able to reach
  it (it browses as a logged-out visitor) — you'd need to add login
  steps to the script, or capture those pages manually via the same
  browser DevTools approach discussed earlier.
- If some pages load slowly or use animations/lazy-loaded images, you
  can increase the `waitForTimeout(1000)` value in the script (in
  milliseconds) for a longer buffer before it screenshots/saves.
- Once you have the HTML + screenshots, send me a couple of the saved
  `.html` files (or the screenshots) and I can help turn them into
  clean, standalone HTML/CSS or React files with the Base44-specific
  code stripped out.
