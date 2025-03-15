export const environment = {
  production: true,
  firebase: {
    apiKey: String(process.env['FIREBASE_API_KEY']),
    authDomain: String(process.env['FIREBASE_AUTH_DOMAIN']),
    projectId: String(process.env['FIREBASE_PROJECT_ID']),
    storageBucket: String(process.env['FIREBASE_STORAGE_BUCKET']),
    messagingSenderId: String(process.env['FIREBASE_MESSAGING_SENDER_ID']),
    appId: String(process.env['FIREBASE_APP_ID']),
    measurementId: String(process.env['FIREBASE_MEASUREMENT_ID'])
  }
};
