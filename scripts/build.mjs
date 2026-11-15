import { mkdir, cp, rm } from 'node:fs/promises';
await rm('dist', { recursive: true, force: true });
await mkdir('dist');
for (const path of ['index.html', 'assets', 'robots.txt', 'sitemap.xml']) await cp(path, `dist/${path}`, { recursive: true });
console.log('Built static site in dist/');
