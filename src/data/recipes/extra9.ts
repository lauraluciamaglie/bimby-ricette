import { Recipe } from '@/types/recipe';

/**
 * Ricette aggiuntive — ondata 9 (torte salate).
 * Ispirate a piatti popolari e riscritte con parole proprie nel formato dell'app.
 */

const sale = { id: 'sale', name: 'Sale', quantity: null };

export const EXTRA_9: Recipe[] = [
  {
    id: 'torta-salata-ricotta-spinaci', title: 'Torta Salata Ricotta e Spinaci', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 50,
    description: 'Classica torta salata con ripieno cremoso di ricotta e spinaci su pasta sfoglia.',
    tags: ['torta salata', 'ricotta', 'spinaci', 'forno', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Pasta sfoglia', quantity: 1, unit: 'pz' },
      { id: 'i2', name: 'Ricotta', quantity: 250, unit: 'g' },
      { id: 'i3', name: 'Spinaci', quantity: 300, unit: 'g' },
      { id: 'i4', name: 'Uova', quantity: 2, unit: 'uova' },
      { id: 'i5', name: 'Parmigiano grattugiato', quantity: 50, unit: 'g' },
      { id: 'i6', name: 'Noce moscata', quantity: null },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Cuocere gli spinaci nel boccale e strizzarli bene.', bimby: { timeSeconds: 360, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Aggiungere ricotta, uova, parmigiano, noce moscata e sale e amalgamare.', bimby: { timeSeconds: 20, speed: '4' } },
      { id: 's3', order: 3, text: 'Foderare una teglia con la pasta sfoglia, versare il ripieno e cuocere in forno a 190°C per 30 minuti.' },
    ],
  },
  {
    id: 'tortano', title: 'Tortano Napoletano', course: 'Antipasto', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 120,
    description: 'Ciambella di pane salato ripiena di salumi, formaggi e uova, tipica pasquale.',
    tags: ['torta salata', 'lievitato', 'salumi', 'napoletano'],
    ingredients: [
      { id: 'i1', name: 'Farina', quantity: 400, unit: 'g' },
      { id: 'i2', name: 'Acqua', quantity: 200, unit: 'g' },
      { id: 'i3', name: 'Lievito di birra', quantity: 10, unit: 'g' },
      { id: 'i4', name: 'Strutto (o olio)', quantity: 50, unit: 'g' },
      { id: 'i5', name: 'Salame', quantity: 100, unit: 'g' },
      { id: 'i6', name: 'Provolone', quantity: 100, unit: 'g' },
      { id: 'i7', name: 'Uova sode', quantity: 2, unit: 'pz' },
      { id: 'i8', name: 'Pepe', quantity: null },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire nel boccale farina, acqua, strutto, lievito e sale e impastare.', bimby: { timeSeconds: 180, speed: 'Spiga' } },
      { id: 's2', order: 2, text: 'Far lievitare l’impasto coperto per circa 1 ora.' },
      { id: 's3', order: 3, text: 'Stendere l’impasto, farcire con salame, provolone e uova sode a pezzi e abbondante pepe; arrotolare e chiudere a ciambella.' },
      { id: 's4', order: 4, text: 'Far lievitare ancora 30 minuti e cuocere in forno a 180°C per circa 45 minuti.' },
    ],
  },
  {
    id: 'torta-salata-stracchino-patate', title: 'Torta Salata Stracchino, Prosciutto e Patate', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 45,
    description: 'Sfoglia farcita con patate sottili, stracchino cremoso e prosciutto cotto.',
    tags: ['torta salata', 'patate', 'stracchino', 'prosciutto', 'forno'],
    ingredients: [
      { id: 'i1', name: 'Pasta sfoglia', quantity: 1, unit: 'pz' },
      { id: 'i2', name: 'Patate', quantity: 300, unit: 'g' },
      { id: 'i3', name: 'Stracchino', quantity: 200, unit: 'g' },
      { id: 'i4', name: 'Prosciutto cotto', quantity: 100, unit: 'g' },
      { id: 'i5', name: 'Rosmarino', quantity: null },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Affettare le patate molto sottili nel boccale.', bimby: { timeSeconds: 8, speed: '4' } },
      { id: 's2', order: 2, text: 'Foderare una teglia con la sfoglia e distribuire patate, stracchino a fiocchetti e prosciutto; salare e profumare con rosmarino.' },
      { id: 's3', order: 3, text: 'Cuocere in forno a 200°C per 30 minuti, finché le patate sono morbide e la superficie dorata.' },
    ],
  },
  {
    id: 'crostata-patate-salata', title: 'Crostata Salata di Patate', course: 'Contorno', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 60,
    description: 'Sformato di patate dal cuore filante di mozzarella e prosciutto, gratinato al forno.',
    tags: ['patate', 'forno', 'gratinato'],
    ingredients: [
      { id: 'i1', name: 'Patate', quantity: 700, unit: 'g' },
      { id: 'i2', name: 'Uova', quantity: 2, unit: 'uova' },
      { id: 'i3', name: 'Parmigiano grattugiato', quantity: 50, unit: 'g' },
      { id: 'i4', name: 'Mozzarella', quantity: 100, unit: 'g' },
      { id: 'i5', name: 'Prosciutto cotto', quantity: 80, unit: 'g' },
      { id: 'i6', name: 'Pangrattato', quantity: 40, unit: 'g' },
      { id: 'i7', name: 'Acqua', quantity: 600, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Cuocere le patate a pezzi nel Varoma con l’acqua nel boccale.', bimby: { timeSeconds: 1200, speed: '1', temperature: 'Varoma' } },
      { id: 's2', order: 2, text: 'Schiacciare le patate e impastarle con uova, parmigiano e sale.' },
      { id: 's3', order: 3, text: 'Stendere metà del composto in una teglia con pangrattato, farcire con prosciutto e mozzarella, coprire con il resto e spolverare di pangrattato.' },
      { id: 's4', order: 4, text: 'Cuocere in forno a 200°C per 25 minuti, finché dorata.' },
    ],
  },
  {
    id: 'quiche-prosciutto-scamorza', title: 'Quiche Prosciutto e Scamorza', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 50,
    description: 'Torta salata cremosa in stile francese, con prosciutto e scamorza.',
    tags: ['quiche', 'prosciutto', 'scamorza', 'forno', 'francese'],
    ingredients: [
      { id: 'i1', name: 'Pasta brisée', quantity: 1, unit: 'pz' },
      { id: 'i2', name: 'Uova', quantity: 3, unit: 'uova' },
      { id: 'i3', name: 'Panna', quantity: 150, unit: 'g' },
      { id: 'i4', name: 'Prosciutto cotto', quantity: 100, unit: 'g' },
      { id: 'i5', name: 'Scamorza', quantity: 100, unit: 'g' },
      { id: 'i6', name: 'Parmigiano grattugiato', quantity: 30, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Nel boccale sbattere uova, panna, parmigiano e sale.', bimby: { timeSeconds: 15, speed: '4' } },
      { id: 's2', order: 2, text: 'Foderare una teglia con la pasta brisée, distribuire prosciutto e scamorza a dadini e versare il composto di uova.' },
      { id: 's3', order: 3, text: 'Cuocere in forno a 190°C per 30 minuti, finché la superficie è dorata.' },
    ],
  },
];
