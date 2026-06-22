import { Recipe } from '@/types/recipe';

/**
 * Ricette aggiuntive — ondata 1 (risotti, paste, zuppe, salse).
 * Piatti reali e popolari, in forma compatta ma completa.
 */

// Scorciatoie per ridurre la ripetizione nelle ricette generate.
const sale = { id: 'sale', name: 'Sale', quantity: null };
const olio = (g = 20) => ({ id: 'olio', name: 'Olio extravergine di oliva', quantity: g, unit: 'g' });

/** Crea un risotto "base + ingrediente caratteristico". */
function risotto(
  id: string,
  title: string,
  extra: { id: string; name: string; quantity: number | null; unit?: string }[],
  mantecatura: string
): Recipe {
  return {
    id,
    title,
    course: 'Primo',
    baseServings: 4,
    difficulty: 'Facile',
    totalTimeMinutes: 30,
    description: `${title}: cremoso e mantecato, cotto tutto nel boccale.`,
    tags: ['riso', 'risotto'],
    ingredients: [
      { id: 'i1', name: 'Cipolla', quantity: 0.5, unit: 'pz' },
      olio(20),
      { id: 'i3', name: 'Riso Carnaroli', quantity: 320, unit: 'g' },
      { id: 'i4', name: 'Vino bianco', quantity: 50, unit: 'g' },
      { id: 'i5', name: 'Acqua', quantity: 750, unit: 'g' },
      { id: 'i6', name: 'Dado vegetale', quantity: 1, unit: 'cucchiaio' },
      { id: 'i7', name: 'Parmigiano grattugiato', quantity: 50, unit: 'g' },
      ...extra,
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tritare la cipolla e soffriggere con l’olio.', bimby: { timeSeconds: 180, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Unire il riso (e gli ingredienti principali) e tostare in antiorario.', bimby: { timeSeconds: 180, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Sfumare con il vino, poi aggiungere acqua e dado e cuocere in antiorario.', bimby: { timeSeconds: 900, speed: 'Soft', temperature: 100, direction: 'Antiorario' } },
      { id: 's4', order: 4, text: mantecatura, bimby: { timeSeconds: 40, speed: 'Soft', direction: 'Antiorario' } },
    ],
  };
}

/** Crea una pasta "lessa + condimento nel boccale". */
function pasta(
  id: string,
  title: string,
  condimento: { id: string; name: string; quantity: number | null; unit?: string }[],
  metodo: string,
  tags: string[] = []
): Recipe {
  return {
    id,
    title,
    course: 'Primo',
    baseServings: 4,
    difficulty: 'Facile',
    totalTimeMinutes: 25,
    description: `${title}: un primo veloce e saporito.`,
    tags: ['pasta', ...tags],
    ingredients: [
      { id: 'i1', name: 'Pasta', quantity: 320, unit: 'g' },
      olio(20),
      ...condimento,
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Lessare la pasta in abbondante acqua salata.' },
      { id: 's2', order: 2, text: metodo, bimby: { timeSeconds: 600, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Scolare la pasta e condirla con il sugo.' },
    ],
  };
}

/** Crea una vellutata "verdura + patata, cotta e frullata". */
function vellutata(
  id: string,
  title: string,
  verdura: { id: string; name: string; quantity: number | null; unit?: string }[],
  tags: string[] = []
): Recipe {
  return {
    id,
    title,
    course: 'Primo',
    baseServings: 4,
    difficulty: 'Facile',
    totalTimeMinutes: 30,
    description: `${title}: vellutata calda, cotta e frullata nel boccale.`,
    tags: ['crema', 'vellutata', 'vegetariano', ...tags],
    ingredients: [
      { id: 'i1', name: 'Cipolla', quantity: 0.5, unit: 'pz' },
      olio(20),
      ...verdura,
      { id: 'i9', name: 'Acqua', quantity: 500, unit: 'g' },
      { id: 'i10', name: 'Dado vegetale', quantity: 1, unit: 'cucchiaio' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tritare la cipolla e soffriggere con l’olio.', bimby: { timeSeconds: 180, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Aggiungere le verdure a pezzi, l’acqua e il dado e cuocere.', bimby: { timeSeconds: 1200, speed: '1', temperature: 100 } },
      { id: 's3', order: 3, text: 'Frullare fino a crema liscia.', bimby: { timeSeconds: 40, speed: '8' } },
    ],
  };
}

/** Crea una salsa/crema fredda frullata. */
function salsa(
  id: string,
  title: string,
  ingredienti: { id: string; name: string; quantity: number | null; unit?: string }[],
  tags: string[] = []
): Recipe {
  return {
    id,
    title,
    course: 'Antipasto',
    baseServings: 4,
    difficulty: 'Facile',
    totalTimeMinutes: 8,
    description: `${title}: crema da spalmare o da intingere, pronta in pochi minuti.`,
    tags: ['salsa', 'antipasto', ...tags],
    ingredients: [...ingredienti, sale],
    steps: [
      { id: 's1', order: 1, text: 'Inserire tutti gli ingredienti nel boccale.' },
      { id: 's2', order: 2, text: 'Frullare fino a ottenere una crema liscia.', bimby: { timeSeconds: 40, speed: '7' } },
    ],
  };
}

export const EXTRA_1: Recipe[] = [
  // --- Risotti ---
  risotto('risotto-asparagi', 'Risotto agli Asparagi', [{ id: 'i8', name: 'Asparagi', quantity: 250, unit: 'g' }], 'Mantecare con il parmigiano.'),
  risotto('risotto-frutti-mare', 'Risotto ai Frutti di Mare', [{ id: 'i8', name: 'Frutti di mare misti', quantity: 300, unit: 'g' }], 'Profumare con prezzemolo (senza parmigiano).'),
  risotto('risotto-salsiccia', 'Risotto con Salsiccia', [{ id: 'i8', name: 'Salsiccia', quantity: 200, unit: 'g' }], 'Mantecare con il parmigiano.'),
  risotto('risotto-taleggio', 'Risotto al Taleggio', [{ id: 'i8', name: 'Taleggio', quantity: 120, unit: 'g' }], 'Mantecare con taleggio e parmigiano.'),
  risotto('risotto-pere-gorgonzola', 'Risotto Pere e Gorgonzola', [{ id: 'i8', name: 'Pere', quantity: 2, unit: 'pz' }, { id: 'i9b', name: 'Gorgonzola', quantity: 100, unit: 'g' }], 'Mantecare con il gorgonzola.'),
  risotto('risotto-carciofi', 'Risotto ai Carciofi', [{ id: 'i8', name: 'Carciofi', quantity: 3, unit: 'pz' }], 'Mantecare con il parmigiano.'),
  risotto('risotto-zucchine', 'Risotto alle Zucchine', [{ id: 'i8', name: 'Zucchine', quantity: 2, unit: 'pz' }], 'Mantecare con il parmigiano.'),
  risotto('risotto-speck', 'Risotto Speck e Noci', [{ id: 'i8', name: 'Speck', quantity: 100, unit: 'g' }, { id: 'i9c', name: 'Noci', quantity: 40, unit: 'g' }], 'Mantecare con il parmigiano.'),
  risotto('risotto-scampi', 'Risotto agli Scampi', [{ id: 'i8', name: 'Scampi', quantity: 300, unit: 'g' }], 'Profumare con prezzemolo (senza parmigiano).'),
  risotto('risotto-peperoni', 'Risotto ai Peperoni', [{ id: 'i8', name: 'Peperoni', quantity: 2, unit: 'pz' }], 'Mantecare con il parmigiano.'),
  risotto('risotto-barbabietola', 'Risotto alla Barbabietola', [{ id: 'i8', name: 'Barbabietola', quantity: 200, unit: 'g' }], 'Mantecare con parmigiano e un po’ di burro.'),
  risotto('risotto-pomodoro', 'Risotto al Pomodoro', [{ id: 'i8', name: 'Passata di pomodoro', quantity: 200, unit: 'g' }], 'Mantecare con parmigiano e basilico.'),

  // --- Paste ---
  pasta('pasta-aglio-olio', 'Spaghetti Aglio, Olio e Peperoncino', [{ id: 'i3', name: 'Aglio', quantity: 2, unit: 'spicchio' }, { id: 'i4', name: 'Peperoncino', quantity: null }, { id: 'i5', name: 'Prezzemolo', quantity: null }], 'Nel boccale rosolare aglio e peperoncino nell’olio.', ['veloce', 'vegano']),
  pasta('pasta-gricia', 'Pasta alla Gricia', [{ id: 'i3', name: 'Guanciale', quantity: 150, unit: 'g' }, { id: 'i4', name: 'Pecorino grattugiato', quantity: 60, unit: 'g' }, { id: 'i5', name: 'Pepe', quantity: null }], 'Rosolare il guanciale nel boccale, poi mantecare con pecorino e acqua di cottura.', ['romano']),
  pasta('pasta-boscaiola', 'Pasta alla Boscaiola', [{ id: 'i3', name: 'Funghi', quantity: 250, unit: 'g' }, { id: 'i4', name: 'Salsiccia', quantity: 150, unit: 'g' }, { id: 'i5', name: 'Panna', quantity: 100, unit: 'g' }], 'Nel boccale rosolare salsiccia e funghi, poi unire la panna.'),
  pasta('pasta-ortolana', 'Pasta all’Ortolana', [{ id: 'i3', name: 'Zucchine', quantity: 1, unit: 'pz' }, { id: 'i4', name: 'Melanzana', quantity: 1, unit: 'pz' }, { id: 'i5', name: 'Peperone', quantity: 1, unit: 'pz' }, { id: 'i6', name: 'Passata di pomodoro', quantity: 300, unit: 'g' }], 'Nel boccale stufare le verdure a cubetti con la passata.', ['verdure', 'vegano']),
  pasta('pasta-sorrentina', 'Pasta alla Sorrentina', [{ id: 'i3', name: 'Passata di pomodoro', quantity: 400, unit: 'g' }, { id: 'i4', name: 'Mozzarella', quantity: 150, unit: 'g' }, { id: 'i5', name: 'Basilico', quantity: null }], 'Preparare il sugo di pomodoro nel boccale, poi unire mozzarella a cubetti.', ['napoletano']),
  pasta('pasta-salmone', 'Pasta Salmone e Panna', [{ id: 'i3', name: 'Salmone affumicato', quantity: 150, unit: 'g' }, { id: 'i4', name: 'Panna', quantity: 150, unit: 'g' }], 'Nel boccale scaldare panna e salmone a pezzetti.'),
  pasta('pasta-zucchine-gamberetti', 'Pasta Zucchine e Gamberetti', [{ id: 'i3', name: 'Zucchine', quantity: 2, unit: 'pz' }, { id: 'i4', name: 'Gamberetti', quantity: 200, unit: 'g' }], 'Nel boccale stufare le zucchine e unire i gamberetti.', ['pesce']),
  pasta('pasta-tonno', 'Pasta Tonno e Pomodoro', [{ id: 'i3', name: 'Tonno sgocciolato', quantity: 160, unit: 'g' }, { id: 'i4', name: 'Passata di pomodoro', quantity: 300, unit: 'g' }], 'Nel boccale preparare un sugo con passata e tonno.'),
  pasta('pasta-broccoli-salsiccia', 'Pasta Broccoli e Salsiccia', [{ id: 'i3', name: 'Broccoli', quantity: 300, unit: 'g' }, { id: 'i4', name: 'Salsiccia', quantity: 150, unit: 'g' }], 'Nel boccale rosolare la salsiccia e stufare i broccoli.'),
  pasta('pasta-quattro-formaggi', 'Pasta ai Quattro Formaggi', [{ id: 'i3', name: 'Formaggi misti', quantity: 200, unit: 'g' }, { id: 'i4', name: 'Latte', quantity: 100, unit: 'g' }], 'Nel boccale sciogliere i formaggi con il latte.', ['vegetariano']),
  pasta('pasta-vodka', 'Pasta alla Vodka', [{ id: 'i3', name: 'Passata di pomodoro', quantity: 300, unit: 'g' }, { id: 'i4', name: 'Panna', quantity: 100, unit: 'g' }, { id: 'i5', name: 'Vodka', quantity: 30, unit: 'g' }], 'Nel boccale cuocere passata, panna e vodka fino a sugo cremoso.'),
  pasta('pasta-genovese', 'Pasta alla Genovese', [{ id: 'i3', name: 'Cipolle', quantity: 600, unit: 'g' }, { id: 'i4', name: 'Manzo', quantity: 300, unit: 'g' }], 'Nel boccale stufare a lungo cipolle e carne fino a crema dorata.', ['napoletano']),
  pasta('trofie-pesto', 'Trofie al Pesto', [{ id: 'i3', name: 'Pesto alla genovese', quantity: 150, unit: 'g' }, { id: 'i4', name: 'Patata', quantity: 1, unit: 'pz' }, { id: 'i5', name: 'Fagiolini', quantity: 100, unit: 'g' }], 'Lessare patate e fagiolini con la pasta, poi condire con il pesto a crudo.', ['ligure', 'vegetariano']),
  pasta('orecchiette-cime-rapa', 'Orecchiette Cime di Rapa', [{ id: 'i3', name: 'Cime di rapa', quantity: 400, unit: 'g' }, { id: 'i4', name: 'Aglio', quantity: 1, unit: 'spicchio' }, { id: 'i5', name: 'Acciughe', quantity: 2, unit: 'pz' }], 'Nel boccale stufare le cime di rapa con aglio e acciughe.', ['pugliese']),
  pasta('pasta-zucca-speck', 'Pasta Zucca e Speck', [{ id: 'i3', name: 'Zucca', quantity: 300, unit: 'g' }, { id: 'i4', name: 'Speck', quantity: 100, unit: 'g' }], 'Nel boccale stufare la zucca e unire lo speck croccante.'),

  // --- Zuppe e vellutate ---
  vellutata('crema-carote-zuppa', 'Crema di Carote', [{ id: 'i3', name: 'Carote', quantity: 500, unit: 'g' }, { id: 'i4', name: 'Patata', quantity: 1, unit: 'pz' }], ['carote']),
  vellutata('crema-broccoli', 'Crema di Broccoli', [{ id: 'i3', name: 'Broccoli', quantity: 500, unit: 'g' }, { id: 'i4', name: 'Patata', quantity: 1, unit: 'pz' }], ['broccoli']),
  vellutata('crema-cavolfiore', 'Crema di Cavolfiore', [{ id: 'i3', name: 'Cavolfiore', quantity: 500, unit: 'g' }, { id: 'i4', name: 'Patata', quantity: 1, unit: 'pz' }], ['cavolfiore']),
  vellutata('crema-ceci-zuppa', 'Crema di Ceci', [{ id: 'i3', name: 'Ceci lessati', quantity: 400, unit: 'g' }, { id: 'i4', name: 'Patata', quantity: 1, unit: 'pz' }], ['legumi', 'vegano']),
  vellutata('crema-lenticchie-zuppa', 'Crema di Lenticchie', [{ id: 'i3', name: 'Lenticchie lessate', quantity: 400, unit: 'g' }, { id: 'i4', name: 'Carota', quantity: 1, unit: 'pz' }], ['legumi', 'vegano']),
  vellutata('crema-zucchine-zuppa', 'Crema di Zucchine', [{ id: 'i3', name: 'Zucchine', quantity: 500, unit: 'g' }, { id: 'i4', name: 'Patata', quantity: 1, unit: 'pz' }], ['zucchine']),
  {
    id: 'pasta-patate',
    title: 'Pasta e Patate',
    course: 'Primo',
    baseServings: 4,
    difficulty: 'Facile',
    totalTimeMinutes: 40,
    description: 'Pasta e patate cremosa, piatto povero della tradizione.',
    tags: ['patate', 'pasta', 'comfort food'],
    ingredients: [
      { id: 'i1', name: 'Patate', quantity: 500, unit: 'g' },
      { id: 'i2', name: 'Pasta corta', quantity: 200, unit: 'g' },
      { id: 'i3', name: 'Cipolla', quantity: 0.5, unit: 'pz' },
      { id: 'i4', name: 'Passata di pomodoro', quantity: 100, unit: 'g' },
      { id: 'i5', name: 'Acqua', quantity: 700, unit: 'g' },
      olio(20),
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tritare la cipolla e soffriggere.', bimby: { timeSeconds: 180, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Aggiungere patate a cubetti, passata, acqua e sale e cuocere.', bimby: { timeSeconds: 600, speed: '1', temperature: 100 } },
      { id: 's3', order: 3, text: 'Unire la pasta e cuocere in antiorario.', bimby: { timeSeconds: 600, speed: '1', temperature: 100, direction: 'Antiorario' } },
    ],
  },
  {
    id: 'zuppa-cipolle',
    title: 'Zuppa di Cipolle',
    course: 'Primo',
    baseServings: 4,
    difficulty: 'Facile',
    totalTimeMinutes: 45,
    description: 'Zuppa dolce di cipolle con crostini e formaggio.',
    tags: ['cipolle', 'zuppa', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Cipolle', quantity: 700, unit: 'g' },
      olio(20),
      { id: 'i3', name: 'Acqua', quantity: 700, unit: 'g' },
      { id: 'i4', name: 'Dado vegetale', quantity: 1, unit: 'cucchiaio' },
      { id: 'i5', name: 'Pane', quantity: 4, unit: 'fette' },
      { id: 'i6', name: 'Formaggio grattugiato', quantity: 60, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Affettare le cipolle e stufarle a lungo nel boccale con l’olio.', bimby: { timeSeconds: 900, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's2', order: 2, text: 'Aggiungere acqua e dado e cuocere.', bimby: { timeSeconds: 600, speed: '1', temperature: 100 } },
      { id: 's3', order: 3, text: 'Servire con crostini di pane e formaggio gratinato.' },
    ],
  },
  {
    id: 'zuppa-farro',
    title: 'Zuppa di Farro',
    course: 'Primo',
    baseServings: 4,
    difficulty: 'Facile',
    totalTimeMinutes: 50,
    description: 'Zuppa rustica di farro e verdure.',
    tags: ['farro', 'zuppa', 'vegano'],
    ingredients: [
      { id: 'i1', name: 'Farro', quantity: 250, unit: 'g' },
      { id: 'i2', name: 'Carota', quantity: 1, unit: 'pz' },
      { id: 'i3', name: 'Sedano', quantity: 1, unit: 'pz' },
      { id: 'i4', name: 'Cipolla', quantity: 0.5, unit: 'pz' },
      { id: 'i5', name: 'Passata di pomodoro', quantity: 150, unit: 'g' },
      { id: 'i6', name: 'Acqua', quantity: 800, unit: 'g' },
      olio(20),
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tritare le verdure e soffriggere.', bimby: { timeSeconds: 180, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Aggiungere farro, passata, acqua e sale e cuocere in antiorario.', bimby: { timeSeconds: 1800, speed: '1', temperature: 100, direction: 'Antiorario' } },
    ],
  },

  // --- Salse e creme ---
  salsa('salsa-tonnata', 'Salsa Tonnata', [{ id: 'i1', name: 'Tonno sgocciolato', quantity: 120, unit: 'g' }, { id: 'i2', name: 'Maionese', quantity: 100, unit: 'g' }, { id: 'i3', name: 'Capperi', quantity: 15, unit: 'g' }, { id: 'i4', name: 'Acciughe', quantity: 2, unit: 'pz' }], ['tonno']),
  salsa('baba-ganoush', 'Baba Ganoush', [{ id: 'i1', name: 'Melanzane', quantity: 400, unit: 'g' }, { id: 'i2', name: 'Tahina', quantity: 30, unit: 'g' }, { id: 'i3', name: 'Succo di limone', quantity: 20, unit: 'g' }, { id: 'i4', name: 'Aglio', quantity: 1, unit: 'spicchio' }], ['vegano', 'mediorientale']),
  salsa('crema-peperoni', 'Crema di Peperoni', [{ id: 'i1', name: 'Peperoni arrostiti', quantity: 300, unit: 'g' }, { id: 'i2', name: 'Formaggio spalmabile', quantity: 100, unit: 'g' }], ['vegetariano']),
  salsa('pate-funghi', 'Paté di Funghi', [{ id: 'i1', name: 'Funghi', quantity: 300, unit: 'g' }, { id: 'i2', name: 'Formaggio spalmabile', quantity: 80, unit: 'g' }, { id: 'i3', name: 'Aglio', quantity: 1, unit: 'spicchio' }], ['funghi']),
  salsa('crema-feta', 'Crema di Feta', [{ id: 'i1', name: 'Feta', quantity: 200, unit: 'g' }, { id: 'i2', name: 'Yogurt greco', quantity: 80, unit: 'g' }, { id: 'i3', name: 'Olio extravergine di oliva', quantity: 20, unit: 'g' }], ['greco', 'vegetariano']),
  salsa('salsa-gorgonzola', 'Salsa al Gorgonzola', [{ id: 'i1', name: 'Gorgonzola', quantity: 150, unit: 'g' }, { id: 'i2', name: 'Panna', quantity: 80, unit: 'g' }], ['vegetariano']),
  salsa('hummus-barbabietola', 'Hummus di Barbabietola', [{ id: 'i1', name: 'Ceci lessati', quantity: 250, unit: 'g' }, { id: 'i2', name: 'Barbabietola', quantity: 150, unit: 'g' }, { id: 'i3', name: 'Tahina', quantity: 30, unit: 'g' }, { id: 'i4', name: 'Succo di limone', quantity: 20, unit: 'g' }], ['vegano', 'legumi']),
  salsa('tapenade', 'Tapenade di Olive', [{ id: 'i1', name: 'Olive nere denocciolate', quantity: 200, unit: 'g' }, { id: 'i2', name: 'Capperi', quantity: 20, unit: 'g' }, { id: 'i3', name: 'Acciughe', quantity: 2, unit: 'pz' }, { id: 'i4', name: 'Olio extravergine di oliva', quantity: 40, unit: 'g' }], ['vegano', 'francese']),
];
