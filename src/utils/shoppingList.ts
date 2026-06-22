import { Recipe } from '@/types/recipe';
import { MealEntry } from '@/types/planner';
import { categorize, ShoppingCategory, SHOPPING_CATEGORIES } from './ingredientCategories';
import { normalize } from './filters';
import { formatQuantity } from './scaleIngredients';

/**
 * Costruisce la lista della spesa a partire dalle ricette messe a calendario in
 * un intervallo di date (es. i prossimi 7 giorni).
 *
 * Unisce gli ingredienti uguali (sommando le quantità quando hanno la stessa
 * unità) e li raggruppa per reparto del supermercato.
 */

export interface AggregatedIngredient {
  /** Chiave normalizzata (per il confronto con la dispensa). */
  key: string;
  name: string;
  category: ShoppingCategory;
  /** Quantità da mostrare (es. "500 g", "3 pz", "q.b."). */
  amount: string;
  /** Titoli delle ricette che usano questo ingrediente. */
  usedIn: string[];
}

export interface ShoppingGroup {
  category: ShoppingCategory;
  items: AggregatedIngredient[];
}

/** Olio e sale sono sempre esclusi dalla lista (si danno per scontati in dispensa). */
function isAlwaysExcluded(name: string): boolean {
  const n = normalize(name);
  return n.includes('olio') || /\bsale\b/.test(n);
}

interface Acc {
  name: string;
  category: ShoppingCategory;
  units: Record<string, number>; // unità -> quantità sommata
  hasQb: boolean; // c'è almeno un "q.b." senza quantità
  usedIn: Set<string>;
}

export function buildShoppingList(
  recipes: Recipe[],
  meals: MealEntry[],
  dateKeys: string[]
): ShoppingGroup[] {
  const wantedDates = new Set(dateKeys);
  const byId = new Map(recipes.map((r) => [r.id, r]));
  const acc = new Map<string, Acc>();

  for (const meal of meals) {
    if (!wantedDates.has(meal.date)) continue;
    const recipe = byId.get(meal.recipeId);
    if (!recipe) continue;

    for (const ing of recipe.ingredients) {
      if (isAlwaysExcluded(ing.name)) continue;
      const key = normalize(ing.name);
      if (!acc.has(key)) {
        acc.set(key, { name: ing.name, category: categorize(ing.name), units: {}, hasQb: false, usedIn: new Set() });
      }
      const entry = acc.get(key)!;
      entry.usedIn.add(recipe.title);
      if (ing.quantity == null) {
        entry.hasQb = true;
      } else {
        const u = ing.unit ?? '';
        entry.units[u] = (entry.units[u] ?? 0) + ing.quantity;
      }
    }
  }

  // Trasforma l'accumulatore in elementi mostrabili.
  const items: AggregatedIngredient[] = [];
  for (const [key, entry] of acc) {
    const parts = Object.entries(entry.units).map(([u, q]) => {
      const qty = formatQuantity(q, u);
      return u ? `${qty} ${u}` : qty;
    });
    if (entry.hasQb && parts.length === 0) parts.push('q.b.');
    items.push({
      key,
      name: entry.name,
      category: entry.category,
      amount: parts.join(' + '),
      usedIn: Array.from(entry.usedIn),
    });
  }

  // Raggruppa per categoria, nell'ordine dei reparti.
  return SHOPPING_CATEGORIES.map((category) => ({
    category,
    items: items
      .filter((i) => i.category === category)
      .sort((a, b) => a.name.localeCompare(b.name, 'it')),
  })).filter((g) => g.items.length > 0);
}
