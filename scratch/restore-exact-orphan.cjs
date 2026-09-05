const fs = require('fs');
const path = require('path');

const rawPath = path.join(__dirname, '../src/pages/extracted/orphan.raw.jsx');
let raw = fs.readFileSync(rawPath, 'utf-8');

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

// Replace buttons with onOpenDonateModal
raw = raw.replace(/<button([^>]*>[\s\S]*?(?:تبرّع|تبرع|اكفل|ساهم|ادعم)[\s\S]*?<\/button>)/gi, (match) => {
  if (!match.includes('onClick')) {
    return match.replace('<button', '<button onClick={() => onOpenDonateModal && onOpenDonateModal()}');
  }
  return match;
});

// Fix FAQ accordions
raw = raw.replace(/<button type="button" ariaControls="(radix-:[a-z0-9]+:)" ariaExpanded="false" dataState="closed" dataOrientation="vertical" id="(radix-:[a-z0-9]+:)"/g, (match, controlsId, btnId) => {
  return `<button type="button" onClick={() => toggleFaq('${controlsId}')} ariaControls="${controlsId}" ariaExpanded={openFaq === '${controlsId}'} dataState={openFaq === '${controlsId}' ? 'open' : 'closed'} dataOrientation="vertical" id="${btnId}"`;
});

raw = raw.replace(/<div dataState="closed" id="(radix-:[a-z0-9]+:)" hidden=""/g, (match, id) => {
  return `<div dataState={openFaq === '${id}' ? 'open' : 'closed'} id="${id}" hidden={openFaq !== '${id}'}`;
});

// Now wrap in component with carousel navigation handlers
const componentCode = `import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Orphan({ onOpenDonateModal }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="flex-1">
      ${raw}
    </div>
  );
}
`;

const destPath = path.join(__dirname, '../src/pages/Orphan.jsx');
fs.writeFileSync(destPath, componentCode, 'utf-8');
console.log('Restored exact Orphan.jsx from original scraped DOM!');
