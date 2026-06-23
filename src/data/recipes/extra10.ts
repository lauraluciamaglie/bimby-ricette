import { Recipe } from '@/types/recipe';

/**
 * Ricette aggiuntive — ondata 10 (basi e preparati).
 * Ispirate a preparati popolari e riscritte con parole proprie nel formato dell'app.
 */

const sale = { id: 'sale', name: 'Sale', quantity: null };
const olio = (g = 20) => ({ id: 'olio', name: 'Olio extravergine di oliva', quantity: g, unit: 'g' });

export const EXTRA_10: Recipe[] = [
  {
    id: 'gnocchi-patate', title: 'Gnocchi di Patate (base)', course: 'Primo', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 50,
    description: 'L’impasto base per gli gnocchi di patate fatti in casa, da condire a piacere.',
    tags: ['gnocchi', 'patate', 'base', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Patate', quantity: 800, unit: 'g' },
      { id: 'i2', name: 'Farina', quantity: 250, unit: 'g' },
      { id: 'i3', name: 'Uovo', quantity: 1, unit: 'uovo' },
      { id: 'i4', name: 'Acqua', quantity: 700, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Cuocere le patate a pezzi nel Varoma con l’acqua nel boccale.', bimby: { timeSeconds: 1200, speed: '1', temperature: 'Varoma' } },
      { id: 's2', order: 2, text: 'Schiacciare le patate ancora calde e impastarle con farina, uovo e sale fino a un impasto liscio.' },
      { id: 's3', order: 3, text: 'Formare dei cordoncini, tagliare gli gnocchi e lessarli in acqua bollente: sono pronti quando salgono a galla.' },
    ],
  },
  {
    id: 'gnocchi-acqua', title: 'Gnocchi all’Acqua (base)', course: 'Primo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 25,
    description: 'Gnocchetti veloci di sola farina e acqua, senza patate né uova.',
    tags: ['gnocchi', 'base', 'veloce', 'vegano'],
    ingredients: [
      { id: 'i1', name: 'Farina', quantity: 300, unit: 'g' },
      { id: 'i2', name: 'Acqua', quantity: 200, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire farina, acqua e sale nel boccale e impastare.', bimby: { timeSeconds: 30, speed: '5' } },
      { id: 's2', order: 2, text: 'Formare dei cordoncini, tagliare gli gnocchetti e lessarli in acqua bollente finché salgono a galla; condire a piacere.' },
    ],
  },
  {
    id: 'impasto-pizza', title: 'Impasto per Pizza (base)', course: 'Primo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 120,
    description: 'Impasto base per pizza, soffice e ben lievitato.',
    tags: ['pizza', 'lievitato', 'base'],
    ingredients: [
      { id: 'i1', name: 'Farina', quantity: 500, unit: 'g' },
      { id: 'i2', name: 'Acqua', quantity: 300, unit: 'g' },
      { id: 'i3', name: 'Lievito di birra', quantity: 5, unit: 'g' },
      olio(20),
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire farina, acqua, lievito, olio e sale nel boccale e impastare.', bimby: { timeSeconds: 180, speed: 'Spiga' } },
      { id: 's2', order: 2, text: 'Far lievitare l’impasto coperto per circa 1 ora e mezza, fino al raddoppio.' },
      { id: 's3', order: 3, text: 'Stendere su teglia, farcire a piacere e cuocere in forno ben caldo a 220°C.' },
    ],
  },
  {
    id: 'pastella-fritti', title: 'Pastella per Fritti senza Uova (base)', course: 'Antipasto', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 10,
    description: 'Pastella leggera e croccante senza uova, per friggere verdure e fiori di zucca.',
    tags: ['pastella', 'fritto', 'base', 'vegano'],
    ingredients: [
      { id: 'i1', name: 'Farina', quantity: 150, unit: 'g' },
      { id: 'i2', name: 'Acqua frizzante fredda', quantity: 250, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire farina, acqua frizzante fredda e sale nel boccale e frullare fino a pastella liscia.', bimby: { timeSeconds: 20, speed: '5' } },
      { id: 's2', order: 2, text: 'Immergere gli alimenti nella pastella e friggerli in olio caldo finché dorati.' },
    ],
  },
  {
    id: 'frolla-montata', title: 'Frolla Montata (base)', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 30,
    description: 'Pasta frolla morbida da sac à poche o sparabiscotti, per biscotti che si sciolgono in bocca.',
    tags: ['frolla', 'biscotti', 'base'],
    ingredients: [
      { id: 'i1', name: 'Burro morbido', quantity: 200, unit: 'g' },
      { id: 'i2', name: 'Zucchero a velo', quantity: 120, unit: 'g' },
      { id: 'i3', name: 'Uovo', quantity: 1, unit: 'uovo' },
      { id: 'i4', name: 'Farina', quantity: 300, unit: 'g' },
      { id: 'i5', name: 'Vanillina', quantity: 1, unit: 'bustina', scalable: false },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Montare nel boccale burro morbido e zucchero a velo.', bimby: { timeSeconds: 60, speed: '4' } },
      { id: 's2', order: 2, text: 'Aggiungere uovo e vanillina, poi la farina, e amalgamare fino a un impasto morbido.', bimby: { timeSeconds: 30, speed: '4' } },
      { id: 's3', order: 3, text: 'Formare i biscotti con sac à poche o sparabiscotti e cuocere in forno a 180°C per circa 12 minuti.' },
    ],
  },
  {
    id: 'preparato-cioccolata-calda', title: 'Preparato per Cioccolata Calda (base)', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 5,
    description: 'Mix in polvere da tenere in barattolo: pronto per una cioccolata calda densa in un minuto.',
    tags: ['cioccolato', 'preparato', 'base', 'bevanda'],
    ingredients: [
      { id: 'i1', name: 'Zucchero', quantity: 100, unit: 'g' },
      { id: 'i2', name: 'Cacao amaro', quantity: 60, unit: 'g' },
      { id: 'i3', name: 'Amido di mais', quantity: 40, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Polverizzare e mescolare zucchero, cacao e amido nel boccale; conservare il preparato in un barattolo.', bimby: { timeSeconds: 15, speed: '7' } },
      { id: 's2', order: 2, text: 'Per una tazza: sciogliere 3 cucchiai di preparato in 200 g di latte caldo, mescolando fino ad addensare.' },
    ],
  },
];
