/** Funzioni per le date del calendario (settimana corrente e formati leggibili). */

const GIORNI = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
const MESI = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];

/** Chiave data YYYY-MM-DD in orario locale (non UTC, per evitare slittamenti). */
export function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function today(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

/** I prossimi `count` giorni a partire da oggi (incluso). */
export function nextDays(count: number): Date[] {
  const start = today();
  return Array.from({ length: count }, (_, i) => addDays(start, i));
}

/** Etichetta breve, es. "Oggi", "Domani" oppure "Lun 23 giu". */
export function dayLabel(d: Date): string {
  const t = today();
  const diff = Math.round((d.getTime() - t.getTime()) / 86400000);
  if (diff === 0) return 'Oggi';
  if (diff === 1) return 'Domani';
  return `${GIORNI[d.getDay()].slice(0, 3)} ${d.getDate()} ${MESI[d.getMonth()]}`;
}

/** Nome esteso del giorno, es. "Lunedì 23 giugno". */
export function dayLong(d: Date): string {
  return `${GIORNI[d.getDay()]} ${d.getDate()} ${MESI[d.getMonth()]}`;
}
