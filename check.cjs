const fs = require('fs');
const content = fs.readFileSync('src/data/templates.ts', 'utf8');
const urls = [...content.matchAll(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^'"`]+/g)].map(m => m[0]);
console.log('Found ' + urls.length + ' URLs');
const checkUrls = async () => {
  for (const url of new Set(urls)) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (!res.ok) console.log('BROKEN: ' + url + ' (' + res.status + ')');
    } catch (e) {
      console.log('ERROR: ' + url + ' - ' + e.message);
    }
  }
  console.log('Done checking.');
};
checkUrls();
