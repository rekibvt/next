import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    // On récupère l'URL depuis l'environnement système
    url: process.env.DATABASE_URL,
  },
});