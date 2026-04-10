# 1. Étape des dépendances
FROM node:22-alpine AS dependencies
WORKDIR /app
RUN apk add --no-cache openssl
COPY package*.json ./
COPY prisma ./prisma/
# Utilisation de ci pour une installation propre et stable
RUN npm ci --legacy-peer-deps

# 2. Étape de Build
FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

# Génération du client Prisma et Build Next.js
RUN npx prisma generate
RUN npm run build

# 3. Étape de Runtime
FROM node:22-alpine AS runtime
WORKDIR /app
RUN apk add --no-cache openssl

# Variables d'environnement pour la production
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Sécurité : on crée un utilisateur non-root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Récupération des fichiers compilés (mode standalone)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Installation propre de Prisma pour le runtime (évite les modules manquants)
RUN npm install prisma @prisma/client

USER nextjs
EXPOSE 3000

# Exécution des migrations avant de lancer le serveur
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]