import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MealEntry, MealSlot, ManualShoppingItem } from '@/types/planner';
import { ShoppingCategory } from '@/utils/ingredientCategories';
import { normalize } from '@/utils/filters';

/**
 * Stato di Calendario e Spesa, salvato sul dispositivo:
 *  - `mealPlan`: cosa mangiare nei vari giorni/pasti (rimanda alle ricette).
 *  - `weekStatus`: per ogni ingrediente della settimana, il flag scelto
 *    dall'utente: 'have' (ce l'ho) o 'need' (da comprare). Se non c'è, l'utente
 *    non l'ha ancora toccato (e quindi non finisce nella lista della spesa).
 *  - `manualItems`: articoli aggiunti a mano alla lista della spesa.
 */

const KEY_PLAN = 'mealplan.v1';
const KEY_WEEK = 'weekstatus.v1';
const KEY_MANUAL = 'shopping.manual.v1';

export type IngredientStatus = 'have' | 'need';

interface PlannerContextValue {
  mealPlan: MealEntry[];
  mealsFor: (date: string, slot: MealSlot) => MealEntry[];
  addMeal: (date: string, slot: MealSlot, recipeId: string) => void;
  removeMeal: (id: string) => void;

  /** Flag scelti dall'utente per gli ingredienti della settimana (chiave = nome normalizzato). */
  weekStatus: Record<string, IngredientStatus>;
  statusOf: (name: string) => IngredientStatus | undefined;
  setStatus: (name: string, status: IngredientStatus | null) => void;

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
  const [weekStatus, setWeekStatus] = useState<Record<string, IngredientStatus>>({});
  const [manualItems, setManualItems] = useState<ManualShoppingItem[]>([]);

  useEffect(() => {
    (async () => {
      setMealPlan(await loadJson<MealEntry[]>(KEY_PLAN, []));
      setWeekStatus(await loadJson<Record<string, IngredientStatus>>(KEY_WEEK, {}));
      setManualItems(await loadJson<ManualShoppingItem[]>(KEY_MANUAL, []));
    })();
  }, []);

  // Aggiorna lo stato e salva, in un colpo solo.
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

  const statusOf = useCallback((name: string) => weekStatus[normalize(name)], [weekStatus]);

  const setStatus = useCallback(
    (name: string, status: IngredientStatus | null) => {
      const key = normalize(name);
      const next = { ...weekStatus };
      if (status === null) delete next[key];
      else next[key] = status;
      persist(KEY_WEEK, next, setWeekStatus);
    },
    [weekStatus]
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
      weekStatus, statusOf, setStatus,
      manualItems, addManualItem, toggleManualItem, removeManualItem,
    }),
    [mealPlan, mealsFor, addMeal, removeMeal, weekStatus, statusOf, setStatus, manualItems, addManualItem, toggleManualItem, removeManualItem]
  );

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
}

export function usePlanner(): PlannerContextValue {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error('usePlanner deve essere usato dentro <PlannerProvider>.');
  return ctx;
}
