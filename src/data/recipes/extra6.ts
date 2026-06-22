import { Recipe } from '@/types/recipe';

/**
 * Ricette aggiuntive — ondata 6. Ispirate a piatti popolari (antipasti, primi,
 * secondi, burger e cotolette) e riscritte con parole proprie nel formato dell'app.
 */

const sale = { id: 'sale', name: 'Sale', quantity: null };
const olio = (g = 20) => ({ id: 'olio', name: 'Olio extravergine di oliva', quantity: g, unit: 'g' });

export const EXTRA_6: Recipe[] = [
  // ---- Burger e cotolette ----
  {
    id: 'cordon-bleu', title: 'Cordon Bleu di Pollo', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 30,
    description: 'Fettine di pollo impanate con cuore di prosciutto e formaggio filante.',
    tags: ['pollo', 'impanato', 'forno'],
    ingredients: [
      { id: 'i1', name: 'Fettine di pollo', quantity: 4, unit: 'pz' },
      { id: 'i2', name: 'Prosciutto cotto', quantity: 80, unit: 'g' },
      { id: 'i3', name: 'Formaggio a fette', quantity: 80, unit: 'g' },
      { id: 'i4', name: 'Uova', quantity: 2, unit: 'uova' },
      { id: 'i5', name: 'Pangrattato', quantity: 120, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Farcire ogni fettina con prosciutto e formaggio e chiuderla a libro.' },
      { id: 's2', order: 2, text: 'Passare nell’uovo sbattuto e nel pangrattato.' },
      { id: 's3', order: 3, text: 'Cuocere in forno a 200°C per 18 minuti (o dorare in padella).' },
    ],
  },
  {
    id: 'nuggets-pollo', title: 'Nuggets di Pollo', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 30,
    description: 'Bocconcini di pollo impanati e cotti al forno, croccanti fuori e morbidi dentro.',
    tags: ['pollo', 'impanato', 'forno', 'bambini'],
    ingredients: [
      { id: 'i1', name: 'Petto di pollo', quantity: 500, unit: 'g' },
      { id: 'i2', name: 'Pangrattato', quantity: 120, unit: 'g' },
      { id: 'i3', name: 'Uovo', quantity: 1, unit: 'uovo' },
      { id: 'i4', name: 'Parmigiano grattugiato', quantity: 30, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire il pollo a pezzi nel boccale e tritare.', bimby: { timeSeconds: 10, speed: '6' } },
      { id: 's2', order: 2, text: 'Formare dei bocconcini, passarli nell’uovo e nel pangrattato con il parmigiano.' },
      { id: 's3', order: 3, text: 'Cuocere in forno a 200°C per 18 minuti, girando a metà.' },
    ],
  },
  {
    id: 'spinacine', title: 'Spinacine di Pollo', course: 'Secondo', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 35,
    description: 'Medaglioni impanati di pollo e spinaci, gustosi e leggeri.',
    tags: ['pollo', 'spinaci', 'impanato'],
    ingredients: [
      { id: 'i1', name: 'Petto di pollo', quantity: 400, unit: 'g' },
      { id: 'i2', name: 'Spinaci', quantity: 200, unit: 'g' },
      { id: 'i3', name: 'Parmigiano grattugiato', quantity: 40, unit: 'g' },
      { id: 'i4', name: 'Uovo', quantity: 1, unit: 'uovo' },
      { id: 'i5', name: 'Pangrattato', quantity: 100, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Cuocere gli spinaci nel boccale e strizzarli.', bimby: { timeSeconds: 300, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Aggiungere il pollo a pezzi, il parmigiano e il sale e tritare.', bimby: { timeSeconds: 15, speed: '6' } },
      { id: 's3', order: 3, text: 'Formare dei medaglioni, passarli nell’uovo e nel pangrattato e cuocere in forno a 200°C per 18 minuti.' },
    ],
  },
  {
    id: 'burger-patate', title: 'Burger di Patate', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 35,
    description: 'Hamburger vegetariani di patate e parmigiano, dorati in padella.',
    tags: ['patate', 'vegetariano', 'burger'],
    ingredients: [
      { id: 'i1', name: 'Patate', quantity: 600, unit: 'g' },
      { id: 'i2', name: 'Parmigiano grattugiato', quantity: 50, unit: 'g' },
      { id: 'i3', name: 'Uovo', quantity: 1, unit: 'uovo' },
      { id: 'i4', name: 'Pangrattato', quantity: 60, unit: 'g' },
      { id: 'i5', name: 'Prezzemolo', quantity: null },
      { id: 'i6', name: 'Acqua', quantity: 600, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Cuocere le patate a pezzi nel Varoma con l’acqua nel boccale.', bimby: { timeSeconds: 1200, speed: '1', temperature: 'Varoma' } },
      { id: 's2', order: 2, text: 'Schiacciare le patate e impastarle con parmigiano, uovo, pangrattato, prezzemolo e sale.' },
      { id: 's3', order: 3, text: 'Formare i burger e dorarli in padella su entrambi i lati.' },
    ],
  },
  {
    id: 'burger-fagioli-peperoni', title: 'Burger di Fagioli e Peperoni', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 25,
    description: 'Hamburger vegetali di fagioli e peperoni, ricchi di proteine.',
    tags: ['fagioli', 'peperoni', 'vegano', 'burger'],
    ingredients: [
      { id: 'i1', name: 'Fagioli lessati', quantity: 300, unit: 'g' },
      { id: 'i2', name: 'Peperoni arrostiti', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Pangrattato', quantity: 80, unit: 'g' },
      { id: 'i4', name: 'Paprika', quantity: null },
      olio(15),
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire fagioli, peperoni, paprika e sale nel boccale e frullare grossolanamente.', bimby: { timeSeconds: 15, speed: '5' } },
      { id: 's2', order: 2, text: 'Unire il pangrattato fino a un impasto modellabile, formare i burger e dorarli in padella con un filo d’olio.' },
    ],
  },

  // ---- Antipasti ----
  {
    id: 'involtini-verza', title: 'Involtini di Verza e Carne', course: 'Secondo', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 60,
    description: 'Foglie di verza ripiene di carne e riso, cotte nel sugo di pomodoro.',
    tags: ['verza', 'carne', 'involtini'],
    ingredients: [
      { id: 'i1', name: 'Foglie di verza', quantity: 8, unit: 'pz' },
      { id: 'i2', name: 'Carne macinata mista', quantity: 400, unit: 'g' },
      { id: 'i3', name: 'Riso', quantity: 80, unit: 'g' },
      { id: 'i4', name: 'Parmigiano grattugiato', quantity: 40, unit: 'g' },
      { id: 'i5', name: 'Passata di pomodoro', quantity: 400, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Sbollentare le foglie di verza per ammorbidirle.' },
      { id: 's2', order: 2, text: 'Impastare carne, riso, parmigiano e sale; farcire le foglie e arrotolarle.' },
      { id: 's3', order: 3, text: 'Disporre gli involtini nel boccale con la passata e cuocere in antiorario.', bimby: { timeSeconds: 1800, speed: 'Soft', temperature: 100, direction: 'Antiorario' } },
    ],
  },
  {
    id: 'ravioli-vapore-carne', title: 'Ravioli di Carne al Vapore', course: 'Antipasto', baseServings: 4, difficulty: 'Difficile', totalTimeMinutes: 60,
    description: 'Fagottini di pasta ripieni di carne, cotti al vapore in stile orientale.',
    tags: ['ravioli', 'vapore', 'orientale'],
    ingredients: [
      { id: 'i1', name: 'Farina', quantity: 200, unit: 'g' },
      { id: 'i2', name: 'Acqua', quantity: 100, unit: 'g' },
      { id: 'i3', name: 'Carne macinata di maiale', quantity: 200, unit: 'g' },
      { id: 'i4', name: 'Salsa di soia', quantity: 15, unit: 'g' },
      { id: 'i5', name: 'Zenzero', quantity: null },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire farina e acqua nel boccale e impastare; far riposare l’impasto.', bimby: { timeSeconds: 120, speed: 'Spiga' } },
      { id: 's2', order: 2, text: 'Mescolare carne, salsa di soia, zenzero e sale per il ripieno.' },
      { id: 's3', order: 3, text: 'Stendere la pasta, ritagliare dei dischi, farcirli e chiuderli a fagottino.' },
      { id: 's4', order: 4, text: 'Cuocere i ravioli nel Varoma con acqua nel boccale.', bimby: { timeSeconds: 900, speed: '1', temperature: 'Varoma' } },
    ],
  },
  {
    id: 'fiori-zucca-ripieni', title: 'Fiori di Zucca Ripieni', course: 'Antipasto', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 30,
    description: 'Fiori di zucca farciti di ricotta e parmigiano, gratinati al forno.',
    tags: ['fiori di zucca', 'ricotta', 'forno', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Fiori di zucca', quantity: 12, unit: 'pz' },
      { id: 'i2', name: 'Ricotta', quantity: 200, unit: 'g' },
      { id: 'i3', name: 'Parmigiano grattugiato', quantity: 40, unit: 'g' },
      { id: 'i4', name: 'Uovo', quantity: 1, unit: 'uovo' },
      { id: 'i5', name: 'Pangrattato', quantity: 30, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Amalgamare ricotta, parmigiano, uovo e sale nel boccale.', bimby: { timeSeconds: 15, speed: '4' } },
      { id: 's2', order: 2, text: 'Farcire i fiori di zucca con la crema, spolverarli di pangrattato e cuocere in forno a 190°C per 15 minuti.' },
    ],
  },
  {
    id: 'mousse-prosciutto', title: 'Mousse di Prosciutto', course: 'Antipasto', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 8,
    description: 'Spuma morbida di prosciutto cotto, da spalmare su crostini e tartine.',
    tags: ['prosciutto', 'mousse', 'crostini'],
    ingredients: [
      { id: 'i1', name: 'Prosciutto cotto', quantity: 150, unit: 'g' },
      { id: 'i2', name: 'Formaggio spalmabile', quantity: 100, unit: 'g' },
      { id: 'i3', name: 'Burro morbido', quantity: 30, unit: 'g' },
      { id: 'i4', name: 'Panna', quantity: 20, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire tutti gli ingredienti nel boccale.' },
      { id: 's2', order: 2, text: 'Frullare fino a ottenere una spuma liscia.', bimby: { timeSeconds: 40, speed: '6' } },
    ],
  },

  // ---- Primi ----
  {
    id: 'spatzle-spinaci', title: 'Spätzle agli Spinaci', course: 'Primo', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 30,
    description: 'Gnocchetti verdi di pasta agli spinaci, conditi con burro e parmigiano.',
    tags: ['spatzle', 'spinaci', 'vegetariano', 'altoatesino'],
    ingredients: [
      { id: 'i1', name: 'Farina', quantity: 200, unit: 'g' },
      { id: 'i2', name: 'Spinaci', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Uova', quantity: 2, unit: 'uova' },
      { id: 'i4', name: 'Latte', quantity: 80, unit: 'g' },
      { id: 'i5', name: 'Burro', quantity: 40, unit: 'g' },
      { id: 'i6', name: 'Parmigiano grattugiato', quantity: 40, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Frullare nel boccale spinaci, uova, latte, farina e sale fino a una pastella densa.', bimby: { timeSeconds: 30, speed: '6' } },
      { id: 's2', order: 2, text: 'Far cadere la pastella a gocce nell’acqua bollente con l’apposito attrezzo; gli spätzle sono pronti quando salgono a galla.' },
      { id: 's3', order: 3, text: 'Scolare e condire con burro fuso e parmigiano.' },
    ],
  },
  {
    id: 'pasta-ricotta-zafferano-pancetta', title: 'Pasta Ricotta, Zafferano e Pancetta', course: 'Primo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 25,
    description: 'Pasta cremosa con ricotta, zafferano e pancetta croccante, cotta nel boccale.',
    tags: ['pasta', 'ricotta', 'zafferano', 'pancetta'],
    ingredients: [
      { id: 'i1', name: 'Pasta', quantity: 320, unit: 'g' },
      { id: 'i2', name: 'Pancetta', quantity: 100, unit: 'g' },
      { id: 'i3', name: 'Ricotta', quantity: 150, unit: 'g' },
      { id: 'i4', name: 'Zafferano', quantity: 1, unit: 'bustina', scalable: false },
      { id: 'i5', name: 'Parmigiano grattugiato', quantity: 40, unit: 'g' },
      { id: 'i6', name: 'Acqua', quantity: 700, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Nel boccale rosolare la pancetta a dadini.', bimby: { timeSeconds: 240, speed: '1', temperature: 120, direction: 'Antiorario' } },
      { id: 's2', order: 2, text: 'Aggiungere la pasta, l’acqua, lo zafferano e il sale: cuoce nel boccale. Cuocere in antiorario, velocità soft, per il tempo della pasta (circa 11 minuti).', bimby: { timeSeconds: 660, speed: 'Soft', temperature: 100, direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Mantecare con ricotta e parmigiano.' },
    ],
  },
  {
    id: 'pennette-panna-prosciutto', title: 'Pennette Panna e Prosciutto', course: 'Primo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 20,
    description: 'Un classico veloce e cremoso, con la pasta cotta direttamente nel boccale.',
    tags: ['pasta', 'panna', 'prosciutto', 'veloce'],
    ingredients: [
      { id: 'i1', name: 'Pennette', quantity: 320, unit: 'g' },
      { id: 'i2', name: 'Panna', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Prosciutto cotto', quantity: 100, unit: 'g' },
      { id: 'i4', name: 'Parmigiano grattugiato', quantity: 40, unit: 'g' },
      { id: 'i5', name: 'Acqua', quantity: 700, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Nel boccale scaldare la panna con il prosciutto a dadini.', bimby: { timeSeconds: 180, speed: '1', temperature: 90, direction: 'Antiorario' } },
      { id: 's2', order: 2, text: 'Aggiungere le pennette, l’acqua e il sale: cuociono nel boccale. Cuocere in antiorario, velocità soft, per il tempo della pasta (circa 11 minuti).', bimby: { timeSeconds: 660, speed: 'Soft', temperature: 100, direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Mantecare con il parmigiano.' },
    ],
  },

  // ---- Secondi ----
  {
    id: 'lonza-crema-zucchine', title: 'Fettine di Lonza con Crema di Zucchine', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 30,
    description: 'Fettine di lonza di maiale servite con una vellutata crema di zucchine.',
    tags: ['maiale', 'zucchine', 'leggero'],
    ingredients: [
      { id: 'i1', name: 'Fettine di lonza di maiale', quantity: 500, unit: 'g' },
      { id: 'i2', name: 'Zucchine', quantity: 300, unit: 'g' },
      { id: 'i3', name: 'Panna', quantity: 100, unit: 'g' },
      olio(20),
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Stufare le zucchine a rondelle nel boccale con l’olio, poi frullarle con la panna fino a crema.', bimby: { timeSeconds: 600, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's2', order: 2, text: 'Rosolare le fettine di lonza in padella e salarle.' },
      { id: 's3', order: 3, text: 'Servire le fettine nappate con la crema di zucchine.' },
    ],
  },
  {
    id: 'costine-maiale-vino', title: 'Costine di Maiale al Vino Bianco', course: 'Secondo', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 80,
    description: 'Costine tenere brasate nel vino bianco e rosmarino.',
    tags: ['maiale', 'costine', 'brasato'],
    ingredients: [
      { id: 'i1', name: 'Costine di maiale', quantity: 800, unit: 'g' },
      { id: 'i2', name: 'Vino bianco', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Acqua', quantity: 150, unit: 'g' },
      { id: 'i4', name: 'Rosmarino', quantity: null },
      olio(20),
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Rosolare le costine in padella su tutti i lati.' },
      { id: 's2', order: 2, text: 'Trasferire nel boccale con olio, vino, acqua, rosmarino e sale e cuocere a lungo in antiorario.', bimby: { timeSeconds: 3000, speed: 'Soft', temperature: 100, direction: 'Antiorario' } },
    ],
  },
];
