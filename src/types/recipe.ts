/**
 * Modello dati delle ricette Bimby.
 *
 * Questo è il "contratto" condiviso tra la sorgente dati remota (JSON/API/Firebase)
 * e tutta la UI. La sorgente remota DEVE produrre oggetti conformi a `Recipe`
 * così da poter aggiornare il ricettario senza rilasciare una nuova versione dell'app.
 */

/** Tipo di portata, usato dal filtro per categoria. */
export type Course =
  | 'Antipasto'
  | 'Primo'
  | 'Secondo'
  | 'Contorno'
  | 'Dolce';

export const COURSES: Course[] = [
  'Antipasto',
  'Primo',
  'Secondo',
  'Contorno',
  'Dolce',
];

/**
 * Impostazioni del Bimby per un singolo passaggio.
 * Tutti i campi sono opzionali: un passaggio puramente manuale
 * (es. "impiattare") può non averne nessuno.
 */
export interface BimbySettings {
  /** Durata del passaggio in secondi (es. 90 = 1 min 30 sec). */
  timeSeconds?: number;
  /** Velocità: numerica ("0"–"10"), oppure "Turbo", "Spiga", "Soft". */
  speed?: string;
  /** Temperatura in °C, oppure "Varoma" per la cottura a vapore. */
  temperature?: number | 'Varoma';
  /** Senso di rotazione / modalità lama: "Antiorario", "Turbo", ecc. */
  direction?: 'Orario' | 'Antiorario';
}

/** Un singolo ingrediente, con quantità scalabile in base alle porzioni. */
export interface Ingredient {
  id: string;
  name: string;
  /**
   * Quantità riferita a `Recipe.baseServings`.
   * `null` per ingredienti "q.b." (sale, pepe) che non vengono ricalcolati.
   */
  quantity: number | null;
  /** Unità di misura: "g", "ml", "pz", "cucchiai", "spicchio"... */
  unit?: string;
  /**
   * Se `false`, la quantità NON viene ricalcolata con le porzioni
   * (es. "1 bustina di lievito"). Default: `true`.
   */
  scalable?: boolean;
}

/** Un passaggio della preparazione. */
export interface RecipeStep {
  id: string;
  /** Numero d'ordine (1-based). */
  order: number;
  /** Testo dell'istruzione. */
  text: string;
  /** Impostazioni Bimby associate al passaggio, se presenti. */
  bimby?: BimbySettings;
}

/** Una ricetta completa. */
export interface Recipe {
  id: string;
  title: string;
  course: Course;
  /** Numero di porzioni a cui sono riferite le quantità di base. */
  baseServings: number;
  description?: string;
  imageUrl?: string;
  /** Tempo totale indicativo in minuti. */
  totalTimeMinutes?: number;
  difficulty?: 'Facile' | 'Media' | 'Difficile';
  ingredients: Ingredient[];
  steps: RecipeStep[];
  /** Tag liberi per ricerca/filtri aggiuntivi. */
  tags?: string[];
}

/** Stato dei filtri della schermata elenco. */
export interface RecipeFilters {
  /** Testo cercato per nome del piatto. */
  query: string;
  /** Portate selezionate; vuoto = tutte. */
  courses: Course[];
  /** Ingredienti che l'utente "ha in frigo"; vuoto = nessun filtro. */
  ingredients: string[];
}
