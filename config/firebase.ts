import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyBUAFfKxHnO3VxL98U6T9KcqfAsY3GWGhY",
  authDomain: "excuseapp-833f8.firebaseapp.com",
  projectId: "excuseapp-833f8",
  storageBucket: "excuseapp-833f8.firebasestorage.app",
  messagingSenderId: "105857421010",
  appId: "1:105857421010:web:e35a0f2a3216a91f4fe70b",
  measurementId: "G-7EM0XR3XFF",
};

const app = initializeApp(firebaseConfig);

// Firestore (si lo usas)
export const db = getFirestore(app);

// Auth
export let auth;
if (Platform.OS !== 'web') {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  auth = getAuth(app);
}
