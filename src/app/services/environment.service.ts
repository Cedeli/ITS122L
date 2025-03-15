import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private env: any;

  constructor() {
    this.env = (window as any).ENV || {};
  }

  get firebase() {
    return {
      apiKey: this.env.FIREBASE_API_KEY,
      authDomain: this.env.FIREBASE_AUTH_DOMAIN,
      projectId: this.env.FIREBASE_PROJECT_ID,
      storageBucket: this.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: this.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: this.env.FIREBASE_APP_ID,
      measurementId: this.env.FIREBASE_MEASUREMENT_ID
    };
  }
}
