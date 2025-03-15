import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { initializeApp, provideFirebaseApp, getApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import routeConfig from './app.routes';
import { EnvironmentService } from './services/environment.service';

function getFirebaseConfig(envService: EnvironmentService) {
  return envService.firebase;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routeConfig),
    EnvironmentService,
    {
      provide: 'FIREBASE_CONFIG',
      useFactory: getFirebaseConfig,
      deps: [EnvironmentService]
    },
    provideFirebaseApp(() => {
      const envService = new EnvironmentService();
      return initializeApp(envService.firebase);
    }),
    provideAuth(() => getAuth()),
    provideFirestore(() =>
      initializeFirestore(getApp(), {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      })
    )
  ]
};
