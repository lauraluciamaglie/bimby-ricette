import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '@/theme/theme';

/**
 * Filtro "Cosa ho in frigo": l'utente seleziona gli ingredienti che possiede e
 * l'elenco mostra solo le ricette che li contengono tutti.
 *
 * I suggerimenti (`suggestions`) sono gli ingredienti realmente presenti nel
 * ricettario, così non si propongono filtri che non darebbero risultati.
 */
export function FridgeFilter({
  suggestions,
  selected,
  onToggle,
  onClear,
}: {
  suggestions: string[];
  selected: string[];
  onToggle: (ingredient: string) => void;
  onClear: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? suggestions : suggestions.slice(0, 12);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🧺 Cosa ho in frigo</Text>
        {selected.length > 0 && (
          <Pressable onPress={onClear} hitSlop={8}>
            <Text style={styles.clear}>Azzera ({selected.length})</Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        horizontal={!expanded}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.chips, expanded && styles.chipsWrap]}
      >
        {visible.map((ingredient) => {
          const isOn = selected.includes(ingredient);
          return (
            <Pressable
              key={ingredient}
              onPress={() => onToggle(ingredient)}
              style={({ pressed }) => [
                styles.chip,
                isOn && styles.chipOn,
                pressed && styles.chipPressed,
              ]}
            >
              <Text style={[styles.chipText, isOn && styles.chipTextOn]}>{ingredient}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {suggestions.length > 12 && (
        <Pressable onPress={() => setExpanded((e) => !e)} hitSlop={8} style={styles.toggle}>
          <Text style={styles.toggleText}>{expanded ? 'Mostra meno' : 'Mostra tutti'}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  clear: {
    fontSize: 13,
    color: colors.primaryDark,
    fontWeight: '600',
  },
  chips: {
    gap: spacing.sm,
    paddingVertical: 2,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  chipOn: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipPressed: {
    opacity: 0.7,
  },
  chipText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  chipTextOn: {
    color: colors.textOnPrimary,
    fontWeight: '600',
  },
  toggle: {
    alignSelf: 'flex-start',
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaryDark,
  },
});
