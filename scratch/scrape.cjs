const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://unsplash.com/s/photos/linen-furniture', { waitUntil: 'networkidle2' });
  
  const html = await page.content();
  const matches = html.match(/photo-[a-zA-Z0-9\-]+/g) || [];
  const ids = [...new Set(matches.map(m => m.replace('photo-', '')))];
  
  console.log('NEW FROM PUPPETEER: ' + ids.slice(0, 25).join(', '));
  
  await browser.close();
})();
