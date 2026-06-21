/**
 * Tema dell'app: branding Bianco + Turchese, look pulito e minimale.
 * Importa `theme` ovunque servano colori/spaziature invece di valori hard-coded.
 */

export const colors = {
  /** Turchese principale del brand. */
  primary: '#17BEBB',
  primaryDark: '#0E9C99',
  primaryLight: '#5FD6D4',
  /** Tinta turchese molto chiara per superfici/sfondi secondari. */
  surface: '#F2FAFA',
  surfaceAlt: '#E6F6F6',

  background: '#FFFFFF',
  card: '#FFFFFF',

  text: '#10302F',
  textMuted: '#5E807F',
  textOnPrimary: '#FFFFFF',

  border: '#DCEDED',
  shadow: '#0E9C99',

  // Colori per le "chip" delle portate.
  course: {
    Antipasto: '#17BEBB',
    Primo: '#1EA7C5',
    Secondo: '#E07A5F',
    Contorno: '#6FB07A',
    Dolce: '#C77DBA',
  } as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
};

export const typography = {
  title: { fontSize: 26, fontWeight: '700' as const, color: colors.text },
  sectionTitle: { fontSize: 18, fontWeight: '700' as const, color: colors.text },
  cardTitle: { fontSize: 17, fontWeight: '600' as const, color: colors.text },
  body: { fontSize: 15, fontWeight: '400' as const, color: colors.text },
  caption: { fontSize: 13, fontWeight: '400' as const, color: colors.textMuted },
};

export const theme = { colors, spacing, radius, typography };
export type Theme = typeof theme;
