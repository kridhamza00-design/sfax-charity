const fs = require('fs');
const path = require('path');

const extractedDir = path.join(__dirname, '../src/pages/extracted');
const pagesDir = path.join(__dirname, '../src/pages');

const files = fs.readdirSync(extractedDir).filter(f => f.endsWith('.raw.jsx'));

files.forEach(file => {
  let raw = fs.readFileSync(path.join(extractedDir, file), 'utf-8');

  // Convert inline style strings style="width: 60%;" -> style={{ width: '60%' }}
  raw = raw.replace(/style="([^"]*)"/g, (match, styleStr) => {
    const styleObj = {};
    styleStr.split(';').forEach(pair => {
      const [key, val] = pair.split(':');
      if (key && val) {
        const camelKey = key.trim().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        styleObj[camelKey] = val.trim();
      }
    });
    return `style={${JSON.stringify(styleObj)}}`;
  });

  // Convert <a to="..."> to <Link to="...">
  raw = raw.replace(/<a ([^>]*\bto="[^"]*"[^>]*)>/g, '<Link $1>');
  raw = raw.replace(/<\/a>/g, '</Link>');

  // Make sure Link and React imports are present
  const name = file.replace('.raw.jsx', '');
  let componentName = name.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
  if (componentName === 'Home') componentName = 'HomePageCloned';

  const componentCode = `import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ${componentName}({ onOpenDonateModal }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex-1">
      ${raw}
    </div>
  );
}
`;

  const destPath = path.join(pagesDir, `${componentName}.jsx`);
  fs.writeFileSync(destPath, componentCode, 'utf-8');
  console.log(`Generated ${componentName}.jsx`);
});
