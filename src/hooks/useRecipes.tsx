import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Recipe } from '@/types/recipe';
import { getInitialRecipes, refreshRecipes, RecipesResult } from '@/data/recipeSource';
import { loadUserRecipes, addUserRecipe, deleteUserRecipe } from '@/data/userRecipes';

/**
 * Stato globale del ricettario. Carica subito i dati locali (cache/seed) e poi
 * aggiorna dal remoto, esponendo `recipes`, lo stato di caricamento e `refresh()`
 * per il pull-to-refresh.
 *
 * Le ricette mostrate sono l'unione di: ricette aggiunte dall'utente (in cima) +
 * ricette del ricettario (remoto/cache/seed).
 */

interface RecipesContextValue {
  recipes: Recipe[];
  loading: boolean;
  refreshing: boolean;
  source: RecipesResult['source'];
  /** Forza il ricaricamento dal remoto (pull-to-refresh). */
  refresh: () => Promise<void>;
  getById: (id: string) => Recipe | undefined;
  /** Aggiunge una ricetta creata dall'utente (la salva sul dispositivo). */
  addRecipe: (recipe: Recipe) => Promise<void>;
  /** Elimina una ricetta creata dall'utente. */
  removeRecipe: (id: string) => Promise<void>;
}

const RecipesContext = createContext<RecipesContextValue | undefined>(undefined);

export function RecipesProvider({ children }: { children: React.ReactNode }) {
  const [sourceRecipes, setSourceRecipes] = useState<Recipe[]>([]);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [source, setSource] = useState<RecipesResult['source']>('seed');

  const load = useCallback(async () => {
    // 0. Ricette aggiunte dall'utente (salvate sul dispositivo).
    setUserRecipes(await loadUserRecipes());

    // 1. Dati immediati (cache o seed).
    const initial = await getInitialRecipes();
    setSourceRecipes(initial.recipes);
    setSource(initial.source);
    setLoading(false);

    // 2. Aggiornamento dal remoto in background.
    const fresh = await refreshRecipes();
    setSourceRecipes(fresh.recipes);
    setSource(fresh.source);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    const fresh = await refreshRecipes();
    setSourceRecipes(fresh.recipes);
    setSource(fresh.source);
    setRefreshing(false);
  }, []);

  // Le ricette dell'utente compaiono in cima, poi quelle del ricettario.
  const recipes = useMemo(() => [...userRecipes, ...sourceRecipes], [userRecipes, sourceRecipes]);

  const getById = useCallback(
    (id: string) => recipes.find((r) => r.id === id),
    [recipes]
  );

  const addRecipe = useCallback(async (recipe: Recipe) => {
    setUserRecipes(await addUserRecipe(recipe));
  }, []);

  const removeRecipe = useCallback(async (id: string) => {
    setUserRecipes(await deleteUserRecipe(id));
  }, []);

  const value = useMemo(
    () => ({ recipes, loading, refreshing, source, refresh, getById, addRecipe, removeRecipe }),
    [recipes, loading, refreshing, source, refresh, getById, addRecipe, removeRecipe]
  );

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>;
}

export function useRecipes(): RecipesContextValue {
  const ctx = useContext(RecipesContext);
  if (!ctx) throw new Error('useRecipes deve essere usato dentro <RecipesProvider>.');
  return ctx;
}
