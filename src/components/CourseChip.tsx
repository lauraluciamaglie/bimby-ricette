import React from 'react';
import { Text, StyleSheet, Pressable, View, ViewStyle } from 'react-native';
import { Course } from '@/types/recipe';
import { colors, radius, spacing } from '@/theme/theme';

/** Etichetta colorata della portata (Antipasto, Primo, ...). */
export function CourseChip({ course, style }: { course: Course; style?: ViewStyle }) {
  const color = colors.course[course];
  return (
    <View style={[styles.chip, { backgroundColor: color + '22', borderColor: color }, style]}>
      <Text style={[styles.chipText, { color }]}>{course}</Text>
    </View>
  );
}

/** Variante selezionabile, usata nella barra dei filtri. */
export function CourseFilterChip({
  course,
  selected,
  onPress,
}: {
  course: Course;
  selected: boolean;
  onPress: () => void;
}) {
  const color = colors.course[course];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        styles.filterChip,
        {
          backgroundColor: selected ? color : colors.background,
          borderColor: color,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Text style={[styles.chipText, { color: selected ? colors.textOnPrimary : color }]}>
        {course}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  filterChip: {
    marginRight: spacing.sm,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
