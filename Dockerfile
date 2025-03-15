FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --omit=dev

FROM nginx:alpine

# Update the nginx configuration file path
COPY nginx.conf /etc/nginx/nginx.conf

# Ensure the container listens on the PORT environment variable
ENV PORT=8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
