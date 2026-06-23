# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Cos'è

App **Cooking Lalla** (ricette per il Bimby, uso personale). Unica base **Expo + React
Native + TypeScript** che gira come **PWA** (target principale, pubblicata su GitHub Pages
e aggiunta alla Home di iPhone/iPad). Niente backend proprio, niente autenticazione: tutti
i dati dell'utente (ricette aggiunte/modificate, calendario, spesa) stanno in
**AsyncStorage** sul dispositivo.

Il nome "interno" e lo slug restano `bimby-ricette` (repo, bundle id); il nome mostrato è
"Cooking Lalla" (in `app.json`, `public/manifest.json`, `scripts/inject-pwa.js`, e i titoli
in `TabletHomeScreen.tsx` / `navigation/RecipesStack.tsx`).

## Comandi

```bash
npm install            # deps + postinstall: genera icone in /assets e /public/icons
npm start              # Expo Dev Server (menu: web / iOS / Android)
npm run web            # web app diretta
npm run build:web      # esporta la PWA in dist/ + inietta i tag iOS (inject-pwa.js)
npm run serve:web      # anteprima locale della build statica
npm run typecheck      # tsc --noEmit — UNICO controllo automatico (niente test né linter)
npm run generate-icon  # rigenera le icone dal logo grembiule
```

Su questa rete `npm install` fallisce per certificati: usare sempre
`$env:NODE_OPTIONS="--use-system-ca"` (PowerShell) prima dei comandi npm.
Prima di considerare "fatto" un cambiamento: `npm run typecheck` **e** `npm run build:web`.

## Architettura

### Provider (in `App.tsx`, dall'esterno verso l'interno)
`SafeAreaProvider` → `RecipesProvider` → `PlannerProvider` → `RecipeEditorProvider` →
`Gate` (mostra lo splash finché `useRecipes().loading`, poi `RootNavigator`).

### Navigazione (`navigation/RootNavigator.tsx`)
`NavigationContainer` → **Tab.Navigator** con 3 schede: **Ricette / Calendario / Spesa**.
- Scheda Ricette = `RecipesStack`: se `useResponsiveLayout().isWide` (larghezza ≥ 700pt →
  iPad) usa `TabletHomeScreen` (master-detail a due colonne, niente stack); altrimenti uno
  stack native `RecipeList → RecipeDetail` (iPhone).
- Lista e dettaglio sono "pane" riusabili: `RecipeListPane`/`ConnectedRecipeList` e
  `RecipeDetailPane`. **Aggiungere feature ai pane, non ai singoli screen.** Il dettaglio
  si apre anche in `RecipeDetailModal` (da Calendario/Spesa).

### Dati ricette (catalogo)
- Le ricette del ricettario vivono in `src/data/recipes/*.ts` (per portata: `antipasti.ts`,
  `primi.ts`, …, più `*2.ts` e batch `extra1.ts … extra9.ts`), **aggregate** in
  `src/data/seedRecipes.ts` (`SEED_RECIPES`). Per aggiungere ricette: creare/estendere un
  file e spread-arlo in `seedRecipes.ts`. Gli `id` devono essere unici nell'intero catalogo.
- `src/data/recipeSource.ts` è il livello astratto offline-first: `getInitialRecipes()`
  (cache → seed) e `refreshRecipes()` (JSON remoto da `app.json` → `extra.recipesRemoteUrl`,
  con fallback a cache/seed). Per cambiare backend si reimplementa solo `fetchRemoteRecipes()`.
- **`src/utils/sanitizeRecipes.ts` viene applicato a OGNI ricetta** (seed + remota) dentro
  `recipeSource.ts`. Toglie cipolla/aglio e i passaggi di soffritto, rinumera i passaggi,
  riaggiunge un "versare e scaldare l'olio" come primo passo nei piatti che cuociono, ed
  **elimina** i piatti in cui cipolla/aglio sono protagonisti (lista `PROTAGONIST_IDS`).
  Vedi la regola utente più sotto.

### Ricette dell'utente (override/nuove/nascoste/spostate)
`src/data/userRecipes.ts` + stato in `useRecipes`:
- ricette utente salvate per id; se l'id coincide con una del catalogo, **la sostituisce**
  (override); altrimenti è una ricetta nuova (mostrata in cima).
- `hiddenIds` nasconde ricette del catalogo (rimozione reversibile).
- L'elenco finale (`recipes`) = nuove utente + catalogo con override − nascoste.
- API esposte: `addRecipe` (upsert), `deleteRecipe` (nasconde catalogo / cancella nuova),
  `restoreRecipe` (ripristina catalogo), `moveRecipe(id, course)` (cambia categoria via
  override), `isBuiltIn`, `isCustom`.

### Editor ricette
`RecipeEditorProvider` (`hooks/useRecipeEditor.tsx`) monta **una sola** `AddRecipeModal` a
livello app ed espone `openNew()` / `openEdit(recipe)`. La usano sia "+ Aggiungi ricetta"
(in `ConnectedRecipeList`) sia il pulsante "Modifica" (in `RecipeDetailPane`).

### Calendario e Spesa
`hooks/usePlanner.tsx` (storage proprio):
- `mealPlan`: pasti per giorno/slot (Colazione/Pranzo/Merenda/Cena) → rimandano alle ricette.
  Il **Calendario** mostra 2 settimane; la **Spesa** considera i prossimi **7 giorni**.
- `weekStatus`: per ogni ingrediente della settimana, flag 'have'/'need' scelto dall'utente.
  Solo i 'need' finiscono nella scheda "La mia lista" → sottosezione "Dal calendario".
- `manualItems`: lista della spesa aggiunta a mano, divisa per categoria.
- `utils/shoppingList.ts` aggrega gli ingredienti dei pasti pianificati; **olio, sale e
  acqua sono sempre esclusi** dalla spesa (`isAlwaysExcluded`). `utils/ingredientCategories.ts`
  assegna il reparto.

## Modello dati (`src/types/recipe.ts`)
- `Recipe.baseServings`: le quantità sono riferite a questo numero. Nel dettaglio si scala
  col selettore porzioni **oppure** modificando la dose di un ingrediente (fattore manuale).
- `Ingredient.quantity: null` = "q.b." (non scalato); `scalable: false` = non scalato.
- `RecipeStep.bimby` (`BimbySettings`) tutti opzionali: `temperature` numero **o** `"Varoma"`;
  `speed` stringa ("0"–"10","Turbo","Spiga","Soft"); `direction` "Antiorario"/"Orario".
- `RecipeStep.ingredientRefs` opzionale: altrimenti `utils/stepIngredients.ts` riconosce gli
  ingredienti dal testo per mostrarne le dosi sotto il passaggio.

## Regole utente da rispettare quando si creano/modificano ricette
- **Niente soffritto, niente cipolla/aglio** (lo applica `sanitizeRecipes`, ma scrivere già
  pulito). I piatti dove sono protagonisti vanno in `PROTAGONIST_IDS`, non adattati.
- **Le paste cuociono nel boccale** (one-pot): preparare il condimento, poi aggiungere
  pasta + acqua e cuocere in antiorario/Soft. L'**acqua è un ingrediente** (così scala) ma
  è esclusa dalla spesa.
- **Sughi, ragù e pesti** includono sempre anche il passaggio per cuocere la pasta.
- Ricette prese da siti: **riscriverle con parole proprie** (no copia testuale), saltare
  doppioni/titoli simili a quelle esistenti.

## Branding e icone
Colori in `src/theme/theme.ts` (turchese `#17BEBB` + bianco). Il logo (grembiule bianco su
turchese) è definito **due volte dallo stesso disegno**: `components/ApronLogo.tsx` (in-app)
e `scripts/generate-icon.js` (genera i PNG). Se cambi il disegno, aggiorna entrambi.

## PWA e pubblicazione
- `scripts/inject-pwa.js` fa una patch post-export di `dist/index.html` (manifest + meta
  `apple-mobile-web-app-*` + apple-touch-icon), perché senza expo-router non si può
  personalizzare l'`<head>`. È parte di `npm run build:web`. I file statici stanno in
  `public/` (copiata in `dist/`) e usano **path relativi** (per hosting su sottocartella).
- L'app è pubblicata su **GitHub Pages** del repo `lauraluciamaglie/bimby-ricette`
  (URL: https://lauraluciamaglie.github.io/bimby-ricette/). Il workflow
  `.github/workflows/deploy.yml` su push fa `npm install` + `build:web` + deploy su Pages e
  imposta `EXPO_BASE_URL=/<repo>/` (gestito da `app.config.js`).
- **Pubblicazione delle modifiche**: `scripts/publish-to-github.ps1` con `$env:GH_TOKEN`
  carica i file via **GitHub Contents API** (un file alla volta). NON usa git: questa rete
  blocca sia git locale sia l'API "git data" (blobs/trees); l'API Contents funziona. Lo
  script carica solo i file cambiati e il workflow di Pages ricostruisce da solo.
