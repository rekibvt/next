# 1. Étape des dépendances
FROM node:20-alpine AS dependencies
WORKDIR /app
RUN apk add --no-cache openssl
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --legacy-peer-deps

# 2. Étape de Build (VÉRIFIE BIEN LE "AS builder" ICI)
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN npx prisma generate
RUN npm run build

# 3. Étape de Runtime
# ... (Gardes tes étapes 1 et 2 identiques)

# 3. Étape de Runtime
# 3. Étape de Runtime
FROM node:20-alpine AS runtime
WORKDIR /app
RUN apk add --no-cache openssl

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# On copie les fichiers de build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# --- LA DIFFÉRENCE EST ICI ---
# Au lieu de copier les node_modules du builder qui sont incomplets, 
# on installe juste Prisma proprement pour le runtime
RUN npm install prisma @prisma/client

USER nextjs
EXPOSE 3000

# On utilise npx qui trouvera forcément le binaire maintenant
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]