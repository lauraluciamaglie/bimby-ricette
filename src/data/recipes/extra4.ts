import { Recipe } from '@/types/recipe';

/**
 * Ricette aggiuntive — ondata 4 (finale): piatti famosi e DIVERSI tra loro,
 * scritti in modo esplicito per garantire varietà e qualità.
 */

const sale = { id: 'sale', name: 'Sale', quantity: null };
const pepe = { id: 'pepe', name: 'Pepe', quantity: null };
const olio = (g = 20) => ({ id: 'olio', name: 'Olio extravergine di oliva', quantity: g, unit: 'g' });

export const EXTRA_4: Recipe[] = [
  // ---------------- PRIMI ----------------
  {
    id: 'lasagne', title: 'Lasagne alla Bolognese', course: 'Primo', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 90,
    description: 'Lasagne al forno con ragù e besciamella, un grande classico della domenica.',
    tags: ['pasta', 'forno', 'ragù', 'classico'],
    ingredients: [
      { id: 'i1', name: 'Lasagne', quantity: 250, unit: 'g' },
      { id: 'i2', name: 'Ragù alla bolognese', quantity: 500, unit: 'g' },
      { id: 'i3', name: 'Besciamella', quantity: 500, unit: 'g' },
      { id: 'i4', name: 'Parmigiano grattugiato', quantity: 80, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'In una teglia alternare strati di lasagne, ragù, besciamella e parmigiano.' },
      { id: 's2', order: 2, text: 'Terminare con besciamella e parmigiano e cuocere in forno a 180°C per 35 minuti.' },
    ],
  },
  {
    id: 'cannelloni', title: 'Cannelloni Ricotta e Spinaci', course: 'Primo', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 70,
    description: 'Cannelloni ripieni di ricotta e spinaci, gratinati al forno.',
    tags: ['pasta', 'forno', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Cannelloni', quantity: 250, unit: 'g' },
      { id: 'i2', name: 'Ricotta', quantity: 400, unit: 'g' },
      { id: 'i3', name: 'Spinaci', quantity: 300, unit: 'g' },
      { id: 'i4', name: 'Besciamella', quantity: 400, unit: 'g' },
      { id: 'i5', name: 'Parmigiano grattugiato', quantity: 60, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Cuocere gli spinaci e tritarli; mescolarli con la ricotta, parte del parmigiano e il sale.', bimby: { timeSeconds: 20, speed: '4' } },
      { id: 's2', order: 2, text: 'Riempire i cannelloni, disporli in teglia, coprire con besciamella e parmigiano e cuocere a 180°C per 30 minuti.' },
    ],
  },
  {
    id: 'gnocchi-sorrentina', title: 'Gnocchi alla Sorrentina', course: 'Primo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 40,
    description: 'Gnocchi al pomodoro gratinati con mozzarella.',
    tags: ['gnocchi', 'pomodoro', 'forno', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Gnocchi di patate', quantity: 800, unit: 'g' },
      { id: 'i2', name: 'Passata di pomodoro', quantity: 500, unit: 'g' },
      { id: 'i3', name: 'Mozzarella', quantity: 200, unit: 'g' },
      { id: 'i4', name: 'Basilico', quantity: null },
      olio(20), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Preparare il sugo con la passata nel boccale.', bimby: { timeSeconds: 900, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's2', order: 2, text: 'Lessare gli gnocchi, condirli col sugo, aggiungere mozzarella e basilico e gratinare in forno a 200°C per 10 minuti.' },
    ],
  },
  {
    id: 'polenta', title: 'Polenta', course: 'Primo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 45,
    description: 'Polenta cremosa, base perfetta per sughi e formaggi.',
    tags: ['polenta', 'mais', 'inverno'],
    ingredients: [
      { id: 'i1', name: 'Farina di mais', quantity: 200, unit: 'g' },
      { id: 'i2', name: 'Acqua', quantity: 800, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire acqua e sale nel boccale e portare a bollore.', bimby: { timeSeconds: 600, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Aggiungere a pioggia la farina di mais e cuocere mescolando in antiorario.', bimby: { timeSeconds: 1800, speed: '1', temperature: 100, direction: 'Antiorario' } },
    ],
  },
  {
    id: 'couscous-verdure', title: 'Couscous di Verdure', course: 'Primo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 30,
    description: 'Couscous con verdure colorate, leggero e profumato.',
    tags: ['couscous', 'verdure', 'vegano'],
    ingredients: [
      { id: 'i1', name: 'Couscous', quantity: 250, unit: 'g' },
      { id: 'i2', name: 'Zucchine', quantity: 1, unit: 'pz' },
      { id: 'i3', name: 'Peperone', quantity: 1, unit: 'pz' },
      { id: 'i4', name: 'Pomodorini', quantity: 200, unit: 'g' },
      { id: 'i5', name: 'Acqua', quantity: 250, unit: 'g' },
      olio(20), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Stufare le verdure a cubetti nel boccale con l’olio.', bimby: { timeSeconds: 600, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's2', order: 2, text: 'Scaldare l’acqua salata, versarla sul couscous e lasciar gonfiare 5 minuti; unire le verdure.', bimby: { timeSeconds: 300, speed: '1', temperature: 100 } },
    ],
  },
  {
    id: 'zuppa-pesce', title: 'Zuppa di Pesce', course: 'Primo', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 50,
    description: 'Zuppa di pesce misto in brodo di pomodoro.',
    tags: ['pesce', 'zuppa'],
    ingredients: [
      { id: 'i1', name: 'Pesce misto', quantity: 800, unit: 'g' },
      { id: 'i2', name: 'Passata di pomodoro', quantity: 300, unit: 'g' },
      { id: 'i3', name: 'Aglio', quantity: 2, unit: 'spicchio' },
      { id: 'i4', name: 'Vino bianco', quantity: 80, unit: 'g' },
      { id: 'i5', name: 'Prezzemolo', quantity: null },
      olio(30), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Rosolare l’aglio nell’olio, sfumare col vino e unire la passata.', bimby: { timeSeconds: 300, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's2', order: 2, text: 'Aggiungere il pesce e cuocere delicatamente in antiorario; profumare con prezzemolo.', bimby: { timeSeconds: 900, speed: 'Soft', temperature: 100, direction: 'Antiorario' } },
    ],
  },
  {
    id: 'crepes-prosciutto', title: 'Crêpes Prosciutto e Formaggio', course: 'Primo', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 45,
    description: 'Crêpes salate farcite e gratinate al forno.',
    tags: ['crepes', 'forno'],
    ingredients: [
      { id: 'i1', name: 'Farina', quantity: 150, unit: 'g' },
      { id: 'i2', name: 'Latte', quantity: 350, unit: 'g' },
      { id: 'i3', name: 'Uova', quantity: 3, unit: 'uova' },
      { id: 'i4', name: 'Prosciutto cotto', quantity: 150, unit: 'g' },
      { id: 'i5', name: 'Formaggio', quantity: 150, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Frullare farina, latte, uova e sale per la pastella e cuocere le crêpes in padella.', bimby: { timeSeconds: 30, speed: '5' } },
      { id: 's2', order: 2, text: 'Farcire con prosciutto e formaggio, arrotolare e gratinare in forno a 190°C per 12 minuti.' },
    ],
  },
  {
    id: 'risi-bisi', title: 'Risi e Bisi', course: 'Primo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 35,
    description: 'Risotto veneto con i piselli, morbido come una minestra.',
    tags: ['riso', 'piselli', 'veneto'],
    ingredients: [
      { id: 'i1', name: 'Riso', quantity: 300, unit: 'g' },
      { id: 'i2', name: 'Piselli', quantity: 300, unit: 'g' },
      { id: 'i3', name: 'Cipolla', quantity: 0.5, unit: 'pz' },
      { id: 'i4', name: 'Acqua', quantity: 800, unit: 'g' },
      { id: 'i5', name: 'Parmigiano grattugiato', quantity: 50, unit: 'g' },
      olio(20), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tritare la cipolla e soffriggere.', bimby: { timeSeconds: 180, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Aggiungere riso, piselli, acqua e sale e cuocere in antiorario.', bimby: { timeSeconds: 900, speed: 'Soft', temperature: 100, direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Mantecare con il parmigiano.' },
    ],
  },
  {
    id: 'pasta-cozze', title: 'Spaghetti alle Cozze', course: 'Primo', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 30,
    description: 'Spaghetti con sugo di cozze in bianco o leggermente rosso.',
    tags: ['pasta', 'cozze', 'pesce'],
    ingredients: [
      { id: 'i1', name: 'Spaghetti', quantity: 320, unit: 'g' },
      { id: 'i2', name: 'Cozze', quantity: 800, unit: 'g' },
      { id: 'i3', name: 'Aglio', quantity: 2, unit: 'spicchio' },
      { id: 'i4', name: 'Pomodorini', quantity: 200, unit: 'g' },
      { id: 'i5', name: 'Prezzemolo', quantity: null },
      { id: 'i6', name: 'Acqua', quantity: 600, unit: 'g' },
      olio(30),
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Far aprire le cozze in padella e filtrarne il liquido.' },
      { id: 's2', order: 2, text: 'Nel boccale rosolare aglio e pomodorini.', bimby: { timeSeconds: 180, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Aggiungere gli spaghetti spezzati, l’acqua, il liquido delle cozze e poco sale: la pasta cuoce nel boccale. Cuocere in antiorario, velocità soft, per il tempo della pasta (circa 10 minuti).', bimby: { timeSeconds: 600, speed: 'Soft', temperature: 100, direction: 'Antiorario' } },
      { id: 's4', order: 4, text: 'Unire le cozze, mescolare e profumare con il prezzemolo.' },
    ],
  },
  {
    id: 'pasta-forno', title: 'Pasta al Forno', course: 'Primo', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 60,
    description: 'Pasta al forno filante con ragù e mozzarella.',
    tags: ['pasta', 'forno', 'ragù'],
    ingredients: [
      { id: 'i1', name: 'Pasta corta', quantity: 350, unit: 'g' },
      { id: 'i5', name: 'Acqua', quantity: 750, unit: 'g' },
      { id: 'i2', name: 'Ragù alla bolognese', quantity: 500, unit: 'g' },
      { id: 'i3', name: 'Mozzarella', quantity: 200, unit: 'g' },
      { id: 'i4', name: 'Parmigiano grattugiato', quantity: 80, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire nel boccale la pasta, l’acqua e poco sale e cuocere in antiorario, velocità soft, fino a pasta al dente (circa 8 minuti).', bimby: { timeSeconds: 480, speed: 'Soft', temperature: 100, direction: 'Antiorario' } },
      { id: 's2', order: 2, text: 'Scolare, condire con il ragù e versare in teglia con mozzarella e parmigiano.' },
      { id: 's3', order: 3, text: 'Gratinare in forno a 190°C per 25 minuti.' },
    ],
  },

  // ---------------- SECONDI ----------------
  {
    id: 'cotoletta-milanese', title: 'Cotoletta alla Milanese', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 25,
    description: 'La classica cotoletta impanata e fritta nel burro.',
    tags: ['vitello', 'fritto', 'milanese'],
    ingredients: [
      { id: 'i1', name: 'Costolette di vitello', quantity: 4, unit: 'pz' },
      { id: 'i2', name: 'Uova', quantity: 2, unit: 'uova' },
      { id: 'i3', name: 'Pangrattato', quantity: 150, unit: 'g' },
      { id: 'i4', name: 'Burro', quantity: 80, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Passare le costolette nell’uovo sbattuto e poi nel pangrattato.' },
      { id: 's2', order: 2, text: 'Friggere nel burro fino a doratura su entrambi i lati. Salare.' },
    ],
  },
  {
    id: 'saltimbocca', title: 'Saltimbocca alla Romana', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 20,
    description: 'Fettine di vitello con prosciutto e salvia.',
    tags: ['vitello', 'prosciutto', 'romano'],
    ingredients: [
      { id: 'i1', name: 'Fettine di vitello', quantity: 500, unit: 'g' },
      { id: 'i2', name: 'Prosciutto crudo', quantity: 100, unit: 'g' },
      { id: 'i3', name: 'Salvia', quantity: null },
      { id: 'i4', name: 'Vino bianco', quantity: 60, unit: 'g' },
      { id: 'i5', name: 'Burro', quantity: 30, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Su ogni fettina mettere una fetta di prosciutto e una foglia di salvia, fermando con uno stecchino.' },
      { id: 's2', order: 2, text: 'Rosolare nel burro, sfumare col vino e servire con il fondo di cottura.' },
    ],
  },
  {
    id: 'vitello-tonnato', title: 'Vitello Tonnato', course: 'Secondo', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 60,
    description: 'Fettine di vitello fredde con salsa tonnata.',
    tags: ['vitello', 'freddo', 'piemontese'],
    ingredients: [
      { id: 'i1', name: 'Girello di vitello', quantity: 600, unit: 'g' },
      { id: 'i2', name: 'Tonno sgocciolato', quantity: 120, unit: 'g' },
      { id: 'i3', name: 'Maionese', quantity: 100, unit: 'g' },
      { id: 'i4', name: 'Capperi', quantity: 20, unit: 'g' },
      { id: 'i5', name: 'Acciughe', quantity: 2, unit: 'pz' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Lessare il vitello, raffreddarlo e affettarlo sottile.' },
      { id: 's2', order: 2, text: 'Frullare tonno, maionese, capperi e acciughe per la salsa.', bimby: { timeSeconds: 30, speed: '6' } },
      { id: 's3', order: 3, text: 'Coprire le fettine con la salsa e servire freddo.' },
    ],
  },
  {
    id: 'roast-beef', title: 'Roast Beef', course: 'Secondo', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 50,
    description: 'Roast beef rosato all’inglese, ottimo anche freddo.',
    tags: ['manzo', 'forno'],
    ingredients: [
      { id: 'i1', name: 'Controfiletto di manzo', quantity: 800, unit: 'g' },
      { id: 'i2', name: 'Rosmarino', quantity: null },
      olio(30), sale, pepe,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Massaggiare la carne con olio, sale, pepe e rosmarino e rosolarla in padella su tutti i lati.' },
      { id: 's2', order: 2, text: 'Cuocere in forno a 200°C per 20 minuti; far riposare e affettare sottile.' },
    ],
  },
  {
    id: 'polpette-svedesi', title: 'Polpette Svedesi', course: 'Secondo', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 40,
    description: 'Polpettine in salsa cremosa, in stile scandinavo.',
    tags: ['carne', 'salsa', 'scandinavo'],
    ingredients: [
      { id: 'i1', name: 'Carne macinata mista', quantity: 500, unit: 'g' },
      { id: 'i2', name: 'Pangrattato', quantity: 50, unit: 'g' },
      { id: 'i3', name: 'Uovo', quantity: 1, unit: 'uovo' },
      { id: 'i4', name: 'Panna', quantity: 200, unit: 'g' },
      { id: 'i5', name: 'Brodo', quantity: 150, unit: 'g' },
      sale, pepe,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Impastare carne, pangrattato, uovo, sale e pepe e formare polpettine; rosolarle in padella.' },
      { id: 's2', order: 2, text: 'Nel boccale scaldare panna e brodo fino a salsa, unire le polpette.', bimby: { timeSeconds: 600, speed: '1', temperature: 90, direction: 'Antiorario' } },
    ],
  },
  {
    id: 'chili-con-carne', title: 'Chili con Carne', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 50,
    description: 'Piatto unico tex-mex con manzo, fagioli e spezie.',
    tags: ['carne', 'fagioli', 'piccante', 'messicano'],
    ingredients: [
      { id: 'i1', name: 'Carne macinata di manzo', quantity: 500, unit: 'g' },
      { id: 'i2', name: 'Fagioli rossi lessati', quantity: 300, unit: 'g' },
      { id: 'i3', name: 'Passata di pomodoro', quantity: 300, unit: 'g' },
      { id: 'i4', name: 'Cipolla', quantity: 1, unit: 'pz' },
      { id: 'i5', name: 'Peperoncino', quantity: null },
      { id: 'i6', name: 'Cumino in polvere', quantity: null },
      olio(20), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tritare la cipolla e soffriggere con le spezie.', bimby: { timeSeconds: 180, speed: '1', temperature: 100 } },
      { id: 's2', order: 2, text: 'Unire la carne e rosolare in antiorario.', bimby: { timeSeconds: 300, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Aggiungere passata, fagioli e sale e cuocere in antiorario.', bimby: { timeSeconds: 1500, speed: '1', temperature: 100, direction: 'Antiorario' } },
    ],
  },
  {
    id: 'pollo-tandoori', title: 'Pollo Tandoori', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 40,
    description: 'Pollo marinato nello yogurt e spezie, cotto al forno.',
    tags: ['pollo', 'indiano', 'speziato'],
    ingredients: [
      { id: 'i1', name: 'Cosce di pollo', quantity: 800, unit: 'g' },
      { id: 'i2', name: 'Yogurt bianco', quantity: 200, unit: 'g' },
      { id: 'i3', name: 'Curry in polvere', quantity: 10, unit: 'g' },
      { id: 'i4', name: 'Paprika', quantity: 5, unit: 'g' },
      { id: 'i5', name: 'Succo di limone', quantity: 20, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Mescolare yogurt, spezie, limone e sale; marinare il pollo per almeno 1 ora.' },
      { id: 's2', order: 2, text: 'Cuocere in forno a 200°C per 30 minuti, girando a metà.' },
    ],
  },
  {
    id: 'gulasch', title: 'Gulasch', course: 'Secondo', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 100,
    description: 'Spezzatino di manzo alla paprika, di tradizione mitteleuropea.',
    tags: ['manzo', 'paprika', 'umido'],
    ingredients: [
      { id: 'i1', name: 'Manzo a cubetti', quantity: 700, unit: 'g' },
      { id: 'i2', name: 'Cipolle', quantity: 400, unit: 'g' },
      { id: 'i3', name: 'Paprika', quantity: 15, unit: 'g' },
      { id: 'i4', name: 'Passata di pomodoro', quantity: 150, unit: 'g' },
      { id: 'i5', name: 'Acqua', quantity: 300, unit: 'g' },
      olio(30), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tritare le cipolle e stufarle a lungo con l’olio e la paprika.', bimby: { timeSeconds: 600, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's2', order: 2, text: 'Aggiungere carne, passata, acqua e sale e cuocere a lungo in antiorario.', bimby: { timeSeconds: 3600, speed: 'Soft', temperature: 100, direction: 'Antiorario' } },
    ],
  },
  {
    id: 'frittata-erbe', title: 'Frittata alle Erbe', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 15,
    description: 'Frittata profumata alle erbe aromatiche.',
    tags: ['uova', 'erbe', 'vegetariano', 'veloce'],
    ingredients: [
      { id: 'i1', name: 'Uova', quantity: 6, unit: 'uova' },
      { id: 'i2', name: 'Erbe miste', quantity: null },
      { id: 'i3', name: 'Parmigiano grattugiato', quantity: 40, unit: 'g' },
      olio(15), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Sbattere le uova con parmigiano, erbe e sale.' },
      { id: 's2', order: 2, text: 'Cuocere in padella con l’olio, dorando entrambi i lati.' },
    ],
  },
  {
    id: 'salmone-teriyaki', title: 'Salmone Teriyaki', course: 'Secondo', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 20,
    description: 'Filetti di salmone glassati alla salsa teriyaki.',
    tags: ['pesce', 'salmone', 'orientale'],
    ingredients: [
      { id: 'i1', name: 'Filetti di salmone', quantity: 600, unit: 'g' },
      { id: 'i2', name: 'Salsa di soia', quantity: 60, unit: 'g' },
      { id: 'i3', name: 'Miele', quantity: 30, unit: 'g' },
      { id: 'i4', name: 'Zenzero', quantity: null },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Scaldare soia, miele e zenzero nel boccale fino a glassa.', bimby: { timeSeconds: 300, speed: '1', temperature: 90 } },
      { id: 's2', order: 2, text: 'Cuocere il salmone in padella e laccarlo con la salsa.' },
    ],
  },

  // ---------------- CONTORNI ----------------
  {
    id: 'pomodori-ripieni', title: 'Pomodori Ripieni di Riso', course: 'Contorno', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 60,
    description: 'Pomodori al forno ripieni di riso, piatto estivo romano.',
    tags: ['pomodoro', 'riso', 'forno', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Pomodori grandi', quantity: 4, unit: 'pz' },
      { id: 'i2', name: 'Riso', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Basilico', quantity: null },
      { id: 'i4', name: 'Aglio', quantity: 1, unit: 'spicchio' },
      olio(30), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Svuotare i pomodori e frullare la polpa con aglio, basilico, olio e sale.', bimby: { timeSeconds: 10, speed: '6' } },
      { id: 's2', order: 2, text: 'Mescolare il riso crudo con la polpa, riempire i pomodori e cuocere in forno a 180°C per 45 minuti.' },
    ],
  },
  {
    id: 'peperoni-ripieni', title: 'Peperoni Ripieni', course: 'Contorno', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 60,
    description: 'Peperoni farciti e gratinati al forno.',
    tags: ['peperoni', 'forno', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Peperoni', quantity: 4, unit: 'pz' },
      { id: 'i2', name: 'Pane raffermo', quantity: 80, unit: 'g' },
      { id: 'i3', name: 'Capperi', quantity: 20, unit: 'g' },
      { id: 'i4', name: 'Olive', quantity: 40, unit: 'g' },
      { id: 'i5', name: 'Parmigiano grattugiato', quantity: 40, unit: 'g' },
      olio(30), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tritare pane, capperi, olive e parmigiano per il ripieno.', bimby: { timeSeconds: 10, speed: '6' } },
      { id: 's2', order: 2, text: 'Riempire i peperoni, condire con olio e cuocere in forno a 180°C per 45 minuti.' },
    ],
  },
  {
    id: 'zucchine-ripiene', title: 'Zucchine Ripiene', course: 'Contorno', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 50,
    description: 'Zucchine farcite e gratinate.',
    tags: ['zucchine', 'forno', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Zucchine', quantity: 4, unit: 'pz' },
      { id: 'i2', name: 'Pane raffermo', quantity: 60, unit: 'g' },
      { id: 'i3', name: 'Uovo', quantity: 1, unit: 'uovo' },
      { id: 'i4', name: 'Parmigiano grattugiato', quantity: 50, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Svuotare le zucchine e tritarne la polpa con pane, uovo e parmigiano.', bimby: { timeSeconds: 10, speed: '5' } },
      { id: 's2', order: 2, text: 'Riempire le zucchine e cuocere in forno a 180°C per 30 minuti.' },
    ],
  },
  {
    id: 'patate-hasselback', title: 'Patate Hasselback', course: 'Contorno', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 50,
    description: 'Patate a fisarmonica croccanti al forno.',
    tags: ['patate', 'forno', 'vegano'],
    ingredients: [
      { id: 'i1', name: 'Patate', quantity: 800, unit: 'g' },
      { id: 'i2', name: 'Rosmarino', quantity: null },
      olio(40), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Incidere le patate a fettine senza tagliarle del tutto.' },
      { id: 's2', order: 2, text: 'Condire con olio, sale e rosmarino e cuocere in forno a 200°C per 40 minuti.' },
    ],
  },
  {
    id: 'pomodorini-confit', title: 'Pomodorini Confit', course: 'Contorno', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 50,
    description: 'Pomodorini dolci cotti lentamente in forno.',
    tags: ['pomodoro', 'forno', 'vegano'],
    ingredients: [
      { id: 'i1', name: 'Pomodorini', quantity: 500, unit: 'g' },
      { id: 'i2', name: 'Aglio', quantity: 1, unit: 'spicchio' },
      { id: 'i3', name: 'Zucchero', quantity: 10, unit: 'g' },
      { id: 'i4', name: 'Origano', quantity: null },
      olio(30), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tagliare i pomodorini a metà, condirli con olio, aglio, zucchero, origano e sale.' },
      { id: 's2', order: 2, text: 'Cuocere in forno a 140°C per 40 minuti.' },
    ],
  },
  {
    id: 'insalata-farro', title: 'Insalata di Farro', course: 'Contorno', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 30,
    description: 'Insalata fredda di farro con verdure, ideale d’estate.',
    tags: ['farro', 'fresco', 'vegano', 'estate'],
    ingredients: [
      { id: 'i1', name: 'Farro', quantity: 250, unit: 'g' },
      { id: 'i2', name: 'Pomodorini', quantity: 200, unit: 'g' },
      { id: 'i3', name: 'Zucchine', quantity: 1, unit: 'pz' },
      { id: 'i4', name: 'Olive', quantity: 40, unit: 'g' },
      { id: 'i5', name: 'Acqua', quantity: 700, unit: 'g' },
      olio(30), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Lessare il farro nell’acqua salata e raffreddarlo.', bimby: { timeSeconds: 1500, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's2', order: 2, text: 'Condire con verdure a cubetti, olive e olio.' },
    ],
  },
  {
    id: 'cipolle-borettane', title: 'Cipolline in Agrodolce', course: 'Contorno', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 30,
    description: 'Cipolline borettane glassate in agrodolce.',
    tags: ['cipolle', 'agrodolce', 'vegano'],
    ingredients: [
      { id: 'i1', name: 'Cipolline borettane', quantity: 500, unit: 'g' },
      { id: 'i2', name: 'Aceto balsamico', quantity: 30, unit: 'g' },
      { id: 'i3', name: 'Zucchero', quantity: 20, unit: 'g' },
      { id: 'i4', name: 'Acqua', quantity: 100, unit: 'g' },
      olio(20), sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire tutto nel boccale e cuocere in antiorario finché si glassano.', bimby: { timeSeconds: 1200, speed: '1', temperature: 100, direction: 'Antiorario' } },
    ],
  },
  {
    id: 'polenta-concia', title: 'Polenta Concia', course: 'Contorno', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 50,
    description: 'Polenta arricchita con burro e formaggio fuso.',
    tags: ['polenta', 'formaggio', 'inverno', 'vegetariano'],
    ingredients: [
      { id: 'i1', name: 'Farina di mais', quantity: 200, unit: 'g' },
      { id: 'i2', name: 'Acqua', quantity: 800, unit: 'g' },
      { id: 'i3', name: 'Formaggio', quantity: 150, unit: 'g' },
      { id: 'i4', name: 'Burro', quantity: 40, unit: 'g' },
      sale,
    ],
    steps: [
      { id: 's1', order: 1, text: 'Preparare la polenta con acqua e farina cuocendo in antiorario.', bimby: { timeSeconds: 1800, speed: '1', temperature: 100, direction: 'Antiorario' } },
      { id: 's2', order: 2, text: 'A fine cottura mantecare con burro e formaggio.' },
    ],
  },

  // ---------------- DOLCI ----------------
  {
    id: 'profiteroles', title: 'Profiteroles', course: 'Dolce', baseServings: 4, difficulty: 'Difficile', totalTimeMinutes: 90,
    description: 'Bignè ripieni di crema e ricoperti di cioccolato.',
    tags: ['cioccolato', 'crema', 'festa'],
    ingredients: [
      { id: 'i1', name: 'Acqua', quantity: 150, unit: 'g' },
      { id: 'i2', name: 'Burro', quantity: 70, unit: 'g' },
      { id: 'i3', name: 'Farina', quantity: 100, unit: 'g' },
      { id: 'i4', name: 'Uova', quantity: 3, unit: 'uova' },
      { id: 'i5', name: 'Panna fresca', quantity: 300, unit: 'g' },
      { id: 'i6', name: 'Cioccolato fondente', quantity: 150, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Cuocere acqua e burro, unire la farina e poi le uova per la pasta choux.', bimby: { timeSeconds: 240, speed: '3', temperature: 100 } },
      { id: 's2', order: 2, text: 'Formare i bignè e cuocere in forno a 200°C per 20 minuti.' },
      { id: 's3', order: 3, text: 'Farcire con panna montata e ricoprire con cioccolato fuso.' },
    ],
  },
  {
    id: 'strudel-mele', title: 'Strudel di Mele', course: 'Dolce', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 70,
    description: 'Strudel di mele, uvetta e pinoli, dolce altoatesino.',
    tags: ['mele', 'forno', 'altoatesino'],
    ingredients: [
      { id: 'i1', name: 'Pasta sfoglia', quantity: 1, unit: 'pz' },
      { id: 'i2', name: 'Mele', quantity: 4, unit: 'pz' },
      { id: 'i3', name: 'Uvetta', quantity: 50, unit: 'g' },
      { id: 'i4', name: 'Pinoli', quantity: 30, unit: 'g' },
      { id: 'i5', name: 'Zucchero', quantity: 80, unit: 'g' },
      { id: 'i6', name: 'Cannella', quantity: null },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Mescolare mele a fettine, uvetta, pinoli, zucchero e cannella.' },
      { id: 's2', order: 2, text: 'Distribuire sulla sfoglia, arrotolare e cuocere in forno a 180°C per 40 minuti.' },
    ],
  },
  {
    id: 'sbrisolona', title: 'Torta Sbrisolona', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 50,
    description: 'Torta friabile lombarda con mandorle, da spezzare con le mani.',
    tags: ['mandorle', 'friabile', 'lombardo'],
    ingredients: [
      { id: 'i1', name: 'Farina', quantity: 150, unit: 'g' },
      { id: 'i2', name: 'Farina di mais', quantity: 100, unit: 'g' },
      { id: 'i3', name: 'Mandorle', quantity: 100, unit: 'g' },
      { id: 'i4', name: 'Zucchero', quantity: 150, unit: 'g' },
      { id: 'i5', name: 'Burro', quantity: 130, unit: 'g' },
      { id: 'i6', name: 'Tuorli', quantity: 2, unit: 'pz' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Tritare le mandorle e mescolare tutti gli ingredienti a briciole grossolane.', bimby: { timeSeconds: 20, speed: '5' } },
      { id: 's2', order: 2, text: 'Distribuire in teglia senza compattare e cuocere in forno a 180°C per 35 minuti.' },
    ],
  },
  {
    id: 'zeppole', title: 'Zeppole di San Giuseppe', course: 'Dolce', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 60,
    description: 'Zeppole fritte o al forno con crema pasticcera e amarena.',
    tags: ['fritto', 'crema', 'napoletano'],
    ingredients: [
      { id: 'i1', name: 'Acqua', quantity: 150, unit: 'g' },
      { id: 'i2', name: 'Burro', quantity: 60, unit: 'g' },
      { id: 'i3', name: 'Farina', quantity: 100, unit: 'g' },
      { id: 'i4', name: 'Uova', quantity: 3, unit: 'uova' },
      { id: 'i5', name: 'Crema pasticcera', quantity: 300, unit: 'g' },
      { id: 'i6', name: 'Amarene', quantity: 8, unit: 'pz' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Preparare la pasta choux nel boccale con acqua, burro, farina e uova.', bimby: { timeSeconds: 240, speed: '3', temperature: 100 } },
      { id: 's2', order: 2, text: 'Formare le zeppole, friggerle o cuocerle in forno; guarnire con crema e amarena.' },
    ],
  },
  {
    id: 'frittelle-mele', title: 'Frittelle di Mele', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 25,
    description: 'Anelli di mela in pastella, fritti e zuccherati.',
    tags: ['mele', 'fritto', 'carnevale'],
    ingredients: [
      { id: 'i1', name: 'Mele', quantity: 3, unit: 'pz' },
      { id: 'i2', name: 'Farina', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Latte', quantity: 150, unit: 'g' },
      { id: 'i4', name: 'Uovo', quantity: 1, unit: 'uovo' },
      { id: 'i5', name: 'Zucchero', quantity: 40, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Frullare farina, latte, uovo e zucchero per la pastella.', bimby: { timeSeconds: 20, speed: '5' } },
      { id: 's2', order: 2, text: 'Immergere gli anelli di mela nella pastella e friggerli; spolverare di zucchero.' },
    ],
  },
  {
    id: 'gelato-fiordilatte', title: 'Gelato Fiordilatte', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 10,
    description: 'Gelato cremoso al latte, pronto al momento con ingredienti congelati.',
    tags: ['gelato', 'freddo', 'estate'],
    ingredients: [
      { id: 'i1', name: 'Panna congelata a cubetti', quantity: 250, unit: 'g' },
      { id: 'i2', name: 'Latte congelato a cubetti', quantity: 200, unit: 'g' },
      { id: 'i3', name: 'Zucchero a velo', quantity: 100, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Inserire i cubetti congelati e lo zucchero nel boccale e tritare.', bimby: { timeSeconds: 30, speed: '9' } },
      { id: 's2', order: 2, text: 'Frullare fino a gelato cremoso, raccogliendo sui bordi. Servire subito.', bimby: { timeSeconds: 30, speed: '5' } },
    ],
  },
  {
    id: 'torta-pere-cioccolato', title: 'Torta Pere e Cioccolato', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 55,
    description: 'Torta morbida con pere e gocce di cioccolato.',
    tags: ['pere', 'cioccolato', 'torta'],
    ingredients: [
      { id: 'i1', name: 'Pere', quantity: 3, unit: 'pz' },
      { id: 'i2', name: 'Farina', quantity: 250, unit: 'g' },
      { id: 'i3', name: 'Zucchero', quantity: 150, unit: 'g' },
      { id: 'i4', name: 'Uova', quantity: 3, unit: 'uova' },
      { id: 'i5', name: 'Burro fuso', quantity: 100, unit: 'g' },
      { id: 'i6', name: 'Gocce di cioccolato', quantity: 100, unit: 'g' },
      { id: 'i7', name: 'Lievito per dolci', quantity: 1, unit: 'bustina', scalable: false },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Montare uova e zucchero, unire burro, farina e lievito.', bimby: { timeSeconds: 120, speed: '4' } },
      { id: 's2', order: 2, text: 'Aggiungere pere a cubetti e gocce di cioccolato in antiorario.', bimby: { timeSeconds: 15, speed: '2', direction: 'Antiorario' } },
      { id: 's3', order: 3, text: 'Versare in tortiera e cuocere a 175°C per 40 minuti.' },
    ],
  },
  {
    id: 'biscotti-occhi-bue', title: 'Biscotti Occhi di Bue', course: 'Dolce', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 45,
    description: 'Frollini farciti con confettura, con il classico foro al centro.',
    tags: ['biscotti', 'frolla', 'confettura'],
    ingredients: [
      { id: 'i1', name: 'Farina', quantity: 300, unit: 'g' },
      { id: 'i2', name: 'Burro freddo', quantity: 150, unit: 'g' },
      { id: 'i3', name: 'Zucchero a velo', quantity: 120, unit: 'g' },
      { id: 'i4', name: 'Tuorli', quantity: 2, unit: 'pz' },
      { id: 'i5', name: 'Confettura', quantity: 150, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Preparare la frolla nel boccale e farla riposare in frigo.', bimby: { timeSeconds: 30, speed: '5' } },
      { id: 's2', order: 2, text: 'Ritagliare i biscotti (metà con foro), cuocere a 170°C per 12 minuti e accoppiarli con la confettura.' },
    ],
  },
  {
    id: 'panna-cotta-cioccolato', title: 'Panna Cotta al Cioccolato', course: 'Dolce', baseServings: 4, difficulty: 'Facile', totalTimeMinutes: 15,
    description: 'Variante al cioccolato del classico dolce al cucchiaio.',
    tags: ['cioccolato', 'panna', 'dolce al cucchiaio'],
    ingredients: [
      { id: 'i1', name: 'Panna fresca', quantity: 500, unit: 'g' },
      { id: 'i2', name: 'Cioccolato fondente', quantity: 100, unit: 'g' },
      { id: 'i3', name: 'Zucchero', quantity: 60, unit: 'g' },
      { id: 'i4', name: 'Colla di pesce', quantity: 8, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Scaldare panna, cioccolato e zucchero nel boccale.', bimby: { timeSeconds: 360, speed: '2', temperature: 80 } },
      { id: 's2', order: 2, text: 'Unire la colla di pesce ammollata, versare negli stampi e raffreddare in frigo.' },
    ],
  },
  {
    id: 'tortino-cioccolato', title: 'Tortino al Cioccolato dal Cuore Morbido', course: 'Dolce', baseServings: 4, difficulty: 'Media', totalTimeMinutes: 25,
    description: 'Tortini caldi con il cuore di cioccolato fondente che cola.',
    tags: ['cioccolato', 'forno', 'festa'],
    ingredients: [
      { id: 'i1', name: 'Cioccolato fondente', quantity: 150, unit: 'g' },
      { id: 'i2', name: 'Burro', quantity: 100, unit: 'g' },
      { id: 'i3', name: 'Uova', quantity: 3, unit: 'uova' },
      { id: 'i4', name: 'Zucchero', quantity: 100, unit: 'g' },
      { id: 'i5', name: 'Farina', quantity: 60, unit: 'g' },
    ],
    steps: [
      { id: 's1', order: 1, text: 'Sciogliere cioccolato e burro nel boccale.', bimby: { timeSeconds: 180, speed: '2', temperature: 50 } },
      { id: 's2', order: 2, text: 'Aggiungere uova, zucchero e farina e amalgamare.', bimby: { timeSeconds: 30, speed: '4' } },
      { id: 's3', order: 3, text: 'Versare negli stampini e cuocere a 200°C per soli 10-12 minuti.' },
    ],
  },
];
