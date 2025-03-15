#!/bin/sh

# Check if the file exists
find /usr/share/nginx/html -name "*.js" -type f -exec grep -l "FIREBASE_PROJECT_ID_PLACEHOLDER" {} \; | while read file; do
  # Replace placeholders with environment variables
  sed -i "s/FIREBASE_API_KEY_PLACEHOLDER/${FIREBASE_API_KEY}/g" "$file"
  sed -i "s/FIREBASE_AUTH_DOMAIN_PLACEHOLDER/${FIREBASE_AUTH_DOMAIN}/g" "$file"
  sed -i "s/FIREBASE_PROJECT_ID_PLACEHOLDER/${FIREBASE_PROJECT_ID}/g" "$file"
  sed -i "s/FIREBASE_STORAGE_BUCKET_PLACEHOLDER/${FIREBASE_STORAGE_BUCKET}/g" "$file"
  sed -i "s/FIREBASE_MESSAGING_SENDER_ID_PLACEHOLDER/${FIREBASE_MESSAGING_SENDER_ID}/g" "$file"
  sed -i "s/FIREBASE_APP_ID_PLACEHOLDER/${FIREBASE_APP_ID}/g" "$file"
  sed -i "s/FIREBASE_MEASUREMENT_ID_PLACEHOLDER/${FIREBASE_MEASUREMENT_ID}/g" "$file"
  echo "Updated Firebase config in $file"
done

# Also create the config.js file as a backup approach
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
