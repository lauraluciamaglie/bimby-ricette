import { useWindowDimensions } from 'react-native';

/**
 * Rilevamento del layout in base alla larghezza disponibile.
 *
 * Usiamo la dimensione della finestra (non `Platform.isPad`) così il layout
 * si adatta anche a iPad in Split View / Slide Over e in rotazione.
 * Soglia ~700pt: sopra mostriamo il master-detail a due colonne.
 */
const TWO_COLUMN_BREAKPOINT = 700;

export interface ResponsiveLayout {
  width: number;
  height: number;
  /** True quando c'è spazio per il layout a due colonne (tipicamente iPad). */
  isWide: boolean;
  /** Larghezza consigliata per la colonna elenco nel master-detail. */
  listColumnWidth: number;
}

export function useResponsiveLayout(): ResponsiveLayout {
  const { width, height } = useWindowDimensions();
  const isWide = width >= TWO_COLUMN_BREAKPOINT;
  const listColumnWidth = Math.min(380, Math.max(320, width * 0.36));

  return { width, height, isWide, listColumnWidth };
}
