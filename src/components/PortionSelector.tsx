import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '@/theme/theme';

/**
 * Selettore porzioni (1–4 persone). Pilota il ricalcolo dinamico delle quantità
 * nella schermata dettaglio.
 */
export function PortionSelector({
  value,
  options = [1, 2, 3, 4],
  onChange,
}: {
  value: number;
  options?: number[];
  onChange: (servings: number) => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Porzioni</Text>
      <View style={styles.segments}>
        {options.map((n) => {
          const selected = n === value;
          return (
            <Pressable
              key={n}
              onPress={() => onChange(n)}
              accessibilityRole="button"
              accessibilityLabel={`${n} ${n === 1 ? 'persona' : 'persone'}`}
              style={({ pressed }) => [
                styles.segment,
                selected && styles.segmentSelected,
                pressed && !selected && styles.segmentPressed,
              ]}
            >
              <Text style={[styles.segmentText, selected && styles.segmentTextSelected]}>{n}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  segments: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.pill,
    padding: 4,
  },
  segment: {
    width: 40,
    height: 36,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  segmentSelected: {
    backgroundColor: colors.primary,
  },
  segmentPressed: {
    backgroundColor: colors.surface,
  },
  segmentText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textMuted,
  },
  segmentTextSelected: {
    color: colors.textOnPrimary,
  },
});
