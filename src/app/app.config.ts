import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "tanding-scoring", "appId": "1:191446392057:web:51c0f0cd3b63b8aa90d628", "databaseURL": "https://tanding-scoring-default-rtdb.firebaseio.com", "storageBucket": "tanding-scoring.appspot.com", "apiKey": "AIzaSyAd0tM_bZUlbv6ydlV0vI12uquZNIhRn2E", "authDomain": "tanding-scoring.firebaseapp.com", "messagingSenderId": "191446392057", "measurementId": "G-B6E92J16TK" }))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase())), importProvidersFrom(provideFunctions(() => getFunctions())), provideAnimations()]
};
