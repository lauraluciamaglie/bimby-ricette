import React from 'react';
import { Recipe } from '@/types/recipe';
import { useRecipes } from '@/hooks/useRecipes';
import { useRecipeFilters } from '@/hooks/useRecipeFilters';
import { useRecipeEditor } from '@/hooks/useRecipeEditor';
import { RecipeListPane } from './RecipeListPane';

/**
 * Collega `RecipeListPane` allo stato globale (ricette + refresh) e allo stato
 * locale dei filtri. Il pulsante "+ Aggiungi ricetta" apre l'editor centrale.
 */
export function ConnectedRecipeList({
  selectedId,
  onSelect,
}: {
  selectedId?: string;
  onSelect: (recipe: Recipe) => void;
}) {
  const { recipes, refreshing, refresh } = useRecipes();
  const { openNew } = useRecipeEditor();
  const {
    filters,
    filtered,
    ingredientSuggestions,
    hasActiveFilters,
    setQuery,
    toggleCourse,
    toggleIngredient,
    clearIngredients,
    reset,
  } = useRecipeFilters(recipes);

  return (
    <RecipeListPane
      recipes={filtered}
      selectedId={selectedId}
      onSelect={onSelect}
      onAddRecipe={openNew}
      query={filters.query}
      onQueryChange={setQuery}
      selectedCourses={filters.courses}
      onToggleCourse={toggleCourse}
      ingredientSuggestions={ingredientSuggestions}
      selectedIngredients={filters.ingredients}
      onToggleIngredient={toggleIngredient}
      onClearIngredients={clearIngredients}
      hasActiveFilters={hasActiveFilters}
      onReset={reset}
      refreshing={refreshing}
      onRefresh={refresh}
    />
  );
}
