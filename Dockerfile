# Etapa 1: Build de TypeScript
FROM node:22-slim AS build

# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar dependencias y código fuente
COPY package*.json ./
RUN npm install

COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# Etapa 2: Imagen de producción
FROM node:22-slim

WORKDIR /app

# Copiar solo lo necesario desde la etapa de build
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Instalar solo dependencias de producción
RUN npm install --only=production

# Exponer puerto usado por Cloud Run
EXPOSE 8080

# Arranque del servidor
CMD ["node", "dist/app.js"]
