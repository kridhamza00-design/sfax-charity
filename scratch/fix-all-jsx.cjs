const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');

  // Fix mismatched <a ...></Link> or <Link ...></a>
  // 1. Convert <a href="/something">...</a> to <Link to="/something">...</Link>
  content = content.replace(/<a ([^>]*\bhref="\/([^"]*)"[^>]*)>([\s\S]*?)<\/Link>/g, '<Link $1 to="/$2">$3</Link>');
  content = content.replace(/<a ([^>]*\bhref="\/([^"]*)"[^>]*)>([\s\S]*?)<\/a>/g, '<Link $1 to="/$2">$3</Link>');
  
  // 2. Fix remaining <a ...></Link> where opening tag is <a ...>
  content = content.replace(/<a ([^>]*\bhref="([^"]*)"[^>]*)>([\s\S]*?)<\/Link>/g, (match, attrs, href, inner) => {
    if (href.startsWith('/') || href.startsWith('to=')) {
      return `<Link ${attrs.replace(/href="/, 'to="')}>${inner}</Link>`;
    }
    return `<a ${attrs}>${inner}</a>`;
  });

  // 3. Fix remaining <Link ...></a> where closing tag is </a>
  content = content.replace(/<Link ([^>]*)>([\s\S]*?)<\/a>/g, '<Link $1>$2</Link>');

  // 4. Fix double imports
  content = content.replace(/(import React, { useState } from 'react';\n)+/g, "import React, { useState } from 'react';\n");

  fs.writeFileSync(path.join(pagesDir, file), content, 'utf-8');
});

console.log('Fixed all JSX tag mismatches in page components!');
