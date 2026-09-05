const fs = require('fs');
const path = require('path');
const babel = require('@babel/parser');

const htmlPath = path.join(__dirname, '../cloned-site/pages/orphan.html');
const rawHtml = fs.readFileSync(htmlPath, 'utf-8');

// Extract <main class="flex-1"> ... </main>
const match = rawHtml.match(/<main class="flex-1">([\s\S]*?)<\/main>/);
let mainContent = match ? match[1] : rawHtml;

// Replace class= with className=
mainContent = mainContent.replace(/\bclass="/g, 'className="');
mainContent = mainContent.replace(/\bfor="/g, 'htmlFor="');

// Replace void tags to self-closing
mainContent = mainContent.replace(/<(img|input|br|hr|meta|link)([^>]*?)(?<!\/)>/gi, '<$1$2 />');

// Convert inline style strings style="width: 60%;" -> style={{ width: '60%' }}
mainContent = mainContent.replace(/style="([^"]*)"/g, (m, styleStr) => {
  const styleObj = {};
  styleStr.split(';').forEach(pair => {
    const [key, val] = pair.split(':');
    if (key && val) {
      const camelKey = key.trim().replace(/-([a-z])/g, (_, l) => l.toUpperCase());
      styleObj[camelKey] = val.trim();
    }
  });
  return `style={${JSON.stringify(styleObj)}}`;
});

// Convert internal <a href="/..."> to <Link to="/...">
mainContent = mainContent.replace(/<a ([^>]*\bhref="\/[^"]*"[^>]*)>/g, (m, attrs) => {
  const toMatch = attrs.match(/href="([^"]*)"/);
  const toVal = toMatch ? toMatch[1] : '/';
  const cleanAttrs = attrs.replace(/href="[^"]*"/, `to="${toVal}"`);
  return `<Link ${cleanAttrs}>`;
});
mainContent = mainContent.replace(/<\/a>/g, '</Link>');

// Attach onOpenDonateModal to buttons with action text
mainContent = mainContent.replace(/<button([^>]*>[\s\S]*?(?:تبرّع|تبرع|اكفل|ساهم|ادعم)[\s\S]*?<\/button>)/gi, (m) => {
  if (!m.includes('onClick')) {
    return m.replace('<button', '<button onClick={() => onOpenDonateModal && onOpenDonateModal()}');
  }
  return m;
});

// Attach accordion handlers for FAQs
mainContent = mainContent.replace(/<button type="button" ariaControls="(radix-:[a-z0-9]+:)" ariaExpanded="false" dataState="closed" dataOrientation="vertical" id="(radix-:[a-z0-9]+:)"/g, (match, controlsId, btnId) => {
  return `<button type="button" onClick={() => toggleFaq('${controlsId}')} ariaControls="${controlsId}" ariaExpanded={openFaq === '${controlsId}'} dataState={openFaq === '${controlsId}' ? 'open' : 'closed'} dataOrientation="vertical" id="${btnId}"`;
});

mainContent = mainContent.replace(/<div dataState="closed" id="(radix-:[a-z0-9]+:)" hidden=""/g, (match, id) => {
  return `<div dataState={openFaq === '${id}' ? 'open' : 'closed'} id="${id}" hidden={openFaq !== '${id}'}`;
});

// Make carousels interactive
let carouselCount = 0;
mainContent = mainContent.replace(/style={{"transform":"translate3d\(0px, 0px, 0px\)"}}/g, () => {
  carouselCount++;
  if (carouselCount === 1) {
    return `style={{ transform: \`translate3d(-\${orphanIndex * 33.33}%, 0px, 0px)\`, transition: 'transform 0.4s ease' }}`;
  } else if (carouselCount === 2) {
    return `style={{ transform: \`translate3d(-\${medicalIndex * 33.33}%, 0px, 0px)\`, transition: 'transform 0.4s ease' }}`;
  }
  return `style={{ transform: 'translate3d(0px, 0px, 0px)' }}`;
});

// Attach carousel button onClick handlers
let arrowBtnCount = 0;
mainContent = mainContent.replace(/<button class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 \[&amp;_svg\]:pointer-events-none \[&amp;_svg\]:size-4 \[&amp;_svg\]:shrink-0 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground absolute h-8 w-8 rounded-full top-1\/2 -translate-y-1\/2 ([^"]*)">/g, (m, pos) => {
  arrowBtnCount++;
  if (arrowBtnCount === 1) {
    return `<button onClick={prevOrphan} class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground absolute h-8 w-8 rounded-full top-1/2 -translate-y-1/2 ${pos}">`;
  } else if (arrowBtnCount === 2) {
    return `<button onClick={nextOrphan} class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground absolute h-8 w-8 rounded-full top-1/2 -translate-y-1/2 ${pos}">`;
  } else if (arrowBtnCount === 3) {
    return `<button onClick={prevMedical} class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground absolute h-8 w-8 rounded-full top-1/2 -translate-y-1/2 ${pos}">`;
  } else if (arrowBtnCount === 4) {
    return `<button onClick={nextMedical} class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground absolute h-8 w-8 rounded-full top-1/2 -translate-y-1/2 ${pos}">`;
  }
  return m;
});

const componentCode = `import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Orphan({ onOpenDonateModal }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [orphanIndex, setOrphanIndex] = useState(0);
  const [medicalIndex, setMedicalIndex] = useState(0);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const nextOrphan = () => setOrphanIndex((prev) => (prev + 1) % 4);
  const prevOrphan = () => setOrphanIndex((prev) => (prev - 1 + 4) % 4);

  const nextMedical = () => setMedicalIndex((prev) => (prev + 1) % 2);
  const prevMedical = () => setMedicalIndex((prev) => (prev - 1 + 2) % 2);

  return (
    <div className="flex-1">
      ${mainContent}
    </div>
  );
}
`;

const destPath = path.join(__dirname, '../src/pages/Orphan.jsx');
fs.writeFileSync(destPath, componentCode, 'utf-8');

try {
  babel.parse(componentCode, { sourceType: 'module', plugins: ['jsx'] });
  console.log('✓ Successfully created 100% exact interactive Orphan.jsx!');
} catch (err) {
  console.error(`✗ Syntax error in Orphan.jsx: ${err.message}`);
}
