import React, { useMemo, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Recipe } from '@/types/recipe';
import { colors, radius, spacing, typography } from '@/theme/theme';
import { scalingFactor, displayQuantity } from '@/utils/scaleIngredients';
import { CourseChip } from './CourseChip';
import { PortionSelector } from './PortionSelector';
import { BimbyBadges } from './BimbyBadges';

const PORTION_OPTIONS = [1, 2, 3, 4];

/**
 * Pannello dettaglio ricetta: immagine, info, selettore porzioni con ricalcolo
 * dinamico degli ingredienti, e passaggi con i parametri Bimby.
 *
 * Lo stato delle porzioni è interno: passare una `key={recipe.id}` dal padre
 * per resettarlo quando cambia ricetta nel master-detail.
 */
export function RecipeDetailPane({ recipe }: { recipe: Recipe }) {
  const [servings, setServings] = useState(
    PORTION_OPTIONS.includes(recipe.baseServings) ? recipe.baseServings : 4
  );

  const factor = useMemo(
    () => scalingFactor(recipe.baseServings, servings),
    [recipe.baseServings, servings]
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {recipe.imageUrl && <Image source={{ uri: recipe.imageUrl }} style={styles.hero} />}

      <View style={styles.section}>
        <CourseChip course={recipe.course} />
        <Text style={styles.title}>{recipe.title}</Text>
        {recipe.description && <Text style={styles.description}>{recipe.description}</Text>}

        <View style={styles.metaRow}>
          {recipe.totalTimeMinutes != null && (
            <Text style={styles.meta}>⏱ {recipe.totalTimeMinutes} min</Text>
          )}
          {recipe.difficulty && <Text style={styles.meta}>📊 {recipe.difficulty}</Text>}
        </View>
      </View>

      {/* Selettore porzioni -> pilota il ricalcolo */}
      <View style={[styles.section, styles.portionCard]}>
        <PortionSelector value={servings} options={PORTION_OPTIONS} onChange={setServings} />
        <Text style={styles.portionHint}>
          Quantità ricalcolate per {servings} {servings === 1 ? 'persona' : 'persone'}
        </Text>
      </View>

      {/* Ingredienti scalati */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredienti</Text>
        <View style={styles.ingredients}>
          {recipe.ingredients.map((ingredient) => (
            <View key={ingredient.id} style={styles.ingredientRow}>
              <Text style={styles.ingredientName}>{ingredient.name}</Text>
              <Text style={styles.ingredientQty}>{displayQuantity(ingredient, factor)}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Passaggi con parametri Bimby */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preparazione</Text>
        <View style={styles.steps}>
          {recipe.steps
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((step) => (
              <View key={step.id} style={styles.step}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{step.order}</Text>
                </View>
                <View style={styles.stepBody}>
                  <Text style={styles.stepText}>{step.text}</Text>
                  <BimbyBadges bimby={step.bimby} />
                </View>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

/** Stato vuoto del pannello dettaglio (iPad, nessuna ricetta selezionata). */
export function RecipeDetailEmpty() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>👩‍🍳</Text>
      <Text style={styles.emptyTitle}>Seleziona una ricetta</Text>
      <Text style={styles.emptyText}>Scegli un piatto dall’elenco per vedere ingredienti e passaggi.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  hero: {
    width: '100%',
    height: 220,
    backgroundColor: colors.surfaceAlt,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    ...typography.title,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    lineHeight: 21,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  meta: {
    ...typography.caption,
    fontWeight: '600',
  },
  portionCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  portionHint: {
    ...typography.caption,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    marginBottom: spacing.xs,
  },
  ingredients: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  ingredientName: {
    ...typography.body,
    flex: 1,
  },
  ingredientQty: {
    ...typography.body,
    fontWeight: '700',
    color: colors.primaryDark,
    marginLeft: spacing.md,
  },
  steps: {
    gap: spacing.md,
  },
  step: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: colors.textOnPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  stepBody: {
    flex: 1,
    paddingTop: 2,
  },
  stepText: {
    ...typography.body,
    lineHeight: 22,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  emptyEmoji: {
    fontSize: 52,
  },
  emptyTitle: {
    ...typography.sectionTitle,
  },
  emptyText: {
    ...typography.caption,
    textAlign: 'center',
    maxWidth: 280,
  },
});
