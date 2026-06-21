import { Recipe, RecipeFilters } from '@/types/recipe';

/** Normalizza una stringa per confronti: minuscolo + senza accenti. */
// Combining diacritical marks (U+0300–U+036F): rimossi dopo la decomposizione NFD
// così "è" -> "e", "à" -> "a", rendendo la ricerca accent-insensitive.
const COMBINING_MARKS = /[̀-ͯ]/g;

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .trim();
}

/**
 * Applica i filtri della schermata elenco:
 * - `query`: ricerca testuale sul titolo (e sui tag).
 * - `courses`: tipo di portata (OR tra le portate selezionate).
 * - `ingredients`: "cosa ho in frigo" — la ricetta deve contenere TUTTI
 *   gli ingredienti indicati (match parziale sul nome).
 */
export function filterRecipes(recipes: Recipe[], filters: RecipeFilters): Recipe[] {
  const q = normalize(filters.query);
  const wanted = filters.ingredients.map(normalize).filter(Boolean);

  return recipes.filter((recipe) => {
    // Filtro testo su titolo + tag.
    if (q) {
      const haystack = normalize(recipe.title + ' ' + (recipe.tags ?? []).join(' '));
      if (!haystack.includes(q)) return false;
    }

    // Filtro portata.
    if (filters.courses.length > 0 && !filters.courses.includes(recipe.course)) {
      return false;
    }

    // Filtro ingredienti: tutti gli ingredienti richiesti devono comparire.
    if (wanted.length > 0) {
      const names = recipe.ingredients.map((i) => normalize(i.name));
      const hasAll = wanted.every((w) => names.some((n) => n.includes(w)));
      if (!hasAll) return false;
    }

    return true;
  });
}

/** Elenco ordinato e deduplicato di tutti gli ingredienti (per i suggerimenti del filtro frigo). */
export function allIngredientNames(recipes: Recipe[]): string[] {
  const set = new Set<string>();
  recipes.forEach((r) => r.ingredients.forEach((i) => set.add(i.name)));
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'it'));
}
