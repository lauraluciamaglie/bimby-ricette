import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Recipe } from '@/types/recipe';
import { colors, radius, spacing } from '@/theme/theme';
import { CourseChip } from './CourseChip';

/** Riga/card di una ricetta nell'elenco. `selected` evidenzia l'elemento nel master-detail su iPad. */
export function RecipeListItem({
  recipe,
  selected = false,
  onPress,
}: {
  recipe: Recipe;
  selected?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        pressed && styles.cardPressed,
      ]}
    >
      {recipe.imageUrl ? (
        <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={styles.placeholderText}>🍳</Text>
        </View>
      )}

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>
        <View style={styles.metaRow}>
          <CourseChip course={recipe.course} />
          {recipe.totalTimeMinutes != null && (
            <Text style={styles.meta}>⏱ {recipe.totalTimeMinutes} min</Text>
          )}
          {recipe.difficulty && <Text style={styles.meta}>• {recipe.difficulty}</Text>}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    gap: spacing.md,
    alignItems: 'center',
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  cardPressed: {
    opacity: 0.7,
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 30,
  },
  body: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  meta: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
