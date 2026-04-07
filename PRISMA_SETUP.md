# Configuration Prisma + PostgreSQL - Guide Corrigé

## ✅ Corrections apportées

### 1. **actions.ts** 
- ✅ Suppression du code dupliqué
- ✅ Migration de `pg.Client` vers `PrismaClient` (plus simple et sûr)
- ✅ Ajout du hachage des mots de passe avec `bcryptjs`
- ✅ Utilisation d'ORM Prisma au lieu de requêtes SQL brutes

### 2. **page.tsx & login/page.tsx**
- ✅ Correction du chemin d'import : `@/app/lib/actions`
- ✅ Mise à jour des classes Tailwind v4 : `bg-gradient-to-br` → `bg-linear-to-br`

### 3. **db.ts**
- ✅ Suppression du hardcoding de `DATABASE_URL` en code
- ✅ Implémentation du Singleton Pattern pour Prisma
- ✅ Meilleur gestion de l'environnement

### 4. **schema.prisma**
- ✅ Ajout de `url = env("DATABASE_URL")` dans la datasource
- ✅ Ajout de `updatedAt` pour tracking
- ✅ Noms de colonnes cohérents

### 5. **prisma.config.ts** (Prisma 7)
- ✅ Configuration correcte pour Prisma 7
- ✅ Chargement depuis `process.env.DATABASE_URL`

### 6. **.env.local** (Nouveau)
- ✅ Fichier créé pour développement local
- ✅ Variables d'environnement séparées du code

### 7. **docker-compose.yml**
- ✅ Configuration DATABASE_URL correcte pour le service web
- ✅ Connexion vers le service PostgreSQL `db`

---

## 🚀 Comment utiliser

### Développement local (sans Docker)

1. **Installer les dépendances** :
```bash
npm install
```

2. **Démarrer PostgreSQL** (si vous l'avez installé localement) :
```bash
# macOS avec Homebrew
brew services start postgresql@15

# Ou utiliser Docker uniquement pour la DB
docker run --name postgres_local -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydb -p 5432:5432 -d postgres:15-alpine
```

3. **Créer les migrations Prisma** :
```bash
npx prisma migrate dev --name init
```

4. **Lancer l'application Next.js** :
```bash
npm run dev
```

### Développement avec Docker

1. **Construire l'image** :
```bash
docker build -t next-app-debug:latest .
```

2. **Démarrer l'app et la DB** :
```bash
docker compose up --build
```

3. **Appliquer les migrations dans le conteneur** :
```bash
docker compose exec web npx prisma migrate deploy
```

---

## 📋 Variables d'environnement

### .env (Production/Partagé)
```properties
DATABASE_URL="postgresql://myuser:mypassword@db:5432/mydb?schema=public"
PRISMA_CLI_BINARY_TARGETS="native"
```

### .env.local (Développement local - À NE PAS commiter)
```properties
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydb?schema=public"
PRISMA_CLI_BINARY_TARGETS="native"
```

---

## 🔒 Sécurité

✅ **Mots de passe** : Toujours hashés avec `bcryptjs`
✅ **Variables d'environnement** : Séparées du code source
✅ **Singleton Prisma** : Évite les fuites de connexion
✅ **Schéma Prisma** : Validations au niveau BDD

---

## 📚 Commandes utiles

```bash
# Générer le client Prisma
npx prisma generate

# Voir l'état de la BDD
npx prisma studio

# Reset la BDD (attention!)
npx prisma migrate reset

# Vérifier la syntaxe du schema
npx prisma validate
```

---

## 🐛 Troubleshooting

**Erreur : "Cannot connect to database"**
- Vérifier que PostgreSQL est lancé
- Vérifier la `DATABASE_URL` dans `.env.local`
- Pour Docker : `docker logs postgres_db`

**Erreur : "Error code: P1003"**
- La base de données n'existe pas
- Exécuter : `npx prisma migrate deploy` ou `npx prisma migrate dev`

**Prisma ne trouve pas `.env`**
- Vérifier que vous êtes à la racine du projet
- Vérifier le fichier `.env.local` (pas `env.local`)

---

✨ Configuration maintenant prête ! 🎉
