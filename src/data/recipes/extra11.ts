import { Recipe } from '@/types/recipe';

/**
 * Ricette aggiuntive — ondata 11 (altre torte salate classiche).
 * Piatti popolari riscritti con parole proprie nel formato dell'app.
 */

const sale = { id: 'sale', name: 'Sale', quantity: null };

export const EXTRA_11: Recipe[] = [
  {
    id: 'torta-pasqualina', title: 'Torta Pasqualina', course: 'Antipasto', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 70,
    description: 'Classica torta salata ligure con bietole, ricotta e uova intere nel ripieno.',
    tags: ['torta salata', 'bietole', 'ricotta', 'ligure', 'forno', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Pasta sfoglia', quantity: 2, unit: 'pz' },
      { id: 'i2', name: 'Bietole (o spinaci)', quantity: 500, unit: 'g' },
      { id: 'i3', name: 'Ricotta', quantity: 250, unit: 'g' },
      { id: 'i4', name: 'Uova', quantity: 6, unit: 'uova' },
      { id: 'i5', name: 'Parmigiano grattugiato', quantity: 50, unit: 'g' },
      { id: 'i6', name: 'Noce moscata', quantity: null },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Cuocere le bietole nel boccale e strizzarle bene.', bimby: { timeSeconds: 360, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Aggiungere ricotta, 2 uova, parmigiano, noce moscata e sale e amalgamare.', bimby: { timeSeconds: 20, speed: '4' } },
      { id: 's3', order: 3, text: 'Foderare la teglia con una sfoglia, versare il ripieno, creare 4 incavi e rompervi un uovo intero ciascuno.' },
      { id: 's4', order: 4, text: 'Coprire con la seconda sfoglia, sigillare e cuocere in forno a 180°C per 45 minuti.' },
    ],
  },
  {
    id: 'quiche-lorraine', title: 'Quiche Lorraine', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 50,
    description: 'La classica quiche francese con pancetta, uova e panna.',
    tags: ['quiche', 'pancetta', 'forno', 'francese'],
    ingredients: [
      { id: 'i1', name: 'Pasta brisée', quantity: 1, unit: 'pz' },
      { id: 'i2', name: 'Pancetta', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Uova', quantity: 3, unit: 'uova' },
      { id: 'i4', name: 'Panna', quantity: 200, unit: 'g' },
      { id: 'i5', name: 'Formaggio grattugiato', quantity: 50, unit: 'g' },
      { id: 'i6', name: 'Noce moscata', quantity: null },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Rosolare la pancetta a dadini in padella.' },
      { id: 's2', order: 2, text: 'Nel boccale sbattere uova, panna, formaggio, noce moscata e sale.', bimby: { timeSeconds: 15, speed: '4' } },
      { id: 's3', order: 3, text: 'Foderare la teglia con la brisée, distribuire la pancetta e versare il composto.' },
      { id: 's4', order: 4, text: 'Cuocere in forno a 190°C per 30 minuti, finché la superficie è dorata.' },
    ],
  },
  {
    id: 'torta-salata-radicchio-gorgonzola', title: 'Torta Salata Radicchio e Gorgonzola', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 45,
    description: 'Sfoglia farcita con radicchio stufato e gorgonzola cremoso.',
    tags: ['torta salata', 'radicchio', 'gorgonzola', 'forno', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Pasta sfoglia', quantity: 1, unit: 'pz' },
      { id: 'i2', name: 'Radicchio', quantity: 300, unit: 'g' },
      { id: 'i3', name: 'Gorgonzola', quantity: 150, unit: 'g' },
      { id: 'i4', name: 'Uova', quantity: 2, unit: 'uova' },
      { id: 'i5', name: 'Panna', quantity: 100, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Stufare il radicchio a listarelle nel boccale.', bimby: { timeSeconds: 480, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's2', order: 2, text: 'Aggiungere gorgonzola, uova, panna e sale e amalgamare.', bimby: { timeSeconds: 15, speed: '4' } },
      { id: 's3', order: 3, text: 'Versare sulla sfoglia e cuocere in forno a 190°C per 30 minuti.' },
    ],
  },
  {
    id: 'torta-salata-funghi', title: 'Torta Salata ai Funghi', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 45,
    description: 'Quiche rustica con funghi trifolati, uova e parmigiano.',
    tags: ['torta salata', 'funghi', 'forno', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Pasta brisée', quantity: 1, unit: 'pz' },
      { id: 'i2', name: 'Funghi', quantity: 400, unit: 'g' },
      { id: 'i3', name: 'Uova', quantity: 3, unit: 'uova' },
      { id: 'i4', name: 'Panna', quantity: 150, unit: 'g' },
      { id: 'i5', name: 'Parmigiano grattugiato', quantity: 40, unit: 'g' },
      { id: 'i6', name: 'Prezzemolo', quantity: null },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Stufare i funghi a fette nel boccale e profumare con prezzemolo.', bimby: { timeSeconds: 480, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's2', order: 2, text: 'Sbattere a parte uova, panna, parmigiano e sale.' },
      { id: 's3', order: 3, text: 'Foderare la teglia con la brisée, distribuire i funghi, versare il composto e cuocere in forno a 190°C per 30 minuti.' },
    ],
  },
  {
    id: 'torta-salata-zucca-scamorza', title: 'Torta Salata Zucca e Scamorza', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 50,
    description: 'Torta salata autunnale con crema di zucca e scamorza filante.',
    tags: ['torta salata', 'zucca', 'scamorza', 'forno', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Pasta sfoglia', quantity: 1, unit: 'pz' },
      { id: 'i2', name: 'Zucca pulita', quantity: 400, unit: 'g' },
      { id: 'i3', name: 'Scamorza', quantity: 150, unit: 'g' },
      { id: 'i4', name: 'Uova', quantity: 2, unit: 'uova' },
      { id: 'i5', name: 'Parmigiano grattugiato', quantity: 40, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Cuocere la zucca a pezzi nel boccale e schiacciarla a crema.', bimby: { timeSeconds: 900, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Aggiungere uova, parmigiano e sale e amalgamare.', bimby: { timeSeconds: 15, speed: '4' } },
      { id: 's3', order: 3, text: 'Versare sulla sfoglia, distribuire la scamorza a dadini e cuocere in forno a 190°C per 30 minuti.' },
    ],
  },
];
