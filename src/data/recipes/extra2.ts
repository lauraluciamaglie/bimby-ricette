import { Recipe } from '@/types/recipe';

/**
 * Ricette aggiuntive — ondata 2 (secondi, pesce, contorni, dolci).
 * Piatti reali e popolari, in forma compatta ma completa.
 */

const sale = { id: 'sale', name: 'Sale', quantity: null };
const olio = (g = 20) => ({ id: 'olio', name: 'Olio extravergine di oliva', quantity: g, unit: 'g' });

/** Secondo di carne in umido: soffritto + carne rosolata + pomodoro. */
function secondoUmido(
  id: string,
  title: string,
  carne: string,
  qty: number,
  tags: string[] = []
): Recipe {
  return {
    id,
    title,
    course: 'Secondo',
    baseServings: 4,
    difficulty: 'Media',
    totalTimeMinutes: 60,
    description: `${title}: secondo in umido cotto lentamente nel boccale.`,
    tags: ['carne', ...tags],
    ingredients: [
      { id: 'i1', name: 'Cipolla', quantity: 1, unit: 'pz' },
      olio(20),
      { id: 'i3', name: carne, quantity: qty, unit: 'g' },
      { id: 'i4', name: 'Passata di pomodoro', quantity: 300, unit: 'g' },
      { id: 'i5', name: 'Vino bianco', quantity: 50, unit: 'g' },
      { id: 'i6', name: 'Acqua', quantity: 200, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tritare la cipolla e soffriggere con l’olio.', bimby: { timeSeconds: 180, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Unire la carne e rosolare in antiorario.', bimby: { timeSeconds: 300, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Sfumare con il vino, poi aggiungere passata, acqua e sale.', bimby: { timeSeconds: 120, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's4', order: 4, text: 'Cuocere a lungo in antiorario, velocità soft.', bimby: { timeSeconds: 2100, speed: 'Soft', temperature: 100, direction: 'Antiorario' } },
    ],
  };
}

/** Contorno di verdura stufata con aglio e olio. */
function contornoStufato(
  id: string,
  title: string,
  verdura: string,
  qty: number,
  tags: string[] = []
): Recipe {
  return {
    id,
    title,
    course: 'Contorno',
    baseServings: 4,
    difficulty: 'Facile',
    totalTimeMinutes: 25,
    description: `${title}: contorno di verdura stufata, semplice e gustoso.`,
    tags: ['verdure', ...tags],
    ingredients: [
      { id: 'i1', name: 'Aglio', quantity: 1, unit: 'spicchio' },
      olio(20),
      { id: 'i3', name: verdura, quantity: qty, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Rosolare l’aglio nell’olio nel boccale.', bimby: { timeSeconds: 120, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Aggiungere la verdura e il sale e cuocere in antiorario.', bimby: { timeSeconds: 900, speed: '1', temperature: 100, direction: 'Antiorario' } },
    ],
  };
}

/** Torta da forno con impasto montato nel boccale. */
function torta(
  id: string,
  title: string,
  extra: { id: string; name: string; quantity: number | null; unit?: string }[],
  tags: string[] = []
): Recipe {
  return {
    id,
    title,
    course: 'Dolce',
    baseServings: 4,
    difficulty: 'Facile',
    totalTimeMinutes: 50,
    description: `${title}: dolce soffice con impasto preparato nel boccale.`,
    tags: ['torta', ...tags],
    ingredients: [
      { id: 'i1', name: 'Farina', quantity: 250, unit: 'g' },
      { id: 'i2', name: 'Zucchero', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Uova', quantity: 3, unit: 'uova' },
      { id: 'i4', name: 'Olio di semi', quantity: 80, unit: 'g' },
      { id: 'i5', name: 'Latte', quantity: 100, unit: 'g' },
      { id: 'i6', name: 'Lievito per dolci', quantity: 1, unit: 'bustina', scalable: false },
      ...extra,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Montare uova e zucchero nel boccale.', bimby: { timeSeconds: 120, speed: '4' } },
      { id: 's2', order: 2, text: 'Aggiungere olio, latte e gli altri ingredienti e amalgamare.', bimby: { timeSeconds: 30, speed: '4' } },
      { id: 's3', order: 3, text: 'Unire farina e lievito e mescolare fino a impasto liscio.', bimby: { timeSeconds: 30, speed: '4' } },
      { id: 's4', order: 4, text: 'Versare in tortiera e cuocere in forno a 175°C per circa 35 minuti.' },
    ],
  };
}

export const EXTRA_2: Recipe[] = [
  // --- Secondi di carne ---
  secondoUmido('pollo-cacciatora', 'Pollo alla Cacciatora', 'Pollo a pezzi', 800, ['pollo']),
  secondoUmido('spezzatino-maiale', 'Spezzatino di Maiale', 'Maiale a cubetti', 600, ['maiale']),
  secondoUmido('bocconcini-vitello', 'Bocconcini di Vitello', 'Vitello a cubetti', 600, ['vitello']),
  secondoUmido('straccetti-pomodoro', 'Straccetti di Manzo al Pomodoro', 'Straccetti di manzo', 600, ['manzo']),
  secondoUmido('coniglio-umido', 'Coniglio in Umido', 'Coniglio a pezzi', 800, ['coniglio']),
  secondoUmido('salsicce-pomodoro', 'Salsicce al Pomodoro', 'Salsicce', 600, ['maiale']),
  {
    id: 'pollo-arrosto',
    title: 'Pollo Arrosto',
    course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 70,
    description: 'Pollo arrosto dorato con patate, profumato alle erbe.',
    tags: ['pollo', 'forno', 'domenica'],
    ingredients: [
      { id: 'i1', name: 'Pollo', quantity: 1, unit: 'pz' },
      { id: 'i2', name: 'Patate', quantity: 600, unit: 'g' },
      { id: 'i3', name: 'Rosmarino', quantity: null },
      olio(30), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Condire il pollo con olio, sale e rosmarino.' },
      { id: 's2', order: 2, text: 'Disporlo in teglia con le patate a spicchi e cuocere in forno a 190°C per circa 60 minuti, girando a metà.' },
    ],
  },
  {
    id: 'brasato-vino',
    title: 'Brasato al Vino Rosso',
    course: 'Secondo', baseServings: 4, difficulty: 'Difficile', totalTimeMinutes: 150,
    description: 'Brasato di manzo tenero cotto a lungo nel vino rosso.',
    tags: ['manzo', 'brasato'],
    ingredients: [
      { id: 'i1', name: 'Manzo per brasato', quantity: 800, unit: 'g' },
      { id: 'i2', name: 'Vino rosso', quantity: 300, unit: 'g' },
      { id: 'i3', name: 'Cipolla', quantity: 1, unit: 'pz' },
      { id: 'i4', name: 'Carota', quantity: 1, unit: 'pz' },
      { id: 'i5', name: 'Sedano', quantity: 1, unit: 'pz' },
      olio(30), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Rosolare la carne in padella su tutti i lati.' },
      { id: 's2', order: 2, text: 'Tritare le verdure nel boccale e soffriggere.', bimby: { timeSeconds: 180, speed: '1', temperature: 100 } },
      { id: 's3', order: 3, text: 'Aggiungere carne, vino e sale e cuocere a lungo in antiorario.', bimby: { timeSeconds: 5400, speed: 'Soft', temperature: 100, direction: 'Antiorario' } },
      { id: 's4', order: 4, text: 'Affettare e servire con la salsa frullata.' },
    ],
  },

  // --- Secondi di pesce ---
  {
    id: 'branzino-varoma',
    title: 'Branzino al Vapore (Varoma)',
    course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 30,
    description: 'Branzino delicato cotto al vapore con il Varoma.',
    tags: ['pesce', 'vapore', 'leggero'],
    ingredients: [
      { id: 'i1', name: 'Branzino', quantity: 2, unit: 'pz' },
      { id: 'i2', name: 'Acqua', quantity: 700, unit: 'g' },
      { id: 'i3', name: 'Limone', quantity: 1, unit: 'pz' },
      { id: 'i4', name: 'Prezzemolo', quantity: null },
      olio(), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Versare l’acqua nel boccale. Disporre i branzini nel Varoma con limone e sale.' },
      { id: 's2', order: 2, text: 'Cuocere a vapore.', bimby: { timeSeconds: 1500, speed: '1', temperature: 'Varoma' } },
      { id: 's3', order: 3, text: 'Servire con olio a crudo e prezzemolo.' },
    ],
  },
  {
    id: 'cozze-marinara',
    title: 'Cozze alla Marinara',
    course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 25,
    description: 'Cozze profumate in bianco con aglio e prezzemolo.',
    tags: ['pesce', 'cozze'],
    ingredients: [
      { id: 'i1', name: 'Cozze', quantity: 1000, unit: 'g' },
      { id: 'i2', name: 'Aglio', quantity: 2, unit: 'spicchio' },
      { id: 'i3', name: 'Vino bianco', quantity: 80, unit: 'g' },
      { id: 'i4', name: 'Prezzemolo', quantity: null },
      olio(30),
    ],
    steps: [
      { id: 's1', order: 1, text: 'Rosolare l’aglio nell’olio nel boccale.', bimby: { timeSeconds: 120, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Aggiungere le cozze e il vino e cuocere in antiorario finché si aprono.', bimby: { timeSeconds: 600, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Profumare con prezzemolo.' },
    ],
  },
  {
    id: 'calamari-umido',
    title: 'Calamari in Umido',
    course: 'Secondo', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 45,
    description: 'Calamari teneri in umido con pomodoro.',
    tags: ['pesce', 'calamari'],
    ingredients: [
      { id: 'i1', name: 'Calamari puliti', quantity: 700, unit: 'g' },
      { id: 'i2', name: 'Passata di pomodoro', quantity: 300, unit: 'g' },
      { id: 'i3', name: 'Aglio', quantity: 1, unit: 'spicchio' },
      { id: 'i4', name: 'Prezzemolo', quantity: null },
      olio(20), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Rosolare l’aglio nell’olio.', bimby: { timeSeconds: 120, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Aggiungere calamari ad anelli, passata e sale e cuocere in antiorario.', bimby: { timeSeconds: 1500, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Profumare con prezzemolo.' },
    ],
  },
  {
    id: 'platessa-gratinata',
    title: 'Platessa Gratinata',
    course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 25,
    description: 'Filetti di platessa con panatura croccante al forno.',
    tags: ['pesce', 'forno'],
    ingredients: [
      { id: 'i1', name: 'Filetti di platessa', quantity: 600, unit: 'g' },
      { id: 'i2', name: 'Pangrattato', quantity: 80, unit: 'g' },
      { id: 'i3', name: 'Prezzemolo', quantity: null },
      { id: 'i4', name: 'Limone', quantity: 1, unit: 'pz' },
      olio(20), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Disporre i filetti in teglia, coprire con pangrattato, prezzemolo, olio e sale.' },
      { id: 's2', order: 2, text: 'Gratinare in forno a 200°C per 15 minuti. Servire con limone.' },
    ],
  },

  // --- Contorni ---
  contornoStufato('broccoli-stufati', 'Broccoli Stufati', 'Broccoli', 600, ['vegano']),
  contornoStufato('cicoria-ripassata', 'Cicoria Ripassata', 'Cicoria', 600, ['vegano']),
  contornoStufato('verze-stufate', 'Verze Stufate', 'Verza', 600, ['vegano']),
  contornoStufato('cavoletti-stufati', 'Cavoletti di Bruxelles', 'Cavoletti di Bruxelles', 500, ['vegano']),
  contornoStufato('funghi-trifolati', 'Funghi Trifolati', 'Funghi', 500, ['vegano']),
  contornoStufato('lenticchie-umido', 'Lenticchie in Umido', 'Lenticchie lessate', 500, ['legumi', 'vegano']),
  {
    id: 'parmigiana',
    title: 'Parmigiana di Melanzane',
    course: 'Contorno', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 70,
    description: 'Il classico sformato di melanzane, pomodoro e mozzarella.',
    tags: ['melanzane', 'forno', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Melanzane', quantity: 800, unit: 'g' },
      { id: 'i2', name: 'Passata di pomodoro', quantity: 500, unit: 'g' },
      { id: 'i3', name: 'Mozzarella', quantity: 250, unit: 'g' },
      { id: 'i4', name: 'Parmigiano grattugiato', quantity: 80, unit: 'g' },
      { id: 'i5', name: 'Basilico', quantity: null },
      olio(30), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Friggere o grigliare le melanzane a fette.' },
      { id: 's2', order: 2, text: 'Preparare il sugo con la passata nel boccale.', bimby: { timeSeconds: 900, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Alternare in teglia melanzane, sugo, mozzarella e parmigiano. Cuocere in forno a 180°C per 30 minuti.' },
    ],
  },
  {
    id: 'sformato-spinaci',
    title: 'Sformato di Spinaci',
    course: 'Contorno', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 40,
    description: 'Sformato morbido di spinaci e formaggio.',
    tags: ['spinaci', 'forno', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Spinaci', quantity: 500, unit: 'g' },
      { id: 'i2', name: 'Uova', quantity: 2, unit: 'uova' },
      { id: 'i3', name: 'Parmigiano grattugiato', quantity: 50, unit: 'g' },
      { id: 'i4', name: 'Pangrattato', quantity: 30, unit: 'g' },
      { id: 'i5', name: 'Noce moscata', quantity: null },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Cuocere gli spinaci nel boccale.', bimby: { timeSeconds: 360, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Aggiungere uova, parmigiano, pangrattato, noce moscata e sale e frullare.', bimby: { timeSeconds: 15, speed: '5' } },
      { id: 's3', order: 3, text: 'Versare in uno stampo e cuocere in forno a 180°C per 25 minuti.' },
    ],
  },
  {
    id: 'patate-duchessa',
    title: 'Patate Duchessa',
    course: 'Contorno', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 40,
    description: 'Ciuffi di purè dorati al forno.',
    tags: ['patate', 'forno', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Patate', quantity: 700, unit: 'g' },
      { id: 'i2', name: 'Tuorli', quantity: 2, unit: 'pz' },
      { id: 'i3', name: 'Burro', quantity: 30, unit: 'g' },
      { id: 'i4', name: 'Parmigiano grattugiato', quantity: 40, unit: 'g' },
      { id: 'i5', name: 'Noce moscata', quantity: null },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Lessare e schiacciare le patate; amalgamare con tuorli, burro, parmigiano, noce moscata e sale.' },
      { id: 's2', order: 2, text: 'Formare dei ciuffi con la sac à poche su teglia e cuocere in forno a 200°C per 15 minuti.' },
    ],
  },

  // --- Dolci ---
  torta('torta-yogurt', 'Torta allo Yogurt', [{ id: 'i7', name: 'Yogurt bianco', quantity: 125, unit: 'g' }], ['colazione']),
  torta('torta-cioccolato', 'Torta al Cioccolato', [{ id: 'i7', name: 'Cacao amaro', quantity: 40, unit: 'g' }], ['cioccolato']),
  torta('plumcake-cioccolato', 'Plumcake al Cioccolato', [{ id: 'i7', name: 'Gocce di cioccolato', quantity: 100, unit: 'g' }], ['cioccolato', 'colazione']),
  torta('torta-cocco', 'Torta al Cocco', [{ id: 'i7', name: 'Cocco rapè', quantity: 100, unit: 'g' }], ['cocco']),
  torta('muffin-mirtilli', 'Muffin ai Mirtilli', [{ id: 'i7', name: 'Mirtilli', quantity: 120, unit: 'g' }], ['colazione']),
  {
    id: 'crema-catalana',
    title: 'Crema Catalana',
    course: 'Dolce', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 20,
    description: 'Crema profumata con superficie di zucchero caramellato.',
    tags: ['crema', 'spagnolo', 'dolce al cucchiaio'],
    ingredients: [
      { id: 'i1', name: 'Latte', quantity: 500, unit: 'g' },
      { id: 'i2', name: 'Tuorli', quantity: 4, unit: 'pz' },
      { id: 'i3', name: 'Zucchero', quantity: 120, unit: 'g' },
      { id: 'i4', name: 'Amido di mais', quantity: 40, unit: 'g' },
      { id: 'i5', name: 'Scorza di limone', quantity: null },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire tutti gli ingredienti nel boccale.' },
      { id: 's2', order: 2, text: 'Cuocere mescolando fino ad addensare.', bimby: { timeSeconds: 420, speed: '4', temperature: 90 } },
      { id: 's3', order: 3, text: 'Versare nelle cocotte, raffreddare e caramellare lo zucchero in superficie.' },
    ],
  },
  {
    id: 'budino-vaniglia',
    title: 'Budino alla Vaniglia',
    course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 15,
    description: 'Budino cremoso alla vaniglia, semplice e goloso.',
    tags: ['budino', 'vaniglia'],
    ingredients: [
      { id: 'i1', name: 'Latte', quantity: 500, unit: 'g' },
      { id: 'i2', name: 'Zucchero', quantity: 80, unit: 'g' },
      { id: 'i3', name: 'Amido di mais', quantity: 50, unit: 'g' },
      { id: 'i4', name: 'Vaniglia', quantity: null },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire tutti gli ingredienti nel boccale.' },
      { id: 's2', order: 2, text: 'Cuocere mescolando fino ad addensare.', bimby: { timeSeconds: 420, speed: '4', temperature: 90 } },
      { id: 's3', order: 3, text: 'Versare negli stampini e raffreddare in frigo.' },
    ],
  },
  {
    id: 'pancake',
    title: 'Pancake',
    course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 20,
    description: 'Frittelle soffici americane, perfette per la colazione.',
    tags: ['colazione', 'americano'],
    ingredients: [
      { id: 'i1', name: 'Farina', quantity: 200, unit: 'g' },
      { id: 'i2', name: 'Latte', quantity: 200, unit: 'g' },
      { id: 'i3', name: 'Uova', quantity: 2, unit: 'uova' },
      { id: 'i4', name: 'Zucchero', quantity: 30, unit: 'g' },
      { id: 'i5', name: 'Lievito per dolci', quantity: 0.5, unit: 'bustina', scalable: false },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire tutti gli ingredienti nel boccale e frullare fino a pastella liscia.', bimby: { timeSeconds: 30, speed: '5' } },
      { id: 's2', order: 2, text: 'Cuocere piccole frittelle in padella antiaderente, un minuto per lato.' },
    ],
  },
  {
    id: 'crostata-ricotta',
    title: 'Crostata di Ricotta',
    course: 'Dolce', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 60,
    description: 'Crostata con ripieno cremoso di ricotta.',
    tags: ['ricotta', 'crostata'],
    ingredients: [
      { id: 'i1', name: 'Farina', quantity: 300, unit: 'g' },
      { id: 'i2', name: 'Burro freddo', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Zucchero', quantity: 150, unit: 'g' },
      { id: 'i4', name: 'Uova', quantity: 3, unit: 'uova' },
      { id: 'i5', name: 'Ricotta', quantity: 400, unit: 'g' },
      { id: 'i6', name: 'Scorza di limone', quantity: null },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Preparare la frolla con farina, burro, metà zucchero e un uovo.', bimby: { timeSeconds: 30, speed: '5' } },
      { id: 's2', order: 2, text: 'Mescolare ricotta, zucchero rimasto, uova e scorza per il ripieno.', bimby: { timeSeconds: 20, speed: '4' } },
      { id: 's3', order: 3, text: 'Foderare la teglia con la frolla, versare il ripieno e cuocere in forno a 180°C per 40 minuti.' },
    ],
  },
];
