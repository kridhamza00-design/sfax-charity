const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, '../src/pages/HomePageCloned.jsx');
let content = fs.readFileSync(homePath, 'utf-8');

// Import SfaxMap
content = `import SfaxMap from '../components/SfaxMap';\n` + content;

// Replace the map section (which has 0s) with <SfaxMap />
content = content.replace(/<section className="py-20 px-4">[\s\S]*?خريطة الجمعية[\s\S]*?<\/section>/, (match) => {
  return `<SfaxMap />`;
});

fs.writeFileSync(homePath, content, 'utf-8');
console.log('HomePageCloned.jsx updated with SfaxMap component!');
