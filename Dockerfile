FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

# Install gettext for envsubst
RUN apk add --no-cache gettext

# Copy the built Angular app
COPY --from=build /app/dist/brmo /usr/share/nginx/html

# Copy the entrypoint script
COPY entrypoint.sh /usr/local/bin/

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/entrypoint.sh

# Update the nginx configuration file path
COPY nginx.conf /etc/nginx/nginx.conf

# Ensure the container listens on the PORT environment variable
ENV PORT=8080
EXPOSE 8080

# Use the entrypoint script as the entrypoint
ENTRYPOINT ["entrypoint.sh"]
