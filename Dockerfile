FROM node:18-alpine

WORKDIR /app

# Copiar archivos directamente porque ya estás dentro de PROYECTO-GAME
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
