import { useMemo, useState } from 'react';
import { Course, Recipe, RecipeFilters } from '@/types/recipe';
import { filterRecipes, allIngredientNames } from '@/utils/filters';

/**
 * Gestisce lo stato dei filtri (testo, portate, ingredienti) e deriva
 * l'elenco filtrato in modo memoizzato.
 */
export function useRecipeFilters(recipes: Recipe[]) {
  const [filters, setFilters] = useState<RecipeFilters>({
    query: '',
    courses: [],
    ingredients: [],
  });

  const setQuery = (query: string) => setFilters((f) => ({ ...f, query }));

  const toggleCourse = (course: Course) =>
    setFilters((f) => ({
      ...f,
      courses: f.courses.includes(course)
        ? f.courses.filter((c) => c !== course)
        : [...f.courses, course],
    }));

  const toggleIngredient = (ingredient: string) =>
    setFilters((f) => ({
      ...f,
      ingredients: f.ingredients.includes(ingredient)
        ? f.ingredients.filter((i) => i !== ingredient)
        : [...f.ingredients, ingredient],
    }));

  const clearIngredients = () => setFilters((f) => ({ ...f, ingredients: [] }));

  const reset = () => setFilters({ query: '', courses: [], ingredients: [] });

  const filtered = useMemo(() => filterRecipes(recipes, filters), [recipes, filters]);
  const ingredientSuggestions = useMemo(() => allIngredientNames(recipes), [recipes]);

  const hasActiveFilters =
    filters.query.length > 0 || filters.courses.length > 0 || filters.ingredients.length > 0;

  return {
    filters,
    filtered,
    ingredientSuggestions,
    hasActiveFilters,
    setQuery,
    toggleCourse,
    toggleIngredient,
    clearIngredients,
    reset,
  };
}
