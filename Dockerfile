FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

# Copy the built Angular app
COPY --from=build /app/dist/brmo/browser /usr/share/nginx/html

# Create a config.js file that will be loaded at runtime
RUN echo "window.ENV = {};" > /usr/share/nginx/html/config.js

# Copy the entrypoint script that will update config.js at runtime
COPY entrypoint.sh /usr/local/bin/

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/entrypoint.sh

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Ensure the container listens on the PORT environment variable
ENV PORT=8080
EXPOSE 8080

# Use the entrypoint script as the entrypoint
ENTRYPOINT ["entrypoint.sh"]
