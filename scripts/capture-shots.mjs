// Renders reference screenshots of the running app into design-inspiration/screens.
// Usage: npm start (in another terminal), then `npm run shots`
//        BASE=http://localhost:3000 npm run shots
import puppeteer from 'puppeteer-core';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(existsSync);

if (!CHROME) {
  console.error('Chrome or Edge is required to capture screenshots.');
  process.exit(1);
}

const BASE = process.env.BASE || 'http://localhost:3111';
const OUT = process.env.OUT || 'design-inspiration/screens';
const IMAGE = process.env.IMAGE || 'public/pressure.png';
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--force-device-scale-factor=1'],
});

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function settle(page) {
  await page.evaluate(() => document.fonts?.ready);
  await page.evaluate(async () => {
    // Trigger lazy images before a full-page capture, without smooth scrolling.
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    html.style.scrollBehavior = previous;
  });
  await wait(600);
}

async function shootLanding() {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 60000 });
  await settle(page);
  await page.screenshot({ path: join(OUT, 'landing-desktop.png') });
  await page.screenshot({ path: join(OUT, 'landing-full.png'), fullPage: true });

  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await wait(400);
  await page.screenshot({ path: join(OUT, 'landing-dark.png') });
  console.log('landing desktop + dark');
  await page.close();

  const mobile = await browser.newPage();
  await mobile.setViewport({ width: 390, height: 844 });
  await mobile.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 60000 });
  await settle(mobile);
  await mobile.screenshot({ path: join(OUT, 'landing-mobile.png') });
  console.log('landing mobile');
  await mobile.close();
}

async function shootEditor() {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + '/app', { waitUntil: 'networkidle0', timeout: 60000 });
  await settle(page);
  await page.screenshot({ path: join(OUT, 'editor-empty.png') });

  const input = await page.waitForSelector('input[type=file]', { timeout: 20000 });
  await input.uploadFile(IMAGE);
  await page.waitForSelector('img[alt="Removed bg"]', { timeout: 240000, visible: true });
  await wait(600);

  await page.evaluate(() => {
    const add = [...document.querySelectorAll('button')].find((el) =>
      (el.textContent || '').includes('Add New Text Set')
    );
    add?.click();
  });
  await wait(700);
  await page.evaluate(() => {
    const trigger = [...document.querySelectorAll('button')].find(
      (el) => (el.textContent || '').trim() === 'edit'
    );
    trigger?.click();
  });
  await wait(700);
  await page.screenshot({ path: join(OUT, 'editor-filled.png') });
  console.log('editor empty + filled');
  await page.close();

  const mobile = await browser.newPage();
  await mobile.setViewport({ width: 390, height: 844 });
  await mobile.goto(BASE + '/app', { waitUntil: 'networkidle0', timeout: 60000 });
  await settle(mobile);
  await mobile.screenshot({ path: join(OUT, 'editor-mobile.png') });
  console.log('editor mobile');
  await mobile.close();

  const dark = await browser.newPage();
  await dark.setViewport({ width: 1440, height: 900 });
  await dark.goto(BASE + '/app', { waitUntil: 'networkidle0', timeout: 60000 });
  await dark.evaluate(() => document.documentElement.classList.add('dark'));
  await settle(dark);
  await dark.screenshot({ path: join(OUT, 'editor-dark.png') });
  console.log('editor dark');
  await dark.close();
}

await shootLanding();
await shootEditor();
await browser.close();
console.log(`Saved to ${OUT}`);
