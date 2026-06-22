/**
 * Patch post-export per la PWA.
 *
 * `expo export --platform web` genera `dist/index.html` ma, senza expo-router,
 * non possiamo personalizzarne l'<head>. Qui iniettiamo i tag necessari perché
 * "Aggiungi alla schermata Home" su iOS/iPadOS apra l'app a tutto schermo
 * (standalone) con l'icona del grembiule.
 *
 * Eseguito automaticamente da `npm run build:web`.
 */
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const INDEX = path.join(DIST, 'index.html');

const HEAD_TAGS = `
    <!-- PWA / iOS Add to Home Screen (iniettati da scripts/inject-pwa.js) -->
    <link rel="manifest" href="manifest.json" />
    <meta name="theme-color" content="#17BEBB" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Cooking Lalla" />
    <meta name="mobile-web-app-capable" content="yes" />
    <link rel="apple-touch-icon" href="icons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192.png" />
`;

function main() {
  if (!fs.existsSync(INDEX)) {
    console.error('✗ dist/index.html non trovato. Esegui prima `expo export --platform web`.');
    process.exit(1);
  }

  let html = fs.readFileSync(INDEX, 'utf8');

  if (html.includes('apple-mobile-web-app-capable')) {
    console.log('• Tag PWA già presenti, nessuna modifica.');
    return;
  }

  // Inserisce i tag subito dopo l'apertura di <head>.
  html = html.replace(/<head[^>]*>/i, (match) => match + HEAD_TAGS);
  fs.writeFileSync(INDEX, html, 'utf8');

  // Verifica che il manifest sia stato copiato da /public.
  const manifestOut = path.join(DIST, 'manifest.json');
  if (!fs.existsSync(manifestOut)) {
    console.warn('⚠ manifest.json non presente in dist/. Assicurati che la cartella public/ esista.');
  }

  console.log('✓ Tag PWA iniettati in dist/index.html');
  console.log('  La build statica in dist/ è pronta per l\'hosting (Netlify, Vercel, GitHub Pages…).');
}

main();
