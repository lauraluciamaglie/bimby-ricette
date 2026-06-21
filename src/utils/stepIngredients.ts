import { Ingredient, RecipeStep } from '@/types/recipe';
import { normalize } from './filters';

/**
 * Capisce quali ingredienti sono usati in un passaggio, così da mostrarne le dosi
 * (aggiornate alle porzioni) direttamente sotto il passaggio.
 *
 * Due modi:
 *  - se il passaggio ha `ingredientRefs`, usa quelli (preciso);
 *  - altrimenti riconosce gli ingredienti citati nel testo del passaggio.
 */

const STOPWORDS = ['di', 'del', 'della', 'dei', 'degli', 'delle', 'da', 'a', 'al', 'in', 'con', 'e', 'lo', 'la', 'il'];

/** Parola chiave principale di un ingrediente (es. "Riso Carnaroli" -> "riso"). */
function keyword(name: string): string {
  const words = normalize(name)
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOPWORDS.includes(w));
  return words[0] ?? normalize(name);
}

export function ingredientsForStep(step: RecipeStep, ingredients: Ingredient[]): Ingredient[] {
  if (step.ingredientRefs && step.ingredientRefs.length > 0) {
    const refs = step.ingredientRefs;
    return ingredients.filter((i) => refs.includes(i.id));
  }

  const stepWords = normalize(step.text).split(/[^a-z0-9]+/).filter(Boolean);
  return ingredients.filter((ing) => {
    const k = keyword(ing.name);
    if (k.length < 3) return false;
    // Match se una parola del passaggio inizia con la parola chiave
    // (gestisce i plurali: riso/risi, pomodoro/pomodori, patata/patate).
    return stepWords.some((w) => w.startsWith(k) || k.startsWith(w));
  });
}
