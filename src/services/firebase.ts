import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase config - Take from firebase console
const firebaseConfig = {
  apiKey: "AIzaSyDWx4SPnX9BB2u0-VRn_m8Gr1th5i5Ew_4",
  authDomain: "recyclemate-a407d.firebaseapp.com",
  projectId: "recyclemate-a407d",
  storageBucket: "recyclemate-a407d.firebasestorage.app",
  messagingSenderId: "833304413312",
  appId: "1:833304413312:web:2430b77398e84354ca1265"
};

// Initialize Firebase - Connect to firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore (database)
export const db = getFirestore(app);

// Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;