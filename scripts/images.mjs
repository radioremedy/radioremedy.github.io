import sharp from 'sharp';
const source = 'img/glffmfpdijhfmcdl.png';
for (const width of [480,960]) await sharp(source).resize(width).webp({quality:80}).toFile(`assets/radio-remedy-${width}.webp`);
for (const [width, file] of [[48,'favicon'],[180,'apple-touch-icon'],[192,'radio-icon-192'],[512,'radio-icon-512']]) {
  await sharp(source).resize(width).png().toFile(`assets/${file}.png`);
}
// Contain the complete original artwork; never crop its antenna or radio body.
await sharp(source).resize(1200,630,{fit:'contain',background:'#ffffff'}).png().toFile('assets/share-radio.png');
