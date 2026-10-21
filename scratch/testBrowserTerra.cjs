const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const urls = [
    'http://localhost:5173/preview/terra'
  ];

  for (const url of urls) {
    console.log(`\nTesting ${url}`);
    
    page.on('console', msg => {
      console.log(`CONSOLE [${msg.type()}]: ${msg.text()}`);
    });
    
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    console.log(`Body length: ${bodyHTML.length}`);
    
    const rootHTML = await page.evaluate(() => document.getElementById('root')?.innerHTML || '');
    console.log(`Root length: ${rootHTML.length}`);
  }

  await browser.close();
})();
