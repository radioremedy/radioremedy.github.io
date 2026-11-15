import sharp from 'sharp';
for (const width of [480,960]) await sharp('img/glffmfpdijhfmcdl.png').resize(width).webp({quality:80}).toFile(`assets/radio-remedy-${width}.webp`);
await sharp('img/glffmfpdijhfmcdl.png').resize(48).png().toFile('assets/favicon.png');
