#!/bin/sh

# Create a config.js file with environment variables
cat > /usr/share/nginx/html/config.js << EOF
window.firebaseConfig = {
  apiKey: "${FIREBASE_API_KEY}",
  authDomain: "${FIREBASE_AUTH_DOMAIN}",
  projectId: "${FIREBASE_PROJECT_ID}",
  storageBucket: "${FIREBASE_STORAGE_BUCKET}",
  messagingSenderId: "${FIREBASE_MESSAGING_SENDER_ID}",
  appId: "${FIREBASE_APP_ID}",
  measurementId: "${FIREBASE_MEASUREMENT_ID}"
};
EOF

echo "Created runtime configuration"
