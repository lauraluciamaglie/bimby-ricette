import { normalize } from './filters';

/**
 * Raggruppa gli ingredienti in categorie da supermercato, così la lista della
 * spesa è ordinata per reparto. La categoria è dedotta dal nome dell'ingrediente.
 */

export type ShoppingCategory =
  | 'Frutta e Verdura'
  | 'Carne e Pesce'
  | 'Latticini e Uova'
  | 'Dispensa'
  | 'Altro';

export const SHOPPING_CATEGORIES: ShoppingCategory[] = [
  'Frutta e Verdura',
  'Carne e Pesce',
  'Latticini e Uova',
  'Dispensa',
  'Altro',
];

// Parole chiave per categoria (in ordine di priorità di controllo).
const KEYWORDS: { category: ShoppingCategory; words: string[] }[] = [
  {
    category: 'Carne e Pesce',
    words: ['carne', 'manzo', 'pollo', 'tacchino', 'vitello', 'maiale', 'guanciale', 'pancetta',
      'prosciutto', 'salame', 'salsiccia', 'salmone', 'gamberi', 'gambero', 'tonno', 'acciugh',
      'seppie', 'baccala', 'pesce', 'hamburger', 'macinata', 'wurstel', 'speck', 'merluzzo'],
  },
  {
    category: 'Latticini e Uova',
    words: ['latte', 'burro', 'panna', 'parmigiano', 'pecorino', 'mozzarella', 'ricotta',
      'mascarpone', 'formaggio', 'yogurt', 'uovo', 'uova', 'tuorl', 'albumi', 'stracchino',
      'gorgonzola', 'philadelphia', 'spalmabile'],
  },
  {
    category: 'Frutta e Verdura',
    words: ['pomodor', 'cipolla', 'aglio', 'carota', 'carote', 'zucchin', 'zucca', 'patat',
      'melanzan', 'peperon', 'spinaci', 'basilico', 'prezzemolo', 'limone', 'lime', 'mela',
      'mele', 'porro', 'porri', 'sedano', 'broccoli', 'cavolfiore', 'finocchi', 'fagiolini',
      'piselli', 'funghi', 'champignon', 'radicchio', 'asparagi', 'avocado', 'cetriolo',
      'rosmarino', 'salvia', 'insalata', 'aneto', 'coriandolo', 'scalogno', 'banana', 'fragole',
      'frutti', 'origano', 'erbe', 'verdura', 'verdure'],
  },
  {
    category: 'Dispensa',
    words: ['riso', 'pasta', 'spaghetti', 'penne', 'bucatini', 'tonnarelli', 'farina', 'fecola',
      'amido', 'zucchero', 'olio', 'sale', 'pepe', 'lievito', 'pangrattato', 'pane', 'savoiardi',
      'biscotti', 'passata', 'pelati', 'ceci', 'fagioli', 'lenticchie', 'borlotti', 'cannellini',
      'vino', 'aceto', 'brandy', 'marsala', 'cioccolat', 'cacao', 'zafferano', 'dado', 'mandorle',
      'pinoli', 'noci', 'pistacch', 'tahina', 'vaniglia', 'cumino', 'curry', 'peperoncino',
      'caffe', 'cocco', 'ketchup', 'senape', 'maionese', 'gnocchi', 'capperi', 'olive', 'miele',
      'colla di pesce', 'ghiaccio', 'noce moscata', 'gocce', 'worcestershire', 'tahin', 'cous'],
  },
];

export function categorize(ingredientName: string): ShoppingCategory {
  const n = normalize(ingredientName);
  for (const group of KEYWORDS) {
    if (group.words.some((w) => n.includes(w))) return group.category;
  }
  return 'Altro';
}
