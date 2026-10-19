const fs = require('fs');
const path = require('path');

const DIR = 'e:/Willovate_store/willovate-store-ui/src/templates/food-restaurants';

const randomImages = [
  'photo-1544025162-d76538a679db',
  'photo-1565299624946-b28f40a0ae38',
  'photo-1513104890138-7c749659a591',
  'photo-1574071318508-1cdbab80d002',
  'photo-1604382354936-07c5d9983bd3',
  'photo-1628840042765-356cda07504e',
  'photo-1595854341625-f33ee10dbf98',
  'photo-1588315029754-2dd089d39a1a',
  'photo-1534308983496-4fabb1a015ee',
  'photo-1528137871618-79d2761e3fd5',
  'photo-1576458088443-04a19bb13da6',
  'photo-1571407970349-bc81e7e96d47',
  'photo-1440516851687-7a8a3a48e2d4',
  'photo-1558030137-a56c1b002c99',
  'photo-1555939594-58d7cb561ad1',
  'photo-1529193591184-b1d58069ecdd',
  'photo-1592415486689-125cbbfcbee2',
  'photo-1555396273-367ea4eb4db5',
  'photo-1585937421612-70a008356fbe',
  'photo-1596797038530-2c107229654b',
  'photo-1631515243349-e0cb75fb8d3a',
  'photo-1516714435131-44d6b64dc6a2',
  'photo-1567188040759-fb8a883dc6d8',
  'photo-1549007994-cb92caebd54b',
  'photo-1606313564200-e75d5e30476c',
  'photo-1578985545062-69928b1d9587',
  'photo-1587314168485-3236d6710814'
];

function getRandomImage() {
  return randomImages[Math.floor(Math.random() * randomImages.length)];
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') && !fullPath.includes('components')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Basic logic: find { name: '...', price: '...', desc: '...' } inside menu array
      // and append image: img('...')
      
      // Check if it already has image:
      if (content.includes('image: img(')) continue;
      
      let updated = false;
      content = content.replace(/(\{\s*name:\s*['"][^'"]+['"],\s*price:\s*['"][^'"]+['"],\s*desc:\s*['"][^'"]+['"](?:,\s*tags:\s*\[[^\]]+\])?)\s*\}/g, (match, p1) => {
        updated = true;
        return `${p1}, image: img('${getRandomImage()}') }`;
      });
      
      if (updated) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${file}`);
      }
    }
  }
}

processDirectory(DIR);
