# Bimby Ricette 🍳

App per consultare ricette per il robot da cucina Bimby, pensata per **uso personale**
su iPhone e iPad. Interfaccia pulita bianco/turchese, ricalcolo porzioni dinamico,
ricerca e filtri, ricettario aggiornabile da remoto senza ripubblicare nulla.

Costruita con **Expo + React Native + TypeScript**: un'unica base di codice che gira
sia come **PWA** (web, da aggiungere alla schermata Home) sia, volendo, come **app
nativa** iOS. Per uso personale è consigliata la PWA: niente Mac, niente account Apple
Developer, niente App Store.

## Requisiti

- Node.js 18+ (verificato con Node 24)
- Un browser (Safari su iPhone/iPad per "Aggiungi alla schermata Home")

## ⭐ Percorso consigliato: PWA (shortcut sulla Home, niente App Store)

```bash
npm install        # installa le dipendenze e genera le icone (postinstall)
npm run build:web  # esporta il sito statico in dist/ e inietta i tag PWA
npm run serve:web  # anteprima locale su http://localhost:3000
```

Per usarla sull'iPhone/iPad:

1. Pubblica la cartella `dist/` su un hosting statico gratuito
   (es. **Netlify Drop** trascinando la cartella, **Vercel**, o **GitHub Pages**),
   oppure servila dal PC sulla rete locale.
2. Apri l'URL in **Safari** su iPhone/iPad.
3. Tocca **Condividi → "Aggiungi alla schermata Home"**.
   Comparirà l'icona del grembiule turchese; l'app si apre a tutto schermo (standalone).

> I dati (cache ricette) vengono salvati nel browser, quindi restano disponibili anche offline.

## Sviluppo

```bash
npm start          # Expo Dev Server (scegli web/iOS/Android dal menu)
npm run web        # apre direttamente la versione web nel browser
npm run typecheck  # controllo dei tipi TypeScript
```

## (Opzionale) App nativa iOS via EAS, da Windows senza Mac

Solo se in futuro vorrai pubblicarla sull'App Store (richiede account Apple Developer):

```bash
npm install -g eas-cli
eas login
eas build --platform ios     # build in cloud -> .ipa
eas submit --platform ios    # invio a App Store Connect
```

## Aggiornare il ricettario da remoto

1. Imposta l'URL del JSON in `app.json` → `expo.extra.recipesRemoteUrl`
   (es. un file `recipes.json` su GitHub Raw, un CDN, o un endpoint API).
2. Pubblica un JSON conforme a `data-remote/recipes.example.json`
   (array di ricette **oppure** `{ "recipes": [...] }`).
3. L'app scarica e mette in cache i dati ad ogni avvio (offline-first) e con il
   pull-to-refresh. Nessun aggiornamento dell'app necessario.

Per passare a **Firebase / API REST**: reimplementa solo `fetchRemoteRecipes()` in
`src/data/recipeSource.ts` — la UI non cambia.

## Funzionalità

- **Universale iPhone/iPad**: su iPad layout master-detail a due colonne; su iPhone
  navigazione elenco → dettaglio. La scelta è automatica in base alla larghezza.
- **Ricalcolo porzioni** (1–4 persone): le quantità degli ingredienti si aggiornano
  in tempo reale; gli ingredienti "q.b." e quelli `scalable: false` non vengono scalati.
- **Ricerca** per nome del piatto (accent-insensitive).
- **Filtri**: per portata (Antipasto/Primo/Secondo/Contorno/Dolce) e per ingredienti
  ("Cosa ho in frigo").
- **Parametri Bimby** per ogni passaggio: Tempo, Velocità, Temperatura (incl. Varoma) e
  modalità (Antiorario).

## Struttura

```
App.tsx                      Entry point: provider + gate di caricamento
app.json                     Config Expo (universale iOS + web/PWA, URL remoto in extra)
public/                      File statici copiati in dist/ (manifest.json, icone PWA)
scripts/generate-icon.js     Genera icone/splash (app) e icone PWA (public/) dal logo
scripts/inject-pwa.js        Inietta i tag "Add to Home Screen" iOS in dist/index.html
data-remote/                 Esempio del JSON che il backend deve servire
src/
  types/recipe.ts            Modello dati (contratto UI ⇄ backend)
  theme/theme.ts             Colori (bianco/turchese), spaziature, tipografia
  data/
    seedRecipes.ts           Ricettario incluso (offline + esempio formato)
    recipeSource.ts          Sorgente dati astratta: remoto + cache + fallback
  hooks/
    useRecipes.tsx           Stato globale ricette + refresh
    useRecipeFilters.ts      Stato filtri + elenco filtrato
    useResponsiveLayout.ts   Rilevamento iPhone/iPad
  components/                Componenti UI (lista, dettaglio, filtri, badge…)
  screens/                   Schermate (iPhone) + TabletHomeScreen (iPad)
  navigation/                Stack iPhone + selettore di layout
```
