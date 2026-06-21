# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Cos'è

App **Bimby Ricette** per uso personale. Un'unica base Expo + React Native + TypeScript
che gira come **PWA** (target principale, da aggiungere alla Home di iPhone/iPad) e,
opzionalmente, come app nativa iOS. Niente backend proprio, niente autenticazione.

## Comandi

```bash
npm install            # deps + postinstall: genera icone in /assets e /public/icons
npm start              # Expo Dev Server (menu: web / iOS / Android)
npm run web            # avvia direttamente la web app
npm run build:web      # esporta la PWA statica in dist/ + inietta i tag iOS (inject-pwa.js)
npm run serve:web      # anteprima locale della build (npx serve dist)
npm run typecheck      # tsc --noEmit (non c'è ancora una suite di test)
npm run generate-icon  # rigenera tutte le icone dal logo grembiule
```

Non esiste ancora una test suite né un linter configurati: `npm run typecheck` è il
controllo principale prima di considerare "fatto" un cambiamento.

## Architettura

**Layout responsive (un solo albero di componenti per iPhone e iPad).**
`useResponsiveLayout` decide in base alla **larghezza della finestra** (non al tipo di
device, così funziona anche in Split View iPad). `RootNavigator` di conseguenza:
- larghezza ≥ 700pt → `TabletHomeScreen`: master-detail a due colonne, **senza** stack di
  navigazione; lo stato `selected` vive nello screen.
- larghezza < 700pt → stack React Navigation `RecipeList` → `RecipeDetail`.

Entrambi i percorsi riusano gli stessi "pane": `RecipeListPane` (presentazionale) +
`ConnectedRecipeList` (lo collega a dati e filtri) e `RecipeDetailPane`. Quando si
aggiunge una feature alla lista o al dettaglio, modificare i *pane*, non i singoli screen.

**Sorgente dati astratta (`src/data/recipeSource.ts`) — il punto chiave.**
La UI non sa da dove arrivano le ricette. Strategia offline-first:
1. `getInitialRecipes()` → cache AsyncStorage, altrimenti `SEED_RECIPES` (render immediato).
2. `refreshRecipes()` → scarica il JSON remoto (`app.json` → `extra.recipesRemoteUrl`),
   valida, aggiorna la cache; in caso di errore ritorna cache/seed senza lanciare.

Per cambiare backend (Firebase, API REST, ecc.) si reimplementa **solo**
`fetchRemoteRecipes()` mantenendo la firma `() => Promise<Recipe[]>`. Niente altro cambia.
Il JSON remoto deve essere conforme a `src/types/recipe.ts` (vedi
`data-remote/recipes.example.json`); accetta sia `[...]` sia `{ "recipes": [...] }`.

**Stato.** Due context/hook, nessuna libreria di state management:
- `useRecipes` (`hooks/useRecipes.tsx`): ricette globali, `loading/refreshing`, `refresh`.
- `useRecipeFilters` (`hooks/useRecipeFilters.ts`): stato filtri locale + elenco derivato
  memoizzato via `utils/filters.ts`.

**Logica di dominio pura (testabile senza UI), in `src/utils/`:**
- `scaleIngredients.ts`: ricalcolo porzioni. Fattore = `targetServings / baseServings`.
  Gli ingredienti con `quantity: null` ("q.b.") o `scalable: false` NON vengono scalati.
  `formatQuantity` arrotonda "da cucina" (pezzi → mezzi, virgola decimale italiana).
- `filters.ts`: ricerca accent-insensitive (NFD + rimozione combining marks). Il filtro
  "frigo" richiede che la ricetta contenga **tutti** gli ingredienti selezionati.

## Modello dati

`src/types/recipe.ts` è il contratto condiviso UI ⇄ backend. Punti non ovvi:
- `Recipe.baseServings`: le quantità sono riferite a questo numero; il selettore porzioni
  (1–4) scala rispetto ad esso.
- `RecipeStep.bimby` (`BimbySettings`): tutti i campi opzionali. `temperature` può essere
  un numero **oppure** la stringa `"Varoma"`; `speed` è stringa ("0"–"10", "Turbo",
  "Spiga", "Soft"); `direction` è `"Antiorario"`/`"Orario"`. Renderizzati da `BimbyBadges`.

## Branding e icone

Colori in `src/theme/theme.ts` (turchese `#17BEBB` + bianco). Il logo è un **grembiule
bianco su turchese** definito **due volte dallo stesso disegno**: come componente RN in
`components/ApronLogo.tsx` (in-app) e come SVG in `scripts/generate-icon.js` (genera i
PNG). **Se cambi il disegno, aggiornali entrambi.**

## PWA / "Aggiungi alla schermata Home"

Senza expo-router non si può personalizzare l'`<head>` generato, quindi
`scripts/inject-pwa.js` fa una patch post-export di `dist/index.html` (manifest +
meta `apple-mobile-web-app-*` + apple-touch-icon). È parte di `npm run build:web`.
I file statici stanno in `public/` (copiata in `dist/` da Expo); usano **path relativi**
per funzionare anche in hosting su sottocartella (es. GitHub Pages).
