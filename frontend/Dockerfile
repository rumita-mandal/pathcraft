# --- Stage 1: Build React Assets ---
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install packages
RUN npm ci

# Copy source files
COPY . .

# Compile optimized static build
RUN npm run build

# --- Stage 2: Serve compiled files using Nginx ---
FROM nginx:alpine

# Copy built assets to Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
