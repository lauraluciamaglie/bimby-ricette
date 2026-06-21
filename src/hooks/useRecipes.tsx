import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Recipe } from '@/types/recipe';
import { getInitialRecipes, refreshRecipes, RecipesResult } from '@/data/recipeSource';

/**
 * Stato globale del ricettario. Carica subito i dati locali (cache/seed) e poi
 * aggiorna dal remoto, esponendo `recipes`, lo stato di caricamento e `refresh()`
 * per il pull-to-refresh.
 */

interface RecipesContextValue {
  recipes: Recipe[];
  loading: boolean;
  refreshing: boolean;
  source: RecipesResult['source'];
  /** Forza il ricaricamento dal remoto (pull-to-refresh). */
  refresh: () => Promise<void>;
  getById: (id: string) => Recipe | undefined;
}

const RecipesContext = createContext<RecipesContextValue | undefined>(undefined);

export function RecipesProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [source, setSource] = useState<RecipesResult['source']>('seed');

  const load = useCallback(async () => {
    // 1. Dati immediati (cache o seed).
    const initial = await getInitialRecipes();
    setRecipes(initial.recipes);
    setSource(initial.source);
    setLoading(false);

    // 2. Aggiornamento dal remoto in background.
    const fresh = await refreshRecipes();
    setRecipes(fresh.recipes);
    setSource(fresh.source);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    const fresh = await refreshRecipes();
    setRecipes(fresh.recipes);
    setSource(fresh.source);
    setRefreshing(false);
  }, []);

  const getById = useCallback(
    (id: string) => recipes.find((r) => r.id === id),
    [recipes]
  );

  const value = useMemo(
    () => ({ recipes, loading, refreshing, source, refresh, getById }),
    [recipes, loading, refreshing, source, refresh, getById]
  );

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>;
}

export function useRecipes(): RecipesContextValue {
  const ctx = useContext(RecipesContext);
  if (!ctx) throw new Error('useRecipes deve essere usato dentro <RecipesProvider>.');
  return ctx;
}
