const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../cloned-site/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

console.log(`Found ${files.length} HTML files:`);

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract title
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'No Title';

  // Extract main content snippet
  const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const mainLength = mainMatch ? mainMatch[1].length : 0;
  
  // Extract h1, h2, h3 tags inside main
  const headings = [];
  if (mainMatch) {
    const headingMatches = mainMatch[1].match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi);
    if (headingMatches) {
      headingMatches.forEach(h => {
        const text = h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        if (text) headings.push(text);
      });
    }
  }

  console.log(`\n--- File: ${file} (Main size: ${mainLength} bytes) ---`);
  console.log(`Title: ${title}`);
  console.log(`Headings (${headings.length}): ${headings.slice(0, 10).join(' | ')}`);
});
