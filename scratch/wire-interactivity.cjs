const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');

  // Replace static buttons containing donate text with onClick={onOpenDonateModal}
  content = content.replace(/<button([^>]*>[\s\S]*?(?:تبرّع|تبرع|اكفل|ساهم|ادعم|انخرط)[\s\S]*?<\/button>)/gi, (match) => {
    if (!match.includes('onClick')) {
      return match.replace('<button', '<button onClick={() => onOpenDonateModal && onOpenDonateModal()}');
    }
    return match;
  });

  // Fix FAQ accordion buttons data-state and click handler
  content = content.replace(/<button type="button" ariaControls="(radix-:[a-z0-9]+:)" ariaExpanded="false" dataState="closed" dataOrientation="vertical" id="(radix-:[a-z0-9]+:)"/g, (match, controlsId, btnId) => {
    return `<button type="button" onClick={() => toggleFaq('${controlsId}')} ariaControls="${controlsId}" ariaExpanded={openFaq === '${controlsId}'} dataState={openFaq === '${controlsId}' ? 'open' : 'closed'} dataOrientation="vertical" id="${btnId}"`;
  });

  // Make hidden content visible when openFaq matches
  content = content.replace(/<div dataState="closed" id="(radix-:[a-z0-9]+:)" hidden=""/g, (match, id) => {
    return `<div dataState={openFaq === '${id}' ? 'open' : 'closed'} id="${id}" hidden={openFaq !== '${id}'}`;
  });

  fs.writeFileSync(path.join(pagesDir, file), content, 'utf-8');
});

console.log('Interactivity successfully wired to all page components!');
