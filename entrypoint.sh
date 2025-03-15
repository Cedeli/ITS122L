#!/bin/sh

# Create the config.js file with environment variables
echo "window.ENV = {
  FIREBASE_API_KEY: \"${FIREBASE_API_KEY}\",
  FIREBASE_AUTH_DOMAIN: \"${FIREBASE_AUTH_DOMAIN}\",
  FIREBASE_PROJECT_ID: \"${FIREBASE_PROJECT_ID}\",
  FIREBASE_STORAGE_BUCKET: \"${FIREBASE_STORAGE_BUCKET}\",
  FIREBASE_MESSAGING_SENDER_ID: \"${FIREBASE_MESSAGING_SENDER_ID}\",
  FIREBASE_APP_ID: \"${FIREBASE_APP_ID}\",
  FIREBASE_MEASUREMENT_ID: \"${FIREBASE_MEASUREMENT_ID}\"
};" > /usr/share/nginx/html/config.js

# Start nginx
nginx -g "daemon off;"
