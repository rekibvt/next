# 1. Étape des dépendances
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
# On ajoute openssl ici aussi pour prisma
RUN apk add --no-cache openssl
COPY prisma ./prisma/
RUN npm ci --legacy-peer-deps

# 2. Étape de Build
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

# Génération du client Prisma (indispensable avant le build)
RUN npx prisma generate
RUN npm run build

# 3. Étape de Runtime
FROM node:20-alpine AS runtime
WORKDIR /app
RUN apk add --no-cache openssl

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# --- FIX DES PERMISSIONS ET FICHIERS ---
# On copie le dossier standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# On copie les assets statiques
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# IMPORTANT : On copie prisma pour que server.js puisse l'utiliser
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
# On force la copie du client généré dans le runtime
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs
EXPOSE 3000

CMD ["npm", "start"]