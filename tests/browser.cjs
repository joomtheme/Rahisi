/* Isolated UI fixture tests; not a Joomla integration test. GPL-2.0-or-later. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const css = read('src/tpl_rahisi/media/css/user.css') + read('src/plg_system_rahisi/media/css/preferences.css');
const js = read('src/plg_system_rahisi/media/js/preferences.js');
const messages = Object.fromEntries(read('src/mod_rahisi/language/en-GB/mod_rahisi.ini')
  .split('\n').filter(x => /^[A-Z_]+=/.test(x)).map(x => { const i = x.indexOf('='); return [x.slice(0,i), x.slice(i+2,-1)]; }));
// Expand only the available branch of the real module markup; PHP itself is not executed.
const moduleMarkup = read('src/mod_rahisi/tmpl/default.php').split('<?php else : ?>')[1]
  .replace(/<\?php echo \$translate\('([A-Z_]+)'\); \?>/g, (_, key) => messages[key])
  .replace(/<\?php echo \$panelId; \?>/g, 'rahisi-fixture')
  .replace(/<\?php echo \$params->get\('panel_open', 0\) \? ' open' : ''; \?>/g, '')
  .replace(/<\?php if \(\$show(?:Scale|Spacing|Contrast|Help)\) : \?>/g, '')
  .replace(/<\?php endif; \?>/g, '');
assert.equal(moduleMarkup.includes('<?php'), false, 'All PHP fixture placeholders expanded');
const fixture = `<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>${css}</style><script>window.Joomla={getOptions:()=>({storageKey:'rahisi:v1:test'})};</script><script src="/preferences.js" defer></script></head><body class="site"><main>${moduleMarkup}<article class="com-content-article__body"><h1>Comfortable reading</h1><p>This is an isolated test article. <a href="#example">Read the example</a>.</p></article>${moduleMarkup.replaceAll('rahisi-fixture','rahisi-second')}</main></body></html>`;
(async () => {
  const server = http.createServer((req,res) => { res.setHeader('Content-Type', req.url === '/preferences.js' ? 'text/javascript' : 'text/html'); res.end(req.url === '/preferences.js' ? js : fixture); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  let checks = 0;
  const pass = () => checks++;
  try {
    browser = await chromium.launch({headless:true});
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const url = `http://127.0.0.1:${server.address().port}`;
    await page.goto(url);
    const panel = page.locator('[data-rahisi-panel]').first();
    await panel.locator('summary').focus();
    await page.keyboard.press('Enter');
    assert.equal(await panel.getAttribute('open'), ''); pass();
    await panel.locator('[data-rahisi-scale]').selectOption('200');
    assert.equal(await page.locator('html').getAttribute('data-rahisi-scale'), '200'); pass();
    assert.equal(await page.locator('[data-rahisi-scale]').nth(1).inputValue(), '200'); pass();
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).fontSize), '32px'); pass();
    await panel.locator('[data-rahisi-spacing]').check();
    await panel.locator('[data-rahisi-contrast]').check();
    assert.equal(await page.locator('article').evaluate(el => getComputedStyle(el).color), 'rgb(0, 0, 0)'); pass();
    await page.reload();
    assert.equal(await page.locator('html').getAttribute('data-rahisi-spacing'), 'true'); pass();
    assert.equal(await page.locator('html').getAttribute('data-rahisi-scale'), '200'); pass();
    const tab = await context.newPage(); await tab.goto(url);
    await panel.locator('summary').click();
    await panel.locator('[data-rahisi-reset]').click();
    await tab.waitForFunction(() => document.documentElement.dataset.rahisiScale === '100'); pass();
    assert.equal(await page.evaluate(() => localStorage.getItem('rahisi:v1:test')), null); pass();
    await page.evaluate(() => localStorage.setItem('rahisi:v1:test', '{broken'));
    await page.reload();
    assert.equal(await page.locator('html').getAttribute('data-rahisi-scale'), '100'); pass();
    await page.evaluate(() => localStorage.setItem('rahisi:v1:test', JSON.stringify({scale:999, spacing:'true', contrast:1})));
    await page.reload();
    assert.equal(await page.locator('html').getAttribute('data-rahisi-contrast'), 'false'); pass();
    await page.setViewportSize({width:320,height:900});
    await panel.locator('summary').click();
    await panel.locator('[data-rahisi-scale]').selectOption('200');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true); pass();
    const blocked = await browser.newContext();
    await blocked.addInitScript(() => { Object.defineProperty(window, 'localStorage', {get() {throw new Error('Blocked');}}); });
    const bp = await blocked.newPage(); await bp.goto(url);
    await bp.locator('summary').first().click();
    await bp.locator('[data-rahisi-scale]').first().selectOption('150');
    assert.match(await bp.locator('[data-rahisi-status]').first().textContent(), /page only/); pass();
    const nojs = await browser.newContext({javaScriptEnabled:false});
    const np = await nojs.newPage(); await np.goto(url);
    assert.equal(await np.locator('article').isVisible(), true); pass();
    assert.equal(await np.locator('[data-rahisi-controls]').first().isDisabled(), true); pass();
    assert.deepEqual(errors, []); pass();
    console.log(`PASS: ${checks} Chromium fixture checks; NOT Joomla integration.`);
  } finally { if (browser) await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
