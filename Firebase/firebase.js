// src/firebase/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAriZPBlr8la89Cl0KqBMLgw_flNUxhZps",
  authDomain: "crve-801a7.firebaseapp.com",
  projectId: "crve-801a7",
  storageBucket: "crve-801a7.appspot.com",
  messagingSenderId: "353750817401",
  appId: "1:353750817401:web:cc45e9d50358d6819212a8"
};

// THIS IS THE CRUCIAL PART: initialize only if no apps exist
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Only initializeAuth once, safely
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  // If already initialized (e.g., hot reload), fallback to getAuth
  auth = getAuth(app);
}

export { auth };
export const db = getFirestore(app);
