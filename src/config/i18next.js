import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { join } from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath
import { dirname } from 'path'; // Import dirname

// Define __filename and __dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

i18next.use(Backend).init({
  lng: 'en', // langue par défaut
  fallbackLng: ['fr', 'ar'],
  preload: ['en', 'fr', 'ar'], // langues disponibles
  backend: {
    loadPath: join(__dirname, '../locales/{{lng}}.json'), // Correctly use __dirname
  },
});

export default i18next;
