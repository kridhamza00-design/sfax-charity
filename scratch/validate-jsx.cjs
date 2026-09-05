const fs = require('fs');
const path = require('path');
const babel = require('@babel/parser');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let code = fs.readFileSync(filePath, 'utf-8');

  // Fix any <a ...></Link> or <Link ...></a>
  code = code.replace(/<a ([^>]*)>([\s\S]*?)<\/Link>/g, '<Link $1>$2</Link>');
  code = code.replace(/<Link ([^>]*)>([\s\S]*?)<\/a>/g, '<Link $1>$2</Link>');

  // Make sure all <a ...> that became <Link ...> have valid to="" attribute if missing
  code = code.replace(/<Link ([^>]*)(?<!to="[^"]*")>/g, (match, attrs) => {
    if (!attrs.includes('to=')) {
      const hrefMatch = attrs.match(/href="([^"]*)"/);
      const toVal = hrefMatch ? hrefMatch[1] : '/';
      return `<Link ${attrs} to="${toVal}">`;
    }
    return match;
  });

  fs.writeFileSync(filePath, code, 'utf-8');

  // Parse with babel to ensure valid syntax
  try {
    babel.parse(code, {
      sourceType: 'module',
      plugins: ['jsx']
    });
    console.log(`✓ ${file} is valid JSX`);
  } catch (err) {
    console.error(`✗ Syntax error in ${file}: ${err.message}`);
  }
});
