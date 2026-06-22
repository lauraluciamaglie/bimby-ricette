import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Recipe } from '@/types/recipe';
import { RecipeDetailPane } from './RecipeDetailPane';
import { colors, spacing, typography } from '@/theme/theme';

/**
 * Mostra una ricetta a tutto schermo in una finestra. Usata da Calendario e Spesa
 * per aprire la ricetta collegata senza cambiare sezione.
 */
export function RecipeDetailModal({
  recipe,
  onClose,
}: {
  recipe: Recipe | undefined;
  onClose: () => void;
}) {
  return (
    <Modal visible={!!recipe} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <Pressable onPress={onClose} hitSlop={8}>
            <Text style={styles.close}>‹ Chiudi</Text>
          </Pressable>
          <Text style={styles.title} numberOfLines={1}>
            {recipe?.title ?? ''}
          </Text>
          <View style={{ width: 60 }} />
        </View>
        {recipe && <RecipeDetailPane key={recipe.id} recipe={recipe} />}
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
  close: { fontSize: 16, color: colors.primaryDark, fontWeight: '700', width: 60 },
  title: { ...typography.cardTitle, flex: 1, textAlign: 'center' },
});
