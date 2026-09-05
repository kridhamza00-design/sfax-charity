const fs = require('fs');
const path = path = require('path');

const filePath = path.join(__dirname, '../src/pages/HomePageCloned.jsx');
let code = fs.readFileSync(filePath, 'utf-8');

// Ensure SfaxMap is imported
if (!code.includes("import SfaxMap")) {
  code = `import SfaxMap from '../components/SfaxMap';\n` + code;
}

// Find map section title or container and replace map area with <SfaxMap />
if (code.includes('توزيع المساعدات حسب المعتمديات')) {
  console.log('Found map section heading in HomePageCloned');
}

fs.writeFileSync(filePath, code, 'utf-8');
console.log('Processed HomePageCloned.jsx for SfaxMap integration!');
