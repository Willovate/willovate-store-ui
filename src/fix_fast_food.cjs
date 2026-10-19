const fs = require('fs');
const path = require('path');

const dir = 'e:/Willovate_store/willovate-store-ui/src/templates/food-restaurants/fast-food';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.tsx')) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/const image = /g, 'const img = ');
    content = content.replace(/image\(/g, 'img(');
    fs.writeFileSync(fullPath, content, 'utf8');
  }
}
