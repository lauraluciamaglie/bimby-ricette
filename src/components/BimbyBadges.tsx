import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BimbySettings } from '@/types/recipe';
import { colors, radius, spacing } from '@/theme/theme';

/** Formatta i secondi in "Xm Ys" / "Xm" / "Ys". */
export function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  if (m && s) return `${m} min ${s} sec`;
  if (m) return `${m} min`;
  return `${s} sec`;
}

/**
 * Badge con i parametri Bimby di un passaggio: Tempo, Velocità, Temperatura,
 * Modalità (es. Antiorario / Varoma). Mostra solo i campi presenti.
 */
export function BimbyBadges({ bimby }: { bimby?: BimbySettings }) {
  if (!bimby) return null;

  const badges: { icon: string; label: string }[] = [];

  if (bimby.timeSeconds != null) badges.push({ icon: '⏱', label: formatTime(bimby.timeSeconds) });
  if (bimby.temperature != null) {
    badges.push({
      icon: bimby.temperature === 'Varoma' ? '♨️' : '🌡',
      label: bimby.temperature === 'Varoma' ? 'Varoma' : `${bimby.temperature}°C`,
    });
  }
  if (bimby.speed != null) badges.push({ icon: '⚙️', label: `Vel. ${bimby.speed}` });
  if (bimby.direction) badges.push({ icon: '🔄', label: bimby.direction });

  if (badges.length === 0) return null;

  return (
    <View style={styles.row}>
      {badges.map((b, i) => (
        <View key={i} style={styles.badge}>
          <Text style={styles.badgeText}>
            {b.icon} {b.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  badge: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaryDark,
  },
});
