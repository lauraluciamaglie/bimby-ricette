import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Recipe } from '@/types/recipe';
import { useRecipes } from './useRecipes';
import { AddRecipeModal } from '@/components/AddRecipeModal';

/**
 * Editor centrale delle ricette: una sola maschera (AddRecipeModal) richiamabile
 * da qualsiasi punto dell'app, sia per CREARE (`openNew`) sia per MODIFICARE
 * una ricetta esistente (`openEdit`). Così il pulsante "Modifica" sulla ricetta e
 * il "+ Aggiungi ricetta" usano lo stesso modulo.
 */
interface RecipeEditorValue {
  openNew: () => void;
  openEdit: (recipe: Recipe) => void;
}

const RecipeEditorContext = createContext<RecipeEditorValue | undefined>(undefined);

export function RecipeEditorProvider({ children }: { children: React.ReactNode }) {
  const { addRecipe } = useRecipes();
  const [visible, setVisible] = useState(false);
  const [initial, setInitial] = useState<Recipe | null>(null);

  const openNew = useCallback(() => {
    setInitial(null);
    setVisible(true);
  }, []);

  const openEdit = useCallback((recipe: Recipe) => {
    setInitial(recipe);
    setVisible(true);
  }, []);

  const value = useMemo(() => ({ openNew, openEdit }), [openNew, openEdit]);

  return (
    <RecipeEditorContext.Provider value={value}>
      {children}
      <AddRecipeModal
        visible={visible}
        initial={initial}
        onClose={() => setVisible(false)}
        onSave={addRecipe}
      />
    </RecipeEditorContext.Provider>
  );
}

export function useRecipeEditor(): RecipeEditorValue {
  const ctx = useContext(RecipeEditorContext);
  if (!ctx) throw new Error('useRecipeEditor deve essere usato dentro <RecipeEditorProvider>.');
  return ctx;
}
