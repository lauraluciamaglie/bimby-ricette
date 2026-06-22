import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MealEntry, MealSlot, ManualShoppingItem } from '@/types/planner';
import { ShoppingCategory } from '@/utils/ingredientCategories';
import { normalize } from '@/utils/filters';

/**
 * Stato di Calendario e Spesa, salvato sul dispositivo:
 *  - `mealPlan`: cosa mangiare nei vari giorni/pasti (rimanda alle ricette).
 *  - `pantry`: ingredienti che l'utente ha già ("ce l'ho"), per la lista automatica.
 *  - `manualItems`: articoli aggiunti a mano alla lista della spesa.
 */

const KEY_PLAN = 'mealplan.v1';
const KEY_PANTRY = 'pantry.v1';
const KEY_MANUAL = 'shopping.manual.v1';

interface PlannerContextValue {
  mealPlan: MealEntry[];
  mealsFor: (date: string, slot: MealSlot) => MealEntry[];
  addMeal: (date: string, slot: MealSlot, recipeId: string) => void;
  removeMeal: (id: string) => void;

  pantry: string[]; // nomi ingredienti (normalizzati) già posseduti
  hasInPantry: (name: string) => boolean;
  togglePantry: (name: string) => void;

  manualItems: ManualShoppingItem[];
  addManualItem: (name: string, category: ShoppingCategory) => void;
  toggleManualItem: (id: string) => void;
  removeManualItem: (id: string) => void;
}

const PlannerContext = createContext<PlannerContextValue | undefined>(undefined);

async function loadJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function PlannerProvider({ children }: { children: React.ReactNode }) {
  const [mealPlan, setMealPlan] = useState<MealEntry[]>([]);
  const [pantry, setPantry] = useState<string[]>([]);
  const [manualItems, setManualItems] = useState<ManualShoppingItem[]>([]);

  useEffect(() => {
    (async () => {
      setMealPlan(await loadJson<MealEntry[]>(KEY_PLAN, []));
      setPantry(await loadJson<string[]>(KEY_PANTRY, []));
      setManualItems(await loadJson<ManualShoppingItem[]>(KEY_MANUAL, []));
    })();
  }, []);

  // Helper che aggiorna lo stato e salva, in un colpo solo.
  function persist<T>(key: string, value: T, setter: (v: T) => void) {
    setter(value);
    AsyncStorage.setItem(key, JSON.stringify(value)).catch(() => {});
  }

  const mealsFor = useCallback(
    (date: string, slot: MealSlot) => mealPlan.filter((m) => m.date === date && m.slot === slot),
    [mealPlan]
  );

  const addMeal = useCallback(
    (date: string, slot: MealSlot, recipeId: string) => {
      const entry: MealEntry = { id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, date, slot, recipeId };
      persist(KEY_PLAN, [...mealPlan, entry], setMealPlan);
    },
    [mealPlan]
  );

  const removeMeal = useCallback(
    (id: string) => persist(KEY_PLAN, mealPlan.filter((m) => m.id !== id), setMealPlan),
    [mealPlan]
  );

  const hasInPantry = useCallback((name: string) => pantry.includes(normalize(name)), [pantry]);

  const togglePantry = useCallback(
    (name: string) => {
      const key = normalize(name);
      const next = pantry.includes(key) ? pantry.filter((p) => p !== key) : [...pantry, key];
      persist(KEY_PANTRY, next, setPantry);
    },
    [pantry]
  );

  const addManualItem = useCallback(
    (name: string, category: ShoppingCategory) => {
      const item: ManualShoppingItem = {
        id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: name.trim(),
        category,
        checked: false,
      };
      persist(KEY_MANUAL, [...manualItems, item], setManualItems);
    },
    [manualItems]
  );

  const toggleManualItem = useCallback(
    (id: string) =>
      persist(KEY_MANUAL, manualItems.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)), setManualItems),
    [manualItems]
  );

  const removeManualItem = useCallback(
    (id: string) => persist(KEY_MANUAL, manualItems.filter((i) => i.id !== id), setManualItems),
    [manualItems]
  );

  const value = useMemo(
    () => ({
      mealPlan, mealsFor, addMeal, removeMeal,
      pantry, hasInPantry, togglePantry,
      manualItems, addManualItem, toggleManualItem, removeManualItem,
    }),
    [mealPlan, mealsFor, addMeal, removeMeal, pantry, hasInPantry, togglePantry, manualItems, addManualItem, toggleManualItem, removeManualItem]
  );

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
}

export function usePlanner(): PlannerContextValue {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error('usePlanner deve essere usato dentro <PlannerProvider>.');
  return ctx;
}
