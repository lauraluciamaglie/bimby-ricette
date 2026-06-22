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
import { EXTRA_3 } from './recipes/extra3';
import { EXTRA_4 } from './recipes/extra4';
import { EXTRA_5 } from './recipes/extra5';
import { EXTRA_6 } from './recipes/extra6';
import { EXTRA_7 } from './recipes/extra7';
import { EXTRA_8 } from './recipes/extra8';
import { EXTRA_9 } from './recipes/extra9';

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
  ...EXTRA_3,
  ...EXTRA_4,
  ...EXTRA_5,
  ...EXTRA_6,
  ...EXTRA_7,
  ...EXTRA_8,
  ...EXTRA_9,
];
