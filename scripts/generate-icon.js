/**
 * Genera le immagini dell'app (icona, adaptive-icon, splash, favicon) a partire
 * dallo stesso disegno del logo in-app: grembiule bianco su sfondo turchese.
 *
 * Uso:  npm run generate-icon
 * Richiede `sharp` (già in devDependencies).
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TURQUOISE = '#17BEBB';
const ASSETS = path.join(__dirname, '..', 'assets');
const PUBLIC_ICONS = path.join(__dirname, '..', 'public', 'icons');

/** SVG del grembiule. `rounded`/`bg` controllano sfondo e angoli. */
function apronSvg({ size = 1024, rounded = true, bg = TURQUOISE } = {}) {
  const r = rounded ? 220 : 0;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024">
  <rect x="0" y="0" width="1024" height="1024" rx="${r}" ry="${r}" fill="${bg}"/>
  <path d="M512 250 C 470 250 452 286 452 320 L 452 360 L 572 360 L 572 320 C 572 286 554 250 512 250 Z" fill="#FFFFFF"/>
  <path d="M452 360 C 380 372 372 470 372 560 L 372 740 C 372 770 392 790 422 790 L 602 790 C 632 790 652 770 652 740 L 652 560 C 652 470 644 372 572 360 Z" fill="#FFFFFF"/>
  <rect x="452" y="560" width="120" height="110" rx="14" fill="${bg}" opacity="0.18"/>
  <path d="M372 470 C 320 480 290 500 270 520" stroke="#FFFFFF" stroke-width="26" stroke-linecap="round" fill="none"/>
  <path d="M652 470 C 704 480 734 500 754 520" stroke="#FFFFFF" stroke-width="26" stroke-linecap="round" fill="none"/>
</svg>`;
}

async function render(svg, dir, file, size) {
  const out = path.join(dir, file);
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(out);
  console.log('✓', path.relative(path.join(__dirname, '..'), out), `(${size}x${size})`);
}

async function main() {
  if (!fs.existsSync(ASSETS)) fs.mkdirSync(ASSETS, { recursive: true });
  if (!fs.existsSync(PUBLIC_ICONS)) fs.mkdirSync(PUBLIC_ICONS, { recursive: true });

  // --- Asset per l'app nativa (Expo) ---
  // Icona app (iOS arrotonda da sé, ma teniamo gli angoli morbidi anche qui).
  await render(apronSvg({ rounded: true }), ASSETS, 'icon.png', 1024);
  // Adaptive icon Android: solo il grembiule, lo sfondo lo mette il sistema.
  await render(apronSvg({ rounded: false, bg: 'transparent' }), ASSETS, 'adaptive-icon.png', 1024);
  // Splash: grembiule centrato su turchese.
  await render(apronSvg({ rounded: false }), ASSETS, 'splash.png', 1024);
  // Favicon web (usato da Expo come ./assets/favicon.png).
  await render(apronSvg({ rounded: true }), ASSETS, 'favicon.png', 64);

  // --- Asset per la PWA (copiati in dist/ dalla cartella public/) ---
  await render(apronSvg({ rounded: false }), PUBLIC_ICONS, 'icon-192.png', 192);
  await render(apronSvg({ rounded: false }), PUBLIC_ICONS, 'icon-512.png', 512);
  // apple-touch-icon: iOS aggiunge da sé gli angoli arrotondati -> sfondo pieno.
  await render(apronSvg({ rounded: false }), PUBLIC_ICONS, 'apple-touch-icon.png', 180);

  console.log('\nIcone generate in /assets e /public/icons.');
}

main().catch((err) => {
  console.error('Errore nella generazione delle icone:', err);
  process.exit(1);
});
