# ... (Gardes tes étapes 1 et 2 identiques)

# 3. Étape de Runtime
FROM node:20-alpine AS runtime
WORKDIR /app
RUN apk add --no-cache openssl

# On définit les variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copie du mode standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# --- LA LIGNE MAGIQUE POUR PRISMA ---
# On copie Prisma CLI et les moteurs générés depuis l'étape builder
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma ./node_modules/prisma

USER nextjs
EXPOSE 3000

# On lance la migration PUIS le serveur
CMD ["sh", "-c", "./node_modules/prisma/build/index.js migrate deploy && node server.js"]