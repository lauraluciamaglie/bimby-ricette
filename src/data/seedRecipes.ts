import { Recipe } from '@/types/recipe';
import { ANTIPASTI } from './recipes/antipasti';
import { ANTIPASTI_2 } from './recipes/antipasti2';
import { PRIMI } from './recipes/primi';
import { PRIMI_2 } from './recipes/primi2';
import { SECONDI } from './recipes/secondi';
import { SECONDI_2 } from './recipes/secondi2';
import { CONTORNI } from './recipes/contorni';
import { CONTORNI_2 } from './recipes/contorni2';
import { DOLCI } from './recipes/dolci';
import { DOLCI_2 } from './recipes/dolci2';
import { EXTRA_1 } from './recipes/extra1';
import { EXTRA_2 } from './recipes/extra2';

/**
 * Ricettario incluso nell'app (100 ricette popolari).
 *
 * Serve a due scopi:
 *  1. Funzionamento OFFLINE / primo avvio, prima che arrivi il JSON remoto.
 *  2. Esempio del formato dati che la sorgente remota deve rispettare.
 *
 * Le ricette sono divise per portata nei file di `recipes/` (un file per gruppo)
 * così è facile aggiungerne altre nel tempo: basta inserirle nel file giusto.
 *
 * Le quantità sono riferite a `baseServings` (di norma 4 persone) e vengono
 * ricalcolate a runtime dal selettore porzioni.
 */
export const SEED_RECIPES: Recipe[] = [
  ...ANTIPASTI,
  ...ANTIPASTI_2,
  ...PRIMI,
  ...PRIMI_2,
  ...SECONDI,
  ...SECONDI_2,
  ...CONTORNI,
  ...CONTORNI_2,
  ...DOLCI,
  ...DOLCI_2,
  ...EXTRA_1,
  ...EXTRA_2,
];
