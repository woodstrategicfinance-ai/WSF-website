const puppeteer = require('puppeteer');

async function takeScreenshot(url, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: outputPath, fullPage: true });

  await browser.close();
  console.log(`Screenshot saved to ${outputPath}`);
}

// Example usage — replace with your URL
const url = process.argv[2] || 'https://example.com';
const output = process.argv[3] || 'screenshot.png';

takeScreenshot(url, output).catch(console.error);
