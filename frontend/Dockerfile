# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Копіюємо package.json
COPY package*.json ./

# Встановлюємо залежності з legacy-peer-deps
RUN npm ci --legacy-peer-deps

# Копіюємо код
COPY . .

# Збираємо
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]