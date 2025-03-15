FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build with environment variables that will be replaced at runtime
RUN npm run build

FROM nginx:alpine

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built Angular app
COPY --from=build /app/dist/brmo/browser /usr/share/nginx/html

# Copy a script to replace environment variables at runtime
COPY config-env.sh /docker-entrypoint.d/40-config-env.sh
RUN chmod +x /docker-entrypoint.d/40-config-env.sh

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
