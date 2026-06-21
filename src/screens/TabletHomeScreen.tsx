import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Recipe } from '@/types/recipe';
import { useRecipes } from '@/hooks/useRecipes';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { ConnectedRecipeList } from '@/components/ConnectedRecipeList';
import { RecipeDetailPane, RecipeDetailEmpty } from '@/components/RecipeDetailPane';
import { ApronLogo } from '@/components/ApronLogo';
import { colors, spacing, typography } from '@/theme/theme';

/**
 * Layout iPad: master-detail a due colonne.
 * Colonna sinistra = elenco/filtri, colonna destra = dettaglio ricetta.
 */
export function TabletHomeScreen() {
  const { recipes } = useRecipes();
  const { listColumnWidth } = useResponsiveLayout();
  const [selected, setSelected] = useState<Recipe | undefined>(undefined);

  // Pre-seleziona la prima ricetta quando i dati arrivano.
  useEffect(() => {
    if (!selected && recipes.length > 0) setSelected(recipes[0]);
  }, [recipes, selected]);

  // Se la ricetta selezionata sparisce dopo un refresh remoto, deseleziona.
  useEffect(() => {
    if (selected && !recipes.some((r) => r.id === selected.id)) {
      setSelected(recipes[0]);
    }
  }, [recipes, selected]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <ApronLogo size={36} />
        <Text style={styles.brand}>Bimby Ricette</Text>
      </View>

      <View style={styles.columns}>
        <View style={[styles.listColumn, { width: listColumnWidth }]}>
          <ConnectedRecipeList selectedId={selected?.id} onSelect={setSelected} />
        </View>
        <View style={styles.detailColumn}>
          {selected ? (
            <RecipeDetailPane key={selected.id} recipe={selected} />
          ) : (
            <RecipeDetailEmpty />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  brand: {
    ...typography.sectionTitle,
    fontSize: 20,
  },
  columns: {
    flex: 1,
    flexDirection: 'row',
  },
  listColumn: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: colors.border,
    backgroundColor: colors.background,
  },
  detailColumn: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
