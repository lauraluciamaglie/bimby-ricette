import { Recipe } from '@/types/recipe';

/**
 * Ricette aggiuntive — ondata 8 (dolci al cucchiaio, creme, gelati).
 * Ispirate a piatti popolari e riscritte con parole proprie nel formato dell'app.
 */

export const EXTRA_8: Recipe[] = [
  // ---- Dolci al cucchiaio ----
  {
    id: 'coppa-malu', title: 'Coppa Caffè e Cioccolato', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 20,
    description: 'Coppa fredda a strati di panna al caffè, biscotti e cioccolato.',
    tags: ['caffè', 'cioccolato', 'dolce al cucchiaio', 'freddo'],
    ingredients: [
      { id: 'i1', name: 'Panna fresca', quantity: 250, unit: 'g' },
      { id: 'i2', name: 'Zucchero a velo', quantity: 60, unit: 'g' },
      { id: 'i3', name: 'Caffè', quantity: 50, unit: 'g' },
      { id: 'i4', name: 'Cioccolato fondente', quantity: 100, unit: 'g' },
      { id: 'i5', name: 'Biscotti secchi', quantity: 50, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Posizionare la farfalla e montare la panna con lo zucchero a velo.', bimby: { timeSeconds: 60, speed: '3' } },
      { id: 's2', order: 2, text: 'Dividere la panna in due: a una parte unire il caffè freddo.' },
      { id: 's3', order: 3, text: 'Comporre nelle coppe alternando panna, panna al caffè e biscotti sbriciolati; coprire con cioccolato fuso e mettere in freezer 1 ora.' },
    ],
  },
  {
    id: 'crema-pandoro', title: 'Crema di Pandoro', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 20,
    description: 'Dolce al cucchiaio con crema al mascarpone e pezzi di pandoro, perfetto per le feste.',
    tags: ['pandoro', 'mascarpone', 'dolce al cucchiaio', 'natale'],
    ingredients: [
      { id: 'i1', name: 'Mascarpone', quantity: 250, unit: 'g' },
      { id: 'i2', name: 'Panna fresca', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Zucchero a velo', quantity: 70, unit: 'g' },
      { id: 'i4', name: 'Pandoro', quantity: 200, unit: 'g' },
      { id: 'i5', name: 'Gocce di cioccolato', quantity: 50, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Montare la panna con lo zucchero a velo.', bimby: { timeSeconds: 60, speed: '3' } },
      { id: 's2', order: 2, text: 'Amalgamare il mascarpone e incorporare delicatamente la panna montata.' },
      { id: 's3', order: 3, text: 'Comporre nelle coppe alternando pezzi di pandoro e crema; completare con gocce di cioccolato e tenere in frigo.' },
    ],
  },

  // ---- Creme ----
  {
    id: 'crema-chantilly', title: 'Crema Chantilly', course: 'Dolce', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 25,
    description: 'Crema pasticcera alleggerita con panna montata, per farcire torte e bignè.',
    tags: ['crema', 'base', 'panna'],
    ingredients: [
      { id: 'i1', name: 'Latte', quantity: 250, unit: 'g' },
      { id: 'i2', name: 'Tuorli', quantity: 2, unit: 'pz' },
      { id: 'i3', name: 'Zucchero', quantity: 80, unit: 'g' },
      { id: 'i4', name: 'Amido di mais', quantity: 25, unit: 'g' },
      { id: 'i5', name: 'Panna fresca', quantity: 200, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire latte, tuorli, zucchero e amido nel boccale e cuocere fino a crema pasticcera.', bimby: { timeSeconds: 360, speed: '4', temperature: 90 } },
      { id: 's2', order: 2, text: 'Far raffreddare bene la crema.' },
      { id: 's3', order: 3, text: 'Montare a parte la panna e incorporarla delicatamente alla crema fredda.' },
    ],
  },
  {
    id: 'dulce-de-leche', title: 'Dulce de Leche', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 60,
    description: 'Crema caramellata di latte e zucchero, densa e spalmabile, in stile sudamericano.',
    tags: ['latte', 'caramello', 'crema', 'spalmabile'],
    ingredients: [
      { id: 'i1', name: 'Latte', quantity: 500, unit: 'g' },
      { id: 'i2', name: 'Zucchero', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Bicarbonato', quantity: null },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire latte, zucchero e un pizzico di bicarbonato nel boccale.' },
      { id: 's2', order: 2, text: 'Cuocere a lungo mescolando, finché diventa una crema densa color caramello.', bimby: { timeSeconds: 2400, speed: '2', temperature: 100 } },
    ],
  },
  {
    id: 'crema-torrone', title: 'Crema al Torrone', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 10,
    description: 'Crema golosa al torrone, ottima da spalmare o per farcire.',
    tags: ['torrone', 'crema', 'natale'],
    ingredients: [
      { id: 'i1', name: 'Torrone', quantity: 150, unit: 'g' },
      { id: 'i2', name: 'Mascarpone', quantity: 200, unit: 'g' },
      { id: 'i3', name: 'Panna fresca', quantity: 100, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tritare il torrone nel boccale.', bimby: { timeSeconds: 10, speed: '7' } },
      { id: 's2', order: 2, text: 'Aggiungere mascarpone e panna e amalgamare fino a crema liscia.', bimby: { timeSeconds: 30, speed: '4' } },
    ],
  },

  // ---- Gelati ----
  {
    id: 'gelato-cioccolato', title: 'Gelato al Cioccolato', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 10,
    description: 'Gelato cremoso al cioccolato, pronto al momento con ingredienti congelati.',
    tags: ['gelato', 'cioccolato', 'freddo', 'estate'],
    ingredients: [
      { id: 'i1', name: 'Panna congelata a cubetti', quantity: 250, unit: 'g' },
      { id: 'i2', name: 'Latte congelato a cubetti', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Zucchero a velo', quantity: 100, unit: 'g' },
      { id: 'i4', name: 'Cacao amaro', quantity: 30, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire i cubetti congelati, lo zucchero e il cacao nel boccale e tritare.', bimby: { timeSeconds: 30, speed: '9' } },
      { id: 's2', order: 2, text: 'Frullare fino a gelato cremoso, raccogliendo sui bordi. Servire subito.', bimby: { timeSeconds: 30, speed: '5' } },
    ],
  },
  {
    id: 'gelato-yogurt', title: 'Gelato allo Yogurt e Frutta', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 10,
    description: 'Gelato fresco e leggero allo yogurt con frutta, senza gelatiera.',
    tags: ['gelato', 'yogurt', 'frutta', 'leggero'],
    ingredients: [
      { id: 'i1', name: 'Yogurt congelato a cubetti', quantity: 300, unit: 'g' },
      { id: 'i2', name: 'Frutta congelata', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Zucchero a velo', quantity: 80, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire i cubetti di yogurt, la frutta congelata e lo zucchero nel boccale e tritare.', bimby: { timeSeconds: 30, speed: '9' } },
      { id: 's2', order: 2, text: 'Frullare fino a crema gelata e servire subito.', bimby: { timeSeconds: 30, speed: '5' } },
    ],
  },
  {
    id: 'granita-caffe', title: 'Granita al Caffè', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 8,
    description: 'Granita al caffè dissetante, perfetta d’estate con la panna.',
    tags: ['caffè', 'granita', 'freddo', 'estate'],
    ingredients: [
      { id: 'i1', name: 'Caffè', quantity: 300, unit: 'g' },
      { id: 'i2', name: 'Zucchero', quantity: 60, unit: 'g' },
      { id: 'i3', name: 'Ghiaccio', quantity: 300, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Sciogliere lo zucchero nel caffè caldo e farlo raffreddare.' },
      { id: 's2', order: 2, text: 'Inserire caffè zuccherato e ghiaccio nel boccale e frullare fino a granita.', bimby: { timeSeconds: 40, speed: '8' } },
    ],
  },
];
