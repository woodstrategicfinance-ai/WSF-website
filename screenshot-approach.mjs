import puppeteer from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
await page.evaluate(() => {
  document.getElementById('approach').scrollIntoView({ behavior: 'instant' });
});
await new Promise(r => setTimeout(r, 300));

// Click Project-based tab
await page.evaluate(() => {
  const tabs = document.querySelectorAll('#approach .tab-btn');
  tabs.forEach(t => { if (t.textContent.trim() === 'Project-based') t.click(); });
});
await new Promise(r => setTimeout(r, 300));

const el = await page.$('#approach');
await el.screenshot({ path: './temporary screenshots/screenshot-approach-project.png' });
await browser.close();
console.log('Screenshot saved.');
