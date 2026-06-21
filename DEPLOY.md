# Come mettere l'app online dal tuo GitHub (passo passo)

Obiettivo: avere un link tipo `https://TUONOME.github.io/bimby-ricette/` da aprire
sull'iPhone/iPad e aggiungere alla schermata Home. Tutto gratis, niente PC sempre acceso.

## 1. Crea il repository su GitHub
1. Vai su https://github.com/new
2. **Repository name**: scrivi `bimby-ricette`
3. Lascialo **Public** (per GitHub Pages gratuito) e crea il repository.

## 2. Carica i file del progetto (con GitHub Desktop, senza comandi)
Sul tuo PC non c'è il programma "git", quindi usa **GitHub Desktop**: è gratis e ha i pulsanti.
Il vantaggio è che carica automaticamente **solo i file giusti** (lascia fuori da solo le
cartelle pesanti come `node_modules`, grazie al file `.gitignore` già presente).

1. Scarica e installa GitHub Desktop da https://desktop.github.com
2. Apri il programma e accedi col tuo account GitHub.
3. Menu **File → Add local repository** e scegli la cartella `App Ricette`.
   (Se chiede di creare un repository, accetta: **Create a repository**.)
4. In basso scrivi un messaggio (es. "Prima versione") e clicca **Commit to main**.
5. In alto clicca **Publish repository**. Lascia il nome `bimby-ricette` e **Public**, poi pubblica.

> Se invece hai scelto di caricare i file dal sito di GitHub, ricordati di **non** caricare
> le cartelle `node_modules`, `dist` e `.expo` (sono temporanee e molto pesanti).

## 3. Attiva GitHub Pages
1. Nel repository vai su **Settings → Pages**.
2. Alla voce **Build and deployment → Source**, scegli **GitHub Actions**.
3. Fatto. Non serve altro.

## 4. Aspetta la costruzione (1–2 minuti)
- Vai sulla scheda **Actions** del repository: vedrai partire "Deploy PWA su GitHub Pages".
- Quando diventa verde ✅, l'app è online.
- L'indirizzo lo trovi in **Settings → Pages** in alto (es. `https://TUONOME.github.io/bimby-ricette/`).

## 5. Mettila sulla schermata Home (iPhone/iPad)
1. Apri quell'indirizzo con **Safari**.
2. Tocca il pulsante **Condividi** (il quadrato con la freccia in su).
3. Scegli **"Aggiungi alla schermata Home"**.
4. Comparirà l'icona col grembiule turchese. Aprila: parte a tutto schermo, come un'app.

## Aggiornare le ricette in futuro
- **Per cambiare le ricette dell'app**: modifica i file dentro `src/data/recipes/`,
  ricarica su GitHub: si ricostruisce e si aggiorna da sola.
- **Per aggiungere/cambiare ricette senza ritoccare l'app**: pubblica un file JSON
  (vedi `data-remote/recipes.example.json`) e metti il suo indirizzo in
  `app.json` → `extra.recipesRemoteUrl`. L'app lo scarica da sola all'avvio.
