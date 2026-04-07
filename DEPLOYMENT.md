# 🚀 GUIDE DE DÉPLOIEMENT EN PRODUCTION

## ⚡ Quick Start

### Prérequis
- Docker & Docker Compose (optionnel)
- Node.js 20+ (pour déploiement direct)
- PostgreSQL 15+ (distant recommandé)
- HTTPS/TLS certificat valide

---

## 📋 Étapes de Déploiement

### 1️⃣ Préparer l'Environnement

```bash
# Cloner ou récupérer le code
git clone <repo>
cd app

# Créer .env.production (à partir du template)
cp .env.production.example .env.production

# ⚠️  ÉDITER .env.production avec vos vrais secrets
# DATABASE_URL="postgresql://user:PASSWORD@db-prod.com:5432/mydb?sslmode=require"
```

### 2️⃣ Tester en Local d'abord

```bash
# Installer les dépendances
npm install

# Build production
npm run build

# Tester le build
NODE_ENV=production npm start

# Vérifier http://localhost:3000
```

### 3️⃣ Déployer sur Serveur

#### Option A : Vercel (Recommandé - Plus simple)

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel deploy --prod

# Configurer les variables d'environnement dans Vercel Dashboard :
# 1. Project Settings → Environment Variables
# 2. Ajouter DATABASE_URL
# 3. Ajouter NODE_ENV=production
```

#### Option B : Docker (Cloud Provider)

```bash
# Build image
docker build -t app:latest -f Dockerfile .

# Push vers registry (Docker Hub, ECR, ACR, etc.)
docker tag app:latest your-registry/app:latest
docker push your-registry/app:latest

# Deployer (AWS ECS, Google Cloud Run, Azure ACI, etc.)
# Exemple AWS ECS :
# 1. Créer Task Definition avec image
# 2. Créer Service avec Task Definition
# 3. Configurer Load Balancer
```

#### Option C : VPS Classique (Contrôle total)

```bash
# SSH into serveur
ssh user@your-server.com

# Cloner repo
git clone <repo>
cd app

# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer PM2 (process manager)
sudo npm install -g pm2

# Créer .env.production
nano .env.production
# Ajouter DATABASE_URL et autres secrets

# Build
npm install
npm run build

# Lancer avec PM2
pm2 start "npm start" --name "app" --env production

# Sauvegarder config PM2
pm2 startup
pm2 save

# Configurer Nginx Reverse Proxy
sudo nano /etc/nginx/sites-available/app
```

**Nginx Config :**
```nginx
upstream app {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    server_name your-domain.com;
    
    # Rediriger HTTP → HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # Certificats SSL (Let's Encrypt + Certbot)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Sécurité SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Proxy vers Next.js
    location / {
        proxy_pass http://app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activer Nginx
sudo ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Installer Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com

# Auto-renouvellement
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## 🔐 Checklist Sécurité

Avant le déploiement :

- [ ] `.env.production` créé avec vrais secrets
- [ ] DATABASE_URL pointe vers DB distante
- [ ] HTTPS/TLS certificat installé
- [ ] Credentials NON en clair dans git
- [ ] npm audit passed (`npm audit`)
- [ ] Headers de sécurité vérifiés
- [ ] Rate limiting fonctionnel
- [ ] Backups DB configurés
- [ ] Monitoring activé
- [ ] Test authentification fonctionnel

---

## 🧪 Tests Post-Déploiement

```bash
# 1. Vérifier HTTPS
curl -i https://your-domain.com
# Vérifier les headers :
# - Strict-Transport-Security
# - X-Content-Type-Options
# - Content-Security-Policy

# 2. Tester registration
curl -X POST https://your-domain.com/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"securepass123"}'

# 3. Tester login
curl -X POST https://your-domain.com/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"securepass123"}' \
  -c cookies.txt

# 4. Vérifier session
curl https://your-domain.com/api/me -b cookies.txt

# 5. Tester rate limiting
for i in {1..15}; do curl -X POST https://your-domain.com/api/login ...; done
# Devrait retourner 429 après 10 tentatives
```

---

## 📊 Monitoring & Logs

### Sentry (Error Tracking)
```bash
# Installer Sentry SDK
npm install @sentry/nextjs

# Configurer dans next.config.ts (voir documentation Sentry)
```

### PM2 Monitoring
```bash
# Dashboard temps réel
pm2 monit

# Logs
pm2 logs app

# Diagnostic
pm2 diagnose
pm2 ping
```

### Nginx Logs
```bash
# Accès
tail -f /var/log/nginx/access.log

# Erreurs
tail -f /var/log/nginx/error.log
```

---

## 🔄 Mise à Jour & Maintenance

### Déployer une nouvelle version
```bash
# Développement
git pull origin main
npm install
npm run build

# Redémarrer
pm2 restart app
# ou
docker pull your-registry/app:latest
docker run ... (avec nouvelle image)
# ou Vercel redéploie automatiquement avec `git push`
```

### Vérifier les vulnérabilités
```bash
# Chaque semaine
npm audit

# Mise à jour des patchs de sécurité
npm update
```

### Backup Database
```bash
# PostgreSQL backup
pg_dump -U user -h db-prod.com mydb > backup-$(date +%Y%m%d).sql

# Restaurer
psql -U user -h db-prod.com mydb < backup-20240402.sql

# Automatiser avec cron
# 0 2 * * * pg_dump -U user -h db-prod.com mydb | gzip > /backups/db-$(date +\%Y\%m\%d).sql.gz
```

---

## ⚡ Performance (Optionnel)

### Activation du Caching
```bash
# Ajuster les headers dans next.config.ts
# Cache statique : 1 année
# Cache dynamique : 5 minutes
```

### CDN (Cloudflare, etc.)
```
- Pointer le domaine vers Cloudflare
- Activer caching automatique
- Activer DDOS protection
- Compression automatique
```

### Database Optimization
```sql
-- Créer indexes sur colonnes consultées fréquemment
CREATE INDEX idx_user_email ON "User"(email);
```

---

## 🐛 Troubleshooting

### L'app ne démarre pas
```bash
# Vérifier les logs
pm2 logs app

# Vérifier les variables d'env
echo $DATABASE_URL

# Tester la connexion DB
psql -U user -h db-prod.com mydb -c "SELECT 1"
```

### Rate limiting bloque les utilisateurs
```bash
# Augmenter les limites dans /lib/security.ts
# checkRateLimit('login:' + ip, 10, 900000) → augmenter 10 à 20
```

### Certificats SSL expirent
```bash
# Renouveler manuellement
sudo certbot renew

# Auto-renouvement vérifié
sudo systemctl status certbot.timer
```

---

## 📞 Documentation Additionnelle

Voir aussi :
- `SECURITY.md` → Guide sécurité détaillé
- `AUDIT_REPORT.md` → Rapport d'audit complet
- `.env.production.example` → Template des variables
- Documentation Next.js : https://nextjs.org/docs/deployment

---

## ✅ Deployment Checklist Final

- [ ] Code testé en local
- [ ] npm audit passed
- [ ] .env.production sécurisé
- [ ] Database migré vers production
- [ ] HTTPS configuré
- [ ] Monitoring activé
- [ ] Backups configurés
- [ ] Plan de rollback préparé
- [ ] Équipe notifiée
- [ ] Domain pointé correctement

**Prêt pour le déploiement ! 🚀**
