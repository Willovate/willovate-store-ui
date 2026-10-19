const fs = require('fs');
const path = require('path');

const dir = 'e:/Willovate_store/willovate-store-ui/src/templates/food-restaurants';
let results = [];

function walk(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.match(/photo-[a-zA-Z0-9\-]+/g);
      if (matches) {
        matches.forEach(m => {
          results.push({ file: fullPath, img: m });
        });
      }
    }
  }
}

walk(dir);

const uniqueImages = [...new Set(results.map(r => r.img))];
console.log(`Found ${uniqueImages.length} unique images across ${results.length} total uses.`);
console.log('List of unique images:');
console.log(JSON.stringify(uniqueImages));
