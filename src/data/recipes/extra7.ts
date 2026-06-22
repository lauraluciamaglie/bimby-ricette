import { Recipe } from '@/types/recipe';

/**
 * Ricette aggiuntive — ondata 7 (polpette, piatti unici, marmellate).
 * Ispirate a piatti popolari e riscritte con parole proprie nel formato dell'app.
 */

const sale = { id: 'sale', name: 'Sale', quantity: null };
const olio = (g = 20) => ({ id: 'olio', name: 'Olio extravergine di oliva', quantity: g, unit: 'g' });

export const EXTRA_7: Recipe[] = [
  // ---- Polpette ----
  {
    id: 'polpette-zucchine-merluzzo', title: 'Polpette di Zucchine e Merluzzo', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 35,
    description: 'Polpette leggere di merluzzo e zucchine, cotte al forno.',
    tags: ['pesce', 'merluzzo', 'zucchine', 'polpette'],
    ingredients: [
      { id: 'i1', name: 'Filetti di merluzzo', quantity: 400, unit: 'g' },
      { id: 'i2', name: 'Zucchine', quantity: 200, unit: 'g' },
      { id: 'i3', name: 'Pangrattato', quantity: 80, unit: 'g' },
      { id: 'i4', name: 'Uovo', quantity: 1, unit: 'uovo' },
      { id: 'i5', name: 'Parmigiano grattugiato', quantity: 30, unit: 'g' },
      { id: 'i6', name: 'Prezzemolo', quantity: null },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire zucchine e merluzzo nel boccale e tritare.', bimby: { timeSeconds: 10, speed: '5' } },
      { id: 's2', order: 2, text: 'Aggiungere pangrattato, uovo, parmigiano, prezzemolo e sale e amalgamare in antiorario.', bimby: { timeSeconds: 15, speed: '4', direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Formare le polpette e cuocere in forno a 200°C per 18 minuti.' },
    ],
  },
  {
    id: 'polpette-ceci-zucchine', title: 'Polpette di Ceci e Zucchine', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 30,
    description: 'Polpette vegetali di ceci e zucchine, speziate e croccanti.',
    tags: ['ceci', 'zucchine', 'vegano', 'polpette'],
    ingredients: [
      { id: 'i1', name: 'Ceci lessati', quantity: 300, unit: 'g' },
      { id: 'i2', name: 'Zucchine', quantity: 200, unit: 'g' },
      { id: 'i3', name: 'Pangrattato', quantity: 80, unit: 'g' },
      { id: 'i4', name: 'Cumino in polvere', quantity: null },
      olio(15),
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire ceci, zucchine, cumino e sale nel boccale e frullare grossolanamente.', bimby: { timeSeconds: 15, speed: '5' } },
      { id: 's2', order: 2, text: 'Unire il pangrattato fino a un impasto modellabile, formare le polpette e cuocere in forno a 200°C per 18 minuti.' },
    ],
  },
  {
    id: 'polpette-zucchine-formaggio', title: 'Polpette di Zucchine e Formaggio Filante', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 30,
    description: 'Polpette di zucchine con cuore di formaggio filante, amate dai bambini.',
    tags: ['zucchine', 'formaggio', 'vegetariano', 'polpette'],
    ingredients: [
      { id: 'i1', name: 'Zucchine', quantity: 400, unit: 'g' },
      { id: 'i2', name: 'Pangrattato', quantity: 100, unit: 'g' },
      { id: 'i3', name: 'Uovo', quantity: 1, unit: 'uovo' },
      { id: 'i4', name: 'Parmigiano grattugiato', quantity: 40, unit: 'g' },
      { id: 'i5', name: 'Mozzarella', quantity: 100, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire le zucchine nel boccale e tritare; strizzarle dall’acqua in eccesso.', bimby: { timeSeconds: 8, speed: '5' } },
      { id: 's2', order: 2, text: 'Impastare con pangrattato, uovo, parmigiano e sale.' },
      { id: 's3', order: 3, text: 'Formare le polpette con un cubetto di mozzarella al centro e cuocere in forno a 200°C per 18 minuti.' },
    ],
  },

  // ---- Piatti unici ----
  {
    id: 'poke-bowl', title: 'Poke Bowl al Salmone', course: 'Secondo', baseServings: 2, difficulty: 'Facile', totalTimeMinutes: 30,
    description: 'Ciotola hawaiana con riso, salmone, avocado ed edamame, fresca e completa.',
    tags: ['riso', 'salmone', 'avocado', 'bowl', 'fresco'],
    ingredients: [
      { id: 'i1', name: 'Riso', quantity: 160, unit: 'g' },
      { id: 'i2', name: 'Acqua', quantity: 400, unit: 'g' },
      { id: 'i3', name: 'Salmone fresco', quantity: 200, unit: 'g' },
      { id: 'i4', name: 'Avocado', quantity: 1, unit: 'pz' },
      { id: 'i5', name: 'Edamame', quantity: 100, unit: 'g' },
      { id: 'i6', name: 'Salsa di soia', quantity: 30, unit: 'g' },
      { id: 'i7', name: 'Semi di sesamo', quantity: null },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Cuocere il riso nel boccale con l’acqua e un pizzico di sale.', bimby: { timeSeconds: 900, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's2', order: 2, text: 'Tagliare a cubetti il salmone (molto fresco) e l’avocado; condire il salmone con la salsa di soia.' },
      { id: 's3', order: 3, text: 'Comporre la bowl con riso, salmone, avocado ed edamame; completare con semi di sesamo.' },
    ],
  },
  {
    id: 'bulgur-zucchine-piselli', title: 'Bulgur con Zucchine e Piselli', course: 'Primo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 30,
    description: 'Bulgur saltato con zucchine e piselli, un piatto leggero e nutriente.',
    tags: ['bulgur', 'zucchine', 'piselli', 'vegano'],
    ingredients: [
      { id: 'i1', name: 'Bulgur', quantity: 250, unit: 'g' },
      { id: 'i2', name: 'Zucchine', quantity: 200, unit: 'g' },
      { id: 'i3', name: 'Piselli', quantity: 150, unit: 'g' },
      { id: 'i4', name: 'Acqua', quantity: 500, unit: 'g' },
      olio(20),
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Stufare le zucchine a cubetti e i piselli nel boccale con l’olio.', bimby: { timeSeconds: 600, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's2', order: 2, text: 'Aggiungere il bulgur, l’acqua e il sale e cuocere in antiorario finché il bulgur assorbe il liquido.', bimby: { timeSeconds: 720, speed: '1', temperature: 100, direction: 'Antiorario' } },
    ],
  },
  {
    id: 'funghi-ceci', title: 'Funghi Champignon e Ceci', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 30,
    description: 'Spezzatino vegetale di funghi e ceci in umido di pomodoro.',
    tags: ['funghi', 'ceci', 'vegano', 'umido'],
    ingredients: [
      { id: 'i1', name: 'Funghi champignon', quantity: 400, unit: 'g' },
      { id: 'i2', name: 'Ceci lessati', quantity: 300, unit: 'g' },
      { id: 'i3', name: 'Passata di pomodoro', quantity: 200, unit: 'g' },
      { id: 'i4', name: 'Prezzemolo', quantity: null },
      olio(20),
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Stufare i funghi a fette nel boccale con l’olio.', bimby: { timeSeconds: 480, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's2', order: 2, text: 'Aggiungere ceci, passata e sale e cuocere in antiorario; profumare con prezzemolo.', bimby: { timeSeconds: 720, speed: '1', temperature: 100, direction: 'Antiorario' } },
    ],
  },
  {
    id: 'mafe-vegetariano', title: 'Mafè Vegetariano', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 40,
    description: 'Stufato africano di verdure in cremosa salsa di arachidi.',
    tags: ['verdure', 'arachidi', 'vegano', 'africano'],
    ingredients: [
      { id: 'i1', name: 'Patate dolci', quantity: 300, unit: 'g' },
      { id: 'i2', name: 'Carote', quantity: 2, unit: 'pz' },
      { id: 'i3', name: 'Burro di arachidi', quantity: 80, unit: 'g' },
      { id: 'i4', name: 'Passata di pomodoro', quantity: 200, unit: 'g' },
      { id: 'i5', name: 'Acqua', quantity: 400, unit: 'g' },
      olio(20),
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire nel boccale patate dolci e carote a cubetti, passata, acqua, olio e sale.' },
      { id: 's2', order: 2, text: 'Cuocere in antiorario, poi unire il burro di arachidi e mescolare fino a salsa cremosa.', bimby: { timeSeconds: 1500, speed: '1', temperature: 100, direction: 'Antiorario' } },
    ],
  },

  // ---- Marmellate e creme ----
  {
    id: 'crema-castagne-cioccolato', title: 'Crema di Castagne e Cioccolato', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 30,
    description: 'Crema spalmabile di castagne e cioccolato, vellutata e golosa.',
    tags: ['castagne', 'cioccolato', 'crema', 'spalmabile'],
    ingredients: [
      { id: 'i1', name: 'Castagne lessate', quantity: 400, unit: 'g' },
      { id: 'i2', name: 'Cioccolato fondente', quantity: 100, unit: 'g' },
      { id: 'i3', name: 'Zucchero', quantity: 80, unit: 'g' },
      { id: 'i4', name: 'Latte', quantity: 150, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire tutti gli ingredienti nel boccale e frullare.', bimby: { timeSeconds: 20, speed: '7' } },
      { id: 's2', order: 2, text: 'Cuocere mescolando fino a una crema densa.', bimby: { timeSeconds: 600, speed: '3', temperature: 90 } },
    ],
  },
  {
    id: 'marmellata-mandarini', title: 'Marmellata di Mandarini', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 45,
    description: 'Marmellata profumata di mandarini con un tocco di limone.',
    tags: ['mandarini', 'marmellata', 'conserva'],
    ingredients: [
      { id: 'i1', name: 'Mandarini puliti', quantity: 600, unit: 'g' },
      { id: 'i2', name: 'Zucchero', quantity: 350, unit: 'g' },
      { id: 'i3', name: 'Succo di limone', quantity: 20, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire mandarini, zucchero e succo di limone nel boccale e tritare.', bimby: { timeSeconds: 10, speed: '5' } },
      { id: 's2', order: 2, text: 'Cuocere senza misurino, in antiorario, finché si addensa.', bimby: { timeSeconds: 1800, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Invasare ancora calda in barattoli puliti e capovolgere per il sottovuoto.' },
    ],
  },
  {
    id: 'marmellata-mele-arance', title: 'Marmellata di Mele e Arance senza Zucchero', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 45,
    description: 'Marmellata dolcificata solo dalla frutta, con mele e arance.',
    tags: ['mele', 'arance', 'senza zucchero', 'conserva'],
    ingredients: [
      { id: 'i1', name: 'Mele', quantity: 500, unit: 'g' },
      { id: 'i2', name: 'Arance', quantity: 300, unit: 'g' },
      { id: 'i3', name: 'Succo di limone', quantity: 20, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire mele e arance a pezzi con il succo di limone nel boccale e tritare.', bimby: { timeSeconds: 10, speed: '5' } },
      { id: 's2', order: 2, text: 'Cuocere a lungo, in antiorario, finché si addensa (la dolcezza viene solo dalla frutta).', bimby: { timeSeconds: 2100, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Invasare ancora calda in barattoli puliti.' },
    ],
  },
];
