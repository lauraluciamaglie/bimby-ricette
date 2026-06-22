import { Recipe } from '@/types/recipe';

/**
 * Ricette aggiuntive — ondata 3 (altri risotti e paste, vellutate, confetture,
 * basi, dolci, salse, colazioni). Piatti reali e popolari, in forma compatta.
 */

const sale = { id: 'sale', name: 'Sale', quantity: null };
const olio = (g = 20) => ({ id: 'olio', name: 'Olio extravergine di oliva', quantity: g, unit: 'g' });
type Ing = { id: string; name: string; quantity: number | null; unit?: string };

function risotto(id: string, title: string, extra: Ing[], mant: string): Recipe {
  return {
    id, title, course: 'Primo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 30,
    description: `${title}: cremoso e mantecato, cotto tutto nel boccale.`, tags: ['riso', 'risotto'],
    ingredients: [
      { id: 'i1', name: 'Cipolla', quantity: 0.5, unit: 'pz' }, olio(20),
      { id: 'i3', name: 'Riso Carnaroli', quantity: 320, unit: 'g' },
      { id: 'i4', name: 'Vino bianco', quantity: 50, unit: 'g' },
      { id: 'i5', name: 'Acqua', quantity: 750, unit: 'g' },
      { id: 'i6', name: 'Dado vegetale', quantity: 1, unit: 'cucchiaio' },
      { id: 'i7', name: 'Parmigiano grattugiato', quantity: 50, unit: 'g' }, ...extra, sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tritare la cipolla e soffriggere con l’olio.', bimby: { timeSeconds: 180, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Unire riso e ingredienti principali e tostare in antiorario.', bimby: { timeSeconds: 180, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Sfumare col vino, aggiungere acqua e dado e cuocere in antiorario.', bimby: { timeSeconds: 900, speed: 'Soft', temperature: 100, direction: 'Antiorario' } },
      { id: 's4', order: 4, text: mant, bimby: { timeSeconds: 40, speed: 'Soft', direction: 'Antiorario' } },
    ],
  };
}

function pasta(id: string, title: string, cond: Ing[], metodo: string, tags: string[] = []): Recipe {
  return {
    id, title, course: 'Primo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 25,
    description: `${title}: un primo saporito.`, tags: ['pasta', ...tags],
    ingredients: [{ id: 'i1', name: 'Pasta', quantity: 320, unit: 'g' }, olio(20), ...cond, sale],
    steps: [
      { id: 's1', order: 1, text: 'Lessare la pasta in abbondante acqua salata.' },
      { id: 's2', order: 2, text: metodo, bimby: { timeSeconds: 600, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Scolare la pasta e condirla con il sugo.' },
    ],
  };
}

function vellutata(id: string, title: string, verdura: Ing[], tags: string[] = []): Recipe {
  return {
    id, title, course: 'Primo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 30,
    description: `${title}: vellutata calda, cotta e frullata nel boccale.`, tags: ['crema', 'vellutata', 'vegetariano', ...tags],
    ingredients: [
      { id: 'i1', name: 'Cipolla', quantity: 0.5, unit: 'pz' }, olio(20), ...verdura,
      { id: 'i9', name: 'Acqua', quantity: 500, unit: 'g' },
      { id: 'i10', name: 'Dado vegetale', quantity: 1, unit: 'cucchiaio' }, sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tritare la cipolla e soffriggere con l’olio.', bimby: { timeSeconds: 180, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Aggiungere le verdure a pezzi, l’acqua e il dado e cuocere.', bimby: { timeSeconds: 1200, speed: '1', temperature: 100 } },
      { id: 's3', order: 3, text: 'Frullare fino a crema liscia.', bimby: { timeSeconds: 40, speed: '8' } },
    ],
  };
}

function salsa(id: string, title: string, ing: Ing[], tags: string[] = []): Recipe {
  return {
    id, title, course: 'Antipasto', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 8,
    description: `${title}: crema da spalmare o intingere, pronta in pochi minuti.`, tags: ['salsa', 'antipasto', ...tags],
    ingredients: [...ing, sale],
    steps: [
      { id: 's1', order: 1, text: 'Inserire tutti gli ingredienti nel boccale.' },
      { id: 's2', order: 2, text: 'Frullare fino a crema liscia.', bimby: { timeSeconds: 40, speed: '7' } },
    ],
  };
}

function confettura(id: string, title: string, frutto: string, qty: number): Recipe {
  return {
    id, title, course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 40,
    description: `${title}: confettura fatta in casa, cotta nel boccale.`, tags: ['confettura', 'frutta', 'conserva'],
    ingredients: [
      { id: 'i1', name: frutto, quantity: qty, unit: 'g' },
      { id: 'i2', name: 'Zucchero', quantity: Math.round(qty * 0.6), unit: 'g' },
      { id: 'i3', name: 'Succo di limone', quantity: 20, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire la frutta a pezzi, lo zucchero e il limone nel boccale e tritare.', bimby: { timeSeconds: 10, speed: '5' } },
      { id: 's2', order: 2, text: 'Cuocere senza misurino, in antiorario, finché si addensa.', bimby: { timeSeconds: 1800, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Invasare ancora calda in barattoli puliti e capovolgere per il sottovuoto.' },
    ],
  };
}

export const EXTRA_3: Recipe[] = [
  // Risotti
  risotto('risotto-mele', 'Risotto alle Mele', [{ id: 'i8', name: 'Mele', quantity: 2, unit: 'pz' }], 'Mantecare con parmigiano.'),
  risotto('risotto-gorgonzola', 'Risotto al Gorgonzola', [{ id: 'i8', name: 'Gorgonzola', quantity: 120, unit: 'g' }], 'Mantecare con il gorgonzola.'),
  risotto('risotto-spinaci', 'Risotto agli Spinaci', [{ id: 'i8', name: 'Spinaci', quantity: 200, unit: 'g' }], 'Mantecare con parmigiano.'),
  risotto('risotto-curcuma', 'Risotto alla Curcuma', [{ id: 'i8', name: 'Curcuma', quantity: 5, unit: 'g' }], 'Mantecare con parmigiano e burro.'),
  risotto('risotto-pomodorini', 'Risotto ai Pomodorini', [{ id: 'i8', name: 'Pomodorini', quantity: 250, unit: 'g' }], 'Mantecare con parmigiano e basilico.'),

  // Paste
  pasta('pasta-melanzane-ricotta', 'Pasta Melanzane e Ricotta', [{ id: 'i3', name: 'Melanzane', quantity: 2, unit: 'pz' }, { id: 'i4', name: 'Passata di pomodoro', quantity: 300, unit: 'g' }, { id: 'i5', name: 'Ricotta', quantity: 100, unit: 'g' }], 'Nel boccale stufare le melanzane con la passata.', ['vegetariano']),
  pasta('pasta-zucca-salsiccia', 'Pasta Zucca e Salsiccia', [{ id: 'i3', name: 'Zucca', quantity: 300, unit: 'g' }, { id: 'i4', name: 'Salsiccia', quantity: 150, unit: 'g' }], 'Nel boccale stufare la zucca e rosolare la salsiccia.'),
  pasta('pasta-radicchio-speck', 'Pasta Radicchio e Speck', [{ id: 'i3', name: 'Radicchio', quantity: 200, unit: 'g' }, { id: 'i4', name: 'Speck', quantity: 100, unit: 'g' }, { id: 'i5', name: 'Panna', quantity: 80, unit: 'g' }], 'Nel boccale stufare radicchio e speck con la panna.'),
  pasta('pasta-noci', 'Pasta alle Noci', [{ id: 'i3', name: 'Noci', quantity: 120, unit: 'g' }, { id: 'i4', name: 'Panna', quantity: 100, unit: 'g' }, { id: 'i5', name: 'Parmigiano grattugiato', quantity: 40, unit: 'g' }], 'Nel boccale tritare le noci e scaldare con panna e parmigiano.', ['vegetariano']),
  pasta('pasta-limone', 'Pasta al Limone', [{ id: 'i3', name: 'Limone', quantity: 1, unit: 'pz' }, { id: 'i4', name: 'Panna', quantity: 100, unit: 'g' }, { id: 'i5', name: 'Parmigiano grattugiato', quantity: 40, unit: 'g' }], 'Nel boccale scaldare panna, scorza e succo di limone e parmigiano.', ['vegetariano']),
  pasta('pasta-funghi-panna', 'Pasta Funghi e Panna', [{ id: 'i3', name: 'Funghi', quantity: 250, unit: 'g' }, { id: 'i4', name: 'Panna', quantity: 100, unit: 'g' }], 'Nel boccale stufare i funghi e unire la panna.', ['vegetariano']),
  pasta('pasta-asparagi', 'Pasta agli Asparagi', [{ id: 'i3', name: 'Asparagi', quantity: 300, unit: 'g' }, { id: 'i4', name: 'Parmigiano grattugiato', quantity: 40, unit: 'g' }], 'Nel boccale stufare gli asparagi a pezzetti.', ['vegetariano']),
  pasta('pasta-fredda', 'Pasta Fredda Estiva', [{ id: 'i3', name: 'Pomodorini', quantity: 250, unit: 'g' }, { id: 'i4', name: 'Mozzarella', quantity: 150, unit: 'g' }, { id: 'i5', name: 'Basilico', quantity: null }], 'Condire la pasta lessata e raffreddata con pomodorini, mozzarella e basilico (a crudo, senza cottura).', ['estate', 'vegetariano']),

  // Vellutate
  vellutata('crema-spinaci-zuppa', 'Crema di Spinaci', [{ id: 'i3', name: 'Spinaci', quantity: 500, unit: 'g' }, { id: 'i4', name: 'Patata', quantity: 1, unit: 'pz' }], ['spinaci']),
  vellutata('crema-fave', 'Crema di Fave', [{ id: 'i3', name: 'Fave', quantity: 400, unit: 'g' }, { id: 'i4', name: 'Patata', quantity: 1, unit: 'pz' }], ['legumi', 'vegano']),
  vellutata('crema-pomodoro-zuppa', 'Crema di Pomodoro', [{ id: 'i3', name: 'Pomodori', quantity: 600, unit: 'g' }, { id: 'i4', name: 'Patata', quantity: 1, unit: 'pz' }], ['pomodoro', 'vegano']),
  vellutata('crema-sedano-rapa', 'Crema di Sedano Rapa', [{ id: 'i3', name: 'Sedano rapa', quantity: 500, unit: 'g' }, { id: 'i4', name: 'Patata', quantity: 1, unit: 'pz' }], ['vegano']),

  // Confetture
  confettura('confettura-fragole', 'Confettura di Fragole', 'Fragole', 600),
  confettura('confettura-albicocche', 'Confettura di Albicocche', 'Albicocche', 600),
  confettura('confettura-pesche', 'Confettura di Pesche', 'Pesche', 600),
  confettura('marmellata-arance', 'Marmellata di Arance', 'Arance', 600),
  confettura('confettura-frutti-bosco', 'Confettura di Frutti di Bosco', 'Frutti di bosco', 600),

  // Salse e creme salate
  salsa('pesto-rucola', 'Pesto di Rucola', [{ id: 'i1', name: 'Rucola', quantity: 80, unit: 'g' }, { id: 'i2', name: 'Mandorle', quantity: 30, unit: 'g' }, { id: 'i3', name: 'Parmigiano grattugiato', quantity: 40, unit: 'g' }, { id: 'i4', name: 'Olio extravergine di oliva', quantity: 100, unit: 'g' }], ['vegetariano']),
  salsa('pesto-pomodori-secchi', 'Pesto di Pomodori Secchi', [{ id: 'i1', name: 'Pomodori secchi', quantity: 150, unit: 'g' }, { id: 'i2', name: 'Mandorle', quantity: 30, unit: 'g' }, { id: 'i3', name: 'Olio extravergine di oliva', quantity: 80, unit: 'g' }], ['vegano']),
  salsa('crema-carciofi', 'Crema di Carciofi', [{ id: 'i1', name: 'Carciofi', quantity: 300, unit: 'g' }, { id: 'i2', name: 'Formaggio spalmabile', quantity: 80, unit: 'g' }], ['vegetariano']),
  salsa('crema-zucca-salata', 'Crema di Zucca Speziata', [{ id: 'i1', name: 'Zucca cotta', quantity: 300, unit: 'g' }, { id: 'i2', name: 'Formaggio spalmabile', quantity: 80, unit: 'g' }, { id: 'i3', name: 'Curry in polvere', quantity: null }], ['vegetariano']),

  // Dolci
  {
    id: 'mousse-limone', title: 'Mousse al Limone', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 20,
    description: 'Mousse fresca e profumata al limone.', tags: ['limone', 'mousse', 'fresco'],
    ingredients: [
      { id: 'i1', name: 'Panna fresca', quantity: 250, unit: 'g' },
      { id: 'i2', name: 'Succo di limone', quantity: 60, unit: 'g' },
      { id: 'i3', name: 'Zucchero a velo', quantity: 80, unit: 'g' },
      { id: 'i4', name: 'Scorza di limone', quantity: null },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Posizionare la farfalla e montare la panna con lo zucchero.', bimby: { timeSeconds: 60, speed: '3' } },
      { id: 's2', order: 2, text: 'Incorporare delicatamente succo e scorza di limone. Riporre in frigo 2 ore.' },
    ],
  },
  {
    id: 'torta-carote', title: 'Torta di Carote', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 55,
    description: 'Torta soffice e umida di carote e mandorle.', tags: ['carote', 'torta', 'colazione'],
    ingredients: [
      { id: 'i1', name: 'Carote', quantity: 300, unit: 'g' },
      { id: 'i2', name: 'Mandorle', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Farina', quantity: 150, unit: 'g' },
      { id: 'i4', name: 'Zucchero', quantity: 150, unit: 'g' },
      { id: 'i5', name: 'Uova', quantity: 3, unit: 'uova' },
      { id: 'i6', name: 'Olio di semi', quantity: 80, unit: 'g' },
      { id: 'i7', name: 'Lievito per dolci', quantity: 1, unit: 'bustina', scalable: false },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tritare carote e mandorle nel boccale.', bimby: { timeSeconds: 15, speed: '7' } },
      { id: 's2', order: 2, text: 'Aggiungere uova, zucchero e olio e montare.', bimby: { timeSeconds: 120, speed: '4' } },
      { id: 's3', order: 3, text: 'Unire farina e lievito e amalgamare.', bimby: { timeSeconds: 30, speed: '4' } },
      { id: 's4', order: 4, text: 'Versare in tortiera e cuocere in forno a 175°C per circa 40 minuti.' },
    ],
  },
  {
    id: 'cantucci', title: 'Cantucci alle Mandorle', course: 'Dolce', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 45,
    description: 'Biscotti secchi toscani con le mandorle.', tags: ['biscotti', 'mandorle', 'toscano'],
    ingredients: [
      { id: 'i1', name: 'Farina', quantity: 300, unit: 'g' },
      { id: 'i2', name: 'Zucchero', quantity: 200, unit: 'g' },
      { id: 'i3', name: 'Uova', quantity: 3, unit: 'uova' },
      { id: 'i4', name: 'Mandorle', quantity: 150, unit: 'g' },
      { id: 'i5', name: 'Lievito per dolci', quantity: 0.5, unit: 'bustina', scalable: false },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Impastare farina, zucchero, uova e lievito; unire le mandorle intere.', bimby: { timeSeconds: 30, speed: '5' } },
      { id: 's2', order: 2, text: 'Formare dei filoncini e cuocere in forno a 180°C per 20 minuti; tagliare a fette in diagonale e biscottare altri 10 minuti.' },
    ],
  },
  {
    id: 'cioccolata-calda', title: 'Cioccolata Calda', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 10,
    description: 'Cioccolata calda densa e cremosa.', tags: ['cioccolato', 'bevanda', 'inverno'],
    ingredients: [
      { id: 'i1', name: 'Latte', quantity: 500, unit: 'g' },
      { id: 'i2', name: 'Cioccolato fondente', quantity: 100, unit: 'g' },
      { id: 'i3', name: 'Zucchero', quantity: 40, unit: 'g' },
      { id: 'i4', name: 'Amido di mais', quantity: 15, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tritare il cioccolato.', bimby: { timeSeconds: 10, speed: '8' } },
      { id: 's2', order: 2, text: 'Aggiungere latte, zucchero e amido e cuocere mescolando fino a densità.', bimby: { timeSeconds: 420, speed: '3', temperature: 90 } },
    ],
  },
  {
    id: 'crema-mascarpone', title: 'Crema al Mascarpone', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 15,
    description: 'Crema al mascarpone da gustare al cucchiaio o per farcire.', tags: ['mascarpone', 'crema'],
    ingredients: [
      { id: 'i1', name: 'Mascarpone', quantity: 250, unit: 'g' },
      { id: 'i2', name: 'Uova', quantity: 2, unit: 'uova' },
      { id: 'i3', name: 'Zucchero', quantity: 60, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Montare tuorli e zucchero con la farfalla.', bimby: { timeSeconds: 120, speed: '4' } },
      { id: 's2', order: 2, text: 'Aggiungere il mascarpone e amalgamare; incorporare a mano gli albumi montati a neve.', bimby: { timeSeconds: 30, speed: '3' } },
    ],
  },

  // Colazioni / bevande
  {
    id: 'smoothie-frutta', title: 'Smoothie di Frutta', course: 'Dolce', baseServings: 2, difficulty: 'Facile', totalTimeMinutes: 5,
    description: 'Frullato fresco di frutta e yogurt.', tags: ['colazione', 'frutta', 'bevanda'],
    ingredients: [
      { id: 'i1', name: 'Frutta mista', quantity: 300, unit: 'g' },
      { id: 'i2', name: 'Yogurt bianco', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Miele', quantity: 20, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire tutto nel boccale e frullare fino a crema.', bimby: { timeSeconds: 40, speed: '8' } },
    ],
  },
  {
    id: 'porridge-avena', title: 'Porridge di Avena', course: 'Dolce', baseServings: 2, difficulty: 'Facile', totalTimeMinutes: 10,
    description: 'Crema di avena calda per una colazione nutriente.', tags: ['colazione', 'avena'],
    ingredients: [
      { id: 'i1', name: 'Fiocchi di avena', quantity: 80, unit: 'g' },
      { id: 'i2', name: 'Latte', quantity: 400, unit: 'g' },
      { id: 'i3', name: 'Miele', quantity: 20, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire avena e latte nel boccale e cuocere mescolando.', bimby: { timeSeconds: 480, speed: '2', temperature: 90 } },
      { id: 's2', order: 2, text: 'Dolcificare con miele e servire con frutta a piacere.' },
    ],
  },
  {
    id: 'crema-nocciola', title: 'Crema di Nocciole', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 15,
    description: 'Crema spalmabile al cioccolato e nocciole fatta in casa.', tags: ['cioccolato', 'nocciole', 'colazione'],
    ingredients: [
      { id: 'i1', name: 'Nocciole', quantity: 200, unit: 'g' },
      { id: 'i2', name: 'Cioccolato fondente', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Zucchero a velo', quantity: 80, unit: 'g' },
      { id: 'i4', name: 'Olio di semi', quantity: 40, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tritare a lungo le nocciole fino a crema.', bimby: { timeSeconds: 60, speed: '8' } },
      { id: 's2', order: 2, text: 'Aggiungere cioccolato fuso, zucchero a velo e olio e frullare fino a crema liscia.', bimby: { timeSeconds: 40, speed: '6' } },
    ],
  },
];
