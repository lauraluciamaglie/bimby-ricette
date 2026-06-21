import { Recipe } from '@/types/recipe';
import { ANTIPASTI } from './recipes/antipasti';
import { PRIMI } from './recipes/primi';
import { SECONDI } from './recipes/secondi';
import { CONTORNI } from './recipes/contorni';
import { DOLCI } from './recipes/dolci';

/**
 * Ricettario incluso nell'app.
 *
 * Serve a due scopi:
 *  1. Funzionamento OFFLINE / primo avvio, prima che arrivi il JSON remoto.
 *  2. Esempio del formato dati che la sorgente remota deve rispettare.
 *
 * Le ricette sono divise per portata nei file di `recipes/` così è facile
 * aggiungerne altre nel tempo: basta inserirle nel file giusto.
 *
 * Le quantità sono riferite a `baseServings` (di norma 4 persone) e vengono
 * ricalcolate a runtime dal selettore porzioni.
 */
export const SEED_RECIPES: Recipe[] = [
  ...ANTIPASTI,
  ...PRIMI,
  ...SECONDI,
  ...CONTORNI,
  ...DOLCI,
];
