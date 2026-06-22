import React, { useMemo, useState } from 'react';
import { Modal, View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Recipe } from '@/types/recipe';
import { useRecipes } from '@/hooks/useRecipes';
import { filterRecipes } from '@/utils/filters';
import { SearchBar } from './SearchBar';
import { RecipeListItem } from './RecipeListItem';
import { colors, spacing, typography } from '@/theme/theme';

/**
 * Finestra per scegliere una ricetta da assegnare a un pasto del calendario.
 * Mostra la ricerca e l'elenco completo; al tocco restituisce la ricetta scelta.
 */
export function RecipePickerModal({
  visible,
  title,
  onPick,
  onClose,
}: {
  visible: boolean;
  title?: string;
  onPick: (recipe: Recipe) => void;
  onClose: () => void;
}) {
  const { recipes } = useRecipes();
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => filterRecipes(recipes, { query, courses: [], ingredients: [] }),
    [recipes, query]
  );

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <Pressable onPress={onClose} hitSlop={8}>
            <Text style={styles.close}>Annulla</Text>
          </Pressable>
          <Text style={styles.title} numberOfLines={1}>
            {title ?? 'Scegli una ricetta'}
          </Text>
          <View style={{ width: 64 }} />
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <View style={styles.searchWrap}>
              <SearchBar value={query} onChange={setQuery} />
            </View>
          }
          renderItem={({ item }) => (
            <RecipeListItem
              recipe={item}
              onPress={() => {
                onPick(item);
                setQuery('');
              }}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  close: { fontSize: 16, color: colors.textMuted, width: 64 },
  title: { ...typography.cardTitle, flex: 1, textAlign: 'center' },
  list: { padding: spacing.lg },
  searchWrap: { marginBottom: spacing.md },
});
