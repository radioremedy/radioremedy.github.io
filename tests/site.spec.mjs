import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync } from 'node:fs';
const baseline=JSON.parse(readFileSync('docs/content-baseline.json','utf8'));
test('content, navigation, layout and accessibility',async({page})=>{
 const external=[];const errors=[];
 page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1'))external.push(r.url());});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 await expect(page.locator('h1')).toHaveCount(1);
 await expect(page.getByRole('heading',{name:'Watch on YouTube.'})).toBeVisible();
 const channel='https://www.youtube.com/@radioremedyrocks1382';
 await expect(page.locator('#watch').getByRole('link',{name:'Visit Radio Remedy on YouTube'})).toHaveAttribute('href',channel);
 await expect(page.locator('#contact').getByRole('link',{name:'Find us on YouTube'})).toHaveAttribute('href',channel);
 await expect(page.locator('.songs li')).toHaveText(baseline.songs);
 for(const member of baseline.members) await expect(page.locator('.members')).toContainText(member.replace(' - ',''));
 await expect(page.locator('iframe')).toHaveCount(0);expect(external).toEqual([]);
 for(const link of await page.locator('a[href^="#"]').all()){
   const id=(await link.getAttribute('href')).slice(1);await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();
 if (test.info().project.name !== 'desktop') await page.locator('summary').click();
 await page.getByRole('navigation').getByRole('link',{name:'Contact',exact:true}).click();await expect(page).toHaveURL(/#contact$/);
 expect(errors).toEqual([]);
 await page.screenshot({path:`test-results/${test.info().project.name}.png`,fullPage:true});
});
test('players load only on request and retain original recording IDs',async({page})=>{
 await page.route('https://w.soundcloud.com/**',r=>r.fulfill({contentType:'text/html',body:'<html lang="en"><title>Player stub</title><body>Player</body></html>'}));
 await page.goto('/');
 for(const [title,id] of baseline.tracks){
   const article=page.locator('article').filter({has:page.getByRole('heading',{name:title,exact:true})});
   await article.getByRole('button').click();
   await expect(article.locator('iframe')).toHaveAttribute('src',`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&auto_play=false&hide_related=false`);
   await expect(article.locator('iframe')).toHaveAttribute('title',`SoundCloud: ${title}`);
 }
});

test('first screen, menu keyboard behavior, and reduced motion', async ({page}) => {
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 for (const selector of ['.header','.hero-art','h1','.actions .button']) {
  const box=await page.locator(selector).boundingBox();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x+box.width).toBeLessThanOrEqual(page.viewportSize().width);
  expect(box.y+box.height).toBeLessThanOrEqual(page.viewportSize().height);
 }
 if(test.info().project.name !== 'desktop') {
  const hero=await page.locator('.hero').boundingBox();
  expect(hero.y+hero.height).toBeLessThanOrEqual(page.viewportSize().height);
  const artwork=await page.locator('.hero-art').boundingBox();
  const title=await page.locator('h1').boundingBox();
  expect(artwork.y+artwork.height).toBeLessThanOrEqual(title.y);
  const menu=page.locator('summary');
  await expect(page.getByRole('navigation')).toBeHidden();
  await menu.focus();await page.keyboard.press('Enter');
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.screenshot({path:`test-results/${test.info().project.name}-menu.png`});
  await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'About',exact:true})).toBeFocused();
  expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape');await expect(menu).toBeFocused();
  await expect(page.getByRole('navigation')).toBeHidden();
  await menu.click();await page.getByRole('navigation').getByRole('link',{name:'Listen',exact:true}).click();
  await expect(page.locator('#listen')).toBeFocused();
  await expect(page.getByRole('navigation')).toBeHidden();
 }
 await page.goto('/');
 await page.screenshot({path:`test-results/${test.info().project.name}-first-screen.png`});
});
test('original radio icons, manifest and share assets resolve', async ({page,request}) => {
 await page.goto('/');
 const paths=await page.locator('link[rel="icon"],link[rel="apple-touch-icon"],link[rel="manifest"]').evaluateAll(links=>links.map(link=>link.getAttribute('href')));
 for(const path of paths) expect((await request.get('/'+path)).ok()).toBe(true);
 const manifest=await (await request.get('/assets/site.webmanifest')).json();
 for(const icon of manifest.icons) expect((await request.get('/assets/'+icon.src)).ok()).toBe(true);
 expect((await request.get('/assets/share-radio.png')).ok()).toBe(true);
});
test('navigation remains usable without JavaScript', async ({browser}) => {
 const context=await browser.newContext({javaScriptEnabled:false,viewport:test.info().project.use.viewport});
 const page=await context.newPage();await page.goto('http://127.0.0.1:4173/');
 if(test.info().project.name !== 'desktop') await page.locator('summary').click();
 await page.getByRole('navigation').getByRole('link',{name:'Contact',exact:true}).click();
 await expect(page).toHaveURL(/#contact$/);
 await expect(page.locator('#watch a')).toHaveAttribute('href','https://www.youtube.com/@radioremedyrocks1382');
 await context.close();
});

test('player feedback, timeout, recovery and error states', async ({page}) => {
 await page.clock.install();
 let release;
 await page.route('https://w.soundcloud.com/**', async route => {
  await new Promise(resolve => { release=resolve; });
  await route.fulfill({contentType:'text/html',body:'<html lang="en"><title>Player fixture</title><body>Press play</body></html>'});
 });
 await page.goto('/');
 const player=page.locator('.player').first();
 const button=player.getByRole('button');
 await button.click();
 await expect(player.getByRole('status')).toHaveText('Connecting to SoundCloud…');
 await expect(button).toBeDisabled();
 await player.scrollIntoViewIfNeeded();
 await page.screenshot({path:`test-results/${test.info().project.name}-loading.png`});
 await page.clock.fastForward(12001);
 await expect(player.getByRole('status')).toContainText('taking longer');
 await expect(button).toBeEnabled();
 expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
 await page.screenshot({path:`test-results/${test.info().project.name}-slow.png`});
 await expect(page.locator('.soundcloud-link').first()).toBeVisible();
 release();
 await expect(player.getByRole('status')).toContainText('Player opened');
 await page.screenshot({path:`test-results/${test.info().project.name}-loaded.png`});
 await page.unroute('https://w.soundcloud.com/**');
 await page.route('https://w.soundcloud.com/**',route=>route.fulfill({contentType:'text/html',body:'<html lang="en"><title>Retry fixture</title><body>Retry succeeded</body></html>'}));
 await button.click();
 await expect(player.locator('iframe')).toHaveCount(1);
 await expect(player.getByRole('status')).toContainText('Player opened');
 // Browsers do not reliably emit cross-origin network errors: timeout is the real recovery path.
 await player.locator('iframe').dispatchEvent('error');
 await expect(player.getByRole('status')).toContainText('Couldn’t open');
 await page.screenshot({path:`test-results/${test.info().project.name}-error.png`});
 await button.click();
 await expect(player.getByRole('status')).toContainText('Player opened');
});
