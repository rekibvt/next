# 🔒 GUIDE DE DÉPLOIEMENT SÉCURISÉ

## ⚠️ Points Critiques de Sécurité

### 1. Variables d'Environnement

**NE JAMAIS** commiter `.env.local` ou `.env.production` avec des vrais secrets !

```bash
# Copier le template sans secrets
cp .env.example .env.local

# Sur le serveur de production, utiliser un gestionnaire de secrets :
# - AWS Secrets Manager
# - HashiCorp Vault
# - Docker Secrets
# - Variables d'environnement du système
```

### 2. Base de Données

**Production :**
- ✅ Utiliser une base PostgreSQL distante (AWS RDS, Azure Database, etc.)
- ✅ Générer un mot de passe FORT (20+ caractères, mélange de caractères)
- ✅ Utiliser SSL/TLS pour la connexion (ajouter `sslmode=require` à DATABASE_URL)
- ❌ Ne JAMAIS exposer le port 5432 au public
- ❌ Ne JAMAIS utiliser `localhost` en production

### 3. Docker Deployment

```bash
# Build sécurisé (multi-stage)
docker build -t app:production -f Dockerfile .

# Variables d'environnement - JAMAIS en dur dans docker-compose
export DB_USER="secure_user"
export DB_PASSWORD="$(openssl rand -base64 32)"
export DB_NAME="prod_db"
export DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@db-prod.example.com:5432/${DB_NAME}?sslmode=require"

# Lancer avec les variables sécurisées
docker run -d \
  -e DATABASE_URL="${DATABASE_URL}" \
  -e NODE_ENV=production \
  -p 3000:3000 \
  --restart unless-stopped \
  app:production
```

### 4. Headers de Sécurité Automatiques

Les headers suivants sont activés dans `next.config.ts` :
- ✅ Strict-Transport-Security (HSTS)
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: DENY
- ✅ X-XSS-Protection
- ✅ Content-Security-Policy
- ✅ Referrer-Policy

### 5. Protection des APIs

**Rate Limiting :**
- Login : 10 tentatives / 15 minutes par IP
- Register : 5 tentatives / 1 heure par IP

**Validation des Entrées :**
- Email valide requis
- Mot de passe minimum 8 caractères
- Tous les inputs sanitisés

**Gestion des Erreurs :**
- ✅ Erreurs génériques au client ("Erreur serveur")
- ✅ Détails complets en développement seulement
- ✅ Pas de révélation d'architecture

### 6. Authentification

**Cookies :**
- ✅ HttpOnly (pas d'accès JavaScript)
- ✅ Secure (HTTPS seulement en production)
- ✅ SameSite=lax (protection CSRF)
- ✅ Durée limitée (7 jours)

### 7. HTTPS/TLS

**OBLIGATOIRE en production :**
```bash
# Utiliser un reverse proxy avec TLS :
# - Nginx + Let's Encrypt
# - Cloudflare
# - AWS ALB
# - Traefik

# Rediriger HTTP → HTTPS
# Générer certificats SSL valides
```

### 8. Dépendances

```bash
# Vérifier les vulnérabilités
npm audit

# Mettre à jour les packages sécurisés
npm update

# Retirer les dépendances unused
npm prune
```

### 9. Logging & Monitoring

- ✅ Pas de logs sensibles en production
- ✅ Utiliser un service de logging (Sentry, LogRocket, etc.)
- ✅ Monitorer les erreurs 5xx
- ✅ Alertes sur les taux de rate limit élevés

### 10. Checklist de Déploiement

- [ ] DATABASE_URL utilisé depuis variables d'environnement
- [ ] HTTPS/TLS activé
- [ ] Headers de sécurité vérifiés
- [ ] Rate limiting actif
- [ ] Logs sensibles supprimés
- [ ] npm audit passé
- [ ] Backup DB configuré
- [ ] Monitoring mis en place
- [ ] Plan de rollback préparé
- [ ] Tests en environnement staging

## 🚀 Déploiement Recommandé

### Option 1 : Vercel (Plus simple)
```bash
# Vercel gère automatiquement HTTPS, headers de sécurité, etc.
npm install -g vercel
vercel deploy --prod
# Configurer DATABASE_URL dans Vercel environment
```

### Option 2 : Docker + Cloud Provider
```bash
# AWS ECS, Google Cloud Run, Azure Container Instances, etc.
# Ils gèrent aussi HTTPS, scaling, monitoring
```

### Option 3 : VPS Classique (Plus contrôle)
```bash
# Nginx + Docker + Certbot (Let's Encrypt)
# Setup plus complexe mais plus de contrôle
```

## ℹ️ Support des Variables d'Environnement

Les variables suivantes sont supportées :

```env
# Obligatoire
DATABASE_URL=postgresql://...

# Optionnel (défaut : development)
NODE_ENV=production
```

## 📝 Avant de Déployer

1. Tester en développement avec `NODE_ENV=production`
2. Faire un `npm audit` et corriger les vulnérabilités
3. Vérifier les logs pour les informations sensibles
4. Tester le rate limiting
5. Tester les headers de sécurité avec `curl -i https://yourdomain.com`
6. Configurer les backups de base de données
7. Mettre en place le monitoring

## 🔐 Points de Vigilance

- ❌ Ne jamais commiter `.env.local` ou `.env.production`
- ❌ Ne jamais expose le port PostgreSQL au public
- ❌ Ne jamais utiliser `npm run dev` en production
- ❌ Ne jamais partager les credentials
- ❌ Ne jamais désactiver HTTPS
- ✅ Toujours utiliser SSL/TLS pour DB
- ✅ Toujours valider les inputs
- ✅ Toujours utiliser un WAF (Web Application Firewall)

---

**Besoin d'aide ? Consulte la documentation Next.js & Prisma de sécurité.**
