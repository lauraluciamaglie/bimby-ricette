import React from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Course, COURSES, Recipe } from '@/types/recipe';
import { colors, spacing, typography } from '@/theme/theme';
import { SearchBar } from './SearchBar';
import { CourseFilterChip } from './CourseChip';
import { FridgeFilter } from './FridgeFilter';
import { RecipeListItem } from './RecipeListItem';

/**
 * Pannello elenco: ricerca + filtri (portata, frigo) + lista ricette.
 * È riusato sia come schermata a sé (iPhone) sia come colonna sinistra (iPad).
 */
export function RecipeListPane({
  recipes,
  selectedId,
  onSelect,
  onAddRecipe,
  // filtri
  query,
  onQueryChange,
  selectedCourses,
  onToggleCourse,
  ingredientSuggestions,
  selectedIngredients,
  onToggleIngredient,
  onClearIngredients,
  hasActiveFilters,
  onReset,
  // refresh
  refreshing,
  onRefresh,
}: {
  recipes: Recipe[];
  selectedId?: string;
  onSelect: (recipe: Recipe) => void;
  onAddRecipe: () => void;
  query: string;
  onQueryChange: (text: string) => void;
  selectedCourses: Course[];
  onToggleCourse: (course: Course) => void;
  ingredientSuggestions: string[];
  selectedIngredients: string[];
  onToggleIngredient: (ingredient: string) => void;
  onClearIngredients: () => void;
  hasActiveFilters: boolean;
  onReset: () => void;
  refreshing: boolean;
  onRefresh: () => void;
}) {
  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
      }
      ListHeaderComponent={
        <View style={styles.header}>
          <Pressable
            onPress={onAddRecipe}
            style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
          >
            <Text style={styles.addButtonText}>+ Aggiungi ricetta</Text>
          </Pressable>

          <SearchBar value={query} onChange={onQueryChange} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.courseRow}
          >
            {COURSES.map((course) => (
              <CourseFilterChip
                key={course}
                course={course}
                selected={selectedCourses.includes(course)}
                onPress={() => onToggleCourse(course)}
              />
            ))}
          </ScrollView>

          <FridgeFilter
            suggestions={ingredientSuggestions}
            selected={selectedIngredients}
            onToggle={onToggleIngredient}
            onClear={onClearIngredients}
          />

          <View style={styles.resultRow}>
            <Text style={styles.resultCount}>
              {recipes.length} {recipes.length === 1 ? 'ricetta' : 'ricette'}
            </Text>
            {hasActiveFilters && (
              <Text style={styles.reset} onPress={onReset}>
                Azzera filtri
              </Text>
            )}
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <RecipeListItem
          recipe={item}
          selected={item.id === selectedId}
          onPress={() => onSelect(item)}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🍽️</Text>
          <Text style={styles.emptyTitle}>Nessuna ricetta trovata</Text>
          <Text style={styles.emptyText}>Prova a modificare la ricerca o i filtri.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  addButtonPressed: {
    opacity: 0.8,
  },
  addButtonText: {
    color: colors.textOnPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
  courseRow: {
    paddingVertical: 2,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultCount: {
    ...typography.caption,
    fontWeight: '600',
  },
  reset: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  empty: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
    gap: spacing.sm,
  },
  emptyEmoji: {
    fontSize: 40,
  },
  emptyTitle: {
    ...typography.sectionTitle,
  },
  emptyText: {
    ...typography.caption,
    textAlign: 'center',
  },
});
