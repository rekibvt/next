# ✅ Configuration Prisma + PostgreSQL - COMPLÈTE

## 🎯 Objectif réalisé
✅ Les utilisateurs peuvent maintenant s'inscrire et se connecter avec enregistrement en BDD

---

## 🔧 Configurations finales

### 1. **app/lib/db.ts** - Client Prisma avec adapter-pg
```typescript
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Singleton Pattern pour éviter les fuites de connexion
let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    }),
  })
} else {
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient
  }
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient({
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL,
      }),
      log: ['query'],
    })
  }
  prisma = globalWithPrisma.prisma
}

export const db = prisma
```

### 2. **prisma/schema.prisma** - Schéma sans URL (Prisma 7)
```prisma
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native"]
}

datasource db {
  provider = "postgresql"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 3. **app/lib/actions.ts** - Utilise le client Prisma
```typescript
'use server'

import { db } from './db'
import bcryptjs from 'bcryptjs'

export async function register(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { success: false, error: "Tous les champs sont obligatoires." };
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { email: String(email) }
    });
    
    if (existingUser) {
      return { success: false, error: "Cet email est déjà utilisé." };
    }

    const hashedPassword = await bcryptjs.hash(String(password), 10);
    
    await db.user.create({
      data: {
        email: String(email),
        password: hashedPassword,
      }
    });
    
    return { success: true, error: null };
  } catch (error: any) {
    console.error("Erreur Register :", error);
    return { success: false, error: "Erreur lors de la création du compte." };
  }
}

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { success: false, error: "Veuillez remplir tous les champs." };
  }

  try {
    const user = await db.user.findUnique({
      where: { email: String(email) }
    });

    if (!user) {
      return { success: false, error: "Identifiants incorrects." };
    }

    const isPasswordValid = await bcryptjs.compare(String(password), user.password);
    
    if (!isPasswordValid) {
      return { success: false, error: "Identifiants incorrects." };
    }

    return { success: true, error: null, userId: user.id };
  } catch (error: any) {
    console.error("Erreur Login :", error);
    return { success: false, error: "Erreur lors de la tentative de connexion." };
  }
}
```

### 4. **.env.local** - Variables pour dev local
```properties
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydb?schema=public"
PRISMA_CLI_BINARY_TARGETS="native"
```

### 5. **docker-compose.yml** - Config Docker
```yaml
services:
  web:
    image: next-app-debug:latest
    init: true
    container_name: nextjs_web
    ports:
      - "3033:3001"
    environment:
      - DATABASE_URL=postgresql://myuser:mypassword@db:5432/mydb?schema=public
      - NODE_ENV=production
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
    networks:
      - nexus-network

  db:
    image: postgres:15-alpine
    container_name: postgres_db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - nexus-network

volumes:
  postgres_data:

networks:
  nexus-network:
    driver: bridge
```

---

## 🚀 Comment utiliser

### Développement avec Docker
```bash
# Démarrer les conteneurs
docker compose up -d

# Créer la table User (une seule fois)
PGPASSWORD=mypassword psql -h localhost -U myuser -d mydb -c \
"CREATE TABLE IF NOT EXISTS \"User\" (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  \"createdAt\" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \"updatedAt\" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);"

# Ouvrir l'app
# => http://localhost:3033/register
```

### Développement local
```bash
npm install
npm run dev
# => http://localhost:3000/register
```

---

## 🔐 Sécurité

✅ **Mots de passe** : Hashés avec bcryptjs (10 rounds)
✅ **Adapter Prisma 7** : Utilise le driver PostgreSQL optimisé  
✅ **Singleton Pattern** : Évite les fuites de connexion en dev
✅ **Variables d'env** : Séparées du code source
✅ **Requêtes paramétrées** : Prisma gère l'injection SQL automatiquement

---

## 📋 Commandes utiles

```bash
# Voir les données en temps réel
npm run db:studio

# Vérifier les logs de l'app
docker compose logs web -f

# Vérifier les logs de la BDD
docker compose logs db -f

# Exécuter une requête SQL
PGPASSWORD=mypassword psql -h localhost -U myuser -d mydb -c "SELECT * FROM \"User\";"

# Arrêter tout
docker compose down -v
```

---

## ✨ Prochaines étapes (recommandées)

1. **Ajouter des migrations Prisma** :
   ```bash
   # Utiliser migrate au lieu de db push pour la production
   ```

2. **Ajouter l'authentification JWT/Sessions** :
   - Utiliser next-auth (déjà dans package.json)
   - Implémenter les cookies de session

3. **Valider les emails** :
   - Vérifier le format email
   - Ajouter une étape de confirmation par email

4. **Améliorer la sécurité** :
   - Rate limiting sur l'inscription/connexion
   - CSRF tokens
   - Logs d'audit

---

**✅ Votre appli est prête pour tester l'inscription/connexion !**
