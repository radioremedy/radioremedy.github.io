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
