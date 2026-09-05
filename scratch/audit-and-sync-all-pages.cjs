const fs = require('fs');
const path = require('path');
const babel = require('@babel/parser');

const clonedPagesDir = path.join(__dirname, '../cloned-site/pages');
const pagesDestDir = path.join(__dirname, '../src/pages');

// Map of html filename to jsx filename and component name
const pageMap = [
  { html: 'home.html', jsx: 'HomePageCloned.jsx', name: 'HomePageCloned' },
  { html: 'donate.html', jsx: 'Donate.jsx', name: 'Donate' },
  { html: 'initiatives.html', jsx: 'Initiatives.jsx', name: 'Initiatives' },
  { html: 'initiatives_01.html', jsx: 'Initiatives01.jsx', name: 'Initiatives01' },
  { html: 'initiatives_02.html', jsx: 'Initiatives02.jsx', name: 'Initiatives02' },
  { html: 'initiatives_03.html', jsx: 'Initiatives03.jsx', name: 'Initiatives03' },
  { html: 'initiatives_04.html', jsx: 'Initiatives04.jsx', name: 'Initiatives04' },
  { html: 'initiatives_05.html', jsx: 'Initiatives05.jsx', name: 'Initiatives05' },
  { html: 'initiatives_06.html', jsx: 'Initiatives06.jsx', name: 'Initiatives06' },
  { html: 'initiatives_07.html', jsx: 'Initiatives07.jsx', name: 'Initiatives07' },
  { html: 'initiatives_08.html', jsx: 'Initiatives08.jsx', name: 'Initiatives08' },
  { html: 'initiatives_09.html', jsx: 'Initiatives09.jsx', name: 'Initiatives09' },
  { html: 'initiatives_10.html', jsx: 'Initiatives10.jsx', name: 'Initiatives10' },
  { html: 'campaigns.html', jsx: 'Campaigns.jsx', name: 'Campaigns' },
  { html: 'orphan.html', jsx: 'Orphan.jsx', name: 'Orphan' },
  { html: 'about.html', jsx: 'About.jsx', name: 'About' },
  { html: 'about_association.html', jsx: 'AboutAssociation.jsx', name: 'AboutAssociation' },
  { html: 'about_transparency.html', jsx: 'AboutTransparency.jsx', name: 'AboutTransparency' },
  { html: 'about_cases.html', jsx: 'AboutCases.jsx', name: 'AboutCases' },
  { html: 'volunteer.html', jsx: 'Volunteer.jsx', name: 'Volunteer' }
];

function cleanHtmlToJsx(htmlContent) {
  // Extract <main class="flex-1"> ... </main>
  const match = htmlContent.match(/<main class="flex-1">([\s\S]*?)<\/main>/);
  let mainContent = match ? match[1] : htmlContent;

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

  return mainContent;
}

pageMap.forEach(({ html, jsx, name }) => {
  const htmlPath = path.join(clonedPagesDir, html);
  if (!fs.existsSync(htmlPath)) {
    console.error(`HTML file missing: ${html}`);
    return;
  }

  const rawHtml = fs.readFileSync(htmlPath, 'utf-8');
  const jsxBody = cleanHtmlToJsx(rawHtml);

  const componentContent = `import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ${name}({ onOpenDonateModal }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="flex-1">
      ${jsxBody}
    </div>
  );
}
`;

  const destPath = path.join(pagesDestDir, jsx);
  fs.writeFileSync(destPath, componentContent, 'utf-8');

  // Verify syntax with babel
  try {
    babel.parse(componentContent, { sourceType: 'module', plugins: ['jsx'] });
    console.log(`✓ Synchronized ${jsx} (exact match from ${html})`);
  } catch (err) {
    console.error(`✗ Syntax error in ${jsx}: ${err.message}`);
  }
});
