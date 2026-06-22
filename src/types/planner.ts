import { ShoppingCategory } from '@/utils/ingredientCategories';

/** I quattro momenti della giornata pianificabili a calendario. */
export type MealSlot = 'Colazione' | 'Pranzo' | 'Merenda' | 'Cena';

export const MEAL_SLOTS: MealSlot[] = ['Colazione', 'Pranzo', 'Merenda', 'Cena'];

/** Una voce del calendario: una ricetta assegnata a un giorno e a un pasto. */
export interface MealEntry {
  id: string;
  /** Data nel formato YYYY-MM-DD. */
  date: string;
  slot: MealSlot;
  recipeId: string;
}

/** Un articolo aggiunto a mano alla lista della spesa. */
export interface ManualShoppingItem {
  id: string;
  name: string;
  category: ShoppingCategory;
  /** True quando è già nel carrello (preso). */
  checked: boolean;
}
