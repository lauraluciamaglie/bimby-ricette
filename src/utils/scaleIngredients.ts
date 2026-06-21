import { Ingredient } from '@/types/recipe';

/**
 * Ricalcolo porzioni dinamico.
 *
 * Le quantità in una ricetta sono riferite a `baseServings`. Per mostrarle
 * per `targetServings` moltiplichiamo ogni quantità scalabile per il fattore
 * `targetServings / baseServings`.
 *
 * Gli ingredienti "q.b." (quantity === null) e quelli con `scalable === false`
 * non vengono toccati.
 */

export function scalingFactor(baseServings: number, targetServings: number): number {
  if (!baseServings || baseServings <= 0) return 1;
  return targetServings / baseServings;
}

/** Quantità scalata (numero grezzo, non formattato) per un singolo ingrediente. */
export function scaledQuantity(ingredient: Ingredient, factor: number): number | null {
  if (ingredient.quantity == null) return null;
  if (ingredient.scalable === false) return ingredient.quantity;
  return ingredient.quantity * factor;
}

/**
 * Formatta una quantità per la UI con un arrotondamento "da cucina":
 * - pezzi/spicchi/uova -> intero o mezzo (0.5)
 * - quantità < 10 -> max 1 decimale
 * - quantità >= 10 -> intero
 */
export function formatQuantity(value: number | null, unit?: string): string {
  if (value == null) return 'q.b.';

  const integerUnits = ['pz', 'pezzo', 'pezzi', 'spicchio', 'spicchi', 'uovo', 'uova', 'bustina', 'bustine', 'foglia', 'foglie'];
  const isInteger = unit ? integerUnits.includes(unit.toLowerCase()) : false;

  let rounded: number;
  if (isInteger) {
    // Arrotonda al mezzo pezzo più vicino.
    rounded = Math.round(value * 2) / 2;
  } else if (value < 10) {
    rounded = Math.round(value * 10) / 10;
  } else {
    rounded = Math.round(value);
  }

  // Rimuove il `.0` finale (es. "2.0" -> "2").
  const text = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');
  return text;
}

/** Stringa pronta da mostrare: "200 g", "1,5 spicchio", "q.b.". */
export function displayQuantity(ingredient: Ingredient, factor: number): string {
  const value = scaledQuantity(ingredient, factor);
  const qty = formatQuantity(value, ingredient.unit);
  if (value == null) return qty; // "q.b."
  return ingredient.unit ? `${qty} ${ingredient.unit}` : qty;
}
