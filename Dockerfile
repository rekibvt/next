# 1. Étape de build
FROM node:22-alpine AS builder
WORKDIR /app
# libc6-compat est requis pour Prisma sur Alpine
RUN apk add --no-cache openssl libc6-compat

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --legacy-peer-deps

COPY . .
RUN npx prisma generate
RUN npm run build

# 2. Étape de runtime
FROM node:22-alpine AS runner
WORKDIR /app
# On rajoute libc6-compat ici aussi pour le moteur Prisma (Engine)
RUN apk add --no-cache openssl libc6-compat

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Récupération du mode standalone
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# On rapatrie les dossiers Prisma pour pouvoir faire le "migrate deploy"
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma ./node_modules/prisma

USER nextjs
EXPOSE 3000

# Commande de lancement
# On utilise le binaire prisma copié pour appliquer les migrations sur 'postgres_db'
CMD ["sh", "-c", "./node_modules/prisma/build/index.js migrate deploy && node server.js"]