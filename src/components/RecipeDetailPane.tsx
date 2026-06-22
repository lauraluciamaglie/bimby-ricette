import React, { useMemo, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Pressable, Modal, TextInput } from 'react-native';
import { Recipe, Ingredient } from '@/types/recipe';
import { colors, radius, spacing, typography } from '@/theme/theme';
import { scalingFactor, displayQuantity, scaledQuantity, formatQuantity } from '@/utils/scaleIngredients';
import { ingredientsForStep } from '@/utils/stepIngredients';
import { useRecipes } from '@/hooks/useRecipes';
import { useRecipeEditor } from '@/hooks/useRecipeEditor';
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
  // Fattore "manuale": impostato modificando la dose di un ingrediente (es. "ho 600 g di patate").
  const [manualFactor, setManualFactor] = useState<number | null>(null);
  const [editing, setEditing] = useState<Ingredient | null>(null);
  const [editValue, setEditValue] = useState('');

  const portionFactor = useMemo(
    () => scalingFactor(recipe.baseServings, servings),
    [recipe.baseServings, servings]
  );
  const factor = manualFactor ?? portionFactor;

  function choosePortions(n: number) {
    setServings(n);
    setManualFactor(null);
  }
  function openEditor(ingredient: Ingredient) {
    const current = scaledQuantity(ingredient, factor);
    setEditValue(current != null ? formatQuantity(current, ingredient.unit).replace(',', '.') : '');
    setEditing(ingredient);
  }
  function applyEditor() {
    if (editing && editing.quantity) {
      const value = parseFloat(editValue.replace(',', '.'));
      if (!isNaN(value) && value > 0) setManualFactor(value / editing.quantity);
    }
    setEditing(null);
  }
  const isEditable = (i: Ingredient) => i.quantity != null && i.scalable !== false;

  const { openEdit } = useRecipeEditor();
  const { isBuiltIn, isCustom, removeRecipe } = useRecipes();
  const custom = isCustom(recipe.id);
  const builtIn = isBuiltIn(recipe.id);

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

        <View style={styles.actionsRow}>
          <Pressable style={styles.actionBtn} onPress={() => openEdit(recipe)}>
            <Text style={styles.actionText}>✏️ Modifica</Text>
          </Pressable>
          {custom && (
            <Pressable style={[styles.actionBtn, styles.actionDanger]} onPress={() => removeRecipe(recipe.id)}>
              <Text style={[styles.actionText, styles.actionDangerText]}>
                {builtIn ? '↩︎ Ripristina originale' : '🗑 Elimina'}
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Porzioni + ricalcolo */}
      <View style={[styles.section, styles.portionCard]}>
        <PortionSelector value={manualFactor != null ? -1 : servings} options={PORTION_OPTIONS} onChange={choosePortions} />
        {manualFactor != null ? (
          <View style={styles.manualRow}>
            <Text style={styles.portionHint}>
              Dosi personalizzate (≈ {Math.max(1, Math.round(recipe.baseServings * factor))} porzioni)
            </Text>
            <Pressable onPress={() => setManualFactor(null)} hitSlop={6}>
              <Text style={styles.resetLink}>Azzera</Text>
            </Pressable>
          </View>
        ) : (
          <Text style={styles.portionHint}>
            Quantità ricalcolate per {servings} {servings === 1 ? 'persona' : 'persone'}
          </Text>
        )}
      </View>

      {/* Ingredienti scalati (toccabili per ricalcolare) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredienti</Text>
        <Text style={styles.editHint}>💡 Tocca una quantità per ricalcolare tutto in base a quello che hai.</Text>
        <View style={styles.ingredients}>
          {recipe.ingredients.map((ingredient) => (
            <View key={ingredient.id} style={styles.ingredientRow}>
              <Text style={styles.ingredientName}>{ingredient.name}</Text>
              {isEditable(ingredient) ? (
                <Pressable onPress={() => openEditor(ingredient)} hitSlop={6}>
                  <Text style={[styles.ingredientQty, styles.ingredientQtyEditable]}>
                    {displayQuantity(ingredient, factor)} ✎
                  </Text>
                </Pressable>
              ) : (
                <Text style={styles.ingredientQty}>{displayQuantity(ingredient, factor)}</Text>
              )}
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
                  {(() => {
                    const used = ingredientsForStep(step, recipe.ingredients);
                    if (used.length === 0) return null;
                    return (
                      <View style={styles.stepDoses}>
                        {used.map((ing) => (
                          <View key={ing.id} style={styles.doseChip}>
                            <Text style={styles.doseChipText}>
                              {displayQuantity(ing, factor)} · {ing.name}
                            </Text>
                          </View>
                        ))}
                      </View>
                    );
                  })()}
                  <BimbyBadges bimby={step.bimby} />
                </View>
              </View>
            ))}
        </View>
      </View>

      <Modal visible={editing != null} transparent animationType="fade" onRequestClose={() => setEditing(null)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setEditing(null)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Quanto ne hai?</Text>
            <Text style={styles.modalHint}>
              {editing?.name}: inserisci la quantità che hai e ricalcolo tutti gli altri ingredienti.
            </Text>
            <View style={styles.modalInputRow}>
              <TextInput
                style={styles.modalInput}
                value={editValue}
                onChangeText={setEditValue}
                keyboardType="decimal-pad"
                autoFocus
                placeholder="0"
                placeholderTextColor={colors.textMuted}
                onSubmitEditing={applyEditor}
              />
              {editing?.unit ? <Text style={styles.modalUnit}>{editing.unit}</Text> : null}
            </View>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalCancel} onPress={() => setEditing(null)}>
                <Text style={styles.modalCancelText}>Annulla</Text>
              </Pressable>
              <Pressable style={styles.modalOk} onPress={applyEditor}>
                <Text style={styles.modalOkText}>Ricalcola</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  actionBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  actionDanger: {
    borderColor: '#E0A0A0',
    backgroundColor: '#FDECEA',
  },
  actionDangerText: {
    color: '#B3261E',
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
  manualRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  resetLink: {
    ...typography.caption,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  editHint: {
    ...typography.caption,
    marginBottom: spacing.xs,
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
  ingredientQtyEditable: {
    textDecorationLine: 'underline',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  modalTitle: {
    ...typography.sectionTitle,
  },
  modalHint: {
    ...typography.caption,
  },
  modalInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  modalInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  modalUnit: {
    ...typography.body,
    fontWeight: '700',
    color: colors.textMuted,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  modalCancel: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
  },
  modalCancelText: {
    color: colors.textMuted,
    fontWeight: '600',
  },
  modalOk: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },
  modalOkText: {
    color: colors.textOnPrimary,
    fontWeight: '700',
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
  stepDoses: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  doseChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  doseChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
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
