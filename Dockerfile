# 1. Étape des dépendances
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# 2. Étape du Build (C'est ici qu'on définit "builder")
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl
COPY . .
# On récupère les node_modules de l'étape précédente
COPY --from=dependencies /app/node_modules ./node_modules
RUN npx prisma generate
RUN npm run build

# 3. Étape de Runtime (C'est ici que l'erreur se produit souvent)
FROM node:20-alpine AS runtime
WORKDIR /app
RUN apk add --no-cache openssl

# On crée l'utilisateur
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# ATTENTION : Vérifie bien que c'est écrit "--from=builder" (le nom défini à l'étape 2)
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

USER nextjs
EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD npx prisma migrate deploy && node server.js