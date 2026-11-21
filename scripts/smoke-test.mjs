import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(existsSync);

const BASE = process.env.BASE || 'http://localhost:3111';
const IMAGE = process.argv[2] || 'public/pressure.png';

const results = { consoleErrors: [], pageErrors: [], external: [], internal: 0, removed: null };

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });

page.on('console', (m) => { if (m.type() === 'error') results.consoleErrors.push(m.text()); });
page.on('pageerror', (e) => results.pageErrors.push(String(e)));
page.on('request', (req) => {
  const url = req.url();
  if (url.startsWith('data:') || url.startsWith('blob:')) return;
  if (new URL(url).origin === new URL(BASE).origin) results.internal++;
  else results.external.push(url);
});

try {
  await page.goto(BASE + '/app', { waitUntil: 'networkidle0', timeout: 60000 });
  console.log('editor loaded, title =', await page.title());

  const input = await page.waitForSelector('input[type=file]', { timeout: 20000 });
  await input.uploadFile(IMAGE);
  console.log('image uploaded, waiting for background removal...');

  const start = Date.now();
  await page.waitForSelector('img[alt="Removed bg"]', { timeout: 240000, visible: true });
  const secs = ((Date.now() - start) / 1000).toFixed(1);

  results.removed = await page.$eval('img[alt="Removed bg"]', (el) => ({
    src: el.src.slice(0, 30) + '...',
    naturalWidth: el.naturalWidth,
    naturalHeight: el.naturalHeight,
  }));
  console.log(`background removed in ${secs}s ->`, results.removed);

  // Add a text layer and confirm the customizer is usable.
  const clickByText = async (text) => {
    const btns = await page.$$('button');
    for (const b of btns) {
      const t = await b.evaluate((el) => el.textContent);
      if (t && t.includes(text)) { await b.click(); return true; }
    }
    return false;
  };
  await clickByText('Add New Text Set');
  await new Promise((r) => setTimeout(r, 1200));
  const btnInfo = await page.evaluate(() =>
    [...document.querySelectorAll('button')].map((b) => ({
      t: (b.textContent || '').trim().slice(0, 30),
      s: b.getAttribute('data-state'),
    }))
  );
  console.log('buttons:', JSON.stringify(btnInfo));
  const clickedTrigger = await page.evaluate(() => {
    const b = [...document.querySelectorAll('button')].find(
      (el) => (el.textContent || '').trim() === 'edit'
    );
    if (b) { b.click(); return true; }
    return false;
  });
  console.log('clicked accordion trigger:', clickedTrigger);
  await page.waitForFunction(
    () => document.body.innerText.toLowerCase().includes('duplicate text set'),
    { timeout: 15000 }
  );
  console.log('text layer added and customizer rendered');

  const isolated = await page.evaluate(() => self.crossOriginIsolated);
  console.log('crossOriginIsolated =', isolated);

  // Verify PNG export via the hidden canvas.
  const { mkdtempSync, readdirSync, statSync, rmSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const dl = mkdtempSync(join(tmpdir(), 'tbi-'));
  const cdp = await page.createCDPSession();
  await cdp.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: dl });
  await clickByText('Save image');
  let file = null;
  for (let i = 0; i < 60; i++) {
    const files = readdirSync(dl).filter((f) => f.endsWith('.png'));
    if (files.length) { file = files[0]; break; }
    await new Promise((r) => setTimeout(r, 250));
  }
  if (file) {
    console.log('PNG export:', file, Math.round(statSync(join(dl, file)).size / 1024), 'KB');
  } else {
    console.log('PNG export: FAILED (no file downloaded)');
  }
  rmSync(dl, { recursive: true, force: true });

  console.log('same-origin requests:', results.internal);
  console.log('external requests:', results.external.length ? results.external : 'none');
  console.log('page errors:', results.pageErrors.length ? results.pageErrors : 'none');
  console.log('console errors:', results.consoleErrors.length ? results.consoleErrors.slice(0, 5) : 'none');

  const ok = results.removed?.naturalWidth > 0 && results.external.length === 0 && results.pageErrors.length === 0 && file;
  console.log(ok ? '\nRESULT: PASS (fully offline pipeline works)' : '\nRESULT: CHECK OUTPUT ABOVE');
  process.exitCode = ok ? 0 : 1;
} catch (e) {
  console.error('TEST FAILED:', e.message);
  console.error('page errors:', results.pageErrors);
  console.error('console errors:', results.consoleErrors.slice(0, 8));
  console.error('external:', results.external);
  process.exitCode = 1;
} finally {
  await browser.close();
}
