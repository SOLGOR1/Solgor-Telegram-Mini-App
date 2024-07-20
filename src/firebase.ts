// Importiere Firebase-Funktionen
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Firebase-Konfigurationsobjekt
const firebaseConfig = {
  apiKey: "AIzaSyCEqnRlIb6zv4tn9TNJs7C7mUnS2yhRp08",
  authDomain: "solgor-d98a1.firebaseapp.com",
  projectId: "solgor-d98a1",
  storageBucket: "solgor-d98a1.appspot.com",
  messagingSenderId: "926693107279",
  appId: "1:926693107279:web:11f7f358c427b0b3486c3a",
  measurementId: "G-V678EZFTXK"
};

// Initialisiere Firebase
const app = initializeApp(firebaseConfig);

// Initialisiere Firestore
const db = getFirestore(app);

export { db, doc, getDoc, setDoc };