/**
 * Configurazione Expo dinamica.
 *
 * Parte da `app.json` (passato qui come `config`) e, se è presente la variabile
 * d'ambiente EXPO_BASE_URL, imposta il "percorso base" del sito.
 *
 * Serve per GitHub Pages: quando il sito è pubblicato in una sottocartella
 * (es. https://tuonome.github.io/bimby-ricette/), tutti i file devono sapere
 * che vivono sotto "/bimby-ricette". Il workflow di GitHub imposta EXPO_BASE_URL
 * automaticamente con il nome del repository.
 */
module.exports = ({ config }) => {
  const baseUrl = process.env.EXPO_BASE_URL;
  if (baseUrl) {
    config.experiments = { ...(config.experiments || {}), baseUrl };
  }
  return config;
};
