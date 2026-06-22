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
  /** Aggiunge o sostituisce una ricetta (la salva sul dispositivo). */
  addRecipe: (recipe: Recipe) => Promise<void>;
  /** Elimina una modifica utente: cancella la ricetta nuova o ripristina l'originale. */
  removeRecipe: (id: string) => Promise<void>;
  /** True se la ricetta fa parte del ricettario incluso/remoto. */
  isBuiltIn: (id: string) => boolean;
  /** True se l'utente l'ha creata o modificata (salvata sul dispositivo). */
  isCustom: (id: string) => boolean;
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

  // Le ricette utente sovrascrivono quelle del ricettario con lo stesso id;
  // quelle nuove (id non presente nel ricettario) compaiono in cima.
  const recipes = useMemo(() => {
    const overrides = new Map(userRecipes.map((r) => [r.id, r]));
    const merged = sourceRecipes.map((r) => overrides.get(r.id) ?? r);
    const onlyNew = userRecipes.filter((u) => !sourceRecipes.some((s) => s.id === u.id));
    return [...onlyNew, ...merged];
  }, [userRecipes, sourceRecipes]);

  const getById = useCallback(
    (id: string) => recipes.find((r) => r.id === id),
    [recipes]
  );

  const isBuiltIn = useCallback((id: string) => sourceRecipes.some((r) => r.id === id), [sourceRecipes]);
  const isCustom = useCallback((id: string) => userRecipes.some((r) => r.id === id), [userRecipes]);

  const addRecipe = useCallback(async (recipe: Recipe) => {
    setUserRecipes(await addUserRecipe(recipe));
  }, []);

  const removeRecipe = useCallback(async (id: string) => {
    setUserRecipes(await deleteUserRecipe(id));
  }, []);

  const value = useMemo(
    () => ({ recipes, loading, refreshing, source, refresh, getById, addRecipe, removeRecipe, isBuiltIn, isCustom }),
    [recipes, loading, refreshing, source, refresh, getById, addRecipe, removeRecipe, isBuiltIn, isCustom]
  );

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>;
}

export function useRecipes(): RecipesContextValue {
  const ctx = useContext(RecipesContext);
  if (!ctx) throw new Error('useRecipes deve essere usato dentro <RecipesProvider>.');
  return ctx;
}
