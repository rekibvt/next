# ... (tes étapes dependencies et builder restent identiques)

FROM node:20-alpine AS runtime
WORKDIR /app
RUN apk add --no-cache openssl
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# 1. On copie le standalone (le serveur)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# 2. IMPORTANT : Pour que Prisma migrate fonctionne, il faut aussi le schéma 
# et les moteurs Prisma dans le runtime
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 3. Utiliser la syntaxe "exec" (crochets) pour le CMD
# On lance la migration PUIS le serveur
CMD npx prisma migrate deploy && node server.js