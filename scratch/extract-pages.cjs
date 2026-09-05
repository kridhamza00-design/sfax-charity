const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../cloned-site/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const outDir = path.join(__dirname, '../src/pages/extracted');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  const rawHtml = fs.readFileSync(filePath, 'utf-8');

  // Extract <main ...>...</main>
  const mainMatch = rawHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!mainMatch) {
    console.warn(`No <main> found in ${file}`);
    return;
  }

  let mainHtml = mainMatch[1];

  // Convert HTML attributes to JSX
  let jsx = mainHtml
    .replace(/class="/g, 'className="')
    .replace(/for="/g, 'htmlFor="')
    .replace(/stroke-width="/g, 'strokeWidth="')
    .replace(/stroke-linecap="/g, 'strokeLinecap="')
    .replace(/stroke-linejoin="/g, 'strokeLinejoin="')
    .replace(/stroke-dasharray="/g, 'strokeDasharray="')
    .replace(/stroke-dashoffset="/g, 'strokeDashoffset="')
    .replace(/stroke-opacity="/g, 'strokeOpacity="')
    .replace(/fill-opacity="/g, 'fillOpacity="')
    .replace(/font-size="/g, 'fontSize="')
    .replace(/font-weight="/g, 'fontWeight="')
    .replace(/text-anchor="/g, 'textAnchor="')
    .replace(/font-family="/g, 'fontFamily="')
    .replace(/aria-label="/g, 'ariaLabel="')
    .replace(/aria-expanded="/g, 'ariaExpanded="')
    .replace(/aria-controls="/g, 'ariaControls="')
    .replace(/data-state="/g, 'dataState="')
    .replace(/data-orientation="/g, 'dataOrientation="')
    .replace(/clip-rule="/g, 'clipRule="')
    .replace(/fill-rule="/g, 'fillRule="')
    .replace(/<img([^>]*[^\/])>/g, '<img$1 />')
    .replace(/<input([^>]*[^\/])>/g, '<input$1 />')
    .replace(/<br>/g, '<br />')
    .replace(/<hr>/g, '<hr />');

  // Convert href="/..." to Link or standard paths
  jsx = jsx.replace(/href="\/([^"]*)"/g, 'to="/$1"');

  const componentName = file.replace('.html', '');
  console.log(`Extracted ${file} -> ${componentName}`);

  fs.writeFileSync(path.join(outDir, `${componentName}.raw.jsx`), jsx, 'utf-8');
});
