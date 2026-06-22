import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Recipe } from '@/types/recipe';
import { SEED_RECIPES } from './seedRecipes';
import { sanitizeRecipes } from '@/utils/sanitizeRecipes';

// Ricettario incluso, già "ripulito" (niente soffritto/cipolla/aglio).
const SEED = sanitizeRecipes(SEED_RECIPES);

/**
 * Sorgente dati delle ricette — livello di astrazione tra UI e backend.
 *
 * Strategia attuale ("remote JSON"):
 *   1. Mostra subito le ricette in cache (o il seed incluso) -> avvio istantaneo, offline-first.
 *   2. In parallelo scarica il JSON remoto e aggiorna la cache -> ricettario aggiornabile
 *      senza pubblicare una nuova versione sull'App Store.
 *
 * Per passare a Firebase / API REST basta reimplementare `fetchRemoteRecipes()`
 * mantenendo la stessa firma: la Ui non cambia.
 */

const CACHE_KEY = 'recipes.cache.v1';

const REMOTE_URL: string | undefined =
  (Constants.expoConfig?.extra as { recipesRemoteUrl?: string } | undefined)?.recipesRemoteUrl;

export interface RecipesResult {
  recipes: Recipe[];
  /** Da dove provengono i dati restituiti. */
  source: 'remote' | 'cache' | 'seed';
}

/** Validazione minima per non far crashare la UI con dati remoti malformati. */
function isValidRecipe(value: unknown): value is Recipe {
  if (!value || typeof value !== 'object') return false;
  const r = value as Partial<Recipe>;
  return (
    typeof r.id === 'string' &&
    typeof r.title === 'string' &&
    Array.isArray(r.ingredients) &&
    Array.isArray(r.steps)
  );
}

function parseRecipes(raw: unknown): Recipe[] {
  // Accetta sia `[...]` sia `{ "recipes": [...] }`.
  const list = Array.isArray(raw) ? raw : (raw as { recipes?: unknown })?.recipes;
  if (!Array.isArray(list)) return [];
  // Applica la regola "niente soffritto/cipolla/aglio" anche ai dati remoti.
  return sanitizeRecipes(list.filter(isValidRecipe));
}

async function readCache(): Promise<Recipe[] | null> {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const parsed = parseRecipes(JSON.parse(cached));
    return parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

async function writeCache(recipes: Recipe[]): Promise<void> {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(recipes));
  } catch {
    // La cache è best-effort: in caso di errore l'app resta funzionante.
  }
}

/** Scarica il JSON remoto. Lancia in caso di errore di rete/HTTP. */
async function fetchRemoteRecipes(): Promise<Recipe[]> {
  if (!REMOTE_URL) throw new Error('Nessun URL remoto configurato (app.json -> extra.recipesRemoteUrl).');

  const response = await fetch(REMOTE_URL, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const recipes = parseRecipes(await response.json());
  if (recipes.length === 0) throw new Error('Risposta remota vuota o non valida.');
  return recipes;
}

/**
 * Dati per il primo render: cache se presente, altrimenti il seed incluso.
 * Non fa rete -> immediato.
 */
export async function getInitialRecipes(): Promise<RecipesResult> {
  const cached = await readCache();
  if (cached) return { recipes: cached, source: 'cache' };
  return { recipes: SEED, source: 'seed' };
}

/**
 * Aggiorna dal remoto. In caso di errore ritorna il miglior dato disponibile
 * (cache o seed) senza propagare l'eccezione, così la UI non si rompe offline.
 */
export async function refreshRecipes(): Promise<RecipesResult> {
  try {
    const remote = await fetchRemoteRecipes();
    await writeCache(remote);
    return { recipes: remote, source: 'remote' };
  } catch {
    const cached = await readCache();
    if (cached) return { recipes: cached, source: 'cache' };
    return { recipes: SEED, source: 'seed' };
  }
}
