import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Recipe } from '@/types/recipe';
import { MealSlot, MEAL_SLOTS } from '@/types/planner';
import { useRecipes } from '@/hooks/useRecipes';
import { usePlanner } from '@/hooks/usePlanner';
import { nextDays, dateKey, dayLabel } from '@/utils/dates';
import { RecipePickerModal } from '@/components/RecipePickerModal';
import { RecipeDetailModal } from '@/components/RecipeDetailModal';
import { colors, radius, spacing, typography } from '@/theme/theme';

const SLOT_ICON: Record<MealSlot, string> = {
  Colazione: '☕',
  Pranzo: '🍝',
  Merenda: '🍎',
  Cena: '🌙',
};

/** Pianificazione settimanale dei pasti: ogni voce rimanda alla sua ricetta. */
export function CalendarScreen() {
  const days = nextDays(7);
  const { getById } = useRecipes();
  const { mealsFor, addMeal, removeMeal } = usePlanner();

  const [picker, setPicker] = useState<{ date: string; slot: MealSlot } | null>(null);
  const [detail, setDetail] = useState<Recipe | undefined>(undefined);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.brand}>📅 Calendario</Text>
        <Text style={styles.subtitle}>Pianifica i pasti della settimana</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {days.map((day) => {
          const key = dateKey(day);
          return (
            <View key={key} style={styles.dayCard}>
              <Text style={styles.dayTitle}>{dayLabel(day)}</Text>
              {MEAL_SLOTS.map((slot) => {
                const meals = mealsFor(key, slot);
                return (
                  <View key={slot} style={styles.slot}>
                    <Text style={styles.slotLabel}>
                      {SLOT_ICON[slot]} {slot}
                    </Text>
                    <View style={styles.slotBody}>
                      {meals.map((meal) => {
                        const recipe = getById(meal.recipeId);
                        return (
                          <View key={meal.id} style={styles.mealChip}>
                            <Pressable
                              style={styles.mealChipMain}
                              onPress={() => recipe && setDetail(recipe)}
                            >
                              <Text style={styles.mealText} numberOfLines={1}>
                                {recipe ? recipe.title : 'Ricetta non trovata'}
                              </Text>
                            </Pressable>
                            <Pressable onPress={() => removeMeal(meal.id)} hitSlop={6}>
                              <Text style={styles.mealRemove}>✕</Text>
                            </Pressable>
                          </View>
                        );
                      })}
                      <Pressable style={styles.addMeal} onPress={() => setPicker({ date: key, slot })}>
                        <Text style={styles.addMealText}>+ aggiungi</Text>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>

      <RecipePickerModal
        visible={!!picker}
        title={picker ? `${picker.slot} · scegli` : undefined}
        onPick={(recipe) => {
          if (picker) addMeal(picker.date, picker.slot, recipe.id);
          setPicker(null);
        }}
        onClose={() => setPicker(null)}
      />
      <RecipeDetailModal recipe={detail} onClose={() => setDetail(undefined)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  brand: { ...typography.title, fontSize: 24 },
  subtitle: { ...typography.caption },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  dayCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  dayTitle: { ...typography.sectionTitle, color: colors.primaryDark },
  slot: { gap: spacing.xs },
  slotLabel: { ...typography.body, fontWeight: '700' },
  slotBody: { gap: spacing.xs, paddingLeft: spacing.sm },
  mealChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  mealChipMain: { flex: 1 },
  mealText: { ...typography.body, color: colors.text },
  mealRemove: { color: colors.textMuted, fontSize: 14 },
  addMeal: { paddingVertical: spacing.xs },
  addMealText: { color: colors.primaryDark, fontWeight: '700', fontSize: 14 },
});
