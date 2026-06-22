import { Recipe } from '@/types/recipe';
import { normalize } from './filters';

/**
 * Regola dell'utente: niente soffritto e niente cipolla/aglio nelle ricette.
 *
 * Questo "filtro" si applica a OGNI ricetta (incluse quelle nuove o remote), così la
 * regola vale sempre senza dover riscrivere le ricette una per una. In pratica:
 *  - rimuove cipolla e aglio dagli ingredienti;
 *  - rimuove i passaggi di soffritto (tritare cipolla/aglio + soffriggere/rosolare);
 *  - rinumera i passaggi rimasti;
 *  - elimina del tutto i piatti in cui cipolla/aglio sono protagonisti.
 */

// Piatti dove cipolla/aglio sono protagonisti ma il titolo non lo dice: vanno eliminati.
const PROTAGONIST_IDS = new Set([
  'pasta-genovese',
  'bagna-cauda',
  'zuppa-cipolle',
  'pasta-aglio-olio',
  'cipolle-borettane',
]);

function isOnionOrGarlic(name: string): boolean {
  const n = normalize(name);
  return n.includes('cipoll') || n.includes('aglio');
}

/** True se il passaggio è un soffritto / preparazione di cipolla o aglio. */
function isSoffrittoStep(text: string): boolean {
  const n = normalize(text);
  if (n.includes('soffrigg')) return true;
  const hasOnionGarlic = n.includes('cipoll') || n.includes('aglio');
  if (hasOnionGarlic && (n.includes('tritar') || n.includes('rosolar'))) {
    return true;
  }
  // Passaggi del tipo "aggiungere l'olio e rosolare/scaldare" (solo base del soffritto).
  if (n.includes('olio e rosolar') || n.includes('olio e scaldar')) return true;
  return false;
}

/** Il titolo indica cipolla/aglio come protagonista? */
function titleIsOnionOrGarlic(title: string): boolean {
  const n = normalize(title);
  return n.includes('cipoll') || n.includes('aglio');
}

export function sanitizeRecipe(recipe: Recipe): Recipe {
  const ingredients = recipe.ingredients.filter((i) => !isOnionOrGarlic(i.name));

  const sorted = recipe.steps.slice().sort((a, b) => a.order - b.order);
  const kept = sorted.filter((s) => !isSoffrittoStep(s.text));
  const removedSoffritto = kept.length < sorted.length;

  // Se ho tolto un soffritto, la ricetta usa l'olio ed è un piatto che cuoce,
  // riaggiungo come primo passaggio "versare e scaldare l'olio" per non lasciare il buco.
  const hasOil = ingredients.some((i) => normalize(i.name).includes('olio'));
  const firstMentionsOil = kept.length > 0 && normalize(kept[0].text).includes('olio');
  const hasCookingStep = kept.some((s) => s.bimby && s.bimby.temperature != null);

  let steps = kept;
  if (removedSoffritto && hasOil && hasCookingStep && !firstMentionsOil) {
    steps = [
      {
        id: 's-olio',
        order: 0,
        text: 'Versare l’olio nel boccale e scaldarlo qualche secondo.',
        bimby: { timeSeconds: 120, speed: '1', temperature: 100 as number },
      },
      ...kept,
    ];
  }

  steps = steps.map((s, idx) => ({ ...s, order: idx + 1 }));
  return { ...recipe, ingredients, steps };
}

export function sanitizeRecipes(recipes: Recipe[]): Recipe[] {
  return recipes
    .filter((r) => !PROTAGONIST_IDS.has(r.id) && !titleIsOnionOrGarlic(r.title))
    .map(sanitizeRecipe);
}
