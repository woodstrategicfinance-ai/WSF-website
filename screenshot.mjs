import puppeteer from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';

const screenshotDir = join(__dirname, 'temporary screenshots');
if (!existsSync(screenshotDir)) mkdirSync(screenshotDir, { recursive: true });

// Auto-increment
const existing = existsSync(screenshotDir)
  ? readdirSync(screenshotDir).filter(f => f.endsWith('.png')).length
  : 0;
const n = existing + 1;
const filename = `screenshot-${n}${label}.png`;
const outputPath = join(screenshotDir, filename);

const browser = await puppeteer.launch({
  headless: true,
  executablePath: undefined, // use bundled chromium
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await page.screenshot({ path: outputPath, fullPage: true });
await browser.close();

console.log(`Screenshot saved: ${outputPath}`);
