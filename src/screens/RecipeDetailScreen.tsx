import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { useRecipes } from '@/hooks/useRecipes';
import { RecipeDetailPane } from '@/components/RecipeDetailPane';
import { colors, spacing, typography } from '@/theme/theme';

/** Schermata dettaglio (iPhone). */
export function RecipeDetailScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, 'RecipeDetail'>) {
  const { getById } = useRecipes();
  const recipe = getById(route.params.recipeId);

  if (!recipe) {
    return (
      <View style={styles.missing}>
        <Text style={typography.sectionTitle}>Ricetta non disponibile</Text>
        <Text style={typography.caption}>Potrebbe essere stata rimossa dal ricettario.</Text>
      </View>
    );
  }

  return <RecipeDetailPane recipe={recipe} />;
}

const styles = StyleSheet.create({
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background,
  },
});
