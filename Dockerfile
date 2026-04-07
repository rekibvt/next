# On passe de node:18 à node:20
FROM node:20-alpine

WORKDIR /app

# Installation des dépendances
COPY package*.json ./
RUN npm install

# Copie du reste des fichiers
COPY . .

# Construction de l'app
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]