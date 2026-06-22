import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '@/types/recipe';

/**
 * Ricette aggiunte dall'utente con la maschera "+ Aggiungi ricetta".
 *
 * Vengono salvate sul dispositivo (AsyncStorage / memoria del browser) e unite a
 * quelle del ricettario. Restano quindi disponibili anche offline e tra un avvio
 * e l'altro. Hanno lo stesso identico formato delle altre ricette, così funzionano
 * con porzioni, filtri e dosi nei passaggi senza nulla di speciale.
 */

const KEY = 'recipes.user.v1';

export async function loadUserRecipes(): Promise<Recipe[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Recipe[]) : [];
  } catch {
    return [];
  }
}

async function saveAll(recipes: Recipe[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(recipes));
}

/**
 * Salva una ricetta utente (upsert): se esiste già una ricetta con lo stesso id
 * la sostituisce, altrimenti la aggiunge. Serve sia per "aggiungi" sia per
 * "modifica/sostituisci". Restituisce l'elenco aggiornato.
 */
export async function addUserRecipe(recipe: Recipe): Promise<Recipe[]> {
  const current = await loadUserRecipes();
  const exists = current.some((r) => r.id === recipe.id);
  const updated = exists
    ? current.map((r) => (r.id === recipe.id ? recipe : r))
    : [...current, recipe];
  await saveAll(updated);
  return updated;
}

/** Elimina una ricetta utente per id e restituisce l'elenco aggiornato. */
export async function deleteUserRecipe(id: string): Promise<Recipe[]> {
  const current = await loadUserRecipes();
  const updated = current.filter((r) => r.id !== id);
  await saveAll(updated);
  return updated;
}

/* --- Ricette del ricettario "nascoste" dall'utente (rimosse, ma ripristinabili) --- */

const HIDDEN_KEY = 'recipes.hidden.v1';

export async function loadHiddenIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(HIDDEN_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

export async function hideRecipe(id: string): Promise<string[]> {
  const current = await loadHiddenIds();
  if (current.includes(id)) return current;
  const updated = [...current, id];
  await AsyncStorage.setItem(HIDDEN_KEY, JSON.stringify(updated));
  return updated;
}

export async function unhideRecipe(id: string): Promise<string[]> {
  const current = await loadHiddenIds();
  const updated = current.filter((x) => x !== id);
  await AsyncStorage.setItem(HIDDEN_KEY, JSON.stringify(updated));
  return updated;
}
